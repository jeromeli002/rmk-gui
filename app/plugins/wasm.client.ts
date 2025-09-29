import init from '@/wasm'

export default defineNuxtPlugin(async (_nuxtApp) => {
  await init()
})
