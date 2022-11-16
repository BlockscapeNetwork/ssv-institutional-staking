"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    ether = _require.ether,
    expectRevert = _require.expectRevert;

var _require2 = require('./ERC20Capped.behavior'),
    shouldBehaveLikeERC20Capped = _require2.shouldBehaveLikeERC20Capped;

var ERC20Capped = artifacts.require('ERC20CappedMock');

contract('ERC20Capped', function (accounts) {
  var _accounts = _toArray(accounts),
      minter = _accounts[0],
      otherAccounts = _accounts.slice(1);

  var cap = ether('1000');
  var name = 'My Token';
  var symbol = 'MTKN';
  it('requires a non-zero cap', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(expectRevert(ERC20Capped["new"](name, symbol, new BN(0), {
              from: minter
            }), 'ERC20Capped: cap is 0'));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  context('once deployed', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            beforeEach(function _callee2() {
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(ERC20Capped["new"](name, symbol, cap, {
                        from: minter
                      }));

                    case 2:
                      this.token = _context2.sent;

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, this);
            });
            shouldBehaveLikeERC20Capped(minter, otherAccounts, cap);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});