<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toast = useToast()
const keyboardStore = useKeyboardStore()

// 本地编辑状态
const localConfig = ref({
  mode: 0,
  hue: 0,
  sat: 255,
  val: 255,
  speed: 128,
  brightness: 255,
})

// 从store同步配置到本地
function syncFromStore() {
  const storeConfig = keyboardStore.rgbConfig
  if (storeConfig) {
    // 从store同步配置
    localConfig.value = { ...storeConfig }
  }
}

// 保存配置
async function saveRgbConfig() {
  if (!keyboardStore.isConnected || !keyboardStore.lightingType) {
    return
  }
  try {
    // 发送所有当前设置到键盘
    await keyboardStore.setRgbMode(localConfig.value.mode)
    await keyboardStore.setRgbColor(localConfig.value.hue, localConfig.value.sat)
    await keyboardStore.setRgbSpeed(localConfig.value.speed)
    if (keyboardStore.lightingType === 'vialrgb') {
      await keyboardStore.setRgbBrightness(localConfig.value.val)
    }
    else {
      await keyboardStore.setRgbBrightness(localConfig.value.brightness)
    }
    // 保存到EEPROM
    await keyboardStore.saveRgbConfig()
    toast.add({
      severity: 'success',
      summary: t('lighting.saveSuccess'),
      detail: t('lighting.saveSuccessDesc'),
      life: 3000,
    })
  }
  catch (error) {
    console.error('Failed to save RGB config:', error)
    toast.add({
      severity: 'error',
      summary: t('lighting.saveFailed'),
      detail: t('lighting.saveFailedDesc'),
      life: 3000,
    })
  }
}

// QMK RGBLight 效果列表
const qmkRgblightEffects = [
  { value: 0, label: t('lighting.effects.allOff'), hasColor: false },
  { value: 1, label: t('lighting.effects.solidColor'), hasColor: true },
  { value: 2, label: t('lighting.effects.breathing1'), hasColor: true },
  { value: 3, label: t('lighting.effects.breathing2'), hasColor: true },
  { value: 4, label: t('lighting.effects.breathing3'), hasColor: true },
  { value: 5, label: t('lighting.effects.breathing4'), hasColor: true },
  { value: 6, label: t('lighting.effects.rainbowMood1'), hasColor: false },
  { value: 7, label: t('lighting.effects.rainbowMood2'), hasColor: false },
  { value: 8, label: t('lighting.effects.rainbowMood3'), hasColor: false },
  { value: 9, label: t('lighting.effects.rainbowSwirl1'), hasColor: false },
  { value: 10, label: t('lighting.effects.rainbowSwirl2'), hasColor: false },
  { value: 11, label: t('lighting.effects.rainbowSwirl3'), hasColor: false },
  { value: 12, label: t('lighting.effects.rainbowSwirl4'), hasColor: false },
  { value: 13, label: t('lighting.effects.rainbowSwirl5'), hasColor: false },
  { value: 14, label: t('lighting.effects.rainbowSwirl6'), hasColor: false },
  { value: 15, label: t('lighting.effects.snake1'), hasColor: true },
  { value: 16, label: t('lighting.effects.snake2'), hasColor: true },
  { value: 17, label: t('lighting.effects.snake3'), hasColor: true },
  { value: 18, label: t('lighting.effects.snake4'), hasColor: true },
  { value: 19, label: t('lighting.effects.snake5'), hasColor: true },
  { value: 20, label: t('lighting.effects.snake6'), hasColor: true },
  { value: 21, label: t('lighting.effects.knight1'), hasColor: true },
  { value: 22, label: t('lighting.effects.knight2'), hasColor: true },
  { value: 23, label: t('lighting.effects.knight3'), hasColor: true },
  { value: 24, label: t('lighting.effects.christmas'), hasColor: true },
  { value: 25, label: t('lighting.effects.gradient1'), hasColor: true },
  { value: 26, label: t('lighting.effects.gradient2'), hasColor: true },
  { value: 27, label: t('lighting.effects.gradient3'), hasColor: true },
  { value: 28, label: t('lighting.effects.gradient4'), hasColor: true },
  { value: 29, label: t('lighting.effects.gradient5'), hasColor: true },
  { value: 30, label: t('lighting.effects.gradient6'), hasColor: true },
  { value: 31, label: t('lighting.effects.gradient7'), hasColor: true },
  { value: 32, label: t('lighting.effects.gradient8'), hasColor: true },
  { value: 33, label: t('lighting.effects.gradient9'), hasColor: true },
  { value: 34, label: t('lighting.effects.gradient10'), hasColor: true },
  { value: 35, label: t('lighting.effects.rgbTest'), hasColor: true },
  { value: 36, label: t('lighting.effects.alternating'), hasColor: true },
]

