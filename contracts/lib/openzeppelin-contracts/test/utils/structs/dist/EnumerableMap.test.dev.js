"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants;

var AddressToUintMapMock = artifacts.require('AddressToUintMapMock');

var UintToAddressMapMock = artifacts.require('UintToAddressMapMock');

var Bytes32ToBytes32MapMock = artifacts.require('Bytes32ToBytes32MapMock');

var UintToUintMapMock = artifacts.require('UintToUintMapMock');

var Bytes32ToUintMapMock = artifacts.require('Bytes32ToUintMapMock');

var _require2 = require('./EnumerableMap.behavior'),
    shouldBehaveLikeMap = _require2.shouldBehaveLikeMap;

contract('EnumerableMap', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      accountA = _accounts[0],
      accountB = _accounts[1],
      accountC = _accounts[2];

  var keyA = new BN('7891');
  var keyB = new BN('451');
  var keyC = new BN('9592328');
  var bytesA = '0xdeadbeef'.padEnd(66, '0');
  var bytesB = '0x0123456789'.padEnd(66, '0');
  var bytesC = '0x42424242'.padEnd(66, '0'); // AddressToUintMap

  describe('AddressToUintMap', function () {
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(AddressToUintMapMock["new"]());

            case 2:
              this.map = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeMap([accountA, accountB, accountC], [keyA, keyB, keyC], new BN('0'));
  }); // UintToAddressMap

  describe('UintToAddressMap', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(UintToAddressMapMock["new"]());

            case 2:
              this.map = _context2.sent;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeMap([keyA, keyB, keyC], [accountA, accountB, accountC], constants.ZERO_ADDRESS);
  }); // Bytes32ToBytes32Map

  describe('Bytes32ToBytes32Map', function () {
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(Bytes32ToBytes32MapMock["new"]());

            case 2:
              this.map = _context3.sent;

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeMap([keyA, keyB, keyC].map(function (k) {
      return '0x' + k.toString(16).padEnd(64, '0');
    }), [bytesA, bytesB, bytesC], constants.ZERO_BYTES32);
  }); // UintToUintMap

  describe('UintToUintMap', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(UintToUintMapMock["new"]());

            case 2:
              this.map = _context4.sent;

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeMap([keyA, keyB, keyC], [keyA, keyB, keyC].map(function (k) {
      return k.add(new BN('1332'));
    }), new BN('0'));
  }); // Bytes32ToUintMap

  describe('Bytes32ToUintMap', function () {
    beforeEach(function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(Bytes32ToUintMapMock["new"]());

            case 2:
              this.map = _context5.sent;

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeMap([bytesA, bytesB, bytesC], [keyA, keyB, keyC], new BN('0'));
  });
});