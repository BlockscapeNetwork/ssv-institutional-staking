"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC777SenderRecipientMock = artifacts.require('ERC777SenderRecipientMock');

function shouldBehaveLikeERC777DirectSendBurn(holder, recipient, data) {
  shouldBehaveLikeERC777DirectSend(holder, recipient, data);
  shouldBehaveLikeERC777DirectBurn(holder, data);
}

function shouldBehaveLikeERC777OperatorSendBurn(holder, recipient, operator, data, operatorData) {
  shouldBehaveLikeERC777OperatorSend(holder, recipient, operator, data, operatorData);
  shouldBehaveLikeERC777OperatorBurn(holder, operator, data, operatorData);
}

function shouldBehaveLikeERC777UnauthorizedOperatorSendBurn(holder, recipient, operator, data, operatorData) {
  shouldBehaveLikeERC777UnauthorizedOperatorSend(holder, recipient, operator, data, operatorData);
  shouldBehaveLikeERC777UnauthorizedOperatorBurn(holder, operator, data, operatorData);
}

function shouldBehaveLikeERC777DirectSend(holder, recipient, data) {
  describe('direct send', function () {
    context('when the sender has tokens', function () {
      shouldDirectSendTokens(holder, recipient, new BN('0'), data);
      shouldDirectSendTokens(holder, recipient, new BN('1'), data);
      it('reverts when sending more than the balance', function _callee() {
        var balance;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 2:
                balance = _context.sent;
                _context.next = 5;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.send(recipient, balance.addn(1), data, {
                  from: holder
                })));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      });
      it('reverts when sending to the zero address', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.send(ZERO_ADDRESS, new BN('1'), data, {
                  from: holder
                })));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      });
    });
    context('when the sender has no tokens', function () {
      removeBalance(holder);
      shouldDirectSendTokens(holder, recipient, new BN('0'), data);
      it('reverts when sending a non-zero amount', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.send(recipient, new BN('1'), data, {
                  from: holder
                })));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
    });
  });
}

function shouldBehaveLikeERC777OperatorSend(holder, recipient, operator, data, operatorData) {
  describe('operator send', function () {
    context('when the sender has tokens', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              shouldOperatorSendTokens(holder, operator, recipient, new BN('0'), data, operatorData);
              shouldOperatorSendTokens(holder, operator, recipient, new BN('1'), data, operatorData);
              it('reverts when sending more than the balance', function _callee4() {
                var balance;
                return regeneratorRuntime.async(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return regeneratorRuntime.awrap(this.token.balanceOf(holder));

                      case 2:
                        balance = _context4.sent;
                        _context4.next = 5;
                        return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorSend(holder, recipient, balance.addn(1), data, operatorData, {
                          from: operator
                        })));

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, null, this);
              });
              it('reverts when sending to the zero address', function _callee5() {
                return regeneratorRuntime.async(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorSend(holder, ZERO_ADDRESS, new BN('1'), data, operatorData, {
                          from: operator
                        })));

                      case 2:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, null, this);
              });

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    context('when the sender has no tokens', function () {
      removeBalance(holder);
      shouldOperatorSendTokens(holder, operator, recipient, new BN('0'), data, operatorData);
      it('reverts when sending a non-zero amount', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorSend(holder, recipient, new BN('1'), data, operatorData, {
                  from: operator
                })));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('reverts when sending from the zero address', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorSend(ZERO_ADDRESS, recipient, new BN('0'), data, operatorData, {
                  from: operator
                })));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
  });
}

function shouldBehaveLikeERC777UnauthorizedOperatorSend(holder, recipient, operator, data, operatorData) {
  describe('operator send', function () {
    it('reverts', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorSend(holder, recipient, new BN('0'), data, operatorData)));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
  });
}

