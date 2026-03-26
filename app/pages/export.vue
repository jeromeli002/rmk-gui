<script lang="ts" setup>
const keyboardStore = useKeyboardStore()

const matrix = ref('')
const keys = computed(() => {
  const ans = []
  for (let layer = 0; layer < keyboardStore.layerCount!; layer++) {
    let keys = matrix.value
    for (const [[row, col], origin] of parseCoordinateString(matrix.value)) {
      const key = keyToRmk(keyboardStore.keymap!.get([layer, row, col].toString())!)
      keys = keys.replace(origin, key)
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
</script>

<template>
  <p>matrix</p>
  <Textarea v-model="matrix" auto-resize class="w-full" />
  <p>keymap</p>
  <Textarea v-for="k in keys" :key="k" :value="k" auto-resize class="w-full" />
</template>
