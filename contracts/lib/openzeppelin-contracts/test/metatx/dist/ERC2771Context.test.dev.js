"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

var _require = require('../helpers/eip712'),
    EIP712Domain = _require.EIP712Domain;

var _require2 = require('@openzeppelin/test-helpers'),
    expectEvent = _require2.expectEvent;

var _require3 = require('chai'),
    expect = _require3.expect;

var ERC2771ContextMock = artifacts.require('ERC2771ContextMock');

var MinimalForwarder = artifacts.require('MinimalForwarder');

var ContextMockCaller = artifacts.require('ContextMockCaller');

var _require4 = require('../utils/Context.behavior'),
    shouldBehaveLikeRegularContext = _require4.shouldBehaveLikeRegularContext;

var name = 'MinimalForwarder';
var version = '0.0.1';
contract('ERC2771Context', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(MinimalForwarder["new"]());

          case 2:
            this.forwarder = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(ERC2771ContextMock["new"](this.forwarder.address));

          case 5:
            this.recipient = _context.sent;
            _context.t0 = name;
            _context.t1 = version;
            _context.next = 10;
            return regeneratorRuntime.awrap(web3.eth.getChainId());

          case 10:
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

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('recognize trusted forwarder', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.recipient.isTrustedForwarder(this.forwarder.address));

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  context('when called directly', function () {
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.context = this.recipient; // The Context behavior expects the contract in this.context

              _context3.next = 3;
              return regeneratorRuntime.awrap(ContextMockCaller["new"]());

            case 3:
              this.caller = _context3.sent;

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeRegularContext.apply(void 0, _toConsumableArray(accounts));
  });
  context('when receiving a relayed call', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.wallet = Wallet.generate();
              this.sender = web3.utils.toChecksumAddress(this.wallet.getAddressString());
              this.data = {
                types: this.types,
                domain: this.domain,
                primaryType: 'ForwardRequest'
              };

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    describe('msgSender', function () {
      it('returns the relayed transaction original sender', function _callee5() {
        var data, req, sign, _ref, tx;

        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data = this.recipient.contract.methods.msgSender().encodeABI();
                _context5.t0 = this.sender;
                _context5.t1 = this.recipient.address;
                _context5.next = 5;
                return regeneratorRuntime.awrap(this.forwarder.getNonce(this.sender));

              case 5:
                _context5.t2 = _context5.sent.toString();
                _context5.t3 = data;
                req = {
                  from: _context5.t0,
                  to: _context5.t1,
                  value: '0',
                  gas: '100000',
                  nonce: _context5.t2,
                  data: _context5.t3
                };
                sign = ethSigUtil.signTypedMessage(this.wallet.getPrivateKey(), {
                  data: _objectSpread({}, this.data, {
                    message: req
                  })
                });
                _context5.t4 = expect;
                _context5.next = 12;
                return regeneratorRuntime.awrap(this.forwarder.verify(req, sign));

              case 12:
                _context5.t5 = _context5.sent;
                (0, _context5.t4)(_context5.t5).to.equal(true);
                _context5.next = 16;
                return regeneratorRuntime.awrap(this.forwarder.execute(req, sign));

              case 16:
                _ref = _context5.sent;
                tx = _ref.tx;
                _context5.next = 20;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, ERC2771ContextMock, 'Sender', {
                  sender: this.sender
                }));

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
    });
    describe('msgData', function () {
      it('returns the relayed transaction original data', function _callee6() {
        var integerValue, stringValue, data, req, sign, _ref2, tx;

        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                integerValue = '42';
                stringValue = 'OpenZeppelin';
                data = this.recipient.contract.methods.msgData(integerValue, stringValue).encodeABI();
                _context6.t0 = this.sender;
                _context6.t1 = this.recipient.address;
                _context6.next = 7;
                return regeneratorRuntime.awrap(this.forwarder.getNonce(this.sender));

              case 7:
                _context6.t2 = _context6.sent.toString();
                _context6.t3 = data;
                req = {
                  from: _context6.t0,
                  to: _context6.t1,
                  value: '0',
                  gas: '100000',
                  nonce: _context6.t2,
                  data: _context6.t3
                };
                sign = ethSigUtil.signTypedMessage(this.wallet.getPrivateKey(), {
                  data: _objectSpread({}, this.data, {
                    message: req
                  })
                });
                _context6.t4 = expect;
                _context6.next = 14;
                return regeneratorRuntime.awrap(this.forwarder.verify(req, sign));

              case 14:
                _context6.t5 = _context6.sent;
                (0, _context6.t4)(_context6.t5).to.equal(true);
                _context6.next = 18;
                return regeneratorRuntime.awrap(this.forwarder.execute(req, sign));

              case 18:
                _ref2 = _context6.sent;
                tx = _ref2.tx;
                _context6.next = 22;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, ERC2771ContextMock, 'Data', {
                  data: data,
                  integerValue: integerValue,
                  stringValue: stringValue
                }));

              case 22:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
  });
});