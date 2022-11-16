"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    balance = _require.balance,
    ether = _require.ether,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

function shouldBehaveLikeEscrow(owner, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      payee1 = _ref2[0],
      payee2 = _ref2[1];

  var amount = ether('42');
  describe('as an escrow', function () {
    describe('deposits', function () {
      it('can accept a single deposit', function _callee() {
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                  from: owner,
                  value: amount
                }));

              case 2:
                _context.t0 = expect;
                _context.next = 5;
                return regeneratorRuntime.awrap(balance.current(this.escrow.address));

              case 5:
                _context.t1 = _context.sent;
                _context.t2 = amount;
                (0, _context.t0)(_context.t1).to.be.bignumber.equal(_context.t2);
                _context.t3 = expect;
                _context.next = 11;
                return regeneratorRuntime.awrap(this.escrow.depositsOf(payee1));

              case 11:
                _context.t4 = _context.sent;
                _context.t5 = amount;
                (0, _context.t3)(_context.t4).to.be.bignumber.equal(_context.t5);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      });
      it('can accept an empty deposit', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                  from: owner,
                  value: 0
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      });
      it('only the owner can deposit', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.escrow.deposit(payee1, {
                  from: payee2
                }), 'Ownable: caller is not the owner'));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('emits a deposited event', function _callee4() {
        var receipt;
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                  from: owner,
                  value: amount
                }));

              case 2:
                receipt = _context4.sent;
                expectEvent(receipt, 'Deposited', {
                  payee: payee1,
                  weiAmount: amount
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('can add multiple deposits on a single account', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                  from: owner,
                  value: amount
                }));

              case 2:
                _context5.next = 4;
                return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                  from: owner,
                  value: amount.muln(2)
                }));

              case 4:
                _context5.t0 = expect;
                _context5.next = 7;
                return regeneratorRuntime.awrap(balance.current(this.escrow.address));

              case 7:
                _context5.t1 = _context5.sent;
                _context5.t2 = amount.muln(3);
                (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);
                _context5.t3 = expect;
                _context5.next = 13;
                return regeneratorRuntime.awrap(this.escrow.depositsOf(payee1));

              case 13:
                _context5.t4 = _context5.sent;
                _context5.t5 = amount.muln(3);
                (0, _context5.t3)(_context5.t4).to.be.bignumber.equal(_context5.t5);

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('can track deposits to multiple accounts', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                  from: owner,
                  value: amount
                }));

              case 2:
                _context6.next = 4;
                return regeneratorRuntime.awrap(this.escrow.deposit(payee2, {
                  from: owner,
                  value: amount.muln(2)
                }));

              case 4:
                _context6.t0 = expect;
                _context6.next = 7;
                return regeneratorRuntime.awrap(balance.current(this.escrow.address));

              case 7:
                _context6.t1 = _context6.sent;
                _context6.t2 = amount.muln(3);
                (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);
                _context6.t3 = expect;
                _context6.next = 13;
                return regeneratorRuntime.awrap(this.escrow.depositsOf(payee1));

              case 13:
                _context6.t4 = _context6.sent;
                _context6.t5 = amount;
                (0, _context6.t3)(_context6.t4).to.be.bignumber.equal(_context6.t5);
                _context6.t6 = expect;
                _context6.next = 19;
                return regeneratorRuntime.awrap(this.escrow.depositsOf(payee2));

              case 19:
                _context6.t7 = _context6.sent;
                _context6.t8 = amount.muln(2);
                (0, _context6.t6)(_context6.t7).to.be.bignumber.equal(_context6.t8);

              case 22:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    describe('withdrawals', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              it('can withdraw payments', function _callee7() {
                var balanceTracker;
                return regeneratorRuntime.async(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return regeneratorRuntime.awrap(balance.tracker(payee1));

                      case 2:
                        balanceTracker = _context7.sent;
                        _context7.next = 5;
                        return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                          from: owner,
                          value: amount
                        }));

                      case 5:
                        _context7.next = 7;
                        return regeneratorRuntime.awrap(this.escrow.withdraw(payee1, {
                          from: owner
                        }));

                      case 7:
                        _context7.t0 = expect;
                        _context7.next = 10;
                        return regeneratorRuntime.awrap(balanceTracker.delta());

                      case 10:
                        _context7.t1 = _context7.sent;
                        _context7.t2 = amount;
                        (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);
                        _context7.t3 = expect;
                        _context7.next = 16;
                        return regeneratorRuntime.awrap(balance.current(this.escrow.address));

                      case 16:
                        _context7.t4 = _context7.sent;
                        (0, _context7.t3)(_context7.t4).to.be.bignumber.equal('0');
                        _context7.t5 = expect;
                        _context7.next = 21;
                        return regeneratorRuntime.awrap(this.escrow.depositsOf(payee1));

                      case 21:
                        _context7.t6 = _context7.sent;
                        (0, _context7.t5)(_context7.t6).to.be.bignumber.equal('0');

                      case 23:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, null, this);
              });
              it('can do an empty withdrawal', function _callee8() {
                return regeneratorRuntime.async(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return regeneratorRuntime.awrap(this.escrow.withdraw(payee1, {
                          from: owner
                        }));

                      case 2:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, null, this);
              });
              it('only the owner can withdraw', function _callee9() {
                return regeneratorRuntime.async(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.escrow.withdraw(payee1, {
                          from: payee1
                        }), 'Ownable: caller is not the owner'));

                      case 2:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, null, this);
              });
              it('emits a withdrawn event', function _callee10() {
                var receipt;
                return regeneratorRuntime.async(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return regeneratorRuntime.awrap(this.escrow.deposit(payee1, {
                          from: owner,
                          value: amount
                        }));

                      case 2:
                        _context10.next = 4;
                        return regeneratorRuntime.awrap(this.escrow.withdraw(payee1, {
                          from: owner
                        }));

                      case 4:
                        receipt = _context10.sent;
                        expectEvent(receipt, 'Withdrawn', {
                          payee: payee1,
                          weiAmount: amount
                        });

                      case 6:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, null, this);
              });

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeEscrow: shouldBehaveLikeEscrow
};