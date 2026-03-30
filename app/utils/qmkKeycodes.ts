/**
 * QMK/VIAL 完整键码映射
 * 参考：https://github.com/vial-kb/vial-gui/blob/main/src/main/python/keycodes/keycodes_v6.py
 */

export interface KeycodeEntry {
  code: number
  name: string
  desc?: string
}

/**
 * 基础键码 (Basic Keycodes)
 */
export const BASIC_KEYCODES: KeycodeEntry[] = [
  { code: 0x00, name: 'KC_NO', desc: 'No key' },
  { code: 0x01, name: 'KC_TRANSPARENT', desc: 'Transparent' },
  { code: 0x02, name: 'KC_ANY', desc: 'Any key' },
  { code: 0x04, name: 'KC_A' },
  { code: 0x05, name: 'KC_B' },
  { code: 0x06, name: 'KC_C' },
  { code: 0x07, name: 'KC_D' },
  { code: 0x08, name: 'KC_E' },
  { code: 0x09, name: 'KC_F' },
  { code: 0x0A, name: 'KC_G' },
  { code: 0x0B, name: 'KC_H' },
  { code: 0x0C, name: 'KC_I' },
  { code: 0x0D, name: 'KC_J' },
  { code: 0x0E, name: 'KC_K' },
  { code: 0x0F, name: 'KC_L' },
  { code: 0x10, name: 'KC_M' },
  { code: 0x11, name: 'KC_N' },
  { code: 0x12, name: 'KC_O' },
  { code: 0x13, name: 'KC_P' },
  { code: 0x14, name: 'KC_Q' },
  { code: 0x15, name: 'KC_R' },
  { code: 0x16, name: 'KC_S' },
  { code: 0x17, name: 'KC_T' },
  { code: 0x18, name: 'KC_U' },
  { code: 0x19, name: 'KC_V' },
  { code: 0x1A, name: 'KC_W' },
  { code: 0x1B, name: 'KC_X' },
  { code: 0x1C, name: 'KC_Y' },
  { code: 0x1D, name: 'KC_Z' },
  { code: 0x1E, name: 'KC_1' },
  { code: 0x1F, name: 'KC_2' },
  { code: 0x20, name: 'KC_3' },
  { code: 0x21, name: 'KC_4' },
  { code: 0x22, name: 'KC_5' },
  { code: 0x23, name: 'KC_6' },
  { code: 0x24, name: 'KC_7' },
  { code: 0x25, name: 'KC_8' },
  { code: 0x26, name: 'KC_9' },
  { code: 0x27, name: 'KC_0' },
  { code: 0x28, name: 'KC_ENTER' },
  { code: 0x29, name: 'KC_ESCAPE' },
  { code: 0x2A, name: 'KC_BACKSPACE' },
  { code: 0x2B, name: 'KC_TAB' },
  { code: 0x2C, name: 'KC_SPACE' },
  { code: 0x2D, name: 'KC_MINUS' },
  { code: 0x2E, name: 'KC_EQUAL' },
  { code: 0x2F, name: 'KC_LEFTBRACE' },
  { code: 0x30, name: 'KC_RIGHTBRACE' },
  { code: 0x31, name: 'KC_BACKSLASH' },
  { code: 0x32, name: 'KC_NONUSBSLASH' },
  { code: 0x33, name: 'KC_SEMICOLON' },
  { code: 0x34, name: 'KC_APOSTROPHE' },
  { code: 0x35, name: 'KC_GRAVE' },
  { code: 0x36, name: 'KC_COMMA' },
  { code: 0x37, name: 'KC_DOT' },
  { code: 0x38, name: 'KC_SLASH' },
  { code: 0x39, name: 'KC_CAPSLOCK' },
  { code: 0x3A, name: 'KC_F1' },
  { code: 0x3B, name: 'KC_F2' },
  { code: 0x3C, name: 'KC_F3' },
  { code: 0x3D, name: 'KC_F4' },
  { code: 0x3E, name: 'KC_F5' },
  { code: 0x3F, name: 'KC_F6' },
  { code: 0x40, name: 'KC_F7' },
  { code: 0x41, name: 'KC_F8' },
  { code: 0x42, name: 'KC_F9' },
  { code: 0x43, name: 'KC_F10' },
  { code: 0x44, name: 'KC_F11' },
  { code: 0x45, name: 'KC_F12' },
  { code: 0x46, name: 'KC_PSCREEN' },
  { code: 0x47, name: 'KC_SCROLLLOCK' },
  { code: 0x48, name: 'KC_PAUSE' },
  { code: 0x49, name: 'KC_INSERT' },
  { code: 0x4A, name: 'KC_HOME' },
  { code: 0x4B, name: 'KC_PAGEUP' },
  { code: 0x4C, name: 'KC_DELETE' },
  { code: 0x4D, name: 'KC_END' },
  { code: 0x4E, name: 'KC_PAGEDOWN' },
  { code: 0x4F, name: 'KC_RIGHT' },
  { code: 0x50, name: 'KC_LEFT' },
  { code: 0x51, name: 'KC_DOWN' },
  { code: 0x52, name: 'KC_UP' },
  { code: 0x53, name: 'KC_NUMLOCK' },
  { code: 0x54, name: 'KC_KP_SLASH' },
  { code: 0x55, name: 'KC_KP_ASTERISK' },
  { code: 0x56, name: 'KC_KP_MINUS' },
  { code: 0x57, name: 'KC_KP_PLUS' },
  { code: 0x58, name: 'KC_KP_ENTER' },
  { code: 0x59, name: 'KC_KP_1' },
  { code: 0x5A, name: 'KC_KP_2' },
  { code: 0x5B, name: 'KC_KP_3' },
  { code: 0x5C, name: 'KC_KP_4' },
  { code: 0x5D, name: 'KC_KP_5' },
  { code: 0x5E, name: 'KC_KP_6' },
  { code: 0x5F, name: 'KC_KP_7' },
  { code: 0x60, name: 'KC_KP_8' },
  { code: 0x61, name: 'KC_KP_9' },
  { code: 0x62, name: 'KC_KP_0' },
  { code: 0x63, name: 'KC_KP_DOT' },
  { code: 0x64, name: 'KC_NONUSB_EXTRA' },
  { code: 0x65, name: 'KC_APPLICATION' },
  { code: 0x66, name: 'KC_POWER' },
  { code: 0x67, name: 'KC_KP_EQUAL' },
  { code: 0x68, name: 'KC_F13' },
  { code: 0x69, name: 'KC_F14' },
  { code: 0x6A, name: 'KC_F15' },
  { code: 0x6B, name: 'KC_F16' },
  { code: 0x6C, name: 'KC_F17' },
  { code: 0x6D, name: 'KC_F18' },
  { code: 0x6E, name: 'KC_F19' },
  { code: 0x6F, name: 'KC_F20' },
  { code: 0x70, name: 'KC_F21' },
  { code: 0x71, name: 'KC_F22' },
  { code: 0x72, name: 'KC_F23' },
  { code: 0x73, name: 'KC_F24' },
  { code: 0x74, name: 'KC_EXECUTE' },
  { code: 0x75, name: 'KC_HELP' },
  { code: 0x76, name: 'KC_MENU' },
  { code: 0x77, name: 'KC_SELECT' },
  { code: 0x78, name: 'KC_STOP' },
  { code: 0x79, name: 'KC_AGAIN' },
  { code: 0x7A, name: 'KC_UNDO' },
  { code: 0x7B, name: 'KC_CUT' },
  { code: 0x7C, name: 'KC_COPY' },
  { code: 0x7D, name: 'KC_PASTE' },
  { code: 0x7E, name: 'KC_FIND' },
  { code: 0x7F, name: 'KC_MUTE' },
  { code: 0x80, name: 'KC_VOLUMEUP' },
  { code: 0x81, name: 'KC_VOLUMEDOWN' },
  { code: 0x82, name: 'KC_LOCKING_CAPSLOCK' },
  { code: 0x83, name: 'KC_LOCKING_NUMLOCK' },
  { code: 0x84, name: 'KC_LOCKING_SCROLLLOCK' },
  { code: 0x85, name: 'KC_KP_COMMA' },
  { code: 0x86, name: 'KC_KP_EQUAL_AS400' },
  { code: 0x87, name: 'KC_INT1' },
  { code: 0x88, name: 'KC_INT2' },
  { code: 0x89, name: 'KC_INT3' },
  { code: 0x8A, name: 'KC_INT4' },
  { code: 0x8B, name: 'KC_INT5' },
  { code: 0x8C, name: 'KC_INT6' },
  { code: 0x8D, name: 'KC_INT7' },
  { code: 0x8E, name: 'KC_INT8' },
  { code: 0x8F, name: 'KC_INT9' },
  { code: 0x90, name: 'KC_LANG1' },
  { code: 0x91, name: 'KC_LANG2' },
  { code: 0x92, name: 'KC_LANG3' },
  { code: 0x93, name: 'KC_LANG4' },
  { code: 0x94, name: 'KC_LANG5' },
  { code: 0x95, name: 'KC_LANG6' },
  { code: 0x96, name: 'KC_LANG7' },
  { code: 0x97, name: 'KC_LANG8' },
  { code: 0x98, name: 'KC_LANG9' },
  { code: 0x99, name: 'KC_ALT_ERASE' },
  { code: 0x9A, name: 'KC_SYSREQ' },
  { code: 0x9B, name: 'KC_CANCEL' },
  { code: 0x9C, name: 'KC_CLEAR' },
  { code: 0x9D, name: 'KC_PRIOR' },
  { code: 0x9E, name: 'KC_RETURN' },
  { code: 0x9F, name: 'KC_SEPARATOR' },
  { code: 0xA0, name: 'KC_OUT' },
  { code: 0xA1, name: 'KC_OPER' },
  { code: 0xA2, name: 'KC_CLEARAGAIN' },
  { code: 0xA3, name: 'KC_CRSEL' },
  { code: 0xA4, name: 'KC_EXSEL' },
]

