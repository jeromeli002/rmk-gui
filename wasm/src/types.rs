use js_sys::{Array, Promise, Uint8Array};
use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen_futures::JsFuture;

#[derive(Debug, Clone)]
pub struct KeyInfo {
    pub code: u16,
    pub rmk: String,
    pub symbol: KeySymbol,
}

#[derive(Debug, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct KeySymbol(pub Option<String>, pub Option<String>);


#[wasm_bindgen]
impl KeySymbol {
    pub fn new(first: Option<String>, second: Option<String>) -> Self {
        KeySymbol(first, second)
    }
}

#[wasm_bindgen]
extern "C" {
    pub type HidInterface;

    #[wasm_bindgen(method, js_name = isConnected)]
    fn is_connected(this: &HidInterface) -> bool;

    #[wasm_bindgen(method, js_name = writeRead)]
    fn write_read(this: &HidInterface, data: Array) -> Promise;
}

pub struct HidDevice {
    interface: HidInterface,
}

impl HidDevice {
    pub fn new(interface: HidInterface) -> Self {
        Self { interface }
    }

    pub fn is_connected(&self) -> bool {
        self.interface.is_connected()
    }

    pub async fn write_read(&self, data: &[u8]) -> Result<Vec<u8>, JsValue> {
        let js_array = Array::new();
        for &byte in data {
            js_array.push(&JsValue::from(byte));
        }
        let promise = self.interface.write_read(js_array);
        let js_result = JsFuture::from(promise).await?;
        let uint8_array = Uint8Array::from(js_result);
        let mut result = vec![0; uint8_array.length() as usize];
        uint8_array.copy_to(&mut result);
        
        Ok(result)
    }
}
