"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

var _require2 = require('chai'),
    expect = _require2.expect;

var BitMap = artifacts.require('BitMapMock');

contract('BitMap', function (accounts) {
  var keyA = new BN('7891');
  var keyB = new BN('451');
  var keyC = new BN('9592328');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(BitMap["new"]());

          case 2:
            this.bitmap = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('starts empty', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.bitmap.get(keyA));

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).to.equal(false);
            _context2.t2 = expect;
            _context2.next = 8;
            return regeneratorRuntime.awrap(this.bitmap.get(keyB));

          case 8:
            _context2.t3 = _context2.sent;
            (0, _context2.t2)(_context2.t3).to.equal(false);
            _context2.t4 = expect;
            _context2.next = 13;
            return regeneratorRuntime.awrap(this.bitmap.get(keyC));

          case 13:
            _context2.t5 = _context2.sent;
            (0, _context2.t4)(_context2.t5).to.equal(false);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  describe('setTo', function () {
    it('set a key to true', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA, true));

            case 2:
              _context3.t0 = expect;
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA));

            case 5:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.equal(true);
              _context3.t2 = expect;
              _context3.next = 10;
              return regeneratorRuntime.awrap(this.bitmap.get(keyB));

            case 10:
              _context3.t3 = _context3.sent;
              (0, _context3.t2)(_context3.t3).to.equal(false);
              _context3.t4 = expect;
              _context3.next = 15;
              return regeneratorRuntime.awrap(this.bitmap.get(keyC));

            case 15:
              _context3.t5 = _context3.sent;
              (0, _context3.t4)(_context3.t5).to.equal(false);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('set a key to false', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA, true));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA, false));

            case 4:
              _context4.t0 = expect;
              _context4.next = 7;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA));

            case 7:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal(false);
              _context4.t2 = expect;
              _context4.next = 12;
              return regeneratorRuntime.awrap(this.bitmap.get(keyB));

            case 12:
              _context4.t3 = _context4.sent;
              (0, _context4.t2)(_context4.t3).to.equal(false);
              _context4.t4 = expect;
              _context4.next = 17;
              return regeneratorRuntime.awrap(this.bitmap.get(keyC));

            case 17:
              _context4.t5 = _context4.sent;
              (0, _context4.t4)(_context4.t5).to.equal(false);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('set several consecutive keys', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA.addn(0), true));

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA.addn(1), true));

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA.addn(2), true));

            case 6:
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA.addn(3), true));

            case 8:
              _context5.next = 10;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA.addn(4), true));

            case 10:
              _context5.next = 12;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA.addn(2), false));

            case 12:
              _context5.next = 14;
              return regeneratorRuntime.awrap(this.bitmap.setTo(keyA.addn(4), false));

            case 14:
              _context5.t0 = expect;
              _context5.next = 17;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(0)));

            case 17:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1).to.equal(true);
              _context5.t2 = expect;
              _context5.next = 22;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(1)));

            case 22:
              _context5.t3 = _context5.sent;
              (0, _context5.t2)(_context5.t3).to.equal(true);
              _context5.t4 = expect;
              _context5.next = 27;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(2)));

            case 27:
              _context5.t5 = _context5.sent;
              (0, _context5.t4)(_context5.t5).to.equal(false);
              _context5.t6 = expect;
              _context5.next = 32;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(3)));

            case 32:
              _context5.t7 = _context5.sent;
              (0, _context5.t6)(_context5.t7).to.equal(true);
              _context5.t8 = expect;
              _context5.next = 37;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(4)));

            case 37:
              _context5.t9 = _context5.sent;
              (0, _context5.t8)(_context5.t9).to.equal(false);

            case 39:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
  describe('set', function () {
    it('adds a key', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA));

            case 2:
              _context6.t0 = expect;
              _context6.next = 5;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA));

            case 5:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.equal(true);
              _context6.t2 = expect;
              _context6.next = 10;
              return regeneratorRuntime.awrap(this.bitmap.get(keyB));

            case 10:
              _context6.t3 = _context6.sent;
              (0, _context6.t2)(_context6.t3).to.equal(false);
              _context6.t4 = expect;
              _context6.next = 15;
              return regeneratorRuntime.awrap(this.bitmap.get(keyC));

            case 15:
              _context6.t5 = _context6.sent;
              (0, _context6.t4)(_context6.t5).to.equal(false);

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('adds several keys', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.bitmap.set(keyB));

            case 4:
              _context7.t0 = expect;
              _context7.next = 7;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA));

            case 7:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).to.equal(true);
              _context7.t2 = expect;
              _context7.next = 12;
              return regeneratorRuntime.awrap(this.bitmap.get(keyB));

            case 12:
              _context7.t3 = _context7.sent;
              (0, _context7.t2)(_context7.t3).to.equal(true);
              _context7.t4 = expect;
              _context7.next = 17;
              return regeneratorRuntime.awrap(this.bitmap.get(keyC));

            case 17:
              _context7.t5 = _context7.sent;
              (0, _context7.t4)(_context7.t5).to.equal(false);

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('adds several consecutive keys', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA.addn(0)));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA.addn(1)));

            case 4:
              _context8.next = 6;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA.addn(3)));

            case 6:
              _context8.t0 = expect;
              _context8.next = 9;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(0)));

            case 9:
              _context8.t1 = _context8.sent;
              (0, _context8.t0)(_context8.t1).to.equal(true);
              _context8.t2 = expect;
              _context8.next = 14;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(1)));

            case 14:
              _context8.t3 = _context8.sent;
              (0, _context8.t2)(_context8.t3).to.equal(true);
              _context8.t4 = expect;
              _context8.next = 19;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(2)));

            case 19:
              _context8.t5 = _context8.sent;
              (0, _context8.t4)(_context8.t5).to.equal(false);
              _context8.t6 = expect;
              _context8.next = 24;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(3)));

            case 24:
              _context8.t7 = _context8.sent;
              (0, _context8.t6)(_context8.t7).to.equal(true);
              _context8.t8 = expect;
              _context8.next = 29;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(4)));

            case 29:
              _context8.t9 = _context8.sent;
              (0, _context8.t8)(_context8.t9).to.equal(false);

            case 31:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
  });
  describe('unset', function () {
    it('removes added keys', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.bitmap.set(keyB));

            case 4:
              _context9.next = 6;
              return regeneratorRuntime.awrap(this.bitmap.unset(keyA));

            case 6:
              _context9.t0 = expect;
              _context9.next = 9;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA));

            case 9:
              _context9.t1 = _context9.sent;
              (0, _context9.t0)(_context9.t1).to.equal(false);
              _context9.t2 = expect;
              _context9.next = 14;
              return regeneratorRuntime.awrap(this.bitmap.get(keyB));

            case 14:
              _context9.t3 = _context9.sent;
              (0, _context9.t2)(_context9.t3).to.equal(true);
              _context9.t4 = expect;
              _context9.next = 19;
              return regeneratorRuntime.awrap(this.bitmap.get(keyC));

            case 19:
              _context9.t5 = _context9.sent;
              (0, _context9.t4)(_context9.t5).to.equal(false);

            case 21:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('removes consecutive added keys', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA.addn(0)));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA.addn(1)));

            case 4:
              _context10.next = 6;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA.addn(3)));

            case 6:
              _context10.next = 8;
              return regeneratorRuntime.awrap(this.bitmap.unset(keyA.addn(1)));

            case 8:
              _context10.t0 = expect;
              _context10.next = 11;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(0)));

            case 11:
              _context10.t1 = _context10.sent;
              (0, _context10.t0)(_context10.t1).to.equal(true);
              _context10.t2 = expect;
              _context10.next = 16;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(1)));

            case 16:
              _context10.t3 = _context10.sent;
              (0, _context10.t2)(_context10.t3).to.equal(false);
              _context10.t4 = expect;
              _context10.next = 21;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(2)));

            case 21:
              _context10.t5 = _context10.sent;
              (0, _context10.t4)(_context10.t5).to.equal(false);
              _context10.t6 = expect;
              _context10.next = 26;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(3)));

            case 26:
              _context10.t7 = _context10.sent;
              (0, _context10.t6)(_context10.t7).to.equal(true);
              _context10.t8 = expect;
              _context10.next = 31;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA.addn(4)));

            case 31:
              _context10.t9 = _context10.sent;
              (0, _context10.t8)(_context10.t9).to.equal(false);

            case 33:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('adds and removes multiple keys', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA));

            case 2:
              _context11.next = 4;
              return regeneratorRuntime.awrap(this.bitmap.set(keyC));

            case 4:
              _context11.next = 6;
              return regeneratorRuntime.awrap(this.bitmap.unset(keyA));

            case 6:
              _context11.next = 8;
              return regeneratorRuntime.awrap(this.bitmap.unset(keyB));

            case 8:
              _context11.next = 10;
              return regeneratorRuntime.awrap(this.bitmap.set(keyB));

            case 10:
              _context11.next = 12;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA));

            case 12:
              _context11.next = 14;
              return regeneratorRuntime.awrap(this.bitmap.unset(keyC));

            case 14:
              _context11.next = 16;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA));

            case 16:
              _context11.next = 18;
              return regeneratorRuntime.awrap(this.bitmap.set(keyB));

            case 18:
              _context11.next = 20;
              return regeneratorRuntime.awrap(this.bitmap.set(keyC));

            case 20:
              _context11.next = 22;
              return regeneratorRuntime.awrap(this.bitmap.unset(keyA));

            case 22:
              _context11.next = 24;
              return regeneratorRuntime.awrap(this.bitmap.set(keyA));

            case 24:
              _context11.next = 26;
              return regeneratorRuntime.awrap(this.bitmap.unset(keyB));

            case 26:
              _context11.t0 = expect;
              _context11.next = 29;
              return regeneratorRuntime.awrap(this.bitmap.get(keyA));

            case 29:
              _context11.t1 = _context11.sent;
              (0, _context11.t0)(_context11.t1).to.equal(true);
              _context11.t2 = expect;
              _context11.next = 34;
              return regeneratorRuntime.awrap(this.bitmap.get(keyB));

            case 34:
              _context11.t3 = _context11.sent;
              (0, _context11.t2)(_context11.t3).to.equal(false);
              _context11.t4 = expect;
              _context11.next = 39;
              return regeneratorRuntime.awrap(this.bitmap.get(keyC));

            case 39:
              _context11.t5 = _context11.sent;
              (0, _context11.t4)(_context11.t5).to.equal(true);

            case 41:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
  });
});