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

var ERC20FlashMintMock = artifacts.require('ERC20FlashMintMock');

var ERC3156FlashBorrowerMock = artifacts.require('ERC3156FlashBorrowerMock');

contract('ERC20FlashMint', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      initialHolder = _accounts[0],
      other = _accounts[1],
      anotherAccount = _accounts[2];

  var name = 'My Token';
  var symbol = 'MTKN';
  var initialSupply = new BN(100);
  var loanAmount = new BN(10000000000000);
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20FlashMintMock["new"](name, symbol, initialHolder, initialSupply));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('maxFlashLoan', function () {
    it('token match', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.token.maxFlashLoan(this.token.address));

            case 3:
              _context2.t1 = _context2.sent;
              _context2.t2 = MAX_UINT256.sub(initialSupply);
              (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('token mismatch', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.token.maxFlashLoan(ZERO_ADDRESS));

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('flashFee', function () {
    it('token match', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = expect;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.token.flashFee(this.token.address, loanAmount));

            case 3:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('token mismatch', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.flashFee(ZERO_ADDRESS, loanAmount), 'ERC20FlashMint: wrong token'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
  describe('flashFeeReceiver', function () {
    it('default receiver', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.token.flashFeeReceiver());

            case 3:
              _context6.t1 = _context6.sent;
              _context6.t2 = ZERO_ADDRESS;
              (0, _context6.t0)(_context6.t1).to.be.eq(_context6.t2);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
  describe('flashLoan', function () {
    it('success', function _callee7() {
      var receiver, _ref, tx;

      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(ERC3156FlashBorrowerMock["new"](true, true));

            case 2:
              receiver = _context7.sent;
              _context7.next = 5;
              return regeneratorRuntime.awrap(this.token.flashLoan(receiver.address, this.token.address, loanAmount, '0x'));

            case 5:
              _ref = _context7.sent;
              tx = _ref.tx;
              _context7.next = 9;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: ZERO_ADDRESS,
                to: receiver.address,
                value: loanAmount
              }));

            case 9:
              _context7.next = 11;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: receiver.address,
                to: ZERO_ADDRESS,
                value: loanAmount
              }));

            case 11:
              _context7.next = 13;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, receiver, 'BalanceOf', {
                token: this.token.address,
                account: receiver.address,
                value: loanAmount
              }));

            case 13:
              _context7.next = 15;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, receiver, 'TotalSupply', {
                token: this.token.address,
                value: initialSupply.add(loanAmount)
              }));

            case 15:
              _context7.t0 = expect;
              _context7.next = 18;
              return regeneratorRuntime.awrap(this.token.totalSupply());

            case 18:
              _context7.t1 = _context7.sent;
              _context7.t2 = initialSupply;
              (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);
              _context7.t3 = expect;
              _context7.next = 24;
              return regeneratorRuntime.awrap(this.token.balanceOf(receiver.address));

            case 24:
              _context7.t4 = _context7.sent;
              (0, _context7.t3)(_context7.t4).to.be.bignumber.equal('0');
              _context7.t5 = expect;
              _context7.next = 29;
              return regeneratorRuntime.awrap(this.token.allowance(receiver.address, this.token.address));

            case 29:
              _context7.t6 = _context7.sent;
              (0, _context7.t5)(_context7.t6).to.be.bignumber.equal('0');

            case 31:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('missing return value', function _callee8() {
      var receiver;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(ERC3156FlashBorrowerMock["new"](false, true));

            case 2:
              receiver = _context8.sent;
              _context8.next = 5;
              return regeneratorRuntime.awrap(expectRevert(this.token.flashLoan(receiver.address, this.token.address, loanAmount, '0x'), 'ERC20FlashMint: invalid return value'));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('missing approval', function _callee9() {
      var receiver;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(ERC3156FlashBorrowerMock["new"](true, false));

            case 2:
              receiver = _context9.sent;
              _context9.next = 5;
              return regeneratorRuntime.awrap(expectRevert(this.token.flashLoan(receiver.address, this.token.address, loanAmount, '0x'), 'ERC20: insufficient allowance'));

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('unavailable funds', function _callee10() {
      var receiver, data;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(ERC3156FlashBorrowerMock["new"](true, true));

            case 2:
              receiver = _context10.sent;
              data = this.token.contract.methods.transfer(other, 10).encodeABI();
              _context10.next = 6;
              return regeneratorRuntime.awrap(expectRevert(this.token.flashLoan(receiver.address, this.token.address, loanAmount, data), 'ERC20: burn amount exceeds balance'));

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('more than maxFlashLoan', function _callee11() {
      var receiver, data;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(ERC3156FlashBorrowerMock["new"](true, true));

            case 2:
              receiver = _context11.sent;
              data = this.token.contract.methods.transfer(other, 10).encodeABI(); // _mint overflow reverts using a panic code. No reason string.

              _context11.next = 6;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.flashLoan(receiver.address, this.token.address, MAX_UINT256, data)));

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    describe('custom flash fee & custom fee receiver', function () {
      var receiverInitialBalance = new BN(200000);
      var flashFee = new BN(5000);
      beforeEach('init receiver balance & set flash fee', function _callee12() {
        var receipt;
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(ERC3156FlashBorrowerMock["new"](true, true));

              case 2:
                this.receiver = _context12.sent;
                _context12.next = 5;
                return regeneratorRuntime.awrap(this.token.mint(this.receiver.address, receiverInitialBalance));

              case 5:
                receipt = _context12.sent;
                _context12.next = 8;
                return regeneratorRuntime.awrap(expectEvent(receipt, 'Transfer', {
                  from: ZERO_ADDRESS,
                  to: this.receiver.address,
                  value: receiverInitialBalance
                }));

              case 8:
                _context12.t0 = expect;
                _context12.next = 11;
                return regeneratorRuntime.awrap(this.token.balanceOf(this.receiver.address));

              case 11:
                _context12.t1 = _context12.sent;
                _context12.t2 = receiverInitialBalance;
                (0, _context12.t0)(_context12.t1).to.be.bignumber.equal(_context12.t2);
                _context12.next = 16;
                return regeneratorRuntime.awrap(this.token.setFlashFee(flashFee));

              case 16:
                _context12.t3 = expect;
                _context12.next = 19;
                return regeneratorRuntime.awrap(this.token.flashFee(this.token.address, loanAmount));

              case 19:
                _context12.t4 = _context12.sent;
                _context12.t5 = flashFee;
                (0, _context12.t3)(_context12.t4).to.be.bignumber.equal(_context12.t5);

              case 22:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('default flash fee receiver', function _callee13() {
        var _ref2, tx;

        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(this.token.flashLoan(this.receiver.address, this.token.address, loanAmount, '0x'));

              case 2:
                _ref2 = _context13.sent;
                tx = _ref2.tx;
                _context13.next = 6;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                  from: ZERO_ADDRESS,
                  to: this.receiver.address,
                  value: loanAmount
                }));

              case 6:
                _context13.next = 8;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                  from: this.receiver.address,
                  to: ZERO_ADDRESS,
                  value: loanAmount.add(flashFee)
                }));

              case 8:
                _context13.next = 10;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.receiver, 'BalanceOf', {
                  token: this.token.address,
                  account: this.receiver.address,
                  value: receiverInitialBalance.add(loanAmount)
                }));

              case 10:
                _context13.next = 12;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.receiver, 'TotalSupply', {
                  token: this.token.address,
                  value: initialSupply.add(receiverInitialBalance).add(loanAmount)
                }));

              case 12:
                _context13.t0 = expect;
                _context13.next = 15;
                return regeneratorRuntime.awrap(this.token.totalSupply());

              case 15:
                _context13.t1 = _context13.sent;
                _context13.t2 = initialSupply.add(receiverInitialBalance).sub(flashFee);
                (0, _context13.t0)(_context13.t1).to.be.bignumber.equal(_context13.t2);
                _context13.t3 = expect;
                _context13.next = 21;
                return regeneratorRuntime.awrap(this.token.balanceOf(this.receiver.address));

              case 21:
                _context13.t4 = _context13.sent;
                _context13.t5 = receiverInitialBalance.sub(flashFee);
                (0, _context13.t3)(_context13.t4).to.be.bignumber.equal(_context13.t5);
                _context13.t6 = expect;
                _context13.t7 = regeneratorRuntime;
                _context13.t8 = this.token;
                _context13.next = 29;
                return regeneratorRuntime.awrap(this.token.flashFeeReceiver());

              case 29:
                _context13.t9 = _context13.sent;
                _context13.t10 = _context13.t8.balanceOf.call(_context13.t8, _context13.t9);
                _context13.next = 33;
                return _context13.t7.awrap.call(_context13.t7, _context13.t10);

              case 33:
                _context13.t11 = _context13.sent;
                (0, _context13.t6)(_context13.t11).to.be.bignumber.equal('0');
                _context13.t12 = expect;
                _context13.next = 38;
                return regeneratorRuntime.awrap(this.token.allowance(this.receiver.address, this.token.address));

              case 38:
                _context13.t13 = _context13.sent;
                (0, _context13.t12)(_context13.t13).to.be.bignumber.equal('0');

              case 40:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('custom flash fee receiver', function _callee14() {
        var flashFeeReceiverAddress, _ref3, tx;

        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                flashFeeReceiverAddress = anotherAccount;
                _context14.next = 3;
                return regeneratorRuntime.awrap(this.token.setFlashFeeReceiver(flashFeeReceiverAddress));

              case 3:
                _context14.t0 = expect;
                _context14.next = 6;
                return regeneratorRuntime.awrap(this.token.flashFeeReceiver());

              case 6:
                _context14.t1 = _context14.sent;
                _context14.t2 = flashFeeReceiverAddress;
                (0, _context14.t0)(_context14.t1).to.be.eq(_context14.t2);
                _context14.t3 = expect;
                _context14.next = 12;
                return regeneratorRuntime.awrap(this.token.balanceOf(flashFeeReceiverAddress));

              case 12:
                _context14.t4 = _context14.sent;
                (0, _context14.t3)(_context14.t4).to.be.bignumber.equal('0');
                _context14.next = 16;
                return regeneratorRuntime.awrap(this.token.flashLoan(this.receiver.address, this.token.address, loanAmount, '0x'));

              case 16:
                _ref3 = _context14.sent;
                tx = _ref3.tx;
                _context14.next = 20;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                  from: ZERO_ADDRESS,
                  to: this.receiver.address,
                  value: loanAmount
                }));

              case 20:
                _context14.next = 22;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                  from: this.receiver.address,
                  to: ZERO_ADDRESS,
                  value: loanAmount
                }));

              case 22:
                _context14.next = 24;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                  from: this.receiver.address,
                  to: flashFeeReceiverAddress,
                  value: flashFee
                }));

              case 24:
                _context14.next = 26;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.receiver, 'BalanceOf', {
                  token: this.token.address,
                  account: this.receiver.address,
                  value: receiverInitialBalance.add(loanAmount)
                }));

              case 26:
                _context14.next = 28;
                return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.receiver, 'TotalSupply', {
                  token: this.token.address,
                  value: initialSupply.add(receiverInitialBalance).add(loanAmount)
                }));

              case 28:
                _context14.t5 = expect;
                _context14.next = 31;
                return regeneratorRuntime.awrap(this.token.totalSupply());

              case 31:
                _context14.t6 = _context14.sent;
                _context14.t7 = initialSupply.add(receiverInitialBalance);
                (0, _context14.t5)(_context14.t6).to.be.bignumber.equal(_context14.t7);
                _context14.t8 = expect;
                _context14.next = 37;
                return regeneratorRuntime.awrap(this.token.balanceOf(this.receiver.address));

              case 37:
                _context14.t9 = _context14.sent;
                _context14.t10 = receiverInitialBalance.sub(flashFee);
                (0, _context14.t8)(_context14.t9).to.be.bignumber.equal(_context14.t10);
                _context14.t11 = expect;
                _context14.next = 43;
                return regeneratorRuntime.awrap(this.token.balanceOf(flashFeeReceiverAddress));

              case 43:
                _context14.t12 = _context14.sent;
                _context14.t13 = flashFee;
                (0, _context14.t11)(_context14.t12).to.be.bignumber.equal(_context14.t13);
                _context14.t14 = expect;
                _context14.next = 49;
                return regeneratorRuntime.awrap(this.token.allowance(this.receiver.address, flashFeeReceiverAddress));

              case 49:
                _context14.t15 = _context14.sent;
                (0, _context14.t14)(_context14.t15).to.be.bignumber.equal('0');

              case 51:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
    });
  });
});