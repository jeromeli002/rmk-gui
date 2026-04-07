export interface KeyInfo {
  code: number
  rmk: string
  symbol: [string | null, string | null]
}

export const keyCodeMap: Record<number, KeyInfo> = {
  0x0000: { code: 0x0000, rmk: 'No', symbol: [null, 'No'] },
  0x0001: { code: 0x0001, rmk: '_', symbol: [null, '▽'] },
  0x0002: { code: 0x0002, rmk: 'PostFail', symbol: [null, 'PostFail'] },
  0x0003: { code: 0x0003, rmk: 'ErrorUndefined', symbol: [null, 'ErrorUndefined'] },
  0x0004: { code: 0x0004, rmk: 'A', symbol: [null, 'A'] },
  0x0005: { code: 0x0005, rmk: 'B', symbol: [null, 'B'] },
  0x0006: { code: 0x0006, rmk: 'C', symbol: [null, 'C'] },
  0x0007: { code: 0x0007, rmk: 'D', symbol: [null, 'D'] },
  0x0008: { code: 0x0008, rmk: 'E', symbol: [null, 'E'] },
  0x0009: { code: 0x0009, rmk: 'F', symbol: [null, 'F'] },
  0x000A: { code: 0x000A, rmk: 'G', symbol: [null, 'G'] },
  0x000B: { code: 0x000B, rmk: 'H', symbol: [null, 'H'] },
  0x000C: { code: 0x000C, rmk: 'I', symbol: [null, 'I'] },
  0x000D: { code: 0x000D, rmk: 'J', symbol: [null, 'J'] },
  0x000E: { code: 0x000E, rmk: 'K', symbol: [null, 'K'] },
  0x000F: { code: 0x000F, rmk: 'L', symbol: [null, 'L'] },
  0x0010: { code: 0x0010, rmk: 'M', symbol: [null, 'M'] },
  0x0011: { code: 0x0011, rmk: 'N', symbol: [null, 'N'] },
  0x0012: { code: 0x0012, rmk: 'O', symbol: [null, 'O'] },
  0x0013: { code: 0x0013, rmk: 'P', symbol: [null, 'P'] },
  0x0014: { code: 0x0014, rmk: 'Q', symbol: [null, 'Q'] },
  0x0015: { code: 0x0015, rmk: 'R', symbol: [null, 'R'] },
  0x0016: { code: 0x0016, rmk: 'S', symbol: [null, 'S'] },
  0x0017: { code: 0x0017, rmk: 'T', symbol: [null, 'T'] },
  0x0018: { code: 0x0018, rmk: 'U', symbol: [null, 'U'] },
  0x0019: { code: 0x0019, rmk: 'V', symbol: [null, 'V'] },
  0x001A: { code: 0x001A, rmk: 'W', symbol: [null, 'W'] },
  0x001B: { code: 0x001B, rmk: 'X', symbol: [null, 'X'] },
  0x001C: { code: 0x001C, rmk: 'Y', symbol: [null, 'Y'] },
  0x001D: { code: 0x001D, rmk: 'Z', symbol: [null, 'Z'] },
  0x001E: { code: 0x001E, rmk: 'Kc1', symbol: [null, '!\n1'] },
  0x001F: { code: 0x001F, rmk: 'Kc2', symbol: [null, '@\n2'] },
  0x0020: { code: 0x0020, rmk: 'Kc3', symbol: [null, '#\n3'] },
  0x0021: { code: 0x0021, rmk: 'Kc4', symbol: [null, '$\n4'] },
  0x0022: { code: 0x0022, rmk: 'Kc5', symbol: [null, '%\n5'] },
  0x0023: { code: 0x0023, rmk: 'Kc6', symbol: [null, '^\n6'] },
  0x0024: { code: 0x0024, rmk: 'Kc7', symbol: [null, '&\n7'] },
  0x0025: { code: 0x0025, rmk: 'Kc8', symbol: [null, '*\n8'] },
  0x0026: { code: 0x0026, rmk: 'Kc9', symbol: [null, '(\n9'] },
  0x0027: { code: 0x0027, rmk: 'Kc0', symbol: [null, ')\n0'] },
  0x0028: { code: 0x0028, rmk: 'Enter', symbol: [null, 'Enter'] },
  0x0029: { code: 0x0029, rmk: 'Escape', symbol: [null, 'Esc'] },
  0x002A: { code: 0x002A, rmk: 'Backspace', symbol: [null, 'Bksp'] },
  0x002B: { code: 0x002B, rmk: 'Tab', symbol: [null, 'Tab'] },
  0x002C: { code: 0x002C, rmk: 'Space', symbol: [null, 'Space'] },
  0x002D: { code: 0x002D, rmk: 'Minus', symbol: [null, '_\n-'] },
  0x002E: { code: 0x002E, rmk: 'Equal', symbol: [null, '+\n='] },
  0x002F: { code: 0x002F, rmk: 'LeftBracket', symbol: [null, '{\n['] },
  0x0030: { code: 0x0030, rmk: 'RightBracket', symbol: [null, '}\n]'] },
  0x0031: { code: 0x0031, rmk: 'Backslash', symbol: [null, '|\n\\'] },
  0x0032: { code: 0x0032, rmk: 'NonusHash', symbol: [null, '~\n#'] },
  0x0033: { code: 0x0033, rmk: 'Semicolon', symbol: [null, ':\n;'] },
  0x0034: { code: 0x0034, rmk: 'Quote', symbol: [null, '"\n\''] },
  0x0035: { code: 0x0035, rmk: 'Grave', symbol: [null, '~\n`'] },
  0x0036: { code: 0x0036, rmk: 'Comma', symbol: [null, '<\n,'] },
  0x0037: { code: 0x0037, rmk: 'Dot', symbol: [null, '>\n.'] },
  0x0038: { code: 0x0038, rmk: 'Slash', symbol: [null, '?\n/'] },
  0x0039: { code: 0x0039, rmk: 'CapsLock', symbol: [null, 'Caps\nLock'] },
  0x003A: { code: 0x003A, rmk: 'F1', symbol: [null, 'F1'] },
  0x003B: { code: 0x003B, rmk: 'F2', symbol: [null, 'F2'] },
  0x003C: { code: 0x003C, rmk: 'F3', symbol: [null, 'F3'] },
  0x003D: { code: 0x003D, rmk: 'F4', symbol: [null, 'F4'] },
  0x003E: { code: 0x003E, rmk: 'F5', symbol: [null, 'F5'] },
  0x003F: { code: 0x003F, rmk: 'F6', symbol: [null, 'F6'] },
  0x0040: { code: 0x0040, rmk: 'F7', symbol: [null, 'F7'] },
  0x0041: { code: 0x0041, rmk: 'F8', symbol: [null, 'F8'] },
  0x0042: { code: 0x0042, rmk: 'F9', symbol: [null, 'F9'] },
  0x0043: { code: 0x0043, rmk: 'F10', symbol: [null, 'F10'] },
  0x0044: { code: 0x0044, rmk: 'F11', symbol: [null, 'F11'] },
  0x0045: { code: 0x0045, rmk: 'F12', symbol: [null, 'F12'] },
  0x0046: { code: 0x0046, rmk: 'PrintScreen', symbol: [null, 'Print\nScreen'] },
  0x0047: { code: 0x0047, rmk: 'ScrollLock', symbol: [null, 'Scroll\nLock'] },
  0x0048: { code: 0x0048, rmk: 'Pause', symbol: [null, 'Pause'] },
  0x0049: { code: 0x0049, rmk: 'Insert', symbol: [null, 'Insert'] },
  0x004A: { code: 0x004A, rmk: 'Home', symbol: [null, 'Home'] },
  0x004B: { code: 0x004B, rmk: 'PageUp', symbol: [null, 'Page\nUp'] },
  0x004C: { code: 0x004C, rmk: 'Delete', symbol: [null, 'Del'] },
  0x004D: { code: 0x004D, rmk: 'End', symbol: [null, 'End'] },
  0x004E: { code: 0x004E, rmk: 'PageDown', symbol: [null, 'Page\nDown'] },
  0x004F: { code: 0x004F, rmk: 'Right', symbol: [null, 'Right'] },
  0x0050: { code: 0x0050, rmk: 'Left', symbol: [null, 'Left'] },
  0x0051: { code: 0x0051, rmk: 'Down', symbol: [null, 'Down'] },
  0x0052: { code: 0x0052, rmk: 'Up', symbol: [null, 'Up'] },
  0x0053: { code: 0x0053, rmk: 'NumLock', symbol: [null, 'Num\nLock'] },
  0x0054: { code: 0x0054, rmk: 'KpSlash', symbol: [null, '/'] },
  0x0055: { code: 0x0055, rmk: 'KpAsterisk', symbol: [null, '*'] },
  0x0056: { code: 0x0056, rmk: 'KpMinus', symbol: [null, '-'] },
  0x0057: { code: 0x0057, rmk: 'KpPlus', symbol: [null, '+'] },
  0x0058: { code: 0x0058, rmk: 'KpEnter', symbol: [null, 'Num\nEnter'] },
  0x0059: { code: 0x0059, rmk: 'Kp1', symbol: [null, '1'] },
  0x005A: { code: 0x005A, rmk: 'Kp2', symbol: [null, '2'] },
  0x005B: { code: 0x005B, rmk: 'Kp3', symbol: [null, '3'] },
  0x005C: { code: 0x005C, rmk: 'Kp4', symbol: [null, '4'] },
  0x005D: { code: 0x005D, rmk: 'Kp5', symbol: [null, '5'] },
  0x005E: { code: 0x005E, rmk: 'Kp6', symbol: [null, '6'] },
  0x005F: { code: 0x005F, rmk: 'Kp7', symbol: [null, '7'] },
  0x0060: { code: 0x0060, rmk: 'Kp8', symbol: [null, '8'] },
  0x0061: { code: 0x0061, rmk: 'Kp9', symbol: [null, '9'] },
  0x0062: { code: 0x0062, rmk: 'Kp0', symbol: [null, '0'] },
  0x0063: { code: 0x0063, rmk: 'KpDot', symbol: [null, '.'] },
  0x0064: { code: 0x0064, rmk: 'NonusBackslash', symbol: [null, '|\n\\'] },
  0x0065: { code: 0x0065, rmk: 'Application', symbol: [null, 'Menu'] },
  0x0066: { code: 0x0066, rmk: 'KbPower', symbol: [null, 'Power'] },
  0x0067: { code: 0x0067, rmk: 'KpEqual', symbol: [null, '='] },
  0x0068: { code: 0x0068, rmk: 'F13', symbol: [null, 'F13'] },
  0x0069: { code: 0x0069, rmk: 'F14', symbol: [null, 'F14'] },
  0x006A: { code: 0x006A, rmk: 'F15', symbol: [null, 'F15'] },
  0x006B: { code: 0x006B, rmk: 'F16', symbol: [null, 'F16'] },
  0x006C: { code: 0x006C, rmk: 'F17', symbol: [null, 'F17'] },
  0x006D: { code: 0x006D, rmk: 'F18', symbol: [null, 'F18'] },
  0x006E: { code: 0x006E, rmk: 'F19', symbol: [null, 'F19'] },
  0x006F: { code: 0x006F, rmk: 'F20', symbol: [null, 'F20'] },
  0x0070: { code: 0x0070, rmk: 'F21', symbol: [null, 'F21'] },
  0x0071: { code: 0x0071, rmk: 'F22', symbol: [null, 'F22'] },
  0x0072: { code: 0x0072, rmk: 'F23', symbol: [null, 'F23'] },
  0x0073: { code: 0x0073, rmk: 'F24', symbol: [null, 'F24'] },
  0x0074: { code: 0x0074, rmk: 'Execute', symbol: [null, 'Exec'] },
  0x0075: { code: 0x0075, rmk: 'Help', symbol: [null, 'Help'] },
  0x0076: { code: 0x0076, rmk: 'Menu', symbol: [null, 'Menu'] },
  0x0077: { code: 0x0077, rmk: 'Select', symbol: [null, 'Select'] },
  0x0078: { code: 0x0078, rmk: 'Stop', symbol: [null, 'Stop'] },
  0x0079: { code: 0x0079, rmk: 'Again', symbol: [null, 'Again'] },
  0x007A: { code: 0x007A, rmk: 'Undo', symbol: [null, 'Undo'] },
  0x007B: { code: 0x007B, rmk: 'Cut', symbol: [null, 'Cut'] },
  0x007C: { code: 0x007C, rmk: 'Copy', symbol: [null, 'Copy'] },
  0x007D: { code: 0x007D, rmk: 'Paste', symbol: [null, 'Paste'] },
  0x007E: { code: 0x007E, rmk: 'Find', symbol: [null, 'Find'] },
  0x007F: { code: 0x007F, rmk: 'KbMute', symbol: [null, 'KbMute'] },
  0x0080: { code: 0x0080, rmk: 'KbVolumeUp', symbol: [null, 'KbVolumeUp'] },
  0x0081: { code: 0x0081, rmk: 'KbVolumeDown', symbol: [null, 'KbVolumeDown'] },
  0x0082: { code: 0x0082, rmk: 'LockingCapsLock', symbol: [null, 'Locking\nCaps'] },
  0x0083: { code: 0x0083, rmk: 'LockingNumLock', symbol: [null, 'Locking\nNum'] },
  0x0084: { code: 0x0084, rmk: 'LockingScrollLock', symbol: [null, 'Locking\nScroll'] },
  0x0085: { code: 0x0085, rmk: 'KpComma', symbol: [null, ','] },
  0x0086: { code: 0x0086, rmk: 'KpEqualAs400', symbol: [null, 'KpEqualAs400'] },
  0x0087: { code: 0x0087, rmk: 'International1', symbol: [null, 'International1'] },
  0x0088: { code: 0x0088, rmk: 'International2', symbol: [null, 'International2'] },
  0x0089: { code: 0x0089, rmk: 'International3', symbol: [null, 'International3'] },
  0x008A: { code: 0x008A, rmk: 'International4', symbol: [null, 'International4'] },
  0x008B: { code: 0x008B, rmk: 'International5', symbol: [null, 'International5'] },
  0x008C: { code: 0x008C, rmk: 'International6', symbol: [null, 'International6'] },
  0x008D: { code: 0x008D, rmk: 'International7', symbol: [null, 'International7'] },
  0x008E: { code: 0x008E, rmk: 'International8', symbol: [null, 'International8'] },
  0x008F: { code: 0x008F, rmk: 'International9', symbol: [null, 'International9'] },
  0x0090: { code: 0x0090, rmk: 'Language1', symbol: [null, 'Language1'] },
  0x0091: { code: 0x0091, rmk: 'Language2', symbol: [null, 'Language2'] },
  0x0092: { code: 0x0092, rmk: 'Language3', symbol: [null, 'Language3'] },
  0x0093: { code: 0x0093, rmk: 'Language4', symbol: [null, 'Language4'] },
  0x0094: { code: 0x0094, rmk: 'Language5', symbol: [null, 'Language5'] },
  0x0095: { code: 0x0095, rmk: 'Language6', symbol: [null, 'Language6'] },
  0x0096: { code: 0x0096, rmk: 'Language7', symbol: [null, 'Language7'] },
  0x0097: { code: 0x0097, rmk: 'Language8', symbol: [null, 'Language8'] },
  0x0098: { code: 0x0098, rmk: 'Language9', symbol: [null, 'Language9'] },
  0x0099: { code: 0x0099, rmk: 'AlternateErase', symbol: [null, 'AlternateErase'] },
  0x009A: { code: 0x009A, rmk: 'SystemRequest', symbol: [null, 'SystemRequest'] },
  0x009B: { code: 0x009B, rmk: 'Cancel', symbol: [null, 'Cancel'] },
  0x009C: { code: 0x009C, rmk: 'Clear', symbol: [null, 'Clear'] },
  0x009D: { code: 0x009D, rmk: 'Prior', symbol: [null, 'Prior'] },
  0x009E: { code: 0x009E, rmk: 'Return', symbol: [null, 'Return'] },
  0x009F: { code: 0x009F, rmk: 'Separator', symbol: [null, 'Separator'] },
  0x00A0: { code: 0x00A0, rmk: 'Out', symbol: [null, 'Out'] },
  0x00A1: { code: 0x00A1, rmk: 'Oper', symbol: [null, 'Oper'] },
  0x00A2: { code: 0x00A2, rmk: 'ClearAgain', symbol: [null, 'ClearAgain'] },
  0x00A3: { code: 0x00A3, rmk: 'Crsel', symbol: [null, 'Crsel'] },
  0x00A4: { code: 0x00A4, rmk: 'Exsel', symbol: [null, 'Exsel'] },
  0x00A5: { code: 0x00A5, rmk: 'SystemPower', symbol: [null, 'SystemPower'] },
  0x00A6: { code: 0x00A6, rmk: 'SystemSleep', symbol: [null, 'Sleep'] },
  0x00A7: { code: 0x00A7, rmk: 'SystemWake', symbol: [null, 'Wake'] },
  0x00A8: { code: 0x00A8, rmk: 'AudioMute', symbol: [null, 'Mute'] },
  0x00A9: { code: 0x00A9, rmk: 'AudioVolUp', symbol: [null, 'Vol +'] },
  0x00AA: { code: 0x00AA, rmk: 'AudioVolDown', symbol: [null, 'Vol -'] },
  0x00AB: { code: 0x00AB, rmk: 'MediaNextTrack', symbol: [null, 'Media\nNext'] },
  0x00AC: { code: 0x00AC, rmk: 'MediaPrevTrack', symbol: [null, 'MediaPrevTrack'] },
  0x00AD: { code: 0x00AD, rmk: 'MediaStop', symbol: [null, 'Media\nStop'] },
  0x00AE: { code: 0x00AE, rmk: 'MediaPlayPause', symbol: [null, 'Media\nPlay'] },
  0x00AF: { code: 0x00AF, rmk: 'MediaSelect', symbol: [null, 'Media\nPlayer'] },
  0x00B0: { code: 0x00B0, rmk: 'MediaEject', symbol: [null, 'Eject'] },
  0x00B1: { code: 0x00B1, rmk: 'Mail', symbol: [null, 'Mail'] },
  0x00B2: { code: 0x00B2, rmk: 'Calculator', symbol: [null, 'Calculator'] },
  0x00B3: { code: 0x00B3, rmk: 'MyComputer', symbol: [null, 'My\nPC'] },
  0x00B4: { code: 0x00B4, rmk: 'WwwSearch', symbol: [null, 'Browser\nSearch'] },
  0x00B5: { code: 0x00B5, rmk: 'WwwHome', symbol: [null, 'Browser\nHome'] },
  0x00B6: { code: 0x00B6, rmk: 'WwwBack', symbol: [null, 'Browser\nBack'] },
  0x00B7: { code: 0x00B7, rmk: 'WwwForward', symbol: [null, 'Browser\nForward'] },
  0x00B8: { code: 0x00B8, rmk: 'WwwStop', symbol: [null, 'Browser\nStop'] },
  0x00B9: { code: 0x00B9, rmk: 'WwwRefresh', symbol: [null, 'Browser\nRefresh'] },
  0x00BA: { code: 0x00BA, rmk: 'WwwFavorites', symbol: [null, 'Browser\nFav.'] },
  0x00BB: { code: 0x00BB, rmk: 'MediaFastForward', symbol: [null, 'Next\nTrack\n(macOS)'] },
  0x00BC: { code: 0x00BC, rmk: 'MediaRewind', symbol: [null, 'Prev\nTrack\n(macOS)'] },
  0x00BD: { code: 0x00BD, rmk: 'BrightnessUp', symbol: [null, 'Bright.\nUp'] },
  0x00BE: { code: 0x00BE, rmk: 'BrightnessDown', symbol: [null, 'Bright.\nDown'] },
  0x00BF: { code: 0x00BF, rmk: 'ControlPanel', symbol: [null, 'ControlPanel'] },
  0x00C0: { code: 0x00C0, rmk: 'Assistant', symbol: [null, 'Assistant'] },
  0x00C1: { code: 0x00C1, rmk: 'MissionControl', symbol: [null, 'MissionControl'] },
  0x00C2: { code: 0x00C2, rmk: 'Launchpad', symbol: [null, 'Launchpad'] },
  0x00CD: { code: 0x00CD, rmk: 'MouseUp', symbol: [null, 'MouseUp'] },
  0x00CE: { code: 0x00CE, rmk: 'MouseDown', symbol: [null, 'MouseDown'] },
  0x00CF: { code: 0x00CF, rmk: 'MouseLeft', symbol: [null, 'MouseLeft'] },
  0x00D0: { code: 0x00D0, rmk: 'MouseRight', symbol: [null, 'MouseRight'] },
  0x00D1: { code: 0x00D1, rmk: 'MouseBtn1', symbol: [null, 'MouseBtn1'] },
  0x00D2: { code: 0x00D2, rmk: 'MouseBtn2', symbol: [null, 'MouseBtn2'] },
  0x00D3: { code: 0x00D3, rmk: 'MouseBtn3', symbol: [null, 'MouseBtn3'] },
  0x00D4: { code: 0x00D4, rmk: 'MouseBtn4', symbol: [null, 'MouseBtn4'] },
  0x00D5: { code: 0x00D5, rmk: 'MouseBtn5', symbol: [null, 'MouseBtn5'] },
  0x00D6: { code: 0x00D6, rmk: 'MouseBtn6', symbol: [null, 'MouseBtn6'] },
  0x00D7: { code: 0x00D7, rmk: 'MouseBtn7', symbol: [null, 'MouseBtn7'] },
  0x00D8: { code: 0x00D8, rmk: 'MouseBtn8', symbol: [null, 'MouseBtn8'] },
  0x00D9: { code: 0x00D9, rmk: 'MouseWheelUp', symbol: [null, 'MouseWheelUp'] },
  0x00DA: { code: 0x00DA, rmk: 'MouseWheelDown', symbol: [null, 'MouseWheelDown'] },
  0x00DB: { code: 0x00DB, rmk: 'MouseWheelLeft', symbol: [null, 'MouseWheelLeft'] },
  0x00DC: { code: 0x00DC, rmk: 'MouseWheelRight', symbol: [null, 'MouseWheelRight'] },
  0x00DD: { code: 0x00DD, rmk: 'MouseAccel0', symbol: [null, 'MouseAccel0'] },
  0x00DE: { code: 0x00DE, rmk: 'MouseAccel1', symbol: [null, 'MouseAccel1'] },
  0x00DF: { code: 0x00DF, rmk: 'MouseAccel2', symbol: [null, 'MouseAccel2'] },
  0x00E0: { code: 0x00E0, rmk: 'LCtrl', symbol: [null, 'LCtrl'] },
  0x00E1: { code: 0x00E1, rmk: 'LShift', symbol: [null, 'LShift'] },
  0x00E2: { code: 0x00E2, rmk: 'LAlt', symbol: [null, 'LAlt'] },
  0x00E3: { code: 0x00E3, rmk: 'LGui', symbol: [null, 'LGui'] },
  0x00E4: { code: 0x00E4, rmk: 'RCtrl', symbol: [null, 'RCtrl'] },
  0x00E5: { code: 0x00E5, rmk: 'RShift', symbol: [null, 'RShift'] },
  0x00E6: { code: 0x00E6, rmk: 'RAlt', symbol: [null, 'RAlt'] },
  0x00E7: { code: 0x00E7, rmk: 'RGui', symbol: [null, 'RGui'] },
  0x0100: { code: 0x0100, rmk: 'MagicSwapControlCapsLock', symbol: [null, 'Swap\nCtrl\nCaps'] },
  0x0101: { code: 0x0101, rmk: 'MagicUnswapControlCapsLock', symbol: [null, 'Unswap\nCtrl\nCaps'] },
  0x0102: { code: 0x0102, rmk: 'MagicToggleControlCapsLock', symbol: [null, 'Toggle\nCtrl\nCaps'] },
  0x0103: { code: 0x0103, rmk: 'MagicCapsLockAsControlOff', symbol: [null, 'Caps\nnot to\nCtrl'] },
  0x0104: { code: 0x0104, rmk: 'MagicCapsLockAsControlOn', symbol: [null, 'Caps\nto\nCtrl'] },
  0x0105: { code: 0x0105, rmk: 'MagicSwapLaltLGui', symbol: [null, 'Swap\nLAlt\nLGui'] },
  0x0106: { code: 0x0106, rmk: 'MagicUnswapLaltLGui', symbol: [null, 'Unswap\nLAlt\nLGui'] },
  0x0107: { code: 0x0107, rmk: 'MagicSwapRaltRGui', symbol: [null, 'Swap\nRAlt\nRGui'] },
  0x0108: { code: 0x0108, rmk: 'MagicUnswapRaltRGui', symbol: [null, 'Unswap\nRAlt\nRGui'] },
  0x0109: { code: 0x0109, rmk: 'MagicGuiOn', symbol: [null, 'GUI\nOn'] },
  0x010A: { code: 0x010A, rmk: 'MagicGuiOff', symbol: [null, 'GUI\nOff'] },
  0x010B: { code: 0x010B, rmk: 'MagicToggleGui', symbol: [null, 'GUI\nToggle'] },
  0x010C: { code: 0x010C, rmk: 'MagicSwapGraveEsc', symbol: [null, 'Swap\n`\nEsc'] },
  0x010D: { code: 0x010D, rmk: 'MagicUnswapGraveEsc', symbol: [null, 'Unswap\n`\nEsc'] },
  0x010E: { code: 0x010E, rmk: 'MagicSwapBackslashBackspace', symbol: [null, 'Swap\n\\\nBS'] },
  0x010F: { code: 0x010F, rmk: 'MagicUnswapBackslashBackspace', symbol: [null, 'Unswap\n\\\nBS'] },
  0x0110: { code: 0x0110, rmk: 'MagicToggleBackslashBackspace', symbol: [null, 'Toggle\n\\\nBS'] },
  0x0111: { code: 0x0111, rmk: 'MagicNkroOn', symbol: [null, 'NKRO\nOn'] },
  0x0112: { code: 0x0112, rmk: 'MagicNkroOff', symbol: [null, 'NKRO\nOff'] },
  0x0113: { code: 0x0113, rmk: 'MagicToggleNkro', symbol: [null, 'NKRO\nToggle'] },
  0x0114: { code: 0x0114, rmk: 'MagicSwapAltGui', symbol: [null, 'Swap\nAlt\nGui'] },
  0x0115: { code: 0x0115, rmk: 'MagicUnswapAltGui', symbol: [null, 'Unswap\nAlt\nGui'] },
  0x0116: { code: 0x0116, rmk: 'MagicToggleAltGui', symbol: [null, 'Toggle\nAlt\nGui'] },
  0x0117: { code: 0x0117, rmk: 'MagicSwapLctlLGui', symbol: [null, 'Swap\nLCtl\nLGui'] },
  0x0118: { code: 0x0118, rmk: 'MagicUnswapLctlLGui', symbol: [null, 'Unswap\nLCtl\nLGui'] },
  0x0119: { code: 0x0119, rmk: 'MagicSwapRctlRGui', symbol: [null, 'Swap\nRCtl\nRGui'] },
  0x011A: { code: 0x011A, rmk: 'MagicUnswapRctlRGui', symbol: [null, 'Unswap\nRCtl\nRGui'] },
  0x011B: { code: 0x011B, rmk: 'MagicSwapCtlGui', symbol: [null, 'Swap\nCtl\nGui'] },
  0x011C: { code: 0x011C, rmk: 'MagicUnswapCtlGui', symbol: [null, 'Unswap\nCtl\nGui'] },
  0x011D: { code: 0x011D, rmk: 'MagicToggleCtlGui', symbol: [null, 'Toggle\nCtl\nGui'] },
  0x011E: { code: 0x011E, rmk: 'MagicEeHandsLeft', symbol: [null, 'EEH\nLeft'] },
  0x011F: { code: 0x011F, rmk: 'MagicEeHandsRight', symbol: [null, 'EEH\nRight'] },
  0x0120: { code: 0x0120, rmk: 'MagicSwapEscapeCapsLock', symbol: [null, 'Swap\nEsc\nCaps'] },
  0x0121: { code: 0x0121, rmk: 'MagicUnswapEscapeCapsLock', symbol: [null, 'Unswap\nEsc\nCaps'] },
  0x0122: { code: 0x0122, rmk: 'MagicToggleEscapeCapsLock', symbol: [null, 'Toggle\nEsc\nCaps'] },
  0x0200: { code: 0x0200, rmk: 'MidiOn', symbol: [null, 'MidiOn'] },
  0x0201: { code: 0x0201, rmk: 'MidiOff', symbol: [null, 'MidiOff'] },
  0x0202: { code: 0x0202, rmk: 'MidiToggle', symbol: [null, 'MidiToggle'] },
  0x0203: { code: 0x0203, rmk: 'MidiNoteC0', symbol: [null, 'MidiNoteC0'] },
  0x0204: { code: 0x0204, rmk: 'MidiNoteCSharp0', symbol: [null, 'MidiNoteCSharp0'] },
  0x0205: { code: 0x0205, rmk: 'MidiNoteD0', symbol: [null, 'MidiNoteD0'] },
  0x0206: { code: 0x0206, rmk: 'MidiNoteDSharp0', symbol: [null, 'MidiNoteDSharp0'] },
  0x0207: { code: 0x0207, rmk: 'MidiNoteE0', symbol: [null, 'MidiNoteE0'] },
  0x0208: { code: 0x0208, rmk: 'MidiNoteF0', symbol: [null, 'MidiNoteF0'] },
  0x0209: { code: 0x0209, rmk: 'MidiNoteFSharp0', symbol: [null, 'MidiNoteFSharp0'] },
  0x020A: { code: 0x020A, rmk: 'MidiNoteG0', symbol: [null, 'MidiNoteG0'] },
  0x020B: { code: 0x020B, rmk: 'MidiNoteGSharp0', symbol: [null, 'MidiNoteGSharp0'] },
  0x020C: { code: 0x020C, rmk: 'MidiNoteA0', symbol: [null, 'MidiNoteA0'] },
  0x020D: { code: 0x020D, rmk: 'MidiNoteASharp0', symbol: [null, 'MidiNoteASharp0'] },
  0x020E: { code: 0x020E, rmk: 'MidiNoteB0', symbol: [null, 'MidiNoteB0'] },
  0x020F: { code: 0x020F, rmk: 'MidiNoteC1', symbol: [null, 'MidiNoteC1'] },
  0x0210: { code: 0x0210, rmk: 'MidiNoteCSharp1', symbol: [null, 'MidiNoteCSharp1'] },
  0x0211: { code: 0x0211, rmk: 'MidiNoteD1', symbol: [null, 'MidiNoteD1'] },
  0x0212: { code: 0x0212, rmk: 'MidiNoteDSharp1', symbol: [null, 'MidiNoteDSharp1'] },
  0x0213: { code: 0x0213, rmk: 'MidiNoteE1', symbol: [null, 'MidiNoteE1'] },
  0x0214: { code: 0x0214, rmk: 'MidiNoteF1', symbol: [null, 'MidiNoteF1'] },
  0x0215: { code: 0x0215, rmk: 'MidiNoteFSharp1', symbol: [null, 'MidiNoteFSharp1'] },
  0x0216: { code: 0x0216, rmk: 'MidiNoteG1', symbol: [null, 'MidiNoteG1'] },
  0x0217: { code: 0x0217, rmk: 'MidiNoteGSharp1', symbol: [null, 'MidiNoteGSharp1'] },
  0x0218: { code: 0x0218, rmk: 'MidiNoteA1', symbol: [null, 'MidiNoteA1'] },
  0x0219: { code: 0x0219, rmk: 'MidiNoteASharp1', symbol: [null, 'MidiNoteASharp1'] },
  0x021A: { code: 0x021A, rmk: 'MidiNoteB1', symbol: [null, 'MidiNoteB1'] },
  0x021B: { code: 0x021B, rmk: 'MidiNoteC2', symbol: [null, 'MidiNoteC2'] },
  0x021C: { code: 0x021C, rmk: 'MidiNoteCSharp2', symbol: [null, 'MidiNoteCSharp2'] },
  0x021D: { code: 0x021D, rmk: 'MidiNoteD2', symbol: [null, 'MidiNoteD2'] },
  0x021E: { code: 0x021E, rmk: 'MidiNoteDSharp2', symbol: [null, 'MidiNoteDSharp2'] },
  0x021F: { code: 0x021F, rmk: 'MidiNoteE2', symbol: [null, 'MidiNoteE2'] },
  0x0220: { code: 0x0220, rmk: 'MidiNoteF2', symbol: [null, 'MidiNoteF2'] },
  0x0221: { code: 0x0221, rmk: 'MidiNoteFSharp2', symbol: [null, 'MidiNoteFSharp2'] },
  0x0222: { code: 0x0222, rmk: 'MidiNoteG2', symbol: [null, 'MidiNoteG2'] },
  0x0223: { code: 0x0223, rmk: 'MidiNoteGSharp2', symbol: [null, 'MidiNoteGSharp2'] },
  0x0224: { code: 0x0224, rmk: 'MidiNoteA2', symbol: [null, 'MidiNoteA2'] },
  0x0225: { code: 0x0225, rmk: 'MidiNoteASharp2', symbol: [null, 'MidiNoteASharp2'] },
  0x0226: { code: 0x0226, rmk: 'MidiNoteB2', symbol: [null, 'MidiNoteB2'] },
  0x0227: { code: 0x0227, rmk: 'MidiNoteC3', symbol: [null, 'MidiNoteC3'] },
  0x0228: { code: 0x0228, rmk: 'MidiNoteCSharp3', symbol: [null, 'MidiNoteCSharp3'] },
  0x0229: { code: 0x0229, rmk: 'MidiNoteD3', symbol: [null, 'MidiNoteD3'] },
  0x022A: { code: 0x022A, rmk: 'MidiNoteDSharp3', symbol: [null, 'MidiNoteDSharp3'] },
  0x022B: { code: 0x022B, rmk: 'MidiNoteE3', symbol: [null, 'MidiNoteE3'] },
  0x022C: { code: 0x022C, rmk: 'MidiNoteF3', symbol: [null, 'MidiNoteF3'] },
  0x022D: { code: 0x022D, rmk: 'MidiNoteFSharp3', symbol: [null, 'MidiNoteFSharp3'] },
  0x022E: { code: 0x022E, rmk: 'MidiNoteG3', symbol: [null, 'MidiNoteG3'] },
  0x022F: { code: 0x022F, rmk: 'MidiNoteGSharp3', symbol: [null, 'MidiNoteGSharp3'] },
  0x0230: { code: 0x0230, rmk: 'MidiNoteA3', symbol: [null, 'MidiNoteA3'] },
  0x0231: { code: 0x0231, rmk: 'MidiNoteASharp3', symbol: [null, 'MidiNoteASharp3'] },
  0x0232: { code: 0x0232, rmk: 'MidiNoteB3', symbol: [null, 'MidiNoteB3'] },
  0x0233: { code: 0x0233, rmk: 'MidiNoteC4', symbol: [null, 'MidiNoteC4'] },
  0x0234: { code: 0x0234, rmk: 'MidiNoteCSharp4', symbol: [null, 'MidiNoteCSharp4'] },
  0x0235: { code: 0x0235, rmk: 'MidiNoteD4', symbol: [null, 'MidiNoteD4'] },
  0x0236: { code: 0x0236, rmk: 'MidiNoteDSharp4', symbol: [null, 'MidiNoteDSharp4'] },
  0x0237: { code: 0x0237, rmk: 'MidiNoteE4', symbol: [null, 'MidiNoteE4'] },
  0x0238: { code: 0x0238, rmk: 'MidiNoteF4', symbol: [null, 'MidiNoteF4'] },
  0x0239: { code: 0x0239, rmk: 'MidiNoteFSharp4', symbol: [null, 'MidiNoteFSharp4'] },
  0x023A: { code: 0x023A, rmk: 'MidiNoteG4', symbol: [null, 'MidiNoteG4'] },
  0x023B: { code: 0x023B, rmk: 'MidiNoteGSharp4', symbol: [null, 'MidiNoteGSharp4'] },
  0x023C: { code: 0x023C, rmk: 'MidiNoteA4', symbol: [null, 'MidiNoteA4'] },
  0x023D: { code: 0x023D, rmk: 'MidiNoteASharp4', symbol: [null, 'MidiNoteASharp4'] },
  0x023E: { code: 0x023E, rmk: 'MidiNoteB4', symbol: [null, 'MidiNoteB4'] },
  0x023F: { code: 0x023F, rmk: 'MidiNoteC5', symbol: [null, 'MidiNoteC5'] },
  0x0240: { code: 0x0240, rmk: 'MidiNoteCSharp5', symbol: [null, 'MidiNoteCSharp5'] },
  0x0241: { code: 0x0241, rmk: 'MidiNoteD5', symbol: [null, 'MidiNoteD5'] },
  0x0242: { code: 0x0242, rmk: 'MidiNoteDSharp5', symbol: [null, 'MidiNoteDSharp5'] },
  0x0243: { code: 0x0243, rmk: 'MidiNoteE5', symbol: [null, 'MidiNoteE5'] },
  0x0244: { code: 0x0244, rmk: 'MidiNoteF5', symbol: [null, 'MidiNoteF5'] },
  0x0245: { code: 0x0245, rmk: 'MidiNoteFSharp5', symbol: [null, 'MidiNoteFSharp5'] },
  0x0246: { code: 0x0246, rmk: 'MidiNoteG5', symbol: [null, 'MidiNoteG5'] },
  0x0247: { code: 0x0247, rmk: 'MidiNoteGSharp5', symbol: [null, 'MidiNoteGSharp5'] },
  0x0248: { code: 0x0248, rmk: 'MidiNoteA5', symbol: [null, 'MidiNoteA5'] },
  0x0249: { code: 0x0249, rmk: 'MidiNoteASharp5', symbol: [null, 'MidiNoteASharp5'] },
  0x024A: { code: 0x024A, rmk: 'MidiNoteB5', symbol: [null, 'MidiNoteB5'] },
  0x024B: { code: 0x024B, rmk: 'MidiOctaveN2', symbol: [null, 'MidiOctaveN2'] },
  0x024C: { code: 0x024C, rmk: 'MidiOctaveN1', symbol: [null, 'MidiOctaveN1'] },
  0x024D: { code: 0x024D, rmk: 'MidiOctave0', symbol: [null, 'MidiOctave0'] },
  0x024E: { code: 0x024E, rmk: 'MidiOctave1', symbol: [null, 'MidiOctave1'] },
  0x024F: { code: 0x024F, rmk: 'MidiOctave2', symbol: [null, 'MidiOctave2'] },
  0x0250: { code: 0x0250, rmk: 'MidiOctave3', symbol: [null, 'MidiOctave3'] },
  0x0251: { code: 0x0251, rmk: 'MidiOctave4', symbol: [null, 'MidiOctave4'] },
  0x0252: { code: 0x0252, rmk: 'MidiOctave5', symbol: [null, 'MidiOctave5'] },
  0x0253: { code: 0x0253, rmk: 'MidiOctave6', symbol: [null, 'MidiOctave6'] },
  0x0254: { code: 0x0254, rmk: 'MidiOctave7', symbol: [null, 'MidiOctave7'] },
  0x0255: { code: 0x0255, rmk: 'MidiOctaveDOWN', symbol: [null, 'MidiOctaveDOWN'] },
  0x0256: { code: 0x0256, rmk: 'MidiOctaveUP', symbol: [null, 'MidiOctaveUP'] },
  0x0257: { code: 0x0257, rmk: 'MidiTransposeN6', symbol: [null, 'MidiTransposeN6'] },
  0x0258: { code: 0x0258, rmk: 'MidiTransposeN5', symbol: [null, 'MidiTransposeN5'] },
  0x0259: { code: 0x0259, rmk: 'MidiTransposeN4', symbol: [null, 'MidiTransposeN4'] },
  0x025A: { code: 0x025A, rmk: 'MidiTransposeN3', symbol: [null, 'MidiTransposeN3'] },
  0x025B: { code: 0x025B, rmk: 'MidiTransposeN2', symbol: [null, 'MidiTransposeN2'] },
  0x025C: { code: 0x025C, rmk: 'MidiTransposeN1', symbol: [null, 'MidiTransposeN1'] },
  0x025D: { code: 0x025D, rmk: 'MidiTranspose0', symbol: [null, 'MidiTranspose0'] },
  0x025E: { code: 0x025E, rmk: 'MidiTranspose1', symbol: [null, 'MidiTranspose1'] },
  0x025F: { code: 0x025F, rmk: 'MidiTranspose2', symbol: [null, 'MidiTranspose2'] },
  0x0260: { code: 0x0260, rmk: 'MidiTranspose3', symbol: [null, 'MidiTranspose3'] },
  0x0261: { code: 0x0261, rmk: 'MidiTranspose4', symbol: [null, 'MidiTranspose4'] },
  0x0262: { code: 0x0262, rmk: 'MidiTranspose5', symbol: [null, 'MidiTranspose5'] },
  0x0263: { code: 0x0263, rmk: 'MidiTranspose6', symbol: [null, 'MidiTranspose6'] },
  0x0264: { code: 0x0264, rmk: 'MidiTransposeDown', symbol: [null, 'MidiTransposeDown'] },
  0x0265: { code: 0x0265, rmk: 'MidiTransposeUp', symbol: [null, 'MidiTransposeUp'] },
  0x0266: { code: 0x0266, rmk: 'MidiVelocity0', symbol: [null, 'MidiVelocity0'] },
  0x0267: { code: 0x0267, rmk: 'MidiVelocity1', symbol: [null, 'MidiVelocity1'] },
  0x0268: { code: 0x0268, rmk: 'MidiVelocity2', symbol: [null, 'MidiVelocity2'] },
  0x0269: { code: 0x0269, rmk: 'MidiVelocity3', symbol: [null, 'MidiVelocity3'] },
  0x026A: { code: 0x026A, rmk: 'MidiVelocity4', symbol: [null, 'MidiVelocity4'] },
  0x026B: { code: 0x026B, rmk: 'MidiVelocity5', symbol: [null, 'MidiVelocity5'] },
  0x026C: { code: 0x026C, rmk: 'MidiVelocity6', symbol: [null, 'MidiVelocity6'] },
  0x026D: { code: 0x026D, rmk: 'MidiVelocity7', symbol: [null, 'MidiVelocity7'] },
  0x026E: { code: 0x026E, rmk: 'MidiVelocity8', symbol: [null, 'MidiVelocity8'] },
  0x026F: { code: 0x026F, rmk: 'MidiVelocity9', symbol: [null, 'MidiVelocity9'] },
  0x0270: { code: 0x0270, rmk: 'MidiVelocity10', symbol: [null, 'MidiVelocity10'] },
  0x0271: { code: 0x0271, rmk: 'MidiVelocityDOWN', symbol: [null, 'MidiVelocityDOWN'] },
  0x0272: { code: 0x0272, rmk: 'MidiVelocityUP', symbol: [null, 'MidiVelocityUP'] },
  0x0273: { code: 0x0273, rmk: 'MidiChannel1', symbol: [null, 'MidiChannel1'] },
  0x0274: { code: 0x0274, rmk: 'MidiChannel2', symbol: [null, 'MidiChannel2'] },
  0x0275: { code: 0x0275, rmk: 'MidiChannel3', symbol: [null, 'MidiChannel3'] },
  0x0276: { code: 0x0276, rmk: 'MidiChannel4', symbol: [null, 'MidiChannel4'] },
  0x0277: { code: 0x0277, rmk: 'MidiChannel5', symbol: [null, 'MidiChannel5'] },
  0x0278: { code: 0x0278, rmk: 'MidiChannel6', symbol: [null, 'MidiChannel6'] },
  0x0279: { code: 0x0279, rmk: 'MidiChannel7', symbol: [null, 'MidiChannel7'] },
  0x027A: { code: 0x027A, rmk: 'MidiChannel8', symbol: [null, 'MidiChannel8'] },
  0x027B: { code: 0x027B, rmk: 'MidiChannel9', symbol: [null, 'MidiChannel9'] },
  0x027C: { code: 0x027C, rmk: 'MidiChannel10', symbol: [null, 'MidiChannel10'] },
  0x027D: { code: 0x027D, rmk: 'MidiChannel11', symbol: [null, 'MidiChannel11'] },
  0x027E: { code: 0x027E, rmk: 'MidiChannel12', symbol: [null, 'MidiChannel12'] },
  0x027F: { code: 0x027F, rmk: 'MidiChannel13', symbol: [null, 'MidiChannel13'] },
  0x0280: { code: 0x0280, rmk: 'MidiChannel14', symbol: [null, 'MidiChannel14'] },
  0x0281: { code: 0x0281, rmk: 'MidiChannel15', symbol: [null, 'MidiChannel15'] },
  0x0282: { code: 0x0282, rmk: 'MidiChannel16', symbol: [null, 'MidiChannel16'] },
  0x0283: { code: 0x0283, rmk: 'MidiChannelDOWN', symbol: [null, 'MidiChannelDOWN'] },
  0x0284: { code: 0x0284, rmk: 'MidiChannelUP', symbol: [null, 'MidiChannelUP'] },
  0x0285: { code: 0x0285, rmk: 'MidiAllNotesOff', symbol: [null, 'MidiAllNotesOff'] },
  0x0286: { code: 0x0286, rmk: 'MidiSustain', symbol: [null, 'MidiSustain'] },
  0x0287: { code: 0x0287, rmk: 'MidiPortamento', symbol: [null, 'MidiPortamento'] },
  0x0288: { code: 0x0288, rmk: 'MidiSostenuto', symbol: [null, 'MidiSostenuto'] },
  0x0289: { code: 0x0289, rmk: 'MidiSoft', symbol: [null, 'MidiSoft'] },
  0x028A: { code: 0x028A, rmk: 'MidiLegato', symbol: [null, 'MidiLegato'] },
  0x028B: { code: 0x028B, rmk: 'MidiModulation', symbol: [null, 'MidiModulation'] },
  0x028C: { code: 0x028C, rmk: 'MidiModulationSpeedDown', symbol: [null, 'MidiModulationSpeedDown'] },
  0x028D: { code: 0x028D, rmk: 'MidiModulationSpeedUp', symbol: [null, 'MidiModulationSpeedUp'] },
  0x028E: { code: 0x028E, rmk: 'MidiPitchBendDown', symbol: [null, 'MidiPitchBendDown'] },
  0x028F: { code: 0x028F, rmk: 'MidiPitchBendUp', symbol: [null, 'MidiPitchBendUp'] },
  0x0300: { code: 0x0300, rmk: 'SequencerOn', symbol: [null, 'SequencerOn'] },
  0x0301: { code: 0x0301, rmk: 'SequencerOff', symbol: [null, 'SequencerOff'] },
  0x0302: { code: 0x0302, rmk: 'SequencerToggle', symbol: [null, 'SequencerToggle'] },
  0x0303: { code: 0x0303, rmk: 'SequencerTempoDown', symbol: [null, 'SequencerTempoDown'] },
  0x0304: { code: 0x0304, rmk: 'SequencerTempoUp', symbol: [null, 'SequencerTempoUp'] },
  0x0305: { code: 0x0305, rmk: 'SequencerResolutionDown', symbol: [null, 'SequencerResolutionDown'] },
  0x0306: { code: 0x0306, rmk: 'SequencerResolutionUp', symbol: [null, 'SequencerResolutionUp'] },
  0x0307: { code: 0x0307, rmk: 'SequencerStepsAll', symbol: [null, 'SequencerStepsAll'] },
  0x0308: { code: 0x0308, rmk: 'SequencerStepsClear', symbol: [null, 'SequencerStepsClear'] },
  0x7400: { code: 0x7400, rmk: 'Joy-BT0', symbol: [null, 'Joy-BT0'] },
  0x7401: { code: 0x7401, rmk: 'Joy-BT1', symbol: [null, 'Joy-BT1'] },
  0x7402: { code: 0x7402, rmk: 'Joy-BT2', symbol: [null, 'Joy-BT2'] },
  0x7403: { code: 0x7403, rmk: 'Joy-BT3', symbol: [null, 'Joy-BT3'] },
  0x7404: { code: 0x7404, rmk: 'Joy-BT4', symbol: [null, 'Joy-BT4'] },
  0x7405: { code: 0x7405, rmk: 'Joy-BT5', symbol: [null, 'Joy-BT5'] },
  0x7406: { code: 0x7406, rmk: 'Joy-BT6', symbol: [null, 'Joy-BT6'] },
  0x7407: { code: 0x7407, rmk: 'Joy-BT7', symbol: [null, 'Joy-BT7'] },
  0x7408: { code: 0x7408, rmk: 'Joy-BT8', symbol: [null, 'Joy-BT8'] },
  0x7409: { code: 0x7409, rmk: 'Joy-BT9', symbol: [null, 'Joy-BT9'] },
  0x740A: { code: 0x740A, rmk: 'Joy-BT10', symbol: [null, 'Joy-BT10'] },
  0x740B: { code: 0x740B, rmk: 'Joy-BT11', symbol: [null, 'Joy-BT11'] },
  0x740C: { code: 0x740C, rmk: 'Joy-BT12', symbol: [null, 'Joy-BT12'] },
  0x740D: { code: 0x740D, rmk: 'Joy-BT13', symbol: [null, 'Joy-BT13'] },
  0x740E: { code: 0x740E, rmk: 'Joy-BT14', symbol: [null, 'Joy-BT14'] },
  0x740F: { code: 0x740F, rmk: 'Joy-BT15', symbol: [null, 'Joy-BT15'] },
  0x7410: { code: 0x7410, rmk: 'Joy-BT16', symbol: [null, 'Joy-BT16'] },
  0x7411: { code: 0x7411, rmk: 'Joy-BT17', symbol: [null, 'Joy-BT17'] },
  0x7412: { code: 0x7412, rmk: 'Joy-BT18', symbol: [null, 'Joy-BT18'] },
  0x7413: { code: 0x7413, rmk: 'Joy-BT19', symbol: [null, 'Joy-BT19'] },
  0x7414: { code: 0x7414, rmk: 'Joy-BT20', symbol: [null, 'Joy-BT20'] },
  0x7415: { code: 0x7415, rmk: 'Joy-BT21', symbol: [null, 'Joy-BT21'] },
  0x7416: { code: 0x7416, rmk: 'Joy-BT22', symbol: [null, 'Joy-BT22'] },
  0x7417: { code: 0x7417, rmk: 'Joy-BT23', symbol: [null, 'Joy-BT23'] },
  0x7418: { code: 0x7418, rmk: 'Joy-BT24', symbol: [null, 'Joy-BT24'] },
  0x7419: { code: 0x7419, rmk: 'Joy-BT25', symbol: [null, 'Joy-BT25'] },
  0x741A: { code: 0x741A, rmk: 'Joy-BT26', symbol: [null, 'Joy-BT26'] },
  0x741B: { code: 0x741B, rmk: 'Joy-BT27', symbol: [null, 'Joy-BT27'] },
  0x741C: { code: 0x741C, rmk: 'Joy-BT28', symbol: [null, 'Joy-BT28'] },
  0x741D: { code: 0x741D, rmk: 'Joy-BT29', symbol: [null, 'Joy-BT29'] },
  0x741E: { code: 0x741E, rmk: 'Joy-BT30', symbol: [null, 'Joy-BT30'] },
  0x741F: { code: 0x741F, rmk: 'Joy-BT31', symbol: [null, 'Joy-BT31'] },
  0x7420: { code: 0x7420, rmk: 'ProgrammableButton1', symbol: [null, 'ProgrammableButton1'] },
  0x7421: { code: 0x7421, rmk: 'ProgrammableButton2', symbol: [null, 'ProgrammableButton2'] },
  0x7422: { code: 0x7422, rmk: 'ProgrammableButton3', symbol: [null, 'ProgrammableButton3'] },
  0x7423: { code: 0x7423, rmk: 'ProgrammableButton4', symbol: [null, 'ProgrammableButton4'] },
  0x7424: { code: 0x7424, rmk: 'ProgrammableButton5', symbol: [null, 'ProgrammableButton5'] },
  0x7425: { code: 0x7425, rmk: 'ProgrammableButton6', symbol: [null, 'ProgrammableButton6'] },
  0x7426: { code: 0x7426, rmk: 'ProgrammableButton7', symbol: [null, 'ProgrammableButton7'] },
  0x7427: { code: 0x7427, rmk: 'ProgrammableButton8', symbol: [null, 'ProgrammableButton8'] },
  0x7428: { code: 0x7428, rmk: 'ProgrammableButton9', symbol: [null, 'ProgrammableButton9'] },
  0x7429: { code: 0x7429, rmk: 'ProgrammableButton10', symbol: [null, 'ProgrammableButton10'] },
  0x742A: { code: 0x742A, rmk: 'ProgrammableButton11', symbol: [null, 'ProgrammableButton11'] },
  0x742B: { code: 0x742B, rmk: 'ProgrammableButton12', symbol: [null, 'ProgrammableButton12'] },
  0x742C: { code: 0x742C, rmk: 'ProgrammableButton13', symbol: [null, 'ProgrammableButton13'] },
  0x742D: { code: 0x742D, rmk: 'ProgrammableButton14', symbol: [null, 'ProgrammableButton14'] },
  0x742E: { code: 0x742E, rmk: 'ProgrammableButton15', symbol: [null, 'ProgrammableButton15'] },
  0x742F: { code: 0x742F, rmk: 'ProgrammableButton16', symbol: [null, 'ProgrammableButton16'] },
  0x7430: { code: 0x7430, rmk: 'ProgrammableButton17', symbol: [null, 'ProgrammableButton17'] },
  0x7431: { code: 0x7431, rmk: 'ProgrammableButton18', symbol: [null, 'ProgrammableButton18'] },
  0x7432: { code: 0x7432, rmk: 'ProgrammableButton19', symbol: [null, 'ProgrammableButton19'] },
  0x7433: { code: 0x7433, rmk: 'ProgrammableButton20', symbol: [null, 'ProgrammableButton20'] },
  0x7434: { code: 0x7434, rmk: 'ProgrammableButton21', symbol: [null, 'ProgrammableButton21'] },
  0x7435: { code: 0x7435, rmk: 'ProgrammableButton22', symbol: [null, 'ProgrammableButton22'] },
  0x7436: { code: 0x7436, rmk: 'ProgrammableButton23', symbol: [null, 'ProgrammableButton23'] },
  0x7437: { code: 0x7437, rmk: 'ProgrammableButton24', symbol: [null, 'ProgrammableButton24'] },
  0x7438: { code: 0x7438, rmk: 'ProgrammableButton25', symbol: [null, 'ProgrammableButton25'] },
  0x7439: { code: 0x7439, rmk: 'ProgrammableButton26', symbol: [null, 'ProgrammableButton26'] },
  0x743A: { code: 0x743A, rmk: 'ProgrammableButton27', symbol: [null, 'ProgrammableButton27'] },
  0x743B: { code: 0x743B, rmk: 'ProgrammableButton28', symbol: [null, 'ProgrammableButton28'] },
  0x743C: { code: 0x743C, rmk: 'ProgrammableButton29', symbol: [null, 'ProgrammableButton29'] },
  0x743D: { code: 0x743D, rmk: 'ProgrammableButton30', symbol: [null, 'ProgrammableButton30'] },
  0x743E: { code: 0x743E, rmk: 'ProgrammableButton31', symbol: [null, 'ProgrammableButton31'] },
  0x743F: { code: 0x743F, rmk: 'ProgrammableButton32', symbol: [null, 'ProgrammableButton32'] },
  0x7460: { code: 0x7460, rmk: 'AudioOn', symbol: [null, 'AudioOn'] },
  0x7461: { code: 0x7461, rmk: 'AudioOff', symbol: [null, 'AudioOff'] },
  0x7462: { code: 0x7462, rmk: 'AudioToggle', symbol: [null, 'AudioToggle'] },
  0x746A: { code: 0x746A, rmk: 'AudioClickyToggle', symbol: [null, 'AudioClickyToggle'] },
  0x746B: { code: 0x746B, rmk: 'AudioClickyOn', symbol: [null, 'AudioClickyOn'] },
  0x746C: { code: 0x746C, rmk: 'AudioClickyOff', symbol: [null, 'AudioClickyOff'] },
  0x746D: { code: 0x746D, rmk: 'AudioClickyUp', symbol: [null, 'AudioClickyUp'] },
  0x746E: { code: 0x746E, rmk: 'AudioClickyDown', symbol: [null, 'AudioClickyDown'] },
  0x746F: { code: 0x746F, rmk: 'AudioClickyReset', symbol: [null, 'AudioClickyReset'] },
  0x7470: { code: 0x7470, rmk: 'MusicOn', symbol: [null, 'MusicOn'] },
  0x7471: { code: 0x7471, rmk: 'MusicOff', symbol: [null, 'MusicOff'] },
  0x7472: { code: 0x7472, rmk: 'MusicToggle', symbol: [null, 'MusicToggle'] },
  0x7473: { code: 0x7473, rmk: 'MusicModeNext', symbol: [null, 'MusicModeNext'] },
  0x7474: { code: 0x7474, rmk: 'AudioVoiceNext', symbol: [null, 'AudioVoiceNext'] },
  0x7475: { code: 0x7475, rmk: 'AudioVoicePrevious', symbol: [null, 'AudioVoicePrevious'] },
  0x74F0: { code: 0x74F0, rmk: 'StenoBolt', symbol: [null, 'StenoBolt'] },
  0x74F1: { code: 0x74F1, rmk: 'StenoGemini', symbol: [null, 'StenoGemini'] },
  0x74F2: { code: 0x74F2, rmk: 'StenoComb', symbol: [null, 'StenoComb'] },
  0x74FC: { code: 0x74FC, rmk: 'StenoCombMax', symbol: [null, 'StenoCombMax'] },
  0x0600: { code: 0x0600, rmk: 'BacklightOn', symbol: [null, 'BL On'] },
  0x0601: { code: 0x0601, rmk: 'BacklightOff', symbol: [null, 'BL Off'] },
  0x0602: { code: 0x0602, rmk: 'BacklightToggle', symbol: [null, 'BL\nToggle'] },
  0x0603: { code: 0x0603, rmk: 'BacklightDown', symbol: [null, 'BL -'] },
  0x0604: { code: 0x0604, rmk: 'BacklightUp', symbol: [null, 'BL +'] },
  0x0605: { code: 0x0605, rmk: 'BacklightStep', symbol: [null, 'BL\nCycle'] },
  0x0606: { code: 0x0606, rmk: 'BacklightToggleBreathing', symbol: [null, 'BL\nBreath'] },
  0x0620: { code: 0x0620, rmk: 'RgbTog', symbol: [null, 'RGB\nToggle'] },
  0x0621: { code: 0x0621, rmk: 'RgbModeForward', symbol: [null, 'RGB\nMode +'] },
  0x0622: { code: 0x0622, rmk: 'RgbModeReverse', symbol: [null, 'RGB\nMode -'] },
  0x0623: { code: 0x0623, rmk: 'RgbHui', symbol: [null, 'Hue +'] },
  0x0624: { code: 0x0624, rmk: 'RgbHud', symbol: [null, 'Hue -'] },
  0x0625: { code: 0x0625, rmk: 'RgbSai', symbol: [null, 'Sat +'] },
  0x0626: { code: 0x0626, rmk: 'RgbSad', symbol: [null, 'Sat -'] },
  0x0627: { code: 0x0627, rmk: 'RgbVai', symbol: [null, 'Bright +'] },
  0x0628: { code: 0x0628, rmk: 'RgbVad', symbol: [null, 'Bright -'] },
  0x0629: { code: 0x0629, rmk: 'RgbSpi', symbol: [null, 'Effect +'] },
  0x062A: { code: 0x062A, rmk: 'RgbSpd', symbol: [null, 'Effect -'] },
  0x062B: { code: 0x062B, rmk: 'RgbModePlain', symbol: [null, 'RGB\nMode P'] },
  0x062C: { code: 0x062C, rmk: 'RgbModeBreathe', symbol: [null, 'RGB\nMode B'] },
  0x062D: { code: 0x062D, rmk: 'RgbModeRainbow', symbol: [null, 'RGB\nMode R'] },
  0x062E: { code: 0x062E, rmk: 'RgbModeSwirl', symbol: [null, 'RGB\nMode SW'] },
  0x062F: { code: 0x062F, rmk: 'RgbModeSnake', symbol: [null, 'RGB\nMode SN'] },
  0x0630: { code: 0x0630, rmk: 'RgbModeKnight', symbol: [null, 'RGB\nMode K'] },
  0x0631: { code: 0x0631, rmk: 'RgbModeXmas', symbol: [null, 'RGB\nMode X'] },
  0x0632: { code: 0x0632, rmk: 'RgbModeGradient', symbol: [null, 'RGB\nMode G'] },
  0x0633: { code: 0x0633, rmk: 'RgbModeRgbtest', symbol: [null, 'RGB\nMode T'] },
  0x0634: { code: 0x0634, rmk: 'RgbModeTwinkle', symbol: [null, 'RGB\nMode TW'] },
  0x0700: { code: 0x0700, rmk: 'Bootloader', symbol: [null, 'Boot-\nloader'] },
  0x0701: { code: 0x0701, rmk: 'Reboot', symbol: [null, 'Reboot'] },
  0x0702: { code: 0x0702, rmk: 'DebugToggle', symbol: [null, 'Debug\nToggle'] },
  0x0703: { code: 0x0703, rmk: 'ClearEeprom', symbol: [null, 'Clear\nEEPROM'] },
  0x0704: { code: 0x0704, rmk: 'Make', symbol: [null, 'Make'] },
  0x0710: { code: 0x0710, rmk: 'AutoShiftDown', symbol: [null, 'Auto-\nshift\nDown'] },
  0x0711: { code: 0x0711, rmk: 'AutoShiftUp', symbol: [null, 'Auto-\nshift\nUp'] },
  0x0712: { code: 0x0712, rmk: 'AutoShiftReport', symbol: [null, 'Auto-\nshift\nReport'] },
  0x0713: { code: 0x0713, rmk: 'AutoShiftOn', symbol: [null, 'Auto-\nshift\nOn'] },
  0x0714: { code: 0x0714, rmk: 'AutoShiftOff', symbol: [null, 'Auto-\nshift\nOff'] },
  0x0715: { code: 0x0715, rmk: 'AutoShiftToggle', symbol: [null, 'Auto-\nshift\nToggle'] },
  0x0716: { code: 0x0716, rmk: 'GraveEscape', symbol: [null, '~\nEsc'] },
  0x0717: { code: 0x0717, rmk: 'VelocikeyToggle', symbol: [null, 'Velocikey\nToggle'] },
  0x0718: { code: 0x0718, rmk: 'SpaceCadetLCtrlParenthesisOpen', symbol: [null, 'LC\n('] },
  0x0719: { code: 0x0719, rmk: 'SpaceCadetRCtrlParenthesisClose', symbol: [null, 'RC\n)'] },
  0x071A: { code: 0x071A, rmk: 'SpaceCadetLShiftParenthesisOpen', symbol: [null, 'LS\n('] },
  0x071B: { code: 0x071B, rmk: 'SpaceCadetRShiftParenthesisClose', symbol: [null, 'RS\n)'] },
  0x071C: { code: 0x071C, rmk: 'SpaceCadetLAltParenthesisOpen', symbol: [null, 'LA\n('] },
  0x071D: { code: 0x071D, rmk: 'SpaceCadetRAltParenthesisClose', symbol: [null, 'RA\n)'] },
  0x071E: { code: 0x071E, rmk: 'SpaceCadetRShiftEnter', symbol: [null, 'SpaceCadetRShiftEnter'] },
  0x0720: { code: 0x0720, rmk: 'OutputAuto', symbol: [null, 'OutputAuto'] },
  0x0721: { code: 0x0721, rmk: 'OutputUsb', symbol: [null, 'OutputUsb'] },
  0x0722: { code: 0x0722, rmk: 'OutputBluetooth', symbol: [null, 'OutputBluetooth'] },
  0x0730: { code: 0x0730, rmk: 'UnicodeModeNext', symbol: [null, 'UnicodeModeNext'] },
  0x0731: { code: 0x0731, rmk: 'UnicodeModePrevious', symbol: [null, 'UnicodeModePrevious'] },
  0x0732: { code: 0x0732, rmk: 'UnicodeModeMacos', symbol: [null, 'UnicodeModeMacos'] },
  0x0733: { code: 0x0733, rmk: 'UnicodeModeLinux', symbol: [null, 'UnicodeModeLinux'] },
  0x0734: { code: 0x0734, rmk: 'UnicodeModeWindows', symbol: [null, 'UnicodeModeWindows'] },
  0x0735: { code: 0x0735, rmk: 'UnicodeModeBsd', symbol: [null, 'UnicodeModeBsd'] },
  0x0736: { code: 0x0736, rmk: 'UnicodeModeWincompose', symbol: [null, 'UnicodeModeWincompose'] },
  0x0737: { code: 0x0737, rmk: 'UnicodeModeEmacs', symbol: [null, 'UnicodeModeEmacs'] },
  0x0740: { code: 0x0740, rmk: 'HapticOn', symbol: [null, 'HapticOn'] },
  0x0741: { code: 0x0741, rmk: 'HapticOff', symbol: [null, 'HapticOff'] },
  0x0742: { code: 0x0742, rmk: 'HapticToggle', symbol: [null, 'HapticToggle'] },
  0x0743: { code: 0x0743, rmk: 'HapticReset', symbol: [null, 'HapticReset'] },
  0x0744: { code: 0x0744, rmk: 'HapticFeedbackToggle', symbol: [null, 'HapticFeedbackToggle'] },
  0x0745: { code: 0x0745, rmk: 'HapticBuzzToggle', symbol: [null, 'HapticBuzzToggle'] },
  0x0746: { code: 0x0746, rmk: 'HapticModeNext', symbol: [null, 'HapticModeNext'] },
  0x0747: { code: 0x0747, rmk: 'HapticModePrevious', symbol: [null, 'HapticModePrevious'] },
  0x0748: { code: 0x0748, rmk: 'HapticContinuousToggle', symbol: [null, 'HapticContinuousToggle'] },
  0x0749: { code: 0x0749, rmk: 'HapticContinuousUp', symbol: [null, 'HapticContinuousUp'] },
  0x074A: { code: 0x074A, rmk: 'HapticContinuousDown', symbol: [null, 'HapticContinuousDown'] },
  0x074B: { code: 0x074B, rmk: 'HapticDwellUp', symbol: [null, 'HapticDwellUp'] },
  0x074C: { code: 0x074C, rmk: 'HapticDwellDown', symbol: [null, 'HapticDwellDown'] },
  0x0750: { code: 0x0750, rmk: 'ComboOn', symbol: [null, 'Combo\nOn'] },
  0x0751: { code: 0x0751, rmk: 'ComboOff', symbol: [null, 'Combo\nOff'] },
  0x0752: { code: 0x0752, rmk: 'ComboToggle', symbol: [null, 'Combo\nToggle'] },
  0x0753: { code: 0x0753, rmk: 'DynamicMacroRecordStart1', symbol: [null, 'DM1\nRec'] },
  0x0754: { code: 0x0754, rmk: 'DynamicMacroRecordStart2', symbol: [null, 'DM2\nRec'] },
  0x0755: { code: 0x0755, rmk: 'DynamicMacroRecordStop', symbol: [null, 'DM Rec\nStop'] },
  0x0756: { code: 0x0756, rmk: 'DynamicMacroPlay1', symbol: [null, 'DM1\nPlay'] },
  0x0757: { code: 0x0757, rmk: 'DynamicMacroPlay2', symbol: [null, 'DM2\nPlay'] },
  0x0758: { code: 0x0758, rmk: 'Leader', symbol: [null, 'Leader'] },
  0x0759: { code: 0x0759, rmk: 'Lock', symbol: [null, 'Lock'] },
  0x075A: { code: 0x075A, rmk: 'OneShotOn', symbol: [null, 'OneShotOn'] },
  0x075B: { code: 0x075B, rmk: 'OneShotOff', symbol: [null, 'OneShotOff'] },
  0x075C: { code: 0x075C, rmk: 'OneShotToggle', symbol: [null, 'OneShotToggle'] },
  0x075D: { code: 0x075D, rmk: 'KeyOverrideToggle', symbol: [null, 'KeyOverrideToggle'] },
  0x075E: { code: 0x075E, rmk: 'KeyOverrideOn', symbol: [null, 'KeyOverrideOn'] },
  0x075F: { code: 0x075F, rmk: 'KeyOverrideOff', symbol: [null, 'KeyOverrideOff'] },
  0x0760: { code: 0x0760, rmk: 'SecureLock', symbol: [null, 'SecureLock'] },
  0x0761: { code: 0x0761, rmk: 'SecureUnlock', symbol: [null, 'SecureUnlock'] },
  0x0762: { code: 0x0762, rmk: 'SecureToggle', symbol: [null, 'SecureToggle'] },
  0x0763: { code: 0x0763, rmk: 'SecureRequest', symbol: [null, 'SecureRequest'] },
  0x0770: { code: 0x0770, rmk: 'DynamicTappingTermPrint', symbol: [null, 'DynamicTappingTermPrint'] },
  0x0771: { code: 0x0771, rmk: 'DynamicTappingTermUp', symbol: [null, 'DynamicTappingTermUp'] },
  0x0772: { code: 0x0772, rmk: 'DynamicTappingTermDown', symbol: [null, 'DynamicTappingTermDown'] },
  0x0773: { code: 0x0773, rmk: 'CapsWordToggle', symbol: [null, 'CapsWordToggle'] },
  0x0774: { code: 0x0774, rmk: 'AutocorrectOn', symbol: [null, 'AutocorrectOn'] },
  0x0775: { code: 0x0775, rmk: 'AutocorrectOff', symbol: [null, 'AutocorrectOff'] },
  0x0776: { code: 0x0776, rmk: 'AutocorrectToggle', symbol: [null, 'AutocorrectToggle'] },
  0x0777: { code: 0x0777, rmk: 'TriLayerLower', symbol: [null, 'TriLayerLower'] },
  0x0778: { code: 0x0778, rmk: 'TriLayerUpper', symbol: [null, 'TriLayerUpper'] },
  0x0779: { code: 0x0779, rmk: 'RepeatKey', symbol: [null, 'RepeatKey'] },
  0x077A: { code: 0x077A, rmk: 'AltRepeatKey', symbol: [null, 'AltRepeatKey'] },
  0x4000: { code: 0x4000, rmk: 'LT0(kc)', symbol: ['LT0', null] },
  0x4100: { code: 0x4100, rmk: 'LT1(kc)', symbol: ['LT1', null] },
  0x4200: { code: 0x4200, rmk: 'LT2(kc)', symbol: ['LT2', null] },
  0x4300: { code: 0x4300, rmk: 'LT3(kc)', symbol: ['LT3', null] },
  0x4400: { code: 0x4400, rmk: 'LT4(kc)', symbol: ['LT4', null] },
  0x4500: { code: 0x4500, rmk: 'LT5(kc)', symbol: ['LT5', null] },
  0x4600: { code: 0x4600, rmk: 'LT6(kc)', symbol: ['LT6', null] },
  0x4700: { code: 0x4700, rmk: 'LT7(kc)', symbol: ['LT7', null] },
  0x4800: { code: 0x4800, rmk: 'LT8(kc)', symbol: ['LT8', null] },
  0x4900: { code: 0x4900, rmk: 'LT9(kc)', symbol: ['LT9', null] },
  0x4A00: { code: 0x4A00, rmk: 'LT10(kc)', symbol: ['LT10', null] },
  0x4B00: { code: 0x4B00, rmk: 'LT11(kc)', symbol: ['LT11', null] },
  0x4C00: { code: 0x4C00, rmk: 'LT12(kc)', symbol: ['LT12', null] },
  0x4D00: { code: 0x4D00, rmk: 'LT13(kc)', symbol: ['LT13', null] },
  0x4E00: { code: 0x4E00, rmk: 'LT14(kc)', symbol: ['LT14', null] },
  0x4F00: { code: 0x4F00, rmk: 'LT15(kc)', symbol: ['LT15', null] },
  0x2100: { code: 0x2100, rmk: 'MT(LCtrl, kc)', symbol: ['MT(LCtrl)', null] },
  0x3100: { code: 0x3100, rmk: 'MT(RCtrl, kc)', symbol: ['MT(RCtrl)', null] },
  0x2200: { code: 0x2200, rmk: 'MT(LShift, kc)', symbol: ['MT(LSft)', null] },
  0x3200: { code: 0x3200, rmk: 'MT(RShift, kc)', symbol: ['MT(RSft)', null] },
  0x2400: { code: 0x2400, rmk: 'MT(LAlt, kc)', symbol: ['MT(LAlt)', null] },
  0x3400: { code: 0x3400, rmk: 'MT(RAlt, kc)', symbol: ['MT(RAlt)', null] },
  0x2800: { code: 0x2800, rmk: 'MT(LGui, kc)', symbol: ['MT(LGui)', null] },
  0x3800: { code: 0x3800, rmk: 'MT(RGui, kc)', symbol: ['MT(RGui)', null] },
}

