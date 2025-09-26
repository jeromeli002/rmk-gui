use std::collections::HashMap;
use std::sync::LazyLock;

use rmk_types::keycode::KeyCode;
use strum::IntoEnumIterator;
use wasm_bindgen::prelude::*;

use crate::keyinfo::KeyInfo;
use crate::prefix::Prefix;
// Helper functions to reduce code duplication
fn add_layer_operation_with_shift(
    map: &mut HashMap<u16, KeyInfo>,
    prefix: u16,
    count: u16,
    name: &str,
    symbol_prefix: &str,
) {
    for x in 0..count {
        let code = prefix + (x << 8);
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("{}({}, kc)", name, x),
                symbol: (Some(format!("{}-{}", symbol_prefix, x)), None),
            },
        );
    }
}

fn add_layer_operation(
    map: &mut HashMap<u16, KeyInfo>,
    prefix: u16,
    count: u16,
    name: &str,
    symbol_prefix: &str,
) {
    for x in 0..count {
        let code = prefix + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("{}({})", name, x),
                symbol: (None, Some(format!("{}-{}", symbol_prefix, x))),
            },
        );
    }
}

fn add_modifier_key(
    map: &mut HashMap<u16, KeyInfo>,
    code: u16,
    name: &str,
    symbol: &str,
) {
    map.insert(
        code,
        KeyInfo {
            code,
            rmk: format!("MT({}, kc)", name),
            symbol: (Some(symbol.to_string()), None),
        },
    );
}

fn add_indexed_keys(
    map: &mut HashMap<u16, KeyInfo>,
    prefix: u16,
    count: u16,
    name: &str,
    symbol_prefix: &str,
) {
    for x in 0..count {
        let code = prefix + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("{}{}", name, x),
                symbol: (None, Some(format!("{}-{}", symbol_prefix, x))),
            },
        );
    }
}

static KEYCODEMAP: LazyLock<HashMap<u16, KeyInfo>> = LazyLock::new(|| {
    let mut map = HashMap::new();
    
    // Add basic key codes
    for key in KeyCode::iter() {
        map.insert(
            key as u16,
            KeyInfo {
                code: key as u16,
                rmk: format!("{:?}", key),
                symbol: (None, Some(format!("{:?}", key))),
            },
        );
    }
    
    // Add extended keys
    // Transparent key
    map.insert(
        0x0001,
        KeyInfo {
            code: 0x0001,
            rmk: "_".to_string(),
            symbol: (None, Some("Trns".to_string())),
        },
    );
    
    // Layer operations
    add_layer_operation_with_shift(&mut map, Prefix::LT, 16, "LT", "LT");
    add_layer_operation(&mut map, Prefix::MO, 32, "MO", "MO");
    add_layer_operation(&mut map, Prefix::DF, 32, "DF", "DF");
    add_layer_operation(&mut map, Prefix::TG, 32, "TG", "TG");
    add_layer_operation(&mut map, Prefix::TT, 32, "TT", "TT");
    add_layer_operation(&mut map, Prefix::TO, 32, "TO", "TO");
    add_layer_operation(&mut map, Prefix::OSL, 32, "OSL", "OSL");
    add_layer_operation(&mut map, Prefix::PDF, 32, "PDF", "PDF");
    
    // Modifiers
    add_modifier_key(&mut map, Prefix::LCTRL, "LCtrl", "LCtrl");
    add_modifier_key(&mut map, Prefix::RCTRL, "RCtrl", "RCtrl");
    add_modifier_key(&mut map, Prefix::LSHIFT, "LShift", "LShift");
    add_modifier_key(&mut map, Prefix::RSHIFT, "RShift", "RShift");
    add_modifier_key(&mut map, Prefix::LALT, "LAlt", "LAlt");
    add_modifier_key(&mut map, Prefix::RALT, "RAlt", "RAlt");
    add_modifier_key(&mut map, Prefix::LGUI, "LGui", "LGui");
    add_modifier_key(&mut map, Prefix::RGUI, "RGui", "RGui");
    
    // Macros
    add_indexed_keys(&mut map, Prefix::MACRO, 32, "Macro", "Macro");
    
    // TapDance
    add_indexed_keys(&mut map, Prefix::TAP_DANCE, 32, "TapDance", "TapDance");
    
    map
});

pub fn key_to_info(key: u16) -> Option<KeyInfo> {
    if let Some(info) = KEYCODEMAP.get(&key) {
        return Some(info.clone());
    }
    
    let base_key = key & 0xFF00;
    let base_info = KEYCODEMAP.get(&base_key)?;
    
    if base_info.symbol.0.is_none() || !base_info.rmk.contains("kc") {
        return Some(base_info.clone());
    }
    
    let sub_key = key & 0x00FF;
    let sub_key_info = KEYCODEMAP.get(&sub_key)?;
    
    Some(KeyInfo {
        code: base_info.code,
        rmk: base_info.rmk.clone(),
        symbol: (
            base_info.symbol.0.clone(),
            sub_key_info.symbol.1.clone(),
        ),
    })
}

#[wasm_bindgen(js_name = "keyToLabel")]
pub fn key_to_label(key: u16) -> JsValue {
    match key_to_info(key) {
        Some(info) => {
            let (sym1, sym2) = info.symbol;
            let arr = js_sys::Array::new_with_length(2);
            arr.set(0, sym1.map(JsValue::from).unwrap_or(JsValue::NULL));
            arr.set(1, sym2.map(JsValue::from).unwrap_or(JsValue::NULL));
            arr.into()
        }
        None => js_sys::Array::new().into(),
    }
}

#[wasm_bindgen(js_name = "keyToRmk")]
pub fn key_to_rmk(key: u16) -> String {
    match key_to_info(key) {
        Some(info) => info.rmk,
        None => "No".to_string(),
    }
}