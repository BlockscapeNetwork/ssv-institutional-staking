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

var ZERO_ADDRESS = constants.ZERO_ADDRESS,
    MAX_UINT256 = constants.MAX_UINT256;

var _require3 = require('../ERC20.behavior'),
    shouldBehaveLikeERC20 = _require3.shouldBehaveLikeERC20;

var NotAnERC20 = artifacts.require('CallReceiverMock');

var ERC20Mock = artifacts.require('ERC20DecimalsMock');

var ERC20WrapperMock = artifacts.require('ERC20WrapperMock');

contract('ERC20', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      initialHolder = _accounts[0],
      recipient = _accounts[1],
      anotherAccount = _accounts[2];

  var name = 'My Token';
  var symbol = 'MTKN';
  var initialSupply = new BN(100);
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20Mock["new"](name, symbol, 9));

          case 2:
            this.underlying = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(ERC20WrapperMock["new"](this.underlying.address, "Wrapped ".concat(name), "W".concat(symbol)));

          case 5:
            this.token = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(this.underlying.mint(initialHolder, initialSupply));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  afterEach(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t1 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.underlying.balanceOf(this.token.address));

          case 3:
            _context2.t2 = _context2.sent;
            _context2.t0 = (0, _context2.t1)(_context2.t2).to.be.bignumber;
            _context2.next = 7;
            return regeneratorRuntime.awrap(this.token.totalSupply());

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
  it('has a name', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.token.name());

          case 3:
            _context3.t1 = _context3.sent;
            _context3.t2 = "Wrapped ".concat(name);
            (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('has a symbol', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = expect;
            _context4.next = 3;
            return regeneratorRuntime.awrap(this.token.symbol());

          case 3:
            _context4.t1 = _context4.sent;
            _context4.t2 = "W".concat(symbol);
            (0, _context4.t0)(_context4.t1).to.equal(_context4.t2);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('has the same decimals as the underlying token', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = expect;
            _context5.next = 3;
            return regeneratorRuntime.awrap(this.token.decimals());

          case 3:
            _context5.t1 = _context5.sent;
            (0, _context5.t0)(_context5.t1).to.be.bignumber.equal('9');

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  it('decimals default back to 18 if token has no metadata', function _callee6() {
    var noDecimals, otherToken;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(NotAnERC20["new"]());

          case 2:
            noDecimals = _context6.sent;
            _context6.next = 5;
            return regeneratorRuntime.awrap(ERC20WrapperMock["new"](noDecimals.address, "Wrapped ".concat(name), "W".concat(symbol)));

          case 5:
            otherToken = _context6.sent;
            _context6.t0 = expect;
            _context6.next = 9;
            return regeneratorRuntime.awrap(otherToken.decimals());

          case 9:
            _context6.t1 = _context6.sent;
            (0, _context6.t0)(_context6.t1).to.be.bignumber.equal('18');

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it('has underlying', function _callee7() {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.t0 = expect;
            _context7.next = 3;
            return regeneratorRuntime.awrap(this.token.underlying());

          case 3:
            _context7.t1 = _context7.sent;
            _context7.t2 = this.underlying.address;
            (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, null, this);
  });
  describe('deposit', function () {
    it('valid', function _callee8() {
      var _ref, tx;

      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.underlying.approve(this.token.address, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.token.depositFor(initialHolder, initialSupply, {
                from: initialHolder
              }));

            case 4:
              _ref = _context8.sent;
              tx = _ref.tx;
              _context8.next = 8;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.underlying, 'Transfer', {
                from: initialHolder,
                to: this.token.address,
                value: initialSupply
              }));

            case 8:
              _context8.next = 10;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: ZERO_ADDRESS,
                to: initialHolder,
                value: initialSupply
              }));

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('missing approval', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.depositFor(initialHolder, initialSupply, {
                from: initialHolder
              }), 'ERC20: insufficient allowance'));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('missing balance', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.underlying.approve(this.token.address, MAX_UINT256, {
                from: initialHolder
              }));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.token.depositFor(initialHolder, MAX_UINT256, {
                from: initialHolder
              }), 'ERC20: transfer amount exceeds balance'));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('to other account', function _callee11() {
      var _ref2, tx;

      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.underlying.approve(this.token.address, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _context11.next = 4;
              return regeneratorRuntime.awrap(this.token.depositFor(anotherAccount, initialSupply, {
                from: initialHolder
              }));

            case 4:
              _ref2 = _context11.sent;
              tx = _ref2.tx;
              _context11.next = 8;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.underlying, 'Transfer', {
                from: initialHolder,
                to: this.token.address,
                value: initialSupply
              }));

            case 8:
              _context11.next = 10;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: ZERO_ADDRESS,
                to: anotherAccount,
                value: initialSupply
              }));

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
  });
  describe('withdraw', function () {
    beforeEach(function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.underlying.approve(this.token.address, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _context12.next = 4;
              return regeneratorRuntime.awrap(this.token.depositFor(initialHolder, initialSupply, {
                from: initialHolder
              }));

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    it('missing balance', function _callee13() {
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.withdrawTo(initialHolder, MAX_UINT256, {
                from: initialHolder
              }), 'ERC20: burn amount exceeds balance'));

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
    it('valid', function _callee14() {
      var value, _ref3, tx;

      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              value = new BN(42);
              _context14.next = 3;
              return regeneratorRuntime.awrap(this.token.withdrawTo(initialHolder, value, {
                from: initialHolder
              }));

            case 3:
              _ref3 = _context14.sent;
              tx = _ref3.tx;
              _context14.next = 7;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.underlying, 'Transfer', {
                from: this.token.address,
                to: initialHolder,
                value: value
              }));

            case 7:
              _context14.next = 9;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: initialHolder,
                to: ZERO_ADDRESS,
                value: value
              }));

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    it('entire balance', function _callee15() {
      var _ref4, tx;

      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.token.withdrawTo(initialHolder, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _ref4 = _context15.sent;
              tx = _ref4.tx;
              _context15.next = 6;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.underlying, 'Transfer', {
                from: this.token.address,
                to: initialHolder,
                value: initialSupply
              }));

            case 6:
              _context15.next = 8;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: initialHolder,
                to: ZERO_ADDRESS,
                value: initialSupply
              }));

            case 8:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
    it('to other account', function _callee16() {
      var _ref5, tx;

      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.token.withdrawTo(anotherAccount, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _ref5 = _context16.sent;
              tx = _ref5.tx;
              _context16.next = 6;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.underlying, 'Transfer', {
                from: this.token.address,
                to: anotherAccount,
                value: initialSupply
              }));

            case 6:
              _context16.next = 8;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: initialHolder,
                to: ZERO_ADDRESS,
                value: initialSupply
              }));

            case 8:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
  });
  describe('recover', function () {
    it('nothing to recover', function _callee17() {
      var _ref6, tx;

      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.underlying.approve(this.token.address, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _context17.next = 4;
              return regeneratorRuntime.awrap(this.token.depositFor(initialHolder, initialSupply, {
                from: initialHolder
              }));

            case 4:
              _context17.next = 6;
              return regeneratorRuntime.awrap(this.token.recover(anotherAccount));

            case 6:
              _ref6 = _context17.sent;
              tx = _ref6.tx;
              _context17.next = 10;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: ZERO_ADDRESS,
                to: anotherAccount,
                value: '0'
              }));

            case 10:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('something to recover', function _callee18() {
      var _ref7, tx;

      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.underlying.transfer(this.token.address, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _context18.next = 4;
              return regeneratorRuntime.awrap(this.token.recover(anotherAccount));

            case 4:
              _ref7 = _context18.sent;
              tx = _ref7.tx;
              _context18.next = 8;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, this.token, 'Transfer', {
                from: ZERO_ADDRESS,
                to: anotherAccount,
                value: initialSupply
              }));

            case 8:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
  });
  describe('erc20 behaviour', function () {
    beforeEach(function _callee19() {
      return regeneratorRuntime.async(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.underlying.approve(this.token.address, initialSupply, {
                from: initialHolder
              }));

            case 2:
              _context19.next = 4;
              return regeneratorRuntime.awrap(this.token.depositFor(initialHolder, initialSupply, {
                from: initialHolder
              }));

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeERC20('ERC20', initialSupply, initialHolder, recipient, anotherAccount);
  });
});