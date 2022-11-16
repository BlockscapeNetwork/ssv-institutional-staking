"use strict";

var _require = require('hardhat/config'),
    subtask = _require.subtask;

var _require2 = require('hardhat/builtin-tasks/task-names'),
    TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS = _require2.TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS;

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(function _callee(_, __, runSuper) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(runSuper());

        case 2:
          _context.t0 = function (path) {
            return !path.endsWith('.t.sol');
          };

          return _context.abrupt("return", _context.sent.filter(_context.t0));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});