function shouldBehaveLikeERC777DirectBurn(holder, data) {
  describe('direct burn', function () {
    context('when the sender has tokens', function () {
      shouldDirectBurnTokens(holder, new BN('0'), data);
      shouldDirectBurnTokens(holder, new BN('1'), data);
      it('reverts when burning more than the balance', function _callee10() {
        var balance;
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder));

              case 2:
                balance = _context10.sent;
                _context10.next = 5;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.burn(balance.addn(1), data, {
                  from: holder
                })));

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
    });
    context('when the sender has no tokens', function () {
      removeBalance(holder);
      shouldDirectBurnTokens(holder, new BN('0'), data);
      it('reverts when burning a non-zero amount', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.burn(new BN('1'), data, {
                  from: holder
                })));

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
  });
}

function shouldBehaveLikeERC777OperatorBurn(holder, operator, data, operatorData) {
  describe('operator burn', function () {
    context('when the sender has tokens', function _callee13() {
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              shouldOperatorBurnTokens(holder, operator, new BN('0'), data, operatorData);
              shouldOperatorBurnTokens(holder, operator, new BN('1'), data, operatorData);
              it('reverts when burning more than the balance', function _callee12() {
                var balance;
                return regeneratorRuntime.async(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return regeneratorRuntime.awrap(this.token.balanceOf(holder));

                      case 2:
                        balance = _context12.sent;
                        _context12.next = 5;
                        return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorBurn(holder, balance.addn(1), data, operatorData, {
                          from: operator
                        })));

                      case 5:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, null, this);
              });

            case 3:
            case "end":
              return _context13.stop();
          }
        }
      });
    });
    context('when the sender has no tokens', function () {
      removeBalance(holder);
      shouldOperatorBurnTokens(holder, operator, new BN('0'), data, operatorData);
      it('reverts when burning a non-zero amount', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorBurn(holder, new BN('1'), data, operatorData, {
                  from: operator
                })));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('reverts when burning from the zero address', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorBurn(ZERO_ADDRESS, new BN('0'), data, operatorData, {
                  from: operator
                })));

              case 2:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
    });
  });
}

function shouldBehaveLikeERC777UnauthorizedOperatorBurn(holder, operator, data, operatorData) {
  describe('operator burn', function () {
    it('reverts', function _callee16() {
      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorBurn(holder, new BN('0'), data, operatorData)));

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
  });
}

function shouldDirectSendTokens(from, to, amount, data) {
  shouldSendTokens(from, null, to, amount, data, null);
}

function shouldOperatorSendTokens(from, operator, to, amount, data, operatorData) {
  shouldSendTokens(from, operator, to, amount, data, operatorData);
}

function shouldSendTokens(from, operator, to, amount, data, operatorData) {
  var operatorCall = operator !== null;
  it("".concat(operatorCall ? 'operator ' : '', "can send an amount of ").concat(amount), function _callee17() {
    var initialTotalSupply, initialFromBalance, initialToBalance, receipt, finalTotalSupply, finalFromBalance, finalToBalance;
    return regeneratorRuntime.async(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return regeneratorRuntime.awrap(this.token.totalSupply());

          case 2:
            initialTotalSupply = _context17.sent;
            _context17.next = 5;
            return regeneratorRuntime.awrap(this.token.balanceOf(from));

          case 5:
            initialFromBalance = _context17.sent;
            _context17.next = 8;
            return regeneratorRuntime.awrap(this.token.balanceOf(to));

          case 8:
            initialToBalance = _context17.sent;

            if (operatorCall) {
              _context17.next = 16;
              break;
            }

            _context17.next = 12;
            return regeneratorRuntime.awrap(this.token.send(to, amount, data, {
              from: from
            }));

          case 12:
            receipt = _context17.sent;
            expectEvent(receipt, 'Sent', {
              operator: from,
              from: from,
              to: to,
              amount: amount,
              data: data,
              operatorData: null
            });
            _context17.next = 20;
            break;

          case 16:
            _context17.next = 18;
            return regeneratorRuntime.awrap(this.token.operatorSend(from, to, amount, data, operatorData, {
              from: operator
            }));

          case 18:
            receipt = _context17.sent;
            expectEvent(receipt, 'Sent', {
              operator: operator,
              from: from,
              to: to,
              amount: amount,
              data: data,
              operatorData: operatorData
            });

          case 20:
            expectEvent(receipt, 'Transfer', {
              from: from,
              to: to,
              value: amount
            });
            _context17.next = 23;
            return regeneratorRuntime.awrap(this.token.totalSupply());

          case 23:
            finalTotalSupply = _context17.sent;
            _context17.next = 26;
            return regeneratorRuntime.awrap(this.token.balanceOf(from));

          case 26:
            finalFromBalance = _context17.sent;
            _context17.next = 29;
            return regeneratorRuntime.awrap(this.token.balanceOf(to));

          case 29:
            finalToBalance = _context17.sent;
            expect(finalTotalSupply).to.be.bignumber.equal(initialTotalSupply);
            expect(finalToBalance.sub(initialToBalance)).to.be.bignumber.equal(amount);
            expect(finalFromBalance.sub(initialFromBalance)).to.be.bignumber.equal(amount.neg());

          case 33:
          case "end":
            return _context17.stop();
        }
      }
    }, null, this);
  });
}

