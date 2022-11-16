"use strict";

var _require = require('chai'),
    expect = _require.expect;

var Base64Mock = artifacts.require('Base64Mock');

contract('Strings', function () {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Base64Mock["new"]());

          case 2:
            this.base64 = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('from bytes - base64', function () {
    it('converts to base64 encoded string with double padding', function _callee2() {
      var TEST_MESSAGE, input;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              TEST_MESSAGE = 'test';
              input = web3.utils.asciiToHex(TEST_MESSAGE);
              _context2.t0 = expect;
              _context2.next = 5;
              return regeneratorRuntime.awrap(this.base64.encode(input));

            case 5:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.equal('dGVzdA==');

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('converts to base64 encoded string with single padding', function _callee3() {
      var TEST_MESSAGE, input;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              TEST_MESSAGE = 'test1';
              input = web3.utils.asciiToHex(TEST_MESSAGE);
              _context3.t0 = expect;
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.base64.encode(input));

            case 5:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.equal('dGVzdDE=');

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('converts to base64 encoded string without padding', function _callee4() {
      var TEST_MESSAGE, input;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              TEST_MESSAGE = 'test12';
              input = web3.utils.asciiToHex(TEST_MESSAGE);
              _context4.t0 = expect;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.base64.encode(input));

            case 5:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal('dGVzdDEy');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('empty bytes', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = expect;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.base64.encode([]));

            case 3:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1).to.equal('');

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
});