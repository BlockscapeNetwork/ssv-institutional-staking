"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ReentrancyMock = artifacts.require('ReentrancyMock');

var ReentrancyAttack = artifacts.require('ReentrancyAttack');

contract('ReentrancyGuard', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ReentrancyMock["new"]());

          case 2:
            this.reentrancyMock = _context.sent;
            _context.t0 = expect;
            _context.next = 6;
            return regeneratorRuntime.awrap(this.reentrancyMock.counter());

          case 6:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1).to.be.bignumber.equal('0');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('nonReentrant function can be called', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.reentrancyMock.counter());

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('0');
            _context2.next = 7;
            return regeneratorRuntime.awrap(this.reentrancyMock.callback());

          case 7:
            _context2.t2 = expect;
            _context2.next = 10;
            return regeneratorRuntime.awrap(this.reentrancyMock.counter());

          case 10:
            _context2.t3 = _context2.sent;
            (0, _context2.t2)(_context2.t3).to.be.bignumber.equal('1');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('does not allow remote callback', function _callee3() {
    var attacker;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(ReentrancyAttack["new"]());

          case 2:
            attacker = _context3.sent;
            _context3.next = 5;
            return regeneratorRuntime.awrap(expectRevert(this.reentrancyMock.countAndCall(attacker.address), 'ReentrancyAttack: failed call'));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('_reentrancyGuardEntered should be true when guarded', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(this.reentrancyMock.guardedCheckEntered());

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('_reentrancyGuardEntered should be false when unguarded', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(this.reentrancyMock.unguardedCheckNotEntered());

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  }); // The following are more side-effects than intended behavior:
  // I put them here as documentation, and to monitor any changes
  // in the side-effects.

  it('does not allow local recursion', function _callee6() {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(expectRevert(this.reentrancyMock.countLocalRecursive(10), 'ReentrancyGuard: reentrant call'));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this);
  });
  it('does not allow indirect local recursion', function _callee7() {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(expectRevert(this.reentrancyMock.countThisRecursive(10), 'ReentrancyMock: failed call'));

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, null, this);
  });
});