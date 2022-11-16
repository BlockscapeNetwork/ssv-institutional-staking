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

var Ownable = artifacts.require('OwnableMock');

contract('Ownable', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      owner = _accounts[0],
      other = _accounts[1];

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Ownable["new"]({
              from: owner
            }));

          case 2:
            this.ownable = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('has an owner', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.ownable.owner());

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = owner;
            (0, _context2.t0)(_context2.t1).to.equal(_context2.t2);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  describe('transfer ownership', function () {
    it('changes owner after transfer', function _callee3() {
      var receipt;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.ownable.transferOwnership(other, {
                from: owner
              }));

            case 2:
              receipt = _context3.sent;
              expectEvent(receipt, 'OwnershipTransferred');
              _context3.t0 = expect;
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.ownable.owner());

            case 7:
              _context3.t1 = _context3.sent;
              _context3.t2 = other;
              (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('prevents non-owners from transferring', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.ownable.transferOwnership(other, {
                from: other
              }), 'Ownable: caller is not the owner'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('guards ownership against stuck state', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.ownable.transferOwnership(ZERO_ADDRESS, {
                from: owner
              }), 'Ownable: new owner is the zero address'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
  describe('renounce ownership', function () {
    it('loses owner after renouncement', function _callee6() {
      var receipt;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.ownable.renounceOwnership({
                from: owner
              }));

            case 2:
              receipt = _context6.sent;
              expectEvent(receipt, 'OwnershipTransferred');
              _context6.t0 = expect;
              _context6.next = 7;
              return regeneratorRuntime.awrap(this.ownable.owner());

            case 7:
              _context6.t1 = _context6.sent;
              _context6.t2 = ZERO_ADDRESS;
              (0, _context6.t0)(_context6.t1).to.equal(_context6.t2);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('prevents non-owners from renouncement', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.ownable.renounceOwnership({
                from: other
              }), 'Ownable: caller is not the owner'));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
  });
});