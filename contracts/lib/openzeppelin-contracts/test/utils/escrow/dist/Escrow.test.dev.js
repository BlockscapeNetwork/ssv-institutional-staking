"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

require('@openzeppelin/test-helpers');

var _require = require('./Escrow.behavior'),
    shouldBehaveLikeEscrow = _require.shouldBehaveLikeEscrow;

var Escrow = artifacts.require('Escrow');

contract('Escrow', function (accounts) {
  var _accounts = _toArray(accounts),
      owner = _accounts[0],
      otherAccounts = _accounts.slice(1);

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Escrow["new"]({
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
  shouldBehaveLikeEscrow(owner, otherAccounts);
});