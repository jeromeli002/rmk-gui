import {
  CMD_VIA_GET_LAYER_COUNT,
  CMD_VIA_KEYMAP_GET_BUFFER,
  CMD_VIA_LIGHTING_GET_VALUE,
  CMD_VIA_LIGHTING_SAVE,
  CMD_VIA_LIGHTING_SET_VALUE,
  CMD_VIA_MACRO_GET_BUFFER,
  CMD_VIA_MACRO_GET_BUFFER_SIZE,
  CMD_VIA_MACRO_GET_COUNT,
  CMD_VIA_MACRO_SET_BUFFER,
  CMD_VIA_SET_KEYCODE,
  CMD_VIA_VIAL_PREFIX,
  CMD_VIAL_DYNAMIC_ENTRY_OP,
  CMD_VIAL_GET_DEFINITION,
  CMD_VIAL_GET_ENCODER,
  CMD_VIAL_GET_SIZE,
  CMD_VIAL_SET_ENCODER,
  DYNAMIC_VIAL_COMBO_GET,
  DYNAMIC_VIAL_COMBO_SET,
  DYNAMIC_VIAL_GET_NUMBER_OF_ENTRIES,
  DYNAMIC_VIAL_TAP_DANCE_GET,
  DYNAMIC_VIAL_TAP_DANCE_SET,
  QMK_RGBLIGHT_BRIGHTNESS,
  QMK_RGBLIGHT_COLOR,
  QMK_RGBLIGHT_EFFECT,
  QMK_RGBLIGHT_EFFECT_SPEED,
  VialConstants,
  VIALRGB_GET_MODE,
  VIALRGB_SET_MODE,
} from '../types/constants'

export class VialDevice implements VialInterface {
  constructor(private device: HIDInterface) {}

  private readUint32LE(buffer: Uint8Array): number {
    if (buffer.length < 4) {
      throw new Error('Buffer must have at least 4 bytes')
    }
    return (buffer[0]! | (buffer[1]! << 8) | (buffer[2]! << 16) | (buffer[3]! << 24)) >>> 0
  }

  private async decompressToString(compressedData: number[]): Promise<string> {
    const compressedBytes = new Uint8Array(compressedData)
    const compressedStream = new ReadableStream({
      start(controller) {
        controller.enqueue(compressedBytes)
        controller.close()
      },
    })
    const decompressedStream = new XzReadableStream(compressedStream)
    const response = new Response(decompressedStream)
    return await response.text()
  }

  private async readChunk(cmd: number, size: number): Promise<number[]> {
    const MAX_RETRIES = 3
    const chunk: number[] = []
    const MSG_LEN = 32  // Message length from vial protocol
    
    let remaining = size
    let block = 0
    
    while (remaining > 0) {
      let lastError: any
      let success = false
      
      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          // Pack block number as 4-byte little-endian integer (like struct.pack("<BBI", ...))
          const msg = new Uint8Array(6)
          msg[0] = CMD_VIA_VIAL_PREFIX
          msg[1] = cmd
          msg[2] = block & 0xFF
          msg[3] = (block >> 8) & 0xFF
          msg[4] = (block >> 16) & 0xFF
          msg[5] = (block >> 24) & 0xFF
          
          const data = await this.device.writeRead(Array.from(msg))
          
          // If remaining size is less than MSG_LEN, only take what we need
          // Otherwise take all MSG_LEN bytes
          const bytesToTake = Math.min(remaining, MSG_LEN)
          chunk.push(...data.slice(0, bytesToTake))
          
          success = true
          break
        } catch (error) {
          lastError = error
          console.warn(`readChunk: Attempt ${attempt + 1} failed for block ${block}:`, error)
          if (attempt < MAX_RETRIES - 1) {
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }
      }
      
      if (!success) {
        throw new Error(`Failed to read block ${block}: ${lastError?.message || 'Unknown error'}`)
      }
      
      remaining -= MSG_LEN
      block++
    }
    
