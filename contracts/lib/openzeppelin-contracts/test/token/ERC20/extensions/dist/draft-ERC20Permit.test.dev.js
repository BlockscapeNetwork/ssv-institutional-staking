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

var ERC20PermitMock = artifacts.require('ERC20PermitMock');

var _require4 = require('../../../helpers/eip712'),
    EIP712Domain = _require4.EIP712Domain,
    Permit = _require4.Permit,
    domainSeparator = _require4.domainSeparator;

contract('ERC20Permit', function (accounts) {
  var _accounts = _slicedToArray(accounts, 4),
      initialHolder = _accounts[0],
      spender = _accounts[1],
      recipient = _accounts[2],
      other = _accounts[3];

  var name = 'My Token';
  var symbol = 'MTKN';
  var version = '1';
  var initialSupply = new BN(100);
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20PermitMock["new"](name, symbol, initialHolder, initialSupply));

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
            return regeneratorRuntime.awrap(this.token.nonces(initialHolder));

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
  describe('permit', function () {
    var wallet = Wallet.generate();
    var owner = wallet.getAddressString();
    var value = new BN(42);
    var nonce = 0;
    var maxDeadline = MAX_UINT256;

    var buildData = function buildData(chainId, verifyingContract) {
      var deadline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : maxDeadline;
      return {
        primaryType: 'Permit',
        types: {
          EIP712Domain: EIP712Domain,
          Permit: Permit
        },
        domain: {
          name: name,
          version: version,
          chainId: chainId,
          verifyingContract: verifyingContract
        },
        message: {
          owner: owner,
          spender: spender,
          value: value,
          nonce: nonce,
          deadline: deadline
        }
      };
    };

    it('accepts owner signature', function _callee4() {
      var data, signature, _fromRpcSig, v, r, s, receipt;

      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = buildData(this.chainId, this.token.address);
              signature = ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
                data: data
              });
              _fromRpcSig = fromRpcSig(signature), v = _fromRpcSig.v, r = _fromRpcSig.r, s = _fromRpcSig.s;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.token.permit(owner, spender, value, maxDeadline, v, r, s));

            case 5:
              receipt = _context4.sent;
              _context4.t0 = expect;
              _context4.next = 9;
              return regeneratorRuntime.awrap(this.token.nonces(owner));

            case 9:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('1');
              _context4.t2 = expect;
              _context4.next = 14;
              return regeneratorRuntime.awrap(this.token.allowance(owner, spender));

            case 14:
              _context4.t3 = _context4.sent;
              _context4.t4 = value;
              (0, _context4.t2)(_context4.t3).to.be.bignumber.equal(_context4.t4);

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('rejects reused signature', function _callee5() {
      var data, signature, _fromRpcSig2, v, r, s;

      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              data = buildData(this.chainId, this.token.address);
              signature = ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
                data: data
              });
              _fromRpcSig2 = fromRpcSig(signature), v = _fromRpcSig2.v, r = _fromRpcSig2.r, s = _fromRpcSig2.s;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.token.permit(owner, spender, value, maxDeadline, v, r, s));

            case 5:
              _context5.next = 7;
              return regeneratorRuntime.awrap(expectRevert(this.token.permit(owner, spender, value, maxDeadline, v, r, s), 'ERC20Permit: invalid signature'));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('rejects other signature', function _callee6() {
      var otherWallet, data, signature, _fromRpcSig3, v, r, s;

      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              otherWallet = Wallet.generate();
              data = buildData(this.chainId, this.token.address);
              signature = ethSigUtil.signTypedMessage(otherWallet.getPrivateKey(), {
                data: data
              });
              _fromRpcSig3 = fromRpcSig(signature), v = _fromRpcSig3.v, r = _fromRpcSig3.r, s = _fromRpcSig3.s;
              _context6.next = 6;
              return regeneratorRuntime.awrap(expectRevert(this.token.permit(owner, spender, value, maxDeadline, v, r, s), 'ERC20Permit: invalid signature'));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('rejects expired permit', function _callee7() {
      var deadline, data, signature, _fromRpcSig4, v, r, s;

      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(time.latest());

            case 2:
              _context7.t0 = _context7.sent;
              _context7.t1 = time.duration.weeks(1);
              deadline = _context7.t0 - _context7.t1;
              data = buildData(this.chainId, this.token.address, deadline);
              signature = ethSigUtil.signTypedMessage(wallet.getPrivateKey(), {
                data: data
              });
              _fromRpcSig4 = fromRpcSig(signature), v = _fromRpcSig4.v, r = _fromRpcSig4.r, s = _fromRpcSig4.s;
              _context7.next = 10;
              return regeneratorRuntime.awrap(expectRevert(this.token.permit(owner, spender, value, deadline, v, r, s), 'ERC20Permit: expired deadline'));

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
  });
});