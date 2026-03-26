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
const keys = computed(() => keyboardStore.fetchKeyList(currLayer.value))
const encoders = computed(() => keyboardStore.fetchEncoderList(currLayer.value))
const layerOption = Array.from({ length: keyboardStore.layerCount! }, (_, i) => i.toString())
const keySize = 64
const encoderButtonSize = 46

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
  for (let col = currKey.value![0][1] + 1; col < keyboardStore.vialJson!.matrix.cols!; col++) {
    if (keyboardStore.layoutKeymap!.has([currLayer.value, currKey.value![0][0], col])) {
      currKey.value = [[currKey.value![0][0], col], 'outer']
      return
    }
  }
  for (let r = currKey.value![0][0] + 1; r < keyboardStore.vialJson!.matrix.rows! + currKey.value![0][0]; r++) {
    const row = r % keyboardStore.vialJson!.matrix.rows!
    for (let col = 0; col < keyboardStore.vialJson!.matrix.cols!; col++) {
      if (keyboardStore.layoutKeymap!.has([currLayer.value, row, col])) {
        currKey.value = [[row, col], 'outer']
        return
      }
    }
  }
}

function handleSetKey(key: Key) {
  if (!currKey.value && !currEncoder.value) {
    return
  }

  if (currEncoder.value) {
    keyboardStore.setEncoderKeycode(currLayer.value, currEncoder.value.encoder, currEncoder.value.direction, key.info.code)
    currEncoder.value.info.code = key.info.code
    currEncoder.value.info.symbol = [...key.info.symbol]
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

function getEncoderLabel(binding: NonNullable<typeof currEncoder.value>) {
  const label = binding.info.symbol[1] ?? ''
  if (/^e\d+$/i.test(label.trim())) {
    return ''
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
        <Keyboard :keys="keys" :key-size="keySize" :highlight="highlight" :style="keyboardStyle" @click="handleSelected" />
        <template v-for="encoder in encoders" :key="encoder.index">
          <button
            v-if="encoder.ccw"
            class="absolute z-20 flex items-center justify-center rounded-full border-2 border-surface-400 bg-surface-50 text-[10px] dark:border-surface-500 dark:bg-surface-700"
            :class="{ '!border-primary !text-primary': currEncoder?.encoder === encoder.index && currEncoder?.direction === 'ccw' }"
            :style="getEncoderButtonStyle(encoder.ccw)"
            @click="handleSelectEncoder(encoder.ccw)"
          >
            <Icon name="tabler:rotate-2" class="absolute left-1 top-1 text-sm" />
            <span>{{ getEncoderLabel(encoder.ccw) }}</span>
          </button>
          <button
            v-if="encoder.cw"
            class="absolute z-20 flex items-center justify-center rounded-full border-2 border-surface-400 bg-surface-50 text-[10px] dark:border-surface-500 dark:bg-surface-700"
            :class="{ '!border-primary !text-primary': currEncoder?.encoder === encoder.index && currEncoder?.direction === 'cw' }"
            :style="getEncoderButtonStyle(encoder.cw)"
            @click="handleSelectEncoder(encoder.cw)"
          >
            <Icon name="tabler:rotate-clockwise-2" class="absolute right-1 top-1 text-sm" />
            <span>{{ getEncoderLabel(encoder.cw) }}</span>
          </button>
        </template>
      </div>
      <MapperPanel @set-key="handleSetKey" />
    </div>
  </div>
</template>
