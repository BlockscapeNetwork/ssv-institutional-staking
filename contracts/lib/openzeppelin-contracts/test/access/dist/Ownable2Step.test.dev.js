"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var Ownable2Step = artifacts.require('Ownable2StepMock');

contract('Ownable2Step', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      owner = _accounts[0],
      accountA = _accounts[1],
      accountB = _accounts[2];

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Ownable2Step["new"]({
              from: owner
            }));

          case 2:
            this.ownable2Step = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('transfer ownership', function () {
    it('starting a transfer does not change owner', function _callee2() {
      var receipt;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.ownable2Step.transferOwnership(accountA, {
                from: owner
              }));

            case 2:
              receipt = _context2.sent;
              expectEvent(receipt, 'OwnershipTransferStarted', {
                previousOwner: owner,
                newOwner: accountA
              });
              _context2.t0 = expect;
              _context2.next = 7;
              return regeneratorRuntime.awrap(this.ownable2Step.owner());

            case 7:
              _context2.t1 = _context2.sent;
              _context2.t2 = owner;
              (0, _context2.t0)(_context2.t1).to.equal(_context2.t2);
              _context2.t3 = expect;
              _context2.next = 13;
              return regeneratorRuntime.awrap(this.ownable2Step.pendingOwner());

            case 13:
              _context2.t4 = _context2.sent;
              _context2.t5 = accountA;
              (0, _context2.t3)(_context2.t4).to.equal(_context2.t5);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('changes owner after transfer', function _callee3() {
      var receipt;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.ownable2Step.transferOwnership(accountA, {
                from: owner
              }));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.ownable2Step.acceptOwnership({
                from: accountA
              }));

            case 4:
              receipt = _context3.sent;
              expectEvent(receipt, 'OwnershipTransferred', {
                previousOwner: owner,
                newOwner: accountA
              });
              _context3.t0 = expect;
              _context3.next = 9;
              return regeneratorRuntime.awrap(this.ownable2Step.owner());

            case 9:
              _context3.t1 = _context3.sent;
              _context3.t2 = accountA;
              (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);
              _context3.t3 = expect;
              _context3.next = 15;
              return regeneratorRuntime.awrap(this.ownable2Step.pendingOwner());

            case 15:
              _context3.t4 = _context3.sent;
              _context3.t5 = accountA;
              (0, _context3.t3)(_context3.t4).to.not.equal(_context3.t5);

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('changes owner after renouncing ownership', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.ownable2Step.renounceOwnership({
                from: owner
              }));

            case 2:
              _context4.t0 = expect;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.ownable2Step.owner());

            case 5:
              _context4.t1 = _context4.sent;
              _context4.t2 = ZERO_ADDRESS;
              (0, _context4.t0)(_context4.t1).to.equal(_context4.t2);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('pending owner resets after renouncing ownership', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.ownable2Step.transferOwnership(accountA, {
                from: owner
              }));

            case 2:
              _context5.t0 = expect;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.ownable2Step.pendingOwner());

            case 5:
              _context5.t1 = _context5.sent;
              _context5.t2 = accountA;
              (0, _context5.t0)(_context5.t1).to.equal(_context5.t2);
              _context5.next = 10;
              return regeneratorRuntime.awrap(this.ownable2Step.renounceOwnership({
                from: owner
              }));

            case 10:
              _context5.t3 = expect;
              _context5.next = 13;
              return regeneratorRuntime.awrap(this.ownable2Step.pendingOwner());

            case 13:
              _context5.t4 = _context5.sent;
              _context5.t5 = ZERO_ADDRESS;
              (0, _context5.t3)(_context5.t4).to.equal(_context5.t5);
              _context5.next = 18;
              return regeneratorRuntime.awrap(expectRevert(this.ownable2Step.acceptOwnership({
                from: accountA
              }), 'Ownable2Step: caller is not the new owner'));

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('guards transfer against invalid user', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.ownable2Step.transferOwnership(accountA, {
                from: owner
              }));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.ownable2Step.acceptOwnership({
                from: accountB
              }), 'Ownable2Step: caller is not the new owner'));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
});