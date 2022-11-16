"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC20DecimalsMock = artifacts.require('ERC20DecimalsMock');

var ERC4626Mock = artifacts.require('ERC4626Mock');

var ERC4626DecimalMock = artifacts.require('ERC4626DecimalMock');

var parseToken = function parseToken(token) {
  return new BN(token).mul(new BN('1000000000000'));
};

var parseShare = function parseShare(share) {
  return new BN(share).mul(new BN('1000000000000000000'));
};

contract('ERC4626', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      holder = _accounts[0],
      recipient = _accounts[1],
      spender = _accounts[2],
      other = _accounts[3],
      user1 = _accounts[4],
      user2 = _accounts[5];

  var name = 'My Token';
  var symbol = 'MTKN';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20DecimalsMock["new"](name, symbol, 12));

          case 2:
            this.token = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(ERC4626DecimalMock["new"](this.token.address, name + ' Vault', symbol + 'V', 18));

          case 5:
            this.vault = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(this.token.mint(holder, web3.utils.toWei('100')));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(this.token.approve(this.vault.address, constants.MAX_UINT256, {
              from: holder
            }));

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(this.vault.approve(spender, constants.MAX_UINT256, {
              from: holder
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('metadata', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.vault.name());

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = name + ' Vault';
            (0, _context2.t0)(_context2.t1).to.be.equal(_context2.t2);
            _context2.t3 = expect;
            _context2.next = 9;
            return regeneratorRuntime.awrap(this.vault.symbol());

          case 9:
            _context2.t4 = _context2.sent;
            _context2.t5 = symbol + 'V';
            (0, _context2.t3)(_context2.t4).to.be.equal(_context2.t5);
            _context2.t6 = expect;
            _context2.next = 15;
            return regeneratorRuntime.awrap(this.vault.decimals());

          case 15:
            _context2.t7 = _context2.sent;
            (0, _context2.t6)(_context2.t7).to.be.bignumber.equal('18');
            _context2.t8 = expect;
            _context2.next = 20;
            return regeneratorRuntime.awrap(this.vault.asset());

          case 20:
            _context2.t9 = _context2.sent;
            _context2.t10 = this.token.address;
            (0, _context2.t8)(_context2.t9).to.be.equal(_context2.t10);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('inherit decimals if from asset', function _callee3() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, decimals, token, vault;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 3;
            _iterator = [0, 9, 12, 18, 36].map(web3.utils.toBN)[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 22;
              break;
            }

            decimals = _step.value;
            _context3.next = 9;
            return regeneratorRuntime.awrap(ERC20DecimalsMock["new"]('', '', decimals));

          case 9:
            token = _context3.sent;
            _context3.next = 12;
            return regeneratorRuntime.awrap(ERC4626Mock["new"](token.address, '', ''));

          case 12:
            vault = _context3.sent;
            _context3.t0 = expect;
            _context3.next = 16;
            return regeneratorRuntime.awrap(vault.decimals());

          case 16:
            _context3.t1 = _context3.sent;
            _context3.t2 = decimals;
            (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);

          case 19:
            _iteratorNormalCompletion = true;
            _context3.next = 5;
            break;

          case 22:
            _context3.next = 28;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t3 = _context3["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context3.t3;

          case 28:
            _context3.prev = 28;
            _context3.prev = 29;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 31:
            _context3.prev = 31;

            if (!_didIteratorError) {
              _context3.next = 34;
              break;
            }

            throw _iteratorError;

          case 34:
            return _context3.finish(31);

          case 35:
            return _context3.finish(28);

          case 36:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[3, 24, 28, 36], [29,, 31, 35]]);
  });
  describe('empty vault: no assets & no shares', function () {
    it('status', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = expect;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.vault.totalAssets());

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
    it('deposit', function _callee5() {
      var _ref, tx;

      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = expect;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxDeposit(holder));

            case 3:
              _context5.t1 = _context5.sent;
              _context5.t2 = constants.MAX_UINT256;
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);
              _context5.t3 = expect;
              _context5.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewDeposit(parseToken(1)));

            case 9:
              _context5.t4 = _context5.sent;
              _context5.t5 = parseShare(1);
              (0, _context5.t3)(_context5.t4).to.be.bignumber.equal(_context5.t5);
              _context5.next = 14;
              return regeneratorRuntime.awrap(this.vault.deposit(parseToken(1), recipient, {
                from: holder
              }));

            case 14:
              _ref = _context5.sent;
              tx = _ref.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: parseToken(1)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: parseShare(1)
              });

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('mint', function _callee6() {
      var _ref2, tx;

      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = expect;
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxMint(holder));

            case 3:
              _context6.t1 = _context6.sent;
              _context6.t2 = constants.MAX_UINT256;
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);
              _context6.t3 = expect;
              _context6.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewMint(parseShare(1)));

            case 9:
              _context6.t4 = _context6.sent;
              _context6.t5 = parseToken(1);
              (0, _context6.t3)(_context6.t4).to.be.bignumber.equal(_context6.t5);
              _context6.next = 14;
              return regeneratorRuntime.awrap(this.vault.mint(parseShare(1), recipient, {
                from: holder
              }));

            case 14:
              _ref2 = _context6.sent;
              tx = _ref2.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: parseToken(1)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: parseShare(1)
              });

            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('withdraw', function _callee7() {
      var _ref3, tx;

      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.t0 = expect;
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxWithdraw(holder));

            case 3:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).to.be.bignumber.equal('0');
              _context7.t2 = expect;
              _context7.next = 8;
              return regeneratorRuntime.awrap(this.vault.previewWithdraw('0'));

            case 8:
              _context7.t3 = _context7.sent;
              (0, _context7.t2)(_context7.t3).to.be.bignumber.equal('0');
              _context7.next = 12;
              return regeneratorRuntime.awrap(this.vault.withdraw('0', recipient, holder, {
                from: holder
              }));

            case 12:
              _ref3 = _context7.sent;
              tx = _ref3.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: '0'
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: '0'
              });

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('redeem', function _callee8() {
      var _ref4, tx;

      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.t0 = expect;
              _context8.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxRedeem(holder));

            case 3:
              _context8.t1 = _context8.sent;
              (0, _context8.t0)(_context8.t1).to.be.bignumber.equal('0');
              _context8.t2 = expect;
              _context8.next = 8;
              return regeneratorRuntime.awrap(this.vault.previewRedeem('0'));

            case 8:
              _context8.t3 = _context8.sent;
              (0, _context8.t2)(_context8.t3).to.be.bignumber.equal('0');
              _context8.next = 12;
              return regeneratorRuntime.awrap(this.vault.redeem('0', recipient, holder, {
                from: holder
              }));

            case 12:
              _ref4 = _context8.sent;
              tx = _ref4.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: '0'
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: '0'
              });

            case 16:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
  });
  describe('partially empty vault: assets & no shares', function () {
    beforeEach(function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(this.vault.address, parseToken(1)));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('status', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.t0 = expect;
              _context10.next = 3;
              return regeneratorRuntime.awrap(this.vault.totalAssets());

            case 3:
              _context10.t1 = _context10.sent;
              _context10.t2 = parseToken(1);
              (0, _context10.t0)(_context10.t1).to.be.bignumber.equal(_context10.t2);

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('deposit', function _callee11() {
      var _ref5, tx;

      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.t0 = expect;
              _context11.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxDeposit(holder));

            case 3:
              _context11.t1 = _context11.sent;
              _context11.t2 = constants.MAX_UINT256;
              (0, _context11.t0)(_context11.t1).to.be.bignumber.equal(_context11.t2);
              _context11.t3 = expect;
              _context11.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewDeposit(parseToken(1)));

            case 9:
              _context11.t4 = _context11.sent;
              _context11.t5 = parseShare(1);
              (0, _context11.t3)(_context11.t4).to.be.bignumber.equal(_context11.t5);
              _context11.next = 14;
              return regeneratorRuntime.awrap(this.vault.deposit(parseToken(1), recipient, {
                from: holder
              }));

            case 14:
              _ref5 = _context11.sent;
              tx = _ref5.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: parseToken(1)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: parseShare(1)
              });

            case 18:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    it('mint', function _callee12() {
      var _ref6, tx;

      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.t0 = expect;
              _context12.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxMint(holder));

            case 3:
              _context12.t1 = _context12.sent;
              _context12.t2 = constants.MAX_UINT256;
              (0, _context12.t0)(_context12.t1).to.be.bignumber.equal(_context12.t2);
              _context12.t3 = expect;
              _context12.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewMint(parseShare(1)));

            case 9:
              _context12.t4 = _context12.sent;
              _context12.t5 = parseToken(1);
              (0, _context12.t3)(_context12.t4).to.be.bignumber.equal(_context12.t5);
              _context12.next = 14;
              return regeneratorRuntime.awrap(this.vault.mint(parseShare(1), recipient, {
                from: holder
              }));

            case 14:
              _ref6 = _context12.sent;
              tx = _ref6.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: parseToken(1)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: parseShare(1)
              });

            case 18:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    it('withdraw', function _callee13() {
      var _ref7, tx;

      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.t0 = expect;
              _context13.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxWithdraw(holder));

            case 3:
              _context13.t1 = _context13.sent;
              (0, _context13.t0)(_context13.t1).to.be.bignumber.equal('0');
              _context13.t2 = expect;
              _context13.next = 8;
              return regeneratorRuntime.awrap(this.vault.previewWithdraw('0'));

            case 8:
              _context13.t3 = _context13.sent;
              (0, _context13.t2)(_context13.t3).to.be.bignumber.equal('0');
              _context13.next = 12;
              return regeneratorRuntime.awrap(this.vault.withdraw('0', recipient, holder, {
                from: holder
              }));

            case 12:
              _ref7 = _context13.sent;
              tx = _ref7.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: '0'
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: '0'
              });

            case 16:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
    it('redeem', function _callee14() {
      var _ref8, tx;

      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.t0 = expect;
              _context14.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxRedeem(holder));

            case 3:
              _context14.t1 = _context14.sent;
              (0, _context14.t0)(_context14.t1).to.be.bignumber.equal('0');
              _context14.t2 = expect;
              _context14.next = 8;
              return regeneratorRuntime.awrap(this.vault.previewRedeem('0'));

            case 8:
              _context14.t3 = _context14.sent;
              (0, _context14.t2)(_context14.t3).to.be.bignumber.equal('0');
              _context14.next = 12;
              return regeneratorRuntime.awrap(this.vault.redeem('0', recipient, holder, {
                from: holder
              }));

            case 12:
              _ref8 = _context14.sent;
              tx = _ref8.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: '0'
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: '0'
              });

            case 16:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
  });
  describe('partially empty vault: shares & no assets', function () {
    beforeEach(function _callee15() {
      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.vault.mockMint(holder, parseShare(1)));

            case 2:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
    it('status', function _callee16() {
      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.t0 = expect;
              _context16.next = 3;
              return regeneratorRuntime.awrap(this.vault.totalAssets());

            case 3:
              _context16.t1 = _context16.sent;
              (0, _context16.t0)(_context16.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
    it('deposit', function _callee17() {
      var _ref9, tx;

      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.t0 = expect;
              _context17.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxDeposit(holder));

            case 3:
              _context17.t1 = _context17.sent;
              (0, _context17.t0)(_context17.t1).to.be.bignumber.equal('0');
              _context17.next = 7;
              return regeneratorRuntime.awrap(this.vault.deposit(0, recipient, {
                from: holder
              }));

            case 7:
              _ref9 = _context17.sent;
              tx = _ref9.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: 0
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: 0
              }); // Cannot deposit more than 0

              _context17.next = 13;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.vault.previewDeposit(parseToken(1))));

            case 13:
              _context17.next = 15;
              return regeneratorRuntime.awrap(expectRevert(this.vault.deposit(parseToken(1), recipient, {
                from: holder
              }), 'ERC4626: deposit more than max'));

            case 15:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('mint', function _callee18() {
      var _ref10, tx;

      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.t0 = expect;
              _context18.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxMint(holder));

            case 3:
              _context18.t1 = _context18.sent;
              _context18.t2 = constants.MAX_UINT256;
              (0, _context18.t0)(_context18.t1).to.be.bignumber.equal(_context18.t2);
              _context18.t3 = expect;
              _context18.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewMint(parseShare(1)));

            case 9:
              _context18.t4 = _context18.sent;
              (0, _context18.t3)(_context18.t4).to.be.bignumber.equal('0');
              _context18.next = 13;
              return regeneratorRuntime.awrap(this.vault.mint(parseShare(1), recipient, {
                from: holder
              }));

            case 13:
              _ref10 = _context18.sent;
              tx = _ref10.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: '0'
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: parseShare(1)
              });

            case 17:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
    it('withdraw', function _callee19() {
      var _ref11, tx;

      return regeneratorRuntime.async(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.t0 = expect;
              _context19.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxWithdraw(holder));

            case 3:
              _context19.t1 = _context19.sent;
              (0, _context19.t0)(_context19.t1).to.be.bignumber.equal('0');
              _context19.t2 = expect;
              _context19.next = 8;
              return regeneratorRuntime.awrap(this.vault.previewWithdraw('0'));

            case 8:
              _context19.t3 = _context19.sent;
              (0, _context19.t2)(_context19.t3).to.be.bignumber.equal('0');
              _context19.next = 12;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.vault.previewWithdraw('1')));

            case 12:
              _context19.next = 14;
              return regeneratorRuntime.awrap(this.vault.withdraw('0', recipient, holder, {
                from: holder
              }));

            case 14:
              _ref11 = _context19.sent;
              tx = _ref11.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: '0'
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: '0'
              });

            case 18:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
    it('redeem', function _callee20() {
      var _ref12, tx;

      return regeneratorRuntime.async(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.t0 = expect;
              _context20.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxRedeem(holder));

            case 3:
              _context20.t1 = _context20.sent;
              _context20.t2 = parseShare(1);
              (0, _context20.t0)(_context20.t1).to.be.bignumber.equal(_context20.t2);
              _context20.t3 = expect;
              _context20.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewRedeem(parseShare(1)));

            case 9:
              _context20.t4 = _context20.sent;
              (0, _context20.t3)(_context20.t4).to.be.bignumber.equal('0');
              _context20.next = 13;
              return regeneratorRuntime.awrap(this.vault.redeem(parseShare(1), recipient, holder, {
                from: holder
              }));

            case 13:
              _ref12 = _context20.sent;
              tx = _ref12.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: '0'
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: parseShare(1)
              });

            case 17:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    });
  });
  describe('full vault: assets & shares', function () {
    beforeEach(function _callee21() {
      return regeneratorRuntime.async(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(this.vault.address, parseToken(1)));

            case 2:
              _context21.next = 4;
              return regeneratorRuntime.awrap(this.vault.mockMint(holder, parseShare(100)));

            case 4:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    });
    it('status', function _callee22() {
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.t0 = expect;
              _context22.next = 3;
              return regeneratorRuntime.awrap(this.vault.totalAssets());

            case 3:
              _context22.t1 = _context22.sent;
              _context22.t2 = parseToken(1);
              (0, _context22.t0)(_context22.t1).to.be.bignumber.equal(_context22.t2);

            case 6:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
    it('deposit', function _callee23() {
      var _ref13, tx;

      return regeneratorRuntime.async(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.t0 = expect;
              _context23.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxDeposit(holder));

            case 3:
              _context23.t1 = _context23.sent;
              _context23.t2 = constants.MAX_UINT256;
              (0, _context23.t0)(_context23.t1).to.be.bignumber.equal(_context23.t2);
              _context23.t3 = expect;
              _context23.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewDeposit(parseToken(1)));

            case 9:
              _context23.t4 = _context23.sent;
              _context23.t5 = parseShare(100);
              (0, _context23.t3)(_context23.t4).to.be.bignumber.equal(_context23.t5);
              _context23.next = 14;
              return regeneratorRuntime.awrap(this.vault.deposit(parseToken(1), recipient, {
                from: holder
              }));

            case 14:
              _ref13 = _context23.sent;
              tx = _ref13.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: parseToken(1)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: parseShare(100)
              });

            case 18:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    });
    it('mint', function _callee24() {
      var _ref14, tx;

      return regeneratorRuntime.async(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.t0 = expect;
              _context24.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxMint(holder));

            case 3:
              _context24.t1 = _context24.sent;
              _context24.t2 = constants.MAX_UINT256;
              (0, _context24.t0)(_context24.t1).to.be.bignumber.equal(_context24.t2);
              _context24.t3 = expect;
              _context24.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewMint(parseShare(1)));

            case 9:
              _context24.t4 = _context24.sent;
              _context24.t5 = parseToken(1).divn(100);
              (0, _context24.t3)(_context24.t4).to.be.bignumber.equal(_context24.t5);
              _context24.next = 14;
              return regeneratorRuntime.awrap(this.vault.mint(parseShare(1), recipient, {
                from: holder
              }));

            case 14:
              _ref14 = _context24.sent;
              tx = _ref14.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: holder,
                to: this.vault.address,
                value: parseToken(1).divn(100)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: constants.ZERO_ADDRESS,
                to: recipient,
                value: parseShare(1)
              });

            case 18:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    });
    it('withdraw', function _callee25() {
      var _ref15, tx;

      return regeneratorRuntime.async(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.t0 = expect;
              _context25.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxWithdraw(holder));

            case 3:
              _context25.t1 = _context25.sent;
              _context25.t2 = parseToken(1);
              (0, _context25.t0)(_context25.t1).to.be.bignumber.equal(_context25.t2);
              _context25.t3 = expect;
              _context25.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewWithdraw(parseToken(1)));

            case 9:
              _context25.t4 = _context25.sent;
              _context25.t5 = parseShare(100);
              (0, _context25.t3)(_context25.t4).to.be.bignumber.equal(_context25.t5);
              _context25.next = 14;
              return regeneratorRuntime.awrap(this.vault.withdraw(parseToken(1), recipient, holder, {
                from: holder
              }));

            case 14:
              _ref15 = _context25.sent;
              tx = _ref15.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: parseToken(1)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: parseShare(100)
              });

            case 18:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this);
    });
    it('withdraw with approval', function _callee26() {
      return regeneratorRuntime.async(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.vault.withdraw(parseToken(1), recipient, holder, {
                from: other
              }), 'ERC20: insufficient allowance'));

            case 2:
              _context26.next = 4;
              return regeneratorRuntime.awrap(this.vault.withdraw(parseToken(1), recipient, holder, {
                from: spender
              }));

            case 4:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    });
    it('redeem', function _callee27() {
      var _ref16, tx;

      return regeneratorRuntime.async(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.t0 = expect;
              _context27.next = 3;
              return regeneratorRuntime.awrap(this.vault.maxRedeem(holder));

            case 3:
              _context27.t1 = _context27.sent;
              _context27.t2 = parseShare(100);
              (0, _context27.t0)(_context27.t1).to.be.bignumber.equal(_context27.t2);
              _context27.t3 = expect;
              _context27.next = 9;
              return regeneratorRuntime.awrap(this.vault.previewRedeem(parseShare(100)));

            case 9:
              _context27.t4 = _context27.sent;
              _context27.t5 = parseToken(1);
              (0, _context27.t3)(_context27.t4).to.be.bignumber.equal(_context27.t5);
              _context27.next = 14;
              return regeneratorRuntime.awrap(this.vault.redeem(parseShare(100), recipient, holder, {
                from: holder
              }));

            case 14:
              _ref16 = _context27.sent;
              tx = _ref16.tx;
              expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: this.vault.address,
                to: recipient,
                value: parseToken(1)
              });
              expectEvent.inTransaction(tx, this.vault, 'Transfer', {
                from: holder,
                to: constants.ZERO_ADDRESS,
                value: parseShare(100)
              });

            case 18:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    });
    it('redeem with approval', function _callee28() {
      return regeneratorRuntime.async(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.vault.redeem(parseShare(100), recipient, holder, {
                from: other
              }), 'ERC20: insufficient allowance'));

            case 2:
              _context28.next = 4;
              return regeneratorRuntime.awrap(this.vault.redeem(parseShare(100), recipient, holder, {
                from: spender
              }));

            case 4:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    });
  }); /// Scenario inspired by solmate ERC4626 tests:
  /// https://github.com/transmissions11/solmate/blob/main/src/test/ERC4626.t.sol

  it('multiple mint, deposit, redeem & withdrawal', function _callee29() {
    var _ref17, tx, _ref18, _tx, _ref19, _tx2, _ref20, _tx3, _ref21, _tx4, _ref22, _tx5, _ref23, _tx6, _ref24, _tx7;

    return regeneratorRuntime.async(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.next = 2;
            return regeneratorRuntime.awrap(ERC20DecimalsMock["new"](name, symbol, 18));

          case 2:
            this.token = _context29.sent;
            _context29.next = 5;
            return regeneratorRuntime.awrap(ERC4626Mock["new"](this.token.address, name + ' Vault', symbol + 'V'));

          case 5:
            this.vault = _context29.sent;
            _context29.next = 8;
            return regeneratorRuntime.awrap(this.token.mint(user1, 4000));

          case 8:
            _context29.next = 10;
            return regeneratorRuntime.awrap(this.token.mint(user2, 7001));

          case 10:
            _context29.next = 12;
            return regeneratorRuntime.awrap(this.token.approve(this.vault.address, 4000, {
              from: user1
            }));

          case 12:
            _context29.next = 14;
            return regeneratorRuntime.awrap(this.token.approve(this.vault.address, 7001, {
              from: user2
            }));

          case 14:
            _context29.next = 16;
            return regeneratorRuntime.awrap(this.vault.mint(2000, user1, {
              from: user1
            }));

          case 16:
            _ref17 = _context29.sent;
            tx = _ref17.tx;
            expectEvent.inTransaction(tx, this.token, 'Transfer', {
              from: user1,
              to: this.vault.address,
              value: '2000'
            });
            expectEvent.inTransaction(tx, this.vault, 'Transfer', {
              from: constants.ZERO_ADDRESS,
              to: user1,
              value: '2000'
            });
            _context29.t0 = expect;
            _context29.next = 23;
            return regeneratorRuntime.awrap(this.vault.previewDeposit(2000));

          case 23:
            _context29.t1 = _context29.sent;
            (0, _context29.t0)(_context29.t1).to.be.bignumber.equal('2000');
            _context29.t2 = expect;
            _context29.next = 28;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 28:
            _context29.t3 = _context29.sent;
            (0, _context29.t2)(_context29.t3).to.be.bignumber.equal('2000');
            _context29.t4 = expect;
            _context29.next = 33;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 33:
            _context29.t5 = _context29.sent;
            (0, _context29.t4)(_context29.t5).to.be.bignumber.equal('0');
            _context29.t6 = expect;
            _context29.t7 = regeneratorRuntime;
            _context29.t8 = this.vault;
            _context29.next = 40;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 40:
            _context29.t9 = _context29.sent;
            _context29.t10 = _context29.t8.convertToAssets.call(_context29.t8, _context29.t9);
            _context29.next = 44;
            return _context29.t7.awrap.call(_context29.t7, _context29.t10);

          case 44:
            _context29.t11 = _context29.sent;
            (0, _context29.t6)(_context29.t11).to.be.bignumber.equal('2000');
            _context29.t12 = expect;
            _context29.t13 = regeneratorRuntime;
            _context29.t14 = this.vault;
            _context29.next = 51;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 51:
            _context29.t15 = _context29.sent;
            _context29.t16 = _context29.t14.convertToAssets.call(_context29.t14, _context29.t15);
            _context29.next = 55;
            return _context29.t13.awrap.call(_context29.t13, _context29.t16);

          case 55:
            _context29.t17 = _context29.sent;
            (0, _context29.t12)(_context29.t17).to.be.bignumber.equal('0');
            _context29.t18 = expect;
            _context29.next = 60;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 60:
            _context29.t19 = _context29.sent;
            (0, _context29.t18)(_context29.t19).to.be.bignumber.equal('2000');
            _context29.t20 = expect;
            _context29.next = 65;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 65:
            _context29.t21 = _context29.sent;
            (0, _context29.t20)(_context29.t21).to.be.bignumber.equal('2000');
            _context29.next = 69;
            return regeneratorRuntime.awrap(this.vault.mint(4000, user2, {
              from: user2
            }));

          case 69:
            _ref18 = _context29.sent;
            _tx = _ref18.tx;
            expectEvent.inTransaction(_tx, this.token, 'Transfer', {
              from: user2,
              to: this.vault.address,
              value: '4000'
            });
            expectEvent.inTransaction(_tx, this.vault, 'Transfer', {
              from: constants.ZERO_ADDRESS,
              to: user2,
              value: '4000'
            });
            _context29.t22 = expect;
            _context29.next = 76;
            return regeneratorRuntime.awrap(this.vault.previewDeposit(4000));

          case 76:
            _context29.t23 = _context29.sent;
            (0, _context29.t22)(_context29.t23).to.be.bignumber.equal('4000');
            _context29.t24 = expect;
            _context29.next = 81;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 81:
            _context29.t25 = _context29.sent;
            (0, _context29.t24)(_context29.t25).to.be.bignumber.equal('2000');
            _context29.t26 = expect;
            _context29.next = 86;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 86:
            _context29.t27 = _context29.sent;
            (0, _context29.t26)(_context29.t27).to.be.bignumber.equal('4000');
            _context29.t28 = expect;
            _context29.t29 = regeneratorRuntime;
            _context29.t30 = this.vault;
            _context29.next = 93;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 93:
            _context29.t31 = _context29.sent;
            _context29.t32 = _context29.t30.convertToAssets.call(_context29.t30, _context29.t31);
            _context29.next = 97;
            return _context29.t29.awrap.call(_context29.t29, _context29.t32);

          case 97:
            _context29.t33 = _context29.sent;
            (0, _context29.t28)(_context29.t33).to.be.bignumber.equal('2000');
            _context29.t34 = expect;
            _context29.t35 = regeneratorRuntime;
            _context29.t36 = this.vault;
            _context29.next = 104;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 104:
            _context29.t37 = _context29.sent;
            _context29.t38 = _context29.t36.convertToAssets.call(_context29.t36, _context29.t37);
            _context29.next = 108;
            return _context29.t35.awrap.call(_context29.t35, _context29.t38);

          case 108:
            _context29.t39 = _context29.sent;
            (0, _context29.t34)(_context29.t39).to.be.bignumber.equal('4000');
            _context29.t40 = expect;
            _context29.next = 113;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 113:
            _context29.t41 = _context29.sent;
            (0, _context29.t40)(_context29.t41).to.be.bignumber.equal('6000');
            _context29.t42 = expect;
            _context29.next = 118;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 118:
            _context29.t43 = _context29.sent;
            (0, _context29.t42)(_context29.t43).to.be.bignumber.equal('6000');
            _context29.next = 122;
            return regeneratorRuntime.awrap(this.token.mint(this.vault.address, 3000));

          case 122:
            _context29.t44 = expect;
            _context29.next = 125;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 125:
            _context29.t45 = _context29.sent;
            (0, _context29.t44)(_context29.t45).to.be.bignumber.equal('2000');
            _context29.t46 = expect;
            _context29.next = 130;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 130:
            _context29.t47 = _context29.sent;
            (0, _context29.t46)(_context29.t47).to.be.bignumber.equal('4000');
            _context29.t48 = expect;
            _context29.t49 = regeneratorRuntime;
            _context29.t50 = this.vault;
            _context29.next = 137;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 137:
            _context29.t51 = _context29.sent;
            _context29.t52 = _context29.t50.convertToAssets.call(_context29.t50, _context29.t51);
            _context29.next = 141;
            return _context29.t49.awrap.call(_context29.t49, _context29.t52);

          case 141:
            _context29.t53 = _context29.sent;
            (0, _context29.t48)(_context29.t53).to.be.bignumber.equal('3000');
            _context29.t54 = expect;
            _context29.t55 = regeneratorRuntime;
            _context29.t56 = this.vault;
            _context29.next = 148;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 148:
            _context29.t57 = _context29.sent;
            _context29.t58 = _context29.t56.convertToAssets.call(_context29.t56, _context29.t57);
            _context29.next = 152;
            return _context29.t55.awrap.call(_context29.t55, _context29.t58);

          case 152:
            _context29.t59 = _context29.sent;
            (0, _context29.t54)(_context29.t59).to.be.bignumber.equal('6000');
            _context29.t60 = expect;
            _context29.next = 157;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 157:
            _context29.t61 = _context29.sent;
            (0, _context29.t60)(_context29.t61).to.be.bignumber.equal('6000');
            _context29.t62 = expect;
            _context29.next = 162;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 162:
            _context29.t63 = _context29.sent;
            (0, _context29.t62)(_context29.t63).to.be.bignumber.equal('9000');
            _context29.next = 166;
            return regeneratorRuntime.awrap(this.vault.deposit(2000, user1, {
              from: user1
            }));

          case 166:
            _ref19 = _context29.sent;
            _tx2 = _ref19.tx;
            expectEvent.inTransaction(_tx2, this.token, 'Transfer', {
              from: user1,
              to: this.vault.address,
              value: '2000'
            });
            expectEvent.inTransaction(_tx2, this.vault, 'Transfer', {
              from: constants.ZERO_ADDRESS,
              to: user1,
              value: '1333'
            });
            _context29.t64 = expect;
            _context29.next = 173;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 173:
            _context29.t65 = _context29.sent;
            (0, _context29.t64)(_context29.t65).to.be.bignumber.equal('3333');
            _context29.t66 = expect;
            _context29.next = 178;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 178:
            _context29.t67 = _context29.sent;
            (0, _context29.t66)(_context29.t67).to.be.bignumber.equal('4000');
            _context29.t68 = expect;
            _context29.t69 = regeneratorRuntime;
            _context29.t70 = this.vault;
            _context29.next = 185;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 185:
            _context29.t71 = _context29.sent;
            _context29.t72 = _context29.t70.convertToAssets.call(_context29.t70, _context29.t71);
            _context29.next = 189;
            return _context29.t69.awrap.call(_context29.t69, _context29.t72);

          case 189:
            _context29.t73 = _context29.sent;
            (0, _context29.t68)(_context29.t73).to.be.bignumber.equal('4999');
            _context29.t74 = expect;
            _context29.t75 = regeneratorRuntime;
            _context29.t76 = this.vault;
            _context29.next = 196;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 196:
            _context29.t77 = _context29.sent;
            _context29.t78 = _context29.t76.convertToAssets.call(_context29.t76, _context29.t77);
            _context29.next = 200;
            return _context29.t75.awrap.call(_context29.t75, _context29.t78);

          case 200:
            _context29.t79 = _context29.sent;
            (0, _context29.t74)(_context29.t79).to.be.bignumber.equal('6000');
            _context29.t80 = expect;
            _context29.next = 205;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 205:
            _context29.t81 = _context29.sent;
            (0, _context29.t80)(_context29.t81).to.be.bignumber.equal('7333');
            _context29.t82 = expect;
            _context29.next = 210;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 210:
            _context29.t83 = _context29.sent;
            (0, _context29.t82)(_context29.t83).to.be.bignumber.equal('11000');
            _context29.next = 214;
            return regeneratorRuntime.awrap(this.vault.mint(2000, user2, {
              from: user2
            }));

          case 214:
            _ref20 = _context29.sent;
            _tx3 = _ref20.tx;
            expectEvent.inTransaction(_tx3, this.token, 'Transfer', {
              from: user2,
              to: this.vault.address,
              value: '3001'
            });
            expectEvent.inTransaction(_tx3, this.vault, 'Transfer', {
              from: constants.ZERO_ADDRESS,
              to: user2,
              value: '2000'
            });
            _context29.t84 = expect;
            _context29.next = 221;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 221:
            _context29.t85 = _context29.sent;
            (0, _context29.t84)(_context29.t85).to.be.bignumber.equal('3333');
            _context29.t86 = expect;
            _context29.next = 226;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 226:
            _context29.t87 = _context29.sent;
            (0, _context29.t86)(_context29.t87).to.be.bignumber.equal('6000');
            _context29.t88 = expect;
            _context29.t89 = regeneratorRuntime;
            _context29.t90 = this.vault;
            _context29.next = 233;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 233:
            _context29.t91 = _context29.sent;
            _context29.t92 = _context29.t90.convertToAssets.call(_context29.t90, _context29.t91);
            _context29.next = 237;
            return _context29.t89.awrap.call(_context29.t89, _context29.t92);

          case 237:
            _context29.t93 = _context29.sent;
            (0, _context29.t88)(_context29.t93).to.be.bignumber.equal('5000');
            _context29.t94 = expect;
            _context29.t95 = regeneratorRuntime;
            _context29.t96 = this.vault;
            _context29.next = 244;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 244:
            _context29.t97 = _context29.sent;
            _context29.t98 = _context29.t96.convertToAssets.call(_context29.t96, _context29.t97);
            _context29.next = 248;
            return _context29.t95.awrap.call(_context29.t95, _context29.t98);

          case 248:
            _context29.t99 = _context29.sent;
            (0, _context29.t94)(_context29.t99).to.be.bignumber.equal('9000');
            _context29.t100 = expect;
            _context29.next = 253;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 253:
            _context29.t101 = _context29.sent;
            (0, _context29.t100)(_context29.t101).to.be.bignumber.equal('9333');
            _context29.t102 = expect;
            _context29.next = 258;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 258:
            _context29.t103 = _context29.sent;
            (0, _context29.t102)(_context29.t103).to.be.bignumber.equal('14001');
            _context29.next = 262;
            return regeneratorRuntime.awrap(this.token.mint(this.vault.address, 3000));

          case 262:
            _context29.t104 = expect;
            _context29.next = 265;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 265:
            _context29.t105 = _context29.sent;
            (0, _context29.t104)(_context29.t105).to.be.bignumber.equal('3333');
            _context29.t106 = expect;
            _context29.next = 270;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 270:
            _context29.t107 = _context29.sent;
            (0, _context29.t106)(_context29.t107).to.be.bignumber.equal('6000');
            _context29.t108 = expect;
            _context29.t109 = regeneratorRuntime;
            _context29.t110 = this.vault;
            _context29.next = 277;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 277:
            _context29.t111 = _context29.sent;
            _context29.t112 = _context29.t110.convertToAssets.call(_context29.t110, _context29.t111);
            _context29.next = 281;
            return _context29.t109.awrap.call(_context29.t109, _context29.t112);

          case 281:
            _context29.t113 = _context29.sent;
            (0, _context29.t108)(_context29.t113).to.be.bignumber.equal('6071');
            _context29.t114 = expect;
            _context29.t115 = regeneratorRuntime;
            _context29.t116 = this.vault;
            _context29.next = 288;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 288:
            _context29.t117 = _context29.sent;
            _context29.t118 = _context29.t116.convertToAssets.call(_context29.t116, _context29.t117);
            _context29.next = 292;
            return _context29.t115.awrap.call(_context29.t115, _context29.t118);

          case 292:
            _context29.t119 = _context29.sent;
            (0, _context29.t114)(_context29.t119).to.be.bignumber.equal('10929');
            _context29.t120 = expect;
            _context29.next = 297;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 297:
            _context29.t121 = _context29.sent;
            (0, _context29.t120)(_context29.t121).to.be.bignumber.equal('9333');
            _context29.t122 = expect;
            _context29.next = 302;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 302:
            _context29.t123 = _context29.sent;
            (0, _context29.t122)(_context29.t123).to.be.bignumber.equal('17001');
            _context29.next = 306;
            return regeneratorRuntime.awrap(this.vault.redeem(1333, user1, user1, {
              from: user1
            }));

          case 306:
            _ref21 = _context29.sent;
            _tx4 = _ref21.tx;
            expectEvent.inTransaction(_tx4, this.vault, 'Transfer', {
              from: user1,
              to: constants.ZERO_ADDRESS,
              value: '1333'
            });
            expectEvent.inTransaction(_tx4, this.token, 'Transfer', {
              from: this.vault.address,
              to: user1,
              value: '2428'
            });
            _context29.t124 = expect;
            _context29.next = 313;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 313:
            _context29.t125 = _context29.sent;
            (0, _context29.t124)(_context29.t125).to.be.bignumber.equal('2000');
            _context29.t126 = expect;
            _context29.next = 318;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 318:
            _context29.t127 = _context29.sent;
            (0, _context29.t126)(_context29.t127).to.be.bignumber.equal('6000');
            _context29.t128 = expect;
            _context29.t129 = regeneratorRuntime;
            _context29.t130 = this.vault;
            _context29.next = 325;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 325:
            _context29.t131 = _context29.sent;
            _context29.t132 = _context29.t130.convertToAssets.call(_context29.t130, _context29.t131);
            _context29.next = 329;
            return _context29.t129.awrap.call(_context29.t129, _context29.t132);

          case 329:
            _context29.t133 = _context29.sent;
            (0, _context29.t128)(_context29.t133).to.be.bignumber.equal('3643');
            _context29.t134 = expect;
            _context29.t135 = regeneratorRuntime;
            _context29.t136 = this.vault;
            _context29.next = 336;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 336:
            _context29.t137 = _context29.sent;
            _context29.t138 = _context29.t136.convertToAssets.call(_context29.t136, _context29.t137);
            _context29.next = 340;
            return _context29.t135.awrap.call(_context29.t135, _context29.t138);

          case 340:
            _context29.t139 = _context29.sent;
            (0, _context29.t134)(_context29.t139).to.be.bignumber.equal('10929');
            _context29.t140 = expect;
            _context29.next = 345;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 345:
            _context29.t141 = _context29.sent;
            (0, _context29.t140)(_context29.t141).to.be.bignumber.equal('8000');
            _context29.t142 = expect;
            _context29.next = 350;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 350:
            _context29.t143 = _context29.sent;
            (0, _context29.t142)(_context29.t143).to.be.bignumber.equal('14573');
            _context29.next = 354;
            return regeneratorRuntime.awrap(this.vault.withdraw(2929, user2, user2, {
              from: user2
            }));

          case 354:
            _ref22 = _context29.sent;
            _tx5 = _ref22.tx;
            expectEvent.inTransaction(_tx5, this.vault, 'Transfer', {
              from: user2,
              to: constants.ZERO_ADDRESS,
              value: '1608'
            });
            expectEvent.inTransaction(_tx5, this.token, 'Transfer', {
              from: this.vault.address,
              to: user2,
              value: '2929'
            });
            _context29.t144 = expect;
            _context29.next = 361;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 361:
            _context29.t145 = _context29.sent;
            (0, _context29.t144)(_context29.t145).to.be.bignumber.equal('2000');
            _context29.t146 = expect;
            _context29.next = 366;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 366:
            _context29.t147 = _context29.sent;
            (0, _context29.t146)(_context29.t147).to.be.bignumber.equal('4392');
            _context29.t148 = expect;
            _context29.t149 = regeneratorRuntime;
            _context29.t150 = this.vault;
            _context29.next = 373;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 373:
            _context29.t151 = _context29.sent;
            _context29.t152 = _context29.t150.convertToAssets.call(_context29.t150, _context29.t151);
            _context29.next = 377;
            return _context29.t149.awrap.call(_context29.t149, _context29.t152);

          case 377:
            _context29.t153 = _context29.sent;
            (0, _context29.t148)(_context29.t153).to.be.bignumber.equal('3643');
            _context29.t154 = expect;
            _context29.t155 = regeneratorRuntime;
            _context29.t156 = this.vault;
            _context29.next = 384;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 384:
            _context29.t157 = _context29.sent;
            _context29.t158 = _context29.t156.convertToAssets.call(_context29.t156, _context29.t157);
            _context29.next = 388;
            return _context29.t155.awrap.call(_context29.t155, _context29.t158);

          case 388:
            _context29.t159 = _context29.sent;
            (0, _context29.t154)(_context29.t159).to.be.bignumber.equal('8000');
            _context29.t160 = expect;
            _context29.next = 393;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 393:
            _context29.t161 = _context29.sent;
            (0, _context29.t160)(_context29.t161).to.be.bignumber.equal('6392');
            _context29.t162 = expect;
            _context29.next = 398;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 398:
            _context29.t163 = _context29.sent;
            (0, _context29.t162)(_context29.t163).to.be.bignumber.equal('11644');
            _context29.next = 402;
            return regeneratorRuntime.awrap(this.vault.withdraw(3643, user1, user1, {
              from: user1
            }));

          case 402:
            _ref23 = _context29.sent;
            _tx6 = _ref23.tx;
            expectEvent.inTransaction(_tx6, this.vault, 'Transfer', {
              from: user1,
              to: constants.ZERO_ADDRESS,
              value: '2000'
            });
            expectEvent.inTransaction(_tx6, this.token, 'Transfer', {
              from: this.vault.address,
              to: user1,
              value: '3643'
            });
            _context29.t164 = expect;
            _context29.next = 409;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 409:
            _context29.t165 = _context29.sent;
            (0, _context29.t164)(_context29.t165).to.be.bignumber.equal('0');
            _context29.t166 = expect;
            _context29.next = 414;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 414:
            _context29.t167 = _context29.sent;
            (0, _context29.t166)(_context29.t167).to.be.bignumber.equal('4392');
            _context29.t168 = expect;
            _context29.t169 = regeneratorRuntime;
            _context29.t170 = this.vault;
            _context29.next = 421;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 421:
            _context29.t171 = _context29.sent;
            _context29.t172 = _context29.t170.convertToAssets.call(_context29.t170, _context29.t171);
            _context29.next = 425;
            return _context29.t169.awrap.call(_context29.t169, _context29.t172);

          case 425:
            _context29.t173 = _context29.sent;
            (0, _context29.t168)(_context29.t173).to.be.bignumber.equal('0');
            _context29.t174 = expect;
            _context29.t175 = regeneratorRuntime;
            _context29.t176 = this.vault;
            _context29.next = 432;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 432:
            _context29.t177 = _context29.sent;
            _context29.t178 = _context29.t176.convertToAssets.call(_context29.t176, _context29.t177);
            _context29.next = 436;
            return _context29.t175.awrap.call(_context29.t175, _context29.t178);

          case 436:
            _context29.t179 = _context29.sent;
            (0, _context29.t174)(_context29.t179).to.be.bignumber.equal('8001');
            _context29.t180 = expect;
            _context29.next = 441;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 441:
            _context29.t181 = _context29.sent;
            (0, _context29.t180)(_context29.t181).to.be.bignumber.equal('4392');
            _context29.t182 = expect;
            _context29.next = 446;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 446:
            _context29.t183 = _context29.sent;
            (0, _context29.t182)(_context29.t183).to.be.bignumber.equal('8001');
            _context29.next = 450;
            return regeneratorRuntime.awrap(this.vault.redeem(4392, user2, user2, {
              from: user2
            }));

          case 450:
            _ref24 = _context29.sent;
            _tx7 = _ref24.tx;
            expectEvent.inTransaction(_tx7, this.vault, 'Transfer', {
              from: user2,
              to: constants.ZERO_ADDRESS,
              value: '4392'
            });
            expectEvent.inTransaction(_tx7, this.token, 'Transfer', {
              from: this.vault.address,
              to: user2,
              value: '8001'
            });
            _context29.t184 = expect;
            _context29.next = 457;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 457:
            _context29.t185 = _context29.sent;
            (0, _context29.t184)(_context29.t185).to.be.bignumber.equal('0');
            _context29.t186 = expect;
            _context29.next = 462;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 462:
            _context29.t187 = _context29.sent;
            (0, _context29.t186)(_context29.t187).to.be.bignumber.equal('0');
            _context29.t188 = expect;
            _context29.t189 = regeneratorRuntime;
            _context29.t190 = this.vault;
            _context29.next = 469;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user1));

          case 469:
            _context29.t191 = _context29.sent;
            _context29.t192 = _context29.t190.convertToAssets.call(_context29.t190, _context29.t191);
            _context29.next = 473;
            return _context29.t189.awrap.call(_context29.t189, _context29.t192);

          case 473:
            _context29.t193 = _context29.sent;
            (0, _context29.t188)(_context29.t193).to.be.bignumber.equal('0');
            _context29.t194 = expect;
            _context29.t195 = regeneratorRuntime;
            _context29.t196 = this.vault;
            _context29.next = 480;
            return regeneratorRuntime.awrap(this.vault.balanceOf(user2));

          case 480:
            _context29.t197 = _context29.sent;
            _context29.t198 = _context29.t196.convertToAssets.call(_context29.t196, _context29.t197);
            _context29.next = 484;
            return _context29.t195.awrap.call(_context29.t195, _context29.t198);

          case 484:
            _context29.t199 = _context29.sent;
            (0, _context29.t194)(_context29.t199).to.be.bignumber.equal('0');
            _context29.t200 = expect;
            _context29.next = 489;
            return regeneratorRuntime.awrap(this.vault.totalSupply());

          case 489:
            _context29.t201 = _context29.sent;
            (0, _context29.t200)(_context29.t201).to.be.bignumber.equal('0');
            _context29.t202 = expect;
            _context29.next = 494;
            return regeneratorRuntime.awrap(this.vault.totalAssets());

          case 494:
            _context29.t203 = _context29.sent;
            (0, _context29.t202)(_context29.t203).to.be.bignumber.equal('0');

          case 496:
          case "end":
            return _context29.stop();
        }
      }
    }, null, this);
  });
});