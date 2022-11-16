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

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require3 = require('./ERC20.behavior'),
    shouldBehaveLikeERC20 = _require3.shouldBehaveLikeERC20,
    shouldBehaveLikeERC20Transfer = _require3.shouldBehaveLikeERC20Transfer,
    shouldBehaveLikeERC20Approve = _require3.shouldBehaveLikeERC20Approve;

var ERC20Mock = artifacts.require('ERC20Mock');

var ERC20DecimalsMock = artifacts.require('ERC20DecimalsMock');

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
            return regeneratorRuntime.awrap(ERC20Mock["new"](name, symbol, initialHolder, initialSupply));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('has a name', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.token.name());

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = name;
            (0, _context2.t0)(_context2.t1).to.equal(_context2.t2);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('has a symbol', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.token.symbol());

          case 3:
            _context3.t1 = _context3.sent;
            _context3.t2 = symbol;
            (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('has 18 decimals', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = expect;
            _context4.next = 3;
            return regeneratorRuntime.awrap(this.token.decimals());

          case 3:
            _context4.t1 = _context4.sent;
            (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('18');

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  describe('set decimals', function () {
    var decimals = new BN(6);
    it('can set decimals during construction', function _callee5() {
      var token;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(ERC20DecimalsMock["new"](name, symbol, decimals));

            case 2:
              token = _context5.sent;
              _context5.t0 = expect;
              _context5.next = 6;
              return regeneratorRuntime.awrap(token.decimals());

            case 6:
              _context5.t1 = _context5.sent;
              _context5.t2 = decimals;
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal(_context5.t2);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
  });
  shouldBehaveLikeERC20('ERC20', initialSupply, initialHolder, recipient, anotherAccount);
  describe('decrease allowance', function () {
    describe('when the spender is not the zero address', function () {
      var spender = recipient;

      function shouldDecreaseApproval(amount) {
        describe('when there was no approved amount before', function () {
          it('reverts', function _callee6() {
            return regeneratorRuntime.async(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.token.decreaseAllowance(spender, amount, {
                      from: initialHolder
                    }), 'ERC20: decreased allowance below zero'));

                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }
            }, null, this);
          });
        });
        describe('when the spender had an approved amount', function () {
          var approvedAmount = amount;
          beforeEach(function _callee7() {
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(spender, approvedAmount, {
                      from: initialHolder
                    }));

                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }
            }, null, this);
          });
          it('emits an approval event', function _callee8() {
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.t0 = expectEvent;
                    _context8.next = 3;
                    return regeneratorRuntime.awrap(this.token.decreaseAllowance(spender, approvedAmount, {
                      from: initialHolder
                    }));

                  case 3:
                    _context8.t1 = _context8.sent;
                    _context8.t2 = {
                      owner: initialHolder,
                      spender: spender,
                      value: new BN(0)
                    };
                    (0, _context8.t0)(_context8.t1, 'Approval', _context8.t2);

                  case 6:
                  case "end":
                    return _context8.stop();
                }
              }
            }, null, this);
          });
          it('decreases the spender allowance subtracting the requested amount', function _callee9() {
            return regeneratorRuntime.async(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(this.token.decreaseAllowance(spender, approvedAmount.subn(1), {
                      from: initialHolder
                    }));

                  case 2:
                    _context9.t0 = expect;
                    _context9.next = 5;
                    return regeneratorRuntime.awrap(this.token.allowance(initialHolder, spender));

                  case 5:
                    _context9.t1 = _context9.sent;
                    (0, _context9.t0)(_context9.t1).to.be.bignumber.equal('1');

                  case 7:
                  case "end":
                    return _context9.stop();
                }
              }
            }, null, this);
          });
          it('sets the allowance to zero when all allowance is removed', function _callee10() {
            return regeneratorRuntime.async(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return regeneratorRuntime.awrap(this.token.decreaseAllowance(spender, approvedAmount, {
                      from: initialHolder
                    }));

                  case 2:
                    _context10.t0 = expect;
                    _context10.next = 5;
                    return regeneratorRuntime.awrap(this.token.allowance(initialHolder, spender));

                  case 5:
                    _context10.t1 = _context10.sent;
                    (0, _context10.t0)(_context10.t1).to.be.bignumber.equal('0');

                  case 7:
                  case "end":
                    return _context10.stop();
                }
              }
            }, null, this);
          });
          it('reverts when more than the full allowance is removed', function _callee11() {
            return regeneratorRuntime.async(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.token.decreaseAllowance(spender, approvedAmount.addn(1), {
                      from: initialHolder
                    }), 'ERC20: decreased allowance below zero'));

                  case 2:
                  case "end":
                    return _context11.stop();
                }
              }
            }, null, this);
          });
        });
      }

      describe('when the sender has enough balance', function () {
        var amount = initialSupply;
        shouldDecreaseApproval(amount);
      });
      describe('when the sender does not have enough balance', function () {
        var amount = initialSupply.addn(1);
        shouldDecreaseApproval(amount);
      });
    });
    describe('when the spender is the zero address', function () {
      var amount = initialSupply;
      var spender = ZERO_ADDRESS;
      it('reverts', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.decreaseAllowance(spender, amount, {
                  from: initialHolder
                }), 'ERC20: decreased allowance below zero'));

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('increase allowance', function () {
    var amount = initialSupply;
    describe('when the spender is not the zero address', function () {
      var spender = recipient;
      describe('when the sender has enough balance', function () {
        it('emits an approval event', function _callee13() {
          return regeneratorRuntime.async(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.t0 = expectEvent;
                  _context13.next = 3;
                  return regeneratorRuntime.awrap(this.token.increaseAllowance(spender, amount, {
                    from: initialHolder
                  }));

                case 3:
                  _context13.t1 = _context13.sent;
                  _context13.t2 = {
                    owner: initialHolder,
                    spender: spender,
                    value: amount
                  };
                  (0, _context13.t0)(_context13.t1, 'Approval', _context13.t2);

                case 6:
                case "end":
                  return _context13.stop();
              }
            }
          }, null, this);
        });
        describe('when there was no approved amount before', function () {
          it('approves the requested amount', function _callee14() {
            return regeneratorRuntime.async(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return regeneratorRuntime.awrap(this.token.increaseAllowance(spender, amount, {
                      from: initialHolder
                    }));

                  case 2:
                    _context14.t0 = expect;
                    _context14.next = 5;
                    return regeneratorRuntime.awrap(this.token.allowance(initialHolder, spender));

                  case 5:
                    _context14.t1 = _context14.sent;
                    _context14.t2 = amount;
                    (0, _context14.t0)(_context14.t1).to.be.bignumber.equal(_context14.t2);

                  case 8:
                  case "end":
                    return _context14.stop();
                }
              }
            }, null, this);
          });
        });
        describe('when the spender had an approved amount', function () {
          beforeEach(function _callee15() {
            return regeneratorRuntime.async(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(spender, new BN(1), {
                      from: initialHolder
                    }));

                  case 2:
                  case "end":
                    return _context15.stop();
                }
              }
            }, null, this);
          });
          it('increases the spender allowance adding the requested amount', function _callee16() {
            return regeneratorRuntime.async(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return regeneratorRuntime.awrap(this.token.increaseAllowance(spender, amount, {
                      from: initialHolder
                    }));

                  case 2:
                    _context16.t0 = expect;
                    _context16.next = 5;
                    return regeneratorRuntime.awrap(this.token.allowance(initialHolder, spender));

                  case 5:
                    _context16.t1 = _context16.sent;
                    _context16.t2 = amount.addn(1);
                    (0, _context16.t0)(_context16.t1).to.be.bignumber.equal(_context16.t2);

                  case 8:
                  case "end":
                    return _context16.stop();
                }
              }
            }, null, this);
          });
        });
      });
      describe('when the sender does not have enough balance', function () {
        var amount = initialSupply.addn(1);
        it('emits an approval event', function _callee17() {
          return regeneratorRuntime.async(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.t0 = expectEvent;
                  _context17.next = 3;
                  return regeneratorRuntime.awrap(this.token.increaseAllowance(spender, amount, {
                    from: initialHolder
                  }));

                case 3:
                  _context17.t1 = _context17.sent;
                  _context17.t2 = {
                    owner: initialHolder,
                    spender: spender,
                    value: amount
                  };
                  (0, _context17.t0)(_context17.t1, 'Approval', _context17.t2);

                case 6:
                case "end":
                  return _context17.stop();
              }
            }
          }, null, this);
        });
        describe('when there was no approved amount before', function () {
          it('approves the requested amount', function _callee18() {
            return regeneratorRuntime.async(function _callee18$(_context18) {
              while (1) {
                switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.next = 2;
                    return regeneratorRuntime.awrap(this.token.increaseAllowance(spender, amount, {
                      from: initialHolder
                    }));

                  case 2:
                    _context18.t0 = expect;
                    _context18.next = 5;
                    return regeneratorRuntime.awrap(this.token.allowance(initialHolder, spender));

                  case 5:
                    _context18.t1 = _context18.sent;
                    _context18.t2 = amount;
                    (0, _context18.t0)(_context18.t1).to.be.bignumber.equal(_context18.t2);

                  case 8:
                  case "end":
                    return _context18.stop();
                }
              }
            }, null, this);
          });
        });
        describe('when the spender had an approved amount', function () {
          beforeEach(function _callee19() {
            return regeneratorRuntime.async(function _callee19$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    _context19.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(spender, new BN(1), {
                      from: initialHolder
                    }));

                  case 2:
                  case "end":
                    return _context19.stop();
                }
              }
            }, null, this);
          });
          it('increases the spender allowance adding the requested amount', function _callee20() {
            return regeneratorRuntime.async(function _callee20$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    _context20.next = 2;
                    return regeneratorRuntime.awrap(this.token.increaseAllowance(spender, amount, {
                      from: initialHolder
                    }));

                  case 2:
                    _context20.t0 = expect;
                    _context20.next = 5;
                    return regeneratorRuntime.awrap(this.token.allowance(initialHolder, spender));

                  case 5:
                    _context20.t1 = _context20.sent;
                    _context20.t2 = amount.addn(1);
                    (0, _context20.t0)(_context20.t1).to.be.bignumber.equal(_context20.t2);

                  case 8:
                  case "end":
                    return _context20.stop();
                }
              }
            }, null, this);
          });
        });
      });
    });
    describe('when the spender is the zero address', function () {
      var spender = ZERO_ADDRESS;
      it('reverts', function _callee21() {
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.increaseAllowance(spender, amount, {
                  from: initialHolder
                }), 'ERC20: approve to the zero address'));

              case 2:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('_mint', function () {
    var amount = new BN(50);
    it('rejects a null account', function _callee22() {
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(ZERO_ADDRESS, amount), 'ERC20: mint to the zero address'));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
    describe('for a non zero account', function () {
      beforeEach('minting', function _callee23() {
        return regeneratorRuntime.async(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(recipient, amount));

              case 2:
                this.receipt = _context23.sent;

              case 3:
              case "end":
                return _context23.stop();
            }
          }
        }, null, this);
      });
      it('increments totalSupply', function _callee24() {
        var expectedSupply;
        return regeneratorRuntime.async(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                expectedSupply = initialSupply.add(amount);
                _context24.t0 = expect;
                _context24.next = 4;
                return regeneratorRuntime.awrap(this.token.totalSupply());

              case 4:
                _context24.t1 = _context24.sent;
                _context24.t2 = expectedSupply;
                (0, _context24.t0)(_context24.t1).to.be.bignumber.equal(_context24.t2);

              case 7:
              case "end":
                return _context24.stop();
            }
          }
        }, null, this);
      });
      it('increments recipient balance', function _callee25() {
        return regeneratorRuntime.async(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.t0 = expect;
                _context25.next = 3;
                return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

              case 3:
                _context25.t1 = _context25.sent;
                _context25.t2 = amount;
                (0, _context25.t0)(_context25.t1).to.be.bignumber.equal(_context25.t2);

              case 6:
              case "end":
                return _context25.stop();
            }
          }
        }, null, this);
      });
      it('emits Transfer event', function _callee26() {
        var event;
        return regeneratorRuntime.async(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                event = expectEvent(this.receipt, 'Transfer', {
                  from: ZERO_ADDRESS,
                  to: recipient
                });
                expect(event.args.value).to.be.bignumber.equal(amount);

              case 2:
              case "end":
                return _context26.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('_burn', function () {
    it('rejects a null account', function _callee27() {
      return regeneratorRuntime.async(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burn(ZERO_ADDRESS, new BN(1)), 'ERC20: burn from the zero address'));

            case 2:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    });
    describe('for a non zero account', function () {
      it('rejects burning more than balance', function _callee28() {
        return regeneratorRuntime.async(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.burn(initialHolder, initialSupply.addn(1)), 'ERC20: burn amount exceeds balance'));

              case 2:
              case "end":
                return _context28.stop();
            }
          }
        }, null, this);
      });

      var describeBurn = function describeBurn(description, amount) {
        describe(description, function () {
          beforeEach('burning', function _callee29() {
            return regeneratorRuntime.async(function _callee29$(_context29) {
              while (1) {
                switch (_context29.prev = _context29.next) {
                  case 0:
                    _context29.next = 2;
                    return regeneratorRuntime.awrap(this.token.burn(initialHolder, amount));

                  case 2:
                    this.receipt = _context29.sent;

                  case 3:
                  case "end":
                    return _context29.stop();
                }
              }
            }, null, this);
          });
          it('decrements totalSupply', function _callee30() {
            var expectedSupply;
            return regeneratorRuntime.async(function _callee30$(_context30) {
              while (1) {
                switch (_context30.prev = _context30.next) {
                  case 0:
                    expectedSupply = initialSupply.sub(amount);
                    _context30.t0 = expect;
                    _context30.next = 4;
                    return regeneratorRuntime.awrap(this.token.totalSupply());

                  case 4:
                    _context30.t1 = _context30.sent;
                    _context30.t2 = expectedSupply;
                    (0, _context30.t0)(_context30.t1).to.be.bignumber.equal(_context30.t2);

                  case 7:
                  case "end":
                    return _context30.stop();
                }
              }
            }, null, this);
          });
          it('decrements initialHolder balance', function _callee31() {
            var expectedBalance;
            return regeneratorRuntime.async(function _callee31$(_context31) {
              while (1) {
                switch (_context31.prev = _context31.next) {
                  case 0:
                    expectedBalance = initialSupply.sub(amount);
                    _context31.t0 = expect;
                    _context31.next = 4;
                    return regeneratorRuntime.awrap(this.token.balanceOf(initialHolder));

                  case 4:
                    _context31.t1 = _context31.sent;
                    _context31.t2 = expectedBalance;
                    (0, _context31.t0)(_context31.t1).to.be.bignumber.equal(_context31.t2);

                  case 7:
                  case "end":
                    return _context31.stop();
                }
              }
            }, null, this);
          });
          it('emits Transfer event', function _callee32() {
            var event;
            return regeneratorRuntime.async(function _callee32$(_context32) {
              while (1) {
                switch (_context32.prev = _context32.next) {
                  case 0:
                    event = expectEvent(this.receipt, 'Transfer', {
                      from: initialHolder,
                      to: ZERO_ADDRESS
                    });
                    expect(event.args.value).to.be.bignumber.equal(amount);

                  case 2:
                  case "end":
                    return _context32.stop();
                }
              }
            }, null, this);
          });
        });
      };

      describeBurn('for entire balance', initialSupply);
      describeBurn('for less amount than balance', initialSupply.subn(1));
    });
  });
  describe('_transfer', function () {
    shouldBehaveLikeERC20Transfer('ERC20', initialHolder, recipient, initialSupply, function (from, to, amount) {
      return this.token.transferInternal(from, to, amount);
    });
    describe('when the sender is the zero address', function () {
      it('reverts', function _callee33() {
        return regeneratorRuntime.async(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.transferInternal(ZERO_ADDRESS, recipient, initialSupply), 'ERC20: transfer from the zero address'));

              case 2:
              case "end":
                return _context33.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('_approve', function () {
    shouldBehaveLikeERC20Approve('ERC20', initialHolder, recipient, initialSupply, function (owner, spender, amount) {
      return this.token.approveInternal(owner, spender, amount);
    });
    describe('when the owner is the zero address', function () {
      it('reverts', function _callee34() {
        return regeneratorRuntime.async(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.approveInternal(ZERO_ADDRESS, recipient, initialSupply), 'ERC20: approve from the zero address'));

              case 2:
              case "end":
                return _context34.stop();
            }
          }
        }, null, this);
      });
    });
  });
});