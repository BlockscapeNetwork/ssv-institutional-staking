"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var CountersImpl = artifacts.require('CountersImpl');

contract('Counters', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(CountersImpl["new"]());

          case 2:
            this.counter = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('starts at zero', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.counter.current());

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
  describe('increment', function () {
    context('starting from 0', function () {
      it('increments the current value by one', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(this.counter.increment());

              case 2:
                _context3.t0 = expect;
                _context3.next = 5;
                return regeneratorRuntime.awrap(this.counter.current());

              case 5:
                _context3.t1 = _context3.sent;
                (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('1');

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('can be called multiple times', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(this.counter.increment());

              case 2:
                _context4.next = 4;
                return regeneratorRuntime.awrap(this.counter.increment());

              case 4:
                _context4.next = 6;
                return regeneratorRuntime.awrap(this.counter.increment());

              case 6:
                _context4.t0 = expect;
                _context4.next = 9;
                return regeneratorRuntime.awrap(this.counter.current());

              case 9:
                _context4.t1 = _context4.sent;
                (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('3');

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('decrement', function () {
    beforeEach(function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.counter.increment());

            case 2:
              _context5.t0 = expect;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.counter.current());

            case 5:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal('1');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    context('starting from 1', function () {
      it('decrements the current value by one', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(this.counter.decrement());

              case 2:
                _context6.t0 = expect;
                _context6.next = 5;
                return regeneratorRuntime.awrap(this.counter.current());

              case 5:
                _context6.t1 = _context6.sent;
                (0, _context6.t0)(_context6.t1).to.be.bignumber.equal('0');

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('reverts if the current value is 0', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.counter.decrement());

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.counter.decrement(), 'Counter: decrement overflow'));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
    });
    context('after incremented to 3', function () {
      it('can be called multiple times', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.counter.increment());

              case 2:
                _context8.next = 4;
                return regeneratorRuntime.awrap(this.counter.increment());

              case 4:
                _context8.t0 = expect;
                _context8.next = 7;
                return regeneratorRuntime.awrap(this.counter.current());

              case 7:
                _context8.t1 = _context8.sent;
                (0, _context8.t0)(_context8.t1).to.be.bignumber.equal('3');
                _context8.next = 11;
                return regeneratorRuntime.awrap(this.counter.decrement());

              case 11:
                _context8.next = 13;
                return regeneratorRuntime.awrap(this.counter.decrement());

              case 13:
                _context8.next = 15;
                return regeneratorRuntime.awrap(this.counter.decrement());

              case 15:
                _context8.t2 = expect;
                _context8.next = 18;
                return regeneratorRuntime.awrap(this.counter.current());

              case 18:
                _context8.t3 = _context8.sent;
                (0, _context8.t2)(_context8.t3).to.be.bignumber.equal('0');

              case 20:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('reset', function () {
    context('null counter', function () {
      it('does not throw', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.counter.reset());

              case 2:
                _context9.t0 = expect;
                _context9.next = 5;
                return regeneratorRuntime.awrap(this.counter.current());

              case 5:
                _context9.t1 = _context9.sent;
                (0, _context9.t0)(_context9.t1).to.be.bignumber.equal('0');

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
    });
    context('non null counter', function () {
      beforeEach(function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.counter.increment());

              case 2:
                _context10.t0 = expect;
                _context10.next = 5;
                return regeneratorRuntime.awrap(this.counter.current());

              case 5:
                _context10.t1 = _context10.sent;
                (0, _context10.t0)(_context10.t1).to.be.bignumber.equal('1');

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('reset to 0', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.counter.reset());

              case 2:
                _context11.t0 = expect;
                _context11.next = 5;
                return regeneratorRuntime.awrap(this.counter.current());

              case 5:
                _context11.t1 = _context11.sent;
                (0, _context11.t0)(_context11.t1).to.be.bignumber.equal('0');

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
  });
});