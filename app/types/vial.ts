export type IndexMap = StringMap<[number, number, number], number>

export interface VialInterface {
  productName: () => Promise<string>
  layerCount: () => Promise<number>
  marcoCount: () => Promise<number>
  vialJson: () => Promise<VialJson>
  kleDefinition: (vialJson: VialJson) => InstanceType<typeof KleBoard>
  keymap: (layer: number, rows: number, cols: number) => Promise<IndexMap>
  layoutKeymap: (
    layout: InstanceType<typeof KleBoard>,
    keymap: IndexMap,
    layerCount: number
  ) => IndexMap
  macros: (count: number) => Promise<Array<Array<MacroAction>>>
  setMacros: (macros: Array<Array<MacroAction>>, count: number) => Promise<void>
  setKeycode: (lyrRowCol: [number, number, number], keycode: number) => Promise<void>
  encoderKeycode: (layer: number, encoderIdx: number, direction: EncoderDirection) => Promise<number>
  setEncoderKeycode: (layer: number, encoderIdx: number, direction: EncoderDirection, keycode: number) => Promise<void>
  // QMK RGBLight
  getQmkRgblightConfig: () => Promise<{ mode: number, hue: number, sat: number, brightness: number, speed: number }>
  setQmkRgblightMode: (mode: number) => Promise<void>
  setQmkRgblightBrightness: (brightness: number) => Promise<void>
  setQmkRgblightSpeed: (speed: number) => Promise<void>
  setQmkRgblightColor: (hue: number, sat: number) => Promise<void>
  // VialRGB
  getVialrgbConfig: () => Promise<{ mode: number, hue: number, sat: number, val: number, speed: number }>
  setVialrgbConfig: (mode: number, speed: number, h: number, s: number, v: number) => Promise<void>
  // Generic RGB save
  saveRgb: () => Promise<void>
  // Reset functions
  resetKeyboard: () => Promise<void>
  restartKeyboard: () => Promise<void>
  enterBootloader: () => Promise<void>
}

export interface CustomKeycode {
  name: string
  title: string
  shortName: string
}

export type KeymapItem
  = | string
    | {
      r?: number
      rx?: number
      ry?: number
      x?: number
      y?: number
      w?: number
      h?: number
    }

export interface Layout {
  keymap: KeymapItem[][]
}

export interface Key {
  geometry: {
    x: number
    y: number
    width: number
    height: number
    x2: number
    y2: number
    width2: number
    height2: number
    rotation_x: number
    rotation_y: number
    rotation_angle: number
  }
  position: {
    row: number
    col: number
  }
  info: {
    code: number
    symbol: [string | null, string | null]
  }
}

export type EncoderDirection = 'ccw' | 'cw'

export interface EncoderBinding {
  encoder: number
  direction: EncoderDirection
  position: {
    row: number
    col: number
  }
  info: {
    code: number
    symbol: [string | null, string | null]
  }
}

export interface Encoder {
  index: number
  ccw: EncoderBinding | null
  cw: EncoderBinding | null
}

export interface VialJson {
  name: string
  vendorId: string
  productId: string
  lighting: string
  matrix: {
    rows: number
    cols: number
  }
  customKeycodes: CustomKeycode[]
  layouts: Layout
}
