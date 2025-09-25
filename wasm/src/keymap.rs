use std::collections::HashMap;
use std::sync::LazyLock;

use rmk_types::keycode::KeyCode;
use strum::IntoEnumIterator;
use wasm_bindgen::prelude::*;

use crate::keyinfo::KeyInfo;
use crate::prefix::Prefix;

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
    
    // Layer operations - LT
    for x in 0..16 {
        let code = Prefix::LT + (x << 8);
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("LT({}, kc)", x),
                symbol: (Some(format!("LT-{}", x)), None),
            },
        );
    }
    
    // Layer operations - MO
    for x in 0..32 {
        let code = Prefix::MO + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("MO({})", x),
                symbol: (None, Some(format!("MO-{}", x))),
            },
        );
    }
    
    // Layer operations - DF
    for x in 0..32 {
        let code = Prefix::DF + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("DF({})", x),
                symbol: (None, Some(format!("DF-{}", x))),
            },
        );
    }
    
    // Layer operations - TG
    for x in 0..32 {
        let code = Prefix::TG + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("TG({})", x),
                symbol: (None, Some(format!("TG-{}", x))),
            },
        );
    }
    
    // Layer operations - TT
    for x in 0..32 {
        let code = Prefix::TT + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("TT({})", x),
                symbol: (None, Some(format!("TT-{}", x))),
            },
        );
    }
    
    // Layer operations - TO
    for x in 0..32 {
        let code = Prefix::TO + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("TO({})", x),
                symbol: (None, Some(format!("TO-{}", x))),
            },
        );
    }
    
    // Layer operations - OSL
    for x in 0..32 {
        let code = Prefix::OSL + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("OSL({})", x),
                symbol: (None, Some(format!("OSL-{}", x))),
            },
        );
    }
    
    // Layer operations - PDF
    for x in 0..32 {
        let code = Prefix::PDF + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("PDF({})", x),
                symbol: (None, Some(format!("PDF-{}", x))),
            },
        );
    }
    
    // Modifiers
    map.insert(
        Prefix::LCTRL,
        KeyInfo {
            code: Prefix::LCTRL,
            rmk: "MT(LCtrl, kc)".to_string(),
            symbol: (Some("LCtrl".to_string()), None),
        },
    );
    
    map.insert(
        Prefix::RCTRL,
        KeyInfo {
            code: Prefix::RCTRL,
            rmk: "MT(RCtrl, kc)".to_string(),
            symbol: (Some("RCtrl".to_string()), None),
        },
    );
    
    map.insert(
        Prefix::LSHIFT,
        KeyInfo {
            code: Prefix::LSHIFT,
            rmk: "MT(LShift, kc)".to_string(),
            symbol: (Some("LShift".to_string()), None),
        },
    );
    
    map.insert(
        Prefix::RSHIFT,
        KeyInfo {
            code: Prefix::RSHIFT,
            rmk: "MT(RShift, kc)".to_string(),
            symbol: (Some("RShift".to_string()), None),
        },
    );
    
    map.insert(
        Prefix::LALT,
        KeyInfo {
            code: Prefix::LALT,
            rmk: "MT(LAlt, kc)".to_string(),
            symbol: (Some("LAlt".to_string()), None),
        },
    );
    
    map.insert(
        Prefix::RALT,
        KeyInfo {
            code: Prefix::RALT,
            rmk: "MT(RAlt, kc)".to_string(),
            symbol: (Some("RAlt".to_string()), None),
        },
    );
    
    map.insert(
        Prefix::LGUI,
        KeyInfo {
            code: Prefix::LGUI,
            rmk: "MT(LGui, kc)".to_string(),
            symbol: (Some("LGui".to_string()), None),
        },
    );
    
    map.insert(
        Prefix::RGUI,
        KeyInfo {
            code: Prefix::RGUI,
            rmk: "MT(RGui, kc)".to_string(),
            symbol: (Some("RGui".to_string()), None),
        },
    );
    
    // Macros
    for x in 0..32 {
        let code = Prefix::MACRO + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("Macro{}", x),
                symbol: (None, Some(format!("Macro-{}", x))),
            },
        );
    }
    
    // TapDance
    for x in 0..32 {
        let code = Prefix::TAP_DANCE + x;
        map.insert(
            code,
            KeyInfo {
                code,
                rmk: format!("TapDance{}", x),
                symbol: (None, Some(format!("TapDance-{}", x))),
            },
        );
    }
    
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

#[wasm_bindgen]
pub fn key_to_label(key: u16) -> JsValue {
    key_to_info(key)
        .map(|info| {
            let (sym1, sym2) = info.symbol;
            js_sys::Array::of2(
                &sym1.map(JsValue::from).unwrap_or(JsValue::NULL),
                &sym2.map(JsValue::from).unwrap_or(JsValue::NULL),
            )
        })
        .unwrap_or_else(|| js_sys::Array::new())
        .into()
}

#[wasm_bindgen]
pub fn key_to_rmk(key: u16) -> String {
    match key_to_info(key) {
        Some(info) => info.rmk,
        None => "No".to_string(),
    }
}