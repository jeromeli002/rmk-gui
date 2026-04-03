<script lang="ts" setup>
const keyboardStore = useKeyboardStore()

const currLayer = ref(0)
const currLayerStr = computed({
  get: () => currLayer.value.toString(),
  set: (value) => {
    currLayer.value = Number.parseInt(value)
  },
})
const currKey = ref<[[number, number], 'outer' | 'inner'] | null>(null)
const currEncoder = ref<{
  encoder: number
  direction: 'ccw' | 'cw'
  geometry: { x: number, y: number, width: number, height: number }
  info: { code: number, symbol: [string | null, string | null] }
} | null>(null)

const showKeycodeEditor = ref(false)
const editingKey = ref<Key | null>(null)
const editingZone = ref<'outer' | 'inner'>('outer')
const keys = computed(() => keyboardStore.fetchKeyList(currLayer.value))
const encoders = computed(() => keyboardStore.fetchEncoderList(currLayer.value))
const layerOption = Array.from({ length: keyboardStore.layerCount! }, (_, i) => i.toString())
const keySize = 64
const encoderButtonSize = 56

const highlight = computed(() => {
  const map = new StringMap<[number, number], 'outer' | 'inner'>()
  currKey.value && map.set(currKey.value[0], currKey.value[1])
  return map
})

function handleSelected(key: Key, zone: 'outer' | 'inner') {
  currEncoder.value = null
  const [row, col] = [key.position.row, key.position.col]
  const isCurr = currKey.value?.[0][0] === row && currKey.value?.[0][1] === col
  currKey.value = isCurr ? null : [[row, col], zone]
}

function handleSelectEncoder(binding: NonNullable<typeof currEncoder.value>) {
  currKey.value = null
  const isCurr = currEncoder.value?.encoder === binding.encoder && currEncoder.value?.direction === binding.direction
  currEncoder.value = isCurr ? null : binding
}

function selectNext() {
  // 创建所有控件的有序列表（按键和编码器）
  const allControls = []

  // 添加按键
  for (const key of keys.value) {
    allControls.push({
      type: 'key' as const,
      value: key,
      position: {
        x: key.geometry.x,
        y: key.geometry.y,
      },
    })
  }

  // 添加编码器
  for (const encoder of encoders.value) {
    if (encoder.ccw) {
      allControls.push({
        type: 'encoder' as const,
        value: encoder.ccw,
        position: {
          x: encoder.ccw.geometry.x,
          y: encoder.ccw.geometry.y,
        },
      })
    }
    if (encoder.cw) {
      allControls.push({
        type: 'encoder' as const,
        value: encoder.cw,
        position: {
          x: encoder.cw.geometry.x,
          y: encoder.cw.geometry.y,
        },
      })
    }
  }

  // 按位置排序（先按y坐标，再按x坐标）
  allControls.sort((a, b) => {
    if (a.position.y !== b.position.y) {
      return a.position.y - b.position.y
    }
    return a.position.x - b.position.x
  })

  // 找到当前选中的控件在列表中的索引
  let currentIndex = -1
  if (currKey.value) {
    currentIndex = allControls.findIndex(control =>
      control.type === 'key'
      && control.value.position.row === currKey.value[0][0]
      && control.value.position.col === currKey.value[0][1],
    )
  }
  else if (currEncoder.value) {
    currentIndex = allControls.findIndex(control =>
      control.type === 'encoder'
      && control.value.encoder === currEncoder.value?.encoder
      && control.value.direction === currEncoder.value?.direction,
    )
  }

  // 选择下一个控件
  if (currentIndex >= 0 && currentIndex < allControls.length - 1) {
    const nextControl = allControls[currentIndex + 1]
    if (nextControl.type === 'key') {
      currKey.value = [[nextControl.value.position.row, nextControl.value.position.col], 'outer']
      currEncoder.value = null
    }
    else {
      currEncoder.value = nextControl.value
      currKey.value = null
    }
  }
  else if (allControls.length > 0) {
    // 如果已经是最后一个控件，回到第一个
    const firstControl = allControls[0]
    if (firstControl.type === 'key') {
      currKey.value = [[firstControl.value.position.row, firstControl.value.position.col], 'outer']
      currEncoder.value = null
    }
    else {
      currEncoder.value = firstControl.value
      currKey.value = null
    }
  }
}

