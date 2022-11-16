"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

var _require = require('../helpers/eip712'),
    EIP712Domain = _require.EIP712Domain;

var _require2 = require('@openzeppelin/test-helpers'),
    expectRevert = _require2.expectRevert,
    constants = _require2.constants;

var _require3 = require('chai'),
    expect = _require3.expect;

var MinimalForwarder = artifacts.require('MinimalForwarder');

var CallReceiverMock = artifacts.require('CallReceiverMock');

var name = 'MinimalForwarder';
var version = '0.0.1';
contract('MinimalForwarder', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(MinimalForwarder["new"]());

          case 2:
            this.forwarder = _context.sent;
            _context.t0 = name;
            _context.t1 = version;
            _context.next = 7;
            return regeneratorRuntime.awrap(web3.eth.getChainId());

          case 7:
            _context.t2 = _context.sent;
            _context.t3 = this.forwarder.address;
            this.domain = {
              name: _context.t0,
              version: _context.t1,
              chainId: _context.t2,
              verifyingContract: _context.t3
            };
            this.types = {
              EIP712Domain: EIP712Domain,
              ForwardRequest: [{
                name: 'from',
                type: 'address'
              }, {
                name: 'to',
                type: 'address'
              }, {
                name: 'value',
                type: 'uint256'
              }, {
                name: 'gas',
                type: 'uint256'
              }, {
                name: 'nonce',
                type: 'uint256'
              }, {
                name: 'data',
                type: 'bytes'
              }]
            };

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('with message', function () {
    beforeEach(function _callee2() {
      var _this = this;

      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.wallet = Wallet.generate();
              this.sender = web3.utils.toChecksumAddress(this.wallet.getAddressString());
              _context2.t0 = this.sender;
              _context2.t1 = constants.ZERO_ADDRESS;
              _context2.t2 = Number;
              _context2.next = 7;
              return regeneratorRuntime.awrap(this.forwarder.getNonce(this.sender));

            case 7:
              _context2.t3 = _context2.sent;
              _context2.t4 = (0, _context2.t2)(_context2.t3);
              this.req = {
                from: _context2.t0,
                to: _context2.t1,
                value: '0',
                gas: '100000',
                nonce: _context2.t4,
                data: '0x'
              };

              this.sign = function () {
                return ethSigUtil.signTypedMessage(_this.wallet.getPrivateKey(), {
                  data: {
                    types: _this.types,
                    domain: _this.domain,
                    primaryType: 'ForwardRequest',
                    message: _this.req
                  }
                });
              };

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    context('verify', function () {
      context('valid signature', function () {
        beforeEach(function _callee3() {
          return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.t0 = expect;
                  _context3.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.getNonce(this.req.from));

                case 3:
                  _context3.t1 = _context3.sent;
                  _context3.t2 = web3.utils.toBN(this.req.nonce);
                  (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, null, this);
        });
        it('success', function _callee4() {
          return regeneratorRuntime.async(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.t0 = expect;
                  _context4.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.verify(this.req, this.sign()));

                case 3:
                  _context4.t1 = _context4.sent;
                  (0, _context4.t0)(_context4.t1).to.be.equal(true);

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, null, this);
        });
        afterEach(function _callee5() {
          return regeneratorRuntime.async(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.t0 = expect;
                  _context5.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.getNonce(this.req.from));

                case 3:
                  _context5.t1 = _context5.sent;
                  _context5.t2 = web3.utils.toBN(this.req.nonce);
                  (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);

                case 6:
                case "end":
                  return _context5.stop();
              }
            }
          }, null, this);
        });
      });
      context('invalid signature', function () {
        it('tampered from', function _callee6() {
          return regeneratorRuntime.async(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.t0 = expect;
                  _context6.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.verify(_objectSpread({}, this.req, {
                    from: accounts[0]
                  }), this.sign()));

                case 3:
                  _context6.t1 = _context6.sent;
                  (0, _context6.t0)(_context6.t1).to.be.equal(false);

                case 5:
                case "end":
                  return _context6.stop();
              }
            }
          }, null, this);
        });
        it('tampered to', function _callee7() {
          return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.t0 = expect;
                  _context7.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.verify(_objectSpread({}, this.req, {
                    to: accounts[0]
                  }), this.sign()));

                case 3:
                  _context7.t1 = _context7.sent;
                  (0, _context7.t0)(_context7.t1).to.be.equal(false);

                case 5:
                case "end":
                  return _context7.stop();
              }
            }
          }, null, this);
        });
        it('tampered value', function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.t0 = expect;
                  _context8.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.verify(_objectSpread({}, this.req, {
                    value: web3.utils.toWei('1')
                  }), this.sign()));

                case 3:
                  _context8.t1 = _context8.sent;
                  (0, _context8.t0)(_context8.t1).to.be.equal(false);

                case 5:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
        it('tampered nonce', function _callee9() {
          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.t0 = expect;
                  _context9.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.verify(_objectSpread({}, this.req, {
                    nonce: this.req.nonce + 1
                  }), this.sign()));

                case 3:
                  _context9.t1 = _context9.sent;
                  (0, _context9.t0)(_context9.t1).to.be.equal(false);

                case 5:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
        it('tampered data', function _callee10() {
          return regeneratorRuntime.async(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.t0 = expect;
                  _context10.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.verify(_objectSpread({}, this.req, {
                    data: '0x1742'
                  }), this.sign()));

                case 3:
                  _context10.t1 = _context10.sent;
                  (0, _context10.t0)(_context10.t1).to.be.equal(false);

                case 5:
                case "end":
                  return _context10.stop();
              }
            }
          }, null, this);
        });
        it('tampered signature', function _callee11() {
          var tamperedsign;
          return regeneratorRuntime.async(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  tamperedsign = web3.utils.hexToBytes(this.sign());
                  tamperedsign[42] ^= 0xff;
                  _context11.t0 = expect;
                  _context11.next = 5;
                  return regeneratorRuntime.awrap(this.forwarder.verify(this.req, web3.utils.bytesToHex(tamperedsign)));

                case 5:
                  _context11.t1 = _context11.sent;
                  (0, _context11.t0)(_context11.t1).to.be.equal(false);

                case 7:
                case "end":
                  return _context11.stop();
              }
            }
          }, null, this);
        });
      });
    });
    context('execute', function () {
      context('valid signature', function () {
        beforeEach(function _callee12() {
          return regeneratorRuntime.async(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.t0 = expect;
                  _context12.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.getNonce(this.req.from));

                case 3:
                  _context12.t1 = _context12.sent;
                  _context12.t2 = web3.utils.toBN(this.req.nonce);
                  (0, _context12.t0)(_context12.t1).to.be.bignumber.equal(_context12.t2);

                case 6:
                case "end":
                  return _context12.stop();
              }
            }
          }, null, this);
        });
        it('success', function _callee13() {
          return regeneratorRuntime.async(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return regeneratorRuntime.awrap(this.forwarder.execute(this.req, this.sign()));

                case 2:
                case "end":
                  return _context13.stop();
              }
            }
          }, null, this);
        });
        afterEach(function _callee14() {
          return regeneratorRuntime.async(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.t0 = expect;
                  _context14.next = 3;
                  return regeneratorRuntime.awrap(this.forwarder.getNonce(this.req.from));

                case 3:
                  _context14.t1 = _context14.sent;
                  _context14.t2 = web3.utils.toBN(this.req.nonce + 1);
                  (0, _context14.t0)(_context14.t1).to.be.bignumber.equal(_context14.t2);

                case 6:
                case "end":
                  return _context14.stop();
              }
            }
          }, null, this);
        });
      });
      context('invalid signature', function () {
        it('tampered from', function _callee15() {
          return regeneratorRuntime.async(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.forwarder.execute(_objectSpread({}, this.req, {
                    from: accounts[0]
                  }), this.sign()), 'MinimalForwarder: signature does not match request'));

                case 2:
                case "end":
                  return _context15.stop();
              }
            }
          }, null, this);
        });
        it('tampered to', function _callee16() {
          return regeneratorRuntime.async(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.forwarder.execute(_objectSpread({}, this.req, {
                    to: accounts[0]
                  }), this.sign()), 'MinimalForwarder: signature does not match request'));

                case 2:
                case "end":
                  return _context16.stop();
              }
            }
          }, null, this);
        });
        it('tampered value', function _callee17() {
          return regeneratorRuntime.async(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.forwarder.execute(_objectSpread({}, this.req, {
                    value: web3.utils.toWei('1')
                  }), this.sign()), 'MinimalForwarder: signature does not match request'));

                case 2:
                case "end":
                  return _context17.stop();
              }
            }
          }, null, this);
        });
        it('tampered nonce', function _callee18() {
          return regeneratorRuntime.async(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.forwarder.execute(_objectSpread({}, this.req, {
                    nonce: this.req.nonce + 1
                  }), this.sign()), 'MinimalForwarder: signature does not match request'));

                case 2:
                case "end":
                  return _context18.stop();
              }
            }
          }, null, this);
        });
        it('tampered data', function _callee19() {
          return regeneratorRuntime.async(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  _context19.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.forwarder.execute(_objectSpread({}, this.req, {
                    data: '0x1742'
                  }), this.sign()), 'MinimalForwarder: signature does not match request'));

                case 2:
                case "end":
                  return _context19.stop();
              }
            }
          }, null, this);
        });
        it('tampered signature', function _callee20() {
          var tamperedsign;
          return regeneratorRuntime.async(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  tamperedsign = web3.utils.hexToBytes(this.sign());
                  tamperedsign[42] ^= 0xff;
                  _context20.next = 4;
                  return regeneratorRuntime.awrap(expectRevert(this.forwarder.execute(this.req, web3.utils.bytesToHex(tamperedsign)), 'MinimalForwarder: signature does not match request'));

                case 4:
                case "end":
                  return _context20.stop();
              }
            }
          }, null, this);
        });
      });
      it('bubble out of gas', function _callee21() {
        var receiver, gasAvailable, _ref, transactions, _ref2, gasUsed;

        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(CallReceiverMock["new"]());

              case 2:
                receiver = _context21.sent;
                gasAvailable = 100000;
                this.req.to = receiver.address;
                this.req.data = receiver.contract.methods.mockFunctionOutOfGas().encodeABI();
                this.req.gas = 1000000;
                _context21.next = 9;
                return regeneratorRuntime.awrap(expectRevert.assertion(this.forwarder.execute(this.req, this.sign(), {
                  gas: gasAvailable
                })));

              case 9:
                _context21.next = 11;
                return regeneratorRuntime.awrap(web3.eth.getBlock('latest'));

              case 11:
                _ref = _context21.sent;
                transactions = _ref.transactions;
                _context21.next = 15;
                return regeneratorRuntime.awrap(web3.eth.getTransactionReceipt(transactions[0]));

              case 15:
                _ref2 = _context21.sent;
                gasUsed = _ref2.gasUsed;
                expect(gasUsed).to.be.equal(gasAvailable);

              case 18:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
    });
  });
});