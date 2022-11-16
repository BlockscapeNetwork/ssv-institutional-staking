"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var StringsMock = artifacts.require('StringsMock');

contract('Strings', function (accounts) {
  before(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(StringsMock["new"]());

          case 2:
            this.strings = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('toString', function () {
    var _loop = function _loop() {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      it("converts ".concat(key), function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = expect;
                _context2.next = 3;
                return regeneratorRuntime.awrap(this.strings.methods['toString(uint256)'](value));

              case 3:
                _context2.t1 = _context2.sent;
                _context2.t2 = value.toString(10);
                (0, _context2.t0)(_context2.t1).to.equal(_context2.t2);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      });
    };

    for (var _i = 0, _Object$entries = Object.entries(['0', '7', '10', '99', '100', '101', '123', '4132', '12345', '1234567', '1234567890', '123456789012345', '12345678901234567890', '123456789012345678901234567890', '1234567890123456789012345678901234567890', '12345678901234567890123456789012345678901234567890', '123456789012345678901234567890123456789012345678901234567890', '1234567890123456789012345678901234567890123456789012345678901234567890'].reduce(function (acc, value) {
      return Object.assign(acc, _defineProperty({}, value, new BN(value)));
    }, {
      MAX_UINT256: constants.MAX_UINT256.toString()
    })); _i < _Object$entries.length; _i++) {
      _loop();
    }
  });
  describe('toHexString', function () {
    it('converts 0', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.strings.methods['toHexString(uint256)'](0));

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.equal('0x00');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('converts a positive number', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = expect;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.strings.methods['toHexString(uint256)'](0x4132));

            case 3:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal('0x4132');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('converts MAX_UINT256', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = expect;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.strings.methods['toHexString(uint256)'](constants.MAX_UINT256));

            case 3:
              _context5.t1 = _context5.sent;
              _context5.t2 = web3.utils.toHex(constants.MAX_UINT256);
              (0, _context5.t0)(_context5.t1).to.equal(_context5.t2);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
  describe('toHexString fixed', function () {
    it('converts a positive number (long)', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.strings.methods['toHexString(uint256,uint256)'](0x4132, 32));

            case 3:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.equal('0x0000000000000000000000000000000000000000000000000000000000004132');

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('converts a positive number (short)', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.strings.methods['toHexString(uint256,uint256)'](0x4132, 1), 'Strings: hex length insufficient'));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('converts MAX_UINT256', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.t0 = expect;
              _context8.next = 3;
              return regeneratorRuntime.awrap(this.strings.methods['toHexString(uint256,uint256)'](constants.MAX_UINT256, 32));

            case 3:
              _context8.t1 = _context8.sent;
              _context8.t2 = web3.utils.toHex(constants.MAX_UINT256);
              (0, _context8.t0)(_context8.t1).to.equal(_context8.t2);

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
  });
  describe('toHexString address', function () {
    it('converts a random address', function _callee9() {
      var addr;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              addr = '0xa9036907dccae6a1e0033479b12e837e5cf5a02f';
              _context9.t0 = expect;
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.strings.methods['toHexString(address)'](addr));

            case 4:
              _context9.t1 = _context9.sent;
              _context9.t2 = addr;
              (0, _context9.t0)(_context9.t1).to.equal(_context9.t2);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('converts an address with leading zeros', function _callee10() {
      var addr;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              addr = '0x0000e0ca771e21bd00057f54a68c30d400000000';
              _context10.t0 = expect;
              _context10.next = 4;
              return regeneratorRuntime.awrap(this.strings.methods['toHexString(address)'](addr));

            case 4:
              _context10.t1 = _context10.sent;
              _context10.t2 = addr;
              (0, _context10.t0)(_context10.t1).to.equal(_context10.t2);

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
  });
});