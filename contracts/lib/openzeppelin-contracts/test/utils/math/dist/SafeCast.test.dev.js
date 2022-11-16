"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('../../../scripts/helpers'),
    range = _require3.range;

var SafeCastMock = artifacts.require('SafeCastMock');

contract('SafeCast', function _callee26(accounts) {
  var testToUint, testToInt;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          testToInt = function _ref2(bits) {
            describe("toInt".concat(bits), function () {
              var minValue = new BN('-2').pow(new BN(bits - 1));
              var maxValue = new BN('2').pow(new BN(bits - 1)).subn(1);
              it('downcasts 0', function _callee12() {
                return regeneratorRuntime.async(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.t0 = expect;
                        _context12.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toInt".concat(bits)](0));

                      case 3:
                        _context12.t1 = _context12.sent;
                        (0, _context12.t0)(_context12.t1).to.be.bignumber.equal('0');

                      case 5:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, null, this);
              });
              it('downcasts 1', function _callee13() {
                return regeneratorRuntime.async(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.t0 = expect;
                        _context13.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toInt".concat(bits)](1));

                      case 3:
                        _context13.t1 = _context13.sent;
                        (0, _context13.t0)(_context13.t1).to.be.bignumber.equal('1');

                      case 5:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, null, this);
              });
              it('downcasts -1', function _callee14() {
                return regeneratorRuntime.async(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.t0 = expect;
                        _context14.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toInt".concat(bits)](-1));

                      case 3:
                        _context14.t1 = _context14.sent;
                        (0, _context14.t0)(_context14.t1).to.be.bignumber.equal('-1');

                      case 5:
                      case "end":
                        return _context14.stop();
                    }
                  }
                }, null, this);
              });
              it("downcasts -2^".concat(bits - 1, " (").concat(minValue, ")"), function _callee15() {
                return regeneratorRuntime.async(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.t0 = expect;
                        _context15.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toInt".concat(bits)](minValue));

                      case 3:
                        _context15.t1 = _context15.sent;
                        _context15.t2 = minValue;
                        (0, _context15.t0)(_context15.t1).to.be.bignumber.equal(_context15.t2);

                      case 6:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, null, this);
              });
              it("downcasts 2^".concat(bits - 1, " - 1 (").concat(maxValue, ")"), function _callee16() {
                return regeneratorRuntime.async(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.t0 = expect;
                        _context16.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toInt".concat(bits)](maxValue));

                      case 3:
                        _context16.t1 = _context16.sent;
                        _context16.t2 = maxValue;
                        (0, _context16.t0)(_context16.t1).to.be.bignumber.equal(_context16.t2);

                      case 6:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, null, this);
              });
              it("reverts when downcasting -2^".concat(bits - 1, " - 1 (").concat(minValue.subn(1), ")"), function _callee17() {
                return regeneratorRuntime.async(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        _context17.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.safeCast["toInt".concat(bits)](minValue.subn(1)), "SafeCast: value doesn't fit in ".concat(bits, " bits")));

                      case 2:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, null, this);
              });
              it("reverts when downcasting -2^".concat(bits - 1, " - 2 (").concat(minValue.subn(2), ")"), function _callee18() {
                return regeneratorRuntime.async(function _callee18$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.safeCast["toInt".concat(bits)](minValue.subn(2)), "SafeCast: value doesn't fit in ".concat(bits, " bits")));

                      case 2:
                      case "end":
                        return _context18.stop();
                    }
                  }
                }, null, this);
              });
              it("reverts when downcasting 2^".concat(bits - 1, " (").concat(maxValue.addn(1), ")"), function _callee19() {
                return regeneratorRuntime.async(function _callee19$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.safeCast["toInt".concat(bits)](maxValue.addn(1)), "SafeCast: value doesn't fit in ".concat(bits, " bits")));

                      case 2:
                      case "end":
                        return _context19.stop();
                    }
                  }
                }, null, this);
              });
              it("reverts when downcasting 2^".concat(bits - 1, " + 1 (").concat(maxValue.addn(2), ")"), function _callee20() {
                return regeneratorRuntime.async(function _callee20$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        _context20.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.safeCast["toInt".concat(bits)](maxValue.addn(2)), "SafeCast: value doesn't fit in ".concat(bits, " bits")));

                      case 2:
                      case "end":
                        return _context20.stop();
                    }
                  }
                }, null, this);
              });
            });
          };

          testToUint = function _ref(bits) {
            describe("toUint".concat(bits), function () {
              var maxValue = new BN('2').pow(new BN(bits)).subn(1);
              it('downcasts 0', function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = expect;
                        _context2.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toUint".concat(bits)](0));

                      case 3:
                        _context2.t1 = _context2.sent;
                        (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('0');

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, null, this);
              });
              it('downcasts 1', function _callee3() {
                return regeneratorRuntime.async(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = expect;
                        _context3.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toUint".concat(bits)](1));

                      case 3:
                        _context3.t1 = _context3.sent;
                        (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('1');

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, null, this);
              });
              it("downcasts 2^".concat(bits, " - 1 (").concat(maxValue, ")"), function _callee4() {
                return regeneratorRuntime.async(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.t0 = expect;
                        _context4.next = 3;
                        return regeneratorRuntime.awrap(this.safeCast["toUint".concat(bits)](maxValue));

                      case 3:
                        _context4.t1 = _context4.sent;
                        _context4.t2 = maxValue;
                        (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

                      case 6:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, null, this);
              });
              it("reverts when downcasting 2^".concat(bits, " (").concat(maxValue.addn(1), ")"), function _callee5() {
                return regeneratorRuntime.async(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.safeCast["toUint".concat(bits)](maxValue.addn(1)), "SafeCast: value doesn't fit in ".concat(bits, " bits")));

                      case 2:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, null, this);
              });
              it("reverts when downcasting 2^".concat(bits, " + 1 (").concat(maxValue.addn(2), ")"), function _callee6() {
                return regeneratorRuntime.async(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.safeCast["toUint".concat(bits)](maxValue.addn(2)), "SafeCast: value doesn't fit in ".concat(bits, " bits")));

                      case 2:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, null, this);
              });
            });
          };

          beforeEach(function _callee() {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(SafeCastMock["new"]());

                  case 2:
                    this.safeCast = _context.sent;

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, this);
          });
          range(8, 256, 8).forEach(function (bits) {
            return testToUint(bits);
          });
          describe('toUint256', function () {
            var maxInt256 = new BN('2').pow(new BN(255)).subn(1);
            var minInt256 = new BN('2').pow(new BN(255)).neg();
            it('casts 0', function _callee7() {
              return regeneratorRuntime.async(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.t0 = expect;
                      _context7.next = 3;
                      return regeneratorRuntime.awrap(this.safeCast.toUint256(0));

                    case 3:
                      _context7.t1 = _context7.sent;
                      (0, _context7.t0)(_context7.t1).to.be.bignumber.equal('0');

                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, null, this);
            });
            it('casts 1', function _callee8() {
              return regeneratorRuntime.async(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.t0 = expect;
                      _context8.next = 3;
                      return regeneratorRuntime.awrap(this.safeCast.toUint256(1));

                    case 3:
                      _context8.t1 = _context8.sent;
                      (0, _context8.t0)(_context8.t1).to.be.bignumber.equal('1');

                    case 5:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, null, this);
            });
            it("casts INT256_MAX (".concat(maxInt256, ")"), function _callee9() {
              return regeneratorRuntime.async(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.t0 = expect;
                      _context9.next = 3;
                      return regeneratorRuntime.awrap(this.safeCast.toUint256(maxInt256));

                    case 3:
                      _context9.t1 = _context9.sent;
                      _context9.t2 = maxInt256;
                      (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);

                    case 6:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, null, this);
            });
            it('reverts when casting -1', function _callee10() {
              return regeneratorRuntime.async(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.safeCast.toUint256(-1), 'SafeCast: value must be positive'));

                    case 2:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, null, this);
            });
            it("reverts when casting INT256_MIN (".concat(minInt256, ")"), function _callee11() {
              return regeneratorRuntime.async(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.safeCast.toUint256(minInt256), 'SafeCast: value must be positive'));

                    case 2:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, null, this);
            });
          });
          range(8, 256, 8).forEach(function (bits) {
            return testToInt(bits);
          });
          describe('toInt256', function () {
            var maxUint256 = new BN('2').pow(new BN(256)).subn(1);
            var maxInt256 = new BN('2').pow(new BN(255)).subn(1);
            it('casts 0', function _callee21() {
              return regeneratorRuntime.async(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      _context21.t0 = expect;
                      _context21.next = 3;
                      return regeneratorRuntime.awrap(this.safeCast.toInt256(0));

                    case 3:
                      _context21.t1 = _context21.sent;
                      (0, _context21.t0)(_context21.t1).to.be.bignumber.equal('0');

                    case 5:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, null, this);
            });
            it('casts 1', function _callee22() {
              return regeneratorRuntime.async(function _callee22$(_context22) {
                while (1) {
                  switch (_context22.prev = _context22.next) {
                    case 0:
                      _context22.t0 = expect;
                      _context22.next = 3;
                      return regeneratorRuntime.awrap(this.safeCast.toInt256(1));

                    case 3:
                      _context22.t1 = _context22.sent;
                      (0, _context22.t0)(_context22.t1).to.be.bignumber.equal('1');

                    case 5:
                    case "end":
                      return _context22.stop();
                  }
                }
              }, null, this);
            });
            it("casts INT256_MAX (".concat(maxInt256, ")"), function _callee23() {
              return regeneratorRuntime.async(function _callee23$(_context23) {
                while (1) {
                  switch (_context23.prev = _context23.next) {
                    case 0:
                      _context23.t0 = expect;
                      _context23.next = 3;
                      return regeneratorRuntime.awrap(this.safeCast.toInt256(maxInt256));

                    case 3:
                      _context23.t1 = _context23.sent;
                      _context23.t2 = maxInt256;
                      (0, _context23.t0)(_context23.t1).to.be.bignumber.equal(_context23.t2);

                    case 6:
                    case "end":
                      return _context23.stop();
                  }
                }
              }, null, this);
            });
            it("reverts when casting INT256_MAX + 1 (".concat(maxInt256.addn(1), ")"), function _callee24() {
              return regeneratorRuntime.async(function _callee24$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      _context24.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.safeCast.toInt256(maxInt256.addn(1)), 'SafeCast: value doesn\'t fit in an int256'));

                    case 2:
                    case "end":
                      return _context24.stop();
                  }
                }
              }, null, this);
            });
            it("reverts when casting UINT256_MAX (".concat(maxUint256, ")"), function _callee25() {
              return regeneratorRuntime.async(function _callee25$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      _context25.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.safeCast.toInt256(maxUint256), 'SafeCast: value doesn\'t fit in an int256'));

                    case 2:
                    case "end":
                      return _context25.stop();
                  }
                }
              }, null, this);
            });
          });

        case 7:
        case "end":
          return _context26.stop();
      }
    }
  });
});