export function keyToInfo(key: number): KeyInfo {
  if (keyCodeMap[key])
    return keyCodeMap[key]

  // 处理 TO 键 (0x5200 - 0x521F)
  if (key >= 0x5200 && key <= 0x521F) {
    const idx = key - 0x5200
    return {
      code: key,
      rmk: `TO(${idx})`,
      symbol: [null, `TO(${idx})`],
    }
  }

  // 处理 MO 键 (0x5220 - 0x523F)
  if (key >= 0x5220 && key <= 0x523F) {
    const idx = key - 0x5220
    return {
      code: key,
      rmk: `MO(${idx})`,
      symbol: [null, `MO(${idx})`],
    }
  }

  // 处理 DF 键 (0x5240 - 0x525F)
  if (key >= 0x5240 && key <= 0x525F) {
    const idx = key - 0x5240
    return {
      code: key,
      rmk: `DF(${idx})`,
      symbol: [null, `DF(${idx})`],
    }
  }

  // 处理 TG 键 (0x5260 - 0x527F)
  if (key >= 0x5260 && key <= 0x527F) {
    const idx = key - 0x5260
    return {
      code: key,
      rmk: `TG(${idx})`,
      symbol: [null, `TG(${idx})`],
    }
  }

  // 处理 OSL 键 (0x5280 - 0x529F)
  if (key >= 0x5280 && key <= 0x529F) {
    const idx = key - 0x5280
    return {
      code: key,
      rmk: `OSL(${idx})`,
      symbol: [null, `OSL(${idx})`],
    }
  }

  // 处理 TT 键 (0x52C0 - 0x52DF)
  if (key >= 0x52C0 && key <= 0x52DF) {
    const idx = key - 0x52C0
    return {
      code: key,
      rmk: `TT(${idx})`,
      symbol: [null, `TT(${idx})`],
    }
  }

  // 处理 PDF 键 (0x52E0 - 0x52FF)
  if (key >= 0x52E0 && key <= 0x52FF) {
    const idx = key - 0x52E0
    return {
      code: key,
      rmk: `PDF(${idx})`,
      symbol: [null, `PDF(${idx})`],
    }
  }

  // 处理 TapDance 键 (0x5700 - 0x57FF)
  if (key >= 0x5700 && key <= 0x57FF) {
    const idx = key - 0x5700
    return {
      code: key,
      rmk: `TD(${idx})`,
      symbol: [null, `TD(${idx})`],
    }
  }

  // 处理 Macro 键 (0x7700 - 0x77FF)
  if (key >= 0x7700 && key <= 0x77FF) {
    const idx = key - 0x7700
    return {
      code: key,
      rmk: `M${idx}`,
      symbol: [null, `M${idx}`],
    }
  }

  // 处理 User 键 (0x7E00 - 0x7E3F)
  if (key >= 0x7E00 && key <= 0x7E3F) {
    const idx = key - 0x7E00
    return {
      code: key,
      rmk: `User${idx}`,
      symbol: [null, `User${idx}`],
    }
  }

  const baseInfo = keyCodeMap[key & 0xFF00]
  if (baseInfo) {
    if (!baseInfo.symbol[0] || !baseInfo.rmk.includes('kc'))
      return baseInfo

    const subKeyInfo = keyCodeMap[key & 0x00FF]
    if (subKeyInfo) {
      return {
        ...baseInfo,
        symbol: [
          baseInfo.symbol[0],
          subKeyInfo.symbol[1],
        ],
      }
    }
    return baseInfo
  }

  // 当没有找到对应键码时，返回十六进制键值
  const hexCode = `0x${key.toString(16).toUpperCase().padStart(4, '0')}`
  return {
    code: key,
    rmk: hexCode,
    symbol: [null, hexCode],
  }
}

