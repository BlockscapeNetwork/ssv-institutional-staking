"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    balance = _require.balance,
    ether = _require.ether;

var _require2 = require('chai'),
    expect = _require2.expect;

var PullPaymentMock = artifacts.require('PullPaymentMock');

contract('PullPayment', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      payer = _accounts[0],
      payee1 = _accounts[1],
      payee2 = _accounts[2];

  var amount = ether('17');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(PullPaymentMock["new"]({
              value: amount
            }));

          case 2:
            this.contract = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('payments', function () {
    it('can record an async payment correctly', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.contract.callTransfer(payee1, 100, {
                from: payer
              }));

            case 2:
              _context2.t0 = expect;
              _context2.next = 5;
              return regeneratorRuntime.awrap(this.contract.payments(payee1));

            case 5:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('100');

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('can add multiple balances on one account', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.contract.callTransfer(payee1, 200, {
                from: payer
              }));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.contract.callTransfer(payee1, 300, {
                from: payer
              }));

            case 4:
              _context3.t0 = expect;
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.contract.payments(payee1));

            case 7:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('500');

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('can add balances on multiple accounts', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.contract.callTransfer(payee1, 200, {
                from: payer
              }));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.contract.callTransfer(payee2, 300, {
                from: payer
              }));

            case 4:
              _context4.t0 = expect;
              _context4.next = 7;
              return regeneratorRuntime.awrap(this.contract.payments(payee1));

            case 7:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('200');
              _context4.t2 = expect;
              _context4.next = 12;
              return regeneratorRuntime.awrap(this.contract.payments(payee2));

            case 12:
              _context4.t3 = _context4.sent;
              (0, _context4.t2)(_context4.t3).to.be.bignumber.equal('300');

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
  describe('withdrawPayments', function () {
    it('can withdraw payment', function _callee5() {
      var balanceTracker;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(balance.tracker(payee1));

            case 2:
              balanceTracker = _context5.sent;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.contract.callTransfer(payee1, amount, {
                from: payer
              }));

            case 5:
              _context5.t0 = expect;
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.contract.payments(payee1));

            case 8:
              _context5.t1 = _context5.sent;
              _context5.t2 = amount;
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);
              _context5.next = 13;
              return regeneratorRuntime.awrap(this.contract.withdrawPayments(payee1));

            case 13:
              _context5.t3 = expect;
              _context5.next = 16;
              return regeneratorRuntime.awrap(balanceTracker.delta());

            case 16:
              _context5.t4 = _context5.sent;
              _context5.t5 = amount;
              (0, _context5.t3)(_context5.t4).to.be.bignumber.equal(_context5.t5);
              _context5.t6 = expect;
              _context5.next = 22;
              return regeneratorRuntime.awrap(this.contract.payments(payee1));

            case 22:
              _context5.t7 = _context5.sent;
              (0, _context5.t6)(_context5.t7).to.be.bignumber.equal('0');

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
});