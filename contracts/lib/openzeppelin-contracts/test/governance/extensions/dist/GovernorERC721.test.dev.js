"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectEvent = _require.expectEvent;

var _require2 = require('chai'),
    expect = _require2.expect;

var Enums = require('../../helpers/enums');

var _require3 = require('../../helpers/governance'),
    GovernorHelper = _require3.GovernorHelper;

var Token = artifacts.require('ERC721VotesMock');

var Governor = artifacts.require('GovernorVoteMocks');

var CallReceiver = artifacts.require('CallReceiverMock');

contract('GovernorERC721Mock', function (accounts) {
  var _accounts = _slicedToArray(accounts, 5),
      owner = _accounts[0],
      voter1 = _accounts[1],
      voter2 = _accounts[2],
      voter3 = _accounts[3],
      voter4 = _accounts[4];

  var name = 'OZ-Governor'; // const version = '1';

  var tokenName = 'MockNFToken';
  var tokenSymbol = 'MTKN';
  var NFT0 = new BN(0);
  var NFT1 = new BN(1);
  var NFT2 = new BN(2);
  var NFT3 = new BN(3);
  var NFT4 = new BN(4);
  var votingDelay = new BN(4);
  var votingPeriod = new BN(16);
  var value = web3.utils.toWei('1');
  beforeEach(function _callee() {
    var _this = this;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.owner = owner;
            _context.next = 3;
            return regeneratorRuntime.awrap(Token["new"](tokenName, tokenSymbol));

          case 3:
            this.token = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(Governor["new"](name, this.token.address));

          case 6:
            this.mock = _context.sent;
            _context.next = 9;
            return regeneratorRuntime.awrap(CallReceiver["new"]());

          case 9:
            this.receiver = _context.sent;
            this.helper = new GovernorHelper(this.mock);
            _context.next = 13;
            return regeneratorRuntime.awrap(web3.eth.sendTransaction({
              from: owner,
              to: this.mock.address,
              value: value
            }));

          case 13:
            _context.next = 15;
            return regeneratorRuntime.awrap(Promise.all([NFT0, NFT1, NFT2, NFT3, NFT4].map(function (tokenId) {
              return _this.token.mint(owner, tokenId);
            })));

          case 15:
            _context.next = 17;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter1,
              tokenId: NFT0
            }, {
              from: owner
            }));

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter2,
              tokenId: NFT1
            }, {
              from: owner
            }));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter2,
              tokenId: NFT2
            }, {
              from: owner
            }));

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter3,
              tokenId: NFT3
            }, {
              from: owner
            }));

          case 23:
            _context.next = 25;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter4,
              tokenId: NFT4
            }, {
              from: owner
            }));

          case 25:
            // default proposal
            this.proposal = this.helper.setProposal([{
              target: this.receiver.address,
              value: value,
              data: this.receiver.contract.methods.mockFunction().encodeABI()
            }], '<proposal description>');

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('deployment check', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.mock.name());

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = name;
            (0, _context2.t0)(_context2.t1).to.be.equal(_context2.t2);
            _context2.t3 = expect;
            _context2.next = 9;
            return regeneratorRuntime.awrap(this.mock.token());

          case 9:
            _context2.t4 = _context2.sent;
            _context2.t5 = this.token.address;
            (0, _context2.t3)(_context2.t4).to.be.equal(_context2.t5);
            _context2.t6 = expect;
            _context2.next = 15;
            return regeneratorRuntime.awrap(this.mock.votingDelay());

          case 15:
            _context2.t7 = _context2.sent;
            _context2.t8 = votingDelay;
            (0, _context2.t6)(_context2.t7).to.be.bignumber.equal(_context2.t8);
            _context2.t9 = expect;
            _context2.next = 21;
            return regeneratorRuntime.awrap(this.mock.votingPeriod());

          case 21:
            _context2.t10 = _context2.sent;
            _context2.t11 = votingPeriod;
            (0, _context2.t9)(_context2.t10).to.be.bignumber.equal(_context2.t11);
            _context2.t12 = expect;
            _context2.next = 27;
            return regeneratorRuntime.awrap(this.mock.quorum(0));

          case 27:
            _context2.t13 = _context2.sent;
            (0, _context2.t12)(_context2.t13).to.be.bignumber.equal('0');

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('voting with ERC721 token', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(this.helper.propose());

          case 2:
            _context3.next = 4;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 4:
            _context3.t0 = expectEvent;
            _context3.next = 7;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter1
            }));

          case 7:
            _context3.t1 = _context3.sent;
            _context3.t2 = {
              voter: voter1,
              support: Enums.VoteType.For,
              weight: '1'
            };
            (0, _context3.t0)(_context3.t1, 'VoteCast', _context3.t2);
            _context3.t3 = expectEvent;
            _context3.next = 13;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 13:
            _context3.t4 = _context3.sent;
            _context3.t5 = {
              voter: voter2,
              support: Enums.VoteType.For,
              weight: '2'
            };
            (0, _context3.t3)(_context3.t4, 'VoteCast', _context3.t5);
            _context3.t6 = expectEvent;
            _context3.next = 19;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter3
            }));

          case 19:
            _context3.t7 = _context3.sent;
            _context3.t8 = {
              voter: voter3,
              support: Enums.VoteType.Against,
              weight: '1'
            };
            (0, _context3.t6)(_context3.t7, 'VoteCast', _context3.t8);
            _context3.t9 = expectEvent;
            _context3.next = 25;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Abstain
            }, {
              from: voter4
            }));

          case 25:
            _context3.t10 = _context3.sent;
            _context3.t11 = {
              voter: voter4,
              support: Enums.VoteType.Abstain,
              weight: '1'
            };
            (0, _context3.t9)(_context3.t10, 'VoteCast', _context3.t11);
            _context3.next = 30;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 30:
            _context3.next = 32;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 32:
            _context3.t12 = expect;
            _context3.next = 35;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 35:
            _context3.t13 = _context3.sent;
            (0, _context3.t12)(_context3.t13).to.be.equal(false);
            _context3.t14 = expect;
            _context3.next = 40;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 40:
            _context3.t15 = _context3.sent;
            (0, _context3.t14)(_context3.t15).to.be.equal(true);
            _context3.t16 = expect;
            _context3.next = 45;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 45:
            _context3.t17 = _context3.sent;
            (0, _context3.t16)(_context3.t17).to.be.equal(true);
            _context3.t18 = expect;
            _context3.next = 50;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter3));

          case 50:
            _context3.t19 = _context3.sent;
            (0, _context3.t18)(_context3.t19).to.be.equal(true);
            _context3.t20 = expect;
            _context3.next = 55;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter4));

          case 55:
            _context3.t21 = _context3.sent;
            (0, _context3.t20)(_context3.t21).to.be.equal(true);
            _context3.next = 59;
            return regeneratorRuntime.awrap(this.mock.proposalVotes(this.proposal.id).then(function (results) {
              expect(results.forVotes).to.be.bignumber.equal('3');
              expect(results.againstVotes).to.be.bignumber.equal('1');
              expect(results.abstainVotes).to.be.bignumber.equal('1');
            }));

          case 59:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
});