"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    ether = _require.ether,
    expectRevert = _require.expectRevert;

var _require2 = require('./Escrow.behavior'),
    shouldBehaveLikeEscrow = _require2.shouldBehaveLikeEscrow;

var ConditionalEscrowMock = artifacts.require('ConditionalEscrowMock');

contract('ConditionalEscrow', function (accounts) {
  var _accounts = _toArray(accounts),
      owner = _accounts[0],
      payee = _accounts[1],
      otherAccounts = _accounts.slice(2);

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ConditionalEscrowMock["new"]({
              from: owner
            }));

          case 2:
            this.escrow = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('when withdrawal is allowed', function () {
    beforeEach(function _callee2() {
      var _this = this;

      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(Promise.all(otherAccounts.map(function (payee) {
                return _this.escrow.setAllowed(payee, true);
              })));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    shouldBehaveLikeEscrow(owner, otherAccounts);
  });
  context('when withdrawal is disallowed', function () {
    var amount = ether('23');
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.escrow.setAllowed(payee, false));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('reverts on withdrawals', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.escrow.deposit(payee, {
                from: owner,
                value: amount
              }));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.escrow.withdraw(payee, {
                from: owner
              }), 'ConditionalEscrow: payee is not allowed to withdraw'));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
});