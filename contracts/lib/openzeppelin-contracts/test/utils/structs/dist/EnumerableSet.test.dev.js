"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

var EnumerableBytes32SetMock = artifacts.require('EnumerableBytes32SetMock');

var EnumerableAddressSetMock = artifacts.require('EnumerableAddressSetMock');

var EnumerableUintSetMock = artifacts.require('EnumerableUintSetMock');

var _require2 = require('./EnumerableSet.behavior'),
    shouldBehaveLikeSet = _require2.shouldBehaveLikeSet;

contract('EnumerableSet', function (accounts) {
  // Bytes32Set
  describe('EnumerableBytes32Set', function () {
    var bytesA = '0xdeadbeef'.padEnd(66, '0');
    var bytesB = '0x0123456789'.padEnd(66, '0');
    var bytesC = '0x42424242'.padEnd(66, '0');
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(EnumerableBytes32SetMock["new"]());

            case 2:
              this.set = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeSet(bytesA, bytesB, bytesC);
  }); // AddressSet

  describe('EnumerableAddressSet', function () {
    var _accounts = _slicedToArray(accounts, 3),
        accountA = _accounts[0],
        accountB = _accounts[1],
        accountC = _accounts[2];

    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(EnumerableAddressSetMock["new"]());

            case 2:
              this.set = _context2.sent;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeSet(accountA, accountB, accountC);
  }); // UintSet

  describe('EnumerableUintSet', function () {
    var uintA = new BN('1234');
    var uintB = new BN('5678');
    var uintC = new BN('9101112');
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(EnumerableUintSetMock["new"]());

            case 2:
              this.set = _context3.sent;

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeSet(uintA, uintB, uintC);
  });
});