/**
 * 修饰键 (Modifiers)
 */
export const MODIFIER_KEYCODES: KeycodeEntry[] = [
  { code: 0x0100, name: 'LCTL(kc)', desc: 'Left Control' },
  { code: 0x0200, name: 'LSFT(kc)', desc: 'Left Shift' },
  { code: 0x0400, name: 'LALT(kc)', desc: 'Left Alt' },
  { code: 0x0800, name: 'LGUI(kc)', desc: 'Left GUI (Windows/Command)' },
  { code: 0x1100, name: 'RCTL(kc)', desc: 'Right Control' },
  { code: 0x1200, name: 'RSFT(kc)', desc: 'Right Shift' },
  { code: 0x1400, name: 'RALT(kc)', desc: 'Right Alt' },
  { code: 0x1800, name: 'RGUI(kc)', desc: 'Right GUI (Windows/Command)' },
]

/**
 * 组合修饰键 (Combination Modifiers)
 */
export const COMBO_MODIFIER_KEYCODES: KeycodeEntry[] = [
  // Ctrl + Alt
  { code: 0x0500, name: 'LCA(kc)', desc: 'Left Ctrl + Alt' },
  { code: 0x1500, name: 'RCA(kc)', desc: 'Right Ctrl + Alt' },

  // Ctrl + Shift
  { code: 0x0300, name: 'LCS(kc)', desc: 'Left Ctrl + Shift' },
  { code: 0x1300, name: 'RCS(kc)', desc: 'Right Ctrl + Shift' },

  // Ctrl + GUI
  { code: 0x0900, name: 'LCG(kc)', desc: 'Left Ctrl + GUI' },
  { code: 0x1900, name: 'RCG(kc)', desc: 'Right Ctrl + GUI' },

  // Alt + Shift
  { code: 0x0600, name: 'LSA(kc)', desc: 'Left Shift + Alt' },
  { code: 0x1600, name: 'RSA(kc)', desc: 'Right Shift + Alt' },

  // Alt + GUI
  { code: 0x0C00, name: 'LAG(kc)', desc: 'Left Alt + GUI' },
  { code: 0x1C00, name: 'RAG(kc)', desc: 'Right Alt + GUI' },

  // Shift + GUI
  { code: 0x0A00, name: 'LSG(kc)', desc: 'Left Shift + GUI' },
  { code: 0x1A00, name: 'RSG(kc)', desc: 'Right Shift + GUI' },

  // Ctrl + Alt + Shift
  { code: 0x0700, name: 'LCAS(kc)', desc: 'Left Ctrl + Alt + Shift' },
  { code: 0x1700, name: 'RCAS(kc)', desc: 'Right Ctrl + Alt + Shift' },

  // Ctrl + Alt + GUI
  { code: 0x0D00, name: 'LCAG(kc)', desc: 'Left Ctrl + Alt + GUI' },
  { code: 0x1D00, name: 'RCAG(kc)', desc: 'Right Ctrl + Alt + GUI' },

  // Ctrl + Shift + GUI
  { code: 0x0B00, name: 'LCSG(kc)', desc: 'Left Ctrl + Shift + GUI' },
  { code: 0x1B00, name: 'RCSG(kc)', desc: 'Right Ctrl + Shift + GUI' },

  // Alt + Shift + GUI
  { code: 0x0E00, name: 'LASG(kc)', desc: 'Left Alt + Shift + GUI' },
  { code: 0x1E00, name: 'RASG(kc)', desc: 'Right Alt + Shift + GUI' },

  // Ctrl + Alt + Shift + GUI
  { code: 0x0F00, name: 'LCASG(kc)', desc: 'Left Ctrl + Alt + Shift + GUI' },
  { code: 0x1F00, name: 'RCASG(kc)', desc: 'Right Ctrl + Alt + Shift + GUI' },
]

