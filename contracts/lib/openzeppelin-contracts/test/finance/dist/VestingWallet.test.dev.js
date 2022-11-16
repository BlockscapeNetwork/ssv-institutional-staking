"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert,
    time = _require.time;

var _require2 = require('@openzeppelin/test-helpers/src/setup'),
    web3 = _require2.web3;

var _require3 = require('chai'),
    expect = _require3.expect;

var ERC20Mock = artifacts.require('ERC20Mock');

var VestingWallet = artifacts.require('VestingWallet');

var _require4 = require('./VestingWallet.behavior'),
    shouldBehaveLikeVesting = _require4.shouldBehaveLikeVesting;

var min = function min() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.slice(1).reduce(function (x, y) {
    return x.lt(y) ? x : y;
  }, args[0]);
};

contract('VestingWallet', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      sender = _accounts[0],
      beneficiary = _accounts[1];

  var amount = web3.utils.toBN(web3.utils.toWei('100'));
  var duration = web3.utils.toBN(4 * 365 * 86400); // 4 years

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(time.latest());

          case 2:
            this.start = _context.sent.addn(3600);
            _context.next = 5;
            return regeneratorRuntime.awrap(VestingWallet["new"](beneficiary, this.start, duration));

          case 5:
            this.mock = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('rejects zero address for beneficiary', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(expectRevert(VestingWallet["new"](constants.ZERO_ADDRESS, this.start, duration), 'VestingWallet: beneficiary is zero address'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('check vesting contract', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.mock.beneficiary());

          case 3:
            _context3.t1 = _context3.sent;
            _context3.t2 = beneficiary;
            (0, _context3.t0)(_context3.t1).to.be.equal(_context3.t2);
            _context3.t3 = expect;
            _context3.next = 9;
            return regeneratorRuntime.awrap(this.mock.start());

          case 9:
            _context3.t4 = _context3.sent;
            _context3.t5 = this.start;
            (0, _context3.t3)(_context3.t4).to.be.bignumber.equal(_context3.t5);
            _context3.t6 = expect;
            _context3.next = 15;
            return regeneratorRuntime.awrap(this.mock.duration());

          case 15:
            _context3.t7 = _context3.sent;
            _context3.t8 = duration;
            (0, _context3.t6)(_context3.t7).to.be.bignumber.equal(_context3.t8);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  describe('vesting schedule', function () {
    beforeEach(function _callee4() {
      var _this = this;

      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.schedule = Array(64).fill().map(function (_, i) {
                return web3.utils.toBN(i).mul(duration).divn(60).add(_this.start);
              });

              this.vestingFn = function (timestamp) {
                return min(amount, amount.mul(timestamp.sub(_this.start)).div(duration));
              };

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    describe('Eth vesting', function () {
      beforeEach(function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(web3.eth.sendTransaction({
                  from: sender,
                  to: this.mock.address,
                  value: amount
                }));

              case 2:
                this.getBalance = function (account) {
                  return web3.eth.getBalance(account).then(web3.utils.toBN);
                };

                this.checkRelease = function () {};

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      shouldBehaveLikeVesting(beneficiary);
    });
    describe('ERC20 vesting', function () {
      beforeEach(function _callee6() {
        var _this2 = this;

        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(ERC20Mock["new"]('Name', 'Symbol', this.mock.address, amount));

              case 2:
                this.token = _context6.sent;

                this.getBalance = function (account) {
                  return _this2.token.balanceOf(account);
                };

                this.checkRelease = function (receipt, to, value) {
                  return expectEvent.inTransaction(receipt.tx, _this2.token, 'Transfer', {
                    from: _this2.mock.address,
                    to: to,
                    value: value
                  });
                };

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      shouldBehaveLikeVesting(beneficiary);
    });
  });
});