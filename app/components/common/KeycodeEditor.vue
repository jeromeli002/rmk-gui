<script lang="ts" setup>
import { BASIC_KEYCODES, buildKeycodeName, filterKeycodeNames, findKeycodeByCode, findKeycodeByName } from '~/utils/qmkKeycodes'

const props = defineProps<{
  visible: boolean
  keyInfo: Key | null
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'save', keycode: number): void
}>()

const keyboardStore = useKeyboardStore()

const keycodeInput = ref('')
const hexInput = ref('')
const keyNameInput = ref('')
const isInitializing = ref(false) // 初始化标志
const skipModifiersWatch = ref(false) // 跳过 modifiers watch 的标志

const modifiers = ref({
  ctrl: false,
  shift: false,
  alt: false,
  gui: false,
})

const isRightModifier = ref(false)

const MODIFIER_CTRL = 0x0100
const MODIFIER_SHIFT = 0x0200
const MODIFIER_ALT = 0x0400
const MODIFIER_GUI = 0x0800
const MODIFIER_RCTRL = 0x1100
const MODIFIER_RSHIFT = 0x1200
const MODIFIER_RALT = 0x1400
const MODIFIER_RGUI = 0x1800

const currentKeycode = computed(() => {
  const code = Number.parseInt(keycodeInput.value) || 0
  return code
})

const currentHex = computed(() => {
  return `0x${currentKeycode.value.toString(16).toUpperCase().padStart(4, '0')}`
})

const previewSymbol = computed(() => {
  const customKeycodes = keyboardStore.vialJson?.customKeycodes || []
  const code = currentKeycode.value

  // 检查是否是user键
  if (code >= 0x0840 && code <= 0x085F) {
    const index = code - 0x0840
    if (index < customKeycodes.length) {
      // 返回shortName
      return [null, customKeycodes[index].shortName]
    }
  }

  return keyToLable(code)
})

const previewRmk = computed(() => {
  return keyToRmk(currentKeycode.value)
})

// 解析键码名称为分层显示
const parsedKeyDisplay = computed(() => {
  const code = currentKeycode.value
  const baseKeycode = code & 0x00FF
  const isRight = !!(code & 0x1000)

  // 先尝试查找完整键码名称（针对预定义的键码如 LCTL_T、MO 等）
  const keycodeEntry = findKeycodeByCode(code)
  if (keycodeEntry) {
    // 如果是预定义的完整键码（如 LCTL_T(kc)），直接解析名称
    const name = keycodeEntry.name
    // 提取修饰键部分和基础键部分
    const match = name.match(/^([A-Z0-9_]+)\(([^)]+)\)$/)
    if (match) {
      const modPart = match[1]
      const keyPart = match[2]
      return {
        modifiers: [modPart],
        base: keyPart,
        hasModifiers: true,
      }
    }
    // 如果没有括号，直接返回（如 KC_A、MO(1) 等）
    return {
      modifiers: [],
      base: name,
      hasModifiers: false,
    }
  }

  // 对于组合键码（如 LCTL(KC_C)），根据修饰键状态构建显示
  // 查找基础键码名称
  const baseKey = BASIC_KEYCODES.find(kc => kc.code === baseKeycode)
  const baseName = baseKey?.name || ''

  // 构建修饰键显示
  const modList: string[] = []
  if (modifiers.value.ctrl)
    modList.push(isRight ? 'RCTL' : 'LCTL')
  if (modifiers.value.shift)
    modList.push(isRight ? 'RSFT' : 'LSFT')
  if (modifiers.value.alt)
    modList.push(isRight ? 'RALT' : 'LALT')
  if (modifiers.value.gui)
    modList.push(isRight ? 'RGUI' : 'LGUI')

  return {
    modifiers: modList,
    base: baseName, // 保留 KC_前缀
    hasModifiers: modList.length > 0,
  }
})

// 构建完整的键码名称（用于输入框显示）
const fullKeyName = computed(() => {
  const code = currentKeycode.value
  const baseKeycode = code & 0x00FF
  const isRight = !!(code & 0x1000)

  // 先尝试查找完整键码名称
  const keycodeEntry = findKeycodeByCode(code)
  if (keycodeEntry) {
    return keycodeEntry.name
  }

  // 对于组合键码，构建如 LCTL(KC_C) 这样的格式
  const baseKey = BASIC_KEYCODES.find(kc => kc.code === baseKeycode)
  const baseName = baseKey?.name || ''

  const modParts: string[] = []
  if (modifiers.value.ctrl)
    modParts.push(isRight ? 'RCTL' : 'LCTL')
  if (modifiers.value.shift)
    modParts.push(isRight ? 'RSFT' : 'LSFT')
  if (modifiers.value.alt)
    modParts.push(isRight ? 'RALT' : 'LALT')
  if (modifiers.value.gui)
    modParts.push(isRight ? 'RGUI' : 'LGUI')

  if (modParts.length === 0) {
    return baseName
  }

  // 组合成 LCTL(KC_C) 这样的格式
  const modPrefix = modParts.join('+')
  return `${modPrefix}(${baseName})`
})

const isKeyNameValid = computed(() => {
  return keyNameInput.value && findKeycodeByName(keyNameInput.value)?.code !== 0
})

