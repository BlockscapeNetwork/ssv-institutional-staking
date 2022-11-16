"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    balance = _require.balance,
    ether = _require.ether,
    expectRevert = _require.expectRevert,
    send = _require.send,
    expectEvent = _require.expectEvent;

var _require2 = require('chai'),
    expect = _require2.expect;

var AddressImpl = artifacts.require('AddressImpl');

var EtherReceiver = artifacts.require('EtherReceiverMock');

var CallReceiverMock = artifacts.require('CallReceiverMock');

contract('Address', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      recipient = _accounts[0],
      other = _accounts[1];

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(AddressImpl["new"]());

          case 2:
            this.mock = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('isContract', function () {
    it('returns false for account address', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.mock.isContract(other));

            case 3:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.equal(false);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('returns true for contract address', function _callee3() {
      var contract;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(AddressImpl["new"]());

            case 2:
              contract = _context3.sent;
              _context3.t0 = expect;
              _context3.next = 6;
              return regeneratorRuntime.awrap(this.mock.isContract(contract.address));

            case 6:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.equal(true);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('sendValue', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(balance.tracker(recipient));

            case 2:
              this.recipientTracker = _context4.sent;

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    context('when sender contract has no funds', function () {
      it('sends 0 wei', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(this.mock.sendValue(other, 0));

              case 2:
                _context5.t0 = expect;
                _context5.next = 5;
                return regeneratorRuntime.awrap(this.recipientTracker.delta());

              case 5:
                _context5.t1 = _context5.sent;
                (0, _context5.t0)(_context5.t1).to.be.bignumber.equal('0');

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('reverts when sending non-zero amounts', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.mock.sendValue(other, 1), 'Address: insufficient balance'));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    context('when sender contract has funds', function () {
      var funds = ether('1');
      beforeEach(function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(send.ether(other, this.mock.address, funds));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('sends 0 wei', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.mock.sendValue(recipient, 0));

              case 2:
                _context8.t0 = expect;
                _context8.next = 5;
                return regeneratorRuntime.awrap(this.recipientTracker.delta());

              case 5:
                _context8.t1 = _context8.sent;
                (0, _context8.t0)(_context8.t1).to.be.bignumber.equal('0');

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('sends non-zero amounts', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.mock.sendValue(recipient, funds.subn(1)));

              case 2:
                _context9.t0 = expect;
                _context9.next = 5;
                return regeneratorRuntime.awrap(this.recipientTracker.delta());

              case 5:
                _context9.t1 = _context9.sent;
                _context9.t2 = funds.subn(1);
                (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('sends the whole balance', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.mock.sendValue(recipient, funds));

              case 2:
                _context10.t0 = expect;
                _context10.next = 5;
                return regeneratorRuntime.awrap(this.recipientTracker.delta());

              case 5:
                _context10.t1 = _context10.sent;
                _context10.t2 = funds;
                (0, _context10.t0)(_context10.t1).to.be.bignumber.equal(_context10.t2);
                _context10.t3 = expect;
                _context10.next = 11;
                return regeneratorRuntime.awrap(balance.current(this.mock.address));

              case 11:
                _context10.t4 = _context10.sent;
                (0, _context10.t3)(_context10.t4).to.be.bignumber.equal('0');

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('reverts when sending more than the balance', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.mock.sendValue(recipient, funds.addn(1)), 'Address: insufficient balance'));

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      context('with contract recipient', function () {
        beforeEach(function _callee12() {
          return regeneratorRuntime.async(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return regeneratorRuntime.awrap(EtherReceiver["new"]());

                case 2:
                  this.contractRecipient = _context12.sent;

                case 3:
                case "end":
                  return _context12.stop();
              }
            }
          }, null, this);
        });
        it('sends funds', function _callee13() {
          var tracker;
          return regeneratorRuntime.async(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return regeneratorRuntime.awrap(balance.tracker(this.contractRecipient.address));

                case 2:
                  tracker = _context13.sent;
                  _context13.next = 5;
                  return regeneratorRuntime.awrap(this.contractRecipient.setAcceptEther(true));

                case 5:
                  _context13.next = 7;
                  return regeneratorRuntime.awrap(this.mock.sendValue(this.contractRecipient.address, funds));

                case 7:
                  _context13.t0 = expect;
                  _context13.next = 10;
                  return regeneratorRuntime.awrap(tracker.delta());

                case 10:
                  _context13.t1 = _context13.sent;
                  _context13.t2 = funds;
                  (0, _context13.t0)(_context13.t1).to.be.bignumber.equal(_context13.t2);

                case 13:
                case "end":
                  return _context13.stop();
              }
            }
          }, null, this);
        });
        it('reverts on recipient revert', function _callee14() {
          return regeneratorRuntime.async(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.next = 2;
                  return regeneratorRuntime.awrap(this.contractRecipient.setAcceptEther(false));

                case 2:
                  _context14.next = 4;
                  return regeneratorRuntime.awrap(expectRevert(this.mock.sendValue(this.contractRecipient.address, funds), 'Address: unable to send value, recipient may have reverted'));

                case 4:
                case "end":
                  return _context14.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
  describe('functionCall', function () {
    beforeEach(function _callee15() {
      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(CallReceiverMock["new"]());

            case 2:
              this.contractRecipient = _context15.sent;

            case 3:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
    context('with valid contract receiver', function () {
      it('calls the requested function', function _callee16() {
        var abiEncodedCall, receipt;
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunction',
                  type: 'function',
                  inputs: []
                }, []);
                _context16.next = 3;
                return regeneratorRuntime.awrap(this.mock.functionCall(this.contractRecipient.address, abiEncodedCall));

              case 3:
                receipt = _context16.sent;
                expectEvent(receipt, 'CallReturnValue', {
                  data: '0x1234'
                });
                _context16.next = 7;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, CallReceiverMock, 'MockFunctionCalled'));

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      it('reverts when the called function reverts with no reason', function _callee17() {
        var abiEncodedCall;
        return regeneratorRuntime.async(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunctionRevertsNoReason',
                  type: 'function',
                  inputs: []
                }, []);
                _context17.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.mock.functionCall(this.contractRecipient.address, abiEncodedCall), 'Address: low-level call failed'));

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });
      it('reverts when the called function reverts, bubbling up the revert reason', function _callee18() {
        var abiEncodedCall;
        return regeneratorRuntime.async(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunctionRevertsReason',
                  type: 'function',
                  inputs: []
                }, []);
                _context18.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.mock.functionCall(this.contractRecipient.address, abiEncodedCall), 'CallReceiverMock: reverting'));

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, null, this);
      });
      it('reverts when the called function runs out of gas', function _callee19() {
        var abiEncodedCall;
        return regeneratorRuntime.async(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunctionOutOfGas',
                  type: 'function',
                  inputs: []
                }, []);
                _context19.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.mock.functionCall(this.contractRecipient.address, abiEncodedCall, {
                  gas: '120000'
                }), 'Address: low-level call failed'));

              case 3:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
      it('reverts when the called function throws', function _callee20() {
        var abiEncodedCall;
        return regeneratorRuntime.async(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunctionThrows',
                  type: 'function',
                  inputs: []
                }, []);
                _context20.next = 3;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.mock.functionCall(this.contractRecipient.address, abiEncodedCall)));

              case 3:
              case "end":
                return _context20.stop();
            }
          }
        }, null, this);
      });
      it('reverts when function does not exist', function _callee21() {
        var abiEncodedCall;
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunctionDoesNotExist',
                  type: 'function',
                  inputs: []
                }, []);
                _context21.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.mock.functionCall(this.contractRecipient.address, abiEncodedCall), 'Address: low-level call failed'));

              case 3:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
    });
    context('with non-contract receiver', function () {
      it('reverts when address is not a contract', function _callee22() {
        var _accounts2, recipient, abiEncodedCall;

        return regeneratorRuntime.async(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _accounts2 = _slicedToArray(accounts, 1), recipient = _accounts2[0];
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunction',
                  type: 'function',
                  inputs: []
                }, []);
                _context22.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.mock.functionCall(recipient, abiEncodedCall), 'Address: call to non-contract'));

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('functionCallWithValue', function () {
    beforeEach(function _callee23() {
      return regeneratorRuntime.async(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(CallReceiverMock["new"]());

            case 2:
              this.contractRecipient = _context23.sent;

            case 3:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    });
    context('with zero value', function () {
      it('calls the requested function', function _callee24() {
        var abiEncodedCall, receipt;
        return regeneratorRuntime.async(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunction',
                  type: 'function',
                  inputs: []
                }, []);
                _context24.next = 3;
                return regeneratorRuntime.awrap(this.mock.functionCallWithValue(this.contractRecipient.address, abiEncodedCall, 0));

              case 3:
                receipt = _context24.sent;
                expectEvent(receipt, 'CallReturnValue', {
                  data: '0x1234'
                });
                _context24.next = 7;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, CallReceiverMock, 'MockFunctionCalled'));

              case 7:
              case "end":
                return _context24.stop();
            }
          }
        }, null, this);
      });
    });
    context('with non-zero value', function () {
      var amount = ether('1.2');
      it('reverts if insufficient sender balance', function _callee25() {
        var abiEncodedCall;
        return regeneratorRuntime.async(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunction',
                  type: 'function',
                  inputs: []
                }, []);
                _context25.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.mock.functionCallWithValue(this.contractRecipient.address, abiEncodedCall, amount), 'Address: insufficient balance for call'));

              case 3:
              case "end":
                return _context25.stop();
            }
          }
        }, null, this);
      });
      it('calls the requested function with existing value', function _callee26() {
        var abiEncodedCall, tracker, receipt;
        return regeneratorRuntime.async(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunction',
                  type: 'function',
                  inputs: []
                }, []);
                _context26.next = 3;
                return regeneratorRuntime.awrap(balance.tracker(this.contractRecipient.address));

              case 3:
                tracker = _context26.sent;
                _context26.next = 6;
                return regeneratorRuntime.awrap(send.ether(other, this.mock.address, amount));

              case 6:
                _context26.next = 8;
                return regeneratorRuntime.awrap(this.mock.functionCallWithValue(this.contractRecipient.address, abiEncodedCall, amount));

              case 8:
                receipt = _context26.sent;
                _context26.t0 = expect;
                _context26.next = 12;
                return regeneratorRuntime.awrap(tracker.delta());

              case 12:
                _context26.t1 = _context26.sent;
                _context26.t2 = amount;
                (0, _context26.t0)(_context26.t1).to.be.bignumber.equal(_context26.t2);
                expectEvent(receipt, 'CallReturnValue', {
                  data: '0x1234'
                });
                _context26.next = 18;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, CallReceiverMock, 'MockFunctionCalled'));

              case 18:
              case "end":
                return _context26.stop();
            }
          }
        }, null, this);
      });
      it('calls the requested function with transaction funds', function _callee27() {
        var abiEncodedCall, tracker, receipt;
        return regeneratorRuntime.async(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunction',
                  type: 'function',
                  inputs: []
                }, []);
                _context27.next = 3;
                return regeneratorRuntime.awrap(balance.tracker(this.contractRecipient.address));

              case 3:
                tracker = _context27.sent;
                _context27.t0 = expect;
                _context27.next = 7;
                return regeneratorRuntime.awrap(balance.current(this.mock.address));

              case 7:
                _context27.t1 = _context27.sent;
                (0, _context27.t0)(_context27.t1).to.be.bignumber.equal('0');
                _context27.next = 11;
                return regeneratorRuntime.awrap(this.mock.functionCallWithValue(this.contractRecipient.address, abiEncodedCall, amount, {
                  from: other,
                  value: amount
                }));

              case 11:
                receipt = _context27.sent;
                _context27.t2 = expect;
                _context27.next = 15;
                return regeneratorRuntime.awrap(tracker.delta());

              case 15:
                _context27.t3 = _context27.sent;
                _context27.t4 = amount;
                (0, _context27.t2)(_context27.t3).to.be.bignumber.equal(_context27.t4);
                expectEvent(receipt, 'CallReturnValue', {
                  data: '0x1234'
                });
                _context27.next = 21;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, CallReceiverMock, 'MockFunctionCalled'));

              case 21:
              case "end":
                return _context27.stop();
            }
          }
        }, null, this);
      });
      it('reverts when calling non-payable functions', function _callee28() {
        var abiEncodedCall;
        return regeneratorRuntime.async(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                  name: 'mockFunctionNonPayable',
                  type: 'function',
                  inputs: []
                }, []);
                _context28.next = 3;
                return regeneratorRuntime.awrap(send.ether(other, this.mock.address, amount));

              case 3:
                _context28.next = 5;
                return regeneratorRuntime.awrap(expectRevert(this.mock.functionCallWithValue(this.contractRecipient.address, abiEncodedCall, amount), 'Address: low-level call with value failed'));

              case 5:
              case "end":
                return _context28.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('functionStaticCall', function () {
    beforeEach(function _callee29() {
      return regeneratorRuntime.async(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return regeneratorRuntime.awrap(CallReceiverMock["new"]());

            case 2:
              this.contractRecipient = _context29.sent;

            case 3:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this);
    });
    it('calls the requested function', function _callee30() {
      var abiEncodedCall, receipt;
      return regeneratorRuntime.async(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                name: 'mockStaticFunction',
                type: 'function',
                inputs: []
              }, []);
              _context30.next = 3;
              return regeneratorRuntime.awrap(this.mock.functionStaticCall(this.contractRecipient.address, abiEncodedCall));

            case 3:
              receipt = _context30.sent;
              expectEvent(receipt, 'CallReturnValue', {
                data: '0x1234'
              });

            case 5:
            case "end":
              return _context30.stop();
          }
        }
      }, null, this);
    });
    it('reverts on a non-static function', function _callee31() {
      var abiEncodedCall;
      return regeneratorRuntime.async(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                name: 'mockFunction',
                type: 'function',
                inputs: []
              }, []);
              _context31.next = 3;
              return regeneratorRuntime.awrap(expectRevert(this.mock.functionStaticCall(this.contractRecipient.address, abiEncodedCall), 'Address: low-level static call failed'));

            case 3:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    });
    it('bubbles up revert reason', function _callee32() {
      var abiEncodedCall;
      return regeneratorRuntime.async(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                name: 'mockFunctionRevertsReason',
                type: 'function',
                inputs: []
              }, []);
              _context32.next = 3;
              return regeneratorRuntime.awrap(expectRevert(this.mock.functionStaticCall(this.contractRecipient.address, abiEncodedCall), 'CallReceiverMock: reverting'));

            case 3:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    });
    it('reverts when address is not a contract', function _callee33() {
      var _accounts3, recipient, abiEncodedCall;

      return regeneratorRuntime.async(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _accounts3 = _slicedToArray(accounts, 1), recipient = _accounts3[0];
              abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                name: 'mockFunction',
                type: 'function',
                inputs: []
              }, []);
              _context33.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.mock.functionStaticCall(recipient, abiEncodedCall), 'Address: call to non-contract'));

            case 4:
            case "end":
              return _context33.stop();
          }
        }
      }, null, this);
    });
  });
  describe('functionDelegateCall', function () {
    beforeEach(function _callee34() {
      return regeneratorRuntime.async(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(CallReceiverMock["new"]());

            case 2:
              this.contractRecipient = _context34.sent;

            case 3:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this);
    });
    it('delegate calls the requested function', function _callee35() {
      var abiEncodedCall, receipt;
      return regeneratorRuntime.async(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                name: 'mockFunctionWritesStorage',
                type: 'function',
                inputs: []
              }, []);
              _context35.next = 3;
              return regeneratorRuntime.awrap(this.mock.functionDelegateCall(this.contractRecipient.address, abiEncodedCall));

            case 3:
              receipt = _context35.sent;
              expectEvent(receipt, 'CallReturnValue', {
                data: '0x1234'
              });
              _context35.t0 = expect;
              _context35.next = 8;
              return regeneratorRuntime.awrap(this.mock.sharedAnswer());

            case 8:
              _context35.t1 = _context35.sent;
              (0, _context35.t0)(_context35.t1).to.equal('42');

            case 10:
            case "end":
              return _context35.stop();
          }
        }
      }, null, this);
    });
    it('bubbles up revert reason', function _callee36() {
      var abiEncodedCall;
      return regeneratorRuntime.async(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                name: 'mockFunctionRevertsReason',
                type: 'function',
                inputs: []
              }, []);
              _context36.next = 3;
              return regeneratorRuntime.awrap(expectRevert(this.mock.functionDelegateCall(this.contractRecipient.address, abiEncodedCall), 'CallReceiverMock: reverting'));

            case 3:
            case "end":
              return _context36.stop();
          }
        }
      }, null, this);
    });
    it('reverts when address is not a contract', function _callee37() {
      var _accounts4, recipient, abiEncodedCall;

      return regeneratorRuntime.async(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              _accounts4 = _slicedToArray(accounts, 1), recipient = _accounts4[0];
              abiEncodedCall = web3.eth.abi.encodeFunctionCall({
                name: 'mockFunction',
                type: 'function',
                inputs: []
              }, []);
              _context37.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.mock.functionDelegateCall(recipient, abiEncodedCall), 'Address: call to non-contract'));

            case 4:
            case "end":
              return _context37.stop();
          }
        }
      }, null, this);
    });
  });
});