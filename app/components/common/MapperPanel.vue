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
  { value: 'joystick', title: t('mapper.joystick') },
  { value: 'backlight', title: t('mapper.backlight') },
  { value: 'app-media-mouse', title: t('mapper.appMediaMouse') },
  { value: 'dial', title: t('mapper.dial') },
  { value: 'midi', title: t('mapper.midi') },
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
  if (keycode >= 0x7E00 && keycode <= 0x7E1F) {
    const index = keycode - 0x7E00
    if (index < customKeycodes.length && customKeycodes[index]?.shortName) {
      // 设置symbol[0]为null，symbol[1]为shortName，这样会在中间显示且没有横杠
      symbol = [null, customKeycodes[index].shortName]
    }
    else {
      // 如果没有自定义键码或shortName为空，显示为userX
      symbol = [null, `user${index}`]
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
    let symbol = [...keyToLable(keycode)]

    // 检查是否是user键
    if (keycode >= 0x7E00 && keycode <= 0x7E1F) {
      const customKeycodes = keyboardStore.vialJson?.customKeycodes || []
      const index = keycode - 0x7E00
      if (index < customKeycodes.length && customKeycodes[index]?.shortName) {
        // 设置symbol[0]为null，symbol[1]为shortName，这样会在中间显示且没有横杠
        symbol = [null, customKeycodes[index].shortName]
      }
      else {
        // 如果没有自定义键码或shortName为空，显示为userX
        symbol = [null, `user${index}`]
      }
    }

    return {
      geometry: pikeGeo(k),
      position: { row: 0, col: 0 },
      info: {
        code: keycode,
        symbol,
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
  ...codesInRange(0x0420, 0x04FF),
  ...codesInRange(0x0700, 0x07FF),
  ...codesInRange(0x0800, 0x083F),
]))

const joystickRows = computed(() => rowsFromCodes(codesInRange(0x7400, 0x741F)))
const backlightRows = computed(() => rowsFromCodes(codesInRange(0x0600, 0x0634)))
const appMediaMouseRows = computed(() => rowsFromCodes([
  ...codesInRange(0x0068, 0x00DF),
]))
const dialRows = computed(() => rowsFromCodes([
  ...codesInRange(0x7200, 0x7201),
]))
const midiRows = computed(() => rowsFromCodes([
  ...codesInRange(0x0200, 0x028F),
]))
const tapDanceRows = computed(() => {
  const count = keyboardStore.tapDanceCount || 0
  return Array.from({ length: count }, (_, i) => 0x5700 + i)
})
const userRows = computed(() => {
  const customKeycodes = keyboardStore.vialJson?.customKeycodes || []
  if (customKeycodes.length > 0) {
    return customKeycodes.map((_, index) => 0x7E00 + index)
  }
  return rowsFromCodes(codesInRange(0x7E00, 0x7E1F))
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
          <div class="mb-2 flex flex-wrap gap-2">
            <template v-for="group in layerKeyCode" :key="group.title">
              <Key v-for="code in group.value" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
            </template>
          </div>
        </TabPanel>
        <TabPanel value="joystick">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in joystickRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
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
        <TabPanel value="dial">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in dialRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
          </div>
        </TabPanel>
        <TabPanel value="midi">
          <div class="mb-2 flex flex-wrap gap-2">
            <Key v-for="code in midiRows" :key="code" :key-info="codeToKey(code)" @click="(_zone) => emit('setKey', codeToKey(code))" />
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
