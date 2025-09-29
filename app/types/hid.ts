export interface HIDInterface {
  isConnected: () => boolean
  productName: () => Promise<string>
  write: (data: number[]) => Promise<void>
  read: () => Promise<Uint8Array>
  writeRead: (data: number[]) => Promise<Uint8Array>
  disconnect: () => Promise<void>
}

export interface HIDApi {
  listDevices: () => Promise<any[]>
  connectDevice: (device: any) => Promise<HIDInterface>
}
