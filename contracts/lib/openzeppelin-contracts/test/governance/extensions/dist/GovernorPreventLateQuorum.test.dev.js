"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var Enums = require('../../helpers/enums');

var _require3 = require('../../helpers/governance'),
    GovernorHelper = _require3.GovernorHelper;

var Token = artifacts.require('ERC20VotesCompMock');

var Governor = artifacts.require('GovernorPreventLateQuorumMock');

var CallReceiver = artifacts.require('CallReceiverMock');

contract('GovernorPreventLateQuorum', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      owner = _accounts[0],
      proposer = _accounts[1],
      voter1 = _accounts[2],
      voter2 = _accounts[3],
      voter3 = _accounts[4],
      voter4 = _accounts[5];

  var name = 'OZ-Governor'; // const version = '1';

  var tokenName = 'MockToken';
  var tokenSymbol = 'MTKN';
  var tokenSupply = web3.utils.toWei('100');
  var votingDelay = new BN(4);
  var votingPeriod = new BN(16);
  var lateQuorumVoteExtension = new BN(8);
  var quorum = web3.utils.toWei('1');
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
            return regeneratorRuntime.awrap(Governor["new"](name, this.token.address, votingDelay, votingPeriod, quorum, lateQuorumVoteExtension));

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
            _context2.t14 = quorum;
            (0, _context2.t12)(_context2.t13).to.be.bignumber.equal(_context2.t14);
            _context2.t15 = expect;
            _context2.next = 33;
            return regeneratorRuntime.awrap(this.mock.lateQuorumVoteExtension());

          case 33:
            _context2.t16 = _context2.sent;
            _context2.t17 = lateQuorumVoteExtension;
            (0, _context2.t15)(_context2.t16).to.be.bignumber.equal(_context2.t17);

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('nominal workflow unaffected', function _callee3() {
    var txPropose, startBlock, endBlock;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 2:
            txPropose = _context3.sent;
            _context3.next = 5;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 5:
            _context3.next = 7;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter1
            }));

          case 7:
            _context3.next = 9;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 9:
            _context3.next = 11;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter3
            }));

          case 11:
            _context3.next = 13;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Abstain
            }, {
              from: voter4
            }));

          case 13:
            _context3.next = 15;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 15:
            _context3.next = 17;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 17:
            _context3.t0 = expect;
            _context3.next = 20;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 20:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).to.be.equal(false);
            _context3.t2 = expect;
            _context3.next = 25;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 25:
            _context3.t3 = _context3.sent;
            (0, _context3.t2)(_context3.t3).to.be.equal(true);
            _context3.t4 = expect;
            _context3.next = 30;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 30:
            _context3.t5 = _context3.sent;
            (0, _context3.t4)(_context3.t5).to.be.equal(true);
            _context3.t6 = expect;
            _context3.next = 35;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter3));

          case 35:
            _context3.t7 = _context3.sent;
            (0, _context3.t6)(_context3.t7).to.be.equal(true);
            _context3.t8 = expect;
            _context3.next = 40;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter4));

          case 40:
            _context3.t9 = _context3.sent;
            (0, _context3.t8)(_context3.t9).to.be.equal(true);
            _context3.next = 44;
            return regeneratorRuntime.awrap(this.mock.proposalVotes(this.proposal.id).then(function (results) {
              expect(results.forVotes).to.be.bignumber.equal(web3.utils.toWei('17'));
              expect(results.againstVotes).to.be.bignumber.equal(web3.utils.toWei('5'));
              expect(results.abstainVotes).to.be.bignumber.equal(web3.utils.toWei('2'));
            }));

          case 44:
            startBlock = new BN(txPropose.receipt.blockNumber).add(votingDelay);
            endBlock = new BN(txPropose.receipt.blockNumber).add(votingDelay).add(votingPeriod);
            _context3.t10 = expect;
            _context3.next = 49;
            return regeneratorRuntime.awrap(this.mock.proposalSnapshot(this.proposal.id));

          case 49:
            _context3.t11 = _context3.sent;
            _context3.t12 = startBlock;
            (0, _context3.t10)(_context3.t11).to.be.bignumber.equal(_context3.t12);
            _context3.t13 = expect;
            _context3.next = 55;
            return regeneratorRuntime.awrap(this.mock.proposalDeadline(this.proposal.id));

          case 55:
            _context3.t14 = _context3.sent;
            _context3.t15 = endBlock;
            (0, _context3.t13)(_context3.t14).to.be.bignumber.equal(_context3.t15);
            expectEvent(txPropose, 'ProposalCreated', {
              proposalId: this.proposal.id,
              proposer: proposer,
              targets: this.proposal.targets,
              // values: this.proposal.values.map(value => new BN(value)),
              signatures: this.proposal.signatures,
              calldatas: this.proposal.data,
              startBlock: startBlock,
              endBlock: endBlock,
              description: this.proposal.description
            });

          case 59:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('Delay is extended to prevent last minute take-over', function _callee4() {
    var txPropose, startBlock, endBlock, txVote, extendedDeadline;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 2:
            txPropose = _context4.sent;
            // compute original schedule
            startBlock = new BN(txPropose.receipt.blockNumber).add(votingDelay);
            endBlock = new BN(txPropose.receipt.blockNumber).add(votingDelay).add(votingPeriod);
            _context4.t0 = expect;
            _context4.next = 8;
            return regeneratorRuntime.awrap(this.mock.proposalSnapshot(this.proposal.id));

          case 8:
            _context4.t1 = _context4.sent;
            _context4.t2 = startBlock;
            (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);
            _context4.t3 = expect;
            _context4.next = 14;
            return regeneratorRuntime.awrap(this.mock.proposalDeadline(this.proposal.id));

          case 14:
            _context4.t4 = _context4.sent;
            _context4.t5 = endBlock;
            (0, _context4.t3)(_context4.t4).to.be.bignumber.equal(_context4.t5);
            _context4.next = 19;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline(-1));

          case 19:
            _context4.next = 21;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 21:
            txVote = _context4.sent;
            _context4.t6 = expect;
            _context4.next = 25;
            return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

          case 25:
            _context4.t7 = _context4.sent;
            _context4.t8 = Enums.ProposalState.Active;
            (0, _context4.t6)(_context4.t7).to.be.bignumber.equal(_context4.t8);
            // compute new extended schedule
            extendedDeadline = new BN(txVote.receipt.blockNumber).add(lateQuorumVoteExtension);
            _context4.t9 = expect;
            _context4.next = 32;
            return regeneratorRuntime.awrap(this.mock.proposalSnapshot(this.proposal.id));

          case 32:
            _context4.t10 = _context4.sent;
            _context4.t11 = startBlock;
            (0, _context4.t9)(_context4.t10).to.be.bignumber.equal(_context4.t11);
            _context4.t12 = expect;
            _context4.next = 38;
            return regeneratorRuntime.awrap(this.mock.proposalDeadline(this.proposal.id));

          case 38:
            _context4.t13 = _context4.sent;
            _context4.t14 = extendedDeadline;
            (0, _context4.t12)(_context4.t13).to.be.bignumber.equal(_context4.t14);
            _context4.next = 43;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter1
            }));

          case 43:
            _context4.next = 45;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 45:
            _context4.t15 = expect;
            _context4.next = 48;
            return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

          case 48:
            _context4.t16 = _context4.sent;
            _context4.t17 = Enums.ProposalState.Active;
            (0, _context4.t15)(_context4.t16).to.be.bignumber.equal(_context4.t17);
            _context4.next = 53;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline(+1));

          case 53:
            _context4.t18 = expect;
            _context4.next = 56;
            return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

          case 56:
            _context4.t19 = _context4.sent;
            _context4.t20 = Enums.ProposalState.Defeated;
            (0, _context4.t18)(_context4.t19).to.be.bignumber.equal(_context4.t20);
            // check extension event
            expectEvent(txVote, 'ProposalExtended', {
              proposalId: this.proposal.id,
              extendedDeadline: extendedDeadline
            });

          case 60:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  describe('onlyGovernance updates', function () {
    it('setLateQuorumVoteExtension is protected', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.mock.setLateQuorumVoteExtension(0), 'Governor: onlyGovernance'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('can setLateQuorumVoteExtension through governance', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.helper.setProposal([{
                target: this.mock.address,
                data: this.mock.contract.methods.setLateQuorumVoteExtension('0').encodeABI()
              }], '<proposal description>');
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 3:
              _context6.next = 5;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 5:
              _context6.next = 7;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 7:
              _context6.next = 9;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 9:
              _context6.t0 = expectEvent;
              _context6.next = 12;
              return regeneratorRuntime.awrap(this.helper.execute());

            case 12:
              _context6.t1 = _context6.sent;
              _context6.t2 = {
                oldVoteExtension: lateQuorumVoteExtension,
                newVoteExtension: '0'
              };
              (0, _context6.t0)(_context6.t1, 'LateQuorumVoteExtensionSet', _context6.t2);
              _context6.t3 = expect;
              _context6.next = 18;
              return regeneratorRuntime.awrap(this.mock.lateQuorumVoteExtension());

            case 18:
              _context6.t4 = _context6.sent;
              (0, _context6.t3)(_context6.t4).to.be.bignumber.equal('0');

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
});