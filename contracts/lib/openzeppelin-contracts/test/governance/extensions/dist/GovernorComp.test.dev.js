"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

var _require2 = require('chai'),
    expect = _require2.expect;

var Enums = require('../../helpers/enums');

var _require3 = require('../../helpers/governance'),
    GovernorHelper = _require3.GovernorHelper;

var Token = artifacts.require('ERC20VotesCompMock');

var Governor = artifacts.require('GovernorCompMock');

var CallReceiver = artifacts.require('CallReceiverMock');

contract('GovernorComp', function (accounts) {
  var _accounts = _slicedToArray(accounts, 5),
      owner = _accounts[0],
      voter1 = _accounts[1],
      voter2 = _accounts[2],
      voter3 = _accounts[3],
      voter4 = _accounts[4];

  var name = 'OZ-Governor'; // const version = '1';

  var tokenName = 'MockToken';
  var tokenSymbol = 'MTKN';
  var tokenSupply = web3.utils.toWei('100');
  var votingDelay = new BN(4);
  var votingPeriod = new BN(16);
  var value = web3.utils.toWei('1');
  beforeEach(function _callee() {
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
            return regeneratorRuntime.awrap(this.token.mint(owner, tokenSupply));

          case 15:
            _context.next = 17;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter1,
              value: web3.utils.toWei('10')
            }, {
              from: owner
            }));

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter2,
              value: web3.utils.toWei('7')
            }, {
              from: owner
            }));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter3,
              value: web3.utils.toWei('5')
            }, {
              from: owner
            }));

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter4,
              value: web3.utils.toWei('2')
            }, {
              from: owner
            }));

          case 23:
            // default proposal
            this.proposal = this.helper.setProposal([{
              target: this.receiver.address,
              value: value,
              data: this.receiver.contract.methods.mockFunction().encodeABI()
            }], '<proposal description>');

          case 24:
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
  it('voting with comp token', function _callee3() {
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
            _context3.next = 6;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter1
            }));

          case 6:
            _context3.next = 8;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 8:
            _context3.next = 10;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter3
            }));

          case 10:
            _context3.next = 12;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Abstain
            }, {
              from: voter4
            }));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 14:
            _context3.next = 16;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 16:
            _context3.t0 = expect;
            _context3.next = 19;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 19:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).to.be.equal(false);
            _context3.t2 = expect;
            _context3.next = 24;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 24:
            _context3.t3 = _context3.sent;
            (0, _context3.t2)(_context3.t3).to.be.equal(true);
            _context3.t4 = expect;
            _context3.next = 29;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 29:
            _context3.t5 = _context3.sent;
            (0, _context3.t4)(_context3.t5).to.be.equal(true);
            _context3.t6 = expect;
            _context3.next = 34;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter3));

          case 34:
            _context3.t7 = _context3.sent;
            (0, _context3.t6)(_context3.t7).to.be.equal(true);
            _context3.t8 = expect;
            _context3.next = 39;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter4));

          case 39:
            _context3.t9 = _context3.sent;
            (0, _context3.t8)(_context3.t9).to.be.equal(true);
            _context3.next = 43;
            return regeneratorRuntime.awrap(this.mock.proposalVotes(this.proposal.id).then(function (results) {
              expect(results.forVotes).to.be.bignumber.equal(web3.utils.toWei('17'));
              expect(results.againstVotes).to.be.bignumber.equal(web3.utils.toWei('5'));
              expect(results.abstainVotes).to.be.bignumber.equal(web3.utils.toWei('2'));
            }));

          case 43:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
});