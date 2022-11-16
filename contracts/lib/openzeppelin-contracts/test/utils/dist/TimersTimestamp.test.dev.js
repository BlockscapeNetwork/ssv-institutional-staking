"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    time = _require.time;

var _require2 = require('chai'),
    expect = _require2.expect;

var TimersTimestampImpl = artifacts.require('TimersTimestampImpl');

contract('TimersTimestamp', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(TimersTimestampImpl["new"]());

          case 2:
            this.instance = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(web3.eth.getBlock('latest').then(function (_ref) {
              var timestamp = _ref.timestamp;
              return timestamp;
            }));

          case 5:
            this.now = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('unset', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.instance.getDeadline());

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('0');
            _context2.t2 = expect;
            _context2.next = 8;
            return regeneratorRuntime.awrap(this.instance.isUnset());

          case 8:
            _context2.t3 = _context2.sent;
            (0, _context2.t2)(_context2.t3).to.be.equal(true);
            _context2.t4 = expect;
            _context2.next = 13;
            return regeneratorRuntime.awrap(this.instance.isStarted());

          case 13:
            _context2.t5 = _context2.sent;
            (0, _context2.t4)(_context2.t5).to.be.equal(false);
            _context2.t6 = expect;
            _context2.next = 18;
            return regeneratorRuntime.awrap(this.instance.isPending());

          case 18:
            _context2.t7 = _context2.sent;
            (0, _context2.t6)(_context2.t7).to.be.equal(false);
            _context2.t8 = expect;
            _context2.next = 23;
            return regeneratorRuntime.awrap(this.instance.isExpired());

          case 23:
            _context2.t9 = _context2.sent;
            (0, _context2.t8)(_context2.t9).to.be.equal(false);

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('pending', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(this.instance.setDeadline(this.now + 100));

          case 2:
            _context3.t0 = expect;
            _context3.next = 5;
            return regeneratorRuntime.awrap(this.instance.getDeadline());

          case 5:
            _context3.t1 = _context3.sent;
            _context3.t2 = new BN(this.now + 100);
            (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);
            _context3.t3 = expect;
            _context3.next = 11;
            return regeneratorRuntime.awrap(this.instance.isUnset());

          case 11:
            _context3.t4 = _context3.sent;
            (0, _context3.t3)(_context3.t4).to.be.equal(false);
            _context3.t5 = expect;
            _context3.next = 16;
            return regeneratorRuntime.awrap(this.instance.isStarted());

          case 16:
            _context3.t6 = _context3.sent;
            (0, _context3.t5)(_context3.t6).to.be.equal(true);
            _context3.t7 = expect;
            _context3.next = 21;
            return regeneratorRuntime.awrap(this.instance.isPending());

          case 21:
            _context3.t8 = _context3.sent;
            (0, _context3.t7)(_context3.t8).to.be.equal(true);
            _context3.t9 = expect;
            _context3.next = 26;
            return regeneratorRuntime.awrap(this.instance.isExpired());

          case 26:
            _context3.t10 = _context3.sent;
            (0, _context3.t9)(_context3.t10).to.be.equal(false);

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('expired', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(this.instance.setDeadline(this.now - 100));

          case 2:
            _context4.t0 = expect;
            _context4.next = 5;
            return regeneratorRuntime.awrap(this.instance.getDeadline());

          case 5:
            _context4.t1 = _context4.sent;
            _context4.t2 = new BN(this.now - 100);
            (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);
            _context4.t3 = expect;
            _context4.next = 11;
            return regeneratorRuntime.awrap(this.instance.isUnset());

          case 11:
            _context4.t4 = _context4.sent;
            (0, _context4.t3)(_context4.t4).to.be.equal(false);
            _context4.t5 = expect;
            _context4.next = 16;
            return regeneratorRuntime.awrap(this.instance.isStarted());

          case 16:
            _context4.t6 = _context4.sent;
            (0, _context4.t5)(_context4.t6).to.be.equal(true);
            _context4.t7 = expect;
            _context4.next = 21;
            return regeneratorRuntime.awrap(this.instance.isPending());

          case 21:
            _context4.t8 = _context4.sent;
            (0, _context4.t7)(_context4.t8).to.be.equal(false);
            _context4.t9 = expect;
            _context4.next = 26;
            return regeneratorRuntime.awrap(this.instance.isExpired());

          case 26:
            _context4.t10 = _context4.sent;
            (0, _context4.t9)(_context4.t10).to.be.equal(true);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('reset', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(this.instance.reset());

          case 2:
            _context5.t0 = expect;
            _context5.next = 5;
            return regeneratorRuntime.awrap(this.instance.getDeadline());

          case 5:
            _context5.t1 = _context5.sent;
            _context5.t2 = new BN(0);
            (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);
            _context5.t3 = expect;
            _context5.next = 11;
            return regeneratorRuntime.awrap(this.instance.isUnset());

          case 11:
            _context5.t4 = _context5.sent;
            (0, _context5.t3)(_context5.t4).to.be.equal(true);
            _context5.t5 = expect;
            _context5.next = 16;
            return regeneratorRuntime.awrap(this.instance.isStarted());

          case 16:
            _context5.t6 = _context5.sent;
            (0, _context5.t5)(_context5.t6).to.be.equal(false);
            _context5.t7 = expect;
            _context5.next = 21;
            return regeneratorRuntime.awrap(this.instance.isPending());

          case 21:
            _context5.t8 = _context5.sent;
            (0, _context5.t7)(_context5.t8).to.be.equal(false);
            _context5.t9 = expect;
            _context5.next = 26;
            return regeneratorRuntime.awrap(this.instance.isExpired());

          case 26:
            _context5.t10 = _context5.sent;
            (0, _context5.t9)(_context5.t10).to.be.equal(false);

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  it('fast forward', function _callee6() {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(this.instance.setDeadline(this.now + 100));

          case 2:
            _context6.t0 = expect;
            _context6.next = 5;
            return regeneratorRuntime.awrap(this.instance.isPending());

          case 5:
            _context6.t1 = _context6.sent;
            (0, _context6.t0)(_context6.t1).to.be.equal(true);
            _context6.t2 = expect;
            _context6.next = 10;
            return regeneratorRuntime.awrap(this.instance.isExpired());

          case 10:
            _context6.t3 = _context6.sent;
            (0, _context6.t2)(_context6.t3).to.be.equal(false);
            _context6.next = 14;
            return regeneratorRuntime.awrap(time.increaseTo(this.now + 100));

          case 14:
            _context6.t4 = expect;
            _context6.next = 17;
            return regeneratorRuntime.awrap(this.instance.isPending());

          case 17:
            _context6.t5 = _context6.sent;
            (0, _context6.t4)(_context6.t5).to.be.equal(false);
            _context6.t6 = expect;
            _context6.next = 22;
            return regeneratorRuntime.awrap(this.instance.isExpired());

          case 22:
            _context6.t7 = _context6.sent;
            (0, _context6.t6)(_context6.t7).to.be.equal(true);

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this);
  });
});