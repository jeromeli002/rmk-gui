// Prefix definitions for extended keys
pub struct Prefix;

impl Prefix {
    // Layer operations
    pub const LT: u16 = 0x4000;
    pub const MO: u16 = 0x5220;
    pub const DF: u16 = 0x5240;
    pub const TG: u16 = 0x5260;
    pub const TT: u16 = 0x52C0;
    pub const TO: u16 = 0x5200;
    pub const OSL: u16 = 0x5280;
    pub const PDF: u16 = 0x52E0;
    
    // Modifiers
    pub const LCTRL: u16 = 0x2100;
    pub const LSHIFT: u16 = 0x2200;
    pub const LALT: u16 = 0x2400;
    pub const LGUI: u16 = 0x2800;
    pub const RCTRL: u16 = 0x3100;
    pub const RSHIFT: u16 = 0x3200;
    pub const RALT: u16 = 0x3400;
    pub const RGUI: u16 = 0x3800;
    
    // Other extended keys
    pub const MACRO: u16 = 0x7700;
    pub const TAP_DANCE: u16 = 0x5700;
}