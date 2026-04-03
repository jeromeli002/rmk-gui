export const useKeyboardStore = defineStore('keyboard', () => {
  function parseLabelPair(label: string | null | undefined): [number, number] | null {
    if (!label)
      return null
    const [a, b] = label.split(',')
    if (a == null || b == null)
      return null
    const first = Number(a)
    const second = Number(b)
    if (Number.isNaN(first) || Number.isNaN(second))
      return null
    return [first, second]
  }

  const hidDevice = ref<HIDInterface | null>(null)
  const vialDevice = ref<VialInterface | null>(null)
  const api = ref<HIDApi | null>(null)

  const isConnected = computed(() => hidDevice.value != null)

  const productName = ref<string | null>(null)
  async function fetchProductName() {
    if (!vialDevice.value) {
      throw new Error('Device not connected')
    }
    productName.value = await vialDevice.value.productName()
  }

  const layerCount = ref<number | null>(null)
  async function fetchLayerCount() {
    if (!vialDevice.value) {
      throw new Error('Device not connected')
    }
    layerCount.value = await vialDevice.value.layerCount()
  }

  const macroCount = ref<number | null>(null)
  async function fetchMacroCount() {
    if (!vialDevice.value) {
      throw new Error('Device not connected')
    }
    macroCount.value = await vialDevice.value.marcoCount()
  }

  const vialJson = ref<VialJson | null>(null)
  async function fetchVialJson() {
    if (!vialDevice.value) {
      throw new Error('Device not connected')
    }
    vialJson.value = await vialDevice.value.vialJson()
  }

  const kleDefinition = ref<InstanceType<typeof KleBoard> | null>(null)
  function fetchKleDefinition() {
    if (!vialDevice.value) {
      throw new Error('Device not connected')
    }
    if (!vialJson.value) {
      throw new Error('Vial JSON not available')
    }
    kleDefinition.value = vialDevice.value.kleDefinition(vialJson.value)
  }

  const keymap = ref<IndexMap | null>(null)
  async function fetchKeymap() {
    if (!vialDevice.value) {
      throw new Error('Device not connected')
    }
    if (!layerCount.value) {
      throw new Error('Layer count not available')
    }
    if (!vialJson.value) {
      throw new Error('Vial JSON not available')
    }
    const layer = layerCount.value
    const { rows, cols } = vialJson.value.matrix
    keymap.value = await vialDevice.value.keymap(layer, rows, cols)
  }

  const layoutKeymap = ref<IndexMap | null>(null)
  function fetchLayoutKeymap() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    if (!kleDefinition.value) {
      throw new Error('KLE definition not available')
    }
    if (!keymap.value) {
      throw new Error('Keymap not available')
    }
    if (!layerCount.value) {
      throw new Error('Layer count not available')
    }
    layoutKeymap.value = vialDevice.value.layoutKeymap(kleDefinition.value, keymap.value as IndexMap, layerCount.value)
  }

  function fetchKeyList(layer: number): Key[] {
    if (!layerCount.value) {
      throw new Error('Layer count not available')
    }
    if (!kleDefinition.value) {
      throw new Error('KLE definition not available')
    }
    if (!layoutKeymap.value) {
      throw new Error('Layout keymap not available')
    }
    if (layer >= layerCount.value) {
      throw new Error('Invalid layer')
    }

    const pikeGeo = (k: any) => pick(k, ['x', 'y', 'width', 'height', 'x2', 'y2', 'width2', 'height2', 'rotation_x', 'rotation_y', 'rotation_angle'])
    const keys: Key[] = []
    const customKeycodes = vialJson.value?.customKeycodes || []

    // 解析 layout_labels 来确定每个 layout index 的当前选择
    const layoutLabels = vialJson.value?.layouts?.labels
    const currentLayoutChoices = new Map<number, number>()
    
    if (layoutLabels) {
      let value = layoutOptions.value
      
      // 从后往前解析，和 Python 的 unpack 逻辑一致
      for (let i = layoutLabels.length - 1; i >= 0; i--) {
        const item = layoutLabels[i]
        if (typeof item === 'string') {
          // boolean 类型，占用 1 bit
          currentLayoutChoices.set(i, value & 1)
          value >>= 1
        }
        else if (Array.isArray(item) && item.length > 0) {
          // select 类型，占用 log2(options.length) bits
          // options 数组的第一个元素是 label，后面的是选项，所以选项数量是 item.length - 1
          const optionCount = item.length - 1
          const bitLength = Math.ceil(Math.log2(optionCount))
          const mask = (1 << bitLength) - 1
          currentLayoutChoices.set(i, value & mask)
          value >>= bitLength
        }
      }
    }

    for (const k of kleDefinition.value.keys) {
      const isEncoder = k.labels.some((label: string | null) => label?.trim().toLowerCase() === 'e')
      if (isEncoder) {
        continue
      }

      const pair = parseLabelPair(k.labels[0])
      if (!pair) {
        continue
      }
      const [row, col] = pair

      // 检查 layout_index 和 layout_option
      // 第 9 个标签（索引 8）包含 layout_index,layout_option
      if (k.labels[8]) {
        const layoutPair = parseLabelPair(k.labels[8])
        if (layoutPair) {
          const [layoutIndex, layoutOption] = layoutPair
          const currentChoice = currentLayoutChoices.get(layoutIndex) ?? 0
          // 如果当前选择的 layout option 不匹配这个 key，就跳过
          if (currentChoice !== layoutOption) {
            continue
          }
        }
      }

      const keycode = layoutKeymap.value!.get([layer, row, col])
      if (keycode === undefined) {
        continue
      }

      let symbol = [...keyToLable(keycode)]
      // 检查是否是 user 键
      if ((keycode >= 0x0840 && keycode <= 0x085F) || (keycode >= 0x7E00 && keycode <= 0x7E1F)) {
        const index = keycode >= 0x7E00 ? keycode - 0x7E00 : keycode - 0x0840
        if (index < customKeycodes.length) {
          // 设置 symbol[0] 为 null，symbol[1] 为 shortName，这样会在中间显示且没有横杠
          symbol = [null, customKeycodes[index].shortName]
        }
      }

      keys.push({
        geometry: pikeGeo(k),
        position: { row, col },
        info: {
          code: keycode,
          symbol,
        },
      } as Key)
    }

    return keys
  }

  const encoderKeymap = ref(new StringMap<[number, number, number], number>())
  async function fetchEncoderMap() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    if (!layerCount.value) {
      throw new Error('Layer count not available')
    }
    if (!kleDefinition.value) {
      throw new Error('KLE definition not available')
    }

    const encoderIndexes = new Set<number>()
    for (const k of kleDefinition.value.keys) {
      const isEncoder = k.labels.some((label: string | null) => label?.trim().toLowerCase() === 'e')
      if (!isEncoder)
        continue

      const pair = parseLabelPair(k.labels[0])
      if (!pair)
        continue

      const [encoderIdxRaw] = pair
      encoderIndexes.add(encoderIdxRaw)
    }

    const nextMap = new StringMap<[number, number, number], number>()
    for (let layer = 0; layer < layerCount.value; layer++) {
      for (const encoderIdx of encoderIndexes) {
        const ccw = await vialDevice.value.encoderKeycode(layer, encoderIdx, 'ccw')
        const cw = await vialDevice.value.encoderKeycode(layer, encoderIdx, 'cw')
        nextMap.set([layer, encoderIdx, 0], ccw)
        nextMap.set([layer, encoderIdx, 1], cw)
      }
    }
    encoderKeymap.value = nextMap
  }

  function fetchEncoderList(layer: number) {
    if (!layerCount.value) {
      throw new Error('Layer count not available')
    }
    if (!kleDefinition.value) {
      throw new Error('KLE definition not available')
    }
    if (!encoderKeymap.value) {
      throw new Error('Encoder keymap not available')
    }
    if (layer >= layerCount.value) {
      throw new Error('Invalid layer')
    }

    interface EncoderEntry {
      encoder: number
      direction: 'ccw' | 'cw'
      geometry: Pick<Key['geometry'], 'x' | 'y' | 'width' | 'height'>
      position: { row: number, col: number }
      info: { code: number, symbol: [string | null, string | null] }
    }
    const encoders = new Map<number, {
      index: number
      ccw: EncoderEntry | null
      cw: EncoderEntry | null
    }>()
    const customKeycodes = vialJson.value?.customKeycodes || []

    // 解析 layout_labels 来确定每个 layout index 的当前选择
    const layoutLabels = vialJson.value?.layouts?.labels
    const currentLayoutChoices = new Map<number, number>()
    
    if (layoutLabels) {
      let value = layoutOptions.value
      
      // 从后往前解析，和 Python 的 unpack 逻辑一致
      for (let i = layoutLabels.length - 1; i >= 0; i--) {
        const item = layoutLabels[i]
        if (typeof item === 'string') {
          // boolean 类型，占用 1 bit
          currentLayoutChoices.set(i, value & 1)
          value >>= 1
        }
        else if (Array.isArray(item) && item.length > 0) {
          // select 类型，占用 log2(options.length) bits
          // options 数组的第一个元素是 label，后面的是选项，所以选项数量是 item.length - 1
          const optionCount = item.length - 1
          const bitLength = Math.ceil(Math.log2(optionCount))
          const mask = (1 << bitLength) - 1
          currentLayoutChoices.set(i, value & mask)
          value >>= bitLength
        }
      }
    }

    for (const k of kleDefinition.value.keys) {
      const isEncoder = k.labels.some((label: string | null) => label?.trim().toLowerCase() === 'e')
      if (!isEncoder) {
        continue
      }

      const pair = parseLabelPair(k.labels[0])
      if (!pair) {
        continue
      }
      const [encoderIdxRaw, directionRaw] = pair

      // 检查 layout_index 和 layout_option
      // 第 9 个标签（索引 8）包含 layout_index,layout_option
      if (k.labels[8]) {
        const layoutPair = parseLabelPair(k.labels[8])
        if (layoutPair) {
          const [layoutIndex, layoutOption] = layoutPair
          const currentChoice = currentLayoutChoices.get(layoutIndex) ?? 0
          // 如果当前选择的 layout option 不匹配这个 encoder，就跳过
          if (currentChoice !== layoutOption) {
            continue
          }
        }
      }

      const keycode = encoderKeymap.value.get([layer, encoderIdxRaw, directionRaw])
      if (keycode === undefined) {
        continue
      }

      const direction = directionRaw === 0 ? 'ccw' : directionRaw === 1 ? 'cw' : null
      if (!direction) {
        continue
      }

      let symbol = [...keyToLable(keycode)] as [string | null, string | null]
      // 检查是否是 user 键
      if ((keycode >= 0x0840 && keycode <= 0x085F) || (keycode >= 0x7E00 && keycode <= 0x7E1F)) {
        const index = keycode >= 0x7E00 ? keycode - 0x7E00 : keycode - 0x0840
        if (index < customKeycodes.length) {
          // 设置 symbol[0] 为 null，symbol[1] 为 shortName，这样会在中间显示且没有横杠
          symbol = [null, customKeycodes[index].shortName]
        }
      }

      const info: EncoderEntry = {
        encoder: encoderIdxRaw,
        direction,
        geometry: pick(k, ['x', 'y', 'width', 'height']),
        position: { row: encoderIdxRaw, col: directionRaw },
        info: {
          code: keycode,
          symbol,
        },
      }

      if (!encoders.has(encoderIdxRaw)) {
        encoders.set(encoderIdxRaw, { index: encoderIdxRaw, ccw: null, cw: null })
      }
      const group = encoders.get(encoderIdxRaw)!
      if (direction === 'ccw')
        group.ccw = info
      else
        group.cw = info
    }

    return Array.from(encoders.values()).sort((a, b) => a.index - b.index)
  }

  const keyMacros = ref<Array<Array<MacroAction>> | null>(null)
  async function fetchMacros() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    if (!macroCount.value) {
      throw new Error('Macro Count not available')
    }
    keyMacros.value = await vialDevice.value.macros(macroCount.value)
  };

  const layoutOptions = ref<number>(0)
  async function fetchLayoutOptions() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    // 只有当 vialJson 有 layout_labels 时才获取
    if (vialJson.value?.layouts?.labels) {
      layoutOptions.value = await vialDevice.value.getLayoutOptions()
    }
  }

  const tapDanceCount = ref<number | null>(null)
  const tapDanceEntries = ref<Array<[number, number, number, number, number]> | null>(null)
  async function fetchTapDanceCount() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    tapDanceCount.value = await vialDevice.value.getTapDanceCount()
  }

  async function fetchTapDanceEntries() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    if (!tapDanceCount.value) {
      throw new Error('Tap dance count not available')
    }
    const entries = []
    for (let i = 0; i < tapDanceCount.value; i++) {
      entries.push(await vialDevice.value.getTapDanceEntry(i))
    }
    tapDanceEntries.value = entries
  }

  async function setTapDanceEntry(idx: number, entry: [number, number, number, number, number]) {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    await vialDevice.value.setTapDanceEntry(idx, entry)
    if (tapDanceEntries.value) {
      tapDanceEntries.value[idx] = entry
    }
  }

  const comboCount = ref<number | null>(null)
  const comboEntries = ref<Array<[number, number, number, number, number]> | null>(null)
  async function fetchComboCount() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    comboCount.value = await vialDevice.value.getComboCount()
  }

  async function fetchComboEntries() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    if (!comboCount.value) {
      throw new Error('Combo count not available')
    }
    const entries = []
    for (let i = 0; i < comboCount.value; i++) {
      entries.push(await vialDevice.value.getComboEntry(i))
    }
    comboEntries.value = entries
  }

  async function setComboEntry(idx: number, entry: [number, number, number, number, number]) {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    await vialDevice.value.setComboEntry(idx, entry)
    if (comboEntries.value) {
      comboEntries.value[idx] = entry
    }
  }

  // RGB Lighting state and methods
  const lightingType = computed(() => {
    const lighting = vialJson.value?.lighting
    if (lighting === 'qmk_rgblight' || lighting === 'qmk_backlight_rgblight') {
      return 'qmk_rgblight'
    }
    if (lighting === 'vialrgb') {
      return 'vialrgb'
    }
    return null
  })

  const rgbConfig = ref<{
    mode: number
    hue: number
    sat: number
    val: number
    speed: number
    brightness: number
  } | null>(null)

  async function fetchRgbConfig() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    if (!lightingType.value) {
      return
    }

    try {
      if (lightingType.value === 'vialrgb') {
        const config = await vialDevice.value.getVialrgbConfig()
        rgbConfig.value = {
          mode: config.mode,
          hue: config.hue,
          sat: config.sat,
          val: config.val,
          speed: config.speed,
          brightness: config.val, // VialRGB uses val as brightness
        }
      }
      else {
        const config = await vialDevice.value.getQmkRgblightConfig()
        rgbConfig.value = {
          mode: config.mode,
          hue: config.hue,
          sat: config.sat,
          val: 255,
          speed: config.speed,
          brightness: config.brightness,
        }
      }
    }
    catch (error) {
      console.error('Failed to fetch RGB config:', error)
      rgbConfig.value = null
    }
  }

  async function setRgbMode(mode: number) {
    if (!vialDevice.value || !lightingType.value) {
      throw new Error('Vial device not available or lighting not supported')
    }
    if (lightingType.value === 'vialrgb') {
      const config = rgbConfig.value
      if (config) {
        await vialDevice.value.setVialrgbConfig(mode, config.speed, config.hue, config.sat, config.val)
      }
    }
    else {
      await vialDevice.value.setQmkRgblightMode(mode)
    }
    if (rgbConfig.value) {
      rgbConfig.value.mode = mode
    }
  }

  async function setRgbBrightness(brightness: number) {
    if (!vialDevice.value || !lightingType.value) {
      throw new Error('Vial device not available or lighting not supported')
    }
    if (lightingType.value === 'vialrgb') {
      const config = rgbConfig.value
      if (config) {
        await vialDevice.value.setVialrgbConfig(config.mode, config.speed, config.hue, config.sat, brightness)
      }
    }
    else {
      await vialDevice.value.setQmkRgblightBrightness(brightness)
    }
    if (rgbConfig.value) {
      rgbConfig.value.brightness = brightness
      if (lightingType.value === 'vialrgb') {
        rgbConfig.value.val = brightness
      }
    }
  }

  async function setRgbSpeed(speed: number) {
    if (!vialDevice.value || !lightingType.value) {
      throw new Error('Vial device not available or lighting not supported')
    }
    if (lightingType.value === 'vialrgb') {
      const config = rgbConfig.value
      if (config) {
        await vialDevice.value.setVialrgbConfig(config.mode, speed, config.hue, config.sat, config.val)
      }
    }
    else {
      await vialDevice.value.setQmkRgblightSpeed(speed)
    }
    if (rgbConfig.value) {
      rgbConfig.value.speed = speed
    }
  }

  async function setRgbColor(hue: number, sat: number) {
    if (!vialDevice.value || !lightingType.value) {
      throw new Error('Vial device not available or lighting not supported')
    }
    if (lightingType.value === 'vialrgb') {
      const config = rgbConfig.value
      if (config) {
        await vialDevice.value.setVialrgbConfig(config.mode, config.speed, hue, sat, config.val)
      }
    }
    else {
      await vialDevice.value.setQmkRgblightColor(hue, sat)
    }
    if (rgbConfig.value) {
      rgbConfig.value.hue = hue
      rgbConfig.value.sat = sat
    }
  }

  async function saveRgbConfig() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    await vialDevice.value.saveRgb()
  }

  async function setKeycode(lyrRowCol: [number, number, number], keycode: number) {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    await vialDevice.value.setKeycode(lyrRowCol, keycode)
  };

  async function saveMacros() {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    if (!keyMacros.value || !macroCount.value) {
      throw new Error('Macros not available')
    }
    await vialDevice.value.setMacros(keyMacros.value, macroCount.value)
  }

  async function setEncoderKeycode(layer: number, encoderIdx: number, direction: 'ccw' | 'cw', keycode: number) {
    if (!vialDevice.value) {
      throw new Error('Vial device not available')
    }
    await vialDevice.value.setEncoderKeycode(layer, encoderIdx, direction, keycode)
    encoderKeymap.value.set([layer, encoderIdx, direction === 'cw' ? 1 : 0], keycode)
  }

  async function fetchAll() {
    // 并行会报错
    await fetchProductName()
    // 检查连接状态
    if (!isConnected.value) return
    
    await fetchLayerCount()
    if (!isConnected.value) return
    
    await fetchMacroCount()
    if (!isConnected.value) return
    
    await fetchTapDanceCount()
    if (!isConnected.value) return
    
    await fetchComboCount()
    if (!isConnected.value) return
    
    await fetchVialJson()
    if (!isConnected.value) return
    
    fetchKleDefinition()
    if (!isConnected.value) return
    
    await fetchKeymap()
    if (!isConnected.value) return
    
    fetchLayoutKeymap()
    if (!isConnected.value) return
    
    await fetchEncoderMap()
    if (!isConnected.value) return
    
    await fetchMacros()
    if (!isConnected.value) return
    
    await fetchTapDanceEntries()
    if (!isConnected.value) return
    
    await fetchComboEntries()
    if (!isConnected.value) return
    
    await fetchRgbConfig()
    if (!isConnected.value) return
    
    await fetchLayoutOptions()
  }

  function cleanAll() {
    productName.value = null
    layerCount.value = null
    macroCount.value = null
    tapDanceCount.value = null
    tapDanceEntries.value = null
    comboCount.value = null
    comboEntries.value = null
    vialJson.value = null
    kleDefinition.value = null
    keymap.value = null
    layoutKeymap.value = null
    encoderKeymap.value = new StringMap<[number, number, number], number>()
    keyMacros.value = null
    rgbConfig.value = null
  }

  function initializeApi() {
    if (api.value)
      return
    isTauri() ? (api.value = new TauriHIDApi()) : (api.value = new WebHIDApi())
  }

  async function list() {
    if (!api.value) {
      initializeApi()
    }
    if (!api.value) {
      console.error('HID API not available')
      return
    }

    return await api.value.listDevices()
  }

  async function connect(device: number[] | HIDDevice) {
    if (!api.value) {
      console.error('HID API not available')
      return
    }

    try {
      hidDevice.value = await api.value.connectDevice(device)
      vialDevice.value = new VialDevice(hidDevice.value)
      
      console.log('Keyboard connected, fetching data...')
      
      // 连接后立即获取所有必要的数据
      await fetchAll()
      
      console.log('Keyboard data fetched successfully')
    } catch (error) {
      console.error('Failed to connect or fetch keyboard data:', error)
      // 连接失败时清理状态
      cleanAll()
      throw error
    }
  }

  async function disconnect() {
    if (hidDevice.value) {
      await hidDevice.value.disconnect()
      hidDevice.value = null
      vialDevice.value = null
      cleanAll()
    }
  }

  return {
    device: vialDevice,
    productName,
    fetchProductName,
    layerCount,
    fetchLayerCount,
    macroCount,
    fetchMacroCount,
    tapDanceCount,
    tapDanceEntries,
    fetchTapDanceCount,
    fetchTapDanceEntries,
    setTapDanceEntry,
    comboCount,
    comboEntries,
    fetchComboCount,
    fetchComboEntries,
    setComboEntry,
    vialJson,
    fetchVialJson,
    kleDefinition,
    fetchKleDefinition,
    fetchKeymap,
    layoutKeymap,
    fetchLayoutKeymap,
    fetchKeyList,
    fetchEncoderMap,
    fetchEncoderList,
    encoderKeymap,
    keyMacros,
    fetchAll,
    cleanAll,
    list,
    connect,
    disconnect,
    isConnected,
    setKeycode,
    setEncoderKeycode,
    saveMacros,
    // RGB Lighting
    lightingType,
    rgbConfig,
    fetchRgbConfig,
    setRgbMode,
    setRgbBrightness,
    setRgbSpeed,
    setRgbColor,
    saveRgbConfig,
    // Layout options
    layoutOptions,
    fetchLayoutOptions,
  }
})
