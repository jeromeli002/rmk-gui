use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use tsify::Tsify;

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