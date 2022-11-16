"use strict";

var ethSigUtil = require('eth-sig-util');

var EIP712Domain = [{
  name: 'name',
  type: 'string'
}, {
  name: 'version',
  type: 'string'
}, {
  name: 'chainId',
  type: 'uint256'
}, {
  name: 'verifyingContract',
  type: 'address'
}];
var Permit = [{
  name: 'owner',
  type: 'address'
}, {
  name: 'spender',
  type: 'address'
}, {
  name: 'value',
  type: 'uint256'
}, {
  name: 'nonce',
  type: 'uint256'
}, {
  name: 'deadline',
  type: 'uint256'
}];

function domainSeparator(name, version, chainId, verifyingContract) {
  return regeneratorRuntime.async(function domainSeparator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", '0x' + ethSigUtil.TypedDataUtils.hashStruct('EIP712Domain', {
            name: name,
            version: version,
            chainId: chainId,
            verifyingContract: verifyingContract
          }, {
            EIP712Domain: EIP712Domain
          }).toString('hex'));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  EIP712Domain: EIP712Domain,
  Permit: Permit,
  domainSeparator: domainSeparator
};