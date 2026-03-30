<script lang="ts" setup>
import { computed } from 'vue'
const themeStore = useSettingStore()
const { locales, t } = useI18n()
import { primaryColors, surfaceColors } from '../../types/constants'

const themeModeOptions = [
  { icon: 'tabler:sun', label: t('settings.general.light'), value: 'light' },
  { icon: 'tabler:moon-stars', label: t('settings.general.dark'), value: 'dark' },
  { icon: 'tabler:settings', label: t('settings.general.system'), value: 'system' },
]

// Internationalized color options
const i18nPrimaryColors = computed(() => {
  return primaryColors.map(color => ({
    ...color,
    label: t(`settings.colors.${color.name}`) || color.name
  }))
})

const i18nSurfaceColors = computed(() => {
  return surfaceColors.map(color => ({
    ...color,
    label: t(`settings.colors.${color.name}`) || color.name
  }))
})
</script>

<template>
  <SettingCard :title="$t('settings.general.title')">
    <div class="flex h-9 items-center justify-between">
      <h2> {{ $t("settings.general.language") }} </h2>
      <Select v-model="themeStore.language" :options="locales" option-label="name" option-value="code" size="small" class="w-32" />
    </div>
    <div class="flex h-9 items-center justify-between">
      <h2> {{ $t("settings.general.mode") }} </h2>
      <Select v-model="themeStore.darkMode" :options="themeModeOptions" option-label="label" option-value="value" size="small" class="w-32" />
    </div>
    <div class="flex h-9 items-center justify-between">
      <h2> {{ $t("settings.general.primary") }} </h2>
      <Select v-model="themeStore.primary" :options="i18nPrimaryColors" option-label="label" option-value="name" size="small" class="w-32">
        <template #option="{ option }">
          <div class="flex items-center">
            <div class="size-2 rounded-full" :style="{ backgroundColor: option.palette[500] }" />
            <span class="ml-2"> {{ option.label }} </span>
          </div>
        </template>
      </Select>
    </div>
    <div class="flex h-9 items-center justify-between">
      <h2> {{ $t("settings.general.surface") }} </h2>
      <Select v-model="themeStore.surface" :options="i18nSurfaceColors" option-label="label" option-value="name" size="small" class="w-32">
        <template #option="{ option }">
          <div class="flex items-center">
            <div class="size-2 rounded-full" :style="{ backgroundColor: option.palette[500] }" />
            <span class="ml-2"> {{ option.label }} </span>
          </div>
        </template>
      </Select>
    </div>
  </SettingCard>
</template>
