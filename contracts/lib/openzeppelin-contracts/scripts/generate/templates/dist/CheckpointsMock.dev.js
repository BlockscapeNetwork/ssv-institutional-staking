"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var format = require('../format-lines');

var VALUE_SIZES = [224, 160];
var header = "pragma solidity ^0.8.0;\n\nimport \"../utils/Checkpoints.sol\";\n";

var legacy = function legacy() {
  return "contract CheckpointsMock {\n    using Checkpoints for Checkpoints.History;\n\n    Checkpoints.History private _totalCheckpoints;\n\n    function latest() public view returns (uint256) {\n        return _totalCheckpoints.latest();\n    }\n\n    function latestCheckpoint() public view returns (bool, uint256, uint256) {\n        return _totalCheckpoints.latestCheckpoint();\n    }\n\n    function length() public view returns (uint256) {\n        return _totalCheckpoints.length();\n    }\n\n    function push(uint256 value) public returns (uint256, uint256) {\n        return _totalCheckpoints.push(value);\n    }\n\n    function getAtBlock(uint256 blockNumber) public view returns (uint256) {\n        return _totalCheckpoints.getAtBlock(blockNumber);\n    }\n\n    function getAtProbablyRecentBlock(uint256 blockNumber) public view returns (uint256) {\n        return _totalCheckpoints.getAtProbablyRecentBlock(blockNumber);\n    }\n}\n";
};

var checkpoint = function checkpoint(length) {
  return "contract Checkpoints".concat(length, "Mock {\n    using Checkpoints for Checkpoints.Trace").concat(length, ";\n\n    Checkpoints.Trace").concat(length, " private _totalCheckpoints;\n\n    function latest() public view returns (uint").concat(length, ") {\n        return _totalCheckpoints.latest();\n    }\n\n    function latestCheckpoint() public view returns (bool, uint").concat(256 - length, ", uint").concat(length, ") {\n        return _totalCheckpoints.latestCheckpoint();\n    }\n\n    function length() public view returns (uint256) {\n        return _totalCheckpoints.length();\n    }\n\n    function push(uint").concat(256 - length, " key, uint").concat(length, " value) public returns (uint").concat(length, ", uint").concat(length, ") {\n        return _totalCheckpoints.push(key, value);\n    }\n\n    function lowerLookup(uint").concat(256 - length, " key) public view returns (uint").concat(length, ") {\n        return _totalCheckpoints.lowerLookup(key);\n    }\n\n    function upperLookup(uint").concat(256 - length, " key) public view returns (uint").concat(length, ") {\n        return _totalCheckpoints.upperLookup(key);\n    }\n}\n");
}; // GENERATE


module.exports = format.apply(void 0, [header, legacy()].concat(_toConsumableArray(VALUE_SIZES.map(checkpoint))));