"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable */
var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectEvent = _require.expectEvent,
    time = _require.time;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('util'),
    promisify = _require3.promisify;

var queue = promisify(setImmediate);

var ERC721VotesMock = artifacts.require('ERC721VotesMock');

var _require4 = require('../../../governance/utils/Votes.behavior'),
    shouldBehaveLikeVotes = _require4.shouldBehaveLikeVotes;

contract('ERC721Votes', function (accounts) {
  var _accounts = _slicedToArray(accounts, 5),
      account1 = _accounts[0],
      account2 = _accounts[1],
      account1Delegatee = _accounts[2],
      other1 = _accounts[3],
      other2 = _accounts[4];

  this.name = 'My Vote';
  var symbol = 'MTKN';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC721VotesMock["new"](name, symbol));

          case 2:
            this.votes = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(this.votes.getChainId());

          case 5:
            this.chainId = _context.sent;
            this.NFT0 = new BN('10000000000000000000000000');
            this.NFT1 = new BN('10');
            this.NFT2 = new BN('20');
            this.NFT3 = new BN('30');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('balanceOf', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT0));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT1));

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT2));

            case 6:
              _context2.next = 8;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT3));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('grants to initial account', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.votes.balanceOf(account1));

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('4');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('transfers', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT0));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('no delegation', function _callee5() {
      var _ref, receipt;

      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.votes.transferFrom(account1, account2, this.NFT0, {
                from: account1
              }));

            case 2:
              _ref = _context5.sent;
              receipt = _ref.receipt;
              expectEvent(receipt, 'Transfer', {
                from: account1,
                to: account2,
                tokenId: this.NFT0
              });
              expectEvent.notEmitted(receipt, 'DelegateVotesChanged');
              this.account1Votes = '0';
              this.account2Votes = '0';

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('sender delegation', function _callee6() {
      var _ref2, receipt, _receipt$logs$find, transferLogIndex;

      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.votes.delegate(account1, {
                from: account1
              }));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.votes.transferFrom(account1, account2, this.NFT0, {
                from: account1
              }));

            case 4:
              _ref2 = _context6.sent;
              receipt = _ref2.receipt;
              expectEvent(receipt, 'Transfer', {
                from: account1,
                to: account2,
                tokenId: this.NFT0
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: account1,
                previousBalance: '1',
                newBalance: '0'
              });
              _receipt$logs$find = receipt.logs.find(function (_ref3) {
                var event = _ref3.event;
                return event == 'Transfer';
              }), transferLogIndex = _receipt$logs$find.logIndex;
              expect(receipt.logs.filter(function (_ref4) {
                var event = _ref4.event;
                return event == 'DelegateVotesChanged';
              }).every(function (_ref5) {
                var logIndex = _ref5.logIndex;
                return transferLogIndex < logIndex;
              })).to.be.equal(true);
              this.account1Votes = '0';
              this.account2Votes = '0';

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('receiver delegation', function _callee7() {
      var _ref6, receipt, _receipt$logs$find2, transferLogIndex;

      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.votes.delegate(account2, {
                from: account2
              }));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.votes.transferFrom(account1, account2, this.NFT0, {
                from: account1
              }));

            case 4:
              _ref6 = _context7.sent;
              receipt = _ref6.receipt;
              expectEvent(receipt, 'Transfer', {
                from: account1,
                to: account2,
                tokenId: this.NFT0
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: account2,
                previousBalance: '0',
                newBalance: '1'
              });
              _receipt$logs$find2 = receipt.logs.find(function (_ref7) {
                var event = _ref7.event;
                return event == 'Transfer';
              }), transferLogIndex = _receipt$logs$find2.logIndex;
              expect(receipt.logs.filter(function (_ref8) {
                var event = _ref8.event;
                return event == 'DelegateVotesChanged';
              }).every(function (_ref9) {
                var logIndex = _ref9.logIndex;
                return transferLogIndex < logIndex;
              })).to.be.equal(true);
              this.account1Votes = '0';
              this.account2Votes = '1';

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('full delegation', function _callee8() {
      var _ref10, receipt, _receipt$logs$find3, transferLogIndex;

      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.votes.delegate(account1, {
                from: account1
              }));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.votes.delegate(account2, {
                from: account2
              }));

            case 4:
              _context8.next = 6;
              return regeneratorRuntime.awrap(this.votes.transferFrom(account1, account2, this.NFT0, {
                from: account1
              }));

            case 6:
              _ref10 = _context8.sent;
              receipt = _ref10.receipt;
              expectEvent(receipt, 'Transfer', {
                from: account1,
                to: account2,
                tokenId: this.NFT0
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: account1,
                previousBalance: '1',
                newBalance: '0'
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: account2,
                previousBalance: '0',
                newBalance: '1'
              });
              _receipt$logs$find3 = receipt.logs.find(function (_ref11) {
                var event = _ref11.event;
                return event == 'Transfer';
              }), transferLogIndex = _receipt$logs$find3.logIndex;
              expect(receipt.logs.filter(function (_ref12) {
                var event = _ref12.event;
                return event == 'DelegateVotesChanged';
              }).every(function (_ref13) {
                var logIndex = _ref13.logIndex;
                return transferLogIndex < logIndex;
              })).to.be.equal(true);
              this.account1Votes = '0';
              this.account2Votes = '1';

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('returns the same total supply on transfers', function _callee9() {
      var _ref14, receipt;

      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.votes.delegate(account1, {
                from: account1
              }));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.votes.transferFrom(account1, account2, this.NFT0, {
                from: account1
              }));

            case 4:
              _ref14 = _context9.sent;
              receipt = _ref14.receipt;
              _context9.next = 8;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 8:
              _context9.next = 10;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 10:
              _context9.t0 = expect;
              _context9.next = 13;
              return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(receipt.blockNumber - 1));

            case 13:
              _context9.t1 = _context9.sent;
              (0, _context9.t0)(_context9.t1).to.be.bignumber.equal('1');
              _context9.t2 = expect;
              _context9.next = 18;
              return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(receipt.blockNumber + 1));

            case 18:
              _context9.t3 = _context9.sent;
              (0, _context9.t2)(_context9.t3).to.be.bignumber.equal('1');
              this.account1Votes = '0';
              this.account2Votes = '0';

            case 22:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('generally returns the voting balance at the appropriate checkpoint', function _callee10() {
      var total, t1, t2, t3, t4;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT1));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT2));

            case 4:
              _context10.next = 6;
              return regeneratorRuntime.awrap(this.votes.mint(account1, this.NFT3));

            case 6:
              _context10.next = 8;
              return regeneratorRuntime.awrap(this.votes.balanceOf(account1));

            case 8:
              total = _context10.sent;
              _context10.next = 11;
              return regeneratorRuntime.awrap(this.votes.delegate(other1, {
                from: account1
              }));

            case 11:
              t1 = _context10.sent;
              _context10.next = 14;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 14:
              _context10.next = 16;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 16:
              _context10.next = 18;
              return regeneratorRuntime.awrap(this.votes.transferFrom(account1, other2, this.NFT0, {
                from: account1
              }));

            case 18:
              t2 = _context10.sent;
              _context10.next = 21;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 21:
              _context10.next = 23;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 23:
              _context10.next = 25;
              return regeneratorRuntime.awrap(this.votes.transferFrom(account1, other2, this.NFT2, {
                from: account1
              }));

            case 25:
              t3 = _context10.sent;
              _context10.next = 28;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 28:
              _context10.next = 30;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 30:
              _context10.next = 32;
              return regeneratorRuntime.awrap(this.votes.transferFrom(other2, account1, this.NFT2, {
                from: other2
              }));

            case 32:
              t4 = _context10.sent;
              _context10.next = 35;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 35:
              _context10.next = 37;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 37:
              _context10.t0 = expect;
              _context10.next = 40;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t1.receipt.blockNumber - 1));

            case 40:
              _context10.t1 = _context10.sent;
              (0, _context10.t0)(_context10.t1).to.be.bignumber.equal('0');
              _context10.t2 = expect;
              _context10.next = 45;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t1.receipt.blockNumber));

            case 45:
              _context10.t3 = _context10.sent;
              _context10.t4 = total;
              (0, _context10.t2)(_context10.t3).to.be.bignumber.equal(_context10.t4);
              _context10.t5 = expect;
              _context10.next = 51;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t1.receipt.blockNumber + 1));

            case 51:
              _context10.t6 = _context10.sent;
              _context10.t7 = total;
              (0, _context10.t5)(_context10.t6).to.be.bignumber.equal(_context10.t7);
              _context10.t8 = expect;
              _context10.next = 57;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t2.receipt.blockNumber));

            case 57:
              _context10.t9 = _context10.sent;
              (0, _context10.t8)(_context10.t9).to.be.bignumber.equal('3');
              _context10.t10 = expect;
              _context10.next = 62;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t2.receipt.blockNumber + 1));

            case 62:
              _context10.t11 = _context10.sent;
              (0, _context10.t10)(_context10.t11).to.be.bignumber.equal('3');
              _context10.t12 = expect;
              _context10.next = 67;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t3.receipt.blockNumber));

            case 67:
              _context10.t13 = _context10.sent;
              (0, _context10.t12)(_context10.t13).to.be.bignumber.equal('2');
              _context10.t14 = expect;
              _context10.next = 72;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t3.receipt.blockNumber + 1));

            case 72:
              _context10.t15 = _context10.sent;
              (0, _context10.t14)(_context10.t15).to.be.bignumber.equal('2');
              _context10.t16 = expect;
              _context10.next = 77;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t4.receipt.blockNumber));

            case 77:
              _context10.t17 = _context10.sent;
              (0, _context10.t16)(_context10.t17).to.be.bignumber.equal('3');
              _context10.t18 = expect;
              _context10.next = 82;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(other1, t4.receipt.blockNumber + 1));

            case 82:
              _context10.t19 = _context10.sent;
              (0, _context10.t18)(_context10.t19).to.be.bignumber.equal('3');
              this.account1Votes = '0';
              this.account2Votes = '0';

            case 86:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    afterEach(function _callee11() {
      var blockNumber;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.t0 = expect;
              _context11.next = 3;
              return regeneratorRuntime.awrap(this.votes.getVotes(account1));

            case 3:
              _context11.t1 = _context11.sent;
              _context11.t2 = this.account1Votes;
              (0, _context11.t0)(_context11.t1).to.be.bignumber.equal(_context11.t2);
              _context11.t3 = expect;
              _context11.next = 9;
              return regeneratorRuntime.awrap(this.votes.getVotes(account2));

            case 9:
              _context11.t4 = _context11.sent;
              _context11.t5 = this.account2Votes;
              (0, _context11.t3)(_context11.t4).to.be.bignumber.equal(_context11.t5);
              _context11.next = 14;
              return regeneratorRuntime.awrap(time.latestBlock());

            case 14:
              blockNumber = _context11.sent;
              _context11.next = 17;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 17:
              _context11.t6 = expect;
              _context11.next = 20;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(account1, blockNumber));

            case 20:
              _context11.t7 = _context11.sent;
              _context11.t8 = this.account1Votes;
              (0, _context11.t6)(_context11.t7).to.be.bignumber.equal(_context11.t8);
              _context11.t9 = expect;
              _context11.next = 26;
              return regeneratorRuntime.awrap(this.votes.getPastVotes(account2, blockNumber));

            case 26:
              _context11.t10 = _context11.sent;
              _context11.t11 = this.account2Votes;
              (0, _context11.t9)(_context11.t10).to.be.bignumber.equal(_context11.t11);

            case 29:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
  });
  describe('Voting workflow', function () {
    beforeEach(function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              this.account1 = account1;
              this.account1Delegatee = account1Delegatee;
              this.account2 = account2;
              this.name = 'My Vote';

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeVotes();
  });
});