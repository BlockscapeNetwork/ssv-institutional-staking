"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectRevert = _require.expectRevert;

var MAX_UINT256 = constants.MAX_UINT256;

var _require2 = require('chai'),
    expect = _require2.expect;

var SafeMathMock = artifacts.require('SafeMathMock');

function expectStruct(value, expected) {
  for (var key in expected) {
    if (BN.isBN(value[key])) {
      expect(value[key]).to.be.bignumber.equal(expected[key]);
    } else {
      expect(value[key]).to.be.equal(expected[key]);
    }
  }
}

contract('SafeMath', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(SafeMathMock["new"]());

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
    var _len,
        extra,
        _key,
        _args2 = arguments;

    return regeneratorRuntime.async(function testCommutative$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            for (_len = _args2.length, extra = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
              extra[_key - 4] = _args2[_key];
            }

            _context2.t0 = expect;
            _context2.next = 4;
            return regeneratorRuntime.awrap(fn.apply(void 0, [lhs, rhs].concat(extra)));

          case 4:
            _context2.t1 = _context2.sent;
            _context2.t2 = expected;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);
            _context2.t3 = expect;
            _context2.next = 10;
            return regeneratorRuntime.awrap(fn.apply(void 0, [rhs, lhs].concat(extra)));

          case 10:
            _context2.t4 = _context2.sent;
            _context2.t5 = expected;
            (0, _context2.t3)(_context2.t4).to.be.bignumber.equal(_context2.t5);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  function testFailsCommutative(fn, lhs, rhs, reason) {
    var _len2,
        extra,
        _key2,
        _args3 = arguments;

    return regeneratorRuntime.async(function testFailsCommutative$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            for (_len2 = _args3.length, extra = new Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
              extra[_key2 - 4] = _args3[_key2];
            }

            if (!(reason === undefined)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 4;
            return regeneratorRuntime.awrap(expectRevert.unspecified(fn.apply(void 0, [lhs, rhs].concat(extra))));

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(expectRevert.unspecified(fn.apply(void 0, [rhs, lhs].concat(extra))));

          case 6:
            _context3.next = 12;
            break;

          case 8:
            _context3.next = 10;
            return regeneratorRuntime.awrap(expectRevert(fn.apply(void 0, [lhs, rhs].concat(extra)), reason));

          case 10:
            _context3.next = 12;
            return regeneratorRuntime.awrap(expectRevert(fn.apply(void 0, [rhs, lhs].concat(extra)), reason));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  function testCommutativeIterable(fn, lhs, rhs, expected) {
    var _len3,
        extra,
        _key3,
        _args4 = arguments;

    return regeneratorRuntime.async(function testCommutativeIterable$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            for (_len3 = _args4.length, extra = new Array(_len3 > 4 ? _len3 - 4 : 0), _key3 = 4; _key3 < _len3; _key3++) {
              extra[_key3 - 4] = _args4[_key3];
            }

            _context4.t0 = expectStruct;
            _context4.next = 4;
            return regeneratorRuntime.awrap(fn.apply(void 0, [lhs, rhs].concat(extra)));

          case 4:
            _context4.t1 = _context4.sent;
            _context4.t2 = expected;
            (0, _context4.t0)(_context4.t1, _context4.t2);
            _context4.t3 = expectStruct;
            _context4.next = 10;
            return regeneratorRuntime.awrap(fn.apply(void 0, [rhs, lhs].concat(extra)));

          case 10:
            _context4.t4 = _context4.sent;
            _context4.t5 = expected;
            (0, _context4.t3)(_context4.t4, _context4.t5);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    });
  }

  describe('with flag', function () {
    describe('add', function () {
      it('adds correctly', function _callee2() {
        var a, b;
        return regeneratorRuntime.async(function _callee2$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                a = new BN('5678');
                b = new BN('1234');
                testCommutativeIterable(this.safeMath.tryAdd, a, b, {
                  flag: true,
                  value: a.add(b)
                });

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('reverts on addition overflow', function _callee3() {
        var a, b;
        return regeneratorRuntime.async(function _callee3$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                a = MAX_UINT256;
                b = new BN('1');
                testCommutativeIterable(this.safeMath.tryAdd, a, b, {
                  flag: false,
                  value: '0'
                });

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    describe('sub', function () {
      it('subtracts correctly', function _callee4() {
        var a, b;
        return regeneratorRuntime.async(function _callee4$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                a = new BN('5678');
                b = new BN('1234');
                _context7.t0 = expectStruct;
                _context7.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.trySub(a, b));

              case 5:
                _context7.t1 = _context7.sent;
                _context7.t2 = {
                  flag: true,
                  value: a.sub(b)
                };
                (0, _context7.t0)(_context7.t1, _context7.t2);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('reverts if subtraction result would be negative', function _callee5() {
        var a, b;
        return regeneratorRuntime.async(function _callee5$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                a = new BN('1234');
                b = new BN('5678');
                _context8.t0 = expectStruct;
                _context8.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.trySub(a, b));

              case 5:
                _context8.t1 = _context8.sent;
                _context8.t2 = {
                  flag: false,
                  value: '0'
                };
                (0, _context8.t0)(_context8.t1, _context8.t2);

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
    describe('mul', function () {
      it('multiplies correctly', function _callee6() {
        var a, b;
        return regeneratorRuntime.async(function _callee6$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                a = new BN('1234');
                b = new BN('5678');
                testCommutativeIterable(this.safeMath.tryMul, a, b, {
                  flag: true,
                  value: a.mul(b)
                });

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('multiplies by zero correctly', function _callee7() {
        var a, b;
        return regeneratorRuntime.async(function _callee7$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                a = new BN('0');
                b = new BN('5678');
                testCommutativeIterable(this.safeMath.tryMul, a, b, {
                  flag: true,
                  value: a.mul(b)
                });

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('reverts on multiplication overflow', function _callee8() {
        var a, b;
        return regeneratorRuntime.async(function _callee8$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                a = MAX_UINT256;
                b = new BN('2');
                testCommutativeIterable(this.safeMath.tryMul, a, b, {
                  flag: false,
                  value: '0'
                });

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
    describe('div', function () {
      it('divides correctly', function _callee9() {
        var a, b;
        return regeneratorRuntime.async(function _callee9$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                a = new BN('5678');
                b = new BN('5678');
                _context12.t0 = expectStruct;
                _context12.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.tryDiv(a, b));

              case 5:
                _context12.t1 = _context12.sent;
                _context12.t2 = {
                  flag: true,
                  value: a.div(b)
                };
                (0, _context12.t0)(_context12.t1, _context12.t2);

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('divides zero correctly', function _callee10() {
        var a, b;
        return regeneratorRuntime.async(function _callee10$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                a = new BN('0');
                b = new BN('5678');
                _context13.t0 = expectStruct;
                _context13.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.tryDiv(a, b));

              case 5:
                _context13.t1 = _context13.sent;
                _context13.t2 = {
                  flag: true,
                  value: a.div(b)
                };
                (0, _context13.t0)(_context13.t1, _context13.t2);

              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('returns complete number result on non-even division', function _callee11() {
        var a, b;
        return regeneratorRuntime.async(function _callee11$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                a = new BN('7000');
                b = new BN('5678');
                _context14.t0 = expectStruct;
                _context14.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.tryDiv(a, b));

              case 5:
                _context14.t1 = _context14.sent;
                _context14.t2 = {
                  flag: true,
                  value: a.div(b)
                };
                (0, _context14.t0)(_context14.t1, _context14.t2);

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('reverts on division by zero', function _callee12() {
        var a, b;
        return regeneratorRuntime.async(function _callee12$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                a = new BN('5678');
                b = new BN('0');
                _context15.t0 = expectStruct;
                _context15.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.tryDiv(a, b));

              case 5:
                _context15.t1 = _context15.sent;
                _context15.t2 = {
                  flag: false,
                  value: '0'
                };
                (0, _context15.t0)(_context15.t1, _context15.t2);

              case 8:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
    });
    describe('mod', function () {
      describe('modulos correctly', function _callee17() {
        return regeneratorRuntime.async(function _callee17$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                it('when the dividend is smaller than the divisor', function _callee13() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee13$(_context16) {
                    while (1) {
                      switch (_context16.prev = _context16.next) {
                        case 0:
                          a = new BN('284');
                          b = new BN('5678');
                          _context16.t0 = expectStruct;
                          _context16.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.tryMod(a, b));

                        case 5:
                          _context16.t1 = _context16.sent;
                          _context16.t2 = {
                            flag: true,
                            value: a.mod(b)
                          };
                          (0, _context16.t0)(_context16.t1, _context16.t2);

                        case 8:
                        case "end":
                          return _context16.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is equal to the divisor', function _callee14() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee14$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          a = new BN('5678');
                          b = new BN('5678');
                          _context17.t0 = expectStruct;
                          _context17.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.tryMod(a, b));

                        case 5:
                          _context17.t1 = _context17.sent;
                          _context17.t2 = {
                            flag: true,
                            value: a.mod(b)
                          };
                          (0, _context17.t0)(_context17.t1, _context17.t2);

                        case 8:
                        case "end":
                          return _context17.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is larger than the divisor', function _callee15() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee15$(_context18) {
                    while (1) {
                      switch (_context18.prev = _context18.next) {
                        case 0:
                          a = new BN('7000');
                          b = new BN('5678');
                          _context18.t0 = expectStruct;
                          _context18.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.tryMod(a, b));

                        case 5:
                          _context18.t1 = _context18.sent;
                          _context18.t2 = {
                            flag: true,
                            value: a.mod(b)
                          };
                          (0, _context18.t0)(_context18.t1, _context18.t2);

                        case 8:
                        case "end":
                          return _context18.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is a multiple of the divisor', function _callee16() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee16$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          a = new BN('17034'); // 17034 == 5678 * 3

                          b = new BN('5678');
                          _context19.t0 = expectStruct;
                          _context19.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.tryMod(a, b));

                        case 5:
                          _context19.t1 = _context19.sent;
                          _context19.t2 = {
                            flag: true,
                            value: a.mod(b)
                          };
                          (0, _context19.t0)(_context19.t1, _context19.t2);

                        case 8:
                        case "end":
                          return _context19.stop();
                      }
                    }
                  }, null, this);
                });

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        });
      });
      it('reverts with a 0 divisor', function _callee18() {
        var a, b;
        return regeneratorRuntime.async(function _callee18$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                a = new BN('5678');
                b = new BN('0');
                _context21.t0 = expectStruct;
                _context21.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.tryMod(a, b));

              case 5:
                _context21.t1 = _context21.sent;
                _context21.t2 = {
                  flag: false,
                  value: '0'
                };
                (0, _context21.t0)(_context21.t1, _context21.t2);

              case 8:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('with default revert message', function () {
    describe('add', function () {
      it('adds correctly', function _callee19() {
        var a, b;
        return regeneratorRuntime.async(function _callee19$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                a = new BN('5678');
                b = new BN('1234');
                _context22.next = 4;
                return regeneratorRuntime.awrap(testCommutative(this.safeMath.doAdd, a, b, a.add(b)));

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, null, this);
      });
      it('reverts on addition overflow', function _callee20() {
        var a, b;
        return regeneratorRuntime.async(function _callee20$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                a = MAX_UINT256;
                b = new BN('1');
                _context23.next = 4;
                return regeneratorRuntime.awrap(testFailsCommutative(this.safeMath.doAdd, a, b, undefined));

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, null, this);
      });
    });
    describe('sub', function () {
      it('subtracts correctly', function _callee21() {
        var a, b;
        return regeneratorRuntime.async(function _callee21$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                a = new BN('5678');
                b = new BN('1234');
                _context24.t0 = expect;
                _context24.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.doSub(a, b));

              case 5:
                _context24.t1 = _context24.sent;
                _context24.t2 = a.sub(b);
                (0, _context24.t0)(_context24.t1).to.be.bignumber.equal(_context24.t2);

              case 8:
              case "end":
                return _context24.stop();
            }
          }
        }, null, this);
      });
      it('reverts if subtraction result would be negative', function _callee22() {
        var a, b;
        return regeneratorRuntime.async(function _callee22$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                a = new BN('1234');
                b = new BN('5678');
                _context25.next = 4;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.safeMath.doSub(a, b)));

              case 4:
              case "end":
                return _context25.stop();
            }
          }
        }, null, this);
      });
    });
    describe('mul', function () {
      it('multiplies correctly', function _callee23() {
        var a, b;
        return regeneratorRuntime.async(function _callee23$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                a = new BN('1234');
                b = new BN('5678');
                _context26.next = 4;
                return regeneratorRuntime.awrap(testCommutative(this.safeMath.doMul, a, b, a.mul(b)));

              case 4:
              case "end":
                return _context26.stop();
            }
          }
        }, null, this);
      });
      it('multiplies by zero correctly', function _callee24() {
        var a, b;
        return regeneratorRuntime.async(function _callee24$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                a = new BN('0');
                b = new BN('5678');
                _context27.next = 4;
                return regeneratorRuntime.awrap(testCommutative(this.safeMath.doMul, a, b, '0'));

              case 4:
              case "end":
                return _context27.stop();
            }
          }
        }, null, this);
      });
      it('reverts on multiplication overflow', function _callee25() {
        var a, b;
        return regeneratorRuntime.async(function _callee25$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                a = MAX_UINT256;
                b = new BN('2');
                _context28.next = 4;
                return regeneratorRuntime.awrap(testFailsCommutative(this.safeMath.doMul, a, b, undefined));

              case 4:
              case "end":
                return _context28.stop();
            }
          }
        }, null, this);
      });
    });
    describe('div', function () {
      it('divides correctly', function _callee26() {
        var a, b;
        return regeneratorRuntime.async(function _callee26$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                a = new BN('5678');
                b = new BN('5678');
                _context29.t0 = expect;
                _context29.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.doDiv(a, b));

              case 5:
                _context29.t1 = _context29.sent;
                _context29.t2 = a.div(b);
                (0, _context29.t0)(_context29.t1).to.be.bignumber.equal(_context29.t2);

              case 8:
              case "end":
                return _context29.stop();
            }
          }
        }, null, this);
      });
      it('divides zero correctly', function _callee27() {
        var a, b;
        return regeneratorRuntime.async(function _callee27$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                a = new BN('0');
                b = new BN('5678');
                _context30.t0 = expect;
                _context30.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.doDiv(a, b));

              case 5:
                _context30.t1 = _context30.sent;
                (0, _context30.t0)(_context30.t1).to.be.bignumber.equal('0');

              case 7:
              case "end":
                return _context30.stop();
            }
          }
        }, null, this);
      });
      it('returns complete number result on non-even division', function _callee28() {
        var a, b;
        return regeneratorRuntime.async(function _callee28$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                a = new BN('7000');
                b = new BN('5678');
                _context31.t0 = expect;
                _context31.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.doDiv(a, b));

              case 5:
                _context31.t1 = _context31.sent;
                (0, _context31.t0)(_context31.t1).to.be.bignumber.equal('1');

              case 7:
              case "end":
                return _context31.stop();
            }
          }
        }, null, this);
      });
      it('reverts on division by zero', function _callee29() {
        var a, b;
        return regeneratorRuntime.async(function _callee29$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                a = new BN('5678');
                b = new BN('0');
                _context32.next = 4;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.safeMath.doDiv(a, b)));

              case 4:
              case "end":
                return _context32.stop();
            }
          }
        }, null, this);
      });
    });
    describe('mod', function () {
      describe('modulos correctly', function _callee34() {
        return regeneratorRuntime.async(function _callee34$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                it('when the dividend is smaller than the divisor', function _callee30() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee30$(_context33) {
                    while (1) {
                      switch (_context33.prev = _context33.next) {
                        case 0:
                          a = new BN('284');
                          b = new BN('5678');
                          _context33.t0 = expect;
                          _context33.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.doMod(a, b));

                        case 5:
                          _context33.t1 = _context33.sent;
                          _context33.t2 = a.mod(b);
                          (0, _context33.t0)(_context33.t1).to.be.bignumber.equal(_context33.t2);

                        case 8:
                        case "end":
                          return _context33.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is equal to the divisor', function _callee31() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee31$(_context34) {
                    while (1) {
                      switch (_context34.prev = _context34.next) {
                        case 0:
                          a = new BN('5678');
                          b = new BN('5678');
                          _context34.t0 = expect;
                          _context34.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.doMod(a, b));

                        case 5:
                          _context34.t1 = _context34.sent;
                          _context34.t2 = a.mod(b);
                          (0, _context34.t0)(_context34.t1).to.be.bignumber.equal(_context34.t2);

                        case 8:
                        case "end":
                          return _context34.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is larger than the divisor', function _callee32() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee32$(_context35) {
                    while (1) {
                      switch (_context35.prev = _context35.next) {
                        case 0:
                          a = new BN('7000');
                          b = new BN('5678');
                          _context35.t0 = expect;
                          _context35.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.doMod(a, b));

                        case 5:
                          _context35.t1 = _context35.sent;
                          _context35.t2 = a.mod(b);
                          (0, _context35.t0)(_context35.t1).to.be.bignumber.equal(_context35.t2);

                        case 8:
                        case "end":
                          return _context35.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is a multiple of the divisor', function _callee33() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee33$(_context36) {
                    while (1) {
                      switch (_context36.prev = _context36.next) {
                        case 0:
                          a = new BN('17034'); // 17034 == 5678 * 3

                          b = new BN('5678');
                          _context36.t0 = expect;
                          _context36.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.doMod(a, b));

                        case 5:
                          _context36.t1 = _context36.sent;
                          _context36.t2 = a.mod(b);
                          (0, _context36.t0)(_context36.t1).to.be.bignumber.equal(_context36.t2);

                        case 8:
                        case "end":
                          return _context36.stop();
                      }
                    }
                  }, null, this);
                });

              case 4:
              case "end":
                return _context37.stop();
            }
          }
        });
      });
      it('reverts with a 0 divisor', function _callee35() {
        var a, b;
        return regeneratorRuntime.async(function _callee35$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                a = new BN('5678');
                b = new BN('0');
                _context38.next = 4;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.safeMath.doMod(a, b)));

              case 4:
              case "end":
                return _context38.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('with custom revert message', function () {
    describe('sub', function () {
      it('subtracts correctly', function _callee36() {
        var a, b;
        return regeneratorRuntime.async(function _callee36$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                a = new BN('5678');
                b = new BN('1234');
                _context39.t0 = expect;
                _context39.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.subWithMessage(a, b, 'MyErrorMessage'));

              case 5:
                _context39.t1 = _context39.sent;
                _context39.t2 = a.sub(b);
                (0, _context39.t0)(_context39.t1).to.be.bignumber.equal(_context39.t2);

              case 8:
              case "end":
                return _context39.stop();
            }
          }
        }, null, this);
      });
      it('reverts if subtraction result would be negative', function _callee37() {
        var a, b;
        return regeneratorRuntime.async(function _callee37$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                a = new BN('1234');
                b = new BN('5678');
                _context40.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.safeMath.subWithMessage(a, b, 'MyErrorMessage'), 'MyErrorMessage'));

              case 4:
              case "end":
                return _context40.stop();
            }
          }
        }, null, this);
      });
    });
    describe('div', function () {
      it('divides correctly', function _callee38() {
        var a, b;
        return regeneratorRuntime.async(function _callee38$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                a = new BN('5678');
                b = new BN('5678');
                _context41.t0 = expect;
                _context41.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.divWithMessage(a, b, 'MyErrorMessage'));

              case 5:
                _context41.t1 = _context41.sent;
                _context41.t2 = a.div(b);
                (0, _context41.t0)(_context41.t1).to.be.bignumber.equal(_context41.t2);

              case 8:
              case "end":
                return _context41.stop();
            }
          }
        }, null, this);
      });
      it('divides zero correctly', function _callee39() {
        var a, b;
        return regeneratorRuntime.async(function _callee39$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                a = new BN('0');
                b = new BN('5678');
                _context42.t0 = expect;
                _context42.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.divWithMessage(a, b, 'MyErrorMessage'));

              case 5:
                _context42.t1 = _context42.sent;
                (0, _context42.t0)(_context42.t1).to.be.bignumber.equal('0');

              case 7:
              case "end":
                return _context42.stop();
            }
          }
        }, null, this);
      });
      it('returns complete number result on non-even division', function _callee40() {
        var a, b;
        return regeneratorRuntime.async(function _callee40$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                a = new BN('7000');
                b = new BN('5678');
                _context43.t0 = expect;
                _context43.next = 5;
                return regeneratorRuntime.awrap(this.safeMath.divWithMessage(a, b, 'MyErrorMessage'));

              case 5:
                _context43.t1 = _context43.sent;
                (0, _context43.t0)(_context43.t1).to.be.bignumber.equal('1');

              case 7:
              case "end":
                return _context43.stop();
            }
          }
        }, null, this);
      });
      it('reverts on division by zero', function _callee41() {
        var a, b;
        return regeneratorRuntime.async(function _callee41$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                a = new BN('5678');
                b = new BN('0');
                _context44.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.safeMath.divWithMessage(a, b, 'MyErrorMessage'), 'MyErrorMessage'));

              case 4:
              case "end":
                return _context44.stop();
            }
          }
        }, null, this);
      });
    });
    describe('mod', function () {
      describe('modulos correctly', function _callee46() {
        return regeneratorRuntime.async(function _callee46$(_context49) {
          while (1) {
            switch (_context49.prev = _context49.next) {
              case 0:
                it('when the dividend is smaller than the divisor', function _callee42() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee42$(_context45) {
                    while (1) {
                      switch (_context45.prev = _context45.next) {
                        case 0:
                          a = new BN('284');
                          b = new BN('5678');
                          _context45.t0 = expect;
                          _context45.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.modWithMessage(a, b, 'MyErrorMessage'));

                        case 5:
                          _context45.t1 = _context45.sent;
                          _context45.t2 = a.mod(b);
                          (0, _context45.t0)(_context45.t1).to.be.bignumber.equal(_context45.t2);

                        case 8:
                        case "end":
                          return _context45.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is equal to the divisor', function _callee43() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee43$(_context46) {
                    while (1) {
                      switch (_context46.prev = _context46.next) {
                        case 0:
                          a = new BN('5678');
                          b = new BN('5678');
                          _context46.t0 = expect;
                          _context46.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.modWithMessage(a, b, 'MyErrorMessage'));

                        case 5:
                          _context46.t1 = _context46.sent;
                          _context46.t2 = a.mod(b);
                          (0, _context46.t0)(_context46.t1).to.be.bignumber.equal(_context46.t2);

                        case 8:
                        case "end":
                          return _context46.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is larger than the divisor', function _callee44() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee44$(_context47) {
                    while (1) {
                      switch (_context47.prev = _context47.next) {
                        case 0:
                          a = new BN('7000');
                          b = new BN('5678');
                          _context47.t0 = expect;
                          _context47.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.modWithMessage(a, b, 'MyErrorMessage'));

                        case 5:
                          _context47.t1 = _context47.sent;
                          _context47.t2 = a.mod(b);
                          (0, _context47.t0)(_context47.t1).to.be.bignumber.equal(_context47.t2);

                        case 8:
                        case "end":
                          return _context47.stop();
                      }
                    }
                  }, null, this);
                });
                it('when the dividend is a multiple of the divisor', function _callee45() {
                  var a, b;
                  return regeneratorRuntime.async(function _callee45$(_context48) {
                    while (1) {
                      switch (_context48.prev = _context48.next) {
                        case 0:
                          a = new BN('17034'); // 17034 == 5678 * 3

                          b = new BN('5678');
                          _context48.t0 = expect;
                          _context48.next = 5;
                          return regeneratorRuntime.awrap(this.safeMath.modWithMessage(a, b, 'MyErrorMessage'));

                        case 5:
                          _context48.t1 = _context48.sent;
                          _context48.t2 = a.mod(b);
                          (0, _context48.t0)(_context48.t1).to.be.bignumber.equal(_context48.t2);

                        case 8:
                        case "end":
                          return _context48.stop();
                      }
                    }
                  }, null, this);
                });

              case 4:
              case "end":
                return _context49.stop();
            }
          }
        });
      });
      it('reverts with a 0 divisor', function _callee47() {
        var a, b;
        return regeneratorRuntime.async(function _callee47$(_context50) {
          while (1) {
            switch (_context50.prev = _context50.next) {
              case 0:
                a = new BN('5678');
                b = new BN('0');
                _context50.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.safeMath.modWithMessage(a, b, 'MyErrorMessage'), 'MyErrorMessage'));

              case 4:
              case "end":
                return _context50.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('memory leakage', function () {
    it('add', function _callee48() {
      return regeneratorRuntime.async(function _callee48$(_context51) {
        while (1) {
          switch (_context51.prev = _context51.next) {
            case 0:
              _context51.t0 = expect;
              _context51.next = 3;
              return regeneratorRuntime.awrap(this.safeMath.addMemoryCheck());

            case 3:
              _context51.t1 = _context51.sent;
              (0, _context51.t0)(_context51.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context51.stop();
          }
        }
      }, null, this);
    });
    it('sub', function _callee49() {
      return regeneratorRuntime.async(function _callee49$(_context52) {
        while (1) {
          switch (_context52.prev = _context52.next) {
            case 0:
              _context52.t0 = expect;
              _context52.next = 3;
              return regeneratorRuntime.awrap(this.safeMath.subMemoryCheck());

            case 3:
              _context52.t1 = _context52.sent;
              (0, _context52.t0)(_context52.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context52.stop();
          }
        }
      }, null, this);
    });
    it('mul', function _callee50() {
      return regeneratorRuntime.async(function _callee50$(_context53) {
        while (1) {
          switch (_context53.prev = _context53.next) {
            case 0:
              _context53.t0 = expect;
              _context53.next = 3;
              return regeneratorRuntime.awrap(this.safeMath.mulMemoryCheck());

            case 3:
              _context53.t1 = _context53.sent;
              (0, _context53.t0)(_context53.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context53.stop();
          }
        }
      }, null, this);
    });
    it('div', function _callee51() {
      return regeneratorRuntime.async(function _callee51$(_context54) {
        while (1) {
          switch (_context54.prev = _context54.next) {
            case 0:
              _context54.t0 = expect;
              _context54.next = 3;
              return regeneratorRuntime.awrap(this.safeMath.divMemoryCheck());

            case 3:
              _context54.t1 = _context54.sent;
              (0, _context54.t0)(_context54.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context54.stop();
          }
        }
      }, null, this);
    });
    it('mod', function _callee52() {
      return regeneratorRuntime.async(function _callee52$(_context55) {
        while (1) {
          switch (_context55.prev = _context55.next) {
            case 0:
              _context55.t0 = expect;
              _context55.next = 3;
              return regeneratorRuntime.awrap(this.safeMath.modMemoryCheck());

            case 3:
              _context55.t1 = _context55.sent;
              (0, _context55.t0)(_context55.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context55.stop();
          }
        }
      }, null, this);
    });
  });
});