function handleSetKey(key: Key) {
  if (!currKey.value && !currEncoder.value) {
    return
  }

  if (currEncoder.value) {
    // 立即更新本地状态以避免延迟
    const directionValue = currEncoder.value.direction === 'cw' ? 1 : 0
    keyboardStore.encoderKeymap!.set([currLayer.value, currEncoder.value.encoder, directionValue], key.info.code)
    currEncoder.value.info.code = key.info.code
    currEncoder.value.info.symbol = [...key.info.symbol]
    // 异步写入设备
    keyboardStore.setEncoderKeycode(currLayer.value, currEncoder.value.encoder, currEncoder.value.direction, key.info.code)
    selectNext()
    return
  }

  if (currKey.value) {
    const currKeyPos: [number, number, number] = [currLayer.value, ...currKey.value[0]]
    let code = key.info.code

    if (currKey.value[1] === 'inner') {
      const currKeyCode = keyboardStore.layoutKeymap!.get(currKeyPos)!
      code = (currKeyCode & 0xFF00) + key.info.code
    }
    keyboardStore.setKeycode(currKeyPos, code)
    keyboardStore.layoutKeymap!.set(currKeyPos, code)
    selectNext()
  }
}

function handleDblClick(key: Key, zone: 'outer' | 'inner') {
  editingKey.value = key
  editingZone.value = zone
  showKeycodeEditor.value = true
}

async function handleSaveKeycode(keycode: number) {
  if (!editingKey.value)
    return

  // 检查是否是编码器
  if ('encoder' in editingKey.value) {
    // 编码器
    await keyboardStore.setEncoderKeycode(currLayer.value, editingKey.value.encoder, editingKey.value.direction, keycode)
  }
  else {
    // 普通按键
    const [row, col] = [editingKey.value.position.row, editingKey.value.position.col]
    const currKeyPos: [number, number, number] = [currLayer.value, row, col]

    let code = keycode
    if (editingZone.value === 'inner') {
      const currKeyCode = keyboardStore.layoutKeymap!.get(currKeyPos) ?? 0
      code = (currKeyCode & 0xFF00) + (keycode & 0x00FF)
    }

    keyboardStore.setKeycode(currKeyPos, code)
    keyboardStore.layoutKeymap!.set(currKeyPos, code)
  }

  editingKey.value = null
  showKeycodeEditor.value = false
}

function getEncoderLabel(binding: NonNullable<typeof currEncoder.value>) {
  const label = binding.info.symbol[1] ?? ''
  if (/^e\d+$/i.test(label.trim())) {
    return $t('keymap.encoder')
  }
  return label
}

const boardBounds = computed(() => {
  let minX = 0
  let minY = 0
  let maxX = 0
  let maxY = 0

  for (const key of keys.value) {
    minX = Math.min(minX, key.geometry.x * keySize)
    minY = Math.min(minY, key.geometry.y * keySize)
    maxX = Math.max(maxX, (key.geometry.x + key.geometry.width) * keySize)
    maxY = Math.max(maxY, (key.geometry.y + key.geometry.height) * keySize)
  }

  const updateByEncoder = (binding: NonNullable<typeof currEncoder.value> | null) => {
    if (!binding)
      return
    const centerX = (binding.geometry.x + binding.geometry.width / 2) * keySize
    const centerY = (binding.geometry.y + binding.geometry.height / 2) * keySize
    minX = Math.min(minX, centerX - encoderButtonSize / 2)
    minY = Math.min(minY, centerY - encoderButtonSize / 2)
    maxX = Math.max(maxX, centerX + encoderButtonSize / 2)
    maxY = Math.max(maxY, centerY + encoderButtonSize / 2)
  }

  for (const encoder of encoders.value) {
    updateByEncoder(encoder.ccw)
    updateByEncoder(encoder.cw)
  }

  return { minX, minY, maxX, maxY }
})

