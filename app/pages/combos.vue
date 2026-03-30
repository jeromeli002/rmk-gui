<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import MapperPanel from '../components/common/MapperPanel.vue'
const keyboardStore = useKeyboardStore()
const { t } = useI18n()

const currentEntry = ref(0)
const selectedAction = ref<'input1' | 'input2' | 'input3' | 'input4' | 'output'>('input1')
const comboEntries = computed(() => keyboardStore.comboEntries?.value || [])
const comboCount = computed(() => keyboardStore.comboCount?.value || 8)

// 组件挂载时获取组合键数据
onMounted(async () => {
  if (keyboardStore.isConnected) {
    try {
      await keyboardStore.fetchComboCount()
      await keyboardStore.fetchComboEntries()
    } catch (error) {
      console.error('Failed to fetch combo data:', error)
    }
  }
})

// 监听连接状态变化，重新获取组合键数据
watch(() => keyboardStore.isConnected, async (isConnected) => {
  if (isConnected) {
    try {
      await keyboardStore.fetchComboCount()
      await keyboardStore.fetchComboEntries()
    } catch (error) {
      console.error('Failed to fetch combo data:', error)
    }
  }
})

// Local state for editing
const localEntry = ref<[number, number, number, number, number]>([0, 0, 0, 0, 0])

// Watch for combo count changes
watch(() => comboCount.value, (newCount) => {
  console.log('Combo count updated:', newCount)
  if (newCount === 0) {
    currentEntry.value = 0
  } else if (newCount && currentEntry.value >= newCount) {
    currentEntry.value = 0
  }
})

// Update local state when current entry changes
watch([() => currentEntry.value, () => comboEntries.value], () => {
  console.log('Combo entries updated:', comboEntries.value)
  console.log('Current entry:', currentEntry.value)
  if (comboEntries.value && comboEntries.value.length > currentEntry.value) {
    console.log('Setting local entry to:', comboEntries.value[currentEntry.value])
    localEntry.value = [...comboEntries.value[currentEntry.value]]
  } else {
    console.log('Setting local entry to default')
    localEntry.value = [0, 0, 0, 0, 0]
  }
  console.log('Local entry after update:', localEntry.value)
}, { immediate: true, deep: true })

const input1 = computed({
  get: () => localEntry.value[0],
  set: (value) => {
    localEntry.value = [value, localEntry.value[1], localEntry.value[2], localEntry.value[3], localEntry.value[4]]
    // Send changes immediately when key is set
    keyboardStore.setComboEntry(currentEntry.value, localEntry.value)
  }
})

const input2 = computed({
  get: () => localEntry.value[1],
  set: (value) => {
    localEntry.value = [localEntry.value[0], value, localEntry.value[2], localEntry.value[3], localEntry.value[4]]
    keyboardStore.setComboEntry(currentEntry.value, localEntry.value)
  }
})

const input3 = computed({
  get: () => localEntry.value[2],
  set: (value) => {
    localEntry.value = [localEntry.value[0], localEntry.value[1], value, localEntry.value[3], localEntry.value[4]]
    keyboardStore.setComboEntry(currentEntry.value, localEntry.value)
  }
})

const input4 = computed({
  get: () => localEntry.value[3],
  set: (value) => {
    localEntry.value = [localEntry.value[0], localEntry.value[1], localEntry.value[2], value, localEntry.value[4]]
    keyboardStore.setComboEntry(currentEntry.value, localEntry.value)
  }
})

const output = computed({
  get: () => localEntry.value[4],
  set: (value) => {
    localEntry.value = [localEntry.value[0], localEntry.value[1], localEntry.value[2], localEntry.value[3], value]
    keyboardStore.setComboEntry(currentEntry.value, localEntry.value)
  }
})

function handleSetKey(key: Key) {
  switch (selectedAction.value) {
    case 'input1':
      input1.value = key.info.code
      break
    case 'input2':
      input2.value = key.info.code
      break
    case 'input3':
      input3.value = key.info.code
      break
    case 'input4':
      input4.value = key.info.code
      break
    case 'output':
      output.value = key.info.code
      break
  }
}

