"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ethSigUtil = require('eth-sig-util');

var Wallet = require('ethereumjs-wallet')["default"];

var _require = require('../../helpers/eip712'),
    EIP712Domain = _require.EIP712Domain,
    domainSeparator = _require.domainSeparator;

var EIP712 = artifacts.require('EIP712External');

contract('EIP712', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      mailTo = _accounts[0];

  var name = 'A Name';
  var version = '1';
  beforeEach('deploying', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(EIP712["new"](name, version));

          case 2:
            this.eip712 = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(this.eip712.getChainId());

          case 5:
            this.chainId = _context.sent;

          case 6:
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
            return regeneratorRuntime.awrap(this.eip712.domainSeparator());

          case 3:
            _context2.t2 = _context2.sent;
            _context2.t0 = (0, _context2.t1)(_context2.t2).to;
            _context2.next = 7;
            return regeneratorRuntime.awrap(domainSeparator(name, version, this.chainId, this.eip712.address));

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
  it('digest', function _callee3() {
    var chainId, verifyingContract, message, data, wallet, signature;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            chainId = this.chainId;
            verifyingContract = this.eip712.address;
            message = {
              to: mailTo,
              contents: 'very interesting'
            };
            data = {
              types: {
                EIP712Domain: EIP712Domain,
                Mail: [{
                  name: 'to',
                  type: 'address'
                }, {
                  name: 'contents',
                  type: 'string'
                }]
              },
              domain: {
                name: name,
                version: version,
                chainId: chainId,
                verifyingContract: verifyingContract
              },
              primaryType: 'Mail',
              message: message
            };
            wallet = Wallet.generate();
            signature = ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
              data: data
            });
            _context3.next = 8;
            return regeneratorRuntime.awrap(this.eip712.verify(signature, wallet.getAddressString(), message.to, message.contents));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
});