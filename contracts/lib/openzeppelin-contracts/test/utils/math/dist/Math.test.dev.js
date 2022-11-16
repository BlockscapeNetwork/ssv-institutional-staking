"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var MAX_UINT256 = constants.MAX_UINT256;

var _require3 = require('../../helpers/enums.js'),
    Rounding = _require3.Rounding;

var MathMock = artifacts.require('MathMock');

contract('Math', function (accounts) {
  var min = new BN('1234');
  var max = new BN('5678');
  var MAX_UINT256_SUB1 = MAX_UINT256.sub(new BN('1'));
  var MAX_UINT256_SUB2 = MAX_UINT256.sub(new BN('2'));
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(MathMock["new"]());

          case 2:
            this.math = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('max', function () {
    it('is correctly detected in first argument position', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.math.max(max, min));

            case 3:
              _context2.t1 = _context2.sent;
              _context2.t2 = max;
              (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('is correctly detected in second argument position', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.math.max(min, max));

            case 3:
              _context3.t1 = _context3.sent;
              _context3.t2 = max;
              (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('min', function () {
    it('is correctly detected in first argument position', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = expect;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.math.min(min, max));

            case 3:
              _context4.t1 = _context4.sent;
              _context4.t2 = min;
              (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('is correctly detected in second argument position', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = expect;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.math.min(max, min));

            case 3:
              _context5.t1 = _context5.sent;
              _context5.t2 = min;
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
  describe('average', function () {
    function bnAverage(a, b) {
      return a.add(b).divn(2);
    }

    it('is correctly calculated with two odd numbers', function _callee6() {
      var a, b;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              a = new BN('57417');
              b = new BN('95431');
              _context6.t0 = expect;
              _context6.next = 5;
              return regeneratorRuntime.awrap(this.math.average(a, b));

            case 5:
              _context6.t1 = _context6.sent;
              _context6.t2 = bnAverage(a, b);
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('is correctly calculated with two even numbers', function _callee7() {
      var a, b;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              a = new BN('42304');
              b = new BN('84346');
              _context7.t0 = expect;
              _context7.next = 5;
              return regeneratorRuntime.awrap(this.math.average(a, b));

            case 5:
              _context7.t1 = _context7.sent;
              _context7.t2 = bnAverage(a, b);
              (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('is correctly calculated with one even and one odd number', function _callee8() {
      var a, b;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              a = new BN('57417');
              b = new BN('84346');
              _context8.t0 = expect;
              _context8.next = 5;
              return regeneratorRuntime.awrap(this.math.average(a, b));

            case 5:
              _context8.t1 = _context8.sent;
              _context8.t2 = bnAverage(a, b);
              (0, _context8.t0)(_context8.t1).to.be.bignumber.equal(_context8.t2);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('is correctly calculated with two max uint256 numbers', function _callee9() {
      var a;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              a = MAX_UINT256;
              _context9.t0 = expect;
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.math.average(a, a));

            case 4:
              _context9.t1 = _context9.sent;
              _context9.t2 = bnAverage(a, a);
              (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
  });
  describe('ceilDiv', function () {
    it('does not round up on exact division', function _callee10() {
      var a, b;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              a = new BN('10');
              b = new BN('5');
              _context10.t0 = expect;
              _context10.next = 5;
              return regeneratorRuntime.awrap(this.math.ceilDiv(a, b));

            case 5:
              _context10.t1 = _context10.sent;
              (0, _context10.t0)(_context10.t1).to.be.bignumber.equal('2');

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('rounds up on division with remainders', function _callee11() {
      var a, b;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              a = new BN('42');
              b = new BN('13');
              _context11.t0 = expect;
              _context11.next = 5;
              return regeneratorRuntime.awrap(this.math.ceilDiv(a, b));

            case 5:
              _context11.t1 = _context11.sent;
              (0, _context11.t0)(_context11.t1).to.be.bignumber.equal('4');

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    it('does not overflow', function _callee12() {
      var b, result;
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              b = new BN('2');
              result = new BN('1').shln(255);
              _context12.t0 = expect;
              _context12.next = 5;
              return regeneratorRuntime.awrap(this.math.ceilDiv(MAX_UINT256, b));

            case 5:
              _context12.t1 = _context12.sent;
              _context12.t2 = result;
              (0, _context12.t0)(_context12.t1).to.be.bignumber.equal(_context12.t2);

            case 8:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    it('correctly computes max uint256 divided by 1', function _callee13() {
      var b;
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              b = new BN('1');
              _context13.t0 = expect;
              _context13.next = 4;
              return regeneratorRuntime.awrap(this.math.ceilDiv(MAX_UINT256, b));

            case 4:
              _context13.t1 = _context13.sent;
              _context13.t2 = MAX_UINT256;
              (0, _context13.t0)(_context13.t1).to.be.bignumber.equal(_context13.t2);

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
  });
  describe('muldiv', function () {
    it('divide by 0', function _callee14() {
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.math.mulDiv(1, 1, 0, Rounding.Down)));

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    describe('does round down', function _callee17() {
      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              it('small values', function _callee15() {
                return regeneratorRuntime.async(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.t0 = expect;
                        _context15.next = 3;
                        return regeneratorRuntime.awrap(this.math.mulDiv('3', '4', '5', Rounding.Down));

                      case 3:
                        _context15.t1 = _context15.sent;
                        (0, _context15.t0)(_context15.t1).to.be.bignumber.equal('2');
                        _context15.t2 = expect;
                        _context15.next = 8;
                        return regeneratorRuntime.awrap(this.math.mulDiv('3', '5', '5', Rounding.Down));

                      case 8:
                        _context15.t3 = _context15.sent;
                        (0, _context15.t2)(_context15.t3).to.be.bignumber.equal('3');

                      case 10:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, null, this);
              });
              it('large values', function _callee16() {
                return regeneratorRuntime.async(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.t0 = expect;
                        _context16.next = 3;
                        return regeneratorRuntime.awrap(this.math.mulDiv(new BN('42'), MAX_UINT256_SUB1, MAX_UINT256, Rounding.Down));

                      case 3:
                        _context16.t1 = _context16.sent;
                        _context16.t2 = new BN('41');
                        (0, _context16.t0)(_context16.t1).to.be.bignumber.equal(_context16.t2);
                        _context16.t3 = expect;
                        _context16.next = 9;
                        return regeneratorRuntime.awrap(this.math.mulDiv(new BN('17'), MAX_UINT256, MAX_UINT256, Rounding.Down));

                      case 9:
                        _context16.t4 = _context16.sent;
                        _context16.t5 = new BN('17');
                        (0, _context16.t3)(_context16.t4).to.be.bignumber.equal(_context16.t5);
                        _context16.t6 = expect;
                        _context16.next = 15;
                        return regeneratorRuntime.awrap(this.math.mulDiv(MAX_UINT256_SUB1, MAX_UINT256_SUB1, MAX_UINT256, Rounding.Down));

                      case 15:
                        _context16.t7 = _context16.sent;
                        _context16.t8 = MAX_UINT256_SUB2;
                        (0, _context16.t6)(_context16.t7).to.be.bignumber.equal(_context16.t8);
                        _context16.t9 = expect;
                        _context16.next = 21;
                        return regeneratorRuntime.awrap(this.math.mulDiv(MAX_UINT256, MAX_UINT256_SUB1, MAX_UINT256, Rounding.Down));

                      case 21:
                        _context16.t10 = _context16.sent;
                        _context16.t11 = MAX_UINT256_SUB1;
                        (0, _context16.t9)(_context16.t10).to.be.bignumber.equal(_context16.t11);
                        _context16.t12 = expect;
                        _context16.next = 27;
                        return regeneratorRuntime.awrap(this.math.mulDiv(MAX_UINT256, MAX_UINT256, MAX_UINT256, Rounding.Down));

                      case 27:
                        _context16.t13 = _context16.sent;
                        _context16.t14 = MAX_UINT256;
                        (0, _context16.t12)(_context16.t13).to.be.bignumber.equal(_context16.t14);

                      case 30:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, null, this);
              });

            case 2:
            case "end":
              return _context17.stop();
          }
        }
      });
    });
    describe('does round up', function _callee20() {
      return regeneratorRuntime.async(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              it('small values', function _callee18() {
                return regeneratorRuntime.async(function _callee18$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.t0 = expect;
                        _context18.next = 3;
                        return regeneratorRuntime.awrap(this.math.mulDiv('3', '4', '5', Rounding.Up));

                      case 3:
                        _context18.t1 = _context18.sent;
                        (0, _context18.t0)(_context18.t1).to.be.bignumber.equal('3');
                        _context18.t2 = expect;
                        _context18.next = 8;
                        return regeneratorRuntime.awrap(this.math.mulDiv('3', '5', '5', Rounding.Up));

                      case 8:
                        _context18.t3 = _context18.sent;
                        (0, _context18.t2)(_context18.t3).to.be.bignumber.equal('3');

                      case 10:
                      case "end":
                        return _context18.stop();
                    }
                  }
                }, null, this);
              });
              it('large values', function _callee19() {
                return regeneratorRuntime.async(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.t0 = expect;
                        _context19.next = 3;
                        return regeneratorRuntime.awrap(this.math.mulDiv(new BN('42'), MAX_UINT256_SUB1, MAX_UINT256, Rounding.Up));

                      case 3:
                        _context19.t1 = _context19.sent;
                        _context19.t2 = new BN('42');
                        (0, _context19.t0)(_context19.t1).to.be.bignumber.equal(_context19.t2);
                        _context19.t3 = expect;
                        _context19.next = 9;
                        return regeneratorRuntime.awrap(this.math.mulDiv(new BN('17'), MAX_UINT256, MAX_UINT256, Rounding.Up));

                      case 9:
                        _context19.t4 = _context19.sent;
                        _context19.t5 = new BN('17');
                        (0, _context19.t3)(_context19.t4).to.be.bignumber.equal(_context19.t5);
                        _context19.t6 = expect;
                        _context19.next = 15;
                        return regeneratorRuntime.awrap(this.math.mulDiv(MAX_UINT256_SUB1, MAX_UINT256_SUB1, MAX_UINT256, Rounding.Up));

                      case 15:
                        _context19.t7 = _context19.sent;
                        _context19.t8 = MAX_UINT256_SUB1;
                        (0, _context19.t6)(_context19.t7).to.be.bignumber.equal(_context19.t8);
                        _context19.t9 = expect;
                        _context19.next = 21;
                        return regeneratorRuntime.awrap(this.math.mulDiv(MAX_UINT256, MAX_UINT256_SUB1, MAX_UINT256, Rounding.Up));

                      case 21:
                        _context19.t10 = _context19.sent;
                        _context19.t11 = MAX_UINT256_SUB1;
                        (0, _context19.t9)(_context19.t10).to.be.bignumber.equal(_context19.t11);
                        _context19.t12 = expect;
                        _context19.next = 27;
                        return regeneratorRuntime.awrap(this.math.mulDiv(MAX_UINT256, MAX_UINT256, MAX_UINT256, Rounding.Up));

                      case 27:
                        _context19.t13 = _context19.sent;
                        _context19.t14 = MAX_UINT256;
                        (0, _context19.t12)(_context19.t13).to.be.bignumber.equal(_context19.t14);

                      case 30:
                      case "end":
                        return _context19.stop();
                    }
                  }
                }, null, this);
              });

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      });
    });
  });
  describe('sqrt', function () {
    it('rounds down', function _callee21() {
      return regeneratorRuntime.async(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.t0 = expect;
              _context21.next = 3;
              return regeneratorRuntime.awrap(this.math.sqrt('0', Rounding.Down));

            case 3:
              _context21.t1 = _context21.sent;
              (0, _context21.t0)(_context21.t1).to.be.bignumber.equal('0');
              _context21.t2 = expect;
              _context21.next = 8;
              return regeneratorRuntime.awrap(this.math.sqrt('1', Rounding.Down));

            case 8:
              _context21.t3 = _context21.sent;
              (0, _context21.t2)(_context21.t3).to.be.bignumber.equal('1');
              _context21.t4 = expect;
              _context21.next = 13;
              return regeneratorRuntime.awrap(this.math.sqrt('2', Rounding.Down));

            case 13:
              _context21.t5 = _context21.sent;
              (0, _context21.t4)(_context21.t5).to.be.bignumber.equal('1');
              _context21.t6 = expect;
              _context21.next = 18;
              return regeneratorRuntime.awrap(this.math.sqrt('3', Rounding.Down));

            case 18:
              _context21.t7 = _context21.sent;
              (0, _context21.t6)(_context21.t7).to.be.bignumber.equal('1');
              _context21.t8 = expect;
              _context21.next = 23;
              return regeneratorRuntime.awrap(this.math.sqrt('4', Rounding.Down));

            case 23:
              _context21.t9 = _context21.sent;
              (0, _context21.t8)(_context21.t9).to.be.bignumber.equal('2');
              _context21.t10 = expect;
              _context21.next = 28;
              return regeneratorRuntime.awrap(this.math.sqrt('144', Rounding.Down));

            case 28:
              _context21.t11 = _context21.sent;
              (0, _context21.t10)(_context21.t11).to.be.bignumber.equal('12');
              _context21.t12 = expect;
              _context21.next = 33;
              return regeneratorRuntime.awrap(this.math.sqrt('999999', Rounding.Down));

            case 33:
              _context21.t13 = _context21.sent;
              (0, _context21.t12)(_context21.t13).to.be.bignumber.equal('999');
              _context21.t14 = expect;
              _context21.next = 38;
              return regeneratorRuntime.awrap(this.math.sqrt('1000000', Rounding.Down));

            case 38:
              _context21.t15 = _context21.sent;
              (0, _context21.t14)(_context21.t15).to.be.bignumber.equal('1000');
              _context21.t16 = expect;
              _context21.next = 43;
              return regeneratorRuntime.awrap(this.math.sqrt('1000001', Rounding.Down));

            case 43:
              _context21.t17 = _context21.sent;
              (0, _context21.t16)(_context21.t17).to.be.bignumber.equal('1000');
              _context21.t18 = expect;
              _context21.next = 48;
              return regeneratorRuntime.awrap(this.math.sqrt('1002000', Rounding.Down));

            case 48:
              _context21.t19 = _context21.sent;
              (0, _context21.t18)(_context21.t19).to.be.bignumber.equal('1000');
              _context21.t20 = expect;
              _context21.next = 53;
              return regeneratorRuntime.awrap(this.math.sqrt('1002001', Rounding.Down));

            case 53:
              _context21.t21 = _context21.sent;
              (0, _context21.t20)(_context21.t21).to.be.bignumber.equal('1001');
              _context21.t22 = expect;
              _context21.next = 58;
              return regeneratorRuntime.awrap(this.math.sqrt(MAX_UINT256, Rounding.Down));

            case 58:
              _context21.t23 = _context21.sent;
              (0, _context21.t22)(_context21.t23).to.be.bignumber.equal('340282366920938463463374607431768211455');

            case 60:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    });
    it('rounds up', function _callee22() {
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.t0 = expect;
              _context22.next = 3;
              return regeneratorRuntime.awrap(this.math.sqrt('0', Rounding.Up));

            case 3:
              _context22.t1 = _context22.sent;
              (0, _context22.t0)(_context22.t1).to.be.bignumber.equal('0');
              _context22.t2 = expect;
              _context22.next = 8;
              return regeneratorRuntime.awrap(this.math.sqrt('1', Rounding.Up));

            case 8:
              _context22.t3 = _context22.sent;
              (0, _context22.t2)(_context22.t3).to.be.bignumber.equal('1');
              _context22.t4 = expect;
              _context22.next = 13;
              return regeneratorRuntime.awrap(this.math.sqrt('2', Rounding.Up));

            case 13:
              _context22.t5 = _context22.sent;
              (0, _context22.t4)(_context22.t5).to.be.bignumber.equal('2');
              _context22.t6 = expect;
              _context22.next = 18;
              return regeneratorRuntime.awrap(this.math.sqrt('3', Rounding.Up));

            case 18:
              _context22.t7 = _context22.sent;
              (0, _context22.t6)(_context22.t7).to.be.bignumber.equal('2');
              _context22.t8 = expect;
              _context22.next = 23;
              return regeneratorRuntime.awrap(this.math.sqrt('4', Rounding.Up));

            case 23:
              _context22.t9 = _context22.sent;
              (0, _context22.t8)(_context22.t9).to.be.bignumber.equal('2');
              _context22.t10 = expect;
              _context22.next = 28;
              return regeneratorRuntime.awrap(this.math.sqrt('144', Rounding.Up));

            case 28:
              _context22.t11 = _context22.sent;
              (0, _context22.t10)(_context22.t11).to.be.bignumber.equal('12');
              _context22.t12 = expect;
              _context22.next = 33;
              return regeneratorRuntime.awrap(this.math.sqrt('999999', Rounding.Up));

            case 33:
              _context22.t13 = _context22.sent;
              (0, _context22.t12)(_context22.t13).to.be.bignumber.equal('1000');
              _context22.t14 = expect;
              _context22.next = 38;
              return regeneratorRuntime.awrap(this.math.sqrt('1000000', Rounding.Up));

            case 38:
              _context22.t15 = _context22.sent;
              (0, _context22.t14)(_context22.t15).to.be.bignumber.equal('1000');
              _context22.t16 = expect;
              _context22.next = 43;
              return regeneratorRuntime.awrap(this.math.sqrt('1000001', Rounding.Up));

            case 43:
              _context22.t17 = _context22.sent;
              (0, _context22.t16)(_context22.t17).to.be.bignumber.equal('1001');
              _context22.t18 = expect;
              _context22.next = 48;
              return regeneratorRuntime.awrap(this.math.sqrt('1002000', Rounding.Up));

            case 48:
              _context22.t19 = _context22.sent;
              (0, _context22.t18)(_context22.t19).to.be.bignumber.equal('1001');
              _context22.t20 = expect;
              _context22.next = 53;
              return regeneratorRuntime.awrap(this.math.sqrt('1002001', Rounding.Up));

            case 53:
              _context22.t21 = _context22.sent;
              (0, _context22.t20)(_context22.t21).to.be.bignumber.equal('1001');
              _context22.t22 = expect;
              _context22.next = 58;
              return regeneratorRuntime.awrap(this.math.sqrt(MAX_UINT256, Rounding.Up));

            case 58:
              _context22.t23 = _context22.sent;
              (0, _context22.t22)(_context22.t23).to.be.bignumber.equal('340282366920938463463374607431768211456');

            case 60:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
  });
  describe('log', function () {
    describe('log2', function () {
      it('rounds down', function _callee23() {
        return regeneratorRuntime.async(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.t0 = expect;
                _context23.next = 3;
                return regeneratorRuntime.awrap(this.math.log2('0', Rounding.Down));

              case 3:
                _context23.t1 = _context23.sent;
                (0, _context23.t0)(_context23.t1).to.be.bignumber.equal('0');
                _context23.t2 = expect;
                _context23.next = 8;
                return regeneratorRuntime.awrap(this.math.log2('1', Rounding.Down));

              case 8:
                _context23.t3 = _context23.sent;
                (0, _context23.t2)(_context23.t3).to.be.bignumber.equal('0');
                _context23.t4 = expect;
                _context23.next = 13;
                return regeneratorRuntime.awrap(this.math.log2('2', Rounding.Down));

              case 13:
                _context23.t5 = _context23.sent;
                (0, _context23.t4)(_context23.t5).to.be.bignumber.equal('1');
                _context23.t6 = expect;
                _context23.next = 18;
                return regeneratorRuntime.awrap(this.math.log2('3', Rounding.Down));

              case 18:
                _context23.t7 = _context23.sent;
                (0, _context23.t6)(_context23.t7).to.be.bignumber.equal('1');
                _context23.t8 = expect;
                _context23.next = 23;
                return regeneratorRuntime.awrap(this.math.log2('4', Rounding.Down));

              case 23:
                _context23.t9 = _context23.sent;
                (0, _context23.t8)(_context23.t9).to.be.bignumber.equal('2');
                _context23.t10 = expect;
                _context23.next = 28;
                return regeneratorRuntime.awrap(this.math.log2('5', Rounding.Down));

              case 28:
                _context23.t11 = _context23.sent;
                (0, _context23.t10)(_context23.t11).to.be.bignumber.equal('2');
                _context23.t12 = expect;
                _context23.next = 33;
                return regeneratorRuntime.awrap(this.math.log2('6', Rounding.Down));

              case 33:
                _context23.t13 = _context23.sent;
                (0, _context23.t12)(_context23.t13).to.be.bignumber.equal('2');
                _context23.t14 = expect;
                _context23.next = 38;
                return regeneratorRuntime.awrap(this.math.log2('7', Rounding.Down));

              case 38:
                _context23.t15 = _context23.sent;
                (0, _context23.t14)(_context23.t15).to.be.bignumber.equal('2');
                _context23.t16 = expect;
                _context23.next = 43;
                return regeneratorRuntime.awrap(this.math.log2('8', Rounding.Down));

              case 43:
                _context23.t17 = _context23.sent;
                (0, _context23.t16)(_context23.t17).to.be.bignumber.equal('3');
                _context23.t18 = expect;
                _context23.next = 48;
                return regeneratorRuntime.awrap(this.math.log2('9', Rounding.Down));

              case 48:
                _context23.t19 = _context23.sent;
                (0, _context23.t18)(_context23.t19).to.be.bignumber.equal('3');
                _context23.t20 = expect;
                _context23.next = 53;
                return regeneratorRuntime.awrap(this.math.log2(MAX_UINT256, Rounding.Down));

              case 53:
                _context23.t21 = _context23.sent;
                (0, _context23.t20)(_context23.t21).to.be.bignumber.equal('255');

              case 55:
              case "end":
                return _context23.stop();
            }
          }
        }, null, this);
      });
      it('rounds up', function _callee24() {
        return regeneratorRuntime.async(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.t0 = expect;
                _context24.next = 3;
                return regeneratorRuntime.awrap(this.math.log2('0', Rounding.Up));

              case 3:
                _context24.t1 = _context24.sent;
                (0, _context24.t0)(_context24.t1).to.be.bignumber.equal('0');
                _context24.t2 = expect;
                _context24.next = 8;
                return regeneratorRuntime.awrap(this.math.log2('1', Rounding.Up));

              case 8:
                _context24.t3 = _context24.sent;
                (0, _context24.t2)(_context24.t3).to.be.bignumber.equal('0');
                _context24.t4 = expect;
                _context24.next = 13;
                return regeneratorRuntime.awrap(this.math.log2('2', Rounding.Up));

              case 13:
                _context24.t5 = _context24.sent;
                (0, _context24.t4)(_context24.t5).to.be.bignumber.equal('1');
                _context24.t6 = expect;
                _context24.next = 18;
                return regeneratorRuntime.awrap(this.math.log2('3', Rounding.Up));

              case 18:
                _context24.t7 = _context24.sent;
                (0, _context24.t6)(_context24.t7).to.be.bignumber.equal('2');
                _context24.t8 = expect;
                _context24.next = 23;
                return regeneratorRuntime.awrap(this.math.log2('4', Rounding.Up));

              case 23:
                _context24.t9 = _context24.sent;
                (0, _context24.t8)(_context24.t9).to.be.bignumber.equal('2');
                _context24.t10 = expect;
                _context24.next = 28;
                return regeneratorRuntime.awrap(this.math.log2('5', Rounding.Up));

              case 28:
                _context24.t11 = _context24.sent;
                (0, _context24.t10)(_context24.t11).to.be.bignumber.equal('3');
                _context24.t12 = expect;
                _context24.next = 33;
                return regeneratorRuntime.awrap(this.math.log2('6', Rounding.Up));

              case 33:
                _context24.t13 = _context24.sent;
                (0, _context24.t12)(_context24.t13).to.be.bignumber.equal('3');
                _context24.t14 = expect;
                _context24.next = 38;
                return regeneratorRuntime.awrap(this.math.log2('7', Rounding.Up));

              case 38:
                _context24.t15 = _context24.sent;
                (0, _context24.t14)(_context24.t15).to.be.bignumber.equal('3');
                _context24.t16 = expect;
                _context24.next = 43;
                return regeneratorRuntime.awrap(this.math.log2('8', Rounding.Up));

              case 43:
                _context24.t17 = _context24.sent;
                (0, _context24.t16)(_context24.t17).to.be.bignumber.equal('3');
                _context24.t18 = expect;
                _context24.next = 48;
                return regeneratorRuntime.awrap(this.math.log2(MAX_UINT256, Rounding.Up));

              case 48:
                _context24.t19 = _context24.sent;
                (0, _context24.t18)(_context24.t19).to.be.bignumber.equal('256');

              case 50:
              case "end":
                return _context24.stop();
            }
          }
        }, null, this);
      });
    });
    describe('log10', function () {
      it('rounds down', function _callee25() {
        return regeneratorRuntime.async(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.t0 = expect;
                _context25.next = 3;
                return regeneratorRuntime.awrap(this.math.log10('0', Rounding.Down));

              case 3:
                _context25.t1 = _context25.sent;
                (0, _context25.t0)(_context25.t1).to.be.bignumber.equal('0');
                _context25.t2 = expect;
                _context25.next = 8;
                return regeneratorRuntime.awrap(this.math.log10('1', Rounding.Down));

              case 8:
                _context25.t3 = _context25.sent;
                (0, _context25.t2)(_context25.t3).to.be.bignumber.equal('0');
                _context25.t4 = expect;
                _context25.next = 13;
                return regeneratorRuntime.awrap(this.math.log10('2', Rounding.Down));

              case 13:
                _context25.t5 = _context25.sent;
                (0, _context25.t4)(_context25.t5).to.be.bignumber.equal('0');
                _context25.t6 = expect;
                _context25.next = 18;
                return regeneratorRuntime.awrap(this.math.log10('9', Rounding.Down));

              case 18:
                _context25.t7 = _context25.sent;
                (0, _context25.t6)(_context25.t7).to.be.bignumber.equal('0');
                _context25.t8 = expect;
                _context25.next = 23;
                return regeneratorRuntime.awrap(this.math.log10('10', Rounding.Down));

              case 23:
                _context25.t9 = _context25.sent;
                (0, _context25.t8)(_context25.t9).to.be.bignumber.equal('1');
                _context25.t10 = expect;
                _context25.next = 28;
                return regeneratorRuntime.awrap(this.math.log10('11', Rounding.Down));

              case 28:
                _context25.t11 = _context25.sent;
                (0, _context25.t10)(_context25.t11).to.be.bignumber.equal('1');
                _context25.t12 = expect;
                _context25.next = 33;
                return regeneratorRuntime.awrap(this.math.log10('99', Rounding.Down));

              case 33:
                _context25.t13 = _context25.sent;
                (0, _context25.t12)(_context25.t13).to.be.bignumber.equal('1');
                _context25.t14 = expect;
                _context25.next = 38;
                return regeneratorRuntime.awrap(this.math.log10('100', Rounding.Down));

              case 38:
                _context25.t15 = _context25.sent;
                (0, _context25.t14)(_context25.t15).to.be.bignumber.equal('2');
                _context25.t16 = expect;
                _context25.next = 43;
                return regeneratorRuntime.awrap(this.math.log10('101', Rounding.Down));

              case 43:
                _context25.t17 = _context25.sent;
                (0, _context25.t16)(_context25.t17).to.be.bignumber.equal('2');
                _context25.t18 = expect;
                _context25.next = 48;
                return regeneratorRuntime.awrap(this.math.log10('999', Rounding.Down));

              case 48:
                _context25.t19 = _context25.sent;
                (0, _context25.t18)(_context25.t19).to.be.bignumber.equal('2');
                _context25.t20 = expect;
                _context25.next = 53;
                return regeneratorRuntime.awrap(this.math.log10('1000', Rounding.Down));

              case 53:
                _context25.t21 = _context25.sent;
                (0, _context25.t20)(_context25.t21).to.be.bignumber.equal('3');
                _context25.t22 = expect;
                _context25.next = 58;
                return regeneratorRuntime.awrap(this.math.log10('1001', Rounding.Down));

              case 58:
                _context25.t23 = _context25.sent;
                (0, _context25.t22)(_context25.t23).to.be.bignumber.equal('3');
                _context25.t24 = expect;
                _context25.next = 63;
                return regeneratorRuntime.awrap(this.math.log10(MAX_UINT256, Rounding.Down));

              case 63:
                _context25.t25 = _context25.sent;
                (0, _context25.t24)(_context25.t25).to.be.bignumber.equal('77');

              case 65:
              case "end":
                return _context25.stop();
            }
          }
        }, null, this);
      });
      it('rounds up', function _callee26() {
        return regeneratorRuntime.async(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.t0 = expect;
                _context26.next = 3;
                return regeneratorRuntime.awrap(this.math.log10('0', Rounding.Up));

              case 3:
                _context26.t1 = _context26.sent;
                (0, _context26.t0)(_context26.t1).to.be.bignumber.equal('0');
                _context26.t2 = expect;
                _context26.next = 8;
                return regeneratorRuntime.awrap(this.math.log10('1', Rounding.Up));

              case 8:
                _context26.t3 = _context26.sent;
                (0, _context26.t2)(_context26.t3).to.be.bignumber.equal('0');
                _context26.t4 = expect;
                _context26.next = 13;
                return regeneratorRuntime.awrap(this.math.log10('2', Rounding.Up));

              case 13:
                _context26.t5 = _context26.sent;
                (0, _context26.t4)(_context26.t5).to.be.bignumber.equal('1');
                _context26.t6 = expect;
                _context26.next = 18;
                return regeneratorRuntime.awrap(this.math.log10('9', Rounding.Up));

              case 18:
                _context26.t7 = _context26.sent;
                (0, _context26.t6)(_context26.t7).to.be.bignumber.equal('1');
                _context26.t8 = expect;
                _context26.next = 23;
                return regeneratorRuntime.awrap(this.math.log10('10', Rounding.Up));

              case 23:
                _context26.t9 = _context26.sent;
                (0, _context26.t8)(_context26.t9).to.be.bignumber.equal('1');
                _context26.t10 = expect;
                _context26.next = 28;
                return regeneratorRuntime.awrap(this.math.log10('11', Rounding.Up));

              case 28:
                _context26.t11 = _context26.sent;
                (0, _context26.t10)(_context26.t11).to.be.bignumber.equal('2');
                _context26.t12 = expect;
                _context26.next = 33;
                return regeneratorRuntime.awrap(this.math.log10('99', Rounding.Up));

              case 33:
                _context26.t13 = _context26.sent;
                (0, _context26.t12)(_context26.t13).to.be.bignumber.equal('2');
                _context26.t14 = expect;
                _context26.next = 38;
                return regeneratorRuntime.awrap(this.math.log10('100', Rounding.Up));

              case 38:
                _context26.t15 = _context26.sent;
                (0, _context26.t14)(_context26.t15).to.be.bignumber.equal('2');
                _context26.t16 = expect;
                _context26.next = 43;
                return regeneratorRuntime.awrap(this.math.log10('101', Rounding.Up));

              case 43:
                _context26.t17 = _context26.sent;
                (0, _context26.t16)(_context26.t17).to.be.bignumber.equal('3');
                _context26.t18 = expect;
                _context26.next = 48;
                return regeneratorRuntime.awrap(this.math.log10('999', Rounding.Up));

              case 48:
                _context26.t19 = _context26.sent;
                (0, _context26.t18)(_context26.t19).to.be.bignumber.equal('3');
                _context26.t20 = expect;
                _context26.next = 53;
                return regeneratorRuntime.awrap(this.math.log10('1000', Rounding.Up));

              case 53:
                _context26.t21 = _context26.sent;
                (0, _context26.t20)(_context26.t21).to.be.bignumber.equal('3');
                _context26.t22 = expect;
                _context26.next = 58;
                return regeneratorRuntime.awrap(this.math.log10('1001', Rounding.Up));

              case 58:
                _context26.t23 = _context26.sent;
                (0, _context26.t22)(_context26.t23).to.be.bignumber.equal('4');
                _context26.t24 = expect;
                _context26.next = 63;
                return regeneratorRuntime.awrap(this.math.log10(MAX_UINT256, Rounding.Up));

              case 63:
                _context26.t25 = _context26.sent;
                (0, _context26.t24)(_context26.t25).to.be.bignumber.equal('78');

              case 65:
              case "end":
                return _context26.stop();
            }
          }
        }, null, this);
      });
    });
    describe('log256', function () {
      it('rounds down', function _callee27() {
        return regeneratorRuntime.async(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.t0 = expect;
                _context27.next = 3;
                return regeneratorRuntime.awrap(this.math.log256('0', Rounding.Down));

              case 3:
                _context27.t1 = _context27.sent;
                (0, _context27.t0)(_context27.t1).to.be.bignumber.equal('0');
                _context27.t2 = expect;
                _context27.next = 8;
                return regeneratorRuntime.awrap(this.math.log256('1', Rounding.Down));

              case 8:
                _context27.t3 = _context27.sent;
                (0, _context27.t2)(_context27.t3).to.be.bignumber.equal('0');
                _context27.t4 = expect;
                _context27.next = 13;
                return regeneratorRuntime.awrap(this.math.log256('2', Rounding.Down));

              case 13:
                _context27.t5 = _context27.sent;
                (0, _context27.t4)(_context27.t5).to.be.bignumber.equal('0');
                _context27.t6 = expect;
                _context27.next = 18;
                return regeneratorRuntime.awrap(this.math.log256('255', Rounding.Down));

              case 18:
                _context27.t7 = _context27.sent;
                (0, _context27.t6)(_context27.t7).to.be.bignumber.equal('0');
                _context27.t8 = expect;
                _context27.next = 23;
                return regeneratorRuntime.awrap(this.math.log256('256', Rounding.Down));

              case 23:
                _context27.t9 = _context27.sent;
                (0, _context27.t8)(_context27.t9).to.be.bignumber.equal('1');
                _context27.t10 = expect;
                _context27.next = 28;
                return regeneratorRuntime.awrap(this.math.log256('257', Rounding.Down));

              case 28:
                _context27.t11 = _context27.sent;
                (0, _context27.t10)(_context27.t11).to.be.bignumber.equal('1');
                _context27.t12 = expect;
                _context27.next = 33;
                return regeneratorRuntime.awrap(this.math.log256('65535', Rounding.Down));

              case 33:
                _context27.t13 = _context27.sent;
                (0, _context27.t12)(_context27.t13).to.be.bignumber.equal('1');
                _context27.t14 = expect;
                _context27.next = 38;
                return regeneratorRuntime.awrap(this.math.log256('65536', Rounding.Down));

              case 38:
                _context27.t15 = _context27.sent;
                (0, _context27.t14)(_context27.t15).to.be.bignumber.equal('2');
                _context27.t16 = expect;
                _context27.next = 43;
                return regeneratorRuntime.awrap(this.math.log256('65537', Rounding.Down));

              case 43:
                _context27.t17 = _context27.sent;
                (0, _context27.t16)(_context27.t17).to.be.bignumber.equal('2');
                _context27.t18 = expect;
                _context27.next = 48;
                return regeneratorRuntime.awrap(this.math.log256(MAX_UINT256, Rounding.Down));

              case 48:
                _context27.t19 = _context27.sent;
                (0, _context27.t18)(_context27.t19).to.be.bignumber.equal('31');

              case 50:
              case "end":
                return _context27.stop();
            }
          }
        }, null, this);
      });
      it('rounds up', function _callee28() {
        return regeneratorRuntime.async(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.t0 = expect;
                _context28.next = 3;
                return regeneratorRuntime.awrap(this.math.log256('0', Rounding.Up));

              case 3:
                _context28.t1 = _context28.sent;
                (0, _context28.t0)(_context28.t1).to.be.bignumber.equal('0');
                _context28.t2 = expect;
                _context28.next = 8;
                return regeneratorRuntime.awrap(this.math.log256('1', Rounding.Up));

              case 8:
                _context28.t3 = _context28.sent;
                (0, _context28.t2)(_context28.t3).to.be.bignumber.equal('0');
                _context28.t4 = expect;
                _context28.next = 13;
                return regeneratorRuntime.awrap(this.math.log256('2', Rounding.Up));

              case 13:
                _context28.t5 = _context28.sent;
                (0, _context28.t4)(_context28.t5).to.be.bignumber.equal('1');
                _context28.t6 = expect;
                _context28.next = 18;
                return regeneratorRuntime.awrap(this.math.log256('255', Rounding.Up));

              case 18:
                _context28.t7 = _context28.sent;
                (0, _context28.t6)(_context28.t7).to.be.bignumber.equal('1');
                _context28.t8 = expect;
                _context28.next = 23;
                return regeneratorRuntime.awrap(this.math.log256('256', Rounding.Up));

              case 23:
                _context28.t9 = _context28.sent;
                (0, _context28.t8)(_context28.t9).to.be.bignumber.equal('1');
                _context28.t10 = expect;
                _context28.next = 28;
                return regeneratorRuntime.awrap(this.math.log256('257', Rounding.Up));

              case 28:
                _context28.t11 = _context28.sent;
                (0, _context28.t10)(_context28.t11).to.be.bignumber.equal('2');
                _context28.t12 = expect;
                _context28.next = 33;
                return regeneratorRuntime.awrap(this.math.log256('65535', Rounding.Up));

              case 33:
                _context28.t13 = _context28.sent;
                (0, _context28.t12)(_context28.t13).to.be.bignumber.equal('2');
                _context28.t14 = expect;
                _context28.next = 38;
                return regeneratorRuntime.awrap(this.math.log256('65536', Rounding.Up));

              case 38:
                _context28.t15 = _context28.sent;
                (0, _context28.t14)(_context28.t15).to.be.bignumber.equal('2');
                _context28.t16 = expect;
                _context28.next = 43;
                return regeneratorRuntime.awrap(this.math.log256('65537', Rounding.Up));

              case 43:
                _context28.t17 = _context28.sent;
                (0, _context28.t16)(_context28.t17).to.be.bignumber.equal('3');
                _context28.t18 = expect;
                _context28.next = 48;
                return regeneratorRuntime.awrap(this.math.log256(MAX_UINT256, Rounding.Up));

              case 48:
                _context28.t19 = _context28.sent;
                (0, _context28.t18)(_context28.t19).to.be.bignumber.equal('32');

              case 50:
              case "end":
                return _context28.stop();
            }
          }
        }, null, this);
      });
    });
  });
});