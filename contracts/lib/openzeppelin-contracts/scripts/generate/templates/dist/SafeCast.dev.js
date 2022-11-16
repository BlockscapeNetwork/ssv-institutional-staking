"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var assert = require('assert');

var format = require('../format-lines');

var _require = require('../../helpers'),
    range = _require.range;

var LENGTHS = range(8, 256, 8).reverse(); // 248 → 8 (in steps of 8)
// Returns the version of OpenZeppelin Contracts in which a particular function was introduced.
// This is used in the docs for each function.

var version = function version(selector, length) {
  switch (selector) {
    case 'toUint(uint)':
      {
        switch (length) {
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
            return '2.5';

          case 96:
          case 224:
            return '4.2';

          default:
            assert(LENGTHS.includes(length));
            return '4.7';
        }
      }

    case 'toInt(int)':
      {
        switch (length) {
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
            return '3.1';

          default:
            assert(LENGTHS.includes(length));
            return '4.7';
        }
      }

    case 'toUint(int)':
      {
        switch (length) {
          case 256:
            return '3.0';

          default:
            assert(false);
            return;
        }
      }

    case 'toInt(uint)':
      {
        switch (length) {
          case 256:
            return '3.0';

          default:
            assert(false);
            return;
        }
      }

    default:
      assert(false);
  }
};

var header = "pragma solidity ^0.8.0;\n\n/**\n * @dev Wrappers over Solidity's uintXX/intXX casting operators with added overflow\n * checks.\n *\n * Downcasting from uint256/int256 in Solidity does not revert on overflow. This can\n * easily result in undesired exploitation or bugs, since developers usually\n * assume that overflows raise errors. `SafeCast` restores this intuition by\n * reverting the transaction when such an operation overflows.\n *\n * Using this library instead of the unchecked operations eliminates an entire\n * class of bugs, so it's recommended to use it always.\n *\n * Can be combined with {SafeMath} and {SignedSafeMath} to extend it to smaller types, by performing\n * all math on `uint256` and `int256` and then downcasting.\n */\n";

var toUintDownCast = function toUintDownCast(length) {
  return "/**\n * @dev Returns the downcasted uint".concat(length, " from uint256, reverting on\n * overflow (when the input is greater than largest uint").concat(length, ").\n *\n * Counterpart to Solidity's `uint").concat(length, "` operator.\n *\n * Requirements:\n *\n * - input must fit into ").concat(length, " bits\n *\n * _Available since v").concat(version('toUint(uint)', length), "._\n */\nfunction toUint").concat(length, "(uint256 value) internal pure returns (uint").concat(length, ") {\n    require(value <= type(uint").concat(length, ").max, \"SafeCast: value doesn't fit in ").concat(length, " bits\");\n    return uint").concat(length, "(value);\n}\n");
};
/* eslint-disable max-len */


var toIntDownCast = function toIntDownCast(length) {
  return "/**\n * @dev Returns the downcasted int".concat(length, " from int256, reverting on\n * overflow (when the input is less than smallest int").concat(length, " or\n * greater than largest int").concat(length, ").\n *\n * Counterpart to Solidity's `int").concat(length, "` operator.\n *\n * Requirements:\n *\n * - input must fit into ").concat(length, " bits\n *\n * _Available since v").concat(version('toInt(int)', length), "._\n */\nfunction toInt").concat(length, "(int256 value) internal pure returns (int").concat(length, " downcasted) {\n    downcasted = int").concat(length, "(value);\n    require(downcasted == value, \"SafeCast: value doesn't fit in ").concat(length, " bits\");\n}\n");
};
/* eslint-enable max-len */


var toInt = function toInt(length) {
  return "/**\n * @dev Converts an unsigned uint".concat(length, " into a signed int").concat(length, ".\n *\n * Requirements:\n *\n * - input must be less than or equal to maxInt").concat(length, ".\n *\n * _Available since v").concat(version('toInt(uint)', length), "._\n */\nfunction toInt").concat(length, "(uint").concat(length, " value) internal pure returns (int").concat(length, ") {\n    // Note: Unsafe cast below is okay because `type(int").concat(length, ").max` is guaranteed to be positive\n    require(value <= uint").concat(length, "(type(int").concat(length, ").max), \"SafeCast: value doesn't fit in an int").concat(length, "\");\n    return int").concat(length, "(value);\n}\n");
};

var toUint = function toUint(length) {
  return "/**\n * @dev Converts a signed int".concat(length, " into an unsigned uint").concat(length, ".\n *\n * Requirements:\n *\n * - input must be greater than or equal to 0.\n *\n * _Available since v").concat(version('toUint(int)', length), "._\n */\nfunction toUint").concat(length, "(int").concat(length, " value) internal pure returns (uint").concat(length, ") {\n    require(value >= 0, \"SafeCast: value must be positive\");\n    return uint").concat(length, "(value);\n}\n");
}; // GENERATE


module.exports = format(header.trimEnd(), 'library SafeCast {', [].concat(_toConsumableArray(LENGTHS.map(toUintDownCast)), [toUint(256)], _toConsumableArray(LENGTHS.map(toIntDownCast)), [toInt(256)]), '}');