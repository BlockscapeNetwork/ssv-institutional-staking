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
    expectRevert = _require.expectRevert;

var _require2 = require('../../helpers/sign'),
    toEthSignedMessageHash = _require2.toEthSignedMessageHash;

var _require3 = require('chai'),
    expect = _require3.expect;

var ECDSAMock = artifacts.require('ECDSAMock');

var TEST_MESSAGE = web3.utils.sha3('OpenZeppelin');
var WRONG_MESSAGE = web3.utils.sha3('Nope');
var NON_HASH_MESSAGE = '0x' + Buffer.from('abcd').toString('hex');

function to2098Format(signature) {
  var _long = web3.utils.hexToBytes(signature);

  if (_long.length !== 65) {
    throw new Error('invalid signature length (expected long format)');
  }

  if (_long[32] >> 7 === 1) {
    throw new Error('invalid signature \'s\' value');
  }

  var _short = _long.slice(0, 64);

  _short[32] |= _long[64] % 27 << 7; // set the first bit of the 32nd byte to the v parity bit

  return web3.utils.bytesToHex(_short);
}

function split(signature) {
  var raw = web3.utils.hexToBytes(signature);

  switch (raw.length) {
    case 64:
      return [web3.utils.bytesToHex(raw.slice(0, 32)), // r
      web3.utils.bytesToHex(raw.slice(32, 64)) // vs
      ];

    case 65:
      return [raw[64], // v
      web3.utils.bytesToHex(raw.slice(0, 32)), // r
      web3.utils.bytesToHex(raw.slice(32, 64)) // s
      ];

    default:
      expect.fail('Invalid signature length, cannot split');
  }
}

