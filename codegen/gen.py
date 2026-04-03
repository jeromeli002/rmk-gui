import re
from collections import OrderedDict
from pathlib import Path
from lib import Key, gen_info
from extkey import ext_keys
from symbol import special_symbol

pattern = re.compile(r"^\s*(?P<enum>\w+)\s*=\s*(?P<code>0x[0-9A-Fa-f]+),?")

keys: OrderedDict[int, Key] = OrderedDict()
keycode_rs_path = Path(__file__).parent / "keycode.rs"
with open(keycode_rs_path, "r") as file:
    keycodes = file.read()
for line in keycodes.split("\n"):
    line = line.strip()
    if line.startswith("///") or not line:
        continue

    match = pattern.search(line)
    if not match:
        continue

    enum = match.group("enum")
    code = match.group("code")
    key_code = int(code, 16)
    symbol = [None, enum]
    symbol = special_symbol(symbol)
    keys[key_code] = Key(key_code, enum, symbol)

for key in ext_keys:
    keys[key.code] = key

template_ts_path = Path(__file__).parent / "template.ts"
with open(template_ts_path, "r") as file:
    ts_template = file.read()

key_infos = []
for key in keys.values():
    key_infos.append(gen_info(key))

ts_file = ts_template.replace("  // replace me", "\n".join(key_infos))
keycode_ts_path = Path(__file__).parent.parent / "app/types/keycode.ts"
with open(keycode_ts_path, "w") as file:
    file.write(ts_file)
