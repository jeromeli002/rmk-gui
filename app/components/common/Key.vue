<script lang="ts" setup>
const { keyInfo, highlight, padding = 0, size = 50 } = defineProps<{
  keyInfo: Key
  highlight?: 'outer' | 'inner'
  padding?: number
  size?: number
}>()

const emit = defineEmits<{
  (e: 'click', zone: 'outer' | 'inner'): void
  (e: 'dblclick', zone: 'outer' | 'inner'): void
}>()

const showTooltip = ref(false)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

const keyboardStore = useKeyboardStore()

const keyDetail = computed(() => {
  const code = keyInfo.info.code
  const customKeycodes = keyboardStore.vialJson?.customKeycodes || []
  
  // 检查是否是user键
  if (code >= 0x7E00 && code <= 0x7E1F) {
    const index = code - 0x7E00
    if (index < customKeycodes.length && customKeycodes[index]?.shortName) {
      return {
        code: `0x${code.toString(16).toUpperCase().padStart(4, '0')}`,
        name: customKeycodes[index].shortName,
      }
    }
    else {
      return {
        code: `0x${code.toString(16).toUpperCase().padStart(4, '0')}`,
        name: `user${index}`,
      }
    }
  }
  
  const info = keyToInfo(code)
  return {
    code: `0x${code.toString(16).toUpperCase().padStart(4, '0')}`,
    name: info?.rmk ?? 'Unknown',
  }
})

function getTextClass(label: string | null | undefined) {
  return 'text-xs'
}

function handleMouseEnter() {
  if (hoverTimer)
    clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => {
    showTooltip.value = true
  }, 1000)
}

function handleMouseLeave() {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
  showTooltip.value = false
}

onBeforeUnmount(() => {
  if (hoverTimer)
    clearTimeout(hoverTimer)
})
</script>

