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
    send = _require.send,
    expectRevert = _require.expectRevert;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var PaymentSplitter = artifacts.require('PaymentSplitter');

var Token = artifacts.require('ERC20Mock');

contract('PaymentSplitter', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      owner = _accounts[0],
      payee1 = _accounts[1],
      payee2 = _accounts[2],
      payee3 = _accounts[3],
      nonpayee1 = _accounts[4],
      payer1 = _accounts[5];

  var amount = ether('1');
  it('rejects an empty set of payees', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(expectRevert(PaymentSplitter["new"]([], []), 'PaymentSplitter: no payees'));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  it('rejects more payees than shares', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(expectRevert(PaymentSplitter["new"]([payee1, payee2, payee3], [20, 30]), 'PaymentSplitter: payees and shares length mismatch'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it('rejects more shares than payees', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(expectRevert(PaymentSplitter["new"]([payee1, payee2], [20, 30, 40]), 'PaymentSplitter: payees and shares length mismatch'));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it('rejects null payees', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(expectRevert(PaymentSplitter["new"]([payee1, ZERO_ADDRESS], [20, 30]), 'PaymentSplitter: account is the zero address'));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it('rejects zero-valued shares', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(expectRevert(PaymentSplitter["new"]([payee1, payee2], [20, 0]), 'PaymentSplitter: shares are 0'));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it('rejects repeated payees', function _callee6() {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(expectRevert(PaymentSplitter["new"]([payee1, payee1], [20, 30]), 'PaymentSplitter: account already has shares'));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  context('once deployed', function () {
    beforeEach(function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.payees = [payee1, payee2, payee3];
              this.shares = [20, 10, 70];
              _context7.next = 4;
              return regeneratorRuntime.awrap(PaymentSplitter["new"](this.payees, this.shares));

            case 4:
              this.contract = _context7.sent;
              _context7.next = 7;
              return regeneratorRuntime.awrap(Token["new"]('MyToken', 'MT', owner, ether('1000')));

            case 7:
              this.token = _context7.sent;

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('has total shares', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.t0 = expect;
              _context8.next = 3;
              return regeneratorRuntime.awrap(this.contract.totalShares());

            case 3:
              _context8.t1 = _context8.sent;
              (0, _context8.t0)(_context8.t1).to.be.bignumber.equal('100');

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('has payees', function _callee10() {
      var _this = this;

      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(Promise.all(this.payees.map(function _callee9(payee, index) {
                return regeneratorRuntime.async(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.t0 = expect;
                        _context9.next = 3;
                        return regeneratorRuntime.awrap(_this.contract.payee(index));

                      case 3:
                        _context9.t1 = _context9.sent;
                        _context9.t2 = payee;
                        (0, _context9.t0)(_context9.t1).to.equal(_context9.t2);
                        _context9.t3 = expect;
                        _context9.next = 9;
                        return regeneratorRuntime.awrap(_this.contract.released(payee));

                      case 9:
                        _context9.t4 = _context9.sent;
                        (0, _context9.t3)(_context9.t4).to.be.bignumber.equal('0');
                        _context9.t5 = expect;
                        _context9.next = 14;
                        return regeneratorRuntime.awrap(_this.contract.releasable(payee));

                      case 14:
                        _context9.t6 = _context9.sent;
                        (0, _context9.t5)(_context9.t6).to.be.bignumber.equal('0');

                      case 16:
                      case "end":
                        return _context9.stop();
                    }
                  }
                });
              })));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    describe('accepts payments', function () {
      it('Ether', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(send.ether(owner, this.contract.address, amount));

              case 2:
                _context11.t0 = expect;
                _context11.next = 5;
                return regeneratorRuntime.awrap(balance.current(this.contract.address));

              case 5:
                _context11.t1 = _context11.sent;
                _context11.t2 = amount;
                (0, _context11.t0)(_context11.t1).to.be.bignumber.equal(_context11.t2);

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('Token', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(this.token.transfer(this.contract.address, amount, {
                  from: owner
                }));

              case 2:
                _context12.t0 = expect;
                _context12.next = 5;
                return regeneratorRuntime.awrap(this.token.balanceOf(this.contract.address));

              case 5:
                _context12.t1 = _context12.sent;
                _context12.t2 = amount;
                (0, _context12.t0)(_context12.t1).to.be.bignumber.equal(_context12.t2);

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
    describe('shares', function () {
      it('stores shares if address is payee', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.t0 = expect;
                _context13.next = 3;
                return regeneratorRuntime.awrap(this.contract.shares(payee1));

              case 3:
                _context13.t1 = _context13.sent;
                (0, _context13.t0)(_context13.t1).to.be.bignumber.not.equal('0');

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('does not store shares if address is not payee', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.t0 = expect;
                _context14.next = 3;
                return regeneratorRuntime.awrap(this.contract.shares(nonpayee1));

              case 3:
                _context14.t1 = _context14.sent;
                (0, _context14.t0)(_context14.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
    });
    describe('release', function () {
      describe('Ether', function () {
        it('reverts if no funds to claim', function _callee15() {
          return regeneratorRuntime.async(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.contract.release(payee1), 'PaymentSplitter: account is not due payment'));

                case 2:
                case "end":
                  return _context15.stop();
              }
            }
          }, null, this);
        });
        it('reverts if non-payee want to claim', function _callee16() {
          return regeneratorRuntime.async(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.next = 2;
                  return regeneratorRuntime.awrap(send.ether(payer1, this.contract.address, amount));

                case 2:
                  _context16.next = 4;
                  return regeneratorRuntime.awrap(expectRevert(this.contract.release(nonpayee1), 'PaymentSplitter: account has no shares'));

                case 4:
                case "end":
                  return _context16.stop();
              }
            }
          }, null, this);
        });
      });
      describe('Token', function () {
        it('reverts if no funds to claim', function _callee17() {
          return regeneratorRuntime.async(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.contract.release(this.token.address, payee1), 'PaymentSplitter: account is not due payment'));

                case 2:
                case "end":
                  return _context17.stop();
              }
            }
          }, null, this);
        });
        it('reverts if non-payee want to claim', function _callee18() {
          return regeneratorRuntime.async(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return regeneratorRuntime.awrap(this.token.transfer(this.contract.address, amount, {
                    from: owner
                  }));

                case 2:
                  _context18.next = 4;
                  return regeneratorRuntime.awrap(expectRevert(this.contract.release(this.token.address, nonpayee1), 'PaymentSplitter: account has no shares'));

                case 4:
                case "end":
                  return _context18.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('tracks releasable and released', function () {
      it('Ether', function _callee19() {
        var payment;
        return regeneratorRuntime.async(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(send.ether(payer1, this.contract.address, amount));

              case 2:
                payment = amount.divn(10);
                _context19.t0 = expect;
                _context19.next = 6;
                return regeneratorRuntime.awrap(this.contract.releasable(payee2));

              case 6:
                _context19.t1 = _context19.sent;
                _context19.t2 = payment;
                (0, _context19.t0)(_context19.t1).to.be.bignumber.equal(_context19.t2);
                _context19.next = 11;
                return regeneratorRuntime.awrap(this.contract.release(payee2));

              case 11:
                _context19.t3 = expect;
                _context19.next = 14;
                return regeneratorRuntime.awrap(this.contract.releasable(payee2));

              case 14:
                _context19.t4 = _context19.sent;
                (0, _context19.t3)(_context19.t4).to.be.bignumber.equal('0');
                _context19.t5 = expect;
                _context19.next = 19;
                return regeneratorRuntime.awrap(this.contract.released(payee2));

              case 19:
                _context19.t6 = _context19.sent;
                _context19.t7 = payment;
                (0, _context19.t5)(_context19.t6).to.be.bignumber.equal(_context19.t7);

              case 22:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
      it('Token', function _callee20() {
        var payment;
        return regeneratorRuntime.async(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return regeneratorRuntime.awrap(this.token.transfer(this.contract.address, amount, {
                  from: owner
                }));

              case 2:
                payment = amount.divn(10);
                _context20.t0 = expect;
                _context20.next = 6;
                return regeneratorRuntime.awrap(this.contract.releasable(this.token.address, payee2, {}));

              case 6:
                _context20.t1 = _context20.sent;
                _context20.t2 = payment;
                (0, _context20.t0)(_context20.t1).to.be.bignumber.equal(_context20.t2);
                _context20.next = 11;
                return regeneratorRuntime.awrap(this.contract.release(this.token.address, payee2));

              case 11:
                _context20.t3 = expect;
                _context20.next = 14;
                return regeneratorRuntime.awrap(this.contract.releasable(this.token.address, payee2, {}));

              case 14:
                _context20.t4 = _context20.sent;
                (0, _context20.t3)(_context20.t4).to.be.bignumber.equal('0');
                _context20.t5 = expect;
                _context20.next = 19;
                return regeneratorRuntime.awrap(this.contract.released(this.token.address, payee2));

              case 19:
                _context20.t6 = _context20.sent;
                _context20.t7 = payment;
                (0, _context20.t5)(_context20.t6).to.be.bignumber.equal(_context20.t7);

              case 22:
              case "end":
                return _context20.stop();
            }
          }
        }, null, this);
      });
    });
    describe('distributes funds to payees', function () {
      it('Ether', function _callee21() {
        var initBalance, tracker1, receipt1, profit1, tracker2, receipt2, profit2, tracker3, receipt3, profit3;
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(send.ether(payer1, this.contract.address, amount));

              case 2:
                _context21.next = 4;
                return regeneratorRuntime.awrap(balance.current(this.contract.address));

              case 4:
                initBalance = _context21.sent;
                expect(initBalance).to.be.bignumber.equal(amount); // distribute to payees

                _context21.next = 8;
                return regeneratorRuntime.awrap(balance.tracker(payee1));

              case 8:
                tracker1 = _context21.sent;
                _context21.next = 11;
                return regeneratorRuntime.awrap(this.contract.release(payee1));

              case 11:
                receipt1 = _context21.sent;
                _context21.next = 14;
                return regeneratorRuntime.awrap(tracker1.delta());

              case 14:
                profit1 = _context21.sent;
                expect(profit1).to.be.bignumber.equal(ether('0.20'));
                expectEvent(receipt1, 'PaymentReleased', {
                  to: payee1,
                  amount: profit1
                });
                _context21.next = 19;
                return regeneratorRuntime.awrap(balance.tracker(payee2));

              case 19:
                tracker2 = _context21.sent;
                _context21.next = 22;
                return regeneratorRuntime.awrap(this.contract.release(payee2));

              case 22:
                receipt2 = _context21.sent;
                _context21.next = 25;
                return regeneratorRuntime.awrap(tracker2.delta());

              case 25:
                profit2 = _context21.sent;
                expect(profit2).to.be.bignumber.equal(ether('0.10'));
                expectEvent(receipt2, 'PaymentReleased', {
                  to: payee2,
                  amount: profit2
                });
                _context21.next = 30;
                return regeneratorRuntime.awrap(balance.tracker(payee3));

              case 30:
                tracker3 = _context21.sent;
                _context21.next = 33;
                return regeneratorRuntime.awrap(this.contract.release(payee3));

              case 33:
                receipt3 = _context21.sent;
                _context21.next = 36;
                return regeneratorRuntime.awrap(tracker3.delta());

              case 36:
                profit3 = _context21.sent;
                expect(profit3).to.be.bignumber.equal(ether('0.70'));
                expectEvent(receipt3, 'PaymentReleased', {
                  to: payee3,
                  amount: profit3
                }); // end balance should be zero

                _context21.t0 = expect;
                _context21.next = 42;
                return regeneratorRuntime.awrap(balance.current(this.contract.address));

              case 42:
                _context21.t1 = _context21.sent;
                (0, _context21.t0)(_context21.t1).to.be.bignumber.equal('0');
                _context21.t2 = expect;
                _context21.next = 47;
                return regeneratorRuntime.awrap(this.contract.totalReleased());

              case 47:
                _context21.t3 = _context21.sent;
                _context21.t4 = initBalance;
                (0, _context21.t2)(_context21.t3).to.be.bignumber.equal(_context21.t4);

              case 50:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
      it('Token', function _callee22() {
        return regeneratorRuntime.async(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.t0 = expect;
                _context22.next = 3;
                return regeneratorRuntime.awrap(this.token.balanceOf(payee1));

              case 3:
                _context22.t1 = _context22.sent;
                (0, _context22.t0)(_context22.t1).to.be.bignumber.equal('0');
                _context22.t2 = expect;
                _context22.next = 8;
                return regeneratorRuntime.awrap(this.token.balanceOf(payee2));

              case 8:
                _context22.t3 = _context22.sent;
                (0, _context22.t2)(_context22.t3).to.be.bignumber.equal('0');
                _context22.t4 = expect;
                _context22.next = 13;
                return regeneratorRuntime.awrap(this.token.balanceOf(payee3));

              case 13:
                _context22.t5 = _context22.sent;
                (0, _context22.t4)(_context22.t5).to.be.bignumber.equal('0');
                _context22.next = 17;
                return regeneratorRuntime.awrap(this.token.transfer(this.contract.address, amount, {
                  from: owner
                }));

              case 17:
                _context22.t6 = expectEvent;
                _context22.next = 20;
                return regeneratorRuntime.awrap(this.contract.release(this.token.address, payee1));

              case 20:
                _context22.t7 = _context22.sent;
                _context22.t8 = {
                  token: this.token.address,
                  to: payee1,
                  amount: ether('0.20')
                };
                (0, _context22.t6)(_context22.t7, 'ERC20PaymentReleased', _context22.t8);
                _context22.next = 25;
                return regeneratorRuntime.awrap(this.token.transfer(this.contract.address, amount, {
                  from: owner
                }));

              case 25:
                _context22.t9 = expectEvent;
                _context22.next = 28;
                return regeneratorRuntime.awrap(this.contract.release(this.token.address, payee1));

              case 28:
                _context22.t10 = _context22.sent;
                _context22.t11 = {
                  token: this.token.address,
                  to: payee1,
                  amount: ether('0.20')
                };
                (0, _context22.t9)(_context22.t10, 'ERC20PaymentReleased', _context22.t11);
                _context22.t12 = expectEvent;
                _context22.next = 34;
                return regeneratorRuntime.awrap(this.contract.release(this.token.address, payee2));

              case 34:
                _context22.t13 = _context22.sent;
                _context22.t14 = {
                  token: this.token.address,
                  to: payee2,
                  amount: ether('0.20')
                };
                (0, _context22.t12)(_context22.t13, 'ERC20PaymentReleased', _context22.t14);
                _context22.t15 = expectEvent;
                _context22.next = 40;
                return regeneratorRuntime.awrap(this.contract.release(this.token.address, payee3));

              case 40:
                _context22.t16 = _context22.sent;
                _context22.t17 = {
                  token: this.token.address,
                  to: payee3,
                  amount: ether('1.40')
                };
                (0, _context22.t15)(_context22.t16, 'ERC20PaymentReleased', _context22.t17);
                _context22.t18 = expect;
                _context22.next = 46;
                return regeneratorRuntime.awrap(this.token.balanceOf(payee1));

              case 46:
                _context22.t19 = _context22.sent;
                _context22.t20 = ether('0.40');
                (0, _context22.t18)(_context22.t19).to.be.bignumber.equal(_context22.t20);
                _context22.t21 = expect;
                _context22.next = 52;
                return regeneratorRuntime.awrap(this.token.balanceOf(payee2));

              case 52:
                _context22.t22 = _context22.sent;
                _context22.t23 = ether('0.20');
                (0, _context22.t21)(_context22.t22).to.be.bignumber.equal(_context22.t23);
                _context22.t24 = expect;
                _context22.next = 58;
                return regeneratorRuntime.awrap(this.token.balanceOf(payee3));

              case 58:
                _context22.t25 = _context22.sent;
                _context22.t26 = ether('1.40');
                (0, _context22.t24)(_context22.t25).to.be.bignumber.equal(_context22.t26);

              case 61:
              case "end":
                return _context22.stop();
            }
          }
        }, null, this);
      });
    });
  });
});