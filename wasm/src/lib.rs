mod prefix;
mod keyinfo;
mod keymap;

use wasm_bindgen::prelude::*;
use js_sys::Array;

pub use keyinfo::KeyInfo;
pub use keymap::{key_to_info, key_to_label, key_to_rmk};

#[wasm_bindgen]
pub fn get_key_to_label(key: u16) -> JsValue {
    let result = key_to_label(key);
    let arr = Array::new();
    arr.push(&JsValue::from(result.0.unwrap_or_default()));
    arr.push(&JsValue::from(result.1.unwrap_or_default()));
    JsValue::from(arr)
}

#[wasm_bindgen]
pub fn get_key_to_rmk(key: u16) -> String {
    key_to_rmk(key)
}
