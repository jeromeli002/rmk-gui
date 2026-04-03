<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Keyboard from '~/components/common/Keyboard.vue'
import { useKeyboardStore } from '~/stores/keyboard'

const router = useRouter()
const keyboardStore = useKeyboardStore()

const isLoading = ref(true)
const layoutOptions = ref<number>(0)
const layoutChoices = ref<Array<{ type: 'boolean' | 'select', label: string, options?: string[], value: number }>>([])

const isConnected = computed(() => keyboardStore.isConnected)
const keyboard = computed(() => keyboardStore.device)
const vialJson = computed(() => keyboardStore.vialJson)
const kleDefinition = computed(() => keyboardStore.kleDefinition)
const layoutOptionsStore = computed(() => keyboardStore.layoutOptions)

// 响应式的按键列表，当 layoutOptions 改变时会自动更新
const keyList = computed(() => {
  if (!kleDefinition.value)
    return []
  return keyboardStore.fetchKeyList(0)
})

// 响应式的编码器列表
const encoderList = computed(() => {
  if (!kleDefinition.value)
    return []
  return keyboardStore.fetchEncoderList(0)
})

// 检查设备是否支持Layout功能
const isLayoutSupported = computed(() => {
  if (!keyboard.value)
    return false
  // 检查vialJson是否有layout_labels属性
  return !!vialJson.value?.layouts?.labels
})

// 初始化 Layout 数据
async function initializeLayout() {
  if (!keyboard.value) {
    isLoading.value = false
    return
  }

  try {
    // vialJson 应该在连接时已经获取，这里只需要检查
    if (!vialJson.value) {
      console.warn('Vial JSON not available, layout data may be incomplete')
    }

    if (!isLayoutSupported.value) {
      isLoading.value = false
      return
    }

    // 使用 store 中已经获取的 layoutOptions
    layoutOptions.value = layoutOptionsStore.value

    // 解析布局选项
    parseLayoutOptions()
  }
  catch (error) {
    console.error('Failed to initialize layout:', error)
  }
  finally {
    isLoading.value = false
  }
}

// 解析布局选项
function parseLayoutOptions() {
  if (!keyboard.value || !vialJson.value?.layouts?.labels) {
    return
  }

  const labels = vialJson.value.layouts.labels
  const choices: Array<{ type: 'boolean' | 'select', label: string, options?: string[], value: number }> = []

  for (const item of labels) {
    if (typeof item === 'string') {
      choices.push({ type: 'boolean', label: item, value: 0 })
    }
    else if (Array.isArray(item) && item.length > 0) {
      choices.push({
        type: 'select',
        label: item[0],
        options: item.slice(1),
        value: 0,
      })
    }
  }

  // 从layoutOptions解析值
  let value = layoutOptions.value
  for (let i = choices.length - 1; i >= 0; i--) {
    const choice = choices[i]
    if (choice.type === 'boolean') {
      choice.value = value & 1
      value >>= 1
    }
    else if (choice.type === 'select' && choice.options) {
      const bitLength = Math.ceil(Math.log2(choice.options.length))
      const mask = (1 << bitLength) - 1
      choice.value = value & mask
      value >>= bitLength
    }
  }

  layoutChoices.value = choices
}

// 更新布局选项
async function updateLayoutOption(index: number, value: number) {
  if (!keyboard.value)
    return

  // 更新本地状态
  layoutChoices.value[index].value = value

  // 计算新的 layoutOptions 值
  let newValue = 0
  let shift = 0

  for (let i = layoutChoices.value.length - 1; i >= 0; i--) {
    const choice = layoutChoices.value[i]
    if (choice.type === 'boolean') {
      newValue |= (choice.value << shift)
      shift += 1
    }
    else if (choice.type === 'select' && choice.options) {
      const bitLength = Math.ceil(Math.log2(choice.options.length))
      newValue |= (choice.value << shift)
      shift += bitLength
    }
  }

  layoutOptions.value = newValue

  // 更新 store 中的 layoutOptions
  keyboardStore.layoutOptions = newValue

  // 发送到设备
  try {
    await keyboard.value.setLayoutOptions(newValue)
  }
  catch (error) {
    console.error('Failed to update layout option:', error)
  }
}

// 监听设备连接状态
watch(isConnected, async (newValue) => {
  if (newValue) {
    isLoading.value = true
    await initializeLayout()
  }
})

// 页面加载时初始化
onMounted(async () => {
  if (isConnected.value) {
    await initializeLayout()
  }
  else {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6 text-center text-2xl font-bold">
      {{ $t('aside.layout') }}
    </h1>

    <div v-if="!isConnected" class="py-12 text-center">
      <p class="text-gray-500">
        {{ $t('header.waitingForKeyboard') }}
      </p>
    </div>

    <div v-else-if="!isLayoutSupported" class="py-12 text-center">
      <p class="text-gray-500">
        {{ $t('layout.notAvailable') }}
      </p>
    </div>

    <div v-else-if="isLoading" class="py-12 text-center">
      <p class="text-gray-500">
        {{ $t('layout.loading') }}
      </p>
    </div>

    <div v-else class="space-y-8">
      <!-- 键盘预览 -->
      <div class="flex justify-center">
        <Keyboard
          v-if="kleDefinition"
          :keys="keyList"
          :encoders="encoderList"
          class="max-w-full"
        />
      </div>

      <!-- 布局选项 -->
      <div class="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 class="mb-6 text-center text-xl font-semibold">
          {{ $t('layout.title') }}
        </h2>
        <div class="space-y-4">
          <div
            v-for="(choice, index) in layoutChoices"
            :key="index"
            class="flex items-center justify-between"
          >
            <label class="text-sm font-medium">{{ choice.label }}</label>

            <div v-if="choice.type === 'boolean'">
              <button
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                :class="choice.value ? 'bg-sky-600' : 'bg-gray-200 dark:bg-gray-700'"
                @click="updateLayoutOption(index, choice.value ? 0 : 1)"
              >
                <span
                  class="inline-block size-5 rounded-full bg-white transition-transform"
                  :class="choice.value ? 'translate-x-5' : 'translate-x-0'"
                />
              </button>
            </div>

            <div v-else-if="choice.type === 'select' && choice.options" class="w-auto">
              <select
                class="rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                :value="choice.value"
                @change="updateLayoutOption(index, Number($event.target.value))"
              >
                <option
                  v-for="(option, optIndex) in choice.options"
                  :key="optIndex"
                  :value="optIndex"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