/**
 * Mod-Tap 键码 (按住是修饰键，松开是普通键)
 */
export const MODTAP_KEYCODES: KeycodeEntry[] = [
  // Left modifiers
  { code: 0x2100, name: 'LCTL_T(kc)', desc: 'Left Control Tap' },
  { code: 0x2200, name: 'LSFT_T(kc)', desc: 'Left Shift Tap' },
  { code: 0x2400, name: 'LALT_T(kc)', desc: 'Left Alt Tap' },
  { code: 0x2800, name: 'LGUI_T(kc)', desc: 'Left GUI Tap' },

  // Right modifiers
  { code: 0x3100, name: 'RCTL_T(kc)', desc: 'Right Control Tap' },
  { code: 0x3200, name: 'RSFT_T(kc)', desc: 'Right Shift Tap' },
  { code: 0x3400, name: 'RALT_T(kc)', desc: 'Right Alt Tap' },
  { code: 0x3800, name: 'RGUI_T(kc)', desc: 'Right GUI Tap' },

  // Combination modifiers - Left
  { code: 0x2500, name: 'LCA_T(kc)', desc: 'Left Ctrl + Alt Tap' },
  { code: 0x2300, name: 'LCS_T(kc)', desc: 'Left Ctrl + Shift Tap' },
  { code: 0x2900, name: 'LCG_T(kc)', desc: 'Left Ctrl + GUI Tap' },
  { code: 0x2600, name: 'LSA_T(kc)', desc: 'Left Shift + Alt Tap' },
  { code: 0x2C00, name: 'LAG_T(kc)', desc: 'Left Alt + GUI Tap' },
  { code: 0x2A00, name: 'LSG_T(kc)', desc: 'Left Shift + GUI Tap' },
  { code: 0x2700, name: 'LCAS_T(kc)', desc: 'Left Ctrl + Alt + Shift Tap' },
  { code: 0x2D00, name: 'LCAG_T(kc)', desc: 'Left Ctrl + Alt + GUI Tap' },
  { code: 0x2B00, name: 'LCSG_T(kc)', desc: 'Left Ctrl + Shift + GUI Tap' },
  { code: 0x2E00, name: 'LASG_T(kc)', desc: 'Left Alt + Shift + GUI Tap' },
  { code: 0x2F00, name: 'LCASG_T(kc)', desc: 'Left Ctrl + Alt + Shift + GUI Tap' },

  // Combination modifiers - Right
  { code: 0x3500, name: 'RCA_T(kc)', desc: 'Right Ctrl + Alt Tap' },
  { code: 0x3300, name: 'RCS_T(kc)', desc: 'Right Ctrl + Shift Tap' },
  { code: 0x3900, name: 'RCG_T(kc)', desc: 'Right Ctrl + GUI Tap' },
  { code: 0x3600, name: 'RSA_T(kc)', desc: 'Right Shift + Alt Tap' },
  { code: 0x3C00, name: 'RAG_T(kc)', desc: 'Right Alt + GUI Tap' },
  { code: 0x3A00, name: 'RSG_T(kc)', desc: 'Right Shift + GUI Tap' },
  { code: 0x3700, name: 'RCAS_T(kc)', desc: 'Right Ctrl + Alt + Shift Tap' },
  { code: 0x3D00, name: 'RCAG_T(kc)', desc: 'Right Ctrl + Alt + GUI Tap' },
  { code: 0x3B00, name: 'RCSG_T(kc)', desc: 'Right Ctrl + Shift + GUI Tap' },
  { code: 0x3E00, name: 'RASG_T(kc)', desc: 'Right Alt + Shift + GUI Tap' },
  { code: 0x3F00, name: 'RCASG_T(kc)', desc: 'Right Ctrl + Alt + Shift + GUI Tap' },
]

