<script lang="ts" setup>
const keyboardStore = useKeyboardStore()

const currCombos = ref(0)
const currKey = ref<[number, number, 'input' | 'output', 'outer' | 'inner'] | null>(null)

const combosCount = computed(() => {
  const count = Number((keyboardStore.vialJson as any)?.combos ?? 8)
  return Math.max(1, count)
})

interface ComboData {
  inputs: (number | null)[]
  output: number | null
}

const combosData = ref<ComboData[]>([{
  inputs: [null, null, null, null],
  output: null,
}])

function toDisplayKey(keycode: number | null): Key {
  const code = keycode ?? 0
  return {
    geometry: { x: 0, y: 0, width: 1, height: 1, x2: 0, y2: 0, width2: 1, height2: 1, rotation_x: 0, rotation_y: 0, rotation_angle: 0 },
    position: { row: 0, col: 0 },
    info: { code, symbol: [...keyToLable(code)] },
  }
}

function clearSelectedProps() {
  currKey.value = null
}

function setKeycode(zone: 'outer' | 'inner', comboIndex: number, inputIndex: number, target: 'input' | 'output') {
  const isCurr = currKey.value?.[0] === comboIndex && currKey.value?.[1] === inputIndex && currKey.value?.[2] === target && currKey.value?.[3] === zone
  currKey.value = isCurr ? null : [comboIndex, inputIndex, target, zone]
}

function handleSetKey(key: Key) {
  if (!currKey.value) {
    return
  }

  const [comboIndex, inputIndex, target] = currKey.value
  const code = key.info.code

  if (comboIndex < 0 || comboIndex >= combosData.value.length) {
    return
  }

  const combo = combosData.value[comboIndex]
  if (!combo) {
    return
  }

  const newCombo: ComboData = {
    inputs: [...combo.inputs],
    output: combo.output,
  }

  if (target === 'input') {
    newCombo.inputs[inputIndex] = code
  }
  else {
    newCombo.output = code
  }

  const newCombos = [...combosData.value]
  newCombos[comboIndex] = newCombo
  combosData.value = newCombos

  clearSelectedProps()
}

function selectKeycode(comboIndex: number, inputIndex: number, target: 'input' | 'output') {
  return currKey.value?.[0] === comboIndex && currKey.value?.[1] === inputIndex && currKey.value?.[2] === target
    ? currKey.value[3]
    : null
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
          v-for="(combo, comboIndex) in combosData"
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
                :key-info="toDisplayKey(inputKey)"
                :highlight="selectKeycode(comboIndex, inputIndex, 'input')"
                @click.stop="setKeycode($event, comboIndex, inputIndex, 'input')"
              />
            </template>
          </div>
          <span class="px-2">→</span>
          <Key
            :key-info="toDisplayKey(combo.output)"
            :highlight="selectKeycode(comboIndex, 0, 'output')"
            @click.stop="setKeycode($event, comboIndex, 0, 'output')"
          />
        </div>
      </div>
    </ScrollPanel>
    <MapperPanel @set-key="handleSetKey" />
  </div>
</template>