const filteredKeyNames = computed(() => {
  const inputValue = keyNameInput.value
  if (!inputValue)
    return []

  return filterKeycodeNames(inputValue)
})

const showSuggestions = ref(false)
const isInputFocused = ref(false)

function selectSuggestion(name: string) {
  keyNameInput.value = name
  isInputFocused.value = false
  showSuggestions.value = false
}

// 键码名称到键码的映射
function keyNameToCode(name: string): number {
  // 简单实现，实际需要根据keyCodeMap来查找
  // 这里只是一个示例，需要根据实际的keyCodeMap来实现
  const nameToCodeMap: Record<string, number> = {
    KC_A: 0x04,
    KC_B: 0x05,
    KC_C: 0x06,
    KC_D: 0x07,
    KC_E: 0x08,
    KC_F: 0x09,
    KC_G: 0x0A,
    KC_H: 0x0B,
    KC_I: 0x0C,
    KC_J: 0x0D,
    KC_K: 0x0E,
    KC_L: 0x0F,
    KC_M: 0x10,
    KC_N: 0x11,
    KC_O: 0x12,
    KC_P: 0x13,
    KC_Q: 0x14,
    KC_R: 0x15,
    KC_S: 0x16,
    KC_T: 0x17,
    KC_U: 0x18,
    KC_V: 0x19,
    KC_W: 0x1A,
    KC_X: 0x1B,
    KC_Y: 0x1C,
    KC_Z: 0x1D,
    KC_1: 0x1E,
    KC_2: 0x1F,
    KC_3: 0x20,
    KC_4: 0x21,
    KC_5: 0x22,
    KC_6: 0x23,
    KC_7: 0x24,
    KC_8: 0x25,
    KC_9: 0x26,
    KC_0: 0x27,
    KC_ENTER: 0x28,
    KC_ESCAPE: 0x29,
    KC_BACKSPACE: 0x2A,
    KC_TAB: 0x2B,
    KC_SPACE: 0x2C,
    KC_MINUS: 0x2D,
    KC_EQUAL: 0x2E,
    KC_LEFTBRACE: 0x2F,
    KC_RIGHTBRACE: 0x30,
    KC_BACKSLASH: 0x31,
    KC_NONUSBSLASH: 0x32,
    KC_SEMICOLON: 0x33,
    KC_APOSTROPHE: 0x34,
    KC_GRAVE: 0x35,
    KC_COMMA: 0x36,
    KC_DOT: 0x37,
    KC_SLASH: 0x38,
    KC_CAPSLOCK: 0x39,
    KC_F1: 0x3A,
    KC_F2: 0x3B,
    KC_F3: 0x3C,
    KC_F4: 0x3D,
    KC_F5: 0x3E,
    KC_F6: 0x3F,
    KC_F7: 0x40,
    KC_F8: 0x41,
    KC_F9: 0x42,
    KC_F10: 0x43,
    KC_F11: 0x44,
    KC_F12: 0x45,
    KC_PSCREEN: 0x46,
    KC_SCROLLLOCK: 0x47,
    KC_PAUSE: 0x48,
    KC_INSERT: 0x49,
    KC_HOME: 0x4A,
    KC_PAGEUP: 0x4B,
    KC_DELETE: 0x4C,
    KC_END: 0x4D,
    KC_PAGEDOWN: 0x4E,
    KC_RIGHT: 0x4F,
    KC_LEFT: 0x50,
    KC_DOWN: 0x51,
    KC_UP: 0x52,
    KC_NUMLOCK: 0x53,
    KC_KP_SLASH: 0x54,
    KC_KP_ASTERISK: 0x55,
    KC_KP_MINUS: 0x56,
    KC_KP_PLUS: 0x57,
    KC_KP_ENTER: 0x58,
    KC_KP_1: 0x59,
    KC_KP_2: 0x5A,
    KC_KP_3: 0x5B,
    KC_KP_4: 0x5C,
    KC_KP_5: 0x5D,
    KC_KP_6: 0x5E,
    KC_KP_7: 0x5F,
    KC_KP_8: 0x60,
    KC_KP_9: 0x61,
    KC_KP_0: 0x62,
    KC_KP_DOT: 0x63,
    KC_NONUSB_EXTRA: 0x64,
    KC_APPLICATION: 0x65,
    KC_POWER: 0x66,
    KC_KP_EQUAL: 0x67,
    KC_F13: 0x68,
    KC_F14: 0x69,
    KC_F15: 0x6A,
    KC_F16: 0x6B,
    KC_F17: 0x6C,
    KC_F18: 0x6D,
    KC_F19: 0x6E,
    KC_F20: 0x6F,
    KC_F21: 0x70,
    KC_F22: 0x71,
    KC_F23: 0x72,
    KC_F24: 0x73,
    KC_EXECUTE: 0x74,
    KC_HELP: 0x75,
    KC_MENU: 0x76,
    KC_SELECT: 0x77,
    KC_STOP: 0x78,
    KC_AGAIN: 0x79,
    KC_UNDO: 0x7A,
    KC_CUT: 0x7B,
    KC_COPY: 0x7C,
    KC_PASTE: 0x7D,
    KC_FIND: 0x7E,
    KC_MUTE: 0x7F,
    KC_VOLUMEUP: 0x80,
    KC_VOLUMEDOWN: 0x81,
    KC_LOCKING_CAPSLOCK: 0x82,
    KC_LOCKING_NUMLOCK: 0x83,
    KC_LOCKING_SCROLLLOCK: 0x84,
    KC_KP_COMMA: 0x85,
    KC_KP_EQUAL_AS400: 0x86,
    KC_INT1: 0x87,
    KC_INT2: 0x88,
    KC_INT3: 0x89,
    KC_INT4: 0x8A,
    KC_INT5: 0x8B,
    KC_INT6: 0x8C,
    KC_INT7: 0x8D,
    KC_INT8: 0x8E,
    KC_INT9: 0x8F,
    KC_LANG1: 0x90,
    KC_LANG2: 0x91,
    KC_LANG3: 0x92,
    KC_LANG4: 0x93,
    KC_LANG5: 0x94,
    KC_LANG6: 0x95,
    KC_LANG7: 0x96,
    KC_LANG8: 0x97,
    KC_LANG9: 0x98,
    KC_ALT_ERASE: 0x99,
    KC_SYSREQ: 0x9A,
    KC_CANCEL: 0x9B,
    KC_CLEAR: 0x9C,
    KC_PRIOR: 0x9D,
    KC_RETURN: 0x9E,
    KC_SEPARATOR: 0x9F,
    KC_OUT: 0xA0,
    KC_OPER: 0xA1,
    KC_CLEARAGAIN: 0xA2,
    KC_CRSEL: 0xA3,
    KC_EXSEL: 0xA4,
    KC_LEFTCTRL: 0xE0,
    KC_LEFTSHIFT: 0xE1,
    KC_LEFTALT: 0xE2,
    KC_LEFTGUI: 0xE3,
    KC_RIGHTCTRL: 0xE4,
    KC_RIGHTSHIFT: 0xE5,
    KC_RIGHTALT: 0xE6,
    KC_RIGHTGUI: 0xE7,
  }

  // 处理用户输入的单个字符，自动添加KC_前缀
  if (name.length === 1 && /^[a-z0-9]$/i.test(name)) {
    return nameToCodeMap[`KC_${name.toUpperCase()}`] || 0
  }

  return nameToCodeMap[name.toUpperCase()] || 0
}

