<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import MapperPanel from '../components/common/MapperPanel.vue'
const keyboardStore = useKeyboardStore()
const { t } = useI18n()

const currentEntry = ref(0)
const selectedAction = ref<'onTap' | 'onHold' | 'onDoubleTap' | 'onTapHold'>('onTap')
const tapDanceEntries = computed(() => keyboardStore.tapDanceEntries || [])
const tapDanceCount = computed(() => keyboardStore.tapDanceCount || 0)

// Local state for editing
const localEntry = ref<[number, number, number, number, number]>([0, 0, 0, 0, 250])

// Watch for tap dance count changes
watch(() => tapDanceCount.value, (newCount) => {
  console.log('Tap dance count updated:', newCount)
  if (newCount === 0) {
    currentEntry.value = 0
  } else if (currentEntry.value >= newCount) {
    currentEntry.value = 0
  }
})

// Update local state when current entry changes
watch([() => currentEntry.value, () => tapDanceEntries.value], () => {
  console.log('Tap dance entries updated:', tapDanceEntries.value)
  console.log('Current entry:', currentEntry.value)
  if (tapDanceEntries.value && tapDanceEntries.value.length > currentEntry.value) {
    console.log('Setting local entry to:', tapDanceEntries.value[currentEntry.value])
    localEntry.value = [...tapDanceEntries.value[currentEntry.value]]
  } else {
    console.log('Setting local entry to default')
    localEntry.value = [0, 0, 0, 0, 250]
  }
  console.log('Local entry after update:', localEntry.value)
}, { immediate: true, deep: true })

const onTap = computed({
  get: () => localEntry.value[0],
  set: (value) => localEntry.value = [value, localEntry.value[1], localEntry.value[2], localEntry.value[3], localEntry.value[4]]
})

const onHold = computed({
  get: () => localEntry.value[1],
  set: (value) => localEntry.value = [localEntry.value[0], value, localEntry.value[2], localEntry.value[3], localEntry.value[4]]
})

const onDoubleTap = computed({
  get: () => localEntry.value[2],
  set: (value) => localEntry.value = [localEntry.value[0], localEntry.value[1], value, localEntry.value[3], localEntry.value[4]]
})

const onTapHold = computed({
  get: () => localEntry.value[3],
  set: (value) => localEntry.value = [localEntry.value[0], localEntry.value[1], localEntry.value[2], value, localEntry.value[4]]
})

const tappingTerm = computed({
  get: () => localEntry.value[4],
  set: (value) => {
    // Only update local state, don't send to keyboard immediately
    localEntry.value = [localEntry.value[0], localEntry.value[1], localEntry.value[2], localEntry.value[3], value]
  }
})

function handleSetKey(key: Key) {
  switch (selectedAction.value) {
    case 'onTap':
      onTap.value = key.info.code
      break
    case 'onHold':
      onHold.value = key.info.code
      break
    case 'onDoubleTap':
      onDoubleTap.value = key.info.code
      break
    case 'onTapHold':
      onTapHold.value = key.info.code
      break
  }
  
  // Send changes immediately when key is set
  if (tapDanceEntries.value.length > currentEntry.value) {
    keyboardStore.setTapDanceEntry(currentEntry.value, localEntry.value)
  }
}

function saveChanges() {
  // Save is now only needed for tapping term changes
  if (tapDanceEntries.value.length > currentEntry.value) {
    keyboardStore.setTapDanceEntry(currentEntry.value, localEntry.value)
  }
}

function cancelChanges() {
  if (tapDanceEntries.value.length > currentEntry.value) {
    localEntry.value = [...tapDanceEntries.value[currentEntry.value]]
  } else {
    localEntry.value = [0, 0, 0, 0, 250]
  }
}
</script>