contract('ECDSA', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      other = _accounts[0];

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ECDSAMock["new"]());

          case 2:
            this.ecdsa = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('recover with invalid signature', function () {
    it('with short signature', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.ecdsa.recover(TEST_MESSAGE, '0x1234'), 'ECDSA: invalid signature length'));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('with long signature', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(expectRevert( // eslint-disable-next-line max-len
              this.ecdsa.recover(TEST_MESSAGE, '0x01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'), 'ECDSA: invalid signature length'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  context('recover with valid signature', function () {
    context('using web3.eth.sign', function () {
      it('returns signer address with correct signature', function _callee4() {
        var signature;
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(web3.eth.sign(TEST_MESSAGE, other));

              case 2:
                signature = _context4.sent;
                _context4.t0 = expect;
                _context4.next = 6;
                return regeneratorRuntime.awrap(this.ecdsa.recover(toEthSignedMessageHash(TEST_MESSAGE), signature));

              case 6:
                _context4.t1 = _context4.sent;
                _context4.t2 = other;
                (0, _context4.t0)(_context4.t1).to.equal(_context4.t2);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('returns signer address with correct signature for arbitrary length message', function _callee5() {
        var signature;
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(web3.eth.sign(NON_HASH_MESSAGE, other));

              case 2:
                signature = _context5.sent;
                _context5.t0 = expect;
                _context5.next = 6;
                return regeneratorRuntime.awrap(this.ecdsa.recover(toEthSignedMessageHash(NON_HASH_MESSAGE), signature));

              case 6:
                _context5.t1 = _context5.sent;
                _context5.t2 = other;
                (0, _context5.t0)(_context5.t1).to.equal(_context5.t2);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('returns a different address', function _callee6() {
        var signature;
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(web3.eth.sign(TEST_MESSAGE, other));

              case 2:
                signature = _context6.sent;
                _context6.t0 = expect;
                _context6.next = 6;
                return regeneratorRuntime.awrap(this.ecdsa.recover(WRONG_MESSAGE, signature));

              case 6:
                _context6.t1 = _context6.sent;
                _context6.t2 = other;
                (0, _context6.t0)(_context6.t1).to.not.equal(_context6.t2);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('reverts with invalid signature', function _callee7() {
        var signature;
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                // eslint-disable-next-line max-len
                signature = '0x332ce75a821c982f9127538858900d87d3ec1f9f737338ad67cad133fa48feff48e6fa0c18abc62e42820f05943e47af3e9fbe306ce74d64094bdf1691ee53e01c';
                _context7.next = 3;
                return regeneratorRuntime.awrap(expectRevert(this.ecdsa.recover(TEST_MESSAGE, signature), 'ECDSA: invalid signature'));

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
    });
    context('with v=27 signature', function () {
      // Signature generated outside ganache with method web3.eth.sign(signer, message)
      var signer = '0x2cc1166f6212628A0deEf2B33BEFB2187D35b86c'; // eslint-disable-next-line max-len

      var signatureWithoutV = '0x5d99b6f7f6d1f73d1a26497f2b1c89b24c0993913f86e9a2d02cd69887d9c94f3c880358579d811b21dd1b7fd9bb01c1d81d10e69f0384e675c32b39643be892';
      it('works with correct v value', function _callee8() {
        var _this$ecdsa, _this$ecdsa2;

        var v, signature;
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                v = '1b'; // 27 = 1b.

                signature = signatureWithoutV + v;
                _context8.t0 = expect;
                _context8.next = 5;
                return regeneratorRuntime.awrap(this.ecdsa.recover(TEST_MESSAGE, signature));

              case 5:
                _context8.t1 = _context8.sent;
                _context8.t2 = signer;
                (0, _context8.t0)(_context8.t1).to.equal(_context8.t2);
                _context8.t3 = expect;
                _context8.next = 11;
                return regeneratorRuntime.awrap((_this$ecdsa = this.ecdsa).recover_v_r_s.apply(_this$ecdsa, [TEST_MESSAGE].concat(_toConsumableArray(split(signature)))));

              case 11:
                _context8.t4 = _context8.sent;
                _context8.t5 = signer;
                (0, _context8.t3)(_context8.t4).to.equal(_context8.t5);
                _context8.t6 = expect;
                _context8.next = 17;
                return regeneratorRuntime.awrap((_this$ecdsa2 = this.ecdsa).recover_r_vs.apply(_this$ecdsa2, [TEST_MESSAGE].concat(_toConsumableArray(split(to2098Format(signature))))));

              case 17:
                _context8.t7 = _context8.sent;
                _context8.t8 = signer;
                (0, _context8.t6)(_context8.t7).to.equal(_context8.t8);

              case 20:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('rejects incorrect v value', function _callee9() {
        var _this$ecdsa3, _this$ecdsa4;

        var v, signature;
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                v = '1c'; // 28 = 1c.

                signature = signatureWithoutV + v;
                _context9.t0 = expect;
                _context9.next = 5;
                return regeneratorRuntime.awrap(this.ecdsa.recover(TEST_MESSAGE, signature));

              case 5:
                _context9.t1 = _context9.sent;
                _context9.t2 = signer;
                (0, _context9.t0)(_context9.t1).to.not.equal(_context9.t2);
                _context9.t3 = expect;
                _context9.next = 11;
                return regeneratorRuntime.awrap((_this$ecdsa3 = this.ecdsa).recover_v_r_s.apply(_this$ecdsa3, [TEST_MESSAGE].concat(_toConsumableArray(split(signature)))));

              case 11:
                _context9.t4 = _context9.sent;
                _context9.t5 = signer;
                (0, _context9.t3)(_context9.t4).to.not.equal(_context9.t5);
                _context9.t6 = expect;
                _context9.next = 17;
                return regeneratorRuntime.awrap((_this$ecdsa4 = this.ecdsa).recover_r_vs.apply(_this$ecdsa4, [TEST_MESSAGE].concat(_toConsumableArray(split(to2098Format(signature))))));

              case 17:
                _context9.t7 = _context9.sent;
                _context9.t8 = signer;
                (0, _context9.t6)(_context9.t7).to.not.equal(_context9.t8);

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('reverts wrong v values', function _callee10() {
        var _i2, _arr2, _this$ecdsa5, v, signature;

        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _i2 = 0, _arr2 = ['00', '01'];

              case 1:
                if (!(_i2 < _arr2.length)) {
                  _context10.next = 11;
                  break;
                }

                v = _arr2[_i2];
                signature = signatureWithoutV + v;
                _context10.next = 6;
                return regeneratorRuntime.awrap(expectRevert(this.ecdsa.recover(TEST_MESSAGE, signature), 'ECDSA: invalid signature'));

              case 6:
                _context10.next = 8;
                return regeneratorRuntime.awrap(expectRevert((_this$ecdsa5 = this.ecdsa).recover_v_r_s.apply(_this$ecdsa5, [TEST_MESSAGE].concat(_toConsumableArray(split(signature)))), 'ECDSA: invalid signature'));

              case 8:
                _i2++;
                _context10.next = 1;
                break;

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('rejects short EIP2098 format', function _callee11() {
        var v, signature;
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                v = '1b'; // 27 = 1b.

                signature = signatureWithoutV + v;
                _context11.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.ecdsa.recover(TEST_MESSAGE, to2098Format(signature)), 'ECDSA: invalid signature length'));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
    context('with v=28 signature', function () {
      var signer = '0x1E318623aB09Fe6de3C9b8672098464Aeda9100E'; // eslint-disable-next-line max-len

      var signatureWithoutV = '0x331fe75a821c982f9127538858900d87d3ec1f9f737338ad67cad133fa48feff48e6fa0c18abc62e42820f05943e47af3e9fbe306ce74d64094bdf1691ee53e0';
      it('works with correct v value', function _callee12() {
        var _this$ecdsa6, _this$ecdsa7;

        var v, signature;
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                v = '1c'; // 28 = 1c.

                signature = signatureWithoutV + v;
                _context12.t0 = expect;
                _context12.next = 5;
                return regeneratorRuntime.awrap(this.ecdsa.recover(TEST_MESSAGE, signature));

              case 5:
                _context12.t1 = _context12.sent;
                _context12.t2 = signer;
                (0, _context12.t0)(_context12.t1).to.equal(_context12.t2);
                _context12.t3 = expect;
                _context12.next = 11;
                return regeneratorRuntime.awrap((_this$ecdsa6 = this.ecdsa).recover_v_r_s.apply(_this$ecdsa6, [TEST_MESSAGE].concat(_toConsumableArray(split(signature)))));

              case 11:
                _context12.t4 = _context12.sent;
                _context12.t5 = signer;
                (0, _context12.t3)(_context12.t4).to.equal(_context12.t5);
                _context12.t6 = expect;
                _context12.next = 17;
                return regeneratorRuntime.awrap((_this$ecdsa7 = this.ecdsa).recover_r_vs.apply(_this$ecdsa7, [TEST_MESSAGE].concat(_toConsumableArray(split(to2098Format(signature))))));

              case 17:
                _context12.t7 = _context12.sent;
                _context12.t8 = signer;
                (0, _context12.t6)(_context12.t7).to.equal(_context12.t8);

              case 20:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('rejects incorrect v value', function _callee13() {
        var _this$ecdsa8, _this$ecdsa9;

        var v, signature;
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                v = '1b'; // 27 = 1b.

                signature = signatureWithoutV + v;
                _context13.t0 = expect;
                _context13.next = 5;
                return regeneratorRuntime.awrap(this.ecdsa.recover(TEST_MESSAGE, signature));

              case 5:
                _context13.t1 = _context13.sent;
                _context13.t2 = signer;
                (0, _context13.t0)(_context13.t1).to.not.equal(_context13.t2);
                _context13.t3 = expect;
                _context13.next = 11;
                return regeneratorRuntime.awrap((_this$ecdsa8 = this.ecdsa).recover_v_r_s.apply(_this$ecdsa8, [TEST_MESSAGE].concat(_toConsumableArray(split(signature)))));

              case 11:
                _context13.t4 = _context13.sent;
                _context13.t5 = signer;
                (0, _context13.t3)(_context13.t4).to.not.equal(_context13.t5);
                _context13.t6 = expect;
                _context13.next = 17;
                return regeneratorRuntime.awrap((_this$ecdsa9 = this.ecdsa).recover_r_vs.apply(_this$ecdsa9, [TEST_MESSAGE].concat(_toConsumableArray(split(to2098Format(signature))))));

              case 17:
                _context13.t7 = _context13.sent;
                _context13.t8 = signer;
                (0, _context13.t6)(_context13.t7).to.not.equal(_context13.t8);

              case 20:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('reverts invalid v values', function _callee14() {
        var _i3, _arr3, _this$ecdsa10, v, signature;

        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _i3 = 0, _arr3 = ['00', '01'];

              case 1:
                if (!(_i3 < _arr3.length)) {
                  _context14.next = 11;
                  break;
                }

                v = _arr3[_i3];
                signature = signatureWithoutV + v;
                _context14.next = 6;
                return regeneratorRuntime.awrap(expectRevert(this.ecdsa.recover(TEST_MESSAGE, signature), 'ECDSA: invalid signature'));

              case 6:
                _context14.next = 8;
                return regeneratorRuntime.awrap(expectRevert((_this$ecdsa10 = this.ecdsa).recover_v_r_s.apply(_this$ecdsa10, [TEST_MESSAGE].concat(_toConsumableArray(split(signature)))), 'ECDSA: invalid signature'));

              case 8:
                _i3++;
                _context14.next = 1;
                break;

              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('rejects short EIP2098 format', function _callee15() {
        var v, signature;
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                v = '1c'; // 27 = 1b.

                signature = signatureWithoutV + v;
                _context15.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.ecdsa.recover(TEST_MESSAGE, to2098Format(signature)), 'ECDSA: invalid signature length'));

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
    });
    it('reverts with high-s value signature', function _callee16() {
      var _this$ecdsa11;

      var message, highSSignature;
      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              message = '0xb94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'; // eslint-disable-next-line max-len

              highSSignature = '0xe742ff452d41413616a5bf43fe15dd88294e983d3d36206c2712f39083d638bde0a0fc89be718fbc1033e1d30d78be1c68081562ed2e97af876f286f3453231d1b';
              _context16.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.ecdsa.recover(message, highSSignature), 'ECDSA: invalid signature \'s\' value'));

            case 4:
              _context16.next = 6;
              return regeneratorRuntime.awrap(expectRevert((_this$ecdsa11 = this.ecdsa).recover_v_r_s.apply(_this$ecdsa11, [TEST_MESSAGE].concat(_toConsumableArray(split(highSSignature)))), 'ECDSA: invalid signature \'s\' value'));

            case 6:
              expect(function () {
                return to2098Format(highSSignature);
              }).to["throw"]('invalid signature \'s\' value');

            case 7:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
  });
  context('toEthSignedMessageHash', function () {
    it('prefixes bytes32 data correctly', function _callee17() {
      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.t0 = expect;
              _context17.next = 3;
              return regeneratorRuntime.awrap(this.ecdsa.methods['toEthSignedMessageHash(bytes32)'](TEST_MESSAGE));

            case 3:
              _context17.t1 = _context17.sent;
              _context17.t2 = toEthSignedMessageHash(TEST_MESSAGE);
              (0, _context17.t0)(_context17.t1).to.equal(_context17.t2);

            case 6:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('prefixes dynamic length data correctly', function _callee18() {
      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.t0 = expect;
              _context18.next = 3;
              return regeneratorRuntime.awrap(this.ecdsa.methods['toEthSignedMessageHash(bytes)'](NON_HASH_MESSAGE));

            case 3:
              _context18.t1 = _context18.sent;
              _context18.t2 = toEthSignedMessageHash(NON_HASH_MESSAGE);
              (0, _context18.t0)(_context18.t1).to.equal(_context18.t2);

            case 6:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
  });
});