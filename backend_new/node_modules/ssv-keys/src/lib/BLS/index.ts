let index: any;

try {
  window.crypto;
  index = require('bls-eth-wasm/browser');
} catch {
  index = require('bls-eth-wasm');
}

export default index;
