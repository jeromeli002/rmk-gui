<script lang="ts" setup>
const { t } = useI18n()

const timeoutOptions = [
  { label: t('powerSaving.never'), value: 0 },
  { label: `30 ${t('powerSaving.seconds')}`, value: 30 },
  { label: `1 ${t('powerSaving.minutes')}`, value: 60 },
  { label: `2 ${t('powerSaving.minutes')}`, value: 120 },
  { label: `5 ${t('powerSaving.minutes')}`, value: 300 },
  { label: `10 ${t('powerSaving.minutes')}`, value: 600 },
  { label: `15 ${t('powerSaving.minutes')}`, value: 900 },
  { label: `30 ${t('powerSaving.minutes')}`, value: 1800 },
]

const enableSleep = ref(false)
const sleepTimeout = ref(300)
const backlightTimeout = ref(120)
const lowPowerMode = ref(false)
</script>

<template>
  <SettingCard :title="$t('powerSaving.title')">
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base">
            {{ $t('powerSaving.enableSleep') }}
          </h2>
          <p class="text-sm text-surface-500 dark:text-surface-400">
            {{ $t('powerSaving.sleepTimeoutDesc') }}
          </p>
        </div>
        <ToggleSwitch v-model="enableSleep" />
      </div>

      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base">
            {{ $t('powerSaving.sleepTimeout') }}
          </h2>
        </div>
        <Select
          v-model="sleepTimeout"
          :options="timeoutOptions"
          option-label="label"
          option-value="value"
          size="small"
          class="w-32"
          :disabled="!enableSleep"
        />
      </div>

      <Divider />

      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base">
            {{ $t('powerSaving.backlightTimeout') }}
          </h2>
          <p class="text-sm text-surface-500 dark:text-surface-400">
            {{ $t('powerSaving.backlightTimeoutDesc') }}
          </p>
        </div>
        <Select
          v-model="backlightTimeout"
          :options="timeoutOptions"
          option-label="label"
          option-value="value"
          size="small"
          class="w-32"
        />
      </div>

      <Divider />

      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base">
            {{ $t('powerSaving.lowPowerMode') }}
          </h2>
          <p class="text-sm text-surface-500 dark:text-surface-400">
            {{ $t('powerSaving.lowPowerModeDesc') }}
          </p>
        </div>
        <ToggleSwitch v-model="lowPowerMode" />
      </div>
    </div>
  </SettingCard>
</template>
