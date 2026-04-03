from dataclasses import dataclass


@dataclass
class Key:
    code: int
    rmk: str
    symbol: tuple[str | None, str | None]


def escape_string(s: str | None) -> str | None:
    if s is None:
        return None
    # Escape backslash first, then single quotes, then newlines
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    s = s.replace('\n', '\\n')
    return s


def gen_info(key: Key) -> str:
    t = "  0x0000: { code: 0x0000, rmk: 'rmk_', symbol: [symbol_1, symbol_2] },"
    t = t.replace("0x0000", f"0x{key.code:04X}")
    t = t.replace("rmk_", key.rmk)
    symbol_0 = escape_string(key.symbol[0])
    symbol_1 = escape_string(key.symbol[1])
    t = t.replace("symbol_1", f"'{symbol_0}'" if symbol_0 else "null")
    t = t.replace("symbol_2", f"'{symbol_1}'" if symbol_1 else "null")
    return t
