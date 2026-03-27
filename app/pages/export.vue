<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const keyboardStore = useKeyboardStore()
const toast = useToast()
const confirm = useConfirm()
const { t } = useI18n()

const matrix = ref('')
const exportAllLayers = ref(true)
const fileInputRef = ref<HTMLInputElement | null>(null)
const pendingImportFile = ref<File | null>(null)

function handleImportClick() {
  fileInputRef.value?.click()
}

const keys = computed(() => {
  const ans = []
  const layerCount = keyboardStore.layerCount || 0
  
  if (layerCount === 0) {
    return ans
  }
  
  // 从 kleDefinition 中读取矩阵坐标
  if (!keyboardStore.kleDefinition) {
    return ans
  }
  
  // 提取所有按键的坐标
  const matrixCoords = new Set<string>()
  for (const k of keyboardStore.kleDefinition.keys) {
    const isEncoder = k.labels.some((label: string | null) => label?.trim().toLowerCase() === 'e')
    if (isEncoder) continue
    
    const pair = parseLabelPair(k.labels[0])
    if (!pair) continue
    
    const [row, col] = pair
    matrixCoords.add(`${row},${col}`)
  }
  
  // 生成矩阵字符串
  const matrixStr = Array.from(matrixCoords)
    .map(coord => `(${coord})`)
    .sort()
    .join(' ')
  
  // 更新 matrix
  if (matrixStr && !matrix.value) {
    matrix.value = matrixStr
  }
  
  // 生成各层的键码显示
  for (let layer = 0; layer < layerCount; layer++) {
    let keys = matrix.value
    for (const [[row, col], origin] of parseCoordinateString(matrix.value)) {
      // 使用 layoutKeymap 而不是 keymap
      const keycode = keyboardStore.layoutKeymap?.get(`${layer},${row},${col}`)
      if (keycode !== undefined) {
        const key = keyToRmk(keycode)
        keys = keys.replace(origin, key)
      }
    }
    ans.push(keys)
  }
  return ans
})

function parseCoordinateString(input: string): [[number, number], string][] {
  return Array.from(input.matchAll(/\(\s*(\d+)\s*,\s*(\d+)\s*\)/g)).map(match => [
    [Number.parseInt(match[1]!, 10), Number.parseInt(match[2]!, 10)],
    match[0],
  ])
}

function parseLabelPair(label: string | null): [number, number] | null {
  if (!label) return null
  const parts = label.split(',').map(s => Number.parseInt(s.trim(), 10))
  if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
    return [parts[0], parts[1]]
  }
  return null
}

