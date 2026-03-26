<script lang="ts" setup>
interface ComboItem {
  inputs: ([string | null, string | null] | null)[]
  output: [string | null, string | null]
}

const keyboardStore = useKeyboardStore()
const { t } = useI18n()
const combosCount = computed(() => Number((keyboardStore.vialJson as any)?.combos ?? 8))
const currCombos = ref(0)
const currKey = ref<[number, number, number, 'input' | 'output', 'outer' | 'inner' | null]>([0, 0, 0, 'input', null])

const comboLayers = ref<ComboItem[][]>([])
watchEffect(() => {
  const count = Math.max(0, combosCount.value)
  while (comboLayers.value.length < count) {
    comboLayers.value.push([{ inputs: [null, null, null, null], output: [null, 'A'] }])
  }
  comboLayers.value = comboLayers.value.slice(0, count)
  if (currCombos.value >= count)
    currCombos.value = Math.max(0, count - 1)
})

function symbolToCode(symbol: [string | null, string | null]) {
  const needle = JSON.stringify(symbol)
  for (const [code, info] of Object.entries(keyCodeMap)) {
    if (JSON.stringify(info.symbol) === needle)
      return Number(code)
  }
  return 0
}

function toDisplayKey(symbol: [string | null, string | null]): Key {
  return {
    geometry: { x: 0, y: 0, width: 1, height: 1, x2: 0, y2: 0, width2: 1, height2: 1, rotation_x: 0, rotation_y: 0, rotation_angle: 0 },
    position: { row: 0, col: 0 },
    info: { code: symbolToCode(symbol), symbol: [...symbol] },
  }
}

function clearSelectedProps() {
  currKey.value = [0, 0, 0, 'input', null]
}

function delCombo(index: number) {
  comboLayers.value[currCombos.value]!.splice(index, 1)
  clearSelectedProps()
}

function setKeycode(zone: 'outer' | 'inner', comboIndex: number, inputIndex: number, target: 'input' | 'output') {
  currKey.value = [currCombos.value, comboIndex, inputIndex, target, zone]
}

function setMapperKeycode(key: number) {
  if (!keyCodeMap[key]) {
    clearSelectedProps()
    return
  }

  const [layer, comboIndex, inputIndex, target, zone] = currKey.value
  if (!zone)
    return

  const combo = comboLayers.value[layer]![comboIndex]
  if (!combo)
    return

  if (target === 'input') {
    if (zone === 'outer')
      combo.inputs[inputIndex] = structuredClone(keyCodeMap[key].symbol)
    else
      combo.inputs[inputIndex] = [combo.inputs[inputIndex]?.[0] ?? null, structuredClone(keyCodeMap[key].symbol[1]!)]
  }
  else {
    if (zone === 'outer')
      combo.output = structuredClone(keyCodeMap[key].symbol)
    else
      combo.output[1] = structuredClone(keyCodeMap[key].symbol[1]!)
  }

  clearSelectedProps()
}

function selectKeycode(comboIndex: number, inputIndex: number, target: 'input' | 'output') {
  return currKey.value[1] === comboIndex && currKey.value[2] === inputIndex && currKey.value[3] === target
    ? currKey.value[4]
    : null
}

function setMapperKeyByItem(key: Key) {
  setMapperKeycode(key.info.code)
}
</script>

<template>
  <div
    class="flex size-full flex-auto flex-col items-center justify-around gap-3 overflow-hidden p-3 text-surface-500 dark:text-surface-400"
    @click.self="clearSelectedProps()"
  >
    <div class="flex w-full items-start justify-start">
      <Switcher text="Combos" :count="combosCount" :layer="currCombos" @change="currCombos = $event" />
    </div>
    <ScrollPanel class="size-full" pt:content:class="!p-0 !w-full !h-full">
      <div class="flex flex-col gap-2">
        <div
          v-for="(combo, comboIndex) in comboLayers[currCombos]"
          :key="comboIndex"
          class="rounded-prime-md flex items-center gap-2 bg-surface-200 p-2 dark:bg-surface-800"
        >
          <div class="text-xs opacity-70">
            #{{ comboIndex + 1 }}
          </div>
          <div class="flex items-center gap-2">
            <template v-for="(inputKey, inputIndex) in combo.inputs" :key="inputIndex">
              <span class="w-10 text-xs">key{{ inputIndex + 1 }}</span>
              <Key
                :key-info="toDisplayKey(inputKey ?? [null, null])"
                :highlight="selectKeycode(comboIndex, inputIndex, 'input')"
                @click.stop="setKeycode($event, comboIndex, inputIndex, 'input')"
              />
            </template>
          </div>
          <span class="px-2">→ {{ t('combos.outputKey') }}</span>
          <Key
            :key-info="toDisplayKey(combo.output)"
            :highlight="selectKeycode(comboIndex, 0, 'output')"
            @click.stop="setKeycode($event, comboIndex, 0, 'output')"
          />
          <Button size="small" icon="pi pi-trash" text severity="danger" @click.stop="delCombo(comboIndex)" />
        </div>
      </div>
    </ScrollPanel>
    <div v-if="currKey[4]" class="w-full" @click.stop>
      <MapperPanel @set-key="setMapperKeyByItem" />
    </div>
  </div>
</template>
