"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var RLP = require('rlp');

var Enums = require('../../helpers/enums');

var _require3 = require('../../helpers/governance'),
    GovernorHelper = _require3.GovernorHelper;

var _require4 = require('../../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require4.shouldSupportInterfaces;

var Token = artifacts.require('ERC20VotesMock');

var Timelock = artifacts.require('CompTimelock');

var Governor = artifacts.require('GovernorTimelockCompoundMock');

var CallReceiver = artifacts.require('CallReceiverMock');

function makeContractAddress(creator, nonce) {
  return web3.utils.toChecksumAddress(web3.utils.sha3(RLP.encode([creator, nonce])).slice(12).substring(14));
}

contract('GovernorTimelockCompound', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      owner = _accounts[0],
      voter1 = _accounts[1],
      voter2 = _accounts[2],
      voter3 = _accounts[3],
      voter4 = _accounts[4],
      other = _accounts[5];

  var name = 'OZ-Governor'; // const version = '1';

  var tokenName = 'MockToken';
  var tokenSymbol = 'MTKN';
  var tokenSupply = web3.utils.toWei('100');
  var votingDelay = new BN(4);
  var votingPeriod = new BN(16);
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
            return regeneratorRuntime.awrap(Governor["new"](name, this.token.address, votingDelay, votingPeriod, this.timelock.address, 0));

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
              to: voter1,
              value: web3.utils.toWei('10')
            }, {
              from: owner
            }));

          case 28:
            _context.next = 30;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter2,
              value: web3.utils.toWei('7')
            }, {
              from: owner
            }));

          case 30:
            _context.next = 32;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter3,
              value: web3.utils.toWei('5')
            }, {
              from: owner
            }));

          case 32:
            _context.next = 34;
            return regeneratorRuntime.awrap(this.helper.delegate({
              token: this.token,
              to: voter4,
              value: web3.utils.toWei('2')
            }, {
              from: owner
            }));

          case 34:
            // default proposal
            this.proposal = this.helper.setProposal([{
              target: this.receiver.address,
              value: value,
              data: this.receiver.contract.methods.mockFunction().encodeABI()
            }], '<proposal description>');

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldSupportInterfaces(['ERC165', 'Governor', 'GovernorWithParams', 'GovernorTimelock']);
  it('doesn\'t accept ether transfers', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(expectRevert.unspecified(web3.eth.sendTransaction({
              from: owner,
              to: this.mock.address,
              value: 1
            })));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('post deployment check', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.mock.name());

          case 3:
            _context3.t1 = _context3.sent;
            _context3.t2 = name;
            (0, _context3.t0)(_context3.t1).to.be.equal(_context3.t2);
            _context3.t3 = expect;
            _context3.next = 9;
            return regeneratorRuntime.awrap(this.mock.token());

          case 9:
            _context3.t4 = _context3.sent;
            _context3.t5 = this.token.address;
            (0, _context3.t3)(_context3.t4).to.be.equal(_context3.t5);
            _context3.t6 = expect;
            _context3.next = 15;
            return regeneratorRuntime.awrap(this.mock.votingDelay());

          case 15:
            _context3.t7 = _context3.sent;
            _context3.t8 = votingDelay;
            (0, _context3.t6)(_context3.t7).to.be.bignumber.equal(_context3.t8);
            _context3.t9 = expect;
            _context3.next = 21;
            return regeneratorRuntime.awrap(this.mock.votingPeriod());

          case 21:
            _context3.t10 = _context3.sent;
            _context3.t11 = votingPeriod;
            (0, _context3.t9)(_context3.t10).to.be.bignumber.equal(_context3.t11);
            _context3.t12 = expect;
            _context3.next = 27;
            return regeneratorRuntime.awrap(this.mock.quorum(0));

          case 27:
            _context3.t13 = _context3.sent;
            (0, _context3.t12)(_context3.t13).to.be.bignumber.equal('0');
            _context3.t14 = expect;
            _context3.next = 32;
            return regeneratorRuntime.awrap(this.mock.timelock());

          case 32:
            _context3.t15 = _context3.sent;
            _context3.t16 = this.timelock.address;
            (0, _context3.t14)(_context3.t15).to.be.equal(_context3.t16);
            _context3.t17 = expect;
            _context3.next = 38;
            return regeneratorRuntime.awrap(this.timelock.admin());

          case 38:
            _context3.t18 = _context3.sent;
            _context3.t19 = this.mock.address;
            (0, _context3.t17)(_context3.t18).to.be.equal(_context3.t19);

          case 41:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('nominal', function _callee4() {
    var txQueue, eta, txExecute;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(this.helper.propose());

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
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.For
            }, {
              from: voter2
            }));

          case 8:
            _context4.next = 10;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Against
            }, {
              from: voter3
            }));

          case 10:
            _context4.next = 12;
            return regeneratorRuntime.awrap(this.helper.vote({
              support: Enums.VoteType.Abstain
            }, {
              from: voter4
            }));

          case 12:
            _context4.next = 14;
            return regeneratorRuntime.awrap(this.helper.waitForDeadline());

          case 14:
            _context4.next = 16;
            return regeneratorRuntime.awrap(this.helper.queue());

          case 16:
            txQueue = _context4.sent;
            _context4.next = 19;
            return regeneratorRuntime.awrap(this.mock.proposalEta(this.proposal.id));

          case 19:
            eta = _context4.sent;
            _context4.next = 22;
            return regeneratorRuntime.awrap(this.helper.waitForEta());

          case 22:
            _context4.next = 24;
            return regeneratorRuntime.awrap(this.helper.execute());

          case 24:
            txExecute = _context4.sent;
            expectEvent(txQueue, 'ProposalQueued', {
              proposalId: this.proposal.id
            });
            _context4.next = 28;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txQueue.tx, this.timelock, 'QueueTransaction', {
              eta: eta
            }));

          case 28:
            expectEvent(txExecute, 'ProposalExecuted', {
              proposalId: this.proposal.id
            });
            _context4.next = 31;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.timelock, 'ExecuteTransaction', {
              eta: eta
            }));

          case 31:
            _context4.next = 33;
            return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.receiver, 'MockFunctionCalled'));

          case 33:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  describe('should revert', function () {
    describe('on queue', function () {
      it('if already queued', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context5.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context5.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context5.next = 8;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 8:
                _context5.next = 10;
                return regeneratorRuntime.awrap(this.helper.queue());

              case 10:
                _context5.next = 12;
                return regeneratorRuntime.awrap(expectRevert(this.helper.queue(), 'Governor: proposal not successful'));

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('if proposal contains duplicate calls', function _callee6() {
        var action;
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                action = {
                  target: this.token.address,
                  data: this.token.contract.methods.approve(this.receiver.address, constants.MAX_UINT256).encodeABI()
                };
                this.helper.setProposal([action, action], '<proposal description>');
                _context6.next = 4;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 4:
                _context6.next = 6;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 6:
                _context6.next = 8;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 8:
                _context6.next = 10;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 10:
                _context6.next = 12;
                return regeneratorRuntime.awrap(expectRevert(this.helper.queue(), 'GovernorTimelockCompound: identical proposal action already queued'));

              case 12:
                _context6.next = 14;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'GovernorTimelockCompound: proposal not yet queued'));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    describe('on execute', function () {
      it('if not queued', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context7.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context7.next = 8;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline(+1));

              case 8:
                _context7.t0 = expect;
                _context7.next = 11;
                return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

              case 11:
                _context7.t1 = _context7.sent;
                _context7.t2 = Enums.ProposalState.Succeeded;
                (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);
                _context7.next = 16;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'GovernorTimelockCompound: proposal not yet queued'));

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('if too early', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context8.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context8.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context8.next = 8;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 8:
                _context8.next = 10;
                return regeneratorRuntime.awrap(this.helper.queue());

              case 10:
                _context8.t0 = expect;
                _context8.next = 13;
                return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

              case 13:
                _context8.t1 = _context8.sent;
                _context8.t2 = Enums.ProposalState.Queued;
                (0, _context8.t0)(_context8.t1).to.be.bignumber.equal(_context8.t2);
                _context8.next = 18;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Timelock::executeTransaction: Transaction hasn\'t surpassed time lock'));

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('if too late', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 2:
                _context9.next = 4;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 4:
                _context9.next = 6;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context9.next = 8;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 8:
                _context9.next = 10;
                return regeneratorRuntime.awrap(this.helper.queue());

              case 10:
                _context9.next = 12;
                return regeneratorRuntime.awrap(this.helper.waitForEta(+30 * 86400));

              case 12:
                _context9.t0 = expect;
                _context9.next = 15;
                return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

              case 15:
                _context9.t1 = _context9.sent;
                _context9.t2 = Enums.ProposalState.Expired;
                (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);
                _context9.next = 20;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('if already executed', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
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
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 6:
                _context10.next = 8;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 8:
                _context10.next = 10;
                return regeneratorRuntime.awrap(this.helper.queue());

              case 10:
                _context10.next = 12;
                return regeneratorRuntime.awrap(this.helper.waitForEta());

              case 12:
                _context10.next = 14;
                return regeneratorRuntime.awrap(this.helper.execute());

              case 14:
                _context10.next = 16;
                return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('cancel', function () {
    it('cancel before queue prevents scheduling', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context11) {
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
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 8:
              _context11.t0 = expectEvent;
              _context11.next = 11;
              return regeneratorRuntime.awrap(this.helper.cancel());

            case 11:
              _context11.t1 = _context11.sent;
              _context11.t2 = {
                proposalId: this.proposal.id
              };
              (0, _context11.t0)(_context11.t1, 'ProposalCanceled', _context11.t2);
              _context11.t3 = expect;
              _context11.next = 17;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 17:
              _context11.t4 = _context11.sent;
              _context11.t5 = Enums.ProposalState.Canceled;
              (0, _context11.t3)(_context11.t4).to.be.bignumber.equal(_context11.t5);
              _context11.next = 22;
              return regeneratorRuntime.awrap(expectRevert(this.helper.queue(), 'Governor: proposal not successful'));

            case 22:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    it('cancel after queue prevents executing', function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 2:
              _context12.next = 4;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 4:
              _context12.next = 6;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 6:
              _context12.next = 8;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 8:
              _context12.next = 10;
              return regeneratorRuntime.awrap(this.helper.queue());

            case 10:
              _context12.t0 = expectEvent;
              _context12.next = 13;
              return regeneratorRuntime.awrap(this.helper.cancel());

            case 13:
              _context12.t1 = _context12.sent;
              _context12.t2 = {
                proposalId: this.proposal.id
              };
              (0, _context12.t0)(_context12.t1, 'ProposalCanceled', _context12.t2);
              _context12.t3 = expect;
              _context12.next = 19;
              return regeneratorRuntime.awrap(this.mock.state(this.proposal.id));

            case 19:
              _context12.t4 = _context12.sent;
              _context12.t5 = Enums.ProposalState.Canceled;
              (0, _context12.t3)(_context12.t4).to.be.bignumber.equal(_context12.t5);
              _context12.next = 24;
              return regeneratorRuntime.awrap(expectRevert(this.helper.execute(), 'Governor: proposal not successful'));

            case 24:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
  });
  describe('onlyGovernance', function () {
    describe('relay', function () {
      beforeEach(function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(this.mock.address, 1));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('is protected', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.mock.relay(this.token.address, 0, this.token.contract.methods.transfer(other, 1).encodeABI()), 'Governor: onlyGovernance'));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('can be executed through governance', function _callee15() {
        var txExecute;
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                this.helper.setProposal([{
                  target: this.mock.address,
                  data: this.mock.contract.methods.relay(this.token.address, 0, this.token.contract.methods.transfer(other, 1).encodeABI()).encodeABI()
                }], '<proposal description>');
                _context15.t0 = expect;
                _context15.next = 4;
                return regeneratorRuntime.awrap(this.token.balanceOf(this.mock.address));

              case 4:
                _context15.t1 = _context15.sent;
                (0, _context15.t0)(_context15.t1, 1);
                _context15.t2 = expect;
                _context15.next = 9;
                return regeneratorRuntime.awrap(this.token.balanceOf(other));

              case 9:
                _context15.t3 = _context15.sent;
                (0, _context15.t2)(_context15.t3, 0);
                _context15.next = 13;
                return regeneratorRuntime.awrap(this.helper.propose());

              case 13:
                _context15.next = 15;
                return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

              case 15:
                _context15.next = 17;
                return regeneratorRuntime.awrap(this.helper.vote({
                  support: Enums.VoteType.For
                }, {
                  from: voter1
                }));

              case 17:
                _context15.next = 19;
                return regeneratorRuntime.awrap(this.helper.waitForDeadline());

              case 19:
                _context15.next = 21;
                return regeneratorRuntime.awrap(this.helper.queue());

              case 21:
                _context15.next = 23;
                return regeneratorRuntime.awrap(this.helper.waitForEta());

              case 23:
                _context15.next = 25;
                return regeneratorRuntime.awrap(this.helper.execute());

              case 25:
                txExecute = _context15.sent;
                _context15.t4 = expect;
                _context15.next = 29;
                return regeneratorRuntime.awrap(this.token.balanceOf(this.mock.address));

              case 29:
                _context15.t5 = _context15.sent;
                (0, _context15.t4)(_context15.t5, 0);
                _context15.t6 = expect;
                _context15.next = 34;
                return regeneratorRuntime.awrap(this.token.balanceOf(other));

              case 34:
                _context15.t7 = _context15.sent;
                (0, _context15.t6)(_context15.t7, 1);
                expectEvent.inTransaction(txExecute.tx, this.token, 'Transfer', {
                  from: this.mock.address,
                  to: other,
                  value: '1'
                });

              case 37:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
    });
    describe('updateTimelock', function () {
      beforeEach(function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(Timelock["new"](this.mock.address, 7 * 86400));

              case 2:
                this.newTimelock = _context16.sent;

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      it('is protected', function _callee17() {
        return regeneratorRuntime.async(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.mock.updateTimelock(this.newTimelock.address), 'Governor: onlyGovernance'));

              case 2:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });
      it('can be executed through governance to', function _callee18() {
        var txExecute;
        return regeneratorRuntime.async(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                this.helper.setProposal([{
                  target: this.timelock.address,
                  data: this.timelock.contract.methods.setPendingAdmin(owner).encodeABI()
                }, {
                  target: this.mock.address,
                  data: this.mock.contract.methods.updateTimelock(this.newTimelock.address).encodeABI()
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
                return regeneratorRuntime.awrap(this.helper.queue());

              case 11:
                _context18.next = 13;
                return regeneratorRuntime.awrap(this.helper.waitForEta());

              case 13:
                _context18.next = 15;
                return regeneratorRuntime.awrap(this.helper.execute());

              case 15:
                txExecute = _context18.sent;
                expectEvent(txExecute, 'TimelockChange', {
                  oldTimelock: this.timelock.address,
                  newTimelock: this.newTimelock.address
                });
                _context18.t0 = expect;
                _context18.next = 20;
                return regeneratorRuntime.awrap(this.mock.timelock());

              case 20:
                _context18.t1 = _context18.sent;
                _context18.t2 = this.newTimelock.address;
                (0, _context18.t0)(_context18.t1).to.be.bignumber.equal(_context18.t2);

              case 23:
              case "end":
                return _context18.stop();
            }
          }
        }, null, this);
      });
    });
    it('can transfer timelock to new governor', function _callee19() {
      var newGovernor, txExecute;
      return regeneratorRuntime.async(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(Governor["new"](name, this.token.address, 8, 32, this.timelock.address, 0));

            case 2:
              newGovernor = _context19.sent;
              this.helper.setProposal([{
                target: this.timelock.address,
                data: this.timelock.contract.methods.setPendingAdmin(newGovernor.address).encodeABI()
              }], '<proposal description>');
              _context19.next = 6;
              return regeneratorRuntime.awrap(this.helper.propose());

            case 6:
              _context19.next = 8;
              return regeneratorRuntime.awrap(this.helper.waitForSnapshot());

            case 8:
              _context19.next = 10;
              return regeneratorRuntime.awrap(this.helper.vote({
                support: Enums.VoteType.For
              }, {
                from: voter1
              }));

            case 10:
              _context19.next = 12;
              return regeneratorRuntime.awrap(this.helper.waitForDeadline());

            case 12:
              _context19.next = 14;
              return regeneratorRuntime.awrap(this.helper.queue());

            case 14:
              _context19.next = 16;
              return regeneratorRuntime.awrap(this.helper.waitForEta());

            case 16:
              _context19.next = 18;
              return regeneratorRuntime.awrap(this.helper.execute());

            case 18:
              txExecute = _context19.sent;
              _context19.next = 21;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(txExecute.tx, this.timelock, 'NewPendingAdmin', {
                newPendingAdmin: newGovernor.address
              }));

            case 21:
              _context19.next = 23;
              return regeneratorRuntime.awrap(newGovernor.__acceptAdmin());

            case 23:
              _context19.t0 = expect;
              _context19.next = 26;
              return regeneratorRuntime.awrap(this.timelock.admin());

            case 26:
              _context19.t1 = _context19.sent;
              _context19.t2 = newGovernor.address;
              (0, _context19.t0)(_context19.t1).to.be.bignumber.equal(_context19.t2);

            case 29:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
  });
});