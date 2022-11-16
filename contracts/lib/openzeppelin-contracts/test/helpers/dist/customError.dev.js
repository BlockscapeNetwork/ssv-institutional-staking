"use strict";

var _require = require('hardhat'),
    config = _require.config;

var optimizationsEnabled = config.solidity.compilers.some(function (c) {
  return c.settings.optimizer.enabled;
});
/** Revert handler that supports custom errors. */

function expectRevertCustomError(promise, reason) {
  return regeneratorRuntime.async(function expectRevertCustomError$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(promise);

        case 3:
          expect.fail('Expected promise to throw but it didn\'t');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);

          if (reason) {
            if (optimizationsEnabled) {
              // Optimizations currently mess with Hardhat's decoding of custom errors
              expect(_context.t0.message).to.include.oneOf([reason, 'unrecognized return data or custom error']);
            } else {
              expect(_context.t0.message).to.include(reason);
            }
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

;
module.exports = {
  expectRevertCustomError: expectRevertCustomError
};