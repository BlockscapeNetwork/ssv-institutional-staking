"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var format = require('../format-lines');

var _require = require('../../helpers'),
    range = _require.range;

var LENGTHS = range(8, 256, 8).reverse(); // 248 → 8 (in steps of 8)

var header = "pragma solidity ^0.8.0;\n\nimport \"../utils/math/SafeCast.sol\";\n";

var toInt = function toInt(length) {
  return "function toInt".concat(length, "(uint").concat(length, " a) public pure returns (int").concat(length, ") {\n    return a.toInt").concat(length, "();\n}\n");
};

var toUint = function toUint(length) {
  return "function toUint".concat(length, "(int").concat(length, " a) public pure returns (uint").concat(length, ") {\n    return a.toUint").concat(length, "();\n}\n");
};

var toIntDownCast = function toIntDownCast(length) {
  return "function toInt".concat(length, "(int256 a) public pure returns (int").concat(length, ") {\n    return a.toInt").concat(length, "();\n}\n");
};

var toUintDownCast = function toUintDownCast(length) {
  return "function toUint".concat(length, "(uint256 a) public pure returns (uint").concat(length, ") {\n    return a.toUint").concat(length, "();\n}\n");
}; // GENERATE


module.exports = format(header, 'contract SafeCastMock {', ['using SafeCast for uint256;', 'using SafeCast for int256;', '', toUint(256)].concat(_toConsumableArray(LENGTHS.map(toUintDownCast)), [toInt(256)], _toConsumableArray(LENGTHS.map(toIntDownCast))).flatMap(function (fn) {
  return fn.split('\n');
}).slice(0, -1), '}');