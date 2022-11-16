"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var format = require('../format-lines');

var VALUE_SIZES = [224, 160];
var header = "pragma solidity ^0.8.0;\n\nimport \"./math/Math.sol\";\nimport \"./math/SafeCast.sol\";\n\n/**\n * @dev This library defines the `History` struct, for checkpointing values as they change at different points in\n * time, and later looking up past values by block number. See {Votes} as an example.\n *\n * To create a history of checkpoints define a variable type `Checkpoints.History` in your contract, and store a new\n * checkpoint for the current transaction block using the {push} function.\n *\n * _Available since v4.5._\n */\n";

var types = function types(opts) {
  return "struct ".concat(opts.historyTypeName, " {\n    ").concat(opts.checkpointTypeName, "[] ").concat(opts.checkpointFieldName, ";\n}\n\nstruct ").concat(opts.checkpointTypeName, " {\n    ").concat(opts.keyTypeName, " ").concat(opts.keyFieldName, ";\n    ").concat(opts.valueTypeName, " ").concat(opts.valueFieldName, ";\n}\n");
};
/* eslint-disable max-len */


var operations = function operations(opts) {
  return "/**\n * @dev Pushes a (`key`, `value`) pair into a ".concat(opts.historyTypeName, " so that it is stored as the checkpoint.\n *\n * Returns previous value and new value.\n */\nfunction push(\n    ").concat(opts.historyTypeName, " storage self,\n    ").concat(opts.keyTypeName, " key,\n    ").concat(opts.valueTypeName, " value\n) internal returns (").concat(opts.valueTypeName, ", ").concat(opts.valueTypeName, ") {\n    return _insert(self.").concat(opts.checkpointFieldName, ", key, value);\n}\n\n/**\n * @dev Returns the value in the oldest checkpoint with key greater or equal than the search key, or zero if there is none.\n */\nfunction lowerLookup(").concat(opts.historyTypeName, " storage self, ").concat(opts.keyTypeName, " key) internal view returns (").concat(opts.valueTypeName, ") {\n    uint256 len = self.").concat(opts.checkpointFieldName, ".length;\n    uint256 pos = _lowerBinaryLookup(self.").concat(opts.checkpointFieldName, ", key, 0, len);\n    return pos == len ? 0 : _unsafeAccess(self.").concat(opts.checkpointFieldName, ", pos).").concat(opts.valueFieldName, ";\n}\n\n/**\n * @dev Returns the value in the most recent checkpoint with key lower or equal than the search key.\n */\nfunction upperLookup(").concat(opts.historyTypeName, " storage self, ").concat(opts.keyTypeName, " key) internal view returns (").concat(opts.valueTypeName, ") {\n    uint256 len = self.").concat(opts.checkpointFieldName, ".length;\n    uint256 pos = _upperBinaryLookup(self.").concat(opts.checkpointFieldName, ", key, 0, len);\n    return pos == 0 ? 0 : _unsafeAccess(self.").concat(opts.checkpointFieldName, ", pos - 1).").concat(opts.valueFieldName, ";\n}\n");
};

