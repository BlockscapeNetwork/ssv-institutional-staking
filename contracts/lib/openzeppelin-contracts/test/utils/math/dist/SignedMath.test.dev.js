"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants;

var _require2 = require('chai'),
    expect = _require2.expect;

var MIN_INT256 = constants.MIN_INT256,
    MAX_INT256 = constants.MAX_INT256;

var SignedMathMock = artifacts.require('SignedMathMock');

contract('SignedMath', function (accounts) {
  var min = new BN('-1234');
  var max = new BN('5678');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(SignedMathMock["new"]());

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

    it('is correctly calculated with various input', function _callee6() {
      var valuesX, valuesY, _i, _valuesX, x, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, y;

      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              valuesX = [new BN('0'), new BN('3'), new BN('-3'), new BN('4'), new BN('-4'), new BN('57417'), new BN('-57417'), new BN('42304'), new BN('-42304'), MIN_INT256, MAX_INT256];
              valuesY = [new BN('0'), new BN('5'), new BN('-5'), new BN('2'), new BN('-2'), new BN('57417'), new BN('-57417'), new BN('42304'), new BN('-42304'), MIN_INT256, MAX_INT256];
              _i = 0, _valuesX = valuesX;

            case 3:
              if (!(_i < _valuesX.length)) {
                _context6.next = 39;
                break;
              }

              x = _valuesX[_i];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context6.prev = 8;
              _iterator = valuesY[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context6.next = 22;
                break;
              }

              y = _step.value;
              _context6.t0 = expect;
              _context6.next = 15;
              return regeneratorRuntime.awrap(this.math.average(x, y));

            case 15:
              _context6.t1 = _context6.sent;
              _context6.t2 = bnAverage(x, y);
              _context6.t3 = "Bad result for average(".concat(x, ", ").concat(y, ")");
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2, _context6.t3);

            case 19:
              _iteratorNormalCompletion = true;
              _context6.next = 10;
              break;

            case 22:
              _context6.next = 28;
              break;

            case 24:
              _context6.prev = 24;
              _context6.t4 = _context6["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context6.t4;

            case 28:
              _context6.prev = 28;
              _context6.prev = 29;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 31:
              _context6.prev = 31;

              if (!_didIteratorError) {
                _context6.next = 34;
                break;
              }

              throw _iteratorError;

            case 34:
              return _context6.finish(31);

            case 35:
              return _context6.finish(28);

            case 36:
              _i++;
              _context6.next = 3;
              break;

            case 39:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[8, 24, 28, 36], [29,, 31, 35]]);
    });
  });
  describe('abs', function () {
    var _loop = function _loop() {
      var n = _arr[_i2];
      it("correctly computes the absolute value of ".concat(n), function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = expect;
                _context7.next = 3;
                return regeneratorRuntime.awrap(this.math.abs(n));

              case 3:
                _context7.t1 = _context7.sent;
                _context7.t2 = n.abs();
                (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
    };

    for (var _i2 = 0, _arr = [MIN_INT256, MIN_INT256.addn(1), new BN('-1'), new BN('0'), new BN('1'), MAX_INT256.subn(1), MAX_INT256]; _i2 < _arr.length; _i2++) {
      _loop();
    }
  });
});