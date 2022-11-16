"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectRevert = _require.expectRevert;

var MAX_INT256 = constants.MAX_INT256,
    MIN_INT256 = constants.MIN_INT256;

var _require2 = require('chai'),
    expect = _require2.expect;

var SignedSafeMathMock = artifacts.require('SignedSafeMathMock');

contract('SignedSafeMath', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(SignedSafeMathMock["new"]());

          case 2:
            this.safeMath = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });

  function testCommutative(fn, lhs, rhs, expected) {
    return regeneratorRuntime.async(function testCommutative$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(fn(lhs, rhs));

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = expected;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);
            _context2.t3 = expect;
            _context2.next = 9;
            return regeneratorRuntime.awrap(fn(rhs, lhs));

          case 9:
            _context2.t4 = _context2.sent;
            _context2.t5 = expected;
            (0, _context2.t3)(_context2.t4).to.be.bignumber.equal(_context2.t5);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  function testFailsCommutative(fn, lhs, rhs) {
    return regeneratorRuntime.async(function testFailsCommutative$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(expectRevert.unspecified(fn(lhs, rhs)));

          case 2:
            _context3.next = 4;
            return regeneratorRuntime.awrap(expectRevert.unspecified(fn(rhs, lhs)));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  describe('add', function () {
    it('adds correctly if it does not overflow and the result is positive', function _callee2() {
      var a, b;
      return regeneratorRuntime.async(function _callee2$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              a = new BN('1234');
              b = new BN('5678');
              _context4.next = 4;
              return regeneratorRuntime.awrap(testCommutative(this.safeMath.add, a, b, a.add(b)));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('adds correctly if it does not overflow and the result is negative', function _callee3() {
      var a, b;
      return regeneratorRuntime.async(function _callee3$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              a = MAX_INT256;
              b = MIN_INT256;
              _context5.next = 4;
              return regeneratorRuntime.awrap(testCommutative(this.safeMath.add, a, b, a.add(b)));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('reverts on positive addition overflow', function _callee4() {
      var a, b;
      return regeneratorRuntime.async(function _callee4$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              a = MAX_INT256;
              b = new BN('1');
              _context6.next = 4;
              return regeneratorRuntime.awrap(testFailsCommutative(this.safeMath.add, a, b));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('reverts on negative addition overflow', function _callee5() {
      var a, b;
      return regeneratorRuntime.async(function _callee5$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              a = MIN_INT256;
              b = new BN('-1');
              _context7.next = 4;
              return regeneratorRuntime.awrap(testFailsCommutative(this.safeMath.add, a, b));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
  });
  describe('sub', function () {
    it('subtracts correctly if it does not overflow and the result is positive', function _callee6() {
      var a, b, result;
      return regeneratorRuntime.async(function _callee6$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              a = new BN('5678');
              b = new BN('1234');
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.safeMath.sub(a, b));

            case 4:
              result = _context8.sent;
              expect(result).to.be.bignumber.equal(a.sub(b));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('subtracts correctly if it does not overflow and the result is negative', function _callee7() {
      var a, b, result;
      return regeneratorRuntime.async(function _callee7$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              a = new BN('1234');
              b = new BN('5678');
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.safeMath.sub(a, b));

            case 4:
              result = _context9.sent;
              expect(result).to.be.bignumber.equal(a.sub(b));

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('reverts on positive subtraction overflow', function _callee8() {
      var a, b;
      return regeneratorRuntime.async(function _callee8$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              a = MAX_INT256;
              b = new BN('-1');
              _context10.next = 4;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.safeMath.sub(a, b)));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('reverts on negative subtraction overflow', function _callee9() {
      var a, b;
      return regeneratorRuntime.async(function _callee9$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              a = MIN_INT256;
              b = new BN('1');
              _context11.next = 4;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.safeMath.sub(a, b)));

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
  });
  describe('mul', function () {
    it('multiplies correctly', function _callee10() {
      var a, b;
      return regeneratorRuntime.async(function _callee10$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              a = new BN('5678');
              b = new BN('-1234');
              _context12.next = 4;
              return regeneratorRuntime.awrap(testCommutative(this.safeMath.mul, a, b, a.mul(b)));

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    it('multiplies by zero correctly', function _callee11() {
      var a, b;
      return regeneratorRuntime.async(function _callee11$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              a = new BN('0');
              b = new BN('5678');
              _context13.next = 4;
              return regeneratorRuntime.awrap(testCommutative(this.safeMath.mul, a, b, '0'));

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
    it('reverts on multiplication overflow, positive operands', function _callee12() {
      var a, b;
      return regeneratorRuntime.async(function _callee12$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              a = MAX_INT256;
              b = new BN('2');
              _context14.next = 4;
              return regeneratorRuntime.awrap(testFailsCommutative(this.safeMath.mul, a, b));

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    it('reverts when minimum integer is multiplied by -1', function _callee13() {
      var a, b;
      return regeneratorRuntime.async(function _callee13$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              a = MIN_INT256;
              b = new BN('-1');
              _context15.next = 4;
              return regeneratorRuntime.awrap(testFailsCommutative(this.safeMath.mul, a, b));

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
  });
  describe('div', function () {
    it('divides correctly', function _callee14() {
      var a, b, result;
      return regeneratorRuntime.async(function _callee14$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              a = new BN('-5678');
              b = new BN('5678');
              _context16.next = 4;
              return regeneratorRuntime.awrap(this.safeMath.div(a, b));

            case 4:
              result = _context16.sent;
              expect(result).to.be.bignumber.equal(a.div(b));

            case 6:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
    it('divides zero correctly', function _callee15() {
      var a, b;
      return regeneratorRuntime.async(function _callee15$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              a = new BN('0');
              b = new BN('5678');
              _context17.t0 = expect;
              _context17.next = 5;
              return regeneratorRuntime.awrap(this.safeMath.div(a, b));

            case 5:
              _context17.t1 = _context17.sent;
              (0, _context17.t0)(_context17.t1).to.be.bignumber.equal('0');

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('returns complete number result on non-even division', function _callee16() {
      var a, b;
      return regeneratorRuntime.async(function _callee16$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              a = new BN('7000');
              b = new BN('5678');
              _context18.t0 = expect;
              _context18.next = 5;
              return regeneratorRuntime.awrap(this.safeMath.div(a, b));

            case 5:
              _context18.t1 = _context18.sent;
              (0, _context18.t0)(_context18.t1).to.be.bignumber.equal('1');

            case 7:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
    it('reverts on division by zero', function _callee17() {
      var a, b;
      return regeneratorRuntime.async(function _callee17$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              a = new BN('-5678');
              b = new BN('0');
              _context19.next = 4;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.safeMath.div(a, b)));

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
    it('reverts on overflow, negative second', function _callee18() {
      var a, b;
      return regeneratorRuntime.async(function _callee18$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              a = new BN(MIN_INT256);
              b = new BN('-1');
              _context20.next = 4;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.safeMath.div(a, b)));

            case 4:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    });
  });
});