/**
 * Layer Tap 键码 (按住切换层，松开是普通键)
 */
export const LAYERTAP_KEYCODES: KeycodeEntry[] = [
  { code: 0x4000, name: 'LT1(kc)', desc: 'Layer Tap 1' },
  { code: 0x4100, name: 'LT2(kc)', desc: 'Layer Tap 2' },
  { code: 0x4200, name: 'LT3(kc)', desc: 'Layer Tap 3' },
  { code: 0x4300, name: 'LT4(kc)', desc: 'Layer Tap 4' },
  { code: 0x4400, name: 'LT5(kc)', desc: 'Layer Tap 5' },
  { code: 0x4500, name: 'LT6(kc)', desc: 'Layer Tap 6' },
  { code: 0x4600, name: 'LT7(kc)', desc: 'Layer Tap 7' },
]

/**
 * 层切换键码 (Layer Switch)
 */
export const LAYER_KEYCODES: KeycodeEntry[] = [
  // Momentary layer
  { code: 0x5000, name: 'MO(1)', desc: 'Momentary Layer 1' },
  { code: 0x5100, name: 'MO(2)', desc: 'Momentary Layer 2' },
  { code: 0x5200, name: 'MO(3)', desc: 'Momentary Layer 3' },
  { code: 0x5300, name: 'MO(4)', desc: 'Momentary Layer 4' },
  { code: 0x5400, name: 'MO(5)', desc: 'Momentary Layer 5' },
  { code: 0x5500, name: 'MO(6)', desc: 'Momentary Layer 6' },
  { code: 0x5600, name: 'MO(7)', desc: 'Momentary Layer 7' },

  // Toggle layer
  { code: 0x5800, name: 'TG(1)', desc: 'Toggle Layer 1' },
  { code: 0x5900, name: 'TG(2)', desc: 'Toggle Layer 2' },
  { code: 0x5A00, name: 'TG(3)', desc: 'Toggle Layer 3' },
  { code: 0x5B00, name: 'TG(4)', desc: 'Toggle Layer 4' },
  { code: 0x5C00, name: 'TG(5)', desc: 'Toggle Layer 5' },
  { code: 0x5D00, name: 'TG(6)', desc: 'Toggle Layer 6' },
  { code: 0x5E00, name: 'TG(7)', desc: 'Toggle Layer 7' },

  // Default layer
  { code: 0x6000, name: 'DF(0)', desc: 'Default Layer 0' },
  { code: 0x6100, name: 'DF(1)', desc: 'Default Layer 1' },
  { code: 0x6200, name: 'DF(2)', desc: 'Default Layer 2' },
  { code: 0x6300, name: 'DF(3)', desc: 'Default Layer 3' },
  { code: 0x6400, name: 'DF(4)', desc: 'Default Layer 4' },
]

