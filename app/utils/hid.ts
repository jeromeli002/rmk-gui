export class WebHIDApi implements HIDApi {
  async listDevices(): Promise<any[]> {
    return navigator.hid.requestDevice({
      filters: [VialConstants.HIDFilter],
    })
  }

  async connectDevice(device: HIDDevice): Promise<HIDInterface> {
    if (!device)
      throw new Error('No device provided')
    await device.open()
    return new WebHIDDevice(device)
  }
}

export class WebHIDDevice implements HIDInterface {
  private pendingRequests: Array<{ resolve: (value: Uint8Array) => void, reject: (reason: any) => void }> = []

  constructor(private device: HIDDevice) {
    this.device.addEventListener('inputreport', this.handleInputReport)
  }

  private handleInputReport = (event: HIDInputReportEvent): void => {
    if (event.reportId !== 0) {
      return
    }
    if (this.pendingRequests.length === 0) {
      return
    }

    const data = new Uint8Array(event.data.buffer)
    const request = this.pendingRequests.shift()

    if (request) {
      request.resolve(data)
    }
  }

  isConnected(): boolean {
    return this.device?.opened || false
  }

  async productName(): Promise<string> {
    return this.device.productName || 'Unknown WebHID Device'
  }

  async write(data: number[]): Promise<void> {
    if (!this.isConnected())
      throw new Error('Device not connected')

    await this.device.sendReport(0, new Uint8Array(data))
  }

  async read(): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      this.pendingRequests.push({ resolve, reject })
    })
  }

  async writeRead(data: number[]): Promise<Uint8Array> {
    await this.write(data)
    return await this.read()
  }

  async disconnect(): Promise<void> {
    this.pendingRequests.map(req => req.reject(new Error('Device disconnected')))
    this.device.removeEventListener('inputreport', this.handleInputReport)

    if (this.device?.opened) {
      await this.device.close()
    }
  }
}

export class TauriHIDApi implements HIDApi {
  async listDevices(): Promise<any[]> {
    return await invoke('list')
  }

  async connectDevice(device: number[]): Promise<HIDInterface> {
    if (!device)
      throw new Error('No device provided')
    await invoke('connect', { path: device })
    return new TauriHIDDevice()
  }
}

export class TauriHIDDevice implements HIDInterface {
  private connected = true

  isConnected(): boolean {
    return this.connected
  }

  async productName(): Promise<string> {
    return await invoke('product_name')
  }

  async write(data: number[]): Promise<void> {
    await invoke('write', { data: Array.from(data) })
  }

  async read(): Promise<Uint8Array> {
    if (!this.connected)
      throw new Error('Device not connected')

    const result: number[] = await invoke('read')
    return new Uint8Array(result)
  }

  async writeRead(data: number[]): Promise<Uint8Array> {
    await this.write(data)
    return await this.read()
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await invoke('disconnect')
      this.connected = false
    }
  }
}