// 键码到键码名称的映射
function codeToKeyName(code: number): string {
  // 简单实现，实际需要根据keyCodeMap来查找
  // 这里只是一个示例，需要根据实际的keyCodeMap来实现
  const codeToNameMap: Record<number, string> = {
    0x04: 'KC_A',
    0x05: 'KC_B',
    0x06: 'KC_C',
    0x07: 'KC_D',
    0x08: 'KC_E',
    0x09: 'KC_F',
    0x0A: 'KC_G',
    0x0B: 'KC_H',
    0x0C: 'KC_I',
    0x0D: 'KC_J',
    0x0E: 'KC_K',
    0x0F: 'KC_L',
    0x10: 'KC_M',
    0x11: 'KC_N',
    0x12: 'KC_O',
    0x13: 'KC_P',
    0x14: 'KC_Q',
    0x15: 'KC_R',
    0x16: 'KC_S',
    0x17: 'KC_T',
    0x18: 'KC_U',
    0x19: 'KC_V',
    0x1A: 'KC_W',
    0x1B: 'KC_X',
    0x1C: 'KC_Y',
    0x1D: 'KC_Z',
    0x1E: 'KC_1',
    0x1F: 'KC_2',
    0x20: 'KC_3',
    0x21: 'KC_4',
    0x22: 'KC_5',
    0x23: 'KC_6',
    0x24: 'KC_7',
    0x25: 'KC_8',
    0x26: 'KC_9',
    0x27: 'KC_0',
    0x28: 'KC_ENTER',
    0x29: 'KC_ESCAPE',
    0x2A: 'KC_BACKSPACE',
    0x2B: 'KC_TAB',
    0x2C: 'KC_SPACE',
    0x2D: 'KC_MINUS',
    0x2E: 'KC_EQUAL',
    0x2F: 'KC_LEFTBRACE',
    0x30: 'KC_RIGHTBRACE',
    0x31: 'KC_BACKSLASH',
    0x32: 'KC_NONUSBSLASH',
    0x33: 'KC_SEMICOLON',
    0x34: 'KC_APOSTROPHE',
    0x35: 'KC_GRAVE',
    0x36: 'KC_COMMA',
    0x37: 'KC_DOT',
    0x38: 'KC_SLASH',
    0x39: 'KC_CAPSLOCK',
    0x3A: 'KC_F1',
    0x3B: 'KC_F2',
    0x3C: 'KC_F3',
    0x3D: 'KC_F4',
    0x3E: 'KC_F5',
    0x3F: 'KC_F6',
    0x40: 'KC_F7',
    0x41: 'KC_F8',
    0x42: 'KC_F9',
    0x43: 'KC_F10',
    0x44: 'KC_F11',
    0x45: 'KC_F12',
    0x46: 'KC_PSCREEN',
    0x47: 'KC_SCROLLLOCK',
    0x48: 'KC_PAUSE',
    0x49: 'KC_INSERT',
    0x4A: 'KC_HOME',
    0x4B: 'KC_PAGEUP',
    0x4C: 'KC_DELETE',
    0x4D: 'KC_END',
    0x4E: 'KC_PAGEDOWN',
    0x4F: 'KC_RIGHT',
    0x50: 'KC_LEFT',
    0x51: 'KC_DOWN',
    0x52: 'KC_UP',
    0x53: 'KC_NUMLOCK',
    0x54: 'KC_KP_SLASH',
    0x55: 'KC_KP_ASTERISK',
    0x56: 'KC_KP_MINUS',
    0x57: 'KC_KP_PLUS',
    0x58: 'KC_KP_ENTER',
    0x59: 'KC_KP_1',
    0x5A: 'KC_KP_2',
    0x5B: 'KC_KP_3',
    0x5C: 'KC_KP_4',
    0x5D: 'KC_KP_5',
    0x5E: 'KC_KP_6',
    0x5F: 'KC_KP_7',
    0x60: 'KC_KP_8',
    0x61: 'KC_KP_9',
    0x62: 'KC_KP_0',
    0x63: 'KC_KP_DOT',
    0x64: 'KC_NONUSB_EXTRA',
    0x65: 'KC_APPLICATION',
    0x66: 'KC_POWER',
    0x67: 'KC_KP_EQUAL',
    0x68: 'KC_F13',
    0x69: 'KC_F14',
    0x6A: 'KC_F15',
    0x6B: 'KC_F16',
    0x6C: 'KC_F17',
    0x6D: 'KC_F18',
    0x6E: 'KC_F19',
    0x6F: 'KC_F20',
    0x70: 'KC_F21',
    0x71: 'KC_F22',
    0x72: 'KC_F23',
    0x73: 'KC_F24',
    0x74: 'KC_EXECUTE',
    0x75: 'KC_HELP',
    0x76: 'KC_MENU',
    0x77: 'KC_SELECT',
    0x78: 'KC_STOP',
    0x79: 'KC_AGAIN',
    0x7A: 'KC_UNDO',
    0x7B: 'KC_CUT',
    0x7C: 'KC_COPY',
    0x7D: 'KC_PASTE',
    0x7E: 'KC_FIND',
    0x7F: 'KC_MUTE',
    0x80: 'KC_VOLUMEUP',
    0x81: 'KC_VOLUMEDOWN',
    0x82: 'KC_LOCKING_CAPSLOCK',
    0x83: 'KC_LOCKING_NUMLOCK',
    0x84: 'KC_LOCKING_SCROLLLOCK',
    0x85: 'KC_KP_COMMA',
    0x86: 'KC_KP_EQUAL_AS400',
    0x87: 'KC_INT1',
    0x88: 'KC_INT2',
    0x89: 'KC_INT3',
    0x8A: 'KC_INT4',
    0x8B: 'KC_INT5',
    0x8C: 'KC_INT6',
    0x8D: 'KC_INT7',
    0x8E: 'KC_INT8',
    0x8F: 'KC_INT9',
    0x90: 'KC_LANG1',
    0x91: 'KC_LANG2',
    0x92: 'KC_LANG3',
    0x93: 'KC_LANG4',
    0x94: 'KC_LANG5',
    0x95: 'KC_LANG6',
    0x96: 'KC_LANG7',
    0x97: 'KC_LANG8',
    0x98: 'KC_LANG9',
    0x99: 'KC_ALT_ERASE',
    0x9A: 'KC_SYSREQ',
    0x9B: 'KC_CANCEL',
    0x9C: 'KC_CLEAR',
    0x9D: 'KC_PRIOR',
    0x9E: 'KC_RETURN',
    0x9F: 'KC_SEPARATOR',
    0xA0: 'KC_OUT',
    0xA1: 'KC_OPER',
    0xA2: 'KC_CLEARAGAIN',
    0xA3: 'KC_CRSEL',
    0xA4: 'KC_EXSEL',
    0xE0: 'KC_LEFTCTRL',
    0xE1: 'KC_LEFTSHIFT',
    0xE2: 'KC_LEFTALT',
    0xE3: 'KC_LEFTGUI',
    0xE4: 'KC_RIGHTCTRL',
    0xE5: 'KC_RIGHTSHIFT',
    0xE6: 'KC_RIGHTALT',
    0xE7: 'KC_RIGHTGUI',
  }

  return codeToNameMap[code] || ''
}