function getKeySymbol(code: number): string {
  if (code === 0) return ''
  const label = keyToLable(code)
  return label[1] || label[0] || String(code)
}

function getKeyDisplayClass(code: number): string {
  if (code === 0) {
    return 'border-surface-300 bg-surface-50 text-surface-400 dark:border-surface-600 dark:bg-surface-800'
  }
  return 'border-surface-400 bg-white text-surface-900 dark:border-surface-500 dark:bg-surface-700 dark:text-surface-100'
}
</script>

<template>
  <div class="flex size-full flex-col p-3">
    <div class="flex h-full flex-col items-center">
      <div class="w-full max-w-2xl">
        <h2 class="mb-4 text-xl font-bold">{{ $t('combos.title') }}</h2>
        
        <!-- 未连接键盘提示 -->
        <div v-if="!keyboardStore.isConnected" class="rounded-lg bg-surface-100 p-4 text-center dark:bg-surface-800">
          <Icon name="tabler:keyboard-off" class="mr-2 text-xl" />
          <span>{{ $t('combos.notConnected') }}</span>
        </div>
        
        <!-- 加载中状态 -->
        <div v-else-if="keyboardStore.comboCount === null" class="rounded-lg bg-surface-100 p-4 text-center dark:bg-surface-800">
          <Icon name="tabler:loader-2" class="mr-2 text-xl animate-spin" />
          <span>{{ $t('combos.loading') }}</span>
        </div>
        
        <!-- 不支持 Combos 提示 -->
        <div v-else-if="keyboardStore.comboCount === 0" class="rounded-lg bg-surface-100 p-4 text-center dark:bg-surface-800">
          <Icon name="tabler:keyboard-off" class="mr-2 text-xl" />
          <span>{{ $t('combos.notAvailable') }}</span>
        </div>
        
        <div v-else class="flex flex-col items-center">
          <!-- 组合键条目标签 -->
          <div class="mb-2 w-full text-left text-sm font-medium text-surface-600 dark:text-surface-400">
            {{ $t('combos.entry') }}
          </div>
          
          <!-- 选择 Combo 条目 - 顶部横向排列 -->
          <div class="mb-8 flex flex-wrap gap-2">
            <button
              v-for="i in comboCount"
              :key="i - 1"
              class="h-10 w-10 rounded-md border text-sm font-medium transition-colors flex items-center justify-center"
              :class="currentEntry === i - 1 
                ? 'border-green-500 bg-green-500 text-white' 
                : 'border-surface-300 bg-surface-100 hover:bg-surface-200 dark:border-surface-600 dark:bg-surface-800 dark:hover:bg-surface-700'"
              @click="currentEntry = i - 1"
            >
              {{ i - 1 }}
            </button>
          </div>
          
          <!-- Combo 设置项 - 垂直排列 -->
          <div class="w-full max-w-md space-y-3">
            <!-- Input 1 -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'input1'"
            >
              <span class="w-20 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('combos.key') }} 1</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'input1' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : getKeyDisplayClass(input1)"
              >
                {{ getKeySymbol(input1) }}
              </div>
            </div>
            
            <!-- Input 2 -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'input2'"
            >
              <span class="w-20 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('combos.key') }} 2</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'input2' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : getKeyDisplayClass(input2)"
              >
                {{ getKeySymbol(input2) }}
              </div>
            </div>
            
            <!-- Input 3 -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'input3'"
            >
              <span class="w-20 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('combos.key') }} 3</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'input3' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : getKeyDisplayClass(input3)"
              >
                {{ getKeySymbol(input3) }}
              </div>
            </div>
            
            <!-- Input 4 -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'input4'"
            >
              <span class="w-20 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('combos.key') }} 4</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'input4' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : getKeyDisplayClass(input4)"
              >
                {{ getKeySymbol(input4) }}
              </div>
            </div>
            
            <!-- Output Key -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer pt-2"
              @click="selectedAction = 'output'"
            >
              <span class="w-20 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('combos.outputKey') }}</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'output' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : getKeyDisplayClass(output)"
              >
                {{ getKeySymbol(output) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-auto w-full">
        <MapperPanel @set-key="handleSetKey" />
      </div>
    </div>
  </div>
</template>
