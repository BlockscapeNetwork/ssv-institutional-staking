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

var RLP = require('rlp');

var Enums = require('../../helpers/enums');

var _require3 = require('../../helpers/governance'),
    GovernorHelper = _require3.GovernorHelper;

var Token = artifacts.require('ERC20VotesCompMock');

var Timelock = artifacts.require('CompTimelock');

var Governor = artifacts.require('GovernorCompatibilityBravoMock');

var CallReceiver = artifacts.require('CallReceiverMock');

function makeContractAddress(creator, nonce) {
  return web3.utils.toChecksumAddress(web3.utils.sha3(RLP.encode([creator, nonce])).slice(12).substring(14));
}

contract('GovernorCompatibilityBravo', function (accounts) {
  var _accounts = _slicedToArray(accounts, 7),
      owner = _accounts[0],
      proposer = _accounts[1],
      voter1 = _accounts[2],
      voter2 = _accounts[3],
      voter3 = _accounts[4],
      voter4 = _accounts[5],
      other = _accounts[6];

  var name = 'OZ-Governor'; // const version = '1';

  var tokenName = 'MockToken';
  var tokenSymbol = 'MTKN';
  var tokenSupply = web3.utils.toWei('100');
  var votingDelay = new BN(4);
  var votingPeriod = new BN(16);
  var proposalThreshold = web3.utils.toWei('10');
  var value = web3.utils.toWei('1');
  beforeEach(function _callee() {
    var _ref, _ref2, deployer, nonce, predictGovernor;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(web3.eth.getAccounts());

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            deployer = _ref2[0];
            _context.next = 7;
            return regeneratorRuntime.awrap(Token["new"](tokenName, tokenSymbol));

          case 7:
            this.token = _context.sent;
            _context.next = 10;
            return regeneratorRuntime.awrap(web3.eth.getTransactionCount(deployer));

          case 10:
            nonce = _context.sent;
            predictGovernor = makeContractAddress(deployer, nonce + 1);
            _context.next = 14;
            return regeneratorRuntime.awrap(Timelock["new"](predictGovernor, 2 * 86400));

          case 14:
            this.timelock = _context.sent;
            _context.next = 17;
            return regeneratorRuntime.awrap(Governor["new"](name, this.token.address, votingDelay, votingPeriod, proposalThreshold, this.timelock.address));

          case 17:
            this.mock = _context.sent;
            _context.next = 20;
            return regeneratorRuntime.awrap(CallReceiver["new"]());

          case 20:
            this.receiver = _context.sent;
            this.helper = new GovernorHelper(this.mock);
            _context.next = 24;
            return regeneratorRuntime.awrap(web3.eth.sendTransaction({
              from: owner,
              to: this.timelock.address,
              value: value
            }));

          case 24:
            _context.next = 26;
            return regeneratorRuntime.awrap(this.token.mint(owner, tokenSupply));

          case 26:
            _context.next = 28;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: proposer,
              value: proposalThreshold
            }, {
              from: owner
            }));

          case 28:
            _context.next = 30;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter1,
              value: web3.utils.toWei('10')
            }, {
              from: owner
            }));

          case 30:
            _context.next = 32;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter2,
              value: web3.utils.toWei('7')
            }, {
              from: owner
            }));

          case 32:
            _context.next = 34;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter3,
              value: web3.utils.toWei('5')
            }, {
              from: owner
            }));

          case 34:
            _context.next = 36;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter4,
              value: web3.utils.toWei('2')
            }, {
              from: owner
            }));

          case 36:
            // default proposal
            this.proposal = this.helper.setProposal([{
              target: this.receiver.address,
              value: value,
              signature: 'mockFunction()'
            }], '<proposal description>');

          case 37:
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
            _context2.t14 = expect;
            _context2.next = 32;
            return regeneratorRuntime.awrap(this.mock.quorumVotes());

          case 32:
            _context2.t15 = _context2.sent;
            (0, _context2.t14)(_context2.t15).to.be.bignumber.equal('0');
            _context2.t16 = expect;
            _context2.next = 37;
            return regeneratorRuntime.awrap(this.mock.COUNTING_MODE());

          case 37:
            _context2.t17 = _context2.sent;
            (0, _context2.t16)(_context2.t17).to.be.equal('support=bravo&quorum=bravo');

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('nominal workflow', function _callee3() {
    var txPropose, txExecute, proposal, action, voteReceipt1, voteReceipt2, voteReceipt3, voteReceipt4;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 3:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).to.be.equal(false);
            _context3.t2 = expect;
            _context3.next = 8;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 8:
            _context3.t3 = _context3.sent;
            (0, _context3.t2)(_context3.t3).to.be.equal(false);
            _context3.t4 = expect;
            _context3.next = 13;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 13:
            _context3.t5 = _context3.sent;
            (0, _context3.t4)(_context3.t5).to.be.equal(false);
            _context3.t6 = expect;
            _context3.next = 18;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

          case 18:
            _context3.t7 = _context3.sent;
            (0, _context3.t6)(_context3.t7).to.be.bignumber.equal('0');
            _context3.t8 = expect;
            _context3.next = 23;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.timelock.address));

          case 23:
            _context3.t9 = _context3.sent;
            _context3.t10 = value;
            (0, _context3.t8)(_context3.t9).to.be.bignumber.equal(_context3.t10);
            _context3.t11 = expect;
            _context3.next = 29;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.receiver.address));

          case 29:
            _context3.t12 = _context3.sent;
            (0, _context3.t11)(_context3.t12).to.be.bignumber.equal('0');
            _context3.next = 33;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 33:
            txPropose = _context3.sent;
            _context3.next = 36;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 36:
            _context3.next = 38;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For,
              reason: 'This is nice'
            }, {
              from: voter1
            }));

          case 38:
            _context3.next = 40;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 40:
            _context3.next = 42;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter3
            }));

          case 42:
            _context3.next = 44;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Abstain
            }, {
              from: voter4
            }));

          case 44:
            _context3.next = 46;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 46:
            _context3.next = 48;
            return regeneratorRuntime.awrap(this.helper.queue());

          case 48:
            _context3.next = 50;
            return regeneratorRuntime.awrap(this.helper.waitForEta());

          case 50:
            _context3.next = 52;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 52:
            txExecute = _context3.sent;
            _context3.t13 = expect;
            _context3.next = 56;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 56:
            _context3.t14 = _context3.sent;
            (0, _context3.t13)(_context3.t14).to.be.equal(false);
            _context3.t15 = expect;
            _context3.next = 61;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 61:
            _context3.t16 = _context3.sent;
            (0, _context3.t15)(_context3.t16).to.be.equal(true);
            _context3.t17 = expect;
            _context3.next = 66;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 66:
            _context3.t18 = _context3.sent;
            (0, _context3.t17)(_context3.t18).to.be.equal(true);
            _context3.t19 = expect;
            _context3.next = 71;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

          case 71:
            _context3.t20 = _context3.sent;
            (0, _context3.t19)(_context3.t20).to.be.bignumber.equal('0');
            _context3.t21 = expect;
            _context3.next = 76;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.timelock.address));

          case 76:
            _context3.t22 = _context3.sent;
            (0, _context3.t21)(_context3.t22).to.be.bignumber.equal('0');
            _context3.t23 = expect;
            _context3.next = 81;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.receiver.address));

          case 81:
            _context3.t24 = _context3.sent;
            _context3.t25 = value;
            (0, _context3.t23)(_context3.t24).to.be.bignumber.equal(_context3.t25);
            _context3.next = 86;
            return regeneratorRuntime.awrap(this.mock.proposals(this.proposal.id));

          case 86:
            proposal = _context3.sent;
            expect(proposal.id).to.be.bignumber.equal(this.proposal.id);
            expect(proposal.proposer).to.be.equal(proposer);
            _context3.t26 = expect(proposal.eta).to.be.bignumber;
            _context3.next = 92;
            return regeneratorRuntime.awrap(this.mock.proposalEta(this.proposal.id));

          case 92:
            _context3.t27 = _context3.sent;

            _context3.t26.equal.call(_context3.t26, _context3.t27);

            _context3.t28 = expect(proposal.startBlock).to.be.bignumber;
            _context3.next = 97;
            return regeneratorRuntime.awrap(this.mock.proposalSnapshot(this.proposal.id));

          case 97:
            _context3.t29 = _context3.sent;

            _context3.t28.equal.call(_context3.t28, _context3.t29);

            _context3.t30 = expect(proposal.endBlock).to.be.bignumber;
            _context3.next = 102;
            return regeneratorRuntime.awrap(this.mock.proposalDeadline(this.proposal.id));

          case 102:
            _context3.t31 = _context3.sent;

            _context3.t30.equal.call(_context3.t30, _context3.t31);

            expect(proposal.canceled).to.be.equal(false);
            expect(proposal.executed).to.be.equal(true);
            _context3.next = 108;
            return regeneratorRuntime.awrap(this.mock.getActions(this.proposal.id));

          case 108:
            action = _context3.sent;
            expect(action.targets).to.be.deep.equal(this.proposal.targets); // expect(action.values).to.be.deep.equal(this.proposal.values);

            expect(action.signatures).to.be.deep.equal(this.proposal.signatures);
            expect(action.calldatas).to.be.deep.equal(this.proposal.data);
            _context3.next = 114;
            return regeneratorRuntime.awrap(this.mock.getReceipt(this.proposal.id, voter1));

          case 114:
            voteReceipt1 = _context3.sent;
            expect(voteReceipt1.hasVoted).to.be.equal(true);
            expect(voteReceipt1.support).to.be.bignumber.equal(Enums.VoteType.For);
            expect(voteReceipt1.votes).to.be.bignumber.equal(web3.utils.toWei('10'));
            _context3.next = 120;
            return regeneratorRuntime.awrap(this.mock.getReceipt(this.proposal.id, voter2));

          case 120:
            voteReceipt2 = _context3.sent;
            expect(voteReceipt2.hasVoted).to.be.equal(true);
            expect(voteReceipt2.support).to.be.bignumber.equal(Enums.VoteType.For);
            expect(voteReceipt2.votes).to.be.bignumber.equal(web3.utils.toWei('7'));
            _context3.next = 126;
            return regeneratorRuntime.awrap(this.mock.getReceipt(this.proposal.id, voter3));

          case 126:
            voteReceipt3 = _context3.sent;
            expect(voteReceipt3.hasVoted).to.be.equal(true);
            expect(voteReceipt3.support).to.be.bignumber.equal(Enums.VoteType.Against);
            expect(voteReceipt3.votes).to.be.bignumber.equal(web3.utils.toWei('5'));
            _context3.next = 132;
            return regeneratorRuntime.awrap(this.mock.getReceipt(this.proposal.id, voter4));

          case 132:
            voteReceipt4 = _context3.sent;
            expect(voteReceipt4.hasVoted).to.be.equal(true);
            expect(voteReceipt4.support).to.be.bignumber.equal(Enums.VoteType.Abstain);
            expect(voteReceipt4.votes).to.be.bignumber.equal(web3.utils.toWei('2'));
            expectEvent(txPropose, 'ProposalCreated', {
              proposalId: this.proposal.id,
              proposer: proposer,
              targets: this.proposal.targets,
              // values: this.proposal.values,
              signatures: this.proposal.signatures.map(function () {
                return '';
              }),
              // this event doesn't contain the proposal detail
              calldatas: this.proposal.fulldata,
              startBlock: new BN(txPropose.receipt.blockNumber).add(votingDelay),
              endBlock: new BN(txPropose.receipt.blockNumber).add(votingDelay).add(votingPeriod),
              description: this.proposal.description
            });
            expectEvent(txExecute, 'ProposalExecuted', {
              proposalId: this.proposal.id
            });
            _context3.next = 140;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.receiver, 'MockFunctionCalled'));

          case 140:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('double voting is forbiden', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 2:
            _context4.next = 4;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 4:
            _context4.next = 6;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter1
            }));

          case 6:
            _context4.next = 8;
            return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter1
            }), 'GovernorCompatibilityBravo: vote already cast'));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('with function selector and arguments', function _callee5() {
    var target, txExecute;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            target = this.receiver.address;
            this.helper.setProposal([{
              target: target,
              data: this.receiver.contract.methods.mockFunction().encodeABI()
            }, {
              target: target,
              data: this.receiver.contract.methods.mockFunctionWithArgs(17, 42).encodeABI()
            }, {
              target: target,
              signature: 'mockFunctionNonPayable()'
            }, {
              target: target,
              signature: 'mockFunctionWithArgs(uint256,uint256)',
              data: web3.eth.abi.encodeParameters(['uint256', 'uint256'], [18, 43])
            }], '<proposal description>');
            _context5.next = 4;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 4:
            _context5.next = 6;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For,
              reason: 'This is nice'
            }, {
              from: voter1
            }));

          case 8:
            _context5.next = 10;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 10:
            _context5.next = 12;
            return regeneratorRuntime.awrap(this.helper.queue());

          case 12:
            _context5.next = 14;
            return regeneratorRuntime.awrap(this.helper.waitForEta());

          case 14:
            _context5.next = 16;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 16:
            txExecute = _context5.sent;
            _context5.next = 19;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.receiver, 'MockFunctionCalled'));

          case 19:
            _context5.next = 21;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.receiver, 'MockFunctionCalled'));

          case 21:
            _context5.next = 23;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.receiver, 'MockFunctionCalledWithArgs', {
              a: '17',
              b: '42'
            }));

          case 23:
            _context5.next = 25;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.receiver, 'MockFunctionCalledWithArgs', {
              a: '18',
              b: '43'
            }));

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  describe('should revert', function () {
    describe('on propose', function () {
      it('if proposal does not meet proposalThreshold', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.helper.propose({
                  from: other
                }), 'Governor: proposer votes below proposal threshold'));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    describe('on vote', function () {
      it('if vote type is invalide', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose({
                  from: proposer
                }));

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context7.next = 6;
                return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
                  support: 5
                }, {
                  from: voter1
                }), 'GovernorCompatibilityBravo: invalid vote type'));

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('cancel', function () {
    it('proposer can cancel', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose({
                from: proposer
              }));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.helper.cancel({
                from: proposer
              }));

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('anyone can cancel if proposer drop below threshold', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose({
                from: proposer
              }));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.token.transfer(voter1, web3.utils.toWei('1'), {
                from: proposer
              }));

            case 4:
              _context9.next = 6;
              return regeneratorRuntime.awrap(this.helper.cancel());

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('cannot cancel is proposer is still above threshold', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose({
                from: proposer
              }));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.helper.cancel(), 'GovernorBravo: proposer above threshold'));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
  });
});