export function keyToLable(key: number): [string | null, string | null] {
  const info = keyToInfo(key)
  return info.symbol
}

export function keyToRmk(key: number): string {
  const info = keyToInfo(key)
  return info.rmk
}

// QMK 键码相关功能

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
  { code: 0x01, name: '▽', desc: 'Transparent' },
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
  { code: 0x5220, name: 'MO(0)', desc: 'Momentary Layer 0' },
  { code: 0x5221, name: 'MO(1)', desc: 'Momentary Layer 1' },
  { code: 0x5222, name: 'MO(2)', desc: 'Momentary Layer 2' },
  { code: 0x5223, name: 'MO(3)', desc: 'Momentary Layer 3' },
  { code: 0x5224, name: 'MO(4)', desc: 'Momentary Layer 4' },
  { code: 0x5225, name: 'MO(5)', desc: 'Momentary Layer 5' },
  { code: 0x5226, name: 'MO(6)', desc: 'Momentary Layer 6' },
  { code: 0x5227, name: 'MO(7)', desc: 'Momentary Layer 7' },

  // Toggle layer
  { code: 0x5260, name: 'TG(0)', desc: 'Toggle Layer 0' },
  { code: 0x5261, name: 'TG(1)', desc: 'Toggle Layer 1' },
  { code: 0x5262, name: 'TG(2)', desc: 'Toggle Layer 2' },
  { code: 0x5263, name: 'TG(3)', desc: 'Toggle Layer 3' },
  { code: 0x5264, name: 'TG(4)', desc: 'Toggle Layer 4' },
  { code: 0x5265, name: 'TG(5)', desc: 'Toggle Layer 5' },
  { code: 0x5266, name: 'TG(6)', desc: 'Toggle Layer 6' },
  { code: 0x5267, name: 'TG(7)', desc: 'Toggle Layer 7' },

  // Default layer
  { code: 0x5240, name: 'DF(0)', desc: 'Default Layer 0' },
  { code: 0x5241, name: 'DF(1)', desc: 'Default Layer 1' },
  { code: 0x5242, name: 'DF(2)', desc: 'Default Layer 2' },
  { code: 0x5243, name: 'DF(3)', desc: 'Default Layer 3' },
  { code: 0x5244, name: 'DF(4)', desc: 'Default Layer 4' },
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

/**
 * 过滤键码建议（返回包含简短标签的键码信息）
 */
export interface KeycodeSuggestion {
  name: string  // 显示名称（下划线分隔的大写形式）
  originalName: string  // 原始名称（驼峰命名）
  code: number
  shortLabel: string | null
}

/**
 * 将驼峰命名转换为下划线分隔的大写形式
 */
function camelToSnakeUpperCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
}

export function filterKeycodeSuggestions(input: string): KeycodeSuggestion[] {
  const normalizedInput = input.toLowerCase()
  if (!normalizedInput) {
    return []
  }
  return ALL_KEYCODES
    .filter(kc => kc.name.toLowerCase().includes(normalizedInput))
    .slice(0, 20)
    .map((kc) => {
      const keyInfo = keyToInfo(kc.code)
      const shortLabel = keyInfo?.symbol[1] ?? null
      // 转换为 vial-gui 风格的命名：下划线分隔的大写形式
      const displayName = camelToSnakeUpperCase(kc.name)
      return {
        name: displayName,
        originalName: kc.name,
        code: kc.code,
        shortLabel,
      }
    })
}