watch(() => props.visible, (visible) => {
  if (visible && props.keyInfo) {
    isInitializing.value = true // 开始初始化
    skipModifiersWatch.value = true // 同时跳过 modifiers watch

    const code = props.keyInfo.info.code

    // 第一步：设置所有基础状态
    keycodeInput.value = code.toString()
    hexInput.value = `0x${code.toString(16).toUpperCase().padStart(4, '0')}`

    // 检查是否是右修饰键（第 12 位为 1 表示右修饰键）
    isRightModifier.value = !!(code & 0x1000)

    // 提取修饰键状态 - 这是关键，确保正确读取所有修饰键
    modifiers.value.ctrl = !!(code & MODIFIER_CTRL)
    modifiers.value.shift = !!(code & MODIFIER_SHIFT)
    modifiers.value.alt = !!(code & MODIFIER_ALT)
    modifiers.value.gui = !!(code & MODIFIER_GUI)

    // 第二步：查找并设置键码名称（使用完整格式如 LCTL(KC_C)）
    const keycodeEntry = findKeycodeByCode(code)
    if (keycodeEntry) {
      keyNameInput.value = keycodeEntry.name
    }
    else {
      // 如果不是预定义的键码，使用完整格式名称
      const baseKeycode = code & 0x00FF
      const baseKey = BASIC_KEYCODES.find(kc => kc.code === baseKeycode)
      const baseName = baseKey?.name || ''

      // 构建完整格式名称
      const modParts: string[] = []
      if (modifiers.value.ctrl)
        modParts.push(isRightModifier.value ? 'RCTL' : 'LCTL')
      if (modifiers.value.shift)
        modParts.push(isRightModifier.value ? 'RSFT' : 'LSFT')
      if (modifiers.value.alt)
        modParts.push(isRightModifier.value ? 'RALT' : 'LALT')
      if (modifiers.value.gui)
        modParts.push(isRightModifier.value ? 'RGUI' : 'LGUI')

      if (modParts.length === 0) {
        keyNameInput.value = baseName
      }
      else {
        const modPrefix = modParts.join('+')
        keyNameInput.value = `${modPrefix}(${baseName})`
      }
    }

    console.log('KeycodeEditor initialized with:', {
      code,
      hex: `0x${code.toString(16).toUpperCase().padStart(4, '0')}`,
      keyName: keyNameInput.value,
      isRight: isRightModifier.value,
      modifiers: { ...modifiers.value },
    })

    // 第三步：延迟重置标志，确保所有状态都已同步
    setTimeout(() => {
      skipModifiersWatch.value = false
      isInitializing.value = false
      console.log('Initialization completed, watches enabled')
    }, 10)
  }
})

