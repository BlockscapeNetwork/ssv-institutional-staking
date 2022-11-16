"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable */
var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert,
    time = _require.time;

var _require2 = require('chai'),
    expect = _require2.expect;

var MAX_UINT256 = constants.MAX_UINT256,
    ZERO_ADDRESS = constants.ZERO_ADDRESS,
    ZERO_BYTES32 = constants.ZERO_BYTES32;

var _require3 = require('ethereumjs-util'),
    fromRpcSig = _require3.fromRpcSig;

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

var ERC20VotesMock = artifacts.require('ERC20VotesMock');

var _require4 = require('../../../helpers/txpool'),
    batchInBlock = _require4.batchInBlock;

var _require5 = require('../../../helpers/eip712'),
    EIP712Domain = _require5.EIP712Domain,
    domainSeparator = _require5.domainSeparator;

var Delegation = [{
  name: 'delegatee',
  type: 'address'
}, {
  name: 'nonce',
  type: 'uint256'
}, {
  name: 'expiry',
  type: 'uint256'
}];
contract('ERC20Votes', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      holder = _accounts[0],
      recipient = _accounts[1],
      holderDelegatee = _accounts[2],
      recipientDelegatee = _accounts[3],
      other1 = _accounts[4],
      other2 = _accounts[5];

  var name = 'My Token';
  var symbol = 'MTKN';
  var version = '1';
  var supply = new BN('10000000000000000000000000');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20VotesMock["new"](name, symbol));

          case 2:
            this.token = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(this.token.getChainId());

          case 5:
            this.chainId = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('initial nonce is 0', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.token.nonces(holder));

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
  it('domain separator', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t1 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.token.DOMAIN_SEPARATOR());

          case 3:
            _context3.t2 = _context3.sent;
            _context3.t0 = (0, _context3.t1)(_context3.t2).to;
            _context3.next = 7;
            return regeneratorRuntime.awrap(domainSeparator(name, version, this.chainId, this.token.address));

          case 7:
            _context3.t3 = _context3.sent;

            _context3.t0.equal.call(_context3.t0, _context3.t3);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('minting restriction', function _callee4() {
    var amount;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            amount = new BN('2').pow(new BN('224'));
            _context4.next = 3;
            return regeneratorRuntime.awrap(expectRevert(this.token.mint(holder, amount), 'ERC20Votes: total supply risks overflowing votes'));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('recent checkpoints', function _callee5() {
    var i, block;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(this.token.delegate(holder, {
              from: holder
            }));

          case 2:
            i = 0;

          case 3:
            if (!(i < 6)) {
              _context5.next = 9;
              break;
            }

            _context5.next = 6;
            return regeneratorRuntime.awrap(this.token.mint(holder, 1));

          case 6:
            i++;
            _context5.next = 3;
            break;

          case 9:
            _context5.next = 11;
            return regeneratorRuntime.awrap(web3.eth.getBlockNumber());

          case 11:
            block = _context5.sent;
            _context5.t0 = expect;
            _context5.next = 15;
            return regeneratorRuntime.awrap(this.token.numCheckpoints(holder));

          case 15:
            _context5.t1 = _context5.sent;
            (0, _context5.t0)(_context5.t1).to.be.bignumber.equal('6');
            _context5.t2 = expect;
            _context5.next = 20;
            return regeneratorRuntime.awrap(this.token.getPastVotes(holder, block - 1));

          case 20:
            _context5.t3 = _context5.sent;
            (0, _context5.t2)(_context5.t3).to.be.bignumber.equal('5');
            _context5.t4 = expect;
            _context5.next = 25;
            return regeneratorRuntime.awrap(this.token.getPastVotes(holder, block - 6));

          case 25:
            _context5.t5 = _context5.sent;
            (0, _context5.t4)(_context5.t5).to.be.bignumber.equal('0');

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  describe('set delegation', function () {
    describe('call', function () {
      it('delegation with balance', function _callee6() {
        var _ref, receipt;

        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(holder, supply));

              case 2:
                _context6.t0 = expect;
                _context6.next = 5;
                return regeneratorRuntime.awrap(this.token.delegates(holder));

              case 5:
                _context6.t1 = _context6.sent;
                _context6.t2 = ZERO_ADDRESS;
                (0, _context6.t0)(_context6.t1).to.be.equal(_context6.t2);
                _context6.next = 10;
                return regeneratorRuntime.awrap(this.token.delegate(holder, {
                  from: holder
                }));

              case 10:
                _ref = _context6.sent;
                receipt = _ref.receipt;
                expectEvent(receipt, 'DelegateChanged', {
                  delegator: holder,
                  fromDelegate: ZERO_ADDRESS,
                  toDelegate: holder
                });
                expectEvent(receipt, 'DelegateVotesChanged', {
                  delegate: holder,
                  previousBalance: '0',
                  newBalance: supply
                });
                _context6.t3 = expect;
                _context6.next = 17;
                return regeneratorRuntime.awrap(this.token.delegates(holder));

              case 17:
                _context6.t4 = _context6.sent;
                _context6.t5 = holder;
                (0, _context6.t3)(_context6.t4).to.be.equal(_context6.t5);
                _context6.t6 = expect;
                _context6.next = 23;
                return regeneratorRuntime.awrap(this.token.getVotes(holder));

              case 23:
                _context6.t7 = _context6.sent;
                _context6.t8 = supply;
                (0, _context6.t6)(_context6.t7).to.be.bignumber.equal(_context6.t8);
                _context6.t9 = expect;
                _context6.next = 29;
                return regeneratorRuntime.awrap(this.token.getPastVotes(holder, receipt.blockNumber - 1));

              case 29:
                _context6.t10 = _context6.sent;
                (0, _context6.t9)(_context6.t10).to.be.bignumber.equal('0');
                _context6.next = 33;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 33:
                _context6.t11 = expect;
                _context6.next = 36;
                return regeneratorRuntime.awrap(this.token.getPastVotes(holder, receipt.blockNumber));

              case 36:
                _context6.t12 = _context6.sent;
                _context6.t13 = supply;
                (0, _context6.t11)(_context6.t12).to.be.bignumber.equal(_context6.t13);

              case 39:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('delegation without balance', function _callee7() {
        var _ref2, receipt;

        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = expect;
                _context7.next = 3;
                return regeneratorRuntime.awrap(this.token.delegates(holder));

              case 3:
                _context7.t1 = _context7.sent;
                _context7.t2 = ZERO_ADDRESS;
                (0, _context7.t0)(_context7.t1).to.be.equal(_context7.t2);
                _context7.next = 8;
                return regeneratorRuntime.awrap(this.token.delegate(holder, {
                  from: holder
                }));

              case 8:
                _ref2 = _context7.sent;
                receipt = _ref2.receipt;
                expectEvent(receipt, 'DelegateChanged', {
                  delegator: holder,
                  fromDelegate: ZERO_ADDRESS,
                  toDelegate: holder
                });
                expectEvent.notEmitted(receipt, 'DelegateVotesChanged');
                _context7.t3 = expect;
                _context7.next = 15;
                return regeneratorRuntime.awrap(this.token.delegates(holder));

              case 15:
                _context7.t4 = _context7.sent;
                _context7.t5 = holder;
                (0, _context7.t3)(_context7.t4).to.be.equal(_context7.t5);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
    });
    describe('with signature', function () {
      var delegator = Wallet.generate();
      var delegatorAddress = web3.utils.toChecksumAddress(delegator.getAddressString());
      var nonce = 0;

      var buildData = function buildData(chainId, verifyingContract, message) {
        return {
          data: {
            primaryType: 'Delegation',
            types: {
              EIP712Domain: EIP712Domain,
              Delegation: Delegation
            },
            domain: {
              name: name,
              version: version,
              chainId: chainId,
              verifyingContract: verifyingContract
            },
            message: message
          }
        };
      };

      beforeEach(function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(delegatorAddress, supply));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('accept signed delegation', function _callee9() {
        var _fromRpcSig, v, r, s, _ref3, receipt;

        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _fromRpcSig = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.token.address, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig.v, r = _fromRpcSig.r, s = _fromRpcSig.s;
                _context9.t0 = expect;
                _context9.next = 4;
                return regeneratorRuntime.awrap(this.token.delegates(delegatorAddress));

              case 4:
                _context9.t1 = _context9.sent;
                _context9.t2 = ZERO_ADDRESS;
                (0, _context9.t0)(_context9.t1).to.be.equal(_context9.t2);
                _context9.next = 9;
                return regeneratorRuntime.awrap(this.token.delegateBySig(delegatorAddress, nonce, MAX_UINT256, v, r, s));

              case 9:
                _ref3 = _context9.sent;
                receipt = _ref3.receipt;
                expectEvent(receipt, 'DelegateChanged', {
                  delegator: delegatorAddress,
                  fromDelegate: ZERO_ADDRESS,
                  toDelegate: delegatorAddress
                });
                expectEvent(receipt, 'DelegateVotesChanged', {
                  delegate: delegatorAddress,
                  previousBalance: '0',
                  newBalance: supply
                });
                _context9.t3 = expect;
                _context9.next = 16;
                return regeneratorRuntime.awrap(this.token.delegates(delegatorAddress));

              case 16:
                _context9.t4 = _context9.sent;
                _context9.t5 = delegatorAddress;
                (0, _context9.t3)(_context9.t4).to.be.equal(_context9.t5);
                _context9.t6 = expect;
                _context9.next = 22;
                return regeneratorRuntime.awrap(this.token.getVotes(delegatorAddress));

              case 22:
                _context9.t7 = _context9.sent;
                _context9.t8 = supply;
                (0, _context9.t6)(_context9.t7).to.be.bignumber.equal(_context9.t8);
                _context9.t9 = expect;
                _context9.next = 28;
                return regeneratorRuntime.awrap(this.token.getPastVotes(delegatorAddress, receipt.blockNumber - 1));

              case 28:
                _context9.t10 = _context9.sent;
                (0, _context9.t9)(_context9.t10).to.be.bignumber.equal('0');
                _context9.next = 32;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 32:
                _context9.t11 = expect;
                _context9.next = 35;
                return regeneratorRuntime.awrap(this.token.getPastVotes(delegatorAddress, receipt.blockNumber));

              case 35:
                _context9.t12 = _context9.sent;
                _context9.t13 = supply;
                (0, _context9.t11)(_context9.t12).to.be.bignumber.equal(_context9.t13);

              case 38:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('rejects reused signature', function _callee10() {
        var _fromRpcSig2, v, r, s;

        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _fromRpcSig2 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.token.address, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig2.v, r = _fromRpcSig2.r, s = _fromRpcSig2.s;
                _context10.next = 3;
                return regeneratorRuntime.awrap(this.token.delegateBySig(delegatorAddress, nonce, MAX_UINT256, v, r, s));

              case 3:
                _context10.next = 5;
                return regeneratorRuntime.awrap(expectRevert(this.token.delegateBySig(delegatorAddress, nonce, MAX_UINT256, v, r, s), 'ERC20Votes: invalid nonce'));

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('rejects bad delegatee', function _callee11() {
        var _fromRpcSig3, v, r, s, receipt, _receipt$logs$find, args;

        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _fromRpcSig3 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.token.address, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig3.v, r = _fromRpcSig3.r, s = _fromRpcSig3.s;
                _context11.next = 3;
                return regeneratorRuntime.awrap(this.token.delegateBySig(holderDelegatee, nonce, MAX_UINT256, v, r, s));

              case 3:
                receipt = _context11.sent;
                _receipt$logs$find = receipt.logs.find(function (_ref4) {
                  var event = _ref4.event;
                  return event == 'DelegateChanged';
                }), args = _receipt$logs$find.args;
                expect(args.delegator).to.not.be.equal(delegatorAddress);
                expect(args.fromDelegate).to.be.equal(ZERO_ADDRESS);
                expect(args.toDelegate).to.be.equal(holderDelegatee);

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('rejects bad nonce', function _callee12() {
        var _fromRpcSig4, v, r, s;

        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _fromRpcSig4 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.token.address, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig4.v, r = _fromRpcSig4.r, s = _fromRpcSig4.s;
                _context12.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.token.delegateBySig(delegatorAddress, nonce + 1, MAX_UINT256, v, r, s), 'ERC20Votes: invalid nonce'));

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('rejects expired permit', function _callee13() {
        var expiry, _fromRpcSig5, v, r, s;

        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(time.latest());

              case 2:
                _context13.t0 = _context13.sent;
                _context13.t1 = time.duration.weeks(1);
                expiry = _context13.t0 - _context13.t1;
                _fromRpcSig5 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.token.address, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: expiry
                }))), v = _fromRpcSig5.v, r = _fromRpcSig5.r, s = _fromRpcSig5.s;
                _context13.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.token.delegateBySig(delegatorAddress, nonce, expiry, v, r, s), 'ERC20Votes: signature expired'));

              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('change delegation', function () {
    beforeEach(function _callee14() {
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(holder, supply));

            case 2:
              _context14.next = 4;
              return regeneratorRuntime.awrap(this.token.delegate(holder, {
                from: holder
              }));

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    it('call', function _callee15() {
      var _ref5, receipt;

      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.t0 = expect;
              _context15.next = 3;
              return regeneratorRuntime.awrap(this.token.delegates(holder));

            case 3:
              _context15.t1 = _context15.sent;
              _context15.t2 = holder;
              (0, _context15.t0)(_context15.t1).to.be.equal(_context15.t2);
              _context15.next = 8;
              return regeneratorRuntime.awrap(this.token.delegate(holderDelegatee, {
                from: holder
              }));

            case 8:
              _ref5 = _context15.sent;
              receipt = _ref5.receipt;
              expectEvent(receipt, 'DelegateChanged', {
                delegator: holder,
                fromDelegate: holder,
                toDelegate: holderDelegatee
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: holder,
                previousBalance: supply,
                newBalance: '0'
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: holderDelegatee,
                previousBalance: '0',
                newBalance: supply
              });
              _context15.t3 = expect;
              _context15.next = 16;
              return regeneratorRuntime.awrap(this.token.delegates(holder));

            case 16:
              _context15.t4 = _context15.sent;
              _context15.t5 = holderDelegatee;
              (0, _context15.t3)(_context15.t4).to.be.equal(_context15.t5);
              _context15.t6 = expect;
              _context15.next = 22;
              return regeneratorRuntime.awrap(this.token.getVotes(holder));

            case 22:
              _context15.t7 = _context15.sent;
              (0, _context15.t6)(_context15.t7).to.be.bignumber.equal('0');
              _context15.t8 = expect;
              _context15.next = 27;
              return regeneratorRuntime.awrap(this.token.getVotes(holderDelegatee));

            case 27:
              _context15.t9 = _context15.sent;
              _context15.t10 = supply;
              (0, _context15.t8)(_context15.t9).to.be.bignumber.equal(_context15.t10);
              _context15.t11 = expect;
              _context15.next = 33;
              return regeneratorRuntime.awrap(this.token.getPastVotes(holder, receipt.blockNumber - 1));

            case 33:
              _context15.t12 = _context15.sent;
              _context15.t13 = supply;
              (0, _context15.t11)(_context15.t12).to.be.bignumber.equal(_context15.t13);
              _context15.t14 = expect;
              _context15.next = 39;
              return regeneratorRuntime.awrap(this.token.getPastVotes(holderDelegatee, receipt.blockNumber - 1));

            case 39:
              _context15.t15 = _context15.sent;
              (0, _context15.t14)(_context15.t15).to.be.bignumber.equal('0');
              _context15.next = 43;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 43:
              _context15.t16 = expect;
              _context15.next = 46;
              return regeneratorRuntime.awrap(this.token.getPastVotes(holder, receipt.blockNumber));

            case 46:
              _context15.t17 = _context15.sent;
              (0, _context15.t16)(_context15.t17).to.be.bignumber.equal('0');
              _context15.t18 = expect;
              _context15.next = 51;
              return regeneratorRuntime.awrap(this.token.getPastVotes(holderDelegatee, receipt.blockNumber));

            case 51:
              _context15.t19 = _context15.sent;
              _context15.t20 = supply;
              (0, _context15.t18)(_context15.t19).to.be.bignumber.equal(_context15.t20);

            case 54:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
  });
  describe('transfers', function () {
    beforeEach(function _callee16() {
      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(holder, supply));

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
    it('no delegation', function _callee17() {
      var _ref6, receipt;

      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.token.transfer(recipient, 1, {
                from: holder
              }));

            case 2:
              _ref6 = _context17.sent;
              receipt = _ref6.receipt;
              expectEvent(receipt, 'Transfer', {
                from: holder,
                to: recipient,
                value: '1'
              });
              expectEvent.notEmitted(receipt, 'DelegateVotesChanged');
              this.holderVotes = '0';
              this.recipientVotes = '0';

            case 8:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('sender delegation', function _callee18() {
      var _ref7, receipt, _receipt$logs$find2, transferLogIndex;

      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.token.delegate(holder, {
                from: holder
              }));

            case 2:
              _context18.next = 4;
              return regeneratorRuntime.awrap(this.token.transfer(recipient, 1, {
                from: holder
              }));

            case 4:
              _ref7 = _context18.sent;
              receipt = _ref7.receipt;
              expectEvent(receipt, 'Transfer', {
                from: holder,
                to: recipient,
                value: '1'
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: holder,
                previousBalance: supply,
                newBalance: supply.subn(1)
              });
              _receipt$logs$find2 = receipt.logs.find(function (_ref8) {
                var event = _ref8.event;
                return event == 'Transfer';
              }), transferLogIndex = _receipt$logs$find2.logIndex;
              expect(receipt.logs.filter(function (_ref9) {
                var event = _ref9.event;
                return event == 'DelegateVotesChanged';
              }).every(function (_ref10) {
                var logIndex = _ref10.logIndex;
                return transferLogIndex < logIndex;
              })).to.be.equal(true);
              this.holderVotes = supply.subn(1);
              this.recipientVotes = '0';

            case 12:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
    it('receiver delegation', function _callee19() {
      var _ref11, receipt, _receipt$logs$find3, transferLogIndex;

      return regeneratorRuntime.async(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.token.delegate(recipient, {
                from: recipient
              }));

            case 2:
              _context19.next = 4;
              return regeneratorRuntime.awrap(this.token.transfer(recipient, 1, {
                from: holder
              }));

            case 4:
              _ref11 = _context19.sent;
              receipt = _ref11.receipt;
              expectEvent(receipt, 'Transfer', {
                from: holder,
                to: recipient,
                value: '1'
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: recipient,
                previousBalance: '0',
                newBalance: '1'
              });
              _receipt$logs$find3 = receipt.logs.find(function (_ref12) {
                var event = _ref12.event;
                return event == 'Transfer';
              }), transferLogIndex = _receipt$logs$find3.logIndex;
              expect(receipt.logs.filter(function (_ref13) {
                var event = _ref13.event;
                return event == 'DelegateVotesChanged';
              }).every(function (_ref14) {
                var logIndex = _ref14.logIndex;
                return transferLogIndex < logIndex;
              })).to.be.equal(true);
              this.holderVotes = '0';
              this.recipientVotes = '1';

            case 12:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
    it('full delegation', function _callee20() {
      var _ref15, receipt, _receipt$logs$find4, transferLogIndex;

      return regeneratorRuntime.async(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(this.token.delegate(holder, {
                from: holder
              }));

            case 2:
              _context20.next = 4;
              return regeneratorRuntime.awrap(this.token.delegate(recipient, {
                from: recipient
              }));

            case 4:
              _context20.next = 6;
              return regeneratorRuntime.awrap(this.token.transfer(recipient, 1, {
                from: holder
              }));

            case 6:
              _ref15 = _context20.sent;
              receipt = _ref15.receipt;
              expectEvent(receipt, 'Transfer', {
                from: holder,
                to: recipient,
                value: '1'
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: holder,
                previousBalance: supply,
                newBalance: supply.subn(1)
              });
              expectEvent(receipt, 'DelegateVotesChanged', {
                delegate: recipient,
                previousBalance: '0',
                newBalance: '1'
              });
              _receipt$logs$find4 = receipt.logs.find(function (_ref16) {
                var event = _ref16.event;
                return event == 'Transfer';
              }), transferLogIndex = _receipt$logs$find4.logIndex;
              expect(receipt.logs.filter(function (_ref17) {
                var event = _ref17.event;
                return event == 'DelegateVotesChanged';
              }).every(function (_ref18) {
                var logIndex = _ref18.logIndex;
                return transferLogIndex < logIndex;
              })).to.be.equal(true);
              this.holderVotes = supply.subn(1);
              this.recipientVotes = '1';

            case 15:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    });
    afterEach(function _callee21() {
      var blockNumber;
      return regeneratorRuntime.async(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.t0 = expect;
              _context21.next = 3;
              return regeneratorRuntime.awrap(this.token.getVotes(holder));

            case 3:
              _context21.t1 = _context21.sent;
              _context21.t2 = this.holderVotes;
              (0, _context21.t0)(_context21.t1).to.be.bignumber.equal(_context21.t2);
              _context21.t3 = expect;
              _context21.next = 9;
              return regeneratorRuntime.awrap(this.token.getVotes(recipient));

            case 9:
              _context21.t4 = _context21.sent;
              _context21.t5 = this.recipientVotes;
              (0, _context21.t3)(_context21.t4).to.be.bignumber.equal(_context21.t5);
              _context21.next = 14;
              return regeneratorRuntime.awrap(time.latestBlock());

            case 14:
              blockNumber = _context21.sent;
              _context21.next = 17;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 17:
              _context21.t6 = expect;
              _context21.next = 20;
              return regeneratorRuntime.awrap(this.token.getPastVotes(holder, blockNumber));

            case 20:
              _context21.t7 = _context21.sent;
              _context21.t8 = this.holderVotes;
              (0, _context21.t6)(_context21.t7).to.be.bignumber.equal(_context21.t8);
              _context21.t9 = expect;
              _context21.next = 26;
              return regeneratorRuntime.awrap(this.token.getPastVotes(recipient, blockNumber));

            case 26:
              _context21.t10 = _context21.sent;
              _context21.t11 = this.recipientVotes;
              (0, _context21.t9)(_context21.t10).to.be.bignumber.equal(_context21.t11);

            case 29:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    });
  }); // The following tests are a adaptation of https://github.com/compound-finance/compound-protocol/blob/master/tests/Governance/CompTest.js.

  describe('Compound test suite', function () {
    beforeEach(function _callee22() {
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(holder, supply));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
    describe('balanceOf', function () {
      it('grants to initial account', function _callee23() {
        return regeneratorRuntime.async(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.t0 = expect;
                _context23.next = 3;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 3:
                _context23.t1 = _context23.sent;
                (0, _context23.t0)(_context23.t1).to.be.bignumber.equal('10000000000000000000000000');

              case 5:
              case "end":
                return _context23.stop();
            }
          }
        }, null, this);
      });
    });
    describe('numCheckpoints', function () {
      it('returns the number of checkpoints for a delegate', function _callee24() {
        var t1, t2, t3, t4;
        return regeneratorRuntime.async(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return regeneratorRuntime.awrap(this.token.transfer(recipient, '100', {
                  from: holder
                }));

              case 2:
                _context24.t0 = expect;
                _context24.next = 5;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 5:
                _context24.t1 = _context24.sent;
                (0, _context24.t0)(_context24.t1).to.be.bignumber.equal('0');
                _context24.next = 9;
                return regeneratorRuntime.awrap(this.token.delegate(other1, {
                  from: recipient
                }));

              case 9:
                t1 = _context24.sent;
                _context24.t2 = expect;
                _context24.next = 13;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 13:
                _context24.t3 = _context24.sent;
                (0, _context24.t2)(_context24.t3).to.be.bignumber.equal('1');
                _context24.next = 17;
                return regeneratorRuntime.awrap(this.token.transfer(other2, 10, {
                  from: recipient
                }));

              case 17:
                t2 = _context24.sent;
                _context24.t4 = expect;
                _context24.next = 21;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 21:
                _context24.t5 = _context24.sent;
                (0, _context24.t4)(_context24.t5).to.be.bignumber.equal('2');
                _context24.next = 25;
                return regeneratorRuntime.awrap(this.token.transfer(other2, 10, {
                  from: recipient
                }));

              case 25:
                t3 = _context24.sent;
                _context24.t6 = expect;
                _context24.next = 29;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 29:
                _context24.t7 = _context24.sent;
                (0, _context24.t6)(_context24.t7).to.be.bignumber.equal('3');
                _context24.next = 33;
                return regeneratorRuntime.awrap(this.token.transfer(recipient, 20, {
                  from: holder
                }));

              case 33:
                t4 = _context24.sent;
                _context24.t8 = expect;
                _context24.next = 37;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 37:
                _context24.t9 = _context24.sent;
                (0, _context24.t8)(_context24.t9).to.be.bignumber.equal('4');
                _context24.t10 = expect;
                _context24.next = 42;
                return regeneratorRuntime.awrap(this.token.checkpoints(other1, 0));

              case 42:
                _context24.t11 = _context24.sent;
                _context24.t12 = [t1.receipt.blockNumber.toString(), '100'];
                (0, _context24.t10)(_context24.t11).to.be.deep.equal(_context24.t12);
                _context24.t13 = expect;
                _context24.next = 48;
                return regeneratorRuntime.awrap(this.token.checkpoints(other1, 1));

              case 48:
                _context24.t14 = _context24.sent;
                _context24.t15 = [t2.receipt.blockNumber.toString(), '90'];
                (0, _context24.t13)(_context24.t14).to.be.deep.equal(_context24.t15);
                _context24.t16 = expect;
                _context24.next = 54;
                return regeneratorRuntime.awrap(this.token.checkpoints(other1, 2));

              case 54:
                _context24.t17 = _context24.sent;
                _context24.t18 = [t3.receipt.blockNumber.toString(), '80'];
                (0, _context24.t16)(_context24.t17).to.be.deep.equal(_context24.t18);
                _context24.t19 = expect;
                _context24.next = 60;
                return regeneratorRuntime.awrap(this.token.checkpoints(other1, 3));

              case 60:
                _context24.t20 = _context24.sent;
                _context24.t21 = [t4.receipt.blockNumber.toString(), '100'];
                (0, _context24.t19)(_context24.t20).to.be.deep.equal(_context24.t21);
                _context24.next = 65;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 65:
                _context24.t22 = expect;
                _context24.next = 68;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber));

              case 68:
                _context24.t23 = _context24.sent;
                (0, _context24.t22)(_context24.t23).to.be.bignumber.equal('100');
                _context24.t24 = expect;
                _context24.next = 73;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t2.receipt.blockNumber));

              case 73:
                _context24.t25 = _context24.sent;
                (0, _context24.t24)(_context24.t25).to.be.bignumber.equal('90');
                _context24.t26 = expect;
                _context24.next = 78;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t3.receipt.blockNumber));

              case 78:
                _context24.t27 = _context24.sent;
                (0, _context24.t26)(_context24.t27).to.be.bignumber.equal('80');
                _context24.t28 = expect;
                _context24.next = 83;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t4.receipt.blockNumber));

              case 83:
                _context24.t29 = _context24.sent;
                (0, _context24.t28)(_context24.t29).to.be.bignumber.equal('100');

              case 85:
              case "end":
                return _context24.stop();
            }
          }
        }, null, this);
      });
      it('does not add more than one checkpoint in a block', function _callee25() {
        var _this = this;

        var _ref19, _ref20, t1, t2, t3, t4;

        return regeneratorRuntime.async(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return regeneratorRuntime.awrap(this.token.transfer(recipient, '100', {
                  from: holder
                }));

              case 2:
                _context25.t0 = expect;
                _context25.next = 5;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 5:
                _context25.t1 = _context25.sent;
                (0, _context25.t0)(_context25.t1).to.be.bignumber.equal('0');
                _context25.next = 9;
                return regeneratorRuntime.awrap(batchInBlock([function () {
                  return _this.token.delegate(other1, {
                    from: recipient,
                    gas: 100000
                  });
                }, function () {
                  return _this.token.transfer(other2, 10, {
                    from: recipient,
                    gas: 100000
                  });
                }, function () {
                  return _this.token.transfer(other2, 10, {
                    from: recipient,
                    gas: 100000
                  });
                }]));

              case 9:
                _ref19 = _context25.sent;
                _ref20 = _slicedToArray(_ref19, 3);
                t1 = _ref20[0];
                t2 = _ref20[1];
                t3 = _ref20[2];
                _context25.t2 = expect;
                _context25.next = 17;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 17:
                _context25.t3 = _context25.sent;
                (0, _context25.t2)(_context25.t3).to.be.bignumber.equal('1');
                _context25.t4 = expect;
                _context25.next = 22;
                return regeneratorRuntime.awrap(this.token.checkpoints(other1, 0));

              case 22:
                _context25.t5 = _context25.sent;
                _context25.t6 = [t1.receipt.blockNumber.toString(), '80'];
                (0, _context25.t4)(_context25.t5).to.be.deep.equal(_context25.t6);
                _context25.next = 27;
                return regeneratorRuntime.awrap(this.token.transfer(recipient, 20, {
                  from: holder
                }));

              case 27:
                t4 = _context25.sent;
                _context25.t7 = expect;
                _context25.next = 31;
                return regeneratorRuntime.awrap(this.token.numCheckpoints(other1));

              case 31:
                _context25.t8 = _context25.sent;
                (0, _context25.t7)(_context25.t8).to.be.bignumber.equal('2');
                _context25.t9 = expect;
                _context25.next = 36;
                return regeneratorRuntime.awrap(this.token.checkpoints(other1, 1));

              case 36:
                _context25.t10 = _context25.sent;
                _context25.t11 = [t4.receipt.blockNumber.toString(), '100'];
                (0, _context25.t9)(_context25.t10).to.be.deep.equal(_context25.t11);

              case 39:
              case "end":
                return _context25.stop();
            }
          }
        }, null, this);
      });
    });
    describe('getPastVotes', function () {
      it('reverts if block number >= current block', function _callee26() {
        return regeneratorRuntime.async(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.getPastVotes(other1, 5e10), 'ERC20Votes: block not yet mined'));

              case 2:
              case "end":
                return _context26.stop();
            }
          }
        }, null, this);
      });
      it('returns 0 if there are no checkpoints', function _callee27() {
        return regeneratorRuntime.async(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.t0 = expect;
                _context27.next = 3;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, 0));

              case 3:
                _context27.t1 = _context27.sent;
                (0, _context27.t0)(_context27.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context27.stop();
            }
          }
        }, null, this);
      });
      it('returns the latest block if >= last checkpoint block', function _callee28() {
        var t1;
        return regeneratorRuntime.async(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return regeneratorRuntime.awrap(this.token.delegate(other1, {
                  from: holder
                }));

              case 2:
                t1 = _context28.sent;
                _context28.next = 5;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 5:
                _context28.next = 7;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 7:
                _context28.t0 = expect;
                _context28.next = 10;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber));

              case 10:
                _context28.t1 = _context28.sent;
                (0, _context28.t0)(_context28.t1).to.be.bignumber.equal('10000000000000000000000000');
                _context28.t2 = expect;
                _context28.next = 15;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber + 1));

              case 15:
                _context28.t3 = _context28.sent;
                (0, _context28.t2)(_context28.t3).to.be.bignumber.equal('10000000000000000000000000');

              case 17:
              case "end":
                return _context28.stop();
            }
          }
        }, null, this);
      });
      it('returns zero if < first checkpoint block', function _callee29() {
        var t1;
        return regeneratorRuntime.async(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 2:
                _context29.next = 4;
                return regeneratorRuntime.awrap(this.token.delegate(other1, {
                  from: holder
                }));

              case 4:
                t1 = _context29.sent;
                _context29.next = 7;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 7:
                _context29.next = 9;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 9:
                _context29.t0 = expect;
                _context29.next = 12;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber - 1));

              case 12:
                _context29.t1 = _context29.sent;
                (0, _context29.t0)(_context29.t1).to.be.bignumber.equal('0');
                _context29.t2 = expect;
                _context29.next = 17;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber + 1));

              case 17:
                _context29.t3 = _context29.sent;
                (0, _context29.t2)(_context29.t3).to.be.bignumber.equal('10000000000000000000000000');

              case 19:
              case "end":
                return _context29.stop();
            }
          }
        }, null, this);
      });
      it('generally returns the voting balance at the appropriate checkpoint', function _callee30() {
        var t1, t2, t3, t4;
        return regeneratorRuntime.async(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return regeneratorRuntime.awrap(this.token.delegate(other1, {
                  from: holder
                }));

              case 2:
                t1 = _context30.sent;
                _context30.next = 5;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 5:
                _context30.next = 7;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 7:
                _context30.next = 9;
                return regeneratorRuntime.awrap(this.token.transfer(other2, 10, {
                  from: holder
                }));

              case 9:
                t2 = _context30.sent;
                _context30.next = 12;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 12:
                _context30.next = 14;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 14:
                _context30.next = 16;
                return regeneratorRuntime.awrap(this.token.transfer(other2, 10, {
                  from: holder
                }));

              case 16:
                t3 = _context30.sent;
                _context30.next = 19;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 19:
                _context30.next = 21;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 21:
                _context30.next = 23;
                return regeneratorRuntime.awrap(this.token.transfer(holder, 20, {
                  from: other2
                }));

              case 23:
                t4 = _context30.sent;
                _context30.next = 26;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 26:
                _context30.next = 28;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 28:
                _context30.t0 = expect;
                _context30.next = 31;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber - 1));

              case 31:
                _context30.t1 = _context30.sent;
                (0, _context30.t0)(_context30.t1).to.be.bignumber.equal('0');
                _context30.t2 = expect;
                _context30.next = 36;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber));

              case 36:
                _context30.t3 = _context30.sent;
                (0, _context30.t2)(_context30.t3).to.be.bignumber.equal('10000000000000000000000000');
                _context30.t4 = expect;
                _context30.next = 41;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t1.receipt.blockNumber + 1));

              case 41:
                _context30.t5 = _context30.sent;
                (0, _context30.t4)(_context30.t5).to.be.bignumber.equal('10000000000000000000000000');
                _context30.t6 = expect;
                _context30.next = 46;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t2.receipt.blockNumber));

              case 46:
                _context30.t7 = _context30.sent;
                (0, _context30.t6)(_context30.t7).to.be.bignumber.equal('9999999999999999999999990');
                _context30.t8 = expect;
                _context30.next = 51;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t2.receipt.blockNumber + 1));

              case 51:
                _context30.t9 = _context30.sent;
                (0, _context30.t8)(_context30.t9).to.be.bignumber.equal('9999999999999999999999990');
                _context30.t10 = expect;
                _context30.next = 56;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t3.receipt.blockNumber));

              case 56:
                _context30.t11 = _context30.sent;
                (0, _context30.t10)(_context30.t11).to.be.bignumber.equal('9999999999999999999999980');
                _context30.t12 = expect;
                _context30.next = 61;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t3.receipt.blockNumber + 1));

              case 61:
                _context30.t13 = _context30.sent;
                (0, _context30.t12)(_context30.t13).to.be.bignumber.equal('9999999999999999999999980');
                _context30.t14 = expect;
                _context30.next = 66;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t4.receipt.blockNumber));

              case 66:
                _context30.t15 = _context30.sent;
                (0, _context30.t14)(_context30.t15).to.be.bignumber.equal('10000000000000000000000000');
                _context30.t16 = expect;
                _context30.next = 71;
                return regeneratorRuntime.awrap(this.token.getPastVotes(other1, t4.receipt.blockNumber + 1));

              case 71:
                _context30.t17 = _context30.sent;
                (0, _context30.t16)(_context30.t17).to.be.bignumber.equal('10000000000000000000000000');

              case 73:
              case "end":
                return _context30.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('getPastTotalSupply', function () {
    beforeEach(function _callee31() {
      return regeneratorRuntime.async(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return regeneratorRuntime.awrap(this.token.delegate(holder, {
                from: holder
              }));

            case 2:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    });
    it('reverts if block number >= current block', function _callee32() {
      return regeneratorRuntime.async(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.getPastTotalSupply(5e10), 'ERC20Votes: block not yet mined'));

            case 2:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    });
    it('returns 0 if there are no checkpoints', function _callee33() {
      return regeneratorRuntime.async(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.t0 = expect;
              _context33.next = 3;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(0));

            case 3:
              _context33.t1 = _context33.sent;
              (0, _context33.t0)(_context33.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context33.stop();
          }
        }
      }, null, this);
    });
    it('returns the latest block if >= last checkpoint block', function _callee34() {
      return regeneratorRuntime.async(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(holder, supply));

            case 2:
              t1 = _context34.sent;
              _context34.next = 5;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 5:
              _context34.next = 7;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 7:
              _context34.t0 = expect;
              _context34.next = 10;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t1.receipt.blockNumber));

            case 10:
              _context34.t1 = _context34.sent;
              _context34.t2 = supply;
              (0, _context34.t0)(_context34.t1).to.be.bignumber.equal(_context34.t2);
              _context34.t3 = expect;
              _context34.next = 16;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t1.receipt.blockNumber + 1));

            case 16:
              _context34.t4 = _context34.sent;
              _context34.t5 = supply;
              (0, _context34.t3)(_context34.t4).to.be.bignumber.equal(_context34.t5);

            case 19:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this);
    });
    it('returns zero if < first checkpoint block', function _callee35() {
      var t1;
      return regeneratorRuntime.async(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.next = 2;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 2:
              _context35.next = 4;
              return regeneratorRuntime.awrap(this.token.mint(holder, supply));

            case 4:
              t1 = _context35.sent;
              _context35.next = 7;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 7:
              _context35.next = 9;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 9:
              _context35.t0 = expect;
              _context35.next = 12;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t1.receipt.blockNumber - 1));

            case 12:
              _context35.t1 = _context35.sent;
              (0, _context35.t0)(_context35.t1).to.be.bignumber.equal('0');
              _context35.t2 = expect;
              _context35.next = 17;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t1.receipt.blockNumber + 1));

            case 17:
              _context35.t3 = _context35.sent;
              (0, _context35.t2)(_context35.t3).to.be.bignumber.equal('10000000000000000000000000');

            case 19:
            case "end":
              return _context35.stop();
          }
        }
      }, null, this);
    });
    it('generally returns the voting balance at the appropriate checkpoint', function _callee36() {
      var t1, t2, t3, t4;
      return regeneratorRuntime.async(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(holder, supply));

            case 2:
              t1 = _context36.sent;
              _context36.next = 5;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 5:
              _context36.next = 7;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 7:
              _context36.next = 9;
              return regeneratorRuntime.awrap(this.token.burn(holder, 10));

            case 9:
              t2 = _context36.sent;
              _context36.next = 12;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 12:
              _context36.next = 14;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 14:
              _context36.next = 16;
              return regeneratorRuntime.awrap(this.token.burn(holder, 10));

            case 16:
              t3 = _context36.sent;
              _context36.next = 19;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 19:
              _context36.next = 21;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 21:
              _context36.next = 23;
              return regeneratorRuntime.awrap(this.token.mint(holder, 20));

            case 23:
              t4 = _context36.sent;
              _context36.next = 26;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 26:
              _context36.next = 28;
              return regeneratorRuntime.awrap(time.advanceBlock());

            case 28:
              _context36.t0 = expect;
              _context36.next = 31;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t1.receipt.blockNumber - 1));

            case 31:
              _context36.t1 = _context36.sent;
              (0, _context36.t0)(_context36.t1).to.be.bignumber.equal('0');
              _context36.t2 = expect;
              _context36.next = 36;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t1.receipt.blockNumber));

            case 36:
              _context36.t3 = _context36.sent;
              (0, _context36.t2)(_context36.t3).to.be.bignumber.equal('10000000000000000000000000');
              _context36.t4 = expect;
              _context36.next = 41;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t1.receipt.blockNumber + 1));

            case 41:
              _context36.t5 = _context36.sent;
              (0, _context36.t4)(_context36.t5).to.be.bignumber.equal('10000000000000000000000000');
              _context36.t6 = expect;
              _context36.next = 46;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t2.receipt.blockNumber));

            case 46:
              _context36.t7 = _context36.sent;
              (0, _context36.t6)(_context36.t7).to.be.bignumber.equal('9999999999999999999999990');
              _context36.t8 = expect;
              _context36.next = 51;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t2.receipt.blockNumber + 1));

            case 51:
              _context36.t9 = _context36.sent;
              (0, _context36.t8)(_context36.t9).to.be.bignumber.equal('9999999999999999999999990');
              _context36.t10 = expect;
              _context36.next = 56;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t3.receipt.blockNumber));

            case 56:
              _context36.t11 = _context36.sent;
              (0, _context36.t10)(_context36.t11).to.be.bignumber.equal('9999999999999999999999980');
              _context36.t12 = expect;
              _context36.next = 61;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t3.receipt.blockNumber + 1));

            case 61:
              _context36.t13 = _context36.sent;
              (0, _context36.t12)(_context36.t13).to.be.bignumber.equal('9999999999999999999999980');
              _context36.t14 = expect;
              _context36.next = 66;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t4.receipt.blockNumber));

            case 66:
              _context36.t15 = _context36.sent;
              (0, _context36.t14)(_context36.t15).to.be.bignumber.equal('10000000000000000000000000');
              _context36.t16 = expect;
              _context36.next = 71;
              return regeneratorRuntime.awrap(this.token.getPastTotalSupply(t4.receipt.blockNumber + 1));

            case 71:
              _context36.t17 = _context36.sent;
              (0, _context36.t16)(_context36.t17).to.be.bignumber.equal('10000000000000000000000000');

            case 73:
            case "end":
              return _context36.stop();
          }
        }
      }, null, this);
    });
  });
});