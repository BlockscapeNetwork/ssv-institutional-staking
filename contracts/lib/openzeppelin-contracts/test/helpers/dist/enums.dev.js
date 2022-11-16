"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

function Enum() {
  for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
    options[_key] = arguments[_key];
  }

  return Object.fromEntries(options.map(function (key, i) {
    return [key, new BN(i)];
  }));
}

module.exports = {
  Enum: Enum,
  ProposalState: Enum('Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'),
  VoteType: Enum('Against', 'For', 'Abstain'),
  Rounding: Enum('Down', 'Up', 'Zero')
};