// VialRGB 效果列表
const vialrgbEffects = [
  { value: 0, label: t('lighting.effects.vialrgb.disable'), hasColor: false },
  { value: 1, label: t('lighting.effects.vialrgb.direct'), hasColor: false },
  { value: 2, label: t('lighting.effects.solidColor'), hasColor: true },
  { value: 3, label: t('lighting.effects.vialrgb.alphasMods'), hasColor: true },
  { value: 4, label: t('lighting.effects.vialrgb.gradientUpDown'), hasColor: true },
  { value: 5, label: t('lighting.effects.vialrgb.gradientLeftRight'), hasColor: true },
  { value: 6, label: t('lighting.effects.breathing1'), hasColor: true },
  { value: 7, label: t('lighting.effects.vialrgb.bandSat'), hasColor: false },
  { value: 8, label: t('lighting.effects.vialrgb.bandVal'), hasColor: false },
  { value: 9, label: t('lighting.effects.vialrgb.bandPinwheelSat'), hasColor: false },
  { value: 10, label: t('lighting.effects.vialrgb.bandPinwheelVal'), hasColor: false },
  { value: 11, label: t('lighting.effects.vialrgb.bandSpiralSat'), hasColor: false },
  { value: 12, label: t('lighting.effects.vialrgb.bandSpiralVal'), hasColor: false },
  { value: 13, label: t('lighting.effects.vialrgb.cycleAll'), hasColor: false },
  { value: 14, label: t('lighting.effects.vialrgb.cycleLeftRight'), hasColor: false },
  { value: 15, label: t('lighting.effects.vialrgb.cycleUpDown'), hasColor: false },
  { value: 16, label: t('lighting.effects.vialrgb.rainbowMovingChevron'), hasColor: false },
  { value: 17, label: t('lighting.effects.vialrgb.cycleOutIn'), hasColor: false },
  { value: 18, label: t('lighting.effects.vialrgb.cycleOutInDual'), hasColor: false },
  { value: 19, label: t('lighting.effects.vialrgb.cyclePinwheel'), hasColor: false },
  { value: 20, label: t('lighting.effects.vialrgb.cycleSpiral'), hasColor: false },
  { value: 21, label: t('lighting.effects.vialrgb.dualBeacon'), hasColor: false },
  { value: 22, label: t('lighting.effects.vialrgb.rainbowBeacon'), hasColor: false },
  { value: 23, label: t('lighting.effects.vialrgb.rainbowPinwheels'), hasColor: false },
  { value: 24, label: t('lighting.effects.vialrgb.raindrops'), hasColor: false },
  { value: 25, label: t('lighting.effects.vialrgb.jellybeanRaindrops'), hasColor: false },
  { value: 26, label: t('lighting.effects.vialrgb.hueBreathing'), hasColor: false },
  { value: 27, label: t('lighting.effects.vialrgb.huePendulum'), hasColor: false },
  { value: 28, label: t('lighting.effects.vialrgb.hueWave'), hasColor: false },
  { value: 29, label: t('lighting.effects.vialrgb.typingHeatmap'), hasColor: false },
  { value: 30, label: t('lighting.effects.vialrgb.digitalRain'), hasColor: false },
  { value: 31, label: t('lighting.effects.vialrgb.solidReactiveSimple'), hasColor: true },
  { value: 32, label: t('lighting.effects.vialrgb.solidReactive'), hasColor: true },
  { value: 33, label: t('lighting.effects.vialrgb.solidReactiveWide'), hasColor: true },
  { value: 34, label: t('lighting.effects.vialrgb.solidReactiveMultiwide'), hasColor: true },
  { value: 35, label: t('lighting.effects.vialrgb.solidReactiveCross'), hasColor: true },
  { value: 36, label: t('lighting.effects.vialrgb.solidReactiveMulticross'), hasColor: true },
  { value: 37, label: t('lighting.effects.vialrgb.solidReactiveNexus'), hasColor: true },
  { value: 38, label: t('lighting.effects.vialrgb.solidReactiveMultinexus'), hasColor: true },
  { value: 39, label: t('lighting.effects.vialrgb.splash'), hasColor: false },
  { value: 40, label: t('lighting.effects.vialrgb.multisplash'), hasColor: false },
  { value: 41, label: t('lighting.effects.vialrgb.solidSplash'), hasColor: true },
  { value: 42, label: t('lighting.effects.vialrgb.solidMultisplash'), hasColor: true },
  { value: 43, label: t('lighting.effects.vialrgb.pixelRain'), hasColor: false },
  { value: 44, label: t('lighting.effects.vialrgb.pixelFractal'), hasColor: false },
]