<template>
  <div
    class="relative font-mono text-surface-900 dark:text-surface-100"
    :style="{
      width: `${Math.max(keyInfo.geometry.width, keyInfo.geometry.width2) * size}px`,
      height: `${Math.max(keyInfo.geometry.height, keyInfo.geometry.height2) * size}px`,
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="showTooltip"
      class="pointer-events-none absolute z-50 max-w-48 -translate-x-1/2 rounded-md border border-surface-300 bg-surface-0 px-2 py-1 text-xs shadow-md dark:border-surface-600 dark:bg-surface-900"
      :style="{ left: `${Math.max(keyInfo.geometry.width, keyInfo.geometry.width2) * size / 2}px`, top: '-10px', transform: 'translate(-50%, -100%)' }"
    >
      <div class="font-semibold">
        {{ keyDetail.code }}
      </div>
      <div class="opacity-80">
        {{ keyDetail.name }}
      </div>
    </div>
    <div class="group relative" @click="emit('click', 'outer')" @dblclick="emit('dblclick', 'outer')">
      <!-- 边框 -->
      <div
        class="rounded-prime-md absolute bg-surface-400 shadow-sm shadow-surface-400 dark:bg-surface-800 dark:shadow-surface-800"
        :class="{ '!bg-primary-400': highlight === 'outer' }"
        :style="{
          top: `${padding + 2}px`,
          left: `${padding - 1}px`,
          width: `${keyInfo.geometry.width * size - padding * 2 + 2}px`,
          height: `${keyInfo.geometry.height * size - padding * 2}px`,
        }"
      />
      <div
        class="rounded-prime-md absolute bg-surface-400 shadow-sm shadow-surface-400 dark:bg-surface-800 dark:shadow-surface-800"
        :class="{ '!bg-primary-400': highlight === 'outer' }"
        :style="{
          top: `${padding + keyInfo.geometry.y2 * size + 2}px`,
          left: `${padding + keyInfo.geometry.x2 * size - 1}px`,
          width: `${keyInfo.geometry.width2 * size - padding * 2 + 2}px`,
          height: `${keyInfo.geometry.height2 * size - padding * 2}px`,
        }"
      />
      <!-- 主按键 -->
      <div
        class="rounded-prime-md absolute bg-surface-300 group-active:opacity-0 dark:bg-surface-700"
        :class="{ '!bg-primary-100': highlight === 'outer' }"
        :style="{
          top: `${padding}px`,
          left: `${padding}px`,
          width: `${keyInfo.geometry.width * size - padding * 2}px`,
          height: `${keyInfo.geometry.height * size - padding * 2}px`,
        }"
      />
      <div
        class="rounded-prime-md absolute bg-surface-300 group-active:opacity-0 dark:bg-surface-700"
        :class="{ '!bg-primary-100': highlight === 'outer' }"
        :style="{
          top: `${padding + keyInfo.geometry.y2 * size}px`,
          left: `${padding + keyInfo.geometry.x2 * size}px`,
          width: `${keyInfo.geometry.width2 * size - padding * 2}px`,
          height: `${keyInfo.geometry.height2 * size - padding * 2}px`,
        }"
      />
      <!-- 按键名 -->
      <span
        v-if="keyInfo.info.symbol[0] === null"
        class="absolute max-w-[96%] overflow-hidden whitespace-pre-line text-center"
        :class="getTextClass(keyInfo.info.symbol[1])"
        style="transform: translate(-50%, -50%);"
        :style="{
          top: `${keyInfo.geometry.height / 2 * size}px`,
          left: `${keyInfo.geometry.width / 2 * size}px`,
        }"
      >
        {{ keyInfo.info.symbol[1] ?? '' }}
      </span>
      <span
        v-else
        class="absolute max-w-[96%] overflow-hidden whitespace-pre-line text-center text-xs"
        style="transform: translate(-50%, -50%);"
        :style="{
          top: `${padding + (keyInfo.geometry.height * size - 2 * padding) / 5}px`,
          left: `${keyInfo.geometry.width / 2 * size}px`,
        }"
      >
        {{ keyInfo.info.symbol[0] ?? '' }}
      </span>
    </div>
    <!-- 副按键 -->
    <div
      v-if="keyInfo.info.symbol[0] !== null"
      class="group relative"
      @click="emit('click', 'inner')"
      @dblclick="emit('dblclick', 'inner')"
    >
      <div
        class="rounded-prime-md absolute bg-surface-400 opacity-0 group-active:opacity-100 dark:bg-surface-800"
        :class="{ '!bg-primary-100': highlight === 'inner', '!opacity-100': highlight === 'inner' }"
        style="transform: translate(-50%, -50%)" :style="{
          top: `${padding + (keyInfo.geometry.height * size - 2 * padding) / 5 * 3.5}px`,
          left: `${keyInfo.geometry.width / 2 * size}px`,
          width: `${keyInfo.geometry.width * size - padding * 2}px`,
          height: `${(keyInfo.geometry.height * size - 2 * padding) / 5 * 3}px`,
        }"
      />
      <span
        class="absolute h-[2px] rounded-full bg-surface-500 dark:bg-surface-400" style="transform: translate(-50%, -50%)"
        :style="{
          top: `${padding + (keyInfo.geometry.height * size - 2 * padding) / 5 * 2}px`,
          left: `${keyInfo.geometry.width / 2 * size}px`,
          width: `${keyInfo.geometry.width / 2 * size}px`,
        }"
      />

      <span
        class="absolute max-w-[96%] overflow-hidden whitespace-pre-line text-center text-xs"
        style="transform: translate(-50%, -50%);"
        :style="{
          top: `${padding + (keyInfo.geometry.height * size - 2 * padding) / 5 * 3.5}px`,
          left: `${keyInfo.geometry.width / 2 * size}px`,
        }"
      >
        {{ keyInfo.info.symbol[1] ?? '' }}
      </span>
    </div>
  </div>
</template>
