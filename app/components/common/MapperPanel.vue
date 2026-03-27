<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'setKey', key: Key): void
}>()

const keyboardStore = useKeyboardStore()
const { t } = useI18n()

const keyTabs = computed(() => [
  { value: 'base', title: t('mapper.base') },
  { value: 'layer', title: t('mapper.layer') },
  { value: 'macros', title: t('mapper.macros') },
  { value: 'quantum', title: t('mapper.quantum') },
  { value: 'backlight', title: t('mapper.backlight') },
  { value: 'app-media-mouse', title: t('mapper.appMediaMouse') },
  { value: 'tap-dance', title: t('mapper.tapDance') },
  { value: 'user', title: t('mapper.user') },
])

const layerPrefix = {
  LT: 0x4000,
  MO: 0x5220,
  DF: 0x5240,
  TG: 0x5260,
  TT: 0x52C0,
  TO: 0x5200,
  OSL: 0x5280,
  PDF: 0x52E0,
}

const layerKeyCode = [
  {
    title: 'LT',
    value: Array.from({ length: keyboardStore.layerCount! }, (_, i) => layerPrefix.LT + (i << 8)),
  },
  ...(['MO', 'DF', 'TG', 'TT', 'TO', 'OSL', 'PDF'] as const).map(type => ({
    title: type,
    value: Array.from({ length: keyboardStore.layerCount! }, (_, i) => layerPrefix[type] + i),
  })),
]
function codeToKey(keycode: number): Key {
  const customKeycodes = keyboardStore.vialJson?.customKeycodes || []
  let symbol = [...keyToLable(keycode)]
  
  // 检查是否是user键
  if (keycode >= 0x0840 && keycode <= 0x085F) {
    const index = keycode - 0x0840
    if (index < customKeycodes.length) {
      // 设置symbol[0]为null，symbol[1]为shortName，这样会在中间显示且没有横杠
      symbol = [null, customKeycodes[index].shortName]
    }
  }
  
  return {
    geometry: {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      x2: 0,
      y2: 0,
      width2: 1,
      height2: 1,
      rotation_x: 0,
      rotation_y: 0,
      rotation_angle: 0,
    },
    position: {
      row: 0,
      col: 0,
    },
    info: {
      code: keycode,
      symbol,
    },
  }
}

function parseKleLayout(layout: KeymapItem[][]): Key[] {
  const kle = deserialize(layout)
  const pikeGeo = (k: InstanceType<typeof KleKey>) => pick(k, ['x', 'y', 'width', 'height', 'x2', 'y2', 'width2', 'height2', 'rotation_x', 'rotation_y', 'rotation_angle'])

  return kle.keys.map((k) => {
    const keycode = Number.parseInt(k.labels[0]!, 16)
    return {
      geometry: pikeGeo(k),
      position: { row: 0, col: 0 },
      info: {
        code: keycode,
        symbol: [...keyToLable(keycode)],
      },
    } as Key
  })
}

function rowsFromCodes(codes: number[]) {
  return codes
}

function codesInRange(min: number, max: number) {
  return Object.keys(keyCodeMap)
    .map(Number)
    .filter(code => code >= min && code <= max)
    .sort((a, b) => a - b)
}

const baseKeys = parseKleLayout(layout104)
const macroKeyCodes = computed(() => Array.from({ length: keyboardStore.macroCount ?? 0 }, (_, i) => 0x7700 + i))
const macroControlCodes = [0x0753, 0x0754, 0x0755, 0x0756, 0x0757]
const macroRows = computed(() => rowsFromCodes(macroKeyCodes.value))
const quantumRows = computed(() => rowsFromCodes([
  ...codesInRange(0x0400, 0x04FF),
  ...codesInRange(0x0700, 0x07FF),
  ...codesInRange(0x0800, 0x083F),
]))
const backlightRows = computed(() => rowsFromCodes(codesInRange(0x0600, 0x0606)))
const appMediaMouseRows = computed(() => rowsFromCodes([
  ...codesInRange(0x0065, 0x0065),
  ...codesInRange(0x00A8, 0x00DF),
]))
const tapDanceRows = computed(() => rowsFromCodes(codesInRange(0x5700, 0x571F)))
const userRows = computed(() => {
  const customKeycodes = keyboardStore.vialJson?.customKeycodes || []
  if (customKeycodes.length > 0) {
    return customKeycodes.map((_, index) => 0x0840 + index)
  }
  return rowsFromCodes(codesInRange(0x0840, 0x085F))
})
</script>

<template>
  <div class="rounded-prime-md w-full border bg-white px-3 py-2 shadow dark:bg-surface-900">
    <Tabs value="base">
      <TabList>
        <Tab v-for="tab in keyTabs" :key="tab.value" :value="tab.value!" class="py-3 text-sm">
          {{ tab.title }}
        </Tab>
      </TabList>
      <TabPanels class="flex justify-center">
        <TabPanel value="base">
          <Keyboard :keys="baseKeys" style="zoom: 0.75;" @click="(key, _zone) => emit('setKey', key)" />
        </TabPanel>
        <TabPanel value="layer">
          <div v-for="(key, index) in layerKeyCode" :key="index" class="mb-2 flex gap-2">
            <Key v-for="code in key.value" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
        <TabPanel value="macros">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in macroControlCodes" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in macroRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
        <TabPanel value="quantum">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in quantumRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
        <TabPanel value="backlight">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in backlightRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
        <TabPanel value="app-media-mouse">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in appMediaMouseRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
        <TabPanel value="tap-dance">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in tapDanceRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
        <TabPanel value="user">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in userRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
