"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var format = require('../format-lines');

var TYPES = [{
  name: 'Bytes32Set',
  type: 'bytes32'
}, {
  name: 'AddressSet',
  type: 'address'
}, {
  name: 'UintSet',
  type: 'uint256'
}];
var header = "pragma solidity ^0.8.0;\n\nimport \"../utils/structs/EnumerableSet.sol\";\n";

var customSetMock = function customSetMock(_ref) {
  var name = _ref.name,
      type = _ref.type;
  return "// ".concat(name, "\ncontract Enumerable").concat(name, "Mock {\n    using EnumerableSet for EnumerableSet.").concat(name, ";\n\n    event OperationResult(bool result);\n\n    EnumerableSet.").concat(name, " private _set;\n\n    function contains(").concat(type, " value) public view returns (bool) {\n        return _set.contains(value);\n    }\n\n    function add(").concat(type, " value) public {\n        bool result = _set.add(value);\n        emit OperationResult(result);\n    }\n\n    function remove(").concat(type, " value) public {\n        bool result = _set.remove(value);\n        emit OperationResult(result);\n    }\n\n    function length() public view returns (uint256) {\n        return _set.length();\n    }\n\n    function at(uint256 index) public view returns (").concat(type, ") {\n        return _set.at(index);\n    }\n\n    function values() public view returns (").concat(type, "[] memory) {\n        return _set.values();\n    }\n}\n");
}; // GENERATE


module.exports = format.apply(void 0, [header].concat(_toConsumableArray(TYPES.map(function (details) {
  return customSetMock(details);
}))));