function shouldDirectBurnTokens(from, amount, data) {
  shouldBurnTokens(from, null, amount, data, null);
}

function shouldOperatorBurnTokens(from, operator, amount, data, operatorData) {
  shouldBurnTokens(from, operator, amount, data, operatorData);
}

function shouldBurnTokens(from, operator, amount, data, operatorData) {
  var operatorCall = operator !== null;
  it("".concat(operatorCall ? 'operator ' : '', "can burn an amount of ").concat(amount), function _callee18() {
    var initialTotalSupply, initialFromBalance, receipt, finalTotalSupply, finalFromBalance;
    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return regeneratorRuntime.awrap(this.token.totalSupply());

          case 2:
            initialTotalSupply = _context18.sent;
            _context18.next = 5;
            return regeneratorRuntime.awrap(this.token.balanceOf(from));

          case 5:
            initialFromBalance = _context18.sent;

            if (operatorCall) {
              _context18.next = 13;
              break;
            }

            _context18.next = 9;
            return regeneratorRuntime.awrap(this.token.burn(amount, data, {
              from: from
            }));

          case 9:
            receipt = _context18.sent;
            expectEvent(receipt, 'Burned', {
              operator: from,
              from: from,
              amount: amount,
              data: data,
              operatorData: null
            });
            _context18.next = 17;
            break;

          case 13:
            _context18.next = 15;
            return regeneratorRuntime.awrap(this.token.operatorBurn(from, amount, data, operatorData, {
              from: operator
            }));

          case 15:
            receipt = _context18.sent;
            expectEvent(receipt, 'Burned', {
              operator: operator,
              from: from,
              amount: amount,
              data: data,
              operatorData: operatorData
            });

          case 17:
            expectEvent(receipt, 'Transfer', {
              from: from,
              to: ZERO_ADDRESS,
              value: amount
            });
            _context18.next = 20;
            return regeneratorRuntime.awrap(this.token.totalSupply());

          case 20:
            finalTotalSupply = _context18.sent;
            _context18.next = 23;
            return regeneratorRuntime.awrap(this.token.balanceOf(from));

          case 23:
            finalFromBalance = _context18.sent;
            expect(finalTotalSupply.sub(initialTotalSupply)).to.be.bignumber.equal(amount.neg());
            expect(finalFromBalance.sub(initialFromBalance)).to.be.bignumber.equal(amount.neg());

          case 26:
          case "end":
            return _context18.stop();
        }
      }
    }, null, this);
  });
}

