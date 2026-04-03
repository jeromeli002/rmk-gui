<script lang="ts" setup>
import { computed } from 'vue'

const { keys, encoders = [], keySize = 64, highlight } = defineProps<{
  keys: Key[]
  encoders?: Array<{
    index: number
    ccw: {
      encoder: number
      direction: 'ccw' | 'cw'
      geometry: {
        x: number
        y: number
        width: number
        height: number
      }
      position: {
        row: number
        col: number
      }
      info: {
        code: number
        symbol: [string | null, string | null]
      }
    } | null
    cw: {
      encoder: number
      direction: 'ccw' | 'cw'
      geometry: {
        x: number
        y: number
        width: number
        height: number
      }
      position: {
        row: number
        col: number
      }
      info: {
        code: number
        symbol: [string | null, string | null]
      }
    } | null
  }>
  highlight?: StringMap<[number, number], 'outer' | 'inner'>
  keySize?: number
}>()

const emit = defineEmits<{
  (e: 'click', key: Key, zone: 'outer' | 'inner'): void
  (e: 'dblclick', key: Key, zone: 'outer' | 'inner'): void
  (e: 'encoderClick', encoder: any, direction: 'ccw' | 'cw'): void
  (e: 'encoderDblclick', encoder: any, direction: 'ccw' | 'cw'): void
}>()

const keyPadding = computed(() => keySize * 0.065) // Magic Keyboard`s margin ratio

function getKeyCorners(key: Key) {
  const { x, y, width, height, x2, y2, width2, height2, rotation_x, rotation_y, rotation_angle } = key.geometry
  const corners: [number, number][] = [
    [x, y],
    [x + width, y],
    [x, y + height],
    [x + width, y + height],
    [x + x2, y + y2],
    [x + x2 + width2, y + y2],
    [x + x2, y + y2 + height2],
    [x + x2 + width2, y + y2 + height2],
  ]

  const rotate = (x: number, y: number, cx: number, cy: number, angle: number): [number, number] => {
    const rad = -angle * Math.PI / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    return [
      cos * (x - cx) + sin * (y - cy) + cx,
      cos * (y - cy) - sin * (x - cx) + cy,
    ]
  }

  return corners.map(([px, py]) => rotate(px, py, rotation_x, rotation_y, rotation_angle))
}

const kbdSize = computed(() => {
  const size = { width: 0, height: 0 }
  
  // 计算按键的边界
  keys.forEach((key) => {
    const corners = getKeyCorners(key)
    size.width = Math.max(size.width, ...corners.map(c => c[0] * keySize))
    size.height = Math.max(size.height, ...corners.map(c => c[1] * keySize))
  })
  
  // 计算编码器的边界
  const encoderSize = keySize * 0.875 // 编码器按钮大小，与 keymap 中保持一致
  encoders.forEach((encoder) => {
    if (encoder.ccw) {
      const centerX = (encoder.ccw.geometry.x + encoder.ccw.geometry.width / 2) * keySize
      const centerY = (encoder.ccw.geometry.y + encoder.ccw.geometry.height / 2) * keySize
      size.width = Math.max(size.width, centerX + encoderSize / 2)
      size.height = Math.max(size.height, centerY + encoderSize / 2)
    }
    if (encoder.cw) {
      const centerX = (encoder.cw.geometry.x + encoder.cw.geometry.width / 2) * keySize
      const centerY = (encoder.cw.geometry.y + encoder.cw.geometry.height / 2) * keySize
      size.width = Math.max(size.width, centerX + encoderSize / 2)
      size.height = Math.max(size.height, centerY + encoderSize / 2)
    }
  })
  
  return { width: `${size.width}px`, height: `${size.height}px` }
})
</script>

<template>
  <div class="relative" :style="kbdSize">
    <key
      v-for="key in keys" :key="`${key}`" :key-info="key" :highlight="highlight?.get([key.position.row, key.position.col])" :size="keySize" :padding="keyPadding" :style="{
        position: 'absolute',
        top: `${key.geometry.y * keySize}px`,
        left: `${key.geometry.x * keySize}px`,
        transform: `rotate(${key.geometry.rotation_angle}deg)`,
        transformOrigin: `calc(${(key.geometry.rotation_x - key.geometry.x) * keySize}px)` + `calc(${(key.geometry.rotation_y - key.geometry.y) * keySize}px)`,
      }"
      @click="(e) => emit('click', key, e)"
      @dblclick="(e) => emit('dblclick', key, e)"
    />
    
    <!-- 编码器 -->
    <template v-for="encoder in encoders" :key="encoder.index">
      <button
        v-if="encoder.ccw"
        class="absolute z-20 flex size-[56px] items-center justify-center rounded-full border-2 border-surface-400 bg-surface-100 text-xs shadow-sm dark:border-surface-500 dark:bg-surface-800"
        :style="{
          left: `${(encoder.ccw.geometry.x + encoder.ccw.geometry.width / 2) * keySize - 28}px`,
          top: `${(encoder.ccw.geometry.y + encoder.ccw.geometry.height / 2) * keySize - 28}px`,
        }"
        @click="emit('encoderClick', encoder.ccw, 'ccw')"
        @dblclick="emit('encoderDblclick', encoder.ccw, 'ccw')"
      >
        <Icon name="tabler:rotate-2" class="absolute left-1 top-1 text-sm" />
        <span class="max-w-[80%] break-all text-center leading-tight">{{ encoder.ccw.info.symbol[1] ?? '' }}</span>
      </button>
      <button
        v-if="encoder.cw"
        class="absolute z-20 flex size-[56px] items-center justify-center rounded-full border-2 border-surface-400 bg-surface-100 text-xs shadow-sm dark:border-surface-500 dark:bg-surface-800"
        :style="{
          left: `${(encoder.cw.geometry.x + encoder.cw.geometry.width / 2) * keySize - 28}px`,
          top: `${(encoder.cw.geometry.y + encoder.cw.geometry.height / 2) * keySize - 28}px`,
        }"
        @click="emit('encoderClick', encoder.cw, 'cw')"
        @dblclick="emit('encoderDblclick', encoder.cw, 'cw')"
      >
        <Icon name="tabler:rotate-clockwise-2" class="absolute right-1 top-1 text-sm" />
        <span class="max-w-[80%] break-all text-center leading-tight">{{ encoder.cw.info.symbol[1] ?? '' }}</span>
      </button>
    </template>
  </div>
</template>
