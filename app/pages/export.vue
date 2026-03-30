<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const keyboardStore = useKeyboardStore()
const toast = useToast()
const confirm = useConfirm()
const { t } = useI18n()

const fileInputRef = ref<HTMLInputElement | null>(null)
const pendingImportFile = ref<File | null>(null)

function handleImportClick() {
  fileInputRef.value?.click()
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
  
  // 收集编码器数据
  const encoderData: Record<string, number> = {}
  if (keyboardStore.encoderKeymap && keyboardStore.encoderKeymap.size > 0) {
    for (const [key, value] of keyboardStore.encoderKeymap.entries()) {
      const [layer, encoderIdx, direction] = key
      encoderData[`${layer}_${encoderIdx}_${direction}`] = value
    }
  }
  
  // 收集宏数据
  const macrosData = keyboardStore.keyMacros
  
  // 收集 Tap Dance 数据
  const tapDanceData = keyboardStore.tapDanceEntries
  
  // 收集 Combo 数据
  const comboData = keyboardStore.comboEntries
  
  return {
    version: '1.1',
    timestamp: new Date().toISOString(),
    layerCount: keyboardStore.layerCount,
    keymap: keymapData,
    encoder: encoderData,
    macros: macrosData,
    tapDance: tapDanceData,
    combo: comboData,
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
    const jsonString = JSON.stringify(exportData)
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
      if (data.keymap) {
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
      }
      
      // 导入编码器数据
      if (data.encoder && keyboardStore.encoderKeymap && keyboardStore.isConnected) {
        for (const [key, value] of Object.entries(data.encoder)) {
          const [layer, encoderIdx, direction] = key.split('_').map(Number)
          
          try {
            // 更新 encoderKeymap（内存中的数据）
            keyboardStore.encoderKeymap.set([layer, encoderIdx, direction], value as number)
            
            // 写入硬件
            await keyboardStore.setEncoderKeycode(layer, encoderIdx, direction === 1 ? 'cw' : 'ccw', value as number)
            successCount++
          } catch (err) {
            console.error(`Failed to set encoder keycode at [${layer},${encoderIdx},${direction}]:`, err)
            errorCount++
          }
        }
      }
      
      // 导入宏数据
      if (data.macros && keyboardStore.keyMacros && keyboardStore.macroCount && keyboardStore.isConnected) {
        try {
          keyboardStore.keyMacros = data.macros
          await keyboardStore.saveMacros()
          successCount++
        } catch (err) {
          console.error('Failed to import macros:', err)
          errorCount++
        }
      }
      
      // 导入 Tap Dance 数据
      if (data.tapDance && keyboardStore.tapDanceEntries && keyboardStore.tapDanceCount && keyboardStore.isConnected) {
        for (let i = 0; i < data.tapDance.length; i++) {
          try {
            await keyboardStore.setTapDanceEntry(i, data.tapDance[i])
            successCount++
          } catch (err) {
            console.error(`Failed to set tap dance entry ${i}:`, err)
            errorCount++
          }
        }
      }
      
      // 导入 Combo 数据
      if (data.combo && keyboardStore.comboEntries && keyboardStore.comboCount && keyboardStore.isConnected) {
        for (let i = 0; i < data.combo.length; i++) {
          try {
            await keyboardStore.setComboEntry(i, data.combo[i])
            successCount++
          } catch (err) {
            console.error(`Failed to set combo entry ${i}:`, err)
            errorCount++
          }
        }
      }
      
      // 不自动更新矩阵配置，矩阵应该从键盘读取
      // 如果导入的文件包含 matrix 字段，可以选择性使用
      if (data.matrix) {
        // Matrix data is available but not automatically applied
        console.log('Matrix data found in import file:', data.matrix)
      }
      
      // 清空文件输入和临时变量
      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
      pendingImportFile.value = null
      
      // 显示成功提示
      let summary = t('export.importSuccess')
      if (keyboardStore.isConnected) {
        summary += ` (${successCount} items)`
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
    

  </div>
  
  <ConfirmDialog />
  <Toast />
</template>
