"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectRevert = _require.expectRevert,
    time = _require.time;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC20Mock = artifacts.require('ERC20Mock');

var TokenTimelock = artifacts.require('TokenTimelock');

contract('TokenTimelock', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      beneficiary = _accounts[0];

  var name = 'My Token';
  var symbol = 'MTKN';
  var amount = new BN(100);
  context('with token', function () {
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(ERC20Mock["new"](name, symbol, beneficiary, 0));

            case 2:
              this.token = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    it('rejects a release time in the past', function _callee2() {
      var pastReleaseTime;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(time.latest());

            case 2:
              _context2.t0 = time.duration.years(1);
              pastReleaseTime = _context2.sent.sub(_context2.t0);
              _context2.next = 6;
              return regeneratorRuntime.awrap(expectRevert(TokenTimelock["new"](this.token.address, beneficiary, pastReleaseTime), 'TokenTimelock: release time is before current time'));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    context('once deployed', function () {
      beforeEach(function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(time.latest());

              case 2:
                _context3.t0 = time.duration.years(1);
                this.releaseTime = _context3.sent.add(_context3.t0);
                _context3.next = 6;
                return regeneratorRuntime.awrap(TokenTimelock["new"](this.token.address, beneficiary, this.releaseTime));

              case 6:
                this.timelock = _context3.sent;
                _context3.next = 9;
                return regeneratorRuntime.awrap(this.token.mint(this.timelock.address, amount));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('can get state', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = expect;
                _context4.next = 3;
                return regeneratorRuntime.awrap(this.timelock.token());

              case 3:
                _context4.t1 = _context4.sent;
                _context4.t2 = this.token.address;
                (0, _context4.t0)(_context4.t1).to.equal(_context4.t2);
                _context4.t3 = expect;
                _context4.next = 9;
                return regeneratorRuntime.awrap(this.timelock.beneficiary());

              case 9:
                _context4.t4 = _context4.sent;
                _context4.t5 = beneficiary;
                (0, _context4.t3)(_context4.t4).to.equal(_context4.t5);
                _context4.t6 = expect;
                _context4.next = 15;
                return regeneratorRuntime.awrap(this.timelock.releaseTime());

              case 15:
                _context4.t7 = _context4.sent;
                _context4.t8 = this.releaseTime;
                (0, _context4.t6)(_context4.t7).to.be.bignumber.equal(_context4.t8);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('cannot be released before time limit', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.timelock.release(), 'TokenTimelock: current time is before release time'));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('cannot be released just before time limit', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(time.increaseTo(this.releaseTime.sub(time.duration.seconds(3))));

              case 2:
                _context6.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.timelock.release(), 'TokenTimelock: current time is before release time'));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('can be released just after limit', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(time.increaseTo(this.releaseTime.add(time.duration.seconds(1))));

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap(this.timelock.release());

              case 4:
                _context7.t0 = expect;
                _context7.next = 7;
                return regeneratorRuntime.awrap(this.token.balanceOf(beneficiary));

              case 7:
                _context7.t1 = _context7.sent;
                _context7.t2 = amount;
                (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('can be released after time limit', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(time.increaseTo(this.releaseTime.add(time.duration.years(1))));

              case 2:
                _context8.next = 4;
                return regeneratorRuntime.awrap(this.timelock.release());

              case 4:
                _context8.t0 = expect;
                _context8.next = 7;
                return regeneratorRuntime.awrap(this.token.balanceOf(beneficiary));

              case 7:
                _context8.t1 = _context8.sent;
                _context8.t2 = amount;
                (0, _context8.t0)(_context8.t1).to.be.bignumber.equal(_context8.t2);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('cannot be released twice', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(time.increaseTo(this.releaseTime.add(time.duration.years(1))));

              case 2:
                _context9.next = 4;
                return regeneratorRuntime.awrap(this.timelock.release());

              case 4:
                _context9.next = 6;
                return regeneratorRuntime.awrap(expectRevert(this.timelock.release(), 'TokenTimelock: no tokens to release'));

              case 6:
                _context9.t0 = expect;
                _context9.next = 9;
                return regeneratorRuntime.awrap(this.token.balanceOf(beneficiary));

              case 9:
                _context9.t1 = _context9.sent;
                _context9.t2 = amount;
                (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
    });
  });
});