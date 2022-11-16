"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('./SupportsInterface.behavior'),
    shouldSupportInterfaces = _require2.shouldSupportInterfaces;

var ERC165Mock = artifacts.require('ERC165StorageMock');

contract('ERC165Storage', function (accounts) {
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
  it('register interface', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.mock.supportsInterface('0x00000001'));

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).to.be.equal(false);
            _context2.next = 7;
            return regeneratorRuntime.awrap(this.mock.registerInterface('0x00000001'));

          case 7:
            _context2.t2 = expect;
            _context2.next = 10;
            return regeneratorRuntime.awrap(this.mock.supportsInterface('0x00000001'));

          case 10:
            _context2.t3 = _context2.sent;
            (0, _context2.t2)(_context2.t3).to.be.equal(true);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('does not allow 0xffffffff', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(expectRevert(this.mock.registerInterface('0xffffffff'), 'ERC165: invalid interface id'));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  shouldSupportInterfaces(['ERC165']);
});