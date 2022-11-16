"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('../../helpers/sign'),
    toEthSignedMessageHash = _require.toEthSignedMessageHash;

var _require2 = require('chai'),
    expect = _require2.expect;

var SignatureCheckerMock = artifacts.require('SignatureCheckerMock');

var ERC1271WalletMock = artifacts.require('ERC1271WalletMock');

var ERC1271MaliciousMock = artifacts.require('ERC1271MaliciousMock');

var TEST_MESSAGE = web3.utils.sha3('OpenZeppelin');
var WRONG_MESSAGE = web3.utils.sha3('Nope');
contract('SignatureChecker (ERC1271)', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      signer = _accounts[0],
      other = _accounts[1];

  before('deploying', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(SignatureCheckerMock["new"]());

          case 2:
            this.signaturechecker = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(ERC1271WalletMock["new"](signer));

          case 5:
            this.wallet = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(ERC1271MaliciousMock["new"]());

          case 8:
            this.malicious = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(web3.eth.sign(TEST_MESSAGE, signer));

          case 11:
            this.signature = _context.sent;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('EOA account', function () {
    it('with matching signer and signature', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.signaturechecker.isValidSignatureNow(signer, toEthSignedMessageHash(TEST_MESSAGE), this.signature));

            case 3:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.equal(true);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('with invalid signer', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.signaturechecker.isValidSignatureNow(other, toEthSignedMessageHash(TEST_MESSAGE), this.signature));

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.equal(false);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('with invalid signature', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = expect;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.signaturechecker.isValidSignatureNow(signer, toEthSignedMessageHash(WRONG_MESSAGE), this.signature));

            case 3:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal(false);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
  context('ERC1271 wallet', function () {
    it('with matching signer and signature', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = expect;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.signaturechecker.isValidSignatureNow(this.wallet.address, toEthSignedMessageHash(TEST_MESSAGE), this.signature));

            case 3:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1).to.equal(true);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('with invalid signer', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.signaturechecker.isValidSignatureNow(this.signaturechecker.address, toEthSignedMessageHash(TEST_MESSAGE), this.signature));

            case 3:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.equal(false);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('with invalid signature', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = expect;
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.signaturechecker.isValidSignatureNow(this.wallet.address, toEthSignedMessageHash(WRONG_MESSAGE), this.signature));

            case 3:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).to.equal(false);

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('with malicious wallet', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.t0 = expect;
              _context8.next = 3;
              return regeneratorRuntime.awrap(this.signaturechecker.isValidSignatureNow(this.malicious.address, toEthSignedMessageHash(TEST_MESSAGE), this.signature));

            case 3:
              _context8.t1 = _context8.sent;
              (0, _context8.t0)(_context8.t1).to.equal(false);

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
  });
});