function shouldBehaveLikeERC777InternalMint(recipient, operator, amount, data, operatorData) {
  shouldInternalMintTokens(operator, recipient, new BN('0'), data, operatorData);
  shouldInternalMintTokens(operator, recipient, amount, data, operatorData);
  it('reverts when minting tokens for the zero address', function _callee19() {
    return regeneratorRuntime.async(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.mintInternal(ZERO_ADDRESS, amount, data, operatorData, {
              from: operator
            })));

          case 2:
          case "end":
            return _context19.stop();
        }
      }
    }, null, this);
  });
}

function shouldInternalMintTokens(operator, to, amount, data, operatorData) {
  it("can (internal) mint an amount of ".concat(amount), function _callee20() {
    var initialTotalSupply, initialToBalance, receipt, finalTotalSupply, finalToBalance;
    return regeneratorRuntime.async(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return regeneratorRuntime.awrap(this.token.totalSupply());

          case 2:
            initialTotalSupply = _context20.sent;
            _context20.next = 5;
            return regeneratorRuntime.awrap(this.token.balanceOf(to));

          case 5:
            initialToBalance = _context20.sent;
            _context20.next = 8;
            return regeneratorRuntime.awrap(this.token.mintInternal(to, amount, data, operatorData, {
              from: operator
            }));

          case 8:
            receipt = _context20.sent;
            expectEvent(receipt, 'Minted', {
              operator: operator,
              to: to,
              amount: amount,
              data: data,
              operatorData: operatorData
            });
            expectEvent(receipt, 'Transfer', {
              from: ZERO_ADDRESS,
              to: to,
              value: amount
            });
            _context20.next = 13;
            return regeneratorRuntime.awrap(this.token.totalSupply());

          case 13:
            finalTotalSupply = _context20.sent;
            _context20.next = 16;
            return regeneratorRuntime.awrap(this.token.balanceOf(to));

          case 16:
            finalToBalance = _context20.sent;
            expect(finalTotalSupply.sub(initialTotalSupply)).to.be.bignumber.equal(amount);
            expect(finalToBalance.sub(initialToBalance)).to.be.bignumber.equal(amount);

          case 19:
          case "end":
            return _context20.stop();
        }
      }
    }, null, this);
  });
}

function shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook(operator, amount, data, operatorData) {
  context('when TokensRecipient reverts', function () {
    beforeEach(function _callee21() {
      return regeneratorRuntime.async(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(this.tokensRecipientImplementer.setShouldRevertReceive(true));

            case 2:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    });
    it('send reverts', function _callee22() {
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(sendFromHolder(this.token, this.sender, this.recipient, amount, data)));

            case 2:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
    it('operatorSend reverts', function _callee23() {
      return regeneratorRuntime.async(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorSend(this.sender, this.recipient, amount, data, operatorData, {
                from: operator
              })));

            case 2:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    });
    it('mint (internal) reverts', function _callee24() {
      return regeneratorRuntime.async(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.mintInternal(this.recipient, amount, data, operatorData, {
                from: operator
              })));

            case 2:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    });
  });
  context('when TokensRecipient does not revert', function () {
    beforeEach(function _callee25() {
      return regeneratorRuntime.async(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return regeneratorRuntime.awrap(this.tokensRecipientImplementer.setShouldRevertSend(false));

            case 2:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this);
    });
    it('TokensRecipient receives send data and is called after state mutation', function _callee26() {
      var _ref, tx, postSenderBalance, postRecipientBalance;

      return regeneratorRuntime.async(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(sendFromHolder(this.token, this.sender, this.recipient, amount, data));

            case 2:
              _ref = _context26.sent;
              tx = _ref.tx;
              _context26.next = 6;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.sender));

            case 6:
              postSenderBalance = _context26.sent;
              _context26.next = 9;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.recipient));

            case 9:
              postRecipientBalance = _context26.sent;
              _context26.next = 12;
              return regeneratorRuntime.awrap(assertTokensReceivedCalled(this.token, tx, this.sender, this.sender, this.recipient, amount, data, null, postSenderBalance, postRecipientBalance));

            case 12:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    });
    it('TokensRecipient receives operatorSend data and is called after state mutation', function _callee27() {
      var _ref2, tx, postSenderBalance, postRecipientBalance;

      return regeneratorRuntime.async(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(this.token.operatorSend(this.sender, this.recipient, amount, data, operatorData, {
                from: operator
              }));

            case 2:
              _ref2 = _context27.sent;
              tx = _ref2.tx;
              _context27.next = 6;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.sender));

            case 6:
              postSenderBalance = _context27.sent;
              _context27.next = 9;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.recipient));

            case 9:
              postRecipientBalance = _context27.sent;
              _context27.next = 12;
              return regeneratorRuntime.awrap(assertTokensReceivedCalled(this.token, tx, operator, this.sender, this.recipient, amount, data, operatorData, postSenderBalance, postRecipientBalance));

            case 12:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    });
    it('TokensRecipient receives mint (internal) data and is called after state mutation', function _callee28() {
      var _ref3, tx, postRecipientBalance;

      return regeneratorRuntime.async(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(this.token.mintInternal(this.recipient, amount, data, operatorData, {
                from: operator
              }));

            case 2:
              _ref3 = _context28.sent;
              tx = _ref3.tx;
              _context28.next = 6;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.recipient));

            case 6:
              postRecipientBalance = _context28.sent;
              _context28.next = 9;
              return regeneratorRuntime.awrap(assertTokensReceivedCalled(this.token, tx, operator, ZERO_ADDRESS, this.recipient, amount, data, operatorData, new BN('0'), postRecipientBalance));

            case 9:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    });
  });
}