watch(keycodeInput, (val) => {
  // 初始化期间或被标记跳过时不处理
  if (isInitializing.value || skipModifiersWatch.value) {
    console.log('keycodeInput watch skipped:', {
      isInitializing: isInitializing.value,
      skipModifiersWatch: skipModifiersWatch.value,
    })
    return
  }

  const num = Number.parseInt(val) || 0
  hexInput.value = `0x${num.toString(16).toUpperCase().padStart(4, '0')}`
  const baseKeycode = num & 0x00FF
  // 使用完整键码映射查找名称
  const keycodeEntry = findKeycodeByCode(num)
  if (keycodeEntry) {
    keyNameInput.value = keycodeEntry.name
  }
  else {
    keyNameInput.value = BASIC_KEYCODES.find(kc => kc.code === baseKeycode)?.name || ''
  }
  // 检查是否是右修饰键（第 12 位为 1 表示右修饰键）
  isRightModifier.value = !!(num & 0x1000)

  // 设置标志，防止触发 modifiers watch
  skipModifiersWatch.value = true

  // 提取修饰键状态
  modifiers.value.ctrl = !!(num & MODIFIER_CTRL)
  modifiers.value.shift = !!(num & MODIFIER_SHIFT)
  modifiers.value.alt = !!(num & MODIFIER_ALT)
  modifiers.value.gui = !!(num & MODIFIER_GUI)

  // 下一个 tick 再重置标志
  setTimeout(() => {
    skipModifiersWatch.value = false
  }, 0)

  console.log('keycodeInput changed:', {
    num,
    keyName: keyNameInput.value,
    modifiers: { ...modifiers.value },
  })
})

watch(hexInput, (val) => {
  // 初始化期间或被标记跳过时不处理
  if (isInitializing.value || skipModifiersWatch.value) {
    console.log('hexInput watch skipped:', {
      isInitializing: isInitializing.value,
      skipModifiersWatch: skipModifiersWatch.value,
    })
    return
  }

  const hex = val.replace(/^0x/i, '')
  const num = Number.parseInt(hex, 16) || 0
  keycodeInput.value = num.toString()
  const baseKeycode = num & 0x00FF
  // 使用完整键码映射查找名称
  const keycodeEntry = findKeycodeByCode(num)
  if (keycodeEntry) {
    keyNameInput.value = keycodeEntry.name
  }
  else {
    keyNameInput.value = BASIC_KEYCODES.find(kc => kc.code === baseKeycode)?.name || ''
  }
  // 检查是否是右修饰键（第 12 位为 1 表示右修饰键）
  isRightModifier.value = !!(num & 0x1000)

  // 设置标志，防止触发 modifiers watch
  skipModifiersWatch.value = true

  // 提取修饰键状态
  modifiers.value.ctrl = !!(num & MODIFIER_CTRL)
  modifiers.value.shift = !!(num & MODIFIER_SHIFT)
  modifiers.value.alt = !!(num & MODIFIER_ALT)
  modifiers.value.gui = !!(num & MODIFIER_GUI)

  // 下一个 tick 再重置标志
  setTimeout(() => {
    skipModifiersWatch.value = false
  }, 0)
})

