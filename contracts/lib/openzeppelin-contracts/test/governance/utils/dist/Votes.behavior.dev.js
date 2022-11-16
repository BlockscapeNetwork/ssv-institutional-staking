"use strict";

var _require = require('@openzeppelin/test-helpers'),
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert,
    time = _require.time;

var MAX_UINT256 = constants.MAX_UINT256,
    ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('ethereumjs-util'),
    fromRpcSig = _require2.fromRpcSig;

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

var _require3 = require('../../helpers/eip712'),
    EIP712Domain = _require3.EIP712Domain,
    domainSeparator = _require3.domainSeparator;

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
var version = '1';

function shouldBehaveLikeVotes() {
  describe('run votes workflow', function () {
    it('initial nonce is 0', function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = expect;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.votes.nonces(this.account1));

            case 3:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    it('domain separator', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t1 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.votes.DOMAIN_SEPARATOR());

            case 3:
              _context2.t2 = _context2.sent;
              _context2.t0 = (0, _context2.t1)(_context2.t2).to;
              _context2.next = 7;
              return regeneratorRuntime.awrap(domainSeparator(this.name, version, this.chainId, this.votes.address));

            case 7:
              _context2.t3 = _context2.sent;

              _context2.t0.equal.call(_context2.t0, _context2.t3);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    describe('delegation with signature', function () {
      var delegator = Wallet.generate();
      var delegatorAddress = web3.utils.toChecksumAddress(delegator.getAddressString());
      var nonce = 0;

      var buildData = function buildData(chainId, verifyingContract, name, message) {
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

      beforeEach(function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(this.votes.mint(delegatorAddress, this.NFT0));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('accept signed delegation', function _callee4() {
        var _fromRpcSig, v, r, s, _ref, receipt;

        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _fromRpcSig = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.votes.address, this.name, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig.v, r = _fromRpcSig.r, s = _fromRpcSig.s;
                _context4.t0 = expect;
                _context4.next = 4;
                return regeneratorRuntime.awrap(this.votes.delegates(delegatorAddress));

              case 4:
                _context4.t1 = _context4.sent;
                _context4.t2 = ZERO_ADDRESS;
                (0, _context4.t0)(_context4.t1).to.be.equal(_context4.t2);
                _context4.next = 9;
                return regeneratorRuntime.awrap(this.votes.delegateBySig(delegatorAddress, nonce, MAX_UINT256, v, r, s));

              case 9:
                _ref = _context4.sent;
                receipt = _ref.receipt;
                expectEvent(receipt, 'DelegateChanged', {
                  delegator: delegatorAddress,
                  fromDelegate: ZERO_ADDRESS,
                  toDelegate: delegatorAddress
                });
                expectEvent(receipt, 'DelegateVotesChanged', {
                  delegate: delegatorAddress,
                  previousBalance: '0',
                  newBalance: '1'
                });
                _context4.t3 = expect;
                _context4.next = 16;
                return regeneratorRuntime.awrap(this.votes.delegates(delegatorAddress));

              case 16:
                _context4.t4 = _context4.sent;
                _context4.t5 = delegatorAddress;
                (0, _context4.t3)(_context4.t4).to.be.equal(_context4.t5);
                _context4.t6 = expect;
                _context4.next = 22;
                return regeneratorRuntime.awrap(this.votes.getVotes(delegatorAddress));

              case 22:
                _context4.t7 = _context4.sent;
                (0, _context4.t6)(_context4.t7).to.be.bignumber.equal('1');
                _context4.t8 = expect;
                _context4.next = 27;
                return regeneratorRuntime.awrap(this.votes.getPastVotes(delegatorAddress, receipt.blockNumber - 1));

              case 27:
                _context4.t9 = _context4.sent;
                (0, _context4.t8)(_context4.t9).to.be.bignumber.equal('0');
                _context4.next = 31;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 31:
                _context4.t10 = expect;
                _context4.next = 34;
                return regeneratorRuntime.awrap(this.votes.getPastVotes(delegatorAddress, receipt.blockNumber));

              case 34:
                _context4.t11 = _context4.sent;
                (0, _context4.t10)(_context4.t11).to.be.bignumber.equal('1');

              case 36:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('rejects reused signature', function _callee5() {
        var _fromRpcSig2, v, r, s;

        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _fromRpcSig2 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.votes.address, this.name, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig2.v, r = _fromRpcSig2.r, s = _fromRpcSig2.s;
                _context5.next = 3;
                return regeneratorRuntime.awrap(this.votes.delegateBySig(delegatorAddress, nonce, MAX_UINT256, v, r, s));

              case 3:
                _context5.next = 5;
                return regeneratorRuntime.awrap(expectRevert(this.votes.delegateBySig(delegatorAddress, nonce, MAX_UINT256, v, r, s), 'Votes: invalid nonce'));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('rejects bad delegatee', function _callee6() {
        var _fromRpcSig3, v, r, s, receipt, _receipt$logs$find, args;

        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _fromRpcSig3 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.votes.address, this.name, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig3.v, r = _fromRpcSig3.r, s = _fromRpcSig3.s;
                _context6.next = 3;
                return regeneratorRuntime.awrap(this.votes.delegateBySig(this.account1Delegatee, nonce, MAX_UINT256, v, r, s));

              case 3:
                receipt = _context6.sent;
                _receipt$logs$find = receipt.logs.find(function (_ref2) {
                  var event = _ref2.event;
                  return event === 'DelegateChanged';
                }), args = _receipt$logs$find.args;
                expect(args.delegator).to.not.be.equal(delegatorAddress);
                expect(args.fromDelegate).to.be.equal(ZERO_ADDRESS);
                expect(args.toDelegate).to.be.equal(this.account1Delegatee);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('rejects bad nonce', function _callee7() {
        var _fromRpcSig4, v, r, s;

        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _fromRpcSig4 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.votes.address, this.name, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: MAX_UINT256
                }))), v = _fromRpcSig4.v, r = _fromRpcSig4.r, s = _fromRpcSig4.s;
                _context7.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.votes.delegateBySig(delegatorAddress, nonce + 1, MAX_UINT256, v, r, s), 'Votes: invalid nonce'));

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('rejects expired permit', function _callee8() {
        var expiry, _fromRpcSig5, v, r, s;

        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(time.latest());

              case 2:
                _context8.t0 = _context8.sent;
                _context8.t1 = time.duration.weeks(1);
                expiry = _context8.t0 - _context8.t1;
                _fromRpcSig5 = fromRpcSig(ethSigUtil.signTypedMessage(delegator.getPrivateKey(), buildData(this.chainId, this.votes.address, this.name, {
                  delegatee: delegatorAddress,
                  nonce: nonce,
                  expiry: expiry
                }))), v = _fromRpcSig5.v, r = _fromRpcSig5.r, s = _fromRpcSig5.s;
                _context8.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.votes.delegateBySig(delegatorAddress, nonce, expiry, v, r, s), 'Votes: signature expired'));

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
    describe('set delegation', function () {
      describe('call', function () {
        it('delegation with tokens', function _callee9() {
          var _ref3, receipt;

          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT0));

                case 2:
                  _context9.t0 = expect;
                  _context9.next = 5;
                  return regeneratorRuntime.awrap(this.votes.delegates(this.account1));

                case 5:
                  _context9.t1 = _context9.sent;
                  _context9.t2 = ZERO_ADDRESS;
                  (0, _context9.t0)(_context9.t1).to.be.equal(_context9.t2);
                  _context9.next = 10;
                  return regeneratorRuntime.awrap(this.votes.delegate(this.account1, {
                    from: this.account1
                  }));

                case 10:
                  _ref3 = _context9.sent;
                  receipt = _ref3.receipt;
                  expectEvent(receipt, 'DelegateChanged', {
                    delegator: this.account1,
                    fromDelegate: ZERO_ADDRESS,
                    toDelegate: this.account1
                  });
                  expectEvent(receipt, 'DelegateVotesChanged', {
                    delegate: this.account1,
                    previousBalance: '0',
                    newBalance: '1'
                  });
                  _context9.t3 = expect;
                  _context9.next = 17;
                  return regeneratorRuntime.awrap(this.votes.delegates(this.account1));

                case 17:
                  _context9.t4 = _context9.sent;
                  _context9.t5 = this.account1;
                  (0, _context9.t3)(_context9.t4).to.be.equal(_context9.t5);
                  _context9.t6 = expect;
                  _context9.next = 23;
                  return regeneratorRuntime.awrap(this.votes.getVotes(this.account1));

                case 23:
                  _context9.t7 = _context9.sent;
                  (0, _context9.t6)(_context9.t7).to.be.bignumber.equal('1');
                  _context9.t8 = expect;
                  _context9.next = 28;
                  return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account1, receipt.blockNumber - 1));

                case 28:
                  _context9.t9 = _context9.sent;
                  (0, _context9.t8)(_context9.t9).to.be.bignumber.equal('0');
                  _context9.next = 32;
                  return regeneratorRuntime.awrap(time.advanceBlock());

                case 32:
                  _context9.t10 = expect;
                  _context9.next = 35;
                  return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account1, receipt.blockNumber));

                case 35:
                  _context9.t11 = _context9.sent;
                  (0, _context9.t10)(_context9.t11).to.be.bignumber.equal('1');

                case 37:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
        it('delegation without tokens', function _callee10() {
          var _ref4, receipt;

          return regeneratorRuntime.async(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.t0 = expect;
                  _context10.next = 3;
                  return regeneratorRuntime.awrap(this.votes.delegates(this.account1));

                case 3:
                  _context10.t1 = _context10.sent;
                  _context10.t2 = ZERO_ADDRESS;
                  (0, _context10.t0)(_context10.t1).to.be.equal(_context10.t2);
                  _context10.next = 8;
                  return regeneratorRuntime.awrap(this.votes.delegate(this.account1, {
                    from: this.account1
                  }));

                case 8:
                  _ref4 = _context10.sent;
                  receipt = _ref4.receipt;
                  expectEvent(receipt, 'DelegateChanged', {
                    delegator: this.account1,
                    fromDelegate: ZERO_ADDRESS,
                    toDelegate: this.account1
                  });
                  expectEvent.notEmitted(receipt, 'DelegateVotesChanged');
                  _context10.t3 = expect;
                  _context10.next = 15;
                  return regeneratorRuntime.awrap(this.votes.delegates(this.account1));

                case 15:
                  _context10.t4 = _context10.sent;
                  _context10.t5 = this.account1;
                  (0, _context10.t3)(_context10.t4).to.be.equal(_context10.t5);

                case 18:
                case "end":
                  return _context10.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('change delegation', function () {
      beforeEach(function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT0));

              case 2:
                _context11.next = 4;
                return regeneratorRuntime.awrap(this.votes.delegate(this.account1, {
                  from: this.account1
                }));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('call', function _callee12() {
        var _ref5, receipt, prevBlock;

        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.t0 = expect;
                _context12.next = 3;
                return regeneratorRuntime.awrap(this.votes.delegates(this.account1));

              case 3:
                _context12.t1 = _context12.sent;
                _context12.t2 = this.account1;
                (0, _context12.t0)(_context12.t1).to.be.equal(_context12.t2);
                _context12.next = 8;
                return regeneratorRuntime.awrap(this.votes.delegate(this.account1Delegatee, {
                  from: this.account1
                }));

              case 8:
                _ref5 = _context12.sent;
                receipt = _ref5.receipt;
                expectEvent(receipt, 'DelegateChanged', {
                  delegator: this.account1,
                  fromDelegate: this.account1,
                  toDelegate: this.account1Delegatee
                });
                expectEvent(receipt, 'DelegateVotesChanged', {
                  delegate: this.account1,
                  previousBalance: '1',
                  newBalance: '0'
                });
                expectEvent(receipt, 'DelegateVotesChanged', {
                  delegate: this.account1Delegatee,
                  previousBalance: '0',
                  newBalance: '1'
                });
                prevBlock = receipt.blockNumber - 1;
                _context12.t3 = expect;
                _context12.next = 17;
                return regeneratorRuntime.awrap(this.votes.delegates(this.account1));

              case 17:
                _context12.t4 = _context12.sent;
                _context12.t5 = this.account1Delegatee;
                (0, _context12.t3)(_context12.t4).to.be.equal(_context12.t5);
                _context12.t6 = expect;
                _context12.next = 23;
                return regeneratorRuntime.awrap(this.votes.getVotes(this.account1));

              case 23:
                _context12.t7 = _context12.sent;
                (0, _context12.t6)(_context12.t7).to.be.bignumber.equal('0');
                _context12.t8 = expect;
                _context12.next = 28;
                return regeneratorRuntime.awrap(this.votes.getVotes(this.account1Delegatee));

              case 28:
                _context12.t9 = _context12.sent;
                (0, _context12.t8)(_context12.t9).to.be.bignumber.equal('1');
                _context12.t10 = expect;
                _context12.next = 33;
                return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account1, receipt.blockNumber - 1));

              case 33:
                _context12.t11 = _context12.sent;
                (0, _context12.t10)(_context12.t11).to.be.bignumber.equal('1');
                _context12.t12 = expect;
                _context12.next = 38;
                return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account1Delegatee, prevBlock));

              case 38:
                _context12.t13 = _context12.sent;
                (0, _context12.t12)(_context12.t13).to.be.bignumber.equal('0');
                _context12.next = 42;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 42:
                _context12.t14 = expect;
                _context12.next = 45;
                return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account1, receipt.blockNumber));

              case 45:
                _context12.t15 = _context12.sent;
                (0, _context12.t14)(_context12.t15).to.be.bignumber.equal('0');
                _context12.t16 = expect;
                _context12.next = 50;
                return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account1Delegatee, receipt.blockNumber));

              case 50:
                _context12.t17 = _context12.sent;
                (0, _context12.t16)(_context12.t17).to.be.bignumber.equal('1');

              case 52:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
    describe('getPastTotalSupply', function () {
      beforeEach(function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(this.votes.delegate(this.account1, {
                  from: this.account1
                }));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('reverts if block number >= current block', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.votes.getPastTotalSupply(5e10), 'block not yet mined'));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('returns 0 if there are no checkpoints', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.t0 = expect;
                _context15.next = 3;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(0));

              case 3:
                _context15.t1 = _context15.sent;
                (0, _context15.t0)(_context15.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('returns the latest block if >= last checkpoint block', function _callee16() {
        var t1;
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT0));

              case 2:
                t1 = _context16.sent;
                _context16.next = 5;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 5:
                _context16.next = 7;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 7:
                _context16.t0 = expect;
                _context16.next = 10;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t1.receipt.blockNumber - 1));

              case 10:
                _context16.t1 = _context16.sent;
                (0, _context16.t0)(_context16.t1).to.be.bignumber.equal('0');
                _context16.t2 = expect;
                _context16.next = 15;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t1.receipt.blockNumber + 1));

              case 15:
                _context16.t3 = _context16.sent;
                (0, _context16.t2)(_context16.t3).to.be.bignumber.equal('1');

              case 17:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      it('returns zero if < first checkpoint block', function _callee17() {
        var t2;
        return regeneratorRuntime.async(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 2:
                _context17.next = 4;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT1));

              case 4:
                t2 = _context17.sent;
                _context17.next = 7;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 7:
                _context17.next = 9;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 9:
                _context17.t0 = expect;
                _context17.next = 12;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t2.receipt.blockNumber - 1));

              case 12:
                _context17.t1 = _context17.sent;
                (0, _context17.t0)(_context17.t1).to.be.bignumber.equal('0');
                _context17.t2 = expect;
                _context17.next = 17;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t2.receipt.blockNumber + 1));

              case 17:
                _context17.t3 = _context17.sent;
                (0, _context17.t2)(_context17.t3).to.be.bignumber.equal('1');

              case 19:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });
      it('generally returns the voting balance at the appropriate checkpoint', function _callee18() {
        var t1, t2, t3, t4, t5;
        return regeneratorRuntime.async(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT1));

              case 2:
                t1 = _context18.sent;
                _context18.next = 5;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 5:
                _context18.next = 7;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 7:
                _context18.next = 9;
                return regeneratorRuntime.awrap(this.votes.burn(this.NFT1));

              case 9:
                t2 = _context18.sent;
                _context18.next = 12;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 12:
                _context18.next = 14;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 14:
                _context18.next = 16;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT2));

              case 16:
                t3 = _context18.sent;
                _context18.next = 19;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 19:
                _context18.next = 21;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 21:
                _context18.next = 23;
                return regeneratorRuntime.awrap(this.votes.burn(this.NFT2));

              case 23:
                t4 = _context18.sent;
                _context18.next = 26;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 26:
                _context18.next = 28;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 28:
                _context18.next = 30;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT3));

              case 30:
                t5 = _context18.sent;
                _context18.next = 33;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 33:
                _context18.next = 35;
                return regeneratorRuntime.awrap(time.advanceBlock());

              case 35:
                _context18.t0 = expect;
                _context18.next = 38;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t1.receipt.blockNumber - 1));

              case 38:
                _context18.t1 = _context18.sent;
                (0, _context18.t0)(_context18.t1).to.be.bignumber.equal('0');
                _context18.t2 = expect;
                _context18.next = 43;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t1.receipt.blockNumber));

              case 43:
                _context18.t3 = _context18.sent;
                (0, _context18.t2)(_context18.t3).to.be.bignumber.equal('1');
                _context18.t4 = expect;
                _context18.next = 48;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t1.receipt.blockNumber + 1));

              case 48:
                _context18.t5 = _context18.sent;
                (0, _context18.t4)(_context18.t5).to.be.bignumber.equal('1');
                _context18.t6 = expect;
                _context18.next = 53;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t2.receipt.blockNumber));

              case 53:
                _context18.t7 = _context18.sent;
                (0, _context18.t6)(_context18.t7).to.be.bignumber.equal('0');
                _context18.t8 = expect;
                _context18.next = 58;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t2.receipt.blockNumber + 1));

              case 58:
                _context18.t9 = _context18.sent;
                (0, _context18.t8)(_context18.t9).to.be.bignumber.equal('0');
                _context18.t10 = expect;
                _context18.next = 63;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t3.receipt.blockNumber));

              case 63:
                _context18.t11 = _context18.sent;
                (0, _context18.t10)(_context18.t11).to.be.bignumber.equal('1');
                _context18.t12 = expect;
                _context18.next = 68;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t3.receipt.blockNumber + 1));

              case 68:
                _context18.t13 = _context18.sent;
                (0, _context18.t12)(_context18.t13).to.be.bignumber.equal('1');
                _context18.t14 = expect;
                _context18.next = 73;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t4.receipt.blockNumber));

              case 73:
                _context18.t15 = _context18.sent;
                (0, _context18.t14)(_context18.t15).to.be.bignumber.equal('0');
                _context18.t16 = expect;
                _context18.next = 78;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t4.receipt.blockNumber + 1));

              case 78:
                _context18.t17 = _context18.sent;
                (0, _context18.t16)(_context18.t17).to.be.bignumber.equal('0');
                _context18.t18 = expect;
                _context18.next = 83;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t5.receipt.blockNumber));

              case 83:
                _context18.t19 = _context18.sent;
                (0, _context18.t18)(_context18.t19).to.be.bignumber.equal('1');
                _context18.t20 = expect;
                _context18.next = 88;
                return regeneratorRuntime.awrap(this.votes.getPastTotalSupply(t5.receipt.blockNumber + 1));

              case 88:
                _context18.t21 = _context18.sent;
                (0, _context18.t20)(_context18.t21).to.be.bignumber.equal('1');

              case 90:
              case "end":
                return _context18.stop();
            }
          }
        }, null, this);
      });
    }); // The following tests are a adaptation of
    // https://github.com/compound-finance/compound-protocol/blob/master/tests/Governance/CompTest.js.

    describe('Compound test suite', function () {
      beforeEach(function _callee19() {
        return regeneratorRuntime.async(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT0));

              case 2:
                _context19.next = 4;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT1));

              case 4:
                _context19.next = 6;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT2));

              case 6:
                _context19.next = 8;
                return regeneratorRuntime.awrap(this.votes.mint(this.account1, this.NFT3));

              case 8:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
      describe('getPastVotes', function () {
        it('reverts if block number >= current block', function _callee20() {
          return regeneratorRuntime.async(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  _context20.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.votes.getPastVotes(this.account2, 5e10), 'block not yet mined'));

                case 2:
                case "end":
                  return _context20.stop();
              }
            }
          }, null, this);
        });
        it('returns 0 if there are no checkpoints', function _callee21() {
          return regeneratorRuntime.async(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  _context21.t0 = expect;
                  _context21.next = 3;
                  return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account2, 0));

                case 3:
                  _context21.t1 = _context21.sent;
                  (0, _context21.t0)(_context21.t1).to.be.bignumber.equal('0');

                case 5:
                case "end":
                  return _context21.stop();
              }
            }
          }, null, this);
        });
        it('returns the latest block if >= last checkpoint block', function _callee22() {
          var t1, latest, nextBlock;
          return regeneratorRuntime.async(function _callee22$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  _context22.next = 2;
                  return regeneratorRuntime.awrap(this.votes.delegate(this.account2, {
                    from: this.account1
                  }));

                case 2:
                  t1 = _context22.sent;
                  _context22.next = 5;
                  return regeneratorRuntime.awrap(time.advanceBlock());

                case 5:
                  _context22.next = 7;
                  return regeneratorRuntime.awrap(time.advanceBlock());

                case 7:
                  _context22.next = 9;
                  return regeneratorRuntime.awrap(this.votes.getVotes(this.account2));

                case 9:
                  latest = _context22.sent;
                  nextBlock = t1.receipt.blockNumber + 1;
                  _context22.t0 = expect;
                  _context22.next = 14;
                  return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account2, t1.receipt.blockNumber));

                case 14:
                  _context22.t1 = _context22.sent;
                  _context22.t2 = latest;
                  (0, _context22.t0)(_context22.t1).to.be.bignumber.equal(_context22.t2);
                  _context22.t3 = expect;
                  _context22.next = 20;
                  return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account2, nextBlock));

                case 20:
                  _context22.t4 = _context22.sent;
                  _context22.t5 = latest;
                  (0, _context22.t3)(_context22.t4).to.be.bignumber.equal(_context22.t5);

                case 23:
                case "end":
                  return _context22.stop();
              }
            }
          }, null, this);
        });
        it('returns zero if < first checkpoint block', function _callee23() {
          var t1;
          return regeneratorRuntime.async(function _callee23$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  _context23.next = 2;
                  return regeneratorRuntime.awrap(time.advanceBlock());

                case 2:
                  _context23.next = 4;
                  return regeneratorRuntime.awrap(this.votes.delegate(this.account2, {
                    from: this.account1
                  }));

                case 4:
                  t1 = _context23.sent;
                  _context23.next = 7;
                  return regeneratorRuntime.awrap(time.advanceBlock());

                case 7:
                  _context23.next = 9;
                  return regeneratorRuntime.awrap(time.advanceBlock());

                case 9:
                  _context23.t0 = expect;
                  _context23.next = 12;
                  return regeneratorRuntime.awrap(this.votes.getPastVotes(this.account2, t1.receipt.blockNumber - 1));

                case 12:
                  _context23.t1 = _context23.sent;
                  (0, _context23.t0)(_context23.t1).to.be.bignumber.equal('0');

                case 14:
                case "end":
                  return _context23.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeVotes: shouldBehaveLikeVotes
};