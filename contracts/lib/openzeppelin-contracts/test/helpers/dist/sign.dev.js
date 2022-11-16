"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function toEthSignedMessageHash(messageHex) {
  var messageBuffer = Buffer.from(messageHex.substring(2), 'hex');
  var prefix = Buffer.from("\x19Ethereum Signed Message:\n".concat(messageBuffer.length));
  return web3.utils.sha3(Buffer.concat([prefix, messageBuffer]));
}
/**
 * Create a signer between a contract and a signer for a voucher of method, args, and redeemer
 * Note that `method` is the web3 method, not the truffle-contract method
 * @param contract TruffleContract
 * @param signer address
 * @param redeemer address
 * @param methodName string
 * @param methodArgs any[]
 */


var getSignFor = function getSignFor(contract, signer) {
  return function (redeemer, methodName) {
    var _web3$utils;

    var methodArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var parts = [contract.address, redeemer];
    var REAL_SIGNATURE_SIZE = 2 * 65; // 65 bytes in hexadecimal string length

    var PADDED_SIGNATURE_SIZE = 2 * 96; // 96 bytes in hexadecimal string length

    var DUMMY_SIGNATURE = "0x".concat(web3.utils.padLeft('', REAL_SIGNATURE_SIZE)); // if we have a method, add it to the parts that we're signing

    if (methodName) {
      if (methodArgs.length > 0) {
        var _contract$contract$me;

        parts.push((_contract$contract$me = contract.contract.methods)[methodName].apply(_contract$contract$me, _toConsumableArray(methodArgs.concat([DUMMY_SIGNATURE]))).encodeABI().slice(0, -1 * PADDED_SIGNATURE_SIZE));
      } else {
        var abi = contract.abi.find(function (abi) {
          return abi.name === methodName;
        });
        parts.push(abi.signature);
      }
    } // return the signature of the "Ethereum Signed Message" hash of the hash of `parts`


    var messageHex = (_web3$utils = web3.utils).soliditySha3.apply(_web3$utils, parts);

    return web3.eth.sign(messageHex, signer);
  };
};

module.exports = {
  toEthSignedMessageHash: toEthSignedMessageHash,
  getSignFor: getSignFor
};