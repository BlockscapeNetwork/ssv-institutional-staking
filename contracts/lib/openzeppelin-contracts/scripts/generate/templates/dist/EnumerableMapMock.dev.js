"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var format = require('../format-lines');

var TYPES = [{
  name: 'UintToAddressMap',
  keyType: 'uint256',
  valueType: 'address'
}, {
  name: 'AddressToUintMap',
  keyType: 'address',
  valueType: 'uint256'
}, {
  name: 'Bytes32ToBytes32Map',
  keyType: 'bytes32',
  valueType: 'bytes32'
}, {
  name: 'UintToUintMap',
  keyType: 'uint256',
  valueType: 'uint256'
}, {
  name: 'Bytes32ToUintMap',
  keyType: 'bytes32',
  valueType: 'uint256'
}];
var header = "pragma solidity ^0.8.0;\n\nimport \"../utils/structs/EnumerableMap.sol\";\n";

var customSetMock = function customSetMock(_ref) {
  var name = _ref.name,
      keyType = _ref.keyType,
      valueType = _ref.valueType;
  return "// ".concat(name, "\ncontract ").concat(name, "Mock {\n    using EnumerableMap for EnumerableMap.").concat(name, ";\n\n    event OperationResult(bool result);\n\n    EnumerableMap.").concat(name, " private _map;\n\n    function contains(").concat(keyType, " key) public view returns (bool) {\n        return _map.contains(key);\n    }\n\n    function set(").concat(keyType, " key, ").concat(valueType, " value) public {\n        bool result = _map.set(key, value);\n        emit OperationResult(result);\n    }\n\n    function remove(").concat(keyType, " key) public {\n        bool result = _map.remove(key);\n        emit OperationResult(result);\n    }\n\n    function length() public view returns (uint256) {\n        return _map.length();\n    }\n\n    function at(uint256 index) public view returns (").concat(keyType, " key, ").concat(valueType, " value) {\n        return _map.at(index);\n    }\n\n    function tryGet(").concat(keyType, " key) public view returns (bool, ").concat(valueType, ") {\n        return _map.tryGet(key);\n    }\n\n    function get(").concat(keyType, " key) public view returns (").concat(valueType, ") {\n        return _map.get(key);\n    }\n\n    function getWithMessage(").concat(keyType, " key, string calldata errorMessage) public view returns (").concat(valueType, ") {\n        return _map.get(key, errorMessage);\n    }\n}\n");
}; // GENERATE


module.exports = format.apply(void 0, [header].concat(_toConsumableArray(TYPES.map(function (details) {
  return customSetMock(details);
}))));