"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC20PausableMock = artifacts.require('ERC20PausableMock');

contract('ERC20Pausable', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      holder = _accounts[0],
      recipient = _accounts[1],
      anotherAccount = _accounts[2];

  var initialSupply = new BN(100);
  var name = 'My Token';
  var symbol = 'MTKN';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20PausableMock["new"](name, symbol, holder, initialSupply));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('pausable token', function () {
    describe('transfer', function () {
      it('allows to transfer when unpaused', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(this.token.transfer(recipient, initialSupply, {
                  from: holder
                }));

              case 2:
                _context2.t0 = expect;
                _context2.next = 5;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 5:
                _context2.t1 = _context2.sent;
                (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('0');
                _context2.t2 = expect;
                _context2.next = 10;
                return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

              case 10:
                _context2.t3 = _context2.sent;
                _context2.t4 = initialSupply;
                (0, _context2.t2)(_context2.t3).to.be.bignumber.equal(_context2.t4);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      });
      it('allows to transfer when paused and then unpaused', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context3.next = 4;
                return regeneratorRuntime.awrap(this.token.unpause());

              case 4:
                _context3.next = 6;
                return regeneratorRuntime.awrap(this.token.transfer(recipient, initialSupply, {
                  from: holder
                }));

              case 6:
                _context3.t0 = expect;
                _context3.next = 9;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 9:
                _context3.t1 = _context3.sent;
                (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('0');
                _context3.t2 = expect;
                _context3.next = 14;
                return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

              case 14:
                _context3.t3 = _context3.sent;
                _context3.t4 = initialSupply;
                (0, _context3.t2)(_context3.t3).to.be.bignumber.equal(_context3.t4);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('reverts when trying to transfer when paused', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context4.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.transfer(recipient, initialSupply, {
                  from: holder
                }), 'ERC20Pausable: token transfer while paused'));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
    });
    describe('transfer from', function () {
      var allowance = new BN(40);
      beforeEach(function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(this.token.approve(anotherAccount, allowance, {
                  from: holder
                }));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('allows to transfer from when unpaused', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(this.token.transferFrom(holder, recipient, allowance, {
                  from: anotherAccount
                }));

              case 2:
                _context6.t0 = expect;
                _context6.next = 5;
                return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

              case 5:
                _context6.t1 = _context6.sent;
                _context6.t2 = allowance;
                (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);
                _context6.t3 = expect;
                _context6.next = 11;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 11:
                _context6.t4 = _context6.sent;
                _context6.t5 = initialSupply.sub(allowance);
                (0, _context6.t3)(_context6.t4).to.be.bignumber.equal(_context6.t5);

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('allows to transfer when paused and then unpaused', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap(this.token.unpause());

              case 4:
                _context7.next = 6;
                return regeneratorRuntime.awrap(this.token.transferFrom(holder, recipient, allowance, {
                  from: anotherAccount
                }));

              case 6:
                _context7.t0 = expect;
                _context7.next = 9;
                return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

              case 9:
                _context7.t1 = _context7.sent;
                _context7.t2 = allowance;
                (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);
                _context7.t3 = expect;
                _context7.next = 15;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 15:
                _context7.t4 = _context7.sent;
                _context7.t5 = initialSupply.sub(allowance);
                (0, _context7.t3)(_context7.t4).to.be.bignumber.equal(_context7.t5);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('reverts when trying to transfer from when paused', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context8.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.transferFrom(holder, recipient, allowance, {
                  from: anotherAccount
                }), 'ERC20Pausable: token transfer while paused'));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
    describe('mint', function () {
      var amount = new BN('42');
      it('allows to mint when unpaused', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(recipient, amount));

              case 2:
                _context9.t0 = expect;
                _context9.next = 5;
                return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

              case 5:
                _context9.t1 = _context9.sent;
                _context9.t2 = amount;
                (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('allows to mint when paused and then unpaused', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context10.next = 4;
                return regeneratorRuntime.awrap(this.token.unpause());

              case 4:
                _context10.next = 6;
                return regeneratorRuntime.awrap(this.token.mint(recipient, amount));

              case 6:
                _context10.t0 = expect;
                _context10.next = 9;
                return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

              case 9:
                _context10.t1 = _context10.sent;
                _context10.t2 = amount;
                (0, _context10.t0)(_context10.t1).to.be.bignumber.equal(_context10.t2);

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('reverts when trying to mint when paused', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context11.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.mint(recipient, amount), 'ERC20Pausable: token transfer while paused'));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
    describe('burn', function () {
      var amount = new BN('42');
      it('allows to burn when unpaused', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(this.token.burn(holder, amount));

              case 2:
                _context12.t0 = expect;
                _context12.next = 5;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 5:
                _context12.t1 = _context12.sent;
                _context12.t2 = initialSupply.sub(amount);
                (0, _context12.t0)(_context12.t1).to.be.bignumber.equal(_context12.t2);

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('allows to burn when paused and then unpaused', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context13.next = 4;
                return regeneratorRuntime.awrap(this.token.unpause());

              case 4:
                _context13.next = 6;
                return regeneratorRuntime.awrap(this.token.burn(holder, amount));

              case 6:
                _context13.t0 = expect;
                _context13.next = 9;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 9:
                _context13.t1 = _context13.sent;
                _context13.t2 = initialSupply.sub(amount);
                (0, _context13.t0)(_context13.t1).to.be.bignumber.equal(_context13.t2);

              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('reverts when trying to burn when paused', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(this.token.pause());

              case 2:
                _context14.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.burn(holder, amount), 'ERC20Pausable: token transfer while paused'));

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
    });
  });
});