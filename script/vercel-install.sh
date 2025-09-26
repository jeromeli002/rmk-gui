export HOME=/root
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env
rustup target add wasm32-unknown-unknown

curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

pnpm install