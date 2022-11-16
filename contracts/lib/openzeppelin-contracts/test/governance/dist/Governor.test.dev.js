"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

var _require3 = require('ethereumjs-util'),
    fromRpcSig = _require3.fromRpcSig;

var Enums = require('../helpers/enums');

var _require4 = require('../helpers/eip712'),
    EIP712Domain = _require4.EIP712Domain;

var _require5 = require('../helpers/governance'),
    GovernorHelper = _require5.GovernorHelper;

var _require6 = require('../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require6.shouldSupportInterfaces;

var Token = artifacts.require('ERC20VotesMock');

var Governor = artifacts.require('GovernorMock');

var CallReceiver = artifacts.require('CallReceiverMock');

var ERC721Mock = artifacts.require('ERC721Mock');

var ERC1155Mock = artifacts.require('ERC1155Mock');

contract('Governor', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      owner = _accounts[0],
      proposer = _accounts[1],
      voter1 = _accounts[2],
      voter2 = _accounts[3],
      voter3 = _accounts[4],
      voter4 = _accounts[5];

  var empty = web3.utils.toChecksumAddress(web3.utils.randomHex(20));
  var name = 'OZ-Governor';
  var version = '1';
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
            _context.next = 2;
            return regeneratorRuntime.awrap(web3.eth.getChainId());

          case 2:
            this.chainId = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(Token["new"](tokenName, tokenSymbol));

          case 5:
            this.token = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(Governor["new"](name, this.token.address, votingDelay, votingPeriod, 10));

          case 8:
            this.mock = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(CallReceiver["new"]());

          case 11:
            this.receiver = _context.sent;
            this.helper = new GovernorHelper(this.mock);
            _context.next = 15;
            return regeneratorRuntime.awrap(web3.eth.sendTransaction({
              from: owner,
              to: this.mock.address,
              value: value
            }));

          case 15:
            _context.next = 17;
            return regeneratorRuntime.awrap(this.token.mint(owner, tokenSupply));

          case 17:
            _context.next = 19;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter1,
              value: web3.utils.toWei('10')
            }, {
              from: owner
            }));

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter2,
              value: web3.utils.toWei('7')
            }, {
              from: owner
            }));

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter3,
              value: web3.utils.toWei('5')
            }, {
              from: owner
            }));

          case 23:
            _context.next = 25;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter4,
              value: web3.utils.toWei('2')
            }, {
              from: owner
            }));

          case 25:
            this.proposal = this.helper.setProposal([{
              target: this.receiver.address,
              data: this.receiver.contract.methods.mockFunction().encodeABI(),
              value: value
            }], '<proposal description>');

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldSupportInterfaces(['ERC165', 'ERC1155Receiver', 'Governor', 'GovernorWithParams']);
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
            return regeneratorRuntime.awrap(this.mock.COUNTING_MODE());

          case 32:
            _context2.t15 = _context2.sent;
            (0, _context2.t14)(_context2.t15).to.be.equal('support=bravo&quorum=for,abstain');

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('nominal workflow', function _callee3() {
    var txPropose, txExecute;
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
            _context3.t8 = value;
            (0, _context3.t6)(_context3.t7).to.be.bignumber.equal(_context3.t8);
            _context3.t9 = expect;
            _context3.next = 24;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.receiver.address));

          case 24:
            _context3.t10 = _context3.sent;
            (0, _context3.t9)(_context3.t10).to.be.bignumber.equal('0');
            _context3.next = 28;
            return regeneratorRuntime.awrap(this.helper.propose({
              from: proposer
            }));

          case 28:
            txPropose = _context3.sent;
            expectEvent(txPropose, 'ProposalCreated', {
              proposalId: this.proposal.id,
              proposer: proposer,
              targets: this.proposal.targets,
              // values: this.proposal.values,
              signatures: this.proposal.signatures,
              calldatas: this.proposal.data,
              startBlock: new BN(txPropose.receipt.blockNumber).add(votingDelay),
              endBlock: new BN(txPropose.receipt.blockNumber).add(votingDelay).add(votingPeriod),
              description: this.proposal.description
            });
            _context3.next = 32;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 32:
            _context3.t11 = expectEvent;
            _context3.next = 35;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For,
              reason: 'This is nice'
            }, {
              from: voter1
            }));

          case 35:
            _context3.t12 = _context3.sent;
            _context3.t13 = {
              voter: voter1,
              support: Enums.VoteType.For,
              reason: 'This is nice',
              weight: web3.utils.toWei('10')
            };
            (0, _context3.t11)(_context3.t12, 'VoteCast', _context3.t13);
            _context3.t14 = expectEvent;
            _context3.next = 41;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 41:
            _context3.t15 = _context3.sent;
            _context3.t16 = {
              voter: voter2,
              support: Enums.VoteType.For,
              weight: web3.utils.toWei('7')
            };
            (0, _context3.t14)(_context3.t15, 'VoteCast', _context3.t16);
            _context3.t17 = expectEvent;
            _context3.next = 47;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter3
            }));

          case 47:
            _context3.t18 = _context3.sent;
            _context3.t19 = {
              voter: voter3,
              support: Enums.VoteType.Against,
              weight: web3.utils.toWei('5')
            };
            (0, _context3.t17)(_context3.t18, 'VoteCast', _context3.t19);
            _context3.t20 = expectEvent;
            _context3.next = 53;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Abstain
            }, {
              from: voter4
            }));

          case 53:
            _context3.t21 = _context3.sent;
            _context3.t22 = {
              voter: voter4,
              support: Enums.VoteType.Abstain,
              weight: web3.utils.toWei('2')
            };
            (0, _context3.t20)(_context3.t21, 'VoteCast', _context3.t22);
            _context3.next = 58;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 58:
            _context3.next = 60;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 60:
            txExecute = _context3.sent;
            expectEvent(txExecute, 'ProposalExecuted', {
              proposalId: this.proposal.id
            });
            _context3.next = 64;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.receiver, 'MockFunctionCalled'));

          case 64:
            _context3.t23 = expect;
            _context3.next = 67;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 67:
            _context3.t24 = _context3.sent;
            (0, _context3.t23)(_context3.t24).to.be.equal(false);
            _context3.t25 = expect;
            _context3.next = 72;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 72:
            _context3.t26 = _context3.sent;
            (0, _context3.t25)(_context3.t26).to.be.equal(true);
            _context3.t27 = expect;
            _context3.next = 77;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 77:
            _context3.t28 = _context3.sent;
            (0, _context3.t27)(_context3.t28).to.be.equal(true);
            _context3.t29 = expect;
            _context3.next = 82;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

          case 82:
            _context3.t30 = _context3.sent;
            (0, _context3.t29)(_context3.t30).to.be.bignumber.equal('0');
            _context3.t31 = expect;
            _context3.next = 87;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.receiver.address));

          case 87:
            _context3.t32 = _context3.sent;
            _context3.t33 = value;
            (0, _context3.t31)(_context3.t32).to.be.bignumber.equal(_context3.t33);

          case 90:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('vote with signature', function _callee4() {
    var _this = this;

    var voterBySig, voterBySigAddress, signature;
    return regeneratorRuntime.async(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            voterBySig = Wallet.generate();
            voterBySigAddress = web3.utils.toChecksumAddress(voterBySig.getAddressString());

            signature = function signature(message) {
              return regeneratorRuntime.async(function signature$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      return _context4.abrupt("return", fromRpcSig(ethSigUtil.signTypedMessage(voterBySig.getPrivateKey(), {
                        data: {
                          types: {
                            EIP712Domain: EIP712Domain,
                            Ballot: [{
                              name: 'proposalId',
                              type: 'uint256'
                            }, {
                              name: 'support',
                              type: 'uint8'
                            }]
                          },
                          domain: {
                            name: name,
                            version: version,
                            chainId: _this.chainId,
                            verifyingContract: _this.mock.address
                          },
                          primaryType: 'Ballot',
                          message: message
                        }
                      })));

                    case 1:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            };

            _context5.next = 5;
            return regeneratorRuntime.awrap(this.token.delegate(voterBySigAddress, {
              from: voter1
            }));

          case 5:
            _context5.next = 7;
            return regeneratorRuntime.awrap(this.helper.propose());

          case 7:
            _context5.next = 9;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 9:
            _context5.t0 = expectEvent;
            _context5.next = 12;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For,
              signature: signature
            }));

          case 12:
            _context5.t1 = _context5.sent;
            _context5.t2 = {
              voter: voterBySigAddress,
              support: Enums.VoteType.For
            };
            (0, _context5.t0)(_context5.t1, 'VoteCast', _context5.t2);
            _context5.next = 17;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 17:
            _context5.next = 19;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 19:
            _context5.t3 = expect;
            _context5.next = 22;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, owner));

          case 22:
            _context5.t4 = _context5.sent;
            (0, _context5.t3)(_context5.t4).to.be.equal(false);
            _context5.t5 = expect;
            _context5.next = 27;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter1));

          case 27:
            _context5.t6 = _context5.sent;
            (0, _context5.t5)(_context5.t6).to.be.equal(false);
            _context5.t7 = expect;
            _context5.next = 32;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voter2));

          case 32:
            _context5.t8 = _context5.sent;
            (0, _context5.t7)(_context5.t8).to.be.equal(false);
            _context5.t9 = expect;
            _context5.next = 37;
            return regeneratorRuntime.awrap(this.mock.hasVoted(this.proposal.id, voterBySigAddress));

          case 37:
            _context5.t10 = _context5.sent;
            (0, _context5.t9)(_context5.t10).to.be.equal(true);

          case 39:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  it('send ethers', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            this.proposal = this.helper.setProposal([{
              target: empty,
              value: value
            }], '<proposal description>'); // Before

            _context6.t0 = expect;
            _context6.next = 4;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

          case 4:
            _context6.t1 = _context6.sent;
            _context6.t2 = value;
            (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);
            _context6.t3 = expect;
            _context6.next = 10;
            return regeneratorRuntime.awrap(web3.eth.getBalance(empty));

          case 10:
            _context6.t4 = _context6.sent;
            (0, _context6.t3)(_context6.t4).to.be.bignumber.equal('0');
            _context6.next = 14;
            return regeneratorRuntime.awrap(this.helper.propose());

          case 14:
            _context6.next = 16;
            return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

          case 16:
            _context6.next = 18;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter1
            }));

          case 18:
            _context6.next = 20;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 20:
            _context6.next = 22;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 22:
            _context6.t5 = expect;
            _context6.next = 25;
            return regeneratorRuntime.awrap(web3.eth.getBalance(this.mock.address));

          case 25:
            _context6.t6 = _context6.sent;
            (0, _context6.t5)(_context6.t6).to.be.bignumber.equal('0');
            _context6.t7 = expect;
            _context6.next = 30;
            return regeneratorRuntime.awrap(web3.eth.getBalance(empty));

          case 30:
            _context6.t8 = _context6.sent;
            _context6.t9 = value;
            (0, _context6.t7)(_context6.t8).to.be.bignumber.equal(_context6.t9);

          case 33:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this);
  });
  describe('should revert', function () {
    describe('on propose', function () {
      it('if proposal already exists', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.helper.propose(), 'Governor: proposal already exists'));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
    });
    describe('on vote', function () {
      it('if proposal does not exist', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }), 'Governor: unknown proposal id'));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('if voting has not started', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context9.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }), 'Governor: vote not currently active'));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('if support value is invalid', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context10.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context10.next = 6;
                return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
                  support: new BN('255')
                }), 'GovernorVotingSimple: invalid value for enum VoteType'));

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('if vote was already casted', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context11.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context11.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context11.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }), 'GovernorVotingSimple: vote already cast'));

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('if voting is over', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context12.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 4:
                _context12.next = 6;
                return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }), 'Governor: vote not currently active'));

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
    describe('on execute', function () {
      it('if proposal does not exist', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: unknown proposal id'));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('if quorum is not reached', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context14.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context14.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter3
                }));

              case 6:
                _context14.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('if score not reached', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context15.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context15.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.Against
                }, {
                  from: voter1
                }));

              case 6:
                _context15.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

              case 8:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('if voting is not over', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context16.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context16.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context16.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

              case 8:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      it('if receiver revert without reason', function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                this.proposal = this.helper.setProposal([{
                  target: this.receiver.address,
                  data: this.receiver.contract.methods.mockFunctionRevertsNoReason().encodeABI()
                }], '<proposal description>');
                _context17.next = 3;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 3:
                _context17.next = 5;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 5:
                _context17.next = 7;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 7:
                _context17.next = 9;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 9:
                _context17.next = 11;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: call reverted without message'));

              case 11:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });
      it('if receiver revert with reason', function _callee17() {
        return regeneratorRuntime.async(function _callee17$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                this.proposal = this.helper.setProposal([{
                  target: this.receiver.address,
                  data: this.receiver.contract.methods.mockFunctionRevertsReason().encodeABI()
                }], '<proposal description>');
                _context18.next = 3;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 3:
                _context18.next = 5;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 5:
                _context18.next = 7;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 7:
                _context18.next = 9;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 9:
                _context18.next = 11;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'CallReceiverMock: reverting'));

              case 11:
              case "end":
                return _context18.stop();
            }
          }
        }, null, this);
      });
      it('if proposal was already executed', function _callee18() {
        return regeneratorRuntime.async(function _callee18$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context19.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context19.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context19.next = 8;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 8:
                _context19.next = 10;
                return regeneratorRuntime.awrap(this.helper.execute());

              case 10:
                _context19.next = 12;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

              case 12:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('state', function () {
    it('Unset', function _callee19() {
      return regeneratorRuntime.async(function _callee19$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.mock.state(this.proposal.id), 'Governor: unknown proposal id'));

            case 2:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    });
    it('Pending & Active', function _callee20() {
      return regeneratorRuntime.async(function _callee20$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context21.t0 = expect;
              _context21.next = 5;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 5:
              _context21.t1 = _context21.sent;
              _context21.t2 = Enums.ProposalState.Pending;
              (0, _context21.t0)(_context21.t1).to.be.bignumber.equal(_context21.t2);
              _context21.next = 10;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 10:
              _context21.t3 = expect;
              _context21.next = 13;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 13:
              _context21.t4 = _context21.sent;
              _context21.t5 = Enums.ProposalState.Pending;
              (0, _context21.t3)(_context21.t4).to.be.bignumber.equal(_context21.t5);
              _context21.next = 18;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot(+1));

            case 18:
              _context21.t6 = expect;
              _context21.next = 21;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 21:
              _context21.t7 = _context21.sent;
              _context21.t8 = Enums.ProposalState.Active;
              (0, _context21.t6)(_context21.t7).to.be.bignumber.equal(_context21.t8);

            case 24:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    });
    it('Defeated', function _callee21() {
      return regeneratorRuntime.async(function _callee21$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context22.next = 4;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 4:
              _context22.t0 = expect;
              _context22.next = 7;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 7:
              _context22.t1 = _context22.sent;
              _context22.t2 = Enums.ProposalState.Active;
              (0, _context22.t0)(_context22.t1).to.be.bignumber.equal(_context22.t2);
              _context22.next = 12;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline(+1));

            case 12:
              _context22.t3 = expect;
              _context22.next = 15;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 15:
              _context22.t4 = _context22.sent;
              _context22.t5 = Enums.ProposalState.Defeated;
              (0, _context22.t3)(_context22.t4).to.be.bignumber.equal(_context22.t5);

            case 18:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
    it('Succeeded', function _callee22() {
      return regeneratorRuntime.async(function _callee22$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context23.next = 4;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 4:
              _context23.next = 6;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 6:
              _context23.next = 8;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 8:
              _context23.t0 = expect;
              _context23.next = 11;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 11:
              _context23.t1 = _context23.sent;
              _context23.t2 = Enums.ProposalState.Active;
              (0, _context23.t0)(_context23.t1).to.be.bignumber.equal(_context23.t2);
              _context23.next = 16;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline(+1));

            case 16:
              _context23.t3 = expect;
              _context23.next = 19;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 19:
              _context23.t4 = _context23.sent;
              _context23.t5 = Enums.ProposalState.Succeeded;
              (0, _context23.t3)(_context23.t4).to.be.bignumber.equal(_context23.t5);

            case 22:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    });
    it('Executed', function _callee23() {
      return regeneratorRuntime.async(function _callee23$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context24.next = 4;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 4:
              _context24.next = 6;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 6:
              _context24.next = 8;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 8:
              _context24.next = 10;
              return regeneratorRuntime.awrap(this.helper.execute());

            case 10:
              _context24.t0 = expect;
              _context24.next = 13;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 13:
              _context24.t1 = _context24.sent;
              _context24.t2 = Enums.ProposalState.Executed;
              (0, _context24.t0)(_context24.t1).to.be.bignumber.equal(_context24.t2);

            case 16:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    });
  });
  describe('cancel', function () {
    it('before proposal', function _callee24() {
      return regeneratorRuntime.async(function _callee24$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.helper.cancel(), 'Governor: unknown proposal id'));

            case 2:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this);
    });
    it('after proposal', function _callee25() {
      return regeneratorRuntime.async(function _callee25$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context26.next = 4;
              return regeneratorRuntime.awrap(this.helper.cancel());

            case 4:
              _context26.t0 = expect;
              _context26.next = 7;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 7:
              _context26.t1 = _context26.sent;
              _context26.t2 = Enums.ProposalState.Canceled;
              (0, _context26.t0)(_context26.t1).to.be.bignumber.equal(_context26.t2);
              _context26.next = 12;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 12:
              _context26.next = 14;
              return regeneratorRuntime.awrap(expectRevert(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }), 'Governor: vote not currently active'));

            case 14:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    });
    it('after vote', function _callee26() {
      return regeneratorRuntime.async(function _callee26$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context27.next = 4;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 4:
              _context27.next = 6;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 6:
              _context27.next = 8;
              return regeneratorRuntime.awrap(this.helper.cancel());

            case 8:
              _context27.t0 = expect;
              _context27.next = 11;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 11:
              _context27.t1 = _context27.sent;
              _context27.t2 = Enums.ProposalState.Canceled;
              (0, _context27.t0)(_context27.t1).to.be.bignumber.equal(_context27.t2);
              _context27.next = 16;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 16:
              _context27.next = 18;
              return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

            case 18:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    });
    it('after deadline', function _callee27() {
      return regeneratorRuntime.async(function _callee27$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context28.next = 4;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 4:
              _context28.next = 6;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 6:
              _context28.next = 8;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 8:
              _context28.next = 10;
              return regeneratorRuntime.awrap(this.helper.cancel());

            case 10:
              _context28.t0 = expect;
              _context28.next = 13;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 13:
              _context28.t1 = _context28.sent;
              _context28.t2 = Enums.ProposalState.Canceled;
              (0, _context28.t0)(_context28.t1).to.be.bignumber.equal(_context28.t2);
              _context28.next = 18;
              return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

            case 18:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    });
    it('after execution', function _callee28() {
      return regeneratorRuntime.async(function _callee28$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context29.next = 4;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 4:
              _context29.next = 6;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 6:
              _context29.next = 8;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 8:
              _context29.next = 10;
              return regeneratorRuntime.awrap(this.helper.execute());

            case 10:
              _context29.next = 12;
              return regeneratorRuntime.awrap(expectRevert(this.helper.cancel(), 'Governor: proposal not active'));

            case 12:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this);
    });
  });
  describe('proposal length', function () {
    it('empty', function _callee29() {
      return regeneratorRuntime.async(function _callee29$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              this.helper.setProposal([], '<proposal description>');
              _context30.next = 3;
              return regeneratorRuntime.awrap(expectRevert(this.helper.propose(), 'Governor: empty proposal'));

            case 3:
            case "end":
              return _context30.stop();
          }
        }
      }, null, this);
    });
    it('missmatch #1', function _callee30() {
      return regeneratorRuntime.async(function _callee30$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              this.helper.setProposal({
                targets: [],
                values: [web3.utils.toWei('0')],
                data: [this.receiver.contract.methods.mockFunction().encodeABI()]
              }, '<proposal description>');
              _context31.next = 3;
              return regeneratorRuntime.awrap(expectRevert(this.helper.propose(), 'Governor: invalid proposal length'));

            case 3:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    });
    it('missmatch #2', function _callee31() {
      return regeneratorRuntime.async(function _callee31$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              this.helper.setProposal({
                targets: [this.receiver.address],
                values: [],
                data: [this.receiver.contract.methods.mockFunction().encodeABI()]
              }, '<proposal description>');
              _context32.next = 3;
              return regeneratorRuntime.awrap(expectRevert(this.helper.propose(), 'Governor: invalid proposal length'));

            case 3:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    });
    it('missmatch #3', function _callee32() {
      return regeneratorRuntime.async(function _callee32$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              this.helper.setProposal({
                targets: [this.receiver.address],
                values: [web3.utils.toWei('0')],
                data: []
              }, '<proposal description>');
              _context33.next = 3;
              return regeneratorRuntime.awrap(expectRevert(this.helper.propose(), 'Governor: invalid proposal length'));

            case 3:
            case "end":
              return _context33.stop();
          }
        }
      }, null, this);
    });
  });
  describe('onlyGovernance updates', function () {
    it('setVotingDelay is protected', function _callee33() {
      return regeneratorRuntime.async(function _callee33$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.mock.setVotingDelay('0'), 'Governor: onlyGovernance'));

            case 2:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this);
    });
    it('setVotingPeriod is protected', function _callee34() {
      return regeneratorRuntime.async(function _callee34$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.mock.setVotingPeriod('32'), 'Governor: onlyGovernance'));

            case 2:
            case "end":
              return _context35.stop();
          }
        }
      }, null, this);
    });
    it('setProposalThreshold is protected', function _callee35() {
      return regeneratorRuntime.async(function _callee35$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.mock.setProposalThreshold('1000000000000000000'), 'Governor: onlyGovernance'));

            case 2:
            case "end":
              return _context36.stop();
          }
        }
      }, null, this);
    });
    it('can setVotingDelay through governance', function _callee36() {
      return regeneratorRuntime.async(function _callee36$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              this.helper.setProposal([{
                target: this.mock.address,
                data: this.mock.contract.methods.setVotingDelay('0').encodeABI()
              }], '<proposal description>');
              _context37.next = 3;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 3:
              _context37.next = 5;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 5:
              _context37.next = 7;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 7:
              _context37.next = 9;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 9:
              _context37.t0 = expectEvent;
              _context37.next = 12;
              return regeneratorRuntime.awrap(this.helper.execute());

            case 12:
              _context37.t1 = _context37.sent;
              _context37.t2 = {
                oldVotingDelay: '4',
                newVotingDelay: '0'
              };
              (0, _context37.t0)(_context37.t1, 'VotingDelaySet', _context37.t2);
              _context37.t3 = expect;
              _context37.next = 18;
              return regeneratorRuntime.awrap(this.mock.votingDelay());

            case 18:
              _context37.t4 = _context37.sent;
              (0, _context37.t3)(_context37.t4).to.be.bignumber.equal('0');

            case 20:
            case "end":
              return _context37.stop();
          }
        }
      }, null, this);
    });
    it('can setVotingPeriod through governance', function _callee37() {
      return regeneratorRuntime.async(function _callee37$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              this.helper.setProposal([{
                target: this.mock.address,
                data: this.mock.contract.methods.setVotingPeriod('32').encodeABI()
              }], '<proposal description>');
              _context38.next = 3;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 3:
              _context38.next = 5;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 5:
              _context38.next = 7;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 7:
              _context38.next = 9;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 9:
              _context38.t0 = expectEvent;
              _context38.next = 12;
              return regeneratorRuntime.awrap(this.helper.execute());

            case 12:
              _context38.t1 = _context38.sent;
              _context38.t2 = {
                oldVotingPeriod: '16',
                newVotingPeriod: '32'
              };
              (0, _context38.t0)(_context38.t1, 'VotingPeriodSet', _context38.t2);
              _context38.t3 = expect;
              _context38.next = 18;
              return regeneratorRuntime.awrap(this.mock.votingPeriod());

            case 18:
              _context38.t4 = _context38.sent;
              (0, _context38.t3)(_context38.t4).to.be.bignumber.equal('32');

            case 20:
            case "end":
              return _context38.stop();
          }
        }
      }, null, this);
    });
    it('cannot setVotingPeriod to 0 through governance', function _callee38() {
      return regeneratorRuntime.async(function _callee38$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              this.helper.setProposal([{
                target: this.mock.address,
                data: this.mock.contract.methods.setVotingPeriod('0').encodeABI()
              }], '<proposal description>');
              _context39.next = 3;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 3:
              _context39.next = 5;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 5:
              _context39.next = 7;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 7:
              _context39.next = 9;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 9:
              _context39.next = 11;
              return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'GovernorSettings: voting period too low'));

            case 11:
            case "end":
              return _context39.stop();
          }
        }
      }, null, this);
    });
    it('can setProposalThreshold to 0 through governance', function _callee39() {
      return regeneratorRuntime.async(function _callee39$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              this.helper.setProposal([{
                target: this.mock.address,
                data: this.mock.contract.methods.setProposalThreshold('1000000000000000000').encodeABI()
              }], '<proposal description>');
              _context40.next = 3;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 3:
              _context40.next = 5;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 5:
              _context40.next = 7;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 7:
              _context40.next = 9;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 9:
              _context40.t0 = expectEvent;
              _context40.next = 12;
              return regeneratorRuntime.awrap(this.helper.execute());

            case 12:
              _context40.t1 = _context40.sent;
              _context40.t2 = {
                oldProposalThreshold: '0',
                newProposalThreshold: '1000000000000000000'
              };
              (0, _context40.t0)(_context40.t1, 'ProposalThresholdSet', _context40.t2);
              _context40.t3 = expect;
              _context40.next = 18;
              return regeneratorRuntime.awrap(this.mock.proposalThreshold());

            case 18:
              _context40.t4 = _context40.sent;
              (0, _context40.t3)(_context40.t4).to.be.bignumber.equal('1000000000000000000');

            case 20:
            case "end":
              return _context40.stop();
          }
        }
      }, null, this);
    });
  });
  describe('safe receive', function () {
    describe('ERC721', function () {
      var name = 'Non Fungible Token';
      var symbol = 'NFT';
      var tokenId = new BN(1);
      beforeEach(function _callee40() {
        return regeneratorRuntime.async(function _callee40$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return regeneratorRuntime.awrap(ERC721Mock["new"](name, symbol));

              case 2:
                this.token = _context41.sent;
                _context41.next = 5;
                return regeneratorRuntime.awrap(this.token.mint(owner, tokenId));

              case 5:
              case "end":
                return _context41.stop();
            }
          }
        }, null, this);
      });
      it('can receive an ERC721 safeTransfer', function _callee41() {
        return regeneratorRuntime.async(function _callee41$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                _context42.next = 2;
                return regeneratorRuntime.awrap(this.token.safeTransferFrom(owner, this.mock.address, tokenId, {
                  from: owner
                }));

              case 2:
              case "end":
                return _context42.stop();
            }
          }
        }, null, this);
      });
    });
    describe('ERC1155', function () {
      var uri = 'https://token-cdn-domain/{id}.json';
      var tokenIds = {
        1: new BN(1000),
        2: new BN(2000),
        3: new BN(3000)
      };
      beforeEach(function _callee42() {
        return regeneratorRuntime.async(function _callee42$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                _context43.next = 2;
                return regeneratorRuntime.awrap(ERC1155Mock["new"](uri));

              case 2:
                this.token = _context43.sent;
                _context43.next = 5;
                return regeneratorRuntime.awrap(this.token.mintBatch(owner, Object.keys(tokenIds), Object.values(tokenIds), '0x'));

              case 5:
              case "end":
                return _context43.stop();
            }
          }
        }, null, this);
      });
      it('can receive ERC1155 safeTransfer', function _callee43() {
        var _this$token;

        return regeneratorRuntime.async(function _callee43$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                _context44.next = 2;
                return regeneratorRuntime.awrap((_this$token = this.token).safeTransferFrom.apply(_this$token, [owner, this.mock.address].concat(_toConsumableArray(Object.entries(tokenIds)[0]), [// id + amount
                '0x', {
                  from: owner
                }])));

              case 2:
              case "end":
                return _context44.stop();
            }
          }
        }, null, this);
      });
      it('can receive ERC1155 safeBatchTransfer', function _callee44() {
        return regeneratorRuntime.async(function _callee44$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                _context45.next = 2;
                return regeneratorRuntime.awrap(this.token.safeBatchTransferFrom(owner, this.mock.address, Object.keys(tokenIds), Object.values(tokenIds), '0x', {
                  from: owner
                }));

              case 2:
              case "end":
                return _context45.stop();
            }
          }
        }, null, this);
      });
    });
  });
});