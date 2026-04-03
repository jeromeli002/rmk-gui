from dataclasses import dataclass
from lib import Key


@dataclass
class Prefix:
    LT = 0x4000
    LCtrl = 0x2100
    LShift = 0x2200
    LAlt = 0x2400
    LGui = 0x2800
    RCtrl = 0x3100
    RShift = 0x3200
    RAlt = 0x3400
    RGui = 0x3800


ext_keys = [Key(code=0x0001, rmk="_", symbol=(None, "Trns"))]

# layer operations - LT 前缀用于 keyToInfo 动态处理
ext_keys.extend(Key(code=Prefix.LT + (x << 8), rmk=f"LT{x}(kc)", symbol=(f"LT{x}", None)) for x in range(16))

# modifiers - 使用 vial-gui 格式
ext_keys.append(Key(code=Prefix.LCtrl, rmk="MT(LCtrl, kc)", symbol=("MT(LCtrl)", None)))
ext_keys.append(Key(code=Prefix.RCtrl, rmk="MT(RCtrl, kc)", symbol=("MT(RCtrl)", None)))
ext_keys.append(Key(code=Prefix.LShift, rmk="MT(LShift, kc)", symbol=("MT(LSft)", None)))
ext_keys.append(Key(code=Prefix.RShift, rmk="MT(RShift, kc)", symbol=("MT(RSft)", None)))
ext_keys.append(Key(code=Prefix.LAlt, rmk="MT(LAlt, kc)", symbol=("MT(LAlt)", None)))
ext_keys.append(Key(code=Prefix.RAlt, rmk="MT(RAlt, kc)", symbol=("MT(RAlt)", None)))
ext_keys.append(Key(code=Prefix.LGui, rmk="MT(LGui, kc)", symbol=("MT(LGui)", None)))
ext_keys.append(Key(code=Prefix.RGui, rmk="MT(RGui, kc)", symbol=("MT(RGui)", None)))

if __name__ == "__main__":
    [print(i) for i in ext_keys]