const boardStyle = computed(() => {
  const bounds = boardBounds.value
  return {
    width: `${bounds.maxX - bounds.minX}px`,
    height: `${bounds.maxY - bounds.minY}px`,
  }
})

const keyboardStyle = computed(() => {
  const bounds = boardBounds.value
  return {
    transform: `translate(${(-bounds.minX)}px, ${(-bounds.minY)}px)`,
  }
})

function getEncoderButtonStyle(binding: NonNullable<typeof currEncoder.value>) {
  const size = encoderButtonSize
  const centerX = (binding.geometry.x + binding.geometry.width / 2) * keySize
  const centerY = (binding.geometry.y + binding.geometry.height / 2) * keySize
  const offsetX = -boardBounds.value.minX
  const offsetY = -boardBounds.value.minY

  return {
    left: `${centerX - size / 2 + offsetX}px`,
    top: `${centerY - size / 2 + offsetY}px`,
    width: `${size}px`,
    height: `${size}px`,
  }
}
</script>

<template>
  <div class="size-full p-3">
    <div class="flex h-full flex-col items-center justify-between">
      <div class="flex w-full justify-start">
        <SelectButton v-model="currLayerStr" :allow-empty="false" :options="layerOption" size="small" />
      </div>
      <div class="relative" :style="boardStyle">
        <Keyboard :keys="keys" :key-size="keySize" :highlight="highlight" :style="keyboardStyle" @click="handleSelected" @dblclick="handleDblClick" />
        <template v-for="encoder in encoders" :key="encoder.index">
          <button
            v-if="encoder.ccw"
            class="absolute z-20 flex size-[56px] items-center justify-center rounded-full border-2 border-surface-400 bg-surface-100 text-xs shadow-sm dark:border-surface-500 dark:bg-surface-800"
            :class="{ '!border-primary !text-primary': currEncoder?.encoder === encoder.index && currEncoder?.direction === 'ccw' }"
            :style="getEncoderButtonStyle(encoder.ccw)"
            @click="handleSelectEncoder(encoder.ccw)"
            @dblclick="handleDblClick(encoder.ccw as any, 'outer')"
          >
            <Icon name="tabler:rotate-2" class="absolute left-1 top-1 text-sm" />
            <span class="max-w-[80%] break-all text-center leading-tight">{{ getEncoderLabel(encoder.ccw) }}</span>
          </button>
          <button
            v-if="encoder.cw"
            class="absolute z-20 flex size-[56px] items-center justify-center rounded-full border-2 border-surface-400 bg-surface-100 text-xs shadow-sm dark:border-surface-500 dark:bg-surface-800"
            :class="{ '!border-primary !text-primary': currEncoder?.encoder === encoder.index && currEncoder?.direction === 'cw' }"
            :style="getEncoderButtonStyle(encoder.cw)"
            @click="handleSelectEncoder(encoder.cw)"
            @dblclick="handleDblClick(encoder.cw as any, 'outer')"
          >
            <Icon name="tabler:rotate-clockwise-2" class="absolute right-1 top-1 text-sm" />
            <span class="max-w-[80%] break-all text-center leading-tight">{{ getEncoderLabel(encoder.cw) }}</span>
          </button>
        </template>
      </div>
      <MapperPanel @set-key="handleSetKey" />
    </div>
  </div>

  <KeycodeEditor
    v-model:visible="showKeycodeEditor"
    :key-info="editingKey"
    @save="handleSaveKeycode"
  />
</template>