// ========== Vial.json 导出功能 ==========
async function handleExportVialJson() {
  if (!keyboardStore.isConnected) {
    toast.add({
      severity: 'warn',
      summary: t('header.waitingForKeyboard'),
      life: 3000
    })
    return
  }
  
  try {
    if (!keyboardStore.vialJson) {
      throw new Error('Vial JSON not available')
    }
    
    const jsonString = JSON.stringify(keyboardStore.vialJson, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const productName = keyboardStore.productName || 'keyboard'
    link.download = `vial-${productName}-${timestamp}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast.add({
      severity: 'success',
      summary: t('export.exportSuccess'),
      life: 3000
    })
  } catch (error) {
    console.error('Export Vial.json failed:', error)
    toast.add({
      severity: 'error',
      summary: t('export.importFailed'),
      detail: 'Failed to export Vial.json',
      life: 3000
    })
  }
}

// ========== 键码导出导入功能 ==========
function generateKeymapData() {
  // 使用已加载的 layoutKeymap 数据（存储在内存中）
  if (!keyboardStore.layoutKeymap || !keyboardStore.layerCount) {
    throw new Error('Keymap data not loaded')
  }
  
  const layerCount = keyboardStore.layerCount
  const keymapData: Record<string, number> = {}
  
  // 遍历所有层和所有键位
  for (let layer = 0; layer < layerCount; layer++) {
    for (const [key, value] of keyboardStore.layoutKeymap.entries()) {
      const [keyLayer, row, col] = key.split(',').map(Number)
      if (keyLayer === layer) {
        keymapData[`${layer}_${row}_${col}`] = value
      }
    }
  }
  
  return {
    version: '1.0',
    timestamp: new Date().toISOString(),
    layerCount: keyboardStore.layerCount,
    matrix: matrix.value,
    keymap: keymapData,
    exportedLayers: Array.from({ length: layerCount }, (_, i) => i)
  }
}

async function handleExportKeymap() {
  try {
    // 检查是否有已加载的键码数据（不需要键盘连接）
    if (!keyboardStore.layoutKeymap || keyboardStore.layoutKeymap.size === 0) {
      toast.add({
        severity: 'warn',
        summary: t('header.waitingForKeyboard'),
        detail: 'No keymap data available. Please connect keyboard and load keymap first.',
        life: 3000
      })
      return
    }
    
    const exportData = generateKeymapData()
    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    link.download = `rmk-keymap-backup-${timestamp}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast.add({
      severity: 'success',
      summary: t('export.exportSuccess'),
      life: 3000
    })
  } catch (error) {
    console.error('Export keymap failed:', error)
    toast.add({
      severity: 'error',
      summary: t('export.exportFailed'),
      detail: error instanceof Error ? error.message : 'Unknown error',
      life: 3000
    })
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  
  // 先保存文件引用，显示确认对话框
  pendingImportFile.value = file
  
  // 显示确认对话框
  confirm.require({
    message: t('export.importConfirm'),
    header: t('export.import'),
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: t('export.import'),
    rejectLabel: t('dialog.cancel'),
    accept: () => {
      executeImport(file)
    },
    reject: () => {
      // 取消导入，清空文件输入
      pendingImportFile.value = null
      if (target) {
        target.value = ''
      }
    }
  })
}

async function executeImport(file: File) {
  const reader = new FileReader()
  reader.onload = async (e) => {
    const content = e.target?.result as string
    try {
      const data = JSON.parse(content)
      if (!isValidKeymapBackup(data)) {
        throw new Error(t('export.invalidFormat'))
      }
      
      // 检查是否有 layoutKeymap 可以导入
      if (!keyboardStore.layoutKeymap) {
        throw new Error('Layout keymap not available. Please connect keyboard first.')
      }
      
      let successCount = 0
      let errorCount = 0
      
      // 遍历所有导入的键码
      for (const [key, value] of Object.entries(data.keymap)) {
        const [layer, row, col] = key.split('_').map(Number)
        
        try {
          // 更新 layoutKeymap（内存中的数据）
          const mapKey = `${layer},${row},${col}`
          keyboardStore.layoutKeymap.set(mapKey, value as number)
          
          // 如果键盘已连接，写入硬件
          if (keyboardStore.isConnected) {
            await keyboardStore.setKeycode([layer, row, col], value as number)
            successCount++
          }
        } catch (err) {
          console.error(`Failed to set keycode at [${layer},${row},${col}]:`, err)
          errorCount++
        }
      }
      
      // 不自动更新矩阵配置，矩阵应该从键盘读取
      // 如果导入的文件包含 matrix 字段，可以选择性使用
      if (data.matrix && !matrix.value) {
        matrix.value = data.matrix
      }
      
      // 清空文件输入和临时变量
      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
      pendingImportFile.value = null
      
      // 显示成功提示
      let summary = t('export.importSuccess')
      if (keyboardStore.isConnected) {
        summary += ` (${successCount} keys)`
        if (errorCount > 0) {
          summary += `, ${errorCount} failed`
        }
      }
      
      toast.add({
        severity: 'success',
        summary,
        life: 3000
      })
    } catch (error) {
      console.error('Import failed:', error)
      toast.add({
        severity: 'error',
        summary: t('export.importFailed'),
        detail: error instanceof Error ? error.message : 'Unknown error',
        life: 3000
      })
    }
  }
  reader.onerror = () => {
    toast.add({
      severity: 'error',
      summary: t('export.importFailed'),
      detail: 'Failed to read file',
      life: 3000
    })
    pendingImportFile.value = null
  }
  reader.readAsText(file)
}

function isValidKeymapBackup(data: any): boolean {
  return data && 
         typeof data === 'object' && 
         data.version && 
         data.keymap && 
         typeof data.keymap === 'object'
}
</script>

<template>
  <div class="flex h-full flex-col gap-6 p-6">
    <!-- 未连接键盘时的提示 -->
    <div
      v-if="!keyboardStore.isConnected"
      class="flex items-center justify-center rounded-lg border border-amber-300 bg-amber-50 p-6 text-amber-700 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-500"
    >
      <Icon name="tabler:keyboard-off" class="mr-3 text-2xl" />
      <span class="text-base">{{ $t('header.waitingForKeyboard') }}</span>
    </div>
    
    <!-- Vial.json 导出 -->
    <div class="rounded-lg border border-surface-200 bg-white p-4 shadow-sm dark:border-surface-700 dark:bg-surface-800">
      <div class="mb-4 flex items-start justify-between">
        <div>
          <h2 class="text-lg font-semibold text-surface-800 dark:text-surface-100">
            {{ $t('export.vialJson') }}
          </h2>
          <p class="mt-1 text-sm text-surface-600 dark:text-surface-400">
            {{ $t('export.exportVialJsonDesc') }}
          </p>
        </div>
        <Button
          :label="$t('export.exportVialJson')"
          icon="tabler:file-export"
          severity="info"
          :disabled="!keyboardStore.isConnected"
          @click="handleExportVialJson"
        />
      </div>
    </div>
    
    <!-- 键码导出导入 -->
    <div class="rounded-lg border border-surface-200 bg-white p-4 shadow-sm dark:border-surface-700 dark:bg-surface-800">
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-surface-800 dark:text-surface-100">
          {{ $t('export.keymapBackup') }}
        </h2>
        <p class="mt-1 text-sm text-surface-600 dark:text-surface-400">
          {{ $t('export.exportKeymapDesc') }}
        </p>
      </div>
      
      <div class="mb-4 flex gap-3">
        <Button
          :label="$t('export.exportKeymap')"
          icon="tabler:download"
          severity="primary"
          @click="handleExportKeymap"
        />
        <Button
          :label="$t('export.importKeymap')"
          icon="tabler:upload"
          severity="secondary"
          @click="handleImportClick"
        />
        <input
          ref="fileInputRef"
          type="file"
          accept=".json"
          class="hidden"
          @change="handleFileChange"
        />
      </div>
    </div>
    
    <!-- 矩阵显示 -->
    <div class="rounded-lg border border-surface-200 bg-white p-4 shadow-sm dark:border-surface-700 dark:bg-surface-800">
      <div class="mb-3">
        <h3 class="text-base font-semibold text-surface-800 dark:text-surface-100">
          {{ $t('export.matrix') }}
        </h3>
        <p class="mt-1 text-xs text-surface-600 dark:text-surface-400">
          {{ $t('export.matrixDesc') }}
        </p>
      </div>
      <Textarea
        v-model="matrix"
        auto-resize
        :placeholder="`${$t('export.matrix')} (e.g., (0,0) (0,1) (1,0) (1,1))`"
        class="w-full font-mono text-sm"
        rows="3"
      />
    </div>
    
    <!-- 键位图层显示 -->
    <div class="flex-1 overflow-hidden rounded-lg border border-surface-200 bg-white p-4 shadow-sm dark:border-surface-700 dark:bg-surface-800">
      <div class="mb-3 flex items-center justify-between">
        <div>
          <h3 class="text-base font-semibold text-surface-800 dark:text-surface-100">
            {{ $t('export.keymap') }}
          </h3>
          <p class="mt-1 text-xs text-surface-600 dark:text-surface-400">
            {{ $t('export.keymapDesc') }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="exportAllLayers"
            :disabled="!keyboardStore.isConnected"
            input-id="viewAllLayers"
          />
          <label for="viewAllLayers" class="text-sm text-surface-700 dark:text-surface-300">
            {{ exportAllLayers ? $t('export.viewAllLayers') : $t('export.viewCurrentLayer') }}
          </label>
        </div>
      </div>
      <ScrollPanel class="h-[calc(100%-4rem)]">
        <div class="space-y-4">
          <div
            v-for="(k, index) in keys"
            :key="index"
            class="rounded border border-surface-200 bg-surface-50 p-3 dark:border-surface-600 dark:bg-surface-900"
          >
            <div class="mb-2 flex items-center justify-between">
              <div class="text-xs font-medium text-surface-600 dark:text-surface-400">
                {{ $t('export.layer') }} {{ exportAllLayers ? index : currentLayer }}
              </div>
              <Badge
                v-if="!exportAllLayers"
                :value="`${$t('export.currentLayer')}`"
                severity="info"
              />
            </div>
            <Textarea
              :value="k"
              auto-resize
              class="w-full font-mono text-sm"
              rows="2"
              readonly
            />
          </div>
          <div
            v-if="keys.length === 0"
            class="flex items-center justify-center py-8 text-surface-500 dark:text-surface-400"
          >
            <Icon name="tabler:keyboard-off" class="mr-2 text-xl" />
            <span>{{ $t('header.waitingForKeyboard') }}</span>
          </div>
        </div>
      </ScrollPanel>
    </div>
  </div>
  
  <ConfirmDialog />
  <Toast />
</template>
