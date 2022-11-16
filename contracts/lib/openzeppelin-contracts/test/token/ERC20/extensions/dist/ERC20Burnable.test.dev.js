"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

var _require2 = require('./ERC20Burnable.behavior'),
    shouldBehaveLikeERC20Burnable = _require2.shouldBehaveLikeERC20Burnable;

var ERC20BurnableMock = artifacts.require('ERC20BurnableMock');

contract('ERC20Burnable', function (accounts) {
  var _accounts = _toArray(accounts),
      owner = _accounts[0],
      otherAccounts = _accounts.slice(1);

  var initialBalance = new BN(1000);
  var name = 'My Token';
  var symbol = 'MTKN';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20BurnableMock["new"](name, symbol, owner, initialBalance, {
              from: owner
            }));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);
});