<template>
  <div class="flex size-full flex-col p-3">
    <div class="flex h-full flex-col items-center">
      <div class="w-full max-w-2xl">
        <h2 class="mb-4 text-xl font-bold">{{ $t('tapDance.title') }}</h2>
        
        <!-- 未连接键盘提示 -->
        <div v-if="!keyboardStore.isConnected" class="rounded-lg bg-surface-100 p-4 text-center dark:bg-surface-800">
          <Icon name="tabler:keyboard-off" class="mr-2 text-xl" />
          <span>{{ $t('header.waitingForKeyboard') }}</span>
        </div>
        
        <!-- 不支持 Tap Dance 提示 -->
        <div v-else-if="tapDanceCount === 0" class="rounded-lg bg-surface-100 p-4 text-center dark:bg-surface-800">
          <Icon name="tabler:keyboard-off" class="mr-2 text-xl" />
          <span>{{ $t('tapDance.notAvailable') }}</span>
        </div>
        
        <div v-else class="flex flex-col items-center">
          <!-- 组合键条目标签 -->
          <div class="mb-2 w-full text-left text-sm font-medium text-surface-600 dark:text-surface-400">
            {{ $t('tapDance.entry') }}
          </div>
          
          <!-- 选择 Tap Dance 条目 - 顶部横向排列 -->
          <div class="mb-8 flex flex-wrap gap-2">
            <button
              v-for="i in tapDanceCount"
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
          
          <!-- Tap Dance 设置项 - 垂直排列 -->
          <div class="w-full max-w-md space-y-3">
            <!-- On tap -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'onTap'"
            >
              <span class="w-24 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('tapDance.onTap') }}</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'onTap' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : (onTap === 0 ? 'border-surface-300 bg-surface-50 text-surface-400 dark:border-surface-600 dark:bg-surface-800' : 'border-surface-400 bg-white text-surface-900 dark:border-surface-500 dark:bg-surface-700 dark:text-surface-100')"
              >
                {{ keyToLable(onTap)[1] || 'No' }}
              </div>
            </div>
            
            <!-- On hold -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'onHold'"
            >
              <span class="w-24 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('tapDance.onHold') }}</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'onHold' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : (onHold === 0 ? 'border-surface-300 bg-surface-50 text-surface-400 dark:border-surface-600 dark:bg-surface-800' : 'border-surface-400 bg-white text-surface-900 dark:border-surface-500 dark:bg-surface-700 dark:text-surface-100')"
              >
                {{ keyToLable(onHold)[1] || 'No' }}
              </div>
            </div>
            
            <!-- On double tap -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'onDoubleTap'"
            >
              <span class="w-24 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('tapDance.onDoubleTap') }}</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'onDoubleTap' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : (onDoubleTap === 0 ? 'border-surface-300 bg-surface-50 text-surface-400 dark:border-surface-600 dark:bg-surface-800' : 'border-surface-400 bg-white text-surface-900 dark:border-surface-500 dark:bg-surface-700 dark:text-surface-100')"
              >
                {{ keyToLable(onDoubleTap)[1] || 'No' }}
              </div>
            </div>
            
            <!-- On tap + hold -->
            <div 
              class="flex items-center justify-center gap-4 cursor-pointer"
              @click="selectedAction = 'onTapHold'"
            >
              <span class="w-24 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('tapDance.onTapHold') }}</span>
              <div 
                class="flex h-12 w-12 items-center justify-center rounded border-2 text-lg font-medium transition-all"
                :class="selectedAction === 'onTapHold' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : (onTapHold === 0 ? 'border-surface-300 bg-surface-50 text-surface-400 dark:border-surface-600 dark:bg-surface-800' : 'border-surface-400 bg-white text-surface-900 dark:border-surface-500 dark:bg-surface-700 dark:text-surface-100')"
              >
                {{ keyToLable(onTapHold)[1] || 'No' }}
              </div>
            </div>
            
            <!-- Tapping term -->
            <div class="flex items-center justify-center gap-4 pt-2">
              <span class="w-24 text-right text-sm text-surface-600 dark:text-surface-400">{{ $t('tapDance.tappingTerm') }}</span>
              <div class="relative flex items-center">
                <InputNumber 
                  v-model="tappingTerm" 
                  :min="1" 
                  :max="1000" 
                  class="w-32 pr-10"
                  :step="10"
                />
                <span class="absolute right-3 text-sm text-surface-500 dark:text-surface-400">ms</span>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="mt-6 flex justify-center gap-3">
              <Button @click="cancelChanges">
                {{ $t('dialog.cancel') }}
              </Button>
              <Button @click="saveChanges" severity="primary">
                {{ $t('dialog.save') }}
              </Button>
            </div>
            
            <!-- 提示 -->
            <div class="mt-4 rounded-md border border-surface-200 bg-surface-50 p-4 dark:border-surface-700 dark:bg-surface-900">
              <p class="text-sm text-surface-600 dark:text-surface-400 text-center">
                {{ $t('tapDance.usage') }} {{ currentEntry }}
              </p>
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