// 当前效果列表
const currentEffects = computed(() => {
  if (keyboardStore.lightingType === 'vialrgb') {
    return vialrgbEffects
  }
  return qmkRgblightEffects
})

// 当前效果是否需要颜色选择器
const currentEffectHasColor = computed(() => {
  const effect = currentEffects.value.find(e => e.value === localConfig.value.mode)
  return effect?.hasColor ?? false
})

// 颜色选择器显示的颜色
const selectedColor = computed(() => {
  // 将H从0-255转换为0-360范围用于显示
  const hue360 = (localConfig.value.hue / 255) * 360
  return hsvToHex(hue360, localConfig.value.sat, 255)
})

// HSV转Hex
function hsvToHex(h: number, s: number, v: number): string {
  const sNorm = s / 255
  const vNorm = v / 255
  const c = vNorm * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = vNorm - c

  let r = 0
  let g = 0
  let b = 0

  if (h < 60) {
    r = c
    g = x
    b = 0
  }
  else if (h < 120) {
    r = x
    g = c
    b = 0
  }
  else if (h < 180) {
    r = 0
    g = c
    b = x
  }
  else if (h < 240) {
    r = 0
    g = x
    b = c
  }
  else if (h < 300) {
    r = x
    g = 0
    b = c
  }
  else {
    r = c
    g = 0
    b = x
  }

  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Hex转HSV
function hexToHsv(hex: string): { h: number, s: number, v: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    return { h: 0, s: 0, v: 255 }
  }

  const r = Number.parseInt(result[1]!, 16) / 255
  const g = Number.parseInt(result[2]!, 16) / 255
  const b = Number.parseInt(result[3]!, 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  let h = 0
  if (d !== 0) {
    if (max === r) {
      h = ((g - b) / d + 6) % 6 * 60
    }
    else if (max === g) {
      h = ((b - r) / d + 2) * 60
    }
    else {
      h = ((r - g) / d + 4) * 60
    }
  }

  const s = max === 0 ? 0 : d / max * 255
  const v = max * 255

  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) }
}

// 处理效果变化
async function onEffectChange(value: number) {
  localConfig.value.mode = value
  try {
    await keyboardStore.setRgbMode(value)
  }
  catch (error) {
    console.error('Failed to set mode:', error)
  }
}

// 处理亮度/Val变化
async function onBrightnessChange(value: number) {
  if (keyboardStore.lightingType === 'vialrgb') {
    localConfig.value.val = value
  }
  else {
    localConfig.value.brightness = value
  }
  try {
    await keyboardStore.setRgbBrightness(value)
  }
  catch (error) {
    console.error('Failed to set brightness:', error)
  }
}

// 处理亮度/Val滚轮
function onBrightnessWheel(e: WheelEvent) {
  e.preventDefault()
  const currentValue = keyboardStore.lightingType === 'vialrgb' ? localConfig.value.val : localConfig.value.brightness
  let newValue = currentValue + (e.deltaY > 0 ? -5 : 5)
  // 限制在0-255范围内
  newValue = Math.max(0, Math.min(255, newValue))
  onBrightnessChange(newValue)
}

