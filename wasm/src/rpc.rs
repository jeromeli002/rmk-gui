use wasm_bindgen::prelude::*;

use crate::types::{HidDevice, HidInterface};

#[wasm_bindgen]
pub struct RpcClient {
    device: HidDevice,
}

#[wasm_bindgen]
impl RpcClient {
    #[wasm_bindgen(constructor)]
    pub fn new(interface: HidInterface) -> Self {
        let device = HidDevice::new(interface);
        Self { device }
    }

    #[wasm_bindgen]
    pub async fn get_layer_count(&self) -> Result<u8, JsValue> {
        let data = [0x11];
        let response = self.device.write_read(&data).await?;
        if response.len() < 2 {
            return Err(JsValue::from("Invalid response"));
        }
        Ok(response[1])
    }
}