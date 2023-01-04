let index: any;

try {
  window.crypto;
  index = require('jsencrypt').JSEncrypt;
} catch {
  index = require('node-jsencrypt');
}

export default index;
