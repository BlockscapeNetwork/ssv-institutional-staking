"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent;

var _require2 = require('../../helpers/customError'),
    expectRevertCustomError = _require2.expectRevertCustomError;

var Bytes32DequeMock = artifacts.require('Bytes32DequeMock');
/** Rebuild the content of the deque as a JS array. */


function getContent(deque) {
  var length, values;
  return regeneratorRuntime.async(function getContent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(deque.length().then(function (bn) {
            return bn.toNumber();
          }));

        case 2:
          length = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Promise.all(Array(length).fill().map(function (_, i) {
            return deque.at(i);
          })));

        case 5:
          values = _context.sent;
          return _context.abrupt("return", values);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

contract('DoubleEndedQueue', function (accounts) {
  var bytesA = '0xdeadbeef'.padEnd(66, '0');
  var bytesB = '0x0123456789'.padEnd(66, '0');
  var bytesC = '0x42424242'.padEnd(66, '0');
  var bytesD = '0x171717'.padEnd(66, '0');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Bytes32DequeMock["new"]());

          case 2:
            this.deque = _context2.sent;

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  describe('when empty', function () {
    it('getters', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.deque.empty());

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.equal(true);
              _context3.t2 = expect;
              _context3.next = 8;
              return regeneratorRuntime.awrap(getContent(this.deque));

            case 8:
              _context3.t3 = _context3.sent;
              _context3.t4 = [];
              (0, _context3.t2)(_context3.t3).to.have.ordered.members(_context3.t4);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('reverts on accesses', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevertCustomError(this.deque.popBack(), 'Empty()'));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(expectRevertCustomError(this.deque.popFront(), 'Empty()'));

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(expectRevertCustomError(this.deque.back(), 'Empty()'));

            case 6:
              _context4.next = 8;
              return regeneratorRuntime.awrap(expectRevertCustomError(this.deque.front(), 'Empty()'));

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
  describe('when not empty', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.deque.pushBack(bytesB));

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.deque.pushFront(bytesA));

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(this.deque.pushBack(bytesC));

            case 6:
              this.content = [bytesA, bytesB, bytesC];

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('getters', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.deque.empty());

            case 3:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.be.equal(false);
              _context6.t2 = expect;
              _context6.next = 8;
              return regeneratorRuntime.awrap(this.deque.length());

            case 8:
              _context6.t3 = _context6.sent;
              _context6.t4 = this.content.length.toString();
              (0, _context6.t2)(_context6.t3).to.be.bignumber.equal(_context6.t4);
              _context6.t5 = expect;
              _context6.next = 14;
              return regeneratorRuntime.awrap(this.deque.front());

            case 14:
              _context6.t6 = _context6.sent;
              _context6.t7 = this.content[0];
              (0, _context6.t5)(_context6.t6).to.be.equal(_context6.t7);
              _context6.t8 = expect;
              _context6.next = 20;
              return regeneratorRuntime.awrap(this.deque.back());

            case 20:
              _context6.t9 = _context6.sent;
              _context6.t10 = this.content[this.content.length - 1];
              (0, _context6.t8)(_context6.t9).to.be.equal(_context6.t10);
              _context6.t11 = expect;
              _context6.next = 26;
              return regeneratorRuntime.awrap(getContent(this.deque));

            case 26:
              _context6.t12 = _context6.sent;
              _context6.t13 = this.content;
              (0, _context6.t11)(_context6.t12).to.have.ordered.members(_context6.t13);

            case 29:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('out of bounds access', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevertCustomError(this.deque.at(this.content.length), 'OutOfBounds()'));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    describe('push', function () {
      it('front', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.deque.pushFront(bytesD));

              case 2:
                this.content.unshift(bytesD); // add element at the beginning

                _context8.t0 = expect;
                _context8.next = 6;
                return regeneratorRuntime.awrap(getContent(this.deque));

              case 6:
                _context8.t1 = _context8.sent;
                _context8.t2 = this.content;
                (0, _context8.t0)(_context8.t1).to.have.ordered.members(_context8.t2);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('back', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.deque.pushBack(bytesD));

              case 2:
                this.content.push(bytesD); // add element at the end

                _context9.t0 = expect;
                _context9.next = 6;
                return regeneratorRuntime.awrap(getContent(this.deque));

              case 6:
                _context9.t1 = _context9.sent;
                _context9.t2 = this.content;
                (0, _context9.t0)(_context9.t1).to.have.ordered.members(_context9.t2);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
    });
    describe('pop', function () {
      it('front', function _callee9() {
        var value;
        return regeneratorRuntime.async(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                value = this.content.shift(); // remove first element

                _context10.t0 = expectEvent;
                _context10.next = 4;
                return regeneratorRuntime.awrap(this.deque.popFront());

              case 4:
                _context10.t1 = _context10.sent;
                _context10.t2 = {
                  value: value
                };
                (0, _context10.t0)(_context10.t1, 'OperationResult', _context10.t2);
                _context10.t3 = expect;
                _context10.next = 10;
                return regeneratorRuntime.awrap(getContent(this.deque));

              case 10:
                _context10.t4 = _context10.sent;
                _context10.t5 = this.content;
                (0, _context10.t3)(_context10.t4).to.have.ordered.members(_context10.t5);

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('back', function _callee10() {
        var value;
        return regeneratorRuntime.async(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                value = this.content.pop(); // remove last element

                _context11.t0 = expectEvent;
                _context11.next = 4;
                return regeneratorRuntime.awrap(this.deque.popBack());

              case 4:
                _context11.t1 = _context11.sent;
                _context11.t2 = {
                  value: value
                };
                (0, _context11.t0)(_context11.t1, 'OperationResult', _context11.t2);
                _context11.t3 = expect;
                _context11.next = 10;
                return regeneratorRuntime.awrap(getContent(this.deque));

              case 10:
                _context11.t4 = _context11.sent;
                _context11.t5 = this.content;
                (0, _context11.t3)(_context11.t4).to.have.ordered.members(_context11.t5);

              case 13:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
    it('clear', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.deque.clear());

            case 2:
              _context12.t0 = expect;
              _context12.next = 5;
              return regeneratorRuntime.awrap(this.deque.empty());

            case 5:
              _context12.t1 = _context12.sent;
              (0, _context12.t0)(_context12.t1).to.be.equal(true);
              _context12.t2 = expect;
              _context12.next = 10;
              return regeneratorRuntime.awrap(getContent(this.deque));

            case 10:
              _context12.t3 = _context12.sent;
              _context12.t4 = [];
              (0, _context12.t2)(_context12.t3).to.have.ordered.members(_context12.t4);

            case 13:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
  });
});