watch(keyNameInput, (val) => {
  // 初始化期间或被标记跳过时不处理
  if (isInitializing.value || skipModifiersWatch.value) {
    console.log('keyNameInput watch skipped:', {
      isInitializing: isInitializing.value,
      skipModifiersWatch: skipModifiersWatch.value,
    })
    return
  }

  if (!val) {
    keycodeInput.value = '0'
    hexInput.value = '0x0000'
    return
  }

  // 尝试查找完整的键码名称
  const keycodeEntry = findKeycodeByName(val)
  if (keycodeEntry) {
    keycodeInput.value = keycodeEntry.code.toString()
    hexInput.value = `0x${keycodeEntry.code.toString(16).toUpperCase().padStart(4, '0')}`
    // 更新修饰键状态
    const code = keycodeEntry.code
    isRightModifier.value = !!(code & 0x1000)
    modifiers.value.ctrl = !!(code & MODIFIER_CTRL)
    modifiers.value.shift = !!(code & MODIFIER_SHIFT)
    modifiers.value.alt = !!(code & MODIFIER_ALT)
    modifiers.value.gui = !!(code & MODIFIER_GUI)
  }
  else {
    // 如果不是预定义的键码，使用基础键码映射
    const baseCode = keyNameToCode(val)
    if (baseCode !== 0) {
      // 保留当前的修饰键状态
      const currentModifiers = Number.parseInt(keycodeInput.value) || 0
      const isRight = !!(currentModifiers & 0x1000)
      let newCode = baseCode

      // 添加当前的修饰键
      if (modifiers.value.ctrl)
        newCode |= isRight ? MODIFIER_RCTRL : MODIFIER_CTRL
      if (modifiers.value.shift)
        newCode |= isRight ? MODIFIER_RSHIFT : MODIFIER_SHIFT
      if (modifiers.value.alt)
        newCode |= isRight ? MODIFIER_RALT : MODIFIER_ALT
      if (modifiers.value.gui)
        newCode |= isRight ? MODIFIER_RGUI : MODIFIER_GUI

      keycodeInput.value = newCode.toString()
      hexInput.value = `0x${newCode.toString(16).toUpperCase().padStart(4, '0')}`
    }
  }
})

watch(modifiers, (newModifiers) => {
  // 初始化期间或被标记跳过时不处理
  if (isInitializing.value || skipModifiersWatch.value) {
    console.log('modifiers watch skipped:', {
      isInitializing: isInitializing.value,
      skipModifiersWatch: skipModifiersWatch.value,
    })
    return
  }

  console.log('modifiers watch triggered:', {
    oldModifiers: modifiers.value,
    newModifiers,
    isRight: isRightModifier.value,
  })

  const baseCode = Number.parseInt(keycodeInput.value) || 0
  // 保存基础键码（清除修饰键）
  const baseKeycode = baseCode & 0x00FF
  // 清除所有修饰键
  let newCode = baseKeycode
  // 添加修饰键
  if (newModifiers.ctrl)
    newCode |= isRightModifier.value ? MODIFIER_RCTRL : MODIFIER_CTRL
  if (newModifiers.shift)
    newCode |= isRightModifier.value ? MODIFIER_RSHIFT : MODIFIER_SHIFT
  if (newModifiers.alt)
    newCode |= isRightModifier.value ? MODIFIER_RALT : MODIFIER_ALT
  if (newModifiers.gui)
    newCode |= isRightModifier.value ? MODIFIER_RGUI : MODIFIER_GUI
  // 只有当基础键码不为 0 时才更新输入框
  if (baseKeycode !== 0) {
    keycodeInput.value = newCode.toString()
    hexInput.value = `0x${newCode.toString(16).toUpperCase().padStart(4, '0')}`
    // 使用完整键码映射查找名称
    const keycodeEntry = findKeycodeByCode(newCode)
    if (keycodeEntry) {
      keyNameInput.value = keycodeEntry.name
    }
    else {
      // 构建完整格式名称如 LCTL(KC_C)
      const baseKey = BASIC_KEYCODES.find(kc => kc.code === baseKeycode)
      const baseName = baseKey?.name || ''

      const modParts: string[] = []
      if (newModifiers.ctrl)
        modParts.push(isRightModifier.value ? 'RCTL' : 'LCTL')
      if (newModifiers.shift)
        modParts.push(isRightModifier.value ? 'RSFT' : 'LSFT')
      if (newModifiers.alt)
        modParts.push(isRightModifier.value ? 'RALT' : 'LALT')
      if (newModifiers.gui)
        modParts.push(isRightModifier.value ? 'RGUI' : 'LGUI')

      if (modParts.length === 0) {
        keyNameInput.value = baseName
      }
      else {
        const modPrefix = modParts.join('+')
        keyNameInput.value = `${modPrefix}(${baseName})`
      }
    }
  }

  console.log('modifiers watch finished:', {
    newCode,
    keycodeInput: keycodeInput.value,
  })
}, { deep: true })

watch(isRightModifier, (newVal) => {
  // 初始化期间不处理
  if (isInitializing.value)
    return

  console.log('isRightModifier changed:', {
    oldVal: !newVal,
    newVal,
  })

  // 当左右修饰键切换时，更新修饰键状态
  const baseCode = Number.parseInt(keycodeInput.value) || 0
  // 保存基础键码
  const baseKeycode = baseCode & 0x00FF
  // 清除所有修饰键
  let newCode = baseKeycode
  // 添加修饰键
  if (modifiers.value.ctrl)
    newCode |= isRightModifier.value ? MODIFIER_RCTRL : MODIFIER_CTRL
  if (modifiers.value.shift)
    newCode |= isRightModifier.value ? MODIFIER_RSHIFT : MODIFIER_SHIFT
  if (modifiers.value.alt)
    newCode |= isRightModifier.value ? MODIFIER_RALT : MODIFIER_ALT
  if (modifiers.value.gui)
    newCode |= isRightModifier.value ? MODIFIER_RGUI : MODIFIER_GUI
  // 只有当基础键码不为 0 时才更新输入框
  if (baseKeycode !== 0) {
    keycodeInput.value = newCode.toString()
    hexInput.value = `0x${newCode.toString(16).toUpperCase().padStart(4, '0')}`
    // 使用完整键码映射查找名称
    const keycodeEntry = findKeycodeByCode(newCode)
    if (keycodeEntry) {
      keyNameInput.value = keycodeEntry.name
    }
    else {
      keyNameInput.value = buildKeycodeName(baseKeycode, modifiers.value, isRightModifier.value)
    }
  }
})