function shouldBehaveLikeERC777SendBurnWithSendHook(operator, amount, data, operatorData) {
  context('when TokensSender reverts', function () {
    beforeEach(function _callee29() {
      return regeneratorRuntime.async(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return regeneratorRuntime.awrap(this.tokensSenderImplementer.setShouldRevertSend(true));

            case 2:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this);
    });
    it('send reverts', function _callee30() {
      return regeneratorRuntime.async(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(sendFromHolder(this.token, this.sender, this.recipient, amount, data)));

            case 2:
            case "end":
              return _context30.stop();
          }
        }
      }, null, this);
    });
    it('operatorSend reverts', function _callee31() {
      return regeneratorRuntime.async(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorSend(this.sender, this.recipient, amount, data, operatorData, {
                from: operator
              })));

            case 2:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    });
    it('burn reverts', function _callee32() {
      return regeneratorRuntime.async(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(burnFromHolder(this.token, this.sender, amount, data)));

            case 2:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    });
    it('operatorBurn reverts', function _callee33() {
      return regeneratorRuntime.async(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.operatorBurn(this.sender, amount, data, operatorData, {
                from: operator
              })));

            case 2:
            case "end":
              return _context33.stop();
          }
        }
      }, null, this);
    });
  });
  context('when TokensSender does not revert', function () {
    beforeEach(function _callee34() {
      return regeneratorRuntime.async(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(this.tokensSenderImplementer.setShouldRevertSend(false));

            case 2:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this);
    });
    it('TokensSender receives send data and is called before state mutation', function _callee35() {
      var preSenderBalance, preRecipientBalance, _ref4, tx;

      return regeneratorRuntime.async(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.next = 2;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.sender));

            case 2:
              preSenderBalance = _context35.sent;
              _context35.next = 5;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.recipient));

            case 5:
              preRecipientBalance = _context35.sent;
              _context35.next = 8;
              return regeneratorRuntime.awrap(sendFromHolder(this.token, this.sender, this.recipient, amount, data));

            case 8:
              _ref4 = _context35.sent;
              tx = _ref4.tx;
              _context35.next = 12;
              return regeneratorRuntime.awrap(assertTokensToSendCalled(this.token, tx, this.sender, this.sender, this.recipient, amount, data, null, preSenderBalance, preRecipientBalance));

            case 12:
            case "end":
              return _context35.stop();
          }
        }
      }, null, this);
    });
    it('TokensSender receives operatorSend data and is called before state mutation', function _callee36() {
      var preSenderBalance, preRecipientBalance, _ref5, tx;

      return regeneratorRuntime.async(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.sender));

            case 2:
              preSenderBalance = _context36.sent;
              _context36.next = 5;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.recipient));

            case 5:
              preRecipientBalance = _context36.sent;
              _context36.next = 8;
              return regeneratorRuntime.awrap(this.token.operatorSend(this.sender, this.recipient, amount, data, operatorData, {
                from: operator
              }));

            case 8:
              _ref5 = _context36.sent;
              tx = _ref5.tx;
              _context36.next = 12;
              return regeneratorRuntime.awrap(assertTokensToSendCalled(this.token, tx, operator, this.sender, this.recipient, amount, data, operatorData, preSenderBalance, preRecipientBalance));

            case 12:
            case "end":
              return _context36.stop();
          }
        }
      }, null, this);
    });
    it('TokensSender receives burn data and is called before state mutation', function _callee37() {
      var preSenderBalance, _ref6, tx;

      return regeneratorRuntime.async(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              _context37.next = 2;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.sender));

            case 2:
              preSenderBalance = _context37.sent;
              _context37.next = 5;
              return regeneratorRuntime.awrap(burnFromHolder(this.token, this.sender, amount, data, {
                from: this.sender
              }));

            case 5:
              _ref6 = _context37.sent;
              tx = _ref6.tx;
              _context37.next = 9;
              return regeneratorRuntime.awrap(assertTokensToSendCalled(this.token, tx, this.sender, this.sender, ZERO_ADDRESS, amount, data, null, preSenderBalance));

            case 9:
            case "end":
              return _context37.stop();
          }
        }
      }, null, this);
    });
    it('TokensSender receives operatorBurn data and is called before state mutation', function _callee38() {
      var preSenderBalance, _ref7, tx;

      return regeneratorRuntime.async(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              _context38.next = 2;
              return regeneratorRuntime.awrap(this.token.balanceOf(this.sender));

            case 2:
              preSenderBalance = _context38.sent;
              _context38.next = 5;
              return regeneratorRuntime.awrap(this.token.operatorBurn(this.sender, amount, data, operatorData, {
                from: operator
              }));

            case 5:
              _ref7 = _context38.sent;
              tx = _ref7.tx;
              _context38.next = 9;
              return regeneratorRuntime.awrap(assertTokensToSendCalled(this.token, tx, operator, this.sender, ZERO_ADDRESS, amount, data, operatorData, preSenderBalance));

            case 9:
            case "end":
              return _context38.stop();
          }
        }
      }, null, this);
    });
  });
}