    return chunk.slice(0, size)
  }

  private async readOffset(cmd: number, size: number, offset: number): Promise<number[]> {
    const MAX_RETRIES = 3
    const chunk: number[] = []

    for (let x = 0; x < size; x += VialConstants.BUFFER_CHUNK_SIZE) {
      const currentReadOffset = offset + x
      const sz = Math.min(size - x, VialConstants.BUFFER_CHUNK_SIZE)
      let lastError: any

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          // Use little-endian for offset (like struct.pack("<BHH", ...))
          const msg = [
            cmd,
            currentReadOffset & 0xFF,  // Low byte first (little-endian)
            (currentReadOffset >> 8) & 0xFF,  // High byte second
            sz
          ]
          const data = await this.device.writeRead(msg)
          chunk.push(...data.slice(VialConstants.HEADER_SIZE, VialConstants.HEADER_SIZE + sz))
          break
        } catch (error) {
          lastError = error
          console.warn(`readOffset: Attempt ${attempt + 1} failed for offset ${currentReadOffset}:`, error)
          if (attempt < MAX_RETRIES - 1) {
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }
      }

      if (chunk.length < x + sz) {
        throw new Error(`Failed to read offset ${currentReadOffset}: ${lastError?.message || 'Unknown error'}`)
      }
    }
    return chunk.slice(0, size)
  }

  private readU16(data: Uint8Array<ArrayBufferLike>, offset: number): number {
    return (data[offset]! << 8) | data[offset + 1]!
  }

  private splitArray(arr: number[], predicate: (value: number) => boolean): number[][] {
    const result: number[][] = []
    let current: number[] = []

    for (const item of arr) {
      if (predicate(item)) {
        if (current.length > 0) {
          result.push(current)
          current = []
        }
      }
      else {
        current.push(item)
      }
    }

    if (current.length > 0) {
      result.push(current)
    }

    return result
  }

  private symbolToKeycode(symbol: [string | null, string | null]): number {
    const normalized = JSON.stringify(symbol)
    for (const [code, info] of Object.entries(keyCodeMap)) {
      if (JSON.stringify(info.symbol) === normalized) {
        return Number(code)
      }
    }
    return 0
  }

  private serializeMacroAction(action: MacroAction): number[] {
    if (action.type === MacroCode.Text) {
      return Array.from((action.text ?? '').slice(0, 255)).map(c => c.charCodeAt(0))
    }

    if (action.type === MacroCode.Delay) {
      const delay = Math.max(0, action.delay ?? 0)
      const delay1 = (delay % 255) + 1
      const delay2 = Math.floor(delay / 255) + 1
      return [MacroCode.Prefix, MacroCode.Delay, delay1, delay2]
    }

    if (!action.keyCodes || action.keyCodes.length === 0)
      return []

    const bytes: number[] = []
    for (const key of action.keyCodes) {
      const code = this.symbolToKeycode(key)
      const low = code & 0xFF
      const high = (code >> 8) & 0xFF

      if (high === 0) {
        const baseType = action.type === MacroCode.ExtTap
          ? MacroCode.Tap
          : action.type === MacroCode.ExtDown ? MacroCode.Down : action.type === MacroCode.ExtUp ? MacroCode.Up : action.type
        bytes.push(MacroCode.Prefix, baseType, low)
      }
      else {
        const extType = action.type === MacroCode.Tap
          ? MacroCode.ExtTap
          : action.type === MacroCode.Down ? MacroCode.ExtDown : action.type === MacroCode.Up ? MacroCode.ExtUp : action.type
        bytes.push(MacroCode.Prefix, extType, low, high)
      }
    }
    return bytes
  }

  private serializeMacros(macros: Array<Array<MacroAction>>): number[] {
    const payload: number[] = []
    for (const macro of macros) {
      for (const action of macro) {
        payload.push(...this.serializeMacroAction(action))
      }
      payload.push(0)
    }
    return payload
  }

  private keyCodeFromBytes(bytes: number[]): KeyInfo {
    const value = bytes[1]
    if (value && keyCodeMap[value]) {
      return keyCodeMap[value]
    }
    return keyCodeMap[0]!
  }

  private macroDeserializeV2(rawMacros: number[][], count: number): Array<Array<MacroAction>> {
    const macrosActions: Array<Array<MacroAction>> = []
    rawMacros.forEach((rawMacro, idx) => {
      const macroActions: Array<MacroAction> = []
      let action: MacroAction | null = null

      let prevCode: MacroCode | null = null

      while (rawMacro.length > 0) {
        let code = rawMacro[0]
        let macroCode = code as MacroCode

        if (macroCode === MacroCode.Prefix) {
          rawMacro.shift()

          if (rawMacro.length === 0) {
            throw new Error(`Macro format error: insufficient data after prefix, index: ${idx}`)
          }

          code = rawMacro.shift() as number
          macroCode = code as MacroCode

          const newAction = fromMacroCode(macroCode)

          if (action && prevCode != null && fromMacroCode(macroCode).type !== fromMacroCode(prevCode).type) {
            prevCode = macroCode
            if (action) {
              macroActions.push(action)
            }
            action = newAction
          }
          if (!action) {
            action = fromMacroCode(macroCode)
          }
          if (!prevCode) {
            prevCode = macroCode
          }
          if (action && (macroCode === MacroCode.Tap || macroCode === MacroCode.Prefix || macroCode === MacroCode.Down || macroCode === MacroCode.Up)) {
            if (rawMacro.length === 0) {
              throw new Error(`Macro format error: missing keycode, index: ${idx}`)
            }
            const keyCodeData = [0, rawMacro.shift() as number]
            const key: [string | null, string | null] = this.keyCodeFromBytes(keyCodeData).symbol

            if ('keyCodes' in action) {
              (action as { keyCodes: [string | null, string | null][] }).keyCodes.push(key)
            }
          }
          else if (action && (macroCode === MacroCode.ExtTap || macroCode === MacroCode.ExtDown || macroCode === MacroCode.ExtUp)) {
            if (rawMacro.length < 2) {
              throw new Error(`Macro format error: missing Ext keycode, index: ${idx}`)
            }
            let key: [string | null, string | null]
            const keyCodeData1 = [0, rawMacro.shift() as number]
            const keyCodeData2 = [0, rawMacro.shift() as number]
            if (keyCodeData2[1] === 255) {
              keyCodeData1[1] = keyCodeData1[1]! * 16 ** 2
              key = this.keyCodeFromBytes(keyCodeData1).symbol
            }
            else {
              keyCodeData2[1] = keyCodeData2[1]! * 16 ** 2
              key = [this.keyCodeFromBytes(keyCodeData2).symbol[0], this.keyCodeFromBytes(keyCodeData1).symbol[1]]
            }
            if ('keyCodes' in action) {
              (action as { keyCodes: [string | null, string | null][] }).keyCodes.push(key)
            }
          }
          else if (action && macroCode === MacroCode.Delay) {
            if (rawMacro.length < 2) {
              throw new Error(`Macro format error: incomplete delay data, index: ${idx}`)
            }

            const delay1 = rawMacro.shift() as number
            const delay2 = rawMacro.shift() as number
            const delay = (delay1 - 1) + (delay2 - 1) * 255;
            (action as { delay: number | null }).delay = delay
          }
        }
        else {
          if (!action) {
            action = { type: MacroCode.Text, name: MacroCode[MacroCode.Text], text: '' }
          }

          if (action && action.type !== MacroCode.Text) {
            if (action) {
              macroActions.push(action)
            }
            action = { type: MacroCode.Text, name: MacroCode[MacroCode.Text], text: '' }
          }

          if (action && action.type === MacroCode.Text) {
            action.text += String.fromCharCode(rawMacro.shift() as number)
          }
        }
      }

      if (action) {
        macroActions.push(action)
      }

      macrosActions.push(macroActions)
    })
    while (macrosActions.length < count) {
      macrosActions.push([])
    }

    return macrosActions
  }

  async productName(): Promise<string> {
    return await this.device.productName()
  }

  async layerCount(): Promise<number> {
    const data = await this.device.writeRead([CMD_VIA_GET_LAYER_COUNT])
    return data[1]!
  }

  async marcoCount(): Promise<number> {
    const data = await this.device.writeRead([CMD_VIA_MACRO_GET_COUNT])
    return data[1]!
  }

  async keymap(layerCount: number, rowCount: number, colCount: number): Promise<IndexMap> {
    const size = layerCount * rowCount * colCount * 2
    const rawData = await this.readOffset(CMD_VIA_KEYMAP_GET_BUFFER, size, 0)

    const keymapResult = new StringMap<[number, number, number], number>()

    for (let layer = 0; layer < layerCount; layer++) {
      for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
          const offset = (layer * rowCount * colCount + row * colCount + col) * 2
          if (offset + 1 < rawData.length) {
            const keycode = 256 * rawData[offset]! + rawData[offset + 1]!
            keymapResult.set([layer, row, col], keycode)
          }
          else {
            console.error(
              `Keymap data out of bounds for layer ${layer}, row ${row}, col ${col}. Raw data length: ${rawData.length}`,
            )
          }
        }
      }
    }
    return keymapResult
  }

  async vialJson(): Promise<VialJson> {
    const MAX_RETRIES = 3
    let lastError: any

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const sizeData = await this.device.writeRead([CMD_VIA_VIAL_PREFIX, CMD_VIAL_GET_SIZE])
        const size = this.readUint32LE(sizeData)
        const data = await this.readChunk(CMD_VIAL_GET_DEFINITION, size)
        const rawText = await this.decompressToString(data)
        return JSON.parse(rawText) as VialJson
      } catch (error) {
        lastError = error
        console.warn(`Attempt ${attempt + 1} failed:`, error)
        if (attempt < MAX_RETRIES - 1) {
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    }

    throw new Error(`Failed to get vial json after ${MAX_RETRIES} attempts: ${lastError?.message || 'Unknown error'}`)
  }

  layoutKeymap(
    layout: InstanceType<typeof KleBoard>,
    keymap: IndexMap,
    layerCount: number,
  ): IndexMap {
    const layoutKeymap = new StringMap<[number, number, number], number>()
    for (const key of layout.keys) {
      const isEncoder = key.labels.some((label: string | null) => label?.trim().toLowerCase() === 'e')
      if (isEncoder) {
        continue
      }

      // Parse the first label to get row,col
      // The label format might be "row,col" or "row,col\nlayer1\nlayer2..."
      const firstLabel = key.labels[0]
      if (!firstLabel) {
        continue
      }
      
      // Split by newline and take the first part
      const labelParts = firstLabel.split('\n')[0]
      const [row, col] = labelParts.split(',').map(n => Number.parseInt(n, 10))
      
      if (Number.isNaN(row) || Number.isNaN(col)) {
        console.warn('Invalid key label:', firstLabel, 'for key:', key)
        continue
      }
      
      for (let layer = 0; layer < layerCount; layer++) {
        const keycode = keymap.get([layer, row!, col!])
        if (keycode !== undefined) {
          layoutKeymap.set([layer, row!, col!], keycode)
        }
      }
    }
    return layoutKeymap
  }

  kleDefinition(vialJson: VialJson): InstanceType<typeof KleBoard> {
    return deserialize(vialJson.layouts.keymap)
  }

  async macros(macroCount: number): Promise<Array<Array<MacroAction>>> {
    const sizeData = await this.device.writeRead([CMD_VIA_MACRO_GET_BUFFER_SIZE])
    const macroSize = this.readU16(sizeData, 1)

    const macroMemory: number[] = []

    for (let i = 0; i < Math.ceil(macroSize / VialConstants.BUFFER_CHUNK_SIZE); i++) {
      const readSize = Math.min(VialConstants.BUFFER_CHUNK_SIZE, macroSize - i * VialConstants.BUFFER_CHUNK_SIZE)

      const msg = new Uint8Array(32)
      msg[0] = CMD_VIA_MACRO_GET_BUFFER
      msg[1] = (i * VialConstants.BUFFER_CHUNK_SIZE) >> 8
      msg[2] = (i * VialConstants.BUFFER_CHUNK_SIZE) & 0xFF
      msg[3] = readSize

      const data = await this.device.writeRead(Array.from(msg))
      for (let j = 0; j < readSize; j++) {
        macroMemory.push(data[4 + j]!)
      }
      const zeroCount = macroMemory.filter(x => x === 0).length
      if (zeroCount > macroCount) {
        break
      }
    }
    let macros = this.splitArray(macroMemory, x => x === 0)
    macros = macros.slice(0, macroCount)
    const deserializedMacros = this.macroDeserializeV2(macros, macroCount)
    return deserializedMacros
  };

  async setMacros(macros: Array<Array<MacroAction>>, count: number): Promise<void> {
    const sizeData = await this.device.writeRead([VialConstants.Command.GetMacroBufferSize])
    const macroSize = this.readU16(sizeData, 1)
    const serialized = this.serializeMacros(macros.slice(0, count))
    const buffer = new Uint8Array(macroSize)
    buffer.set(serialized.slice(0, macroSize))

    for (let i = 0; i < Math.ceil(macroSize / VialConstants.BUFFER_CHUNK_SIZE); i++) {
      const writeSize = Math.min(VialConstants.BUFFER_CHUNK_SIZE, macroSize - i * VialConstants.BUFFER_CHUNK_SIZE)
      const msg = new Uint8Array(32)
      msg[0] = CMD_VIA_MACRO_SET_BUFFER
      msg[1] = (i * VialConstants.BUFFER_CHUNK_SIZE) >> 8
      msg[2] = (i * VialConstants.BUFFER_CHUNK_SIZE) & 0xFF
      msg[3] = writeSize
      for (let j = 0; j < writeSize; j++) {
        msg[4 + j] = buffer[i * VialConstants.BUFFER_CHUNK_SIZE + j]!
      }
      await this.device.writeRead(Array.from(msg))
    }
  }

  async setKeycode(lyrRowCol: [number, number, number], keycode: number): Promise<void> {
    const msg = [CMD_VIA_SET_KEYCODE, ...lyrRowCol, (keycode >> 8) & 0xFF, keycode & 0xFF]
    await this.device.writeRead(msg)
  }

  async encoderKeycode(layer: number, encoderIdx: number, direction: 'ccw' | 'cw'): Promise<number> {
    const dir = direction === 'cw' ? 1 : 0
    const data = await this.device.writeRead([CMD_VIA_VIAL_PREFIX, CMD_VIAL_GET_ENCODER, layer, encoderIdx, dir])
    return (data[0]! << 8) | data[1]!
  }

  async setEncoderKeycode(layer: number, encoderIdx: number, direction: 'ccw' | 'cw', keycode: number): Promise<void> {
    const dir = direction === 'cw' ? 1 : 0
    const msg = [CMD_VIA_VIAL_PREFIX, CMD_VIAL_SET_ENCODER, layer, encoderIdx, dir, (keycode >> 8) & 0xFF, keycode & 0xFF]
    await this.device.writeRead(msg)
  }

  async getTapDanceCount(): Promise<number> {
    const data = await this.device.writeRead([CMD_VIA_VIAL_PREFIX, CMD_VIAL_DYNAMIC_ENTRY_OP, DYNAMIC_VIAL_GET_NUMBER_OF_ENTRIES])
    return data[0]!
  }

  async getTapDanceEntry(idx: number): Promise<[number, number, number, number, number]> {
    const data = await this.device.writeRead([CMD_VIA_VIAL_PREFIX, CMD_VIAL_DYNAMIC_ENTRY_OP, DYNAMIC_VIAL_TAP_DANCE_GET, idx])
    if (data[0] !== 0) {
      throw new Error(`Failed to get tap dance entry ${idx}`)
    }
    return [
      data[1]! | (data[2]! << 8),
      data[3]! | (data[4]! << 8),
      data[5]! | (data[6]! << 8),
      data[7]! | (data[8]! << 8),
      data[9]! | (data[10]! << 8),
    ]
  }

  async setTapDanceEntry(idx: number, entry: [number, number, number, number, number]): Promise<void> {
    const msg = [
      CMD_VIA_VIAL_PREFIX,
      CMD_VIAL_DYNAMIC_ENTRY_OP,
      DYNAMIC_VIAL_TAP_DANCE_SET,
      idx,
      entry[0] & 0xFF,
      (entry[0] >> 8) & 0xFF,
      entry[1] & 0xFF,
      (entry[1] >> 8) & 0xFF,
      entry[2] & 0xFF,
      (entry[2] >> 8) & 0xFF,
      entry[3] & 0xFF,
      (entry[3] >> 8) & 0xFF,
      entry[4] & 0xFF,
      (entry[4] >> 8) & 0xFF,
    ]
    await this.device.writeRead(msg)
  }

  async getComboCount(): Promise<number> {
    const data = await this.device.writeRead([CMD_VIA_VIAL_PREFIX, CMD_VIAL_DYNAMIC_ENTRY_OP, DYNAMIC_VIAL_GET_NUMBER_OF_ENTRIES])
    return data[1]!
  }

  async getComboEntry(idx: number): Promise<[number, number, number, number, number]> {
    const data = await this.device.writeRead([CMD_VIA_VIAL_PREFIX, CMD_VIAL_DYNAMIC_ENTRY_OP, DYNAMIC_VIAL_COMBO_GET, idx])
    if (data[0] !== 0) {
      throw new Error(`Failed to get combo entry ${idx}`)
    }
    return [
      data[1]! | (data[2]! << 8),
      data[3]! | (data[4]! << 8),
      data[5]! | (data[6]! << 8),
      data[7]! | (data[8]! << 8),
      data[9]! | (data[10]! << 8),
    ]
  }

  async setComboEntry(idx: number, entry: [number, number, number, number, number]): Promise<void> {
    const msg = [
      CMD_VIA_VIAL_PREFIX,
      CMD_VIAL_DYNAMIC_ENTRY_OP,
      DYNAMIC_VIAL_COMBO_SET,
      idx,
      entry[0] & 0xFF,
      (entry[0] >> 8) & 0xFF,
      entry[1] & 0xFF,
      (entry[1] >> 8) & 0xFF,
      entry[2] & 0xFF,
      (entry[2] >> 8) & 0xFF,
      entry[3] & 0xFF,
      (entry[3] >> 8) & 0xFF,
      entry[4] & 0xFF,
      (entry[4] >> 8) & 0xFF,
    ]
    await this.device.writeRead(msg)
  }

  // QMK RGBLight methods
  async getQmkRgblightConfig(): Promise<{ mode: number, hue: number, sat: number, brightness: number, speed: number }> {
    const brightnessData = await this.device.writeRead([CMD_VIA_LIGHTING_GET_VALUE, QMK_RGBLIGHT_BRIGHTNESS])
    const effectData = await this.device.writeRead([CMD_VIA_LIGHTING_GET_VALUE, QMK_RGBLIGHT_EFFECT])
    const speedData = await this.device.writeRead([CMD_VIA_LIGHTING_GET_VALUE, QMK_RGBLIGHT_EFFECT_SPEED])
    const colorData = await this.device.writeRead([CMD_VIA_LIGHTING_GET_VALUE, QMK_RGBLIGHT_COLOR])

    return {
      mode: effectData[2] ?? 0,
      hue: colorData[2] ?? 0,
      sat: colorData[3] ?? 255,
      brightness: brightnessData[2] ?? 255,
      speed: speedData[2] ?? 0,
    }
  }

  async setQmkRgblightMode(mode: number): Promise<void> {
    await this.device.writeRead([CMD_VIA_LIGHTING_SET_VALUE, QMK_RGBLIGHT_EFFECT, mode])
  }

  async setQmkRgblightBrightness(brightness: number): Promise<void> {
    await this.device.writeRead([CMD_VIA_LIGHTING_SET_VALUE, QMK_RGBLIGHT_BRIGHTNESS, brightness])
  }

  async setQmkRgblightSpeed(speed: number): Promise<void> {
    await this.device.writeRead([CMD_VIA_LIGHTING_SET_VALUE, QMK_RGBLIGHT_EFFECT_SPEED, speed])
  }

  async setQmkRgblightColor(hue: number, sat: number): Promise<void> {
    await this.device.writeRead([CMD_VIA_LIGHTING_SET_VALUE, QMK_RGBLIGHT_COLOR, hue, sat])
  }

  // VialRGB methods
  async getVialrgbConfig(): Promise<{ mode: number, hue: number, sat: number, val: number, speed: number }> {
    const data = await this.device.writeRead([CMD_VIA_LIGHTING_GET_VALUE, VIALRGB_GET_MODE])
    // Response: [cmd, subcmd, mode_l, mode_h, speed, h, s, v, ...]
    const mode = data[2]! | (data[3]! << 8)
    const speed = data[4]!
    const h = data[5]!
    const s = data[6]!
    const v = data[7]!

    return {
      mode,
      hue: h,
      sat: s,
      val: v,
      speed,
    }
  }

  async setVialrgbConfig(mode: number, speed: number, h: number, s: number, v: number): Promise<void> {
    // VialRGB uses a single command to set all values
    // Format: [CMD_VIA_LIGHTING_SET_VALUE, VIALRGB_SET_MODE, mode_l, mode_h, speed, h, s, v]
    await this.device.writeRead([
      CMD_VIA_LIGHTING_SET_VALUE,
      VIALRGB_SET_MODE,
      mode & 0xFF,
      (mode >> 8) & 0xFF,
      speed,
      h,
      s,
      v,
    ])
  }

  // Generic RGB save
  async saveRgb(): Promise<void> {
    await this.device.writeRead([CMD_VIA_LIGHTING_SAVE])
  }

  // Layout options methods
  async getLayoutOptions(): Promise<number> {
    const data = await this.device.writeRead([CMD_VIA_GET_KEYBOARD_VALUE, VIA_LAYOUT_OPTIONS])
    return (data[2]! << 24) | (data[3]! << 16) | (data[4]! << 8) | data[5]!
  }

  async setLayoutOptions(options: number): Promise<void> {
    await this.device.writeRead([CMD_VIA_SET_KEYBOARD_VALUE, VIA_LAYOUT_OPTIONS, (options >> 24) & 0xFF, (options >> 16) & 0xFF, (options >> 8) & 0xFF, options & 0xFF])
  }

  // Reset functions
  async resetKeyboard(): Promise<void> {
    // 发送 0xAB 01 后跟 30 个 0
    const data = new Uint8Array(32)
    data[0] = 0xAB
    data[1] = 0x01
    // 其余字节默认为 0
    await this.device.writeRead(Array.from(data))
  }

  async restartKeyboard(): Promise<void> {
    // 发送 0xAB 01 后跟 30 个 0
    const data = new Uint8Array(32)
    data[0] = 0xAB
    data[1] = 0x02
    // 其余字节默认为 0
    await this.device.writeRead(Array.from(data))
  }

  async enterBootloader(): Promise<void> {
    // 发送 0xAB 00 后跟 30 个 0
    const data = new Uint8Array(32)
    data[0] = 0xAB
    data[1] = 0x00
    // 其余字节默认为 0
    await this.device.writeRead(Array.from(data))
  }
}
