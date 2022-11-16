"use strict";

require('@openzeppelin/test-helpers');

var _require = require('chai'),
    expect = _require.expect;

var AddressArraysMock = artifacts.require('AddressArraysMock');

var Bytes32ArraysMock = artifacts.require('Bytes32ArraysMock');

var Uint256ArraysMock = artifacts.require('Uint256ArraysMock');

contract('Arrays', function (accounts) {
  describe('findUpperBound', function () {
    context('Even number of elements', function () {
      var EVEN_ELEMENTS_ARRAY = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      beforeEach(function _callee() {
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(Uint256ArraysMock["new"](EVEN_ELEMENTS_ARRAY));

              case 2:
                this.arrays = _context.sent;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      });
      it('returns correct index for the basic case', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = expect;
                _context2.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(16));

              case 3:
                _context2.t1 = _context2.sent;
                (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('5');

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      });
      it('returns 0 for the first element', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = expect;
                _context3.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(11));

              case 3:
                _context3.t1 = _context3.sent;
                (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('returns index of the last element', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = expect;
                _context4.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(20));

              case 3:
                _context4.t1 = _context4.sent;
                (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('9');

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('returns first index after last element if searched value is over the upper boundary', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = expect;
                _context5.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(32));

              case 3:
                _context5.t1 = _context5.sent;
                (0, _context5.t0)(_context5.t1).to.be.bignumber.equal('10');

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('returns 0 for the element under the lower boundary', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = expect;
                _context6.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(2));

              case 3:
                _context6.t1 = _context6.sent;
                (0, _context6.t0)(_context6.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    context('Odd number of elements', function () {
      var ODD_ELEMENTS_ARRAY = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      beforeEach(function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(Uint256ArraysMock["new"](ODD_ELEMENTS_ARRAY));

              case 2:
                this.arrays = _context7.sent;

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('returns correct index for the basic case', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = expect;
                _context8.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(16));

              case 3:
                _context8.t1 = _context8.sent;
                (0, _context8.t0)(_context8.t1).to.be.bignumber.equal('5');

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('returns 0 for the first element', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.t0 = expect;
                _context9.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(11));

              case 3:
                _context9.t1 = _context9.sent;
                (0, _context9.t0)(_context9.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('returns index of the last element', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = expect;
                _context10.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(21));

              case 3:
                _context10.t1 = _context10.sent;
                (0, _context10.t0)(_context10.t1).to.be.bignumber.equal('10');

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('returns first index after last element if searched value is over the upper boundary', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.t0 = expect;
                _context11.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(32));

              case 3:
                _context11.t1 = _context11.sent;
                (0, _context11.t0)(_context11.t1).to.be.bignumber.equal('11');

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('returns 0 for the element under the lower boundary', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.t0 = expect;
                _context12.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(2));

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
    });
    context('Array with gap', function () {
      var WITH_GAP_ARRAY = [11, 12, 13, 14, 15, 20, 21, 22, 23, 24];
      beforeEach(function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(Uint256ArraysMock["new"](WITH_GAP_ARRAY));

              case 2:
                this.arrays = _context13.sent;

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('returns index of first element in next filled range', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.t0 = expect;
                _context14.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(17));

              case 3:
                _context14.t1 = _context14.sent;
                (0, _context14.t0)(_context14.t1).to.be.bignumber.equal('5');

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
    });
    context('Empty array', function () {
      beforeEach(function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(Uint256ArraysMock["new"]([]));

              case 2:
                this.arrays = _context15.sent;

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('always returns 0 for empty array', function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.t0 = expect;
                _context16.next = 3;
                return regeneratorRuntime.awrap(this.arrays.findUpperBound(10));

              case 3:
                _context16.t1 = _context16.sent;
                (0, _context16.t0)(_context16.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('unsafeAccess', function () {
    var _loop = function _loop() {
      var _arr$_i = _arr[_i],
          type = _arr$_i.type,
          artifact = _arr$_i.artifact,
          elements = _arr$_i.elements;
      it(type, function _callee17() {
        var contract, i;
        return regeneratorRuntime.async(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(artifact["new"](elements));

              case 2:
                contract = _context17.sent;
                _context17.t0 = regeneratorRuntime.keys(elements);

              case 4:
                if ((_context17.t1 = _context17.t0()).done) {
                  _context17.next = 14;
                  break;
                }

                i = _context17.t1.value;
                _context17.t2 = expect;
                _context17.next = 9;
                return regeneratorRuntime.awrap(contract.unsafeAccess(i));

              case 9:
                _context17.t3 = _context17.sent;
                _context17.t4 = elements[i];
                (0, _context17.t2)(_context17.t3).to.be.bignumber.equal(_context17.t4);
                _context17.next = 4;
                break;

              case 14:
              case "end":
                return _context17.stop();
            }
          }
        });
      });
    };

    for (var _i = 0, _arr = [{
      type: 'address',
      artifact: AddressArraysMock,
      elements: Array(10).fill().map(function () {
        return web3.utils.randomHex(20);
      })
    }, {
      type: 'bytes32',
      artifact: Bytes32ArraysMock,
      elements: Array(10).fill().map(function () {
        return web3.utils.randomHex(32);
      })
    }, {
      type: 'uint256',
      artifact: Uint256ArraysMock,
      elements: Array(10).fill().map(function () {
        return web3.utils.randomHex(32);
      })
    }]; _i < _arr.length; _i++) {
      _loop();
    }
  });
});