/**
 * 媒体控制键码 (Media Controls)
 */
export const MEDIA_KEYCODES: KeycodeEntry[] = [
  { code: 0x8000, name: 'KC_MS_U', desc: 'Mouse Up' },
  { code: 0x8001, name: 'KC_MS_D', desc: 'Mouse Down' },
  { code: 0x8002, name: 'KC_MS_L', desc: 'Mouse Left' },
  { code: 0x8003, name: 'KC_MS_R', desc: 'Mouse Right' },
  { code: 0x8004, name: 'KC_BTN1', desc: 'Mouse Button 1' },
  { code: 0x8005, name: 'KC_BTN2', desc: 'Mouse Button 2' },
  { code: 0x8006, name: 'KC_BTN3', desc: 'Mouse Button 3' },
  { code: 0x8007, name: 'KC_BTN4', desc: 'Mouse Button 4' },
  { code: 0x8008, name: 'KC_BTN5', desc: 'Mouse Button 5' },
  { code: 0x8009, name: 'KC_WH_U', desc: 'Wheel Up' },
  { code: 0x800A, name: 'KC_WH_D', desc: 'Wheel Down' },
  { code: 0x800B, name: 'KC_WH_L', desc: 'Wheel Left' },
  { code: 0x800C, name: 'KC_WH_R', desc: 'Wheel Right' },
  { code: 0x800D, name: 'KC_ACL0', desc: 'Accelerometer 0' },
  { code: 0x800E, name: 'KC_ACL1', desc: 'Accelerometer 1' },
  { code: 0x800F, name: 'KC_ACL2', desc: 'Accelerometer 2' },

  // Consumer controls
  { code: 0x8100, name: 'KC_BRIU', desc: 'Brightness Up' },
  { code: 0x8101, name: 'KC_BRID', desc: 'Brightness Down' },
  { code: 0x8102, name: 'KC_MPRV', desc: 'Media Previous' },
  { code: 0x8103, name: 'KC_MNXT', desc: 'Media Next' },
  { code: 0x8104, name: 'KC_MPLY', desc: 'Media Play/Pause' },
  { code: 0x8105, name: 'KC_MSTP', desc: 'Media Stop' },
  { code: 0x8106, name: 'KC_MRWD', desc: 'Media Rewind' },
  { code: 0x8107, name: 'KC_MFFD', desc: 'Media Fast Forward' },
  { code: 0x8108, name: 'KC_EJCT', desc: 'Eject' },
  { code: 0x8109, name: 'KC_CALC', desc: 'Calculator' },
  { code: 0x810A, name: 'KC_MAIL', desc: 'Mail' },
  { code: 0x810B, name: 'KC_MSEL', desc: 'Media Select' },
  { code: 0x810C, name: 'KC_MYCM', desc: 'My Computer' },
  { code: 0x810D, name: 'KC_WSCH', desc: 'Web Search' },
  { code: 0x810E, name: 'KC_WHOM', desc: 'Web Home' },
  { code: 0x810F, name: 'KC_WBAK', desc: 'Web Back' },
  { code: 0x8110, name: 'KC_WFWD', desc: 'Web Forward' },
  { code: 0x8111, name: 'KC_WSTP', desc: 'Web Stop' },
  { code: 0x8112, name: 'KC_WREF', desc: 'Web Refresh' },
  { code: 0x8113, name: 'KC_WFAV', desc: 'Web Favorites' },
  { code: 0x8114, name: 'KC_BRIU', desc: 'Brightness Up' },
  { code: 0x8115, name: 'KC_BRID', desc: 'Brightness Down' },
]

