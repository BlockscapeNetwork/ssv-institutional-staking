"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ZERO_ADDRESS = constants.ZERO_ADDRESS,
    MAX_UINT256 = constants.MAX_UINT256;

function shouldBehaveLikeERC20(errorPrefix, initialSupply, initialHolder, recipient, anotherAccount) {
  describe('total supply', function () {
    it('returns the total amount of tokens', function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = expect;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.token.totalSupply());

            case 3:
              _context.t1 = _context.sent;
              _context.t2 = initialSupply;
              (0, _context.t0)(_context.t1).to.be.bignumber.equal(_context.t2);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
  });
  describe('balanceOf', function () {
    describe('when the requested account has no tokens', function () {
      it('returns zero', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = expect;
                _context2.next = 3;
                return regeneratorRuntime.awrap(this.token.balanceOf(anotherAccount));

              case 3:
                _context2.t1 = _context2.sent;
                (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      });
    });
    describe('when the requested account has some tokens', function () {
      it('returns the total amount of tokens', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = expect;
                _context3.next = 3;
                return regeneratorRuntime.awrap(this.token.balanceOf(initialHolder));

              case 3:
                _context3.t1 = _context3.sent;
                _context3.t2 = initialSupply;
                (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('transfer', function () {
    shouldBehaveLikeERC20Transfer(errorPrefix, initialHolder, recipient, initialSupply, function (from, to, value) {
      return this.token.transfer(to, value, {
        from: from
      });
    });
  });
  describe('transfer from', function () {
    var spender = recipient;
    describe('when the token owner is not the zero address', function () {
      var tokenOwner = initialHolder;
      describe('when the recipient is not the zero address', function () {
        var to = anotherAccount;
        describe('when the spender has enough allowance', function () {
          beforeEach(function _callee4() {
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(spender, initialSupply, {
                      from: initialHolder
                    }));

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            }, null, this);
          });
          describe('when the token owner has enough balance', function () {
            var amount = initialSupply;
            it('transfers the requested amount', function _callee5() {
              return regeneratorRuntime.async(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(this.token.transferFrom(tokenOwner, to, amount, {
                        from: spender
                      }));

                    case 2:
                      _context5.t0 = expect;
                      _context5.next = 5;
                      return regeneratorRuntime.awrap(this.token.balanceOf(tokenOwner));

                    case 5:
                      _context5.t1 = _context5.sent;
                      (0, _context5.t0)(_context5.t1).to.be.bignumber.equal('0');
                      _context5.t2 = expect;
                      _context5.next = 10;
                      return regeneratorRuntime.awrap(this.token.balanceOf(to));

                    case 10:
                      _context5.t3 = _context5.sent;
                      _context5.t4 = amount;
                      (0, _context5.t2)(_context5.t3).to.be.bignumber.equal(_context5.t4);

                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, null, this);
            });
            it('decreases the spender allowance', function _callee6() {
              return regeneratorRuntime.async(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return regeneratorRuntime.awrap(this.token.transferFrom(tokenOwner, to, amount, {
                        from: spender
                      }));

                    case 2:
                      _context6.t0 = expect;
                      _context6.next = 5;
                      return regeneratorRuntime.awrap(this.token.allowance(tokenOwner, spender));

                    case 5:
                      _context6.t1 = _context6.sent;
                      (0, _context6.t0)(_context6.t1).to.be.bignumber.equal('0');

                    case 7:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, null, this);
            });
            it('emits a transfer event', function _callee7() {
              return regeneratorRuntime.async(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.t0 = expectEvent;
                      _context7.next = 3;
                      return regeneratorRuntime.awrap(this.token.transferFrom(tokenOwner, to, amount, {
                        from: spender
                      }));

                    case 3:
                      _context7.t1 = _context7.sent;
                      _context7.t2 = {
                        from: tokenOwner,
                        to: to,
                        value: amount
                      };
                      (0, _context7.t0)(_context7.t1, 'Transfer', _context7.t2);

                    case 6:
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
                      return regeneratorRuntime.awrap(this.token.transferFrom(tokenOwner, to, amount, {
                        from: spender
                      }));

                    case 3:
                      _context8.t1 = _context8.sent;
                      _context8.t2 = tokenOwner;
                      _context8.t3 = spender;
                      _context8.next = 8;
                      return regeneratorRuntime.awrap(this.token.allowance(tokenOwner, spender));

                    case 8:
                      _context8.t4 = _context8.sent;
                      _context8.t5 = {
                        owner: _context8.t2,
                        spender: _context8.t3,
                        value: _context8.t4
                      };
                      (0, _context8.t0)(_context8.t1, 'Approval', _context8.t5);

                    case 11:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, null, this);
            });
          });
          describe('when the token owner does not have enough balance', function () {
            var amount = initialSupply;
            beforeEach('reducing balance', function _callee9() {
              return regeneratorRuntime.async(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return regeneratorRuntime.awrap(this.token.transfer(to, 1, {
                        from: tokenOwner
                      }));

                    case 2:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, null, this);
            });
            it('reverts', function _callee10() {
              return regeneratorRuntime.async(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.transferFrom(tokenOwner, to, amount, {
                        from: spender
                      }), "".concat(errorPrefix, ": transfer amount exceeds balance")));

                    case 2:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, null, this);
            });
          });
        });
        describe('when the spender does not have enough allowance', function () {
          var allowance = initialSupply.subn(1);
          beforeEach(function _callee11() {
            return regeneratorRuntime.async(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(spender, allowance, {
                      from: tokenOwner
                    }));

                  case 2:
                  case "end":
                    return _context11.stop();
                }
              }
            }, null, this);
          });
          describe('when the token owner has enough balance', function () {
            var amount = initialSupply;
            it('reverts', function _callee12() {
              return regeneratorRuntime.async(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.transferFrom(tokenOwner, to, amount, {
                        from: spender
                      }), "".concat(errorPrefix, ": insufficient allowance")));

                    case 2:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, null, this);
            });
          });
          describe('when the token owner does not have enough balance', function () {
            var amount = allowance;
            beforeEach('reducing balance', function _callee13() {
              return regeneratorRuntime.async(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.next = 2;
                      return regeneratorRuntime.awrap(this.token.transfer(to, 2, {
                        from: tokenOwner
                      }));

                    case 2:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, null, this);
            });
            it('reverts', function _callee14() {
              return regeneratorRuntime.async(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      _context14.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.transferFrom(tokenOwner, to, amount, {
                        from: spender
                      }), "".concat(errorPrefix, ": transfer amount exceeds balance")));

                    case 2:
                    case "end":
                      return _context14.stop();
                  }
                }
              }, null, this);
            });
          });
        });
        describe('when the spender has unlimited allowance', function () {
          beforeEach(function _callee15() {
            return regeneratorRuntime.async(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(spender, MAX_UINT256, {
                      from: initialHolder
                    }));

                  case 2:
                  case "end":
                    return _context15.stop();
                }
              }
            }, null, this);
          });
          it('does not decrease the spender allowance', function _callee16() {
            return regeneratorRuntime.async(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return regeneratorRuntime.awrap(this.token.transferFrom(tokenOwner, to, 1, {
                      from: spender
                    }));

                  case 2:
                    _context16.t0 = expect;
                    _context16.next = 5;
                    return regeneratorRuntime.awrap(this.token.allowance(tokenOwner, spender));

                  case 5:
                    _context16.t1 = _context16.sent;
                    _context16.t2 = MAX_UINT256;
                    (0, _context16.t0)(_context16.t1).to.be.bignumber.equal(_context16.t2);

                  case 8:
                  case "end":
                    return _context16.stop();
                }
              }
            }, null, this);
          });
          it('does not emit an approval event', function _callee17() {
            return regeneratorRuntime.async(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.t0 = expectEvent;
                    _context17.next = 3;
                    return regeneratorRuntime.awrap(this.token.transferFrom(tokenOwner, to, 1, {
                      from: spender
                    }));

                  case 3:
                    _context17.t1 = _context17.sent;

                    _context17.t0.notEmitted.call(_context17.t0, _context17.t1, 'Approval');

                  case 5:
                  case "end":
                    return _context17.stop();
                }
              }
            }, null, this);
          });
        });
      });
      describe('when the recipient is the zero address', function () {
        var amount = initialSupply;
        var to = ZERO_ADDRESS;
        beforeEach(function _callee18() {
          return regeneratorRuntime.async(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return regeneratorRuntime.awrap(this.token.approve(spender, amount, {
                    from: tokenOwner
                  }));

                case 2:
                case "end":
                  return _context18.stop();
              }
            }
          }, null, this);
        });
        it('reverts', function _callee19() {
          return regeneratorRuntime.async(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  _context19.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.transferFrom(tokenOwner, to, amount, {
                    from: spender
                  }), "".concat(errorPrefix, ": transfer to the zero address")));

                case 2:
                case "end":
                  return _context19.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('when the token owner is the zero address', function () {
      var amount = 0;
      var tokenOwner = ZERO_ADDRESS;
      var to = recipient;
      it('reverts', function _callee20() {
        return regeneratorRuntime.async(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.transferFrom(tokenOwner, to, amount, {
                  from: spender
                }), 'from the zero address'));

              case 2:
              case "end":
                return _context20.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('approve', function () {
    shouldBehaveLikeERC20Approve(errorPrefix, initialHolder, recipient, initialSupply, function (owner, spender, amount) {
      return this.token.approve(spender, amount, {
        from: owner
      });
    });
  });
}

function shouldBehaveLikeERC20Transfer(errorPrefix, from, to, balance, transfer) {
  describe('when the recipient is not the zero address', function () {
    describe('when the sender does not have enough balance', function () {
      var amount = balance.addn(1);
      it('reverts', function _callee21() {
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(expectRevert(transfer.call(this, from, to, amount), "".concat(errorPrefix, ": transfer amount exceeds balance")));

              case 2:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
    });
    describe('when the sender transfers all balance', function () {
      var amount = balance;
      it('transfers the requested amount', function _callee22() {
        return regeneratorRuntime.async(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return regeneratorRuntime.awrap(transfer.call(this, from, to, amount));

              case 2:
                _context22.t0 = expect;
                _context22.next = 5;
                return regeneratorRuntime.awrap(this.token.balanceOf(from));

              case 5:
                _context22.t1 = _context22.sent;
                (0, _context22.t0)(_context22.t1).to.be.bignumber.equal('0');
                _context22.t2 = expect;
                _context22.next = 10;
                return regeneratorRuntime.awrap(this.token.balanceOf(to));

              case 10:
                _context22.t3 = _context22.sent;
                _context22.t4 = amount;
                (0, _context22.t2)(_context22.t3).to.be.bignumber.equal(_context22.t4);

              case 13:
              case "end":
                return _context22.stop();
            }
          }
        }, null, this);
      });
      it('emits a transfer event', function _callee23() {
        return regeneratorRuntime.async(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.t0 = expectEvent;
                _context23.next = 3;
                return regeneratorRuntime.awrap(transfer.call(this, from, to, amount));

              case 3:
                _context23.t1 = _context23.sent;
                _context23.t2 = {
                  from: from,
                  to: to,
                  value: amount
                };
                (0, _context23.t0)(_context23.t1, 'Transfer', _context23.t2);

              case 6:
              case "end":
                return _context23.stop();
            }
          }
        }, null, this);
      });
    });
    describe('when the sender transfers zero tokens', function () {
      var amount = new BN('0');
      it('transfers the requested amount', function _callee24() {
        return regeneratorRuntime.async(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return regeneratorRuntime.awrap(transfer.call(this, from, to, amount));

              case 2:
                _context24.t0 = expect;
                _context24.next = 5;
                return regeneratorRuntime.awrap(this.token.balanceOf(from));

              case 5:
                _context24.t1 = _context24.sent;
                _context24.t2 = balance;
                (0, _context24.t0)(_context24.t1).to.be.bignumber.equal(_context24.t2);
                _context24.t3 = expect;
                _context24.next = 11;
                return regeneratorRuntime.awrap(this.token.balanceOf(to));

              case 11:
                _context24.t4 = _context24.sent;
                (0, _context24.t3)(_context24.t4).to.be.bignumber.equal('0');

              case 13:
              case "end":
                return _context24.stop();
            }
          }
        }, null, this);
      });
      it('emits a transfer event', function _callee25() {
        return regeneratorRuntime.async(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.t0 = expectEvent;
                _context25.next = 3;
                return regeneratorRuntime.awrap(transfer.call(this, from, to, amount));

              case 3:
                _context25.t1 = _context25.sent;
                _context25.t2 = {
                  from: from,
                  to: to,
                  value: amount
                };
                (0, _context25.t0)(_context25.t1, 'Transfer', _context25.t2);

              case 6:
              case "end":
                return _context25.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('when the recipient is the zero address', function () {
    it('reverts', function _callee26() {
      return regeneratorRuntime.async(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(expectRevert(transfer.call(this, from, ZERO_ADDRESS, balance), "".concat(errorPrefix, ": transfer to the zero address")));

            case 2:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    });
  });
}

function shouldBehaveLikeERC20Approve(errorPrefix, owner, spender, supply, approve) {
  describe('when the spender is not the zero address', function () {
    describe('when the sender has enough balance', function () {
      var amount = supply;
      it('emits an approval event', function _callee27() {
        return regeneratorRuntime.async(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.t0 = expectEvent;
                _context27.next = 3;
                return regeneratorRuntime.awrap(approve.call(this, owner, spender, amount));

              case 3:
                _context27.t1 = _context27.sent;
                _context27.t2 = {
                  owner: owner,
                  spender: spender,
                  value: amount
                };
                (0, _context27.t0)(_context27.t1, 'Approval', _context27.t2);

              case 6:
              case "end":
                return _context27.stop();
            }
          }
        }, null, this);
      });
      describe('when there was no approved amount before', function () {
        it('approves the requested amount', function _callee28() {
          return regeneratorRuntime.async(function _callee28$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  _context28.next = 2;
                  return regeneratorRuntime.awrap(approve.call(this, owner, spender, amount));

                case 2:
                  _context28.t0 = expect;
                  _context28.next = 5;
                  return regeneratorRuntime.awrap(this.token.allowance(owner, spender));

                case 5:
                  _context28.t1 = _context28.sent;
                  _context28.t2 = amount;
                  (0, _context28.t0)(_context28.t1).to.be.bignumber.equal(_context28.t2);

                case 8:
                case "end":
                  return _context28.stop();
              }
            }
          }, null, this);
        });
      });
      describe('when the spender had an approved amount', function () {
        beforeEach(function _callee29() {
          return regeneratorRuntime.async(function _callee29$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  _context29.next = 2;
                  return regeneratorRuntime.awrap(approve.call(this, owner, spender, new BN(1)));

                case 2:
                case "end":
                  return _context29.stop();
              }
            }
          }, null, this);
        });
        it('approves the requested amount and replaces the previous one', function _callee30() {
          return regeneratorRuntime.async(function _callee30$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  _context30.next = 2;
                  return regeneratorRuntime.awrap(approve.call(this, owner, spender, amount));

                case 2:
                  _context30.t0 = expect;
                  _context30.next = 5;
                  return regeneratorRuntime.awrap(this.token.allowance(owner, spender));

                case 5:
                  _context30.t1 = _context30.sent;
                  _context30.t2 = amount;
                  (0, _context30.t0)(_context30.t1).to.be.bignumber.equal(_context30.t2);

                case 8:
                case "end":
                  return _context30.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('when the sender does not have enough balance', function () {
      var amount = supply.addn(1);
      it('emits an approval event', function _callee31() {
        return regeneratorRuntime.async(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.t0 = expectEvent;
                _context31.next = 3;
                return regeneratorRuntime.awrap(approve.call(this, owner, spender, amount));

              case 3:
                _context31.t1 = _context31.sent;
                _context31.t2 = {
                  owner: owner,
                  spender: spender,
                  value: amount
                };
                (0, _context31.t0)(_context31.t1, 'Approval', _context31.t2);

              case 6:
              case "end":
                return _context31.stop();
            }
          }
        }, null, this);
      });
      describe('when there was no approved amount before', function () {
        it('approves the requested amount', function _callee32() {
          return regeneratorRuntime.async(function _callee32$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  _context32.next = 2;
                  return regeneratorRuntime.awrap(approve.call(this, owner, spender, amount));

                case 2:
                  _context32.t0 = expect;
                  _context32.next = 5;
                  return regeneratorRuntime.awrap(this.token.allowance(owner, spender));

                case 5:
                  _context32.t1 = _context32.sent;
                  _context32.t2 = amount;
                  (0, _context32.t0)(_context32.t1).to.be.bignumber.equal(_context32.t2);

                case 8:
                case "end":
                  return _context32.stop();
              }
            }
          }, null, this);
        });
      });
      describe('when the spender had an approved amount', function () {
        beforeEach(function _callee33() {
          return regeneratorRuntime.async(function _callee33$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  _context33.next = 2;
                  return regeneratorRuntime.awrap(approve.call(this, owner, spender, new BN(1)));

                case 2:
                case "end":
                  return _context33.stop();
              }
            }
          }, null, this);
        });
        it('approves the requested amount and replaces the previous one', function _callee34() {
          return regeneratorRuntime.async(function _callee34$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  _context34.next = 2;
                  return regeneratorRuntime.awrap(approve.call(this, owner, spender, amount));

                case 2:
                  _context34.t0 = expect;
                  _context34.next = 5;
                  return regeneratorRuntime.awrap(this.token.allowance(owner, spender));

                case 5:
                  _context34.t1 = _context34.sent;
                  _context34.t2 = amount;
                  (0, _context34.t0)(_context34.t1).to.be.bignumber.equal(_context34.t2);

                case 8:
                case "end":
                  return _context34.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
  describe('when the spender is the zero address', function () {
    it('reverts', function _callee35() {
      return regeneratorRuntime.async(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.next = 2;
              return regeneratorRuntime.awrap(expectRevert(approve.call(this, owner, ZERO_ADDRESS, supply), "".concat(errorPrefix, ": approve to the zero address")));

            case 2:
            case "end":
              return _context35.stop();
          }
        }
      }, null, this);
    });
  });
}

module.exports = {
  shouldBehaveLikeERC20: shouldBehaveLikeERC20,
  shouldBehaveLikeERC20Transfer: shouldBehaveLikeERC20Transfer,
  shouldBehaveLikeERC20Approve: shouldBehaveLikeERC20Approve
};