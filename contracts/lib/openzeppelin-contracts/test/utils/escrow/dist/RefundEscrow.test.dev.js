"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    balance = _require.balance,
    constants = _require.constants,
    ether = _require.ether,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var RefundEscrow = artifacts.require('RefundEscrow');

contract('RefundEscrow', function (accounts) {
  var _accounts = _slicedToArray(accounts, 4),
      owner = _accounts[0],
      beneficiary = _accounts[1],
      refundee1 = _accounts[2],
      refundee2 = _accounts[3];

  var amount = ether('54');
  var refundees = [refundee1, refundee2];
  it('requires a non-null beneficiary', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(expectRevert(RefundEscrow["new"](ZERO_ADDRESS, {
              from: owner
            }), 'RefundEscrow: beneficiary is the zero address'));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  context('once deployed', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(RefundEscrow["new"](beneficiary, {
                from: owner
              }));

            case 2:
              this.escrow = _context2.sent;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    context('active state', function () {
      it('has beneficiary and state', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = expect;
                _context3.next = 3;
                return regeneratorRuntime.awrap(this.escrow.beneficiary());

              case 3:
                _context3.t1 = _context3.sent;
                _context3.t2 = beneficiary;
                (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);
                _context3.t3 = expect;
                _context3.next = 9;
                return regeneratorRuntime.awrap(this.escrow.state());

              case 9:
                _context3.t4 = _context3.sent;
                (0, _context3.t3)(_context3.t4).to.be.bignumber.equal('0');

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('accepts deposits', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(refundee1, {
                  from: owner,
                  value: amount
                }));

              case 2:
                _context4.t0 = expect;
                _context4.next = 5;
                return regeneratorRuntime.awrap(this.escrow.depositsOf(refundee1));

              case 5:
                _context4.t1 = _context4.sent;
                _context4.t2 = amount;
                (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('does not refund refundees', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(refundee1, {
                  from: owner,
                  value: amount
                }));

              case 2:
                _context5.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.withdraw(refundee1), 'ConditionalEscrow: payee is not allowed to withdraw'));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('does not allow beneficiary withdrawal', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(refundee1, {
                  from: owner,
                  value: amount
                }));

              case 2:
                _context6.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.beneficiaryWithdraw(), 'RefundEscrow: beneficiary can only withdraw while closed'));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    it('only the owner can enter closed state', function _callee7() {
      var receipt;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.escrow.close({
                from: beneficiary
              }), 'Ownable: caller is not the owner'));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.escrow.close({
                from: owner
              }));

            case 4:
              receipt = _context7.sent;
              expectEvent(receipt, 'RefundsClosed');

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    context('closed state', function () {
      beforeEach(function _callee8() {
        var _this = this;

        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(Promise.all(refundees.map(function (refundee) {
                  return _this.escrow.deposit(refundee, {
                    from: owner,
                    value: amount
                  });
                })));

              case 2:
                _context8.next = 4;
                return regeneratorRuntime.awrap(this.escrow.close({
                  from: owner
                }));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('rejects deposits', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.deposit(refundee1, {
                  from: owner,
                  value: amount
                }), 'RefundEscrow: can only deposit while active'));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('does not refund refundees', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.withdraw(refundee1), 'ConditionalEscrow: payee is not allowed to withdraw'));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('allows beneficiary withdrawal', function _callee11() {
        var balanceTracker;
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(balance.tracker(beneficiary));

              case 2:
                balanceTracker = _context11.sent;
                _context11.next = 5;
                return regeneratorRuntime.awrap(this.escrow.beneficiaryWithdraw());

              case 5:
                _context11.t0 = expect;
                _context11.next = 8;
                return regeneratorRuntime.awrap(balanceTracker.delta());

              case 8:
                _context11.t1 = _context11.sent;
                _context11.t2 = amount.muln(refundees.length);
                (0, _context11.t0)(_context11.t1).to.be.bignumber.equal(_context11.t2);

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('prevents entering the refund state', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.enableRefunds({
                  from: owner
                }), 'RefundEscrow: can only enable refunds while active'));

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('prevents re-entering the closed state', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.close({
                  from: owner
                }), 'RefundEscrow: can only close while active'));

              case 2:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
    });
    it('only the owner can enter refund state', function _callee14() {
      var receipt;
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.escrow.enableRefunds({
                from: beneficiary
              }), 'Ownable: caller is not the owner'));

            case 2:
              _context14.next = 4;
              return regeneratorRuntime.awrap(this.escrow.enableRefunds({
                from: owner
              }));

            case 4:
              receipt = _context14.sent;
              expectEvent(receipt, 'RefundsEnabled');

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    context('refund state', function () {
      beforeEach(function _callee15() {
        var _this2 = this;

        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(Promise.all(refundees.map(function (refundee) {
                  return _this2.escrow.deposit(refundee, {
                    from: owner,
                    value: amount
                  });
                })));

              case 2:
                _context15.next = 4;
                return regeneratorRuntime.awrap(this.escrow.enableRefunds({
                  from: owner
                }));

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('rejects deposits', function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.deposit(refundee1, {
                  from: owner,
                  value: amount
                }), 'RefundEscrow: can only deposit while active'));

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      it('refunds refundees', function _callee17() {
        var _i2, _arr2, refundee, balanceTracker;

        return regeneratorRuntime.async(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _i2 = 0, _arr2 = [refundee1, refundee2];

              case 1:
                if (!(_i2 < _arr2.length)) {
                  _context17.next = 17;
                  break;
                }

                refundee = _arr2[_i2];
                _context17.next = 5;
                return regeneratorRuntime.awrap(balance.tracker(refundee));

              case 5:
                balanceTracker = _context17.sent;
                _context17.next = 8;
                return regeneratorRuntime.awrap(this.escrow.withdraw(refundee, {
                  from: owner
                }));

              case 8:
                _context17.t0 = expect;
                _context17.next = 11;
                return regeneratorRuntime.awrap(balanceTracker.delta());

              case 11:
                _context17.t1 = _context17.sent;
                _context17.t2 = amount;
                (0, _context17.t0)(_context17.t1).to.be.bignumber.equal(_context17.t2);

              case 14:
                _i2++;
                _context17.next = 1;
                break;

              case 17:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });
      it('does not allow beneficiary withdrawal', function _callee18() {
        return regeneratorRuntime.async(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.beneficiaryWithdraw(), 'RefundEscrow: beneficiary can only withdraw while closed'));

              case 2:
              case "end":
                return _context18.stop();
            }
          }
        }, null, this);
      });
      it('prevents entering the closed state', function _callee19() {
        return regeneratorRuntime.async(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.close({
                  from: owner
                }), 'RefundEscrow: can only close while active'));

              case 2:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
      it('prevents re-entering the refund state', function _callee20() {
        return regeneratorRuntime.async(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.enableRefunds({
                  from: owner
                }), 'RefundEscrow: can only enable refunds while active'));

              case 2:
              case "end":
                return _context20.stop();
            }
          }
        }, null, this);
      });
    });
  });
});