var legacyOperations = function legacyOperations(opts) {
  return "/**\n * @dev Returns the value at a given block number. If a checkpoint is not available at that block, the closest one\n * before it is returned, or zero otherwise.\n */\nfunction getAtBlock(".concat(opts.historyTypeName, " storage self, uint256 blockNumber) internal view returns (uint256) {\n    require(blockNumber < block.number, \"Checkpoints: block not yet mined\");\n    uint32 key = SafeCast.toUint32(blockNumber);\n\n    uint256 len = self.").concat(opts.checkpointFieldName, ".length;\n    uint256 pos = _upperBinaryLookup(self.").concat(opts.checkpointFieldName, ", key, 0, len);\n    return pos == 0 ? 0 : _unsafeAccess(self.").concat(opts.checkpointFieldName, ", pos - 1).").concat(opts.valueFieldName, ";\n}\n\n/**\n * @dev Returns the value at a given block number. If a checkpoint is not available at that block, the closest one\n * before it is returned, or zero otherwise. Similar to {upperLookup} but optimized for the case when the searched\n * checkpoint is probably \"recent\", defined as being among the last sqrt(N) checkpoints where N is the number of\n * checkpoints.\n */\nfunction getAtProbablyRecentBlock(").concat(opts.historyTypeName, " storage self, uint256 blockNumber) internal view returns (uint256) {\n    require(blockNumber < block.number, \"Checkpoints: block not yet mined\");\n    uint32 key = SafeCast.toUint32(blockNumber);\n\n    uint256 len = self.").concat(opts.checkpointFieldName, ".length;\n\n    uint256 low = 0;\n    uint256 high = len;\n\n    if (len > 5) {\n        uint256 mid = len - Math.sqrt(len);\n        if (key < _unsafeAccess(self.").concat(opts.checkpointFieldName, ", mid)._blockNumber) {\n            high = mid;\n        } else {\n            low = mid + 1;\n        }\n    }\n\n    uint256 pos = _upperBinaryLookup(self.").concat(opts.checkpointFieldName, ", key, low, high);\n\n    return pos == 0 ? 0 : _unsafeAccess(self.").concat(opts.checkpointFieldName, ", pos - 1).").concat(opts.valueFieldName, ";\n}\n\n/**\n * @dev Pushes a value onto a History so that it is stored as the checkpoint for the current block.\n *\n * Returns previous value and new value.\n */\nfunction push(").concat(opts.historyTypeName, " storage self, uint256 value) internal returns (uint256, uint256) {\n    return _insert(self.").concat(opts.checkpointFieldName, ", SafeCast.toUint32(block.number), SafeCast.toUint224(value));\n}\n\n/**\n * @dev Pushes a value onto a History, by updating the latest value using binary operation `op`. The new value will\n * be set to `op(latest, delta)`.\n *\n * Returns previous value and new value.\n */\nfunction push(\n    ").concat(opts.historyTypeName, " storage self,\n    function(uint256, uint256) view returns (uint256) op,\n    uint256 delta\n) internal returns (uint256, uint256) {\n    return push(self, op(latest(self), delta));\n}\n");
};

