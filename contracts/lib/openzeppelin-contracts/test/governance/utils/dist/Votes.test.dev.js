"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert,
    BN = _require.BN;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('./Votes.behavior'),
    shouldBehaveLikeVotes = _require3.shouldBehaveLikeVotes;

var Votes = artifacts.require('VotesMock');

contract('Votes', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      account1 = _accounts[0],
      account2 = _accounts[1],
      account3 = _accounts[2];

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.name = 'My Vote';
            _context.next = 3;
            return regeneratorRuntime.awrap(Votes["new"](this.name));

          case 3:
            this.votes = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('starts with zero votes', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.votes.getTotalSupply());

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
  describe('performs voting operations', function () {
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.votes.mint(account1, 1));

            case 2:
              this.tx1 = _context3.sent;
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.votes.mint(account2, 1));

            case 5:
              this.tx2 = _context3.sent;
              _context3.next = 8;
              return regeneratorRuntime.awrap(this.votes.mint(account3, 1));

            case 8:
              this.tx3 = _context3.sent;

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('reverts if block number >= current block', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.votes.getPastTotalSupply(this.tx3.receipt.blockNumber + 1), 'Votes: block not yet mined'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('delegates', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.votes.delegate(account3, account2));

            case 2:
              _context5.t0 = expect;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.votes.delegates(account3));

            case 5:
              _context5.t1 = _context5.sent;
              _context5.t2 = account2;
              (0, _context5.t0)(_context5.t1).to.be.equal(_context5.t2);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('returns total amount of votes', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.votes.getTotalSupply());

            case 3:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal('3');

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
  describe('performs voting workflow', function () {
    beforeEach(function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.votes.getChainId());

            case 2:
              this.chainId = _context7.sent;
              this.account1 = account1;
              this.account2 = account2;
              this.account1Delegatee = account2;
              this.NFT0 = new BN('10000000000000000000000000');
              this.NFT1 = new BN('10');
              this.NFT2 = new BN('20');
              this.NFT3 = new BN('30');

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeVotes();
  });
});