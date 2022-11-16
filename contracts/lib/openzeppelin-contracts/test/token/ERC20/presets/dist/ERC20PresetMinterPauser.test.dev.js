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

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC20PresetMinterPauser = artifacts.require('ERC20PresetMinterPauser');

contract('ERC20PresetMinterPauser', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      deployer = _accounts[0],
      other = _accounts[1];

  var name = 'MinterPauserToken';
  var symbol = 'DRT';
  var amount = new BN('5000');
  var DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
  var MINTER_ROLE = web3.utils.soliditySha3('MINTER_ROLE');
  var PAUSER_ROLE = web3.utils.soliditySha3('PAUSER_ROLE');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20PresetMinterPauser["new"](name, symbol, {
              from: deployer
            }));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('deployer has the default admin role', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.token.getRoleMemberCount(DEFAULT_ADMIN_ROLE));

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('1');
            _context2.t2 = expect;
            _context2.next = 8;
            return regeneratorRuntime.awrap(this.token.getRoleMember(DEFAULT_ADMIN_ROLE, 0));

          case 8:
            _context2.t3 = _context2.sent;
            _context2.t4 = deployer;
            (0, _context2.t2)(_context2.t3).to.equal(_context2.t4);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('deployer has the minter role', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.token.getRoleMemberCount(MINTER_ROLE));

          case 3:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('1');
            _context3.t2 = expect;
            _context3.next = 8;
            return regeneratorRuntime.awrap(this.token.getRoleMember(MINTER_ROLE, 0));

          case 8:
            _context3.t3 = _context3.sent;
            _context3.t4 = deployer;
            (0, _context3.t2)(_context3.t3).to.equal(_context3.t4);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('deployer has the pauser role', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = expect;
            _context4.next = 3;
            return regeneratorRuntime.awrap(this.token.getRoleMemberCount(PAUSER_ROLE));

          case 3:
            _context4.t1 = _context4.sent;
            (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('1');
            _context4.t2 = expect;
            _context4.next = 8;
            return regeneratorRuntime.awrap(this.token.getRoleMember(PAUSER_ROLE, 0));

          case 8:
            _context4.t3 = _context4.sent;
            _context4.t4 = deployer;
            (0, _context4.t2)(_context4.t3).to.equal(_context4.t4);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('minter and pauser role admin is the default admin', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = expect;
            _context5.next = 3;
            return regeneratorRuntime.awrap(this.token.getRoleAdmin(MINTER_ROLE));

          case 3:
            _context5.t1 = _context5.sent;
            _context5.t2 = DEFAULT_ADMIN_ROLE;
            (0, _context5.t0)(_context5.t1).to.equal(_context5.t2);
            _context5.t3 = expect;
            _context5.next = 9;
            return regeneratorRuntime.awrap(this.token.getRoleAdmin(PAUSER_ROLE));

          case 9:
            _context5.t4 = _context5.sent;
            _context5.t5 = DEFAULT_ADMIN_ROLE;
            (0, _context5.t3)(_context5.t4).to.equal(_context5.t5);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  describe('minting', function () {
    it('deployer can mint tokens', function _callee6() {
      var receipt;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(other, amount, {
                from: deployer
              }));

            case 2:
              receipt = _context6.sent;
              expectEvent(receipt, 'Transfer', {
                from: ZERO_ADDRESS,
                to: other,
                value: amount
              });
              _context6.t0 = expect;
              _context6.next = 7;
              return regeneratorRuntime.awrap(this.token.balanceOf(other));

            case 7:
              _context6.t1 = _context6.sent;
              _context6.t2 = amount;
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('other accounts cannot mint tokens', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(other, amount, {
                from: other
              }), 'ERC20PresetMinterPauser: must have minter role to mint'));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
  });
  describe('pausing', function () {
    it('deployer can pause', function _callee8() {
      var receipt;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.token.pause({
                from: deployer
              }));

            case 2:
              receipt = _context8.sent;
              expectEvent(receipt, 'Paused', {
                account: deployer
              });
              _context8.t0 = expect;
              _context8.next = 7;
              return regeneratorRuntime.awrap(this.token.paused());

            case 7:
              _context8.t1 = _context8.sent;
              (0, _context8.t0)(_context8.t1).to.equal(true);

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('deployer can unpause', function _callee9() {
      var receipt;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.token.pause({
                from: deployer
              }));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.token.unpause({
                from: deployer
              }));

            case 4:
              receipt = _context9.sent;
              expectEvent(receipt, 'Unpaused', {
                account: deployer
              });
              _context9.t0 = expect;
              _context9.next = 9;
              return regeneratorRuntime.awrap(this.token.paused());

            case 9:
              _context9.t1 = _context9.sent;
              (0, _context9.t0)(_context9.t1).to.equal(false);

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('cannot mint while paused', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.token.pause({
                from: deployer
              }));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(other, amount, {
                from: deployer
              }), 'ERC20Pausable: token transfer while paused'));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('other accounts cannot pause', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.pause({
                from: other
              }), 'ERC20PresetMinterPauser: must have pauser role to pause'));

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    it('other accounts cannot unpause', function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.token.pause({
                from: deployer
              }));

            case 2:
              _context12.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.token.unpause({
                from: other
              }), 'ERC20PresetMinterPauser: must have pauser role to unpause'));

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
  });
  describe('burning', function () {
    it('holders can burn their tokens', function _callee13() {
      var receipt;
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(other, amount, {
                from: deployer
              }));

            case 2:
              _context13.next = 4;
              return regeneratorRuntime.awrap(this.token.burn(amount.subn(1), {
                from: other
              }));

            case 4:
              receipt = _context13.sent;
              expectEvent(receipt, 'Transfer', {
                from: other,
                to: ZERO_ADDRESS,
                value: amount.subn(1)
              });
              _context13.t0 = expect;
              _context13.next = 9;
              return regeneratorRuntime.awrap(this.token.balanceOf(other));

            case 9:
              _context13.t1 = _context13.sent;
              (0, _context13.t0)(_context13.t1).to.be.bignumber.equal('1');

            case 11:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
  });
});