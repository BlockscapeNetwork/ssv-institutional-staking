"use strict";

var _require = require('./SupportsInterface.behavior'),
    shouldSupportInterfaces = _require.shouldSupportInterfaces;

var ERC165Mock = artifacts.require('ERC165Mock');

contract('ERC165', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC165Mock["new"]());

          case 2:
            this.mock = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldSupportInterfaces(['ERC165']);
});