function handleSave() {
  emit('save', currentKeycode.value)
  emit('update:visible', false)
}

function handleClose() {
  emit('update:visible', false)
}

function toggleModifier(key: keyof typeof modifiers.value) {
  modifiers.value[key] = !modifiers.value[key]
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :closable="false"
    :style="{ width: '600px' }"
    pt:root:class="!border-0 !bg-transparent"
    pt:mask:class="backdrop-blur-sm"
    @update:visible="handleClose"
  >
    <div class="rounded-lg border border-surface-300 bg-surface-0 p-5 shadow-xl dark:border-surface-600 dark:bg-surface-800">
      <!-- 标题 -->
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-surface-800 dark:text-surface-100">
          {{ $t('dialog.editKeycode') }}
        </h3>
        <button
          class="flex size-8 items-center justify-center rounded-full text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-surface-200"
          @click="handleClose"
        >
          <Icon name="tabler:x" class="text-lg" />
        </button>
      </div>

      <!-- 输入区域 -->
      <div class="mb-5 space-y-4">
        <div class="flex justify-center gap-4">
          <div class="w-[120px]">
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">
              {{ $t('dialog.keycode') }}
            </label>
            <InputNumber
              v-model="keycodeInput"
              class="w-full"
              style="width: 120px;"
              input-class="!text-center"
              :placeholder="$t('dialog.placeholder.keycode')"
            />
          </div>
          <div class="w-[120px]">
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">
              {{ $t('dialog.hex') }}
            </label>
            <InputText
              v-model="hexInput"
              class="w-full"
              style="width: 120px;"
              input-class="!text-center !font-mono"
              :placeholder="$t('dialog.placeholder.hex')"
            />
          </div>
          <div class="w-[250px]">
            <label class="mb-1.5 block text-xs font-medium text-surface-600 dark:text-surface-400">
              {{ $t('dialog.keycodeName') }}
            </label>
            <div class="relative">
              <InputText
                v-model="keyNameInput"
                class="w-full"
                style="width: 250px;"
                :class="{ 'text-surface-400 dark:text-surface-500': !isKeyNameValid && keyNameInput }"
                input-class="!text-center !font-mono !whitespace-pre-wrap !break-words"
                :placeholder="$t('dialog.placeholder.keyName')"
                :rows="2"
                @focus="isInputFocused = true; showSuggestions = true"
                @blur="isInputFocused = false; setTimeout(() => showSuggestions = false, 200)"
              />
              <div
                v-if="showSuggestions && filteredKeyNames.length > 0 && isInputFocused"
                class="absolute inset-x-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-md border border-surface-300 bg-white shadow-lg dark:border-surface-600 dark:bg-surface-800"
              >
                <div
                  v-for="name in filteredKeyNames"
                  :key="name"
                  class="cursor-pointer px-3 py-1.5 font-mono text-sm text-surface-700 hover:bg-primary hover:text-white dark:text-surface-200"
                  @mousedown="selectSuggestion(name)"
                >
                  {{ name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 修饰键 -->
      <div class="mb-5">
        <div class="mb-2 flex items-center justify-between">
          <label class="block text-xs font-medium text-surface-600 dark:text-surface-400">
            {{ $t('dialog.modifiers') }}
          </label>
          <div class="flex items-center gap-2">
            <span class="text-xs text-surface-500 dark:text-surface-400">{{ $t('dialog.left') }}</span>
            <button
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              :class="isRightModifier ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'"
              @click="isRightModifier = !isRightModifier"
            >
              <span
                class="inline-block size-4 rounded-full bg-white transition-transform"
                :class="isRightModifier ? 'translate-x-5' : 'translate-x-1'"
              />
            </button>
            <span class="text-xs text-surface-500 dark:text-surface-400">{{ $t('dialog.right') }}</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-3">
          <button
            class="relative flex flex-col items-center justify-center gap-1 rounded-md border-2 px-2 py-3 transition-all"
            :class="modifiers.ctrl
              ? 'border-primary bg-primary text-white shadow-md dark:border-primary dark:bg-primary dark:text-white'
              : 'border-surface-400 bg-surface-200 text-surface-700 shadow-sm hover:border-surface-500 dark:border-surface-600 dark:bg-surface-700 dark:text-surface-200 dark:hover:border-surface-500'"
            @click="toggleModifier('ctrl')"
          >
            <div
              class="absolute inset-0 rounded-sm"
              :class="modifiers.ctrl ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'"
            />
            <div class="relative z-10 flex flex-col items-center gap-1">
              <Icon name="tabler:command" class="text-lg" />
              <span class="text-[10px] font-medium">{{ isRightModifier ? 'R-Ctrl' : 'L-Ctrl' }}</span>
            </div>
          </button>
          <button
            class="relative flex flex-col items-center justify-center gap-1 rounded-md border-2 px-2 py-3 transition-all"
            :class="modifiers.shift
              ? 'border-primary bg-primary text-white shadow-md dark:border-primary dark:bg-primary dark:text-white'
              : 'border-surface-400 bg-surface-200 text-surface-700 shadow-sm hover:border-surface-500 dark:border-surface-600 dark:bg-surface-700 dark:text-surface-200 dark:hover:border-surface-500'"
            @click="toggleModifier('shift')"
          >
            <div
              class="absolute inset-0 rounded-sm"
              :class="modifiers.shift ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'"
            />
            <div class="relative z-10 flex flex-col items-center gap-1">
              <Icon name="tabler:arrow-big-up" class="text-lg" />
              <span class="text-[10px] font-medium">{{ isRightModifier ? 'R-Shift' : 'L-Shift' }}</span>
            </div>
          </button>
          <button
            class="relative flex flex-col items-center justify-center gap-1 rounded-md border-2 px-2 py-3 transition-all"
            :class="modifiers.alt
              ? 'border-primary bg-primary text-white shadow-md dark:border-primary dark:bg-primary dark:text-white'
              : 'border-surface-400 bg-surface-200 text-surface-700 shadow-sm hover:border-surface-500 dark:border-surface-600 dark:bg-surface-700 dark:text-surface-200 dark:hover:border-surface-500'"
            @click="toggleModifier('alt')"
          >
            <div
              class="absolute inset-0 rounded-sm"
              :class="modifiers.alt ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'"
            />
            <div class="relative z-10 flex flex-col items-center gap-1">
              <Icon name="tabler:alt" class="text-lg" />
              <span class="text-[10px] font-medium">{{ isRightModifier ? 'R-Alt' : 'L-Alt' }}</span>
            </div>
          </button>
          <button
            class="relative flex flex-col items-center justify-center gap-1 rounded-md border-2 px-2 py-3 transition-all"
            :class="modifiers.gui
              ? 'border-primary bg-primary text-white shadow-md dark:border-primary dark:bg-primary dark:text-white'
              : 'border-surface-400 bg-surface-200 text-surface-700 shadow-sm hover:border-surface-500 dark:border-surface-600 dark:bg-surface-700 dark:text-surface-200 dark:hover:border-surface-500'"
            @click="toggleModifier('gui')"
          >
            <div
              class="absolute inset-0 rounded-sm"
              :class="modifiers.gui ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'"
            />
            <div class="relative z-10 flex flex-col items-center gap-1">
              <Icon name="tabler:brand-windows" class="text-lg" />
              <span class="text-[10px] font-medium">{{ isRightModifier ? 'R-Win' : 'L-Win' }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 预览 -->
      <div class="mb-5 rounded-md border border-surface-200 bg-surface-50 p-3 dark:border-surface-700 dark:bg-surface-900">
        <div class="mb-2 text-xs text-surface-500 dark:text-surface-400">
          {{ $t('dialog.preview') }}
        </div>
        <!-- 按键显示区域 -->
        <div class="flex items-center justify-center">
          <div
            class="relative flex size-20 flex-col items-center justify-center rounded-lg border-2 border-surface-400 bg-gradient-to-b from-surface-100 to-surface-200 p-1 shadow-md dark:border-surface-600 dark:from-surface-700 dark:to-surface-800"
          >
            <!-- 修饰键区域（上半部分） -->
            <div
              v-if="parsedKeyDisplay.hasModifiers"
              class="flex w-full flex-col items-center justify-center border-b border-surface-300 pb-1 dark:border-surface-600"
            >
              <div
                v-for="(mod, idx) in parsedKeyDisplay.modifiers"
                :key="idx"
                class="text-[9px] font-bold uppercase tracking-tighter text-primary"
              >
                {{ mod }}
              </div>
            </div>
            <!-- 基础键区域（下半部分） -->
            <div
              class="flex flex-1 items-center justify-center pt-0.5"
              :class="{ 'h-full': !parsedKeyDisplay.hasModifiers }"
            >
              <span class="text-lg font-bold text-surface-800 dark:text-surface-100">
                {{ parsedKeyDisplay.base || '-' }}
              </span>
            </div>
          </div>
        </div>
        <!-- 键码信息 -->
        <div class="mt-3 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-surface-500 dark:text-surface-400">
          <span>{{ $t('dialog.keycode') }}:</span>
          <span class="rounded bg-surface-200 px-2 py-0.5 dark:bg-surface-700">{{ currentKeycode }}</span>
          <span class="rounded bg-surface-200 px-2 py-0.5 font-mono dark:bg-surface-700">{{ currentHex }}</span>
          <span v-if="keyNameInput" class="rounded bg-primary/10 px-2 py-0.5 text-primary dark:bg-primary/20">
            {{ keyNameInput }}
          </span>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="flex justify-end gap-2">
        <Button
          severity="secondary"
          size="small"
          :label="$t('dialog.cancel')"
          @click="handleClose"
        />
        <Button
          severity="primary"
          size="small"
          :label="$t('dialog.save')"
          @click="handleSave"
        />
      </div>
    </div>
  </Dialog>
</template>