var common = function common(opts) {
  return "/**\n * @dev Returns the value in the most recent checkpoint, or zero if there are no checkpoints.\n */\nfunction latest(".concat(opts.historyTypeName, " storage self) internal view returns (").concat(opts.valueTypeName, ") {\n    uint256 pos = self.").concat(opts.checkpointFieldName, ".length;\n    return pos == 0 ? 0 : _unsafeAccess(self.").concat(opts.checkpointFieldName, ", pos - 1).").concat(opts.valueFieldName, ";\n}\n\n/**\n * @dev Returns whether there is a checkpoint in the structure (i.e. it is not empty), and if so the key and value\n * in the most recent checkpoint.\n */\nfunction latestCheckpoint(").concat(opts.historyTypeName, " storage self)\n    internal\n    view\n    returns (\n        bool exists,\n        ").concat(opts.keyTypeName, " ").concat(opts.keyFieldName, ",\n        ").concat(opts.valueTypeName, " ").concat(opts.valueFieldName, "\n    )\n{\n    uint256 pos = self.").concat(opts.checkpointFieldName, ".length;\n    if (pos == 0) {\n        return (false, 0, 0);\n    } else {\n        ").concat(opts.checkpointTypeName, " memory ckpt = _unsafeAccess(self.").concat(opts.checkpointFieldName, ", pos - 1);\n        return (true, ckpt.").concat(opts.keyFieldName, ", ckpt.").concat(opts.valueFieldName, ");\n    }\n}\n\n/**\n * @dev Returns the number of checkpoint.\n */\nfunction length(").concat(opts.historyTypeName, " storage self) internal view returns (uint256) {\n    return self.").concat(opts.checkpointFieldName, ".length;\n}\n\n/**\n * @dev Pushes a (`key`, `value`) pair into an ordered list of checkpoints, either by inserting a new checkpoint,\n * or by updating the last one.\n */\nfunction _insert(\n    ").concat(opts.checkpointTypeName, "[] storage self,\n    ").concat(opts.keyTypeName, " key,\n    ").concat(opts.valueTypeName, " value\n) private returns (").concat(opts.valueTypeName, ", ").concat(opts.valueTypeName, ") {\n    uint256 pos = self.length;\n\n    if (pos > 0) {\n        // Copying to memory is important here.\n        ").concat(opts.checkpointTypeName, " memory last = _unsafeAccess(self, pos - 1);\n\n        // Checkpoints keys must be increasing.\n        require(last.").concat(opts.keyFieldName, " <= key, \"Checkpoint: invalid key\");\n\n        // Update or push new checkpoint\n        if (last.").concat(opts.keyFieldName, " == key) {\n            _unsafeAccess(self, pos - 1).").concat(opts.valueFieldName, " = value;\n        } else {\n            self.push(").concat(opts.checkpointTypeName, "({").concat(opts.keyFieldName, ": key, ").concat(opts.valueFieldName, ": value}));\n        }\n        return (last.").concat(opts.valueFieldName, ", value);\n    } else {\n        self.push(").concat(opts.checkpointTypeName, "({").concat(opts.keyFieldName, ": key, ").concat(opts.valueFieldName, ": value}));\n        return (0, value);\n    }\n}\n\n/**\n * @dev Return the index of the oldest checkpoint whose key is greater than the search key, or `high` if there is none.\n * `low` and `high` define a section where to do the search, with inclusive `low` and exclusive `high`.\n *\n * WARNING: `high` should not be greater than the array's length.\n */\nfunction _upperBinaryLookup(\n    ").concat(opts.checkpointTypeName, "[] storage self,\n    ").concat(opts.keyTypeName, " key,\n    uint256 low,\n    uint256 high\n) private view returns (uint256) {\n    while (low < high) {\n        uint256 mid = Math.average(low, high);\n        if (_unsafeAccess(self, mid).").concat(opts.keyFieldName, " > key) {\n            high = mid;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return high;\n}\n\n/**\n * @dev Return the index of the oldest checkpoint whose key is greater or equal than the search key, or `high` if there is none.\n * `low` and `high` define a section where to do the search, with inclusive `low` and exclusive `high`.\n *\n * WARNING: `high` should not be greater than the array's length.\n */\nfunction _lowerBinaryLookup(\n    ").concat(opts.checkpointTypeName, "[] storage self,\n    ").concat(opts.keyTypeName, " key,\n    uint256 low,\n    uint256 high\n) private view returns (uint256) {\n    while (low < high) {\n        uint256 mid = Math.average(low, high);\n        if (_unsafeAccess(self, mid).").concat(opts.keyFieldName, " < key) {\n            low = mid + 1;\n        } else {\n            high = mid;\n        }\n    }\n    return high;\n}\n\nfunction _unsafeAccess(").concat(opts.checkpointTypeName, "[] storage self, uint256 pos)\n    private\n    pure\n    returns (").concat(opts.checkpointTypeName, " storage result)\n{\n    assembly {\n        mstore(0, self.slot)\n        result.slot := add(keccak256(0, 0x20), pos)\n    }\n}\n");
};
/* eslint-enable max-len */
// OPTIONS


var defaultOpts = function defaultOpts(size) {
  return {
    historyTypeName: "Trace".concat(size),
    checkpointTypeName: "Checkpoint".concat(size),
    checkpointFieldName: '_checkpoints',
    keyTypeName: "uint".concat(256 - size),
    keyFieldName: '_key',
    valueTypeName: "uint".concat(size),
    valueFieldName: '_value'
  };
};

var OPTS = VALUE_SIZES.map(function (size) {
  return defaultOpts(size);
});

var LEGACY_OPTS = _objectSpread({}, defaultOpts(224), {
  historyTypeName: 'History',
  checkpointTypeName: 'Checkpoint',
  keyFieldName: '_blockNumber'
}); // GENERATE


module.exports = format(header.trimEnd(), 'library Checkpoints {', [// Legacy types & functions
types(LEGACY_OPTS), legacyOperations(LEGACY_OPTS), common(LEGACY_OPTS)].concat(_toConsumableArray(OPTS.flatMap(function (opts) {
  return [types(opts), operations(opts), common(opts)];
}))), '}');