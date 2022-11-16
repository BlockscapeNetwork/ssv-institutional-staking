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

function shouldBehaveLikeERC20Burnable(owner, initialBalance, _ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      burner = _ref2[0];

  describe('burn', function () {
    describe('when the given amount is not greater than balance of the sender', function () {
      context('for a zero amount', function () {
        shouldBurn(new BN(0));
      });
      context('for a non-zero amount', function () {
        shouldBurn(new BN(100));
      });

      function shouldBurn(amount) {
        beforeEach(function _callee() {
          return regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(this.token.burn(amount, {
                    from: owner
                  }));

                case 2:
                  this.receipt = _context.sent;

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, null, this);
        });
        it('burns the requested amount', function _callee2() {
          return regeneratorRuntime.async(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = expect;
                  _context2.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                case 3:
                  _context2.t1 = _context2.sent;
                  _context2.t2 = initialBalance.sub(amount);
                  (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, null, this);
        });
        it('emits a transfer event', function _callee3() {
          return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  expectEvent(this.receipt, 'Transfer', {
                    from: owner,
                    to: ZERO_ADDRESS,
                    value: amount
                  });

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, null, this);
        });
      }
    });
    describe('when the given amount is greater than the balance of the sender', function () {
      var amount = initialBalance.addn(1);
      it('reverts', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.burn(amount, {
                  from: owner
                }), 'ERC20: burn amount exceeds balance'));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('burnFrom', function () {
    describe('on success', function () {
      context('for a zero amount', function () {
        shouldBurnFrom(new BN(0));
      });
      context('for a non-zero amount', function () {
        shouldBurnFrom(new BN(100));
      });

      function shouldBurnFrom(amount) {
        var originalAllowance = amount.muln(3);
        beforeEach(function _callee5() {
          return regeneratorRuntime.async(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return regeneratorRuntime.awrap(this.token.approve(burner, originalAllowance, {
                    from: owner
                  }));

                case 2:
                  _context5.next = 4;
                  return regeneratorRuntime.awrap(this.token.burnFrom(owner, amount, {
                    from: burner
                  }));

                case 4:
                  this.receipt = _context5.sent;

                case 5:
                case "end":
                  return _context5.stop();
              }
            }
          }, null, this);
        });
        it('burns the requested amount', function _callee6() {
          return regeneratorRuntime.async(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.t0 = expect;
                  _context6.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                case 3:
                  _context6.t1 = _context6.sent;
                  _context6.t2 = initialBalance.sub(amount);
                  (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);

                case 6:
                case "end":
                  return _context6.stop();
              }
            }
          }, null, this);
        });
        it('decrements allowance', function _callee7() {
          return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.t0 = expect;
                  _context7.next = 3;
                  return regeneratorRuntime.awrap(this.token.allowance(owner, burner));

                case 3:
                  _context7.t1 = _context7.sent;
                  _context7.t2 = originalAllowance.sub(amount);
                  (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);

                case 6:
                case "end":
                  return _context7.stop();
              }
            }
          }, null, this);
        });
        it('emits a transfer event', function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  expectEvent(this.receipt, 'Transfer', {
                    from: owner,
                    to: ZERO_ADDRESS,
                    value: amount
                  });

                case 1:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
      }
    });
    describe('when the given amount is greater than the balance of the sender', function () {
      var amount = initialBalance.addn(1);
      it('reverts', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.token.approve(burner, amount, {
                  from: owner
                }));

              case 2:
                _context9.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.burnFrom(owner, amount, {
                  from: burner
                }), 'ERC20: burn amount exceeds balance'));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
    });
    describe('when the given amount is greater than the allowance', function () {
      var allowance = new BN(100);
      it('reverts', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.token.approve(burner, allowance, {
                  from: owner
                }));

              case 2:
                _context10.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.burnFrom(owner, allowance.addn(1), {
                  from: burner
                }), 'ERC20: insufficient allowance'));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeERC20Burnable: shouldBehaveLikeERC20Burnable
};