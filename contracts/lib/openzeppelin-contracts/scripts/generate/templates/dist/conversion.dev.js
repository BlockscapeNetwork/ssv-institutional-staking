"use strict";

function toBytes32(type, value) {
  switch (type) {
    case 'bytes32':
      return value;

    case 'uint256':
      return "bytes32(".concat(value, ")");

    case 'address':
      return "bytes32(uint256(uint160(".concat(value, ")))");

    default:
      throw new Error("Conversion from ".concat(type, " to bytes32 not supported"));
  }
}

function fromBytes32(type, value) {
  switch (type) {
    case 'bytes32':
      return value;

    case 'uint256':
      return "uint256(".concat(value, ")");

    case 'address':
      return "address(uint160(uint256(".concat(value, ")))");

    default:
      throw new Error("Conversion from bytes32 to ".concat(type, " not supported"));
  }
}

module.exports = {
  toBytes32: toBytes32,
  fromBytes32: fromBytes32
};