function removeBalance(holder) {
  beforeEach(function _callee39() {
    return regeneratorRuntime.async(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            _context39.t0 = regeneratorRuntime;
            _context39.t1 = this.token;
            _context39.next = 4;
            return regeneratorRuntime.awrap(this.token.balanceOf(holder));

          case 4:
            _context39.t2 = _context39.sent;
            _context39.t3 = {
              from: holder
            };
            _context39.t4 = _context39.t1.burn.call(_context39.t1, _context39.t2, '0x', _context39.t3);
            _context39.next = 9;
            return _context39.t0.awrap.call(_context39.t0, _context39.t4);

          case 9:
            _context39.t5 = expect;
            _context39.next = 12;
            return regeneratorRuntime.awrap(this.token.balanceOf(holder));

          case 12:
            _context39.t6 = _context39.sent;
            (0, _context39.t5)(_context39.t6).to.be.bignumber.equal('0');

          case 14:
          case "end":
            return _context39.stop();
        }
      }
    }, null, this);
  });
}

function assertTokensReceivedCalled(token, txHash, operator, from, to, amount, data, operatorData, fromBalance) {
  var toBalance,
      _args40 = arguments;
  return regeneratorRuntime.async(function assertTokensReceivedCalled$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          toBalance = _args40.length > 9 && _args40[9] !== undefined ? _args40[9] : '0';
          _context40.next = 3;
          return regeneratorRuntime.awrap(expectEvent.inTransaction(txHash, ERC777SenderRecipientMock, 'TokensReceivedCalled', {
            operator: operator,
            from: from,
            to: to,
            amount: amount,
            data: data,
            operatorData: operatorData,
            token: token.address,
            fromBalance: fromBalance,
            toBalance: toBalance
          }));

        case 3:
        case "end":
          return _context40.stop();
      }
    }
  });
}

