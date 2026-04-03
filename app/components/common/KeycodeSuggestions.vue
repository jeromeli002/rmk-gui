<script lang="ts" setup>
import type { KeycodeSuggestion } from '~/types/keycode'

const props = defineProps<{
  suggestions: KeycodeSuggestion[]
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'select', name: string): void
}>()

// 将候选键按类型分组
const groupedSuggestions = computed(() => {
  const groups: Record<string, KeycodeSuggestion[]> = {
    base: [],
    layers: [],
    quantum: [],
    backlight: [],
    media: [],
    macro: [],
    other: [],
  }

  props.suggestions.forEach((item) => {
    const name = item.name.toUpperCase()
    // 层键 (MO, DF, TG, TT, TO, OSL, PDF, LT)
    if (name.includes('MO(') || name.includes('LT(') || name.includes('TG(') || name.includes('DF(') || name.includes('TT(') || name.includes('TO(') || name.includes('OSL(') || name.includes('PDF(')) {
      groups.layers.push(item)
    }
    // 背光和 RGB 键
    else if (name.includes('RGB_') || name.includes('BL_') || name.includes('RM_') || name.includes('BACKLIGHT_')) {
      groups.backlight.push(item)
    }
    // 宏键 (MACRO, TD, DYN_)
    else if (name.includes('MACRO(') || name.includes('TD(') || name.includes('DYN_') || name.includes('MACRO')) {
      groups.macro.push(item)
    }
    // 媒体键
    else if (name.includes('KC_MEDIA') || name.includes('KC_SYSTEM') || name.includes('KC_CONSUMER')) {
      groups.media.push(item)
    }
    // 量子键 (QK_, MAGIC_)
    else if (name.includes('QK_') || name.includes('MAGIC_')) {
      groups.quantum.push(item)
    }
    // 基础键 (KC_ 开头，且不是上面分类的)
    else if (name.startsWith('KC_')) {
      groups.base.push(item)
    }
    // 其他
    else {
      groups.other.push(item)
    }
  })

  // 过滤掉空组
  return Object.fromEntries(
    Object.entries(groups).filter(([_, items]) => items.length > 0),
  )
})

function getGroupLabel(key: string): string {
  const labels: Record<string, string> = {
    base: '基础键',
    layers: '层键',
    quantum: '量子键',
    backlight: '背光/RGB',
    media: '媒体键',
    macro: '宏键',
    other: '其他',
  }
  return labels[key] || key
}

function getGroupColor(key: string): string {
  const colors: Record<string, string> = {
    base: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    layers: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    quantum: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    backlight: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    media: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    macro: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }
  return colors[key] || colors.other
}
</script>

<template>
  <div
    v-if="visible && suggestions.length > 0"
    class="absolute inset-x-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-surface-300 bg-white p-2 shadow-lg dark:border-surface-600 dark:bg-surface-800"
  >
    <!-- 分组显示 -->
    <div class="space-y-3">
      <div
        v-for="(items, groupKey) in groupedSuggestions"
        :key="groupKey"
      >
        <!-- 分组标签 -->
        <div class="mb-1 flex items-center gap-2">
          <span
            class="rounded px-2 py-0.5 text-xs font-medium"
            :class="getGroupColor(groupKey)"
          >
            {{ getGroupLabel(groupKey) }} ({{ items.length }})
          </span>
        </div>

        <!-- 自适应宽度的按键布局 -->
        <div class="flex flex-wrap gap-1">
          <button
            v-for="item in items"
            :key="item.name"
            class="flex min-w-[80px] max-w-[120px] flex-shrink-0 cursor-pointer items-center justify-between rounded border border-surface-200 bg-surface-50 px-2 py-1.5 font-mono text-xs text-surface-700 transition-all hover:border-primary hover:bg-primary hover:text-white dark:border-surface-700 dark:bg-surface-700 dark:text-surface-200 dark:hover:border-primary dark:hover:bg-primary dark:hover:text-white"
            @mousedown="emit('select', item.originalName)"
          >
            <span class="mr-2 text-xs">{{ item.name }}</span>
            <span
              v-if="item.shortLabel"
              class="flex-shrink-0 whitespace-pre-line text-xs opacity-70"
            >
              {{ item.shortLabel }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