// 处理速度变化
async function onSpeedChange(value: number) {
  localConfig.value.speed = value
  try {
    await keyboardStore.setRgbSpeed(value)
  }
  catch (error) {
    console.error('Failed to set speed:', error)
  }
}

// 处理速度滚轮
function onSpeedWheel(e: WheelEvent) {
  e.preventDefault()
  const newValue = localConfig.value.speed + (e.deltaY > 0 ? -5 : 5)
  // 限制在0-255范围内
  const clampedValue = Math.max(0, Math.min(255, newValue))
  onSpeedChange(clampedValue)
}

// 处理颜色变化
async function onColorChange(event: Event) {
  const target = event.target as HTMLInputElement
  const { h, s } = hexToHsv(target.value)
  // 将H从0-360转换为0-255范围
  const hue255 = Math.round((h / 360) * 255)
  localConfig.value.hue = hue255
  localConfig.value.sat = s
  try {
    await keyboardStore.setRgbColor(hue255, s)
  }
  catch (error) {
    console.error('Failed to set color:', error)
  }
}

// 监听store中的配置变化
watch(() => keyboardStore.rgbConfig, () => {
  syncFromStore()
}, { immediate: true, deep: true })
</script>

<template>
  <div class="flex justify-center p-3">
    <div class="rounded-prime-xl w-full max-w-md bg-surface-0 p-4 shadow-md dark:bg-surface-900">
      <h2 class="mb-4 text-xl font-bold">
        {{ t('lighting.title') }}
      </h2>

      <!-- 未连接键盘提示 -->
      <div v-if="!keyboardStore.isConnected" class="text-center text-surface-500">
        {{ t('lighting.notConnected') }}
      </div>

      <!-- 键盘不支持灯光提示 -->
      <div v-else-if="!keyboardStore.lightingType" class="text-center text-surface-500">
        {{ t('lighting.notAvailable') }}
      </div>

      <!-- 灯光配置界面 -->
      <div v-else class="space-y-4">
        <!-- 效果选择 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">{{ t('lighting.effect') }}</label>
          <Select
            v-model="localConfig.mode"
            :options="currentEffects"
            option-label="label"
            option-value="value"
            class="w-full"
            :scrollable="true"
            @change="(e: any) => onEffectChange(e.value)"
          />
        </div>

        <!-- 颜色选择器 -->
        <div v-if="currentEffectHasColor" class="space-y-2">
          <label class="block text-sm font-medium">{{ t('lighting.color') }}</label>
          <div class="flex items-center gap-3">
            <input
              type="color"
              :value="selectedColor"
              class="h-10 w-20 cursor-pointer rounded border border-surface-300"
              @input="onColorChange"
            >
            <span class="text-sm text-surface-500">{{ selectedColor.toUpperCase() }}</span>
          </div>
        </div>

        <!-- 亮度控制 (QMK RGBLight) / Val控制 (VialRGB) -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="block text-sm font-medium">
              {{ keyboardStore.lightingType === 'vialrgb' ? t('lighting.val') : t('lighting.brightness') }}
            </label>
            <span class="text-sm text-surface-500">
              {{ keyboardStore.lightingType === 'vialrgb' ? localConfig.val : localConfig.brightness }}
            </span>
          </div>
          <Slider
            :model-value="keyboardStore.lightingType === 'vialrgb' ? localConfig.val : localConfig.brightness"
            :min="0"
            :max="255"
            class="w-full"
            @change="(val: number) => onBrightnessChange(val)"
            @wheel="onBrightnessWheel"
          />
        </div>

        <!-- 速度控制 -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="block text-sm font-medium">{{ t('lighting.speed') }}</label>
            <span class="text-sm text-surface-500">{{ localConfig.speed }}</span>
          </div>
          <Slider
            v-model="localConfig.speed"
            :min="0"
            :max="255"
            class="w-full"
            @change="(val: number) => onSpeedChange(val)"
            @wheel="onSpeedWheel"
          />
        </div>

        <!-- 保存按钮 - 参考vial-gui，总是可用 -->
        <div class="flex justify-end pt-4">
          <Button
            :label="t('lighting.save')"
            @click="saveRgbConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>