function assertTokensToSendCalled(token, txHash, operator, from, to, amount, data, operatorData, fromBalance) {
  var toBalance,
      _args41 = arguments;
  return regeneratorRuntime.async(function assertTokensToSendCalled$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          toBalance = _args41.length > 9 && _args41[9] !== undefined ? _args41[9] : '0';
          _context41.next = 3;
          return regeneratorRuntime.awrap(expectEvent.inTransaction(txHash, ERC777SenderRecipientMock, 'TokensToSendCalled', {
            operator: operator,
            from: from,
            to: to,
            amount: amount,
            data: data,
            operatorData: operatorData,
            token: token.address,
            fromBalance: fromBalance,
            toBalance: toBalance
          }));

        case 3:
        case "end":
          return _context41.stop();
      }
    }
  });
}

function sendFromHolder(token, holder, to, amount, data) {
  return regeneratorRuntime.async(function sendFromHolder$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          _context42.next = 2;
          return regeneratorRuntime.awrap(web3.eth.getCode(holder));

        case 2:
          _context42.t0 = _context42.sent.length;
          _context42.t1 = '0x'.length;

          if (!(_context42.t0 <= _context42.t1)) {
            _context42.next = 8;
            break;
          }

          return _context42.abrupt("return", token.send(to, amount, data, {
            from: holder
          }));

        case 8:
          _context42.next = 10;
          return regeneratorRuntime.awrap(ERC777SenderRecipientMock.at(holder));

        case 10:
          _context42.t2 = token.address;
          _context42.t3 = to;
          _context42.t4 = amount;
          _context42.t5 = data;
          return _context42.abrupt("return", _context42.sent.send(_context42.t2, _context42.t3, _context42.t4, _context42.t5));

        case 15:
        case "end":
          return _context42.stop();
      }
    }
  });
}

function burnFromHolder(token, holder, amount, data) {
  return regeneratorRuntime.async(function burnFromHolder$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.next = 2;
          return regeneratorRuntime.awrap(web3.eth.getCode(holder));

        case 2:
          _context43.t0 = _context43.sent.length;
          _context43.t1 = '0x'.length;

          if (!(_context43.t0 <= _context43.t1)) {
            _context43.next = 8;
            break;
          }

          return _context43.abrupt("return", token.burn(amount, data, {
            from: holder
          }));

        case 8:
          _context43.next = 10;
          return regeneratorRuntime.awrap(ERC777SenderRecipientMock.at(holder));

        case 10:
          _context43.t2 = token.address;
          _context43.t3 = amount;
          _context43.t4 = data;
          return _context43.abrupt("return", _context43.sent.burn(_context43.t2, _context43.t3, _context43.t4));

        case 14:
        case "end":
          return _context43.stop();
      }
    }
  });
}

module.exports = {
  shouldBehaveLikeERC777DirectSendBurn: shouldBehaveLikeERC777DirectSendBurn,
  shouldBehaveLikeERC777OperatorSendBurn: shouldBehaveLikeERC777OperatorSendBurn,
  shouldBehaveLikeERC777UnauthorizedOperatorSendBurn: shouldBehaveLikeERC777UnauthorizedOperatorSendBurn,
  shouldBehaveLikeERC777InternalMint: shouldBehaveLikeERC777InternalMint,
  shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook: shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook,
  shouldBehaveLikeERC777SendBurnWithSendHook: shouldBehaveLikeERC777SendBurnWithSendHook
};