/**
 * 所有键码的完整映射
 */
export const ALL_KEYCODES: KeycodeEntry[] = [
  ...BASIC_KEYCODES,
  ...MODIFIER_KEYCODES,
  ...COMBO_MODIFIER_KEYCODES,
  ...MODTAP_KEYCODES,
  ...LAYERTAP_KEYCODES,
  ...LAYER_KEYCODES,
  ...MEDIA_KEYCODES,
]

/**
 * 根据键码名称查找键码
 */
export function findKeycodeByName(name: string): KeycodeEntry | undefined {
  const normalizedName = name.toUpperCase().trim()
  return ALL_KEYCODES.find(kc => kc.name.toUpperCase() === normalizedName)
}

/**
 * 根据键码值查找键码信息
 */
export function findKeycodeByCode(code: number): KeycodeEntry | undefined {
  return ALL_KEYCODES.find(kc => kc.code === code)
}

/**
 * 根据基础键码和修饰键状态构建完整的键码名称
 */
export function buildKeycodeName(baseCode: number, modifiers: {
  ctrl: boolean
  shift: boolean
  alt: boolean
  gui: boolean
}, isRight: boolean): string {
  // 查找基础键码名称
  const baseKeycode = BASIC_KEYCODES.find(kc => kc.code === baseCode)
  const baseName = baseKeycode?.name || `KC_${baseCode.toString(16).toUpperCase()}`

  // 构建修饰键前缀
  const modParts: string[] = []
  if (modifiers.ctrl)
    modParts.push(isRight ? 'R' : 'L')
  if (modifiers.alt)
    modParts.push('A')
  if (modifiers.shift)
    modParts.push('S')
  if (modifiers.gui)
    modParts.push('G')

  if (modParts.length === 0) {
    return baseName
  }

  // 组合修饰键名称
  const modPrefix = modParts.join('')
  return `${modPrefix}(${baseName})`
}

/**
 * 获取所有键码名称列表（用于自动完成）
 */
export function getAllKeycodeNames(): string[] {
  return ALL_KEYCODES.map(kc => kc.name)
}

/**
 * 过滤键码名称（用于搜索提示）
 */
export function filterKeycodeNames(input: string): string[] {
  const normalizedInput = input.toLowerCase()
  if (!normalizedInput) {
    return []
  }
  return ALL_KEYCODES
    .filter(kc => kc.name.toLowerCase().includes(normalizedInput))
    .slice(0, 20)
    .map(kc => kc.name)
}
