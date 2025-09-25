#[derive(Debug, Clone)]
pub struct KeyInfo {
    pub code: u16,
    pub rmk: String,
    pub symbol: (Option<String>, Option<String>),
}