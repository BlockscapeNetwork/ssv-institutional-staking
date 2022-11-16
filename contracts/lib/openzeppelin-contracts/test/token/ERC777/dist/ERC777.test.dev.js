"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert,
    singletons = _require.singletons;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('./ERC777.behavior'),
    shouldBehaveLikeERC777DirectSendBurn = _require3.shouldBehaveLikeERC777DirectSendBurn,
    shouldBehaveLikeERC777OperatorSendBurn = _require3.shouldBehaveLikeERC777OperatorSendBurn,
    shouldBehaveLikeERC777UnauthorizedOperatorSendBurn = _require3.shouldBehaveLikeERC777UnauthorizedOperatorSendBurn,
    shouldBehaveLikeERC777InternalMint = _require3.shouldBehaveLikeERC777InternalMint,
    shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook = _require3.shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook,
    shouldBehaveLikeERC777SendBurnWithSendHook = _require3.shouldBehaveLikeERC777SendBurnWithSendHook;

var _require4 = require('../ERC20/ERC20.behavior'),
    shouldBehaveLikeERC20 = _require4.shouldBehaveLikeERC20,
    shouldBehaveLikeERC20Approve = _require4.shouldBehaveLikeERC20Approve;

var ERC777 = artifacts.require('ERC777Mock');

var ERC777SenderRecipientMock = artifacts.require('ERC777SenderRecipientMock');

contract('ERC777', function (accounts) {
  var _accounts = _slicedToArray(accounts, 6),
      registryFunder = _accounts[0],
      holder = _accounts[1],
      defaultOperatorA = _accounts[2],
      defaultOperatorB = _accounts[3],
      newOperator = _accounts[4],
      anyone = _accounts[5];

  var initialSupply = new BN('10000');
  var name = 'ERC777Test';
  var symbol = '777T';
  var data = web3.utils.sha3('OZ777TestData');
  var operatorData = web3.utils.sha3('OZ777TestOperatorData');
  var defaultOperators = [defaultOperatorA, defaultOperatorB];
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(singletons.ERC1820Registry(registryFunder));

          case 2:
            this.erc1820 = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('with default operators', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(ERC777["new"](holder, initialSupply, name, symbol, defaultOperators));

            case 2:
              this.token = _context2.sent;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    describe('as an ERC20 token', function () {
      shouldBehaveLikeERC20('ERC777', initialSupply, holder, anyone, defaultOperatorA);
      describe('_approve', function () {
        shouldBehaveLikeERC20Approve('ERC777', holder, anyone, initialSupply, function (owner, spender, amount) {
          return this.token.approveInternal(owner, spender, amount);
        });
        describe('when the owner is the zero address', function () {
          it('reverts', function _callee3() {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.token.approveInternal(ZERO_ADDRESS, anyone, initialSupply), 'ERC777: approve from the zero address'));

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, null, this);
          });
        });
      });
    });
    it('does not emit AuthorizedOperator events for default operators', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectEvent.notEmitted.inConstruction(this.token, 'AuthorizedOperator'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    describe('basic information', function () {
      it('returns the name', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = expect;
                _context5.next = 3;
                return regeneratorRuntime.awrap(this.token.name());

              case 3:
                _context5.t1 = _context5.sent;
                _context5.t2 = name;
                (0, _context5.t0)(_context5.t1).to.equal(_context5.t2);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('returns the symbol', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = expect;
                _context6.next = 3;
                return regeneratorRuntime.awrap(this.token.symbol());

              case 3:
                _context6.t1 = _context6.sent;
                _context6.t2 = symbol;
                (0, _context6.t0)(_context6.t1).to.equal(_context6.t2);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('returns a granularity of 1', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.t0 = expect;
                _context7.next = 3;
                return regeneratorRuntime.awrap(this.token.granularity());

              case 3:
                _context7.t1 = _context7.sent;
                (0, _context7.t0)(_context7.t1).to.be.bignumber.equal('1');

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('returns the default operators', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = expect;
                _context8.next = 3;
                return regeneratorRuntime.awrap(this.token.defaultOperators());

              case 3:
                _context8.t1 = _context8.sent;
                _context8.t2 = defaultOperators;
                (0, _context8.t0)(_context8.t1).to.deep.equal(_context8.t2);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('default operators are operators for all accounts', function _callee9() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, operator;

        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context9.prev = 3;
                _iterator = defaultOperators[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context9.next = 15;
                  break;
                }

                operator = _step.value;
                _context9.t0 = expect;
                _context9.next = 10;
                return regeneratorRuntime.awrap(this.token.isOperatorFor(operator, anyone));

              case 10:
                _context9.t1 = _context9.sent;
                (0, _context9.t0)(_context9.t1).to.equal(true);

              case 12:
                _iteratorNormalCompletion = true;
                _context9.next = 5;
                break;

              case 15:
                _context9.next = 21;
                break;

              case 17:
                _context9.prev = 17;
                _context9.t2 = _context9["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context9.t2;

              case 21:
                _context9.prev = 21;
                _context9.prev = 22;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 24:
                _context9.prev = 24;

                if (!_didIteratorError) {
                  _context9.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context9.finish(24);

              case 28:
                return _context9.finish(21);

              case 29:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this, [[3, 17, 21, 29], [22,, 24, 28]]);
      });
      it('returns the total supply', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = expect;
                _context10.next = 3;
                return regeneratorRuntime.awrap(this.token.totalSupply());

              case 3:
                _context10.t1 = _context10.sent;
                _context10.t2 = initialSupply;
                (0, _context10.t0)(_context10.t1).to.be.bignumber.equal(_context10.t2);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('returns 18 when decimals is called', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.t0 = expect;
                _context11.next = 3;
                return regeneratorRuntime.awrap(this.token.decimals());

              case 3:
                _context11.t1 = _context11.sent;
                (0, _context11.t0)(_context11.t1).to.be.bignumber.equal('18');

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('the ERC777Token interface is registered in the registry', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.t0 = expect;
                _context12.next = 3;
                return regeneratorRuntime.awrap(this.erc1820.getInterfaceImplementer(this.token.address, web3.utils.soliditySha3('ERC777Token')));

              case 3:
                _context12.t1 = _context12.sent;
                _context12.t2 = this.token.address;
                (0, _context12.t0)(_context12.t1).to.equal(_context12.t2);

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('the ERC20Token interface is registered in the registry', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.t0 = expect;
                _context13.next = 3;
                return regeneratorRuntime.awrap(this.erc1820.getInterfaceImplementer(this.token.address, web3.utils.soliditySha3('ERC20Token')));

              case 3:
                _context13.t1 = _context13.sent;
                _context13.t2 = this.token.address;
                (0, _context13.t0)(_context13.t1).to.equal(_context13.t2);

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
    });
    describe('balanceOf', function () {
      context('for an account with no tokens', function () {
        it('returns zero', function _callee14() {
          return regeneratorRuntime.async(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.t0 = expect;
                  _context14.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(anyone));

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
      context('for an account with tokens', function () {
        it('returns their balance', function _callee15() {
          return regeneratorRuntime.async(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.t0 = expect;
                  _context15.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(holder));

                case 3:
                  _context15.t1 = _context15.sent;
                  _context15.t2 = initialSupply;
                  (0, _context15.t0)(_context15.t1).to.be.bignumber.equal(_context15.t2);

                case 6:
                case "end":
                  return _context15.stop();
              }
            }
          }, null, this);
        });
      });
    });
    context('with no ERC777TokensSender and no ERC777TokensRecipient implementers', function () {
      describe('send/burn', function () {
        shouldBehaveLikeERC777DirectSendBurn(holder, anyone, data);
        context('with self operator', function () {
          shouldBehaveLikeERC777OperatorSendBurn(holder, anyone, holder, data, operatorData);
        });
        context('with first default operator', function () {
          shouldBehaveLikeERC777OperatorSendBurn(holder, anyone, defaultOperatorA, data, operatorData);
        });
        context('with second default operator', function () {
          shouldBehaveLikeERC777OperatorSendBurn(holder, anyone, defaultOperatorB, data, operatorData);
        });
        context('before authorizing a new operator', function () {
          shouldBehaveLikeERC777UnauthorizedOperatorSendBurn(holder, anyone, newOperator, data, operatorData);
        });
        context('with new authorized operator', function () {
          beforeEach(function _callee16() {
            return regeneratorRuntime.async(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return regeneratorRuntime.awrap(this.token.authorizeOperator(newOperator, {
                      from: holder
                    }));

                  case 2:
                  case "end":
                    return _context16.stop();
                }
              }
            }, null, this);
          });
          shouldBehaveLikeERC777OperatorSendBurn(holder, anyone, newOperator, data, operatorData);
          context('with revoked operator', function () {
            beforeEach(function _callee17() {
              return regeneratorRuntime.async(function _callee17$(_context17) {
                while (1) {
                  switch (_context17.prev = _context17.next) {
                    case 0:
                      _context17.next = 2;
                      return regeneratorRuntime.awrap(this.token.revokeOperator(newOperator, {
                        from: holder
                      }));

                    case 2:
                    case "end":
                      return _context17.stop();
                  }
                }
              }, null, this);
            });
            shouldBehaveLikeERC777UnauthorizedOperatorSendBurn(holder, anyone, newOperator, data, operatorData);
          });
        });
      });
      describe('mint (internal)', function () {
        var to = anyone;
        var amount = new BN('5');
        context('with default operator', function () {
          var operator = defaultOperatorA;
          shouldBehaveLikeERC777InternalMint(to, operator, amount, data, operatorData);
        });
        context('with non operator', function () {
          var operator = newOperator;
          shouldBehaveLikeERC777InternalMint(to, operator, amount, data, operatorData);
        });
      });
      describe('mint (internal extended)', function () {
        var amount = new BN('5');
        context('to anyone', function () {
          beforeEach(function _callee18() {
            return regeneratorRuntime.async(function _callee18$(_context18) {
              while (1) {
                switch (_context18.prev = _context18.next) {
                  case 0:
                    this.recipient = anyone;

                  case 1:
                  case "end":
                    return _context18.stop();
                }
              }
            }, null, this);
          });
          context('with default operator', function () {
            var operator = defaultOperatorA;
            it('without requireReceptionAck', function _callee19() {
              return regeneratorRuntime.async(function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      _context19.next = 2;
                      return regeneratorRuntime.awrap(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, false, {
                        from: operator
                      }));

                    case 2:
                    case "end":
                      return _context19.stop();
                  }
                }
              }, null, this);
            });
            it('with requireReceptionAck', function _callee20() {
              return regeneratorRuntime.async(function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      _context20.next = 2;
                      return regeneratorRuntime.awrap(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, true, {
                        from: operator
                      }));

                    case 2:
                    case "end":
                      return _context20.stop();
                  }
                }
              }, null, this);
            });
          });
          context('with non operator', function () {
            var operator = newOperator;
            it('without requireReceptionAck', function _callee21() {
              return regeneratorRuntime.async(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      _context21.next = 2;
                      return regeneratorRuntime.awrap(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, false, {
                        from: operator
                      }));

                    case 2:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, null, this);
            });
            it('with requireReceptionAck', function _callee22() {
              return regeneratorRuntime.async(function _callee22$(_context22) {
                while (1) {
                  switch (_context22.prev = _context22.next) {
                    case 0:
                      _context22.next = 2;
                      return regeneratorRuntime.awrap(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, true, {
                        from: operator
                      }));

                    case 2:
                    case "end":
                      return _context22.stop();
                  }
                }
              }, null, this);
            });
          });
        });
        context('to non ERC777TokensRecipient implementer', function () {
          beforeEach(function _callee23() {
            return regeneratorRuntime.async(function _callee23$(_context23) {
              while (1) {
                switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.next = 2;
                    return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                  case 2:
                    this.tokensRecipientImplementer = _context23.sent;
                    this.recipient = this.tokensRecipientImplementer.address;

                  case 4:
                  case "end":
                    return _context23.stop();
                }
              }
            }, null, this);
          });
          context('with default operator', function () {
            var operator = defaultOperatorA;
            it('without requireReceptionAck', function _callee24() {
              return regeneratorRuntime.async(function _callee24$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      _context24.next = 2;
                      return regeneratorRuntime.awrap(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, false, {
                        from: operator
                      }));

                    case 2:
                    case "end":
                      return _context24.stop();
                  }
                }
              }, null, this);
            });
            it('with requireReceptionAck', function _callee25() {
              return regeneratorRuntime.async(function _callee25$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      _context25.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, true, {
                        from: operator
                      }), 'ERC777: token recipient contract has no implementer for ERC777TokensRecipient'));

                    case 2:
                    case "end":
                      return _context25.stop();
                  }
                }
              }, null, this);
            });
          });
          context('with non operator', function () {
            var operator = newOperator;
            it('without requireReceptionAck', function _callee26() {
              return regeneratorRuntime.async(function _callee26$(_context26) {
                while (1) {
                  switch (_context26.prev = _context26.next) {
                    case 0:
                      _context26.next = 2;
                      return regeneratorRuntime.awrap(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, false, {
                        from: operator
                      }));

                    case 2:
                    case "end":
                      return _context26.stop();
                  }
                }
              }, null, this);
            });
            it('with requireReceptionAck', function _callee27() {
              return regeneratorRuntime.async(function _callee27$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      _context27.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.mintInternalExtended(this.recipient, amount, data, operatorData, true, {
                        from: operator
                      }), 'ERC777: token recipient contract has no implementer for ERC777TokensRecipient'));

                    case 2:
                    case "end":
                      return _context27.stop();
                  }
                }
              }, null, this);
            });
          });
        });
      });
    });
    describe('operator management', function () {
      it('accounts are their own operator', function _callee28() {
        return regeneratorRuntime.async(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.t0 = expect;
                _context28.next = 3;
                return regeneratorRuntime.awrap(this.token.isOperatorFor(holder, holder));

              case 3:
                _context28.t1 = _context28.sent;
                (0, _context28.t0)(_context28.t1).to.equal(true);

              case 5:
              case "end":
                return _context28.stop();
            }
          }
        }, null, this);
      });
      it('reverts when self-authorizing', function _callee29() {
        return regeneratorRuntime.async(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.authorizeOperator(holder, {
                  from: holder
                }), 'ERC777: authorizing self as operator'));

              case 2:
              case "end":
                return _context29.stop();
            }
          }
        }, null, this);
      });
      it('reverts when self-revoking', function _callee30() {
        return regeneratorRuntime.async(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.revokeOperator(holder, {
                  from: holder
                }), 'ERC777: revoking self as operator'));

              case 2:
              case "end":
                return _context30.stop();
            }
          }
        }, null, this);
      });
      it('non-operators can be revoked', function _callee31() {
        var receipt;
        return regeneratorRuntime.async(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.t0 = expect;
                _context31.next = 3;
                return regeneratorRuntime.awrap(this.token.isOperatorFor(newOperator, holder));

              case 3:
                _context31.t1 = _context31.sent;
                (0, _context31.t0)(_context31.t1).to.equal(false);
                _context31.next = 7;
                return regeneratorRuntime.awrap(this.token.revokeOperator(newOperator, {
                  from: holder
                }));

              case 7:
                receipt = _context31.sent;
                expectEvent(receipt, 'RevokedOperator', {
                  operator: newOperator,
                  tokenHolder: holder
                });
                _context31.t2 = expect;
                _context31.next = 12;
                return regeneratorRuntime.awrap(this.token.isOperatorFor(newOperator, holder));

              case 12:
                _context31.t3 = _context31.sent;
                (0, _context31.t2)(_context31.t3).to.equal(false);

              case 14:
              case "end":
                return _context31.stop();
            }
          }
        }, null, this);
      });
      it('non-operators can be authorized', function _callee32() {
        var receipt;
        return regeneratorRuntime.async(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.t0 = expect;
                _context32.next = 3;
                return regeneratorRuntime.awrap(this.token.isOperatorFor(newOperator, holder));

              case 3:
                _context32.t1 = _context32.sent;
                (0, _context32.t0)(_context32.t1).to.equal(false);
                _context32.next = 7;
                return regeneratorRuntime.awrap(this.token.authorizeOperator(newOperator, {
                  from: holder
                }));

              case 7:
                receipt = _context32.sent;
                expectEvent(receipt, 'AuthorizedOperator', {
                  operator: newOperator,
                  tokenHolder: holder
                });
                _context32.t2 = expect;
                _context32.next = 12;
                return regeneratorRuntime.awrap(this.token.isOperatorFor(newOperator, holder));

              case 12:
                _context32.t3 = _context32.sent;
                (0, _context32.t2)(_context32.t3).to.equal(true);

              case 14:
              case "end":
                return _context32.stop();
            }
          }
        }, null, this);
      });
      describe('new operators', function () {
        beforeEach(function _callee33() {
          return regeneratorRuntime.async(function _callee33$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  _context33.next = 2;
                  return regeneratorRuntime.awrap(this.token.authorizeOperator(newOperator, {
                    from: holder
                  }));

                case 2:
                case "end":
                  return _context33.stop();
              }
            }
          }, null, this);
        });
        it('are not added to the default operators list', function _callee34() {
          return regeneratorRuntime.async(function _callee34$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  _context34.t0 = expect;
                  _context34.next = 3;
                  return regeneratorRuntime.awrap(this.token.defaultOperators());

                case 3:
                  _context34.t1 = _context34.sent;
                  _context34.t2 = defaultOperators;
                  (0, _context34.t0)(_context34.t1).to.deep.equal(_context34.t2);

                case 6:
                case "end":
                  return _context34.stop();
              }
            }
          }, null, this);
        });
        it('can be re-authorized', function _callee35() {
          var receipt;
          return regeneratorRuntime.async(function _callee35$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  _context35.next = 2;
                  return regeneratorRuntime.awrap(this.token.authorizeOperator(newOperator, {
                    from: holder
                  }));

                case 2:
                  receipt = _context35.sent;
                  expectEvent(receipt, 'AuthorizedOperator', {
                    operator: newOperator,
                    tokenHolder: holder
                  });
                  _context35.t0 = expect;
                  _context35.next = 7;
                  return regeneratorRuntime.awrap(this.token.isOperatorFor(newOperator, holder));

                case 7:
                  _context35.t1 = _context35.sent;
                  (0, _context35.t0)(_context35.t1).to.equal(true);

                case 9:
                case "end":
                  return _context35.stop();
              }
            }
          }, null, this);
        });
        it('can be revoked', function _callee36() {
          var receipt;
          return regeneratorRuntime.async(function _callee36$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  _context36.next = 2;
                  return regeneratorRuntime.awrap(this.token.revokeOperator(newOperator, {
                    from: holder
                  }));

                case 2:
                  receipt = _context36.sent;
                  expectEvent(receipt, 'RevokedOperator', {
                    operator: newOperator,
                    tokenHolder: holder
                  });
                  _context36.t0 = expect;
                  _context36.next = 7;
                  return regeneratorRuntime.awrap(this.token.isOperatorFor(newOperator, holder));

                case 7:
                  _context36.t1 = _context36.sent;
                  (0, _context36.t0)(_context36.t1).to.equal(false);

                case 9:
                case "end":
                  return _context36.stop();
              }
            }
          }, null, this);
        });
      });
      describe('default operators', function () {
        it('can be re-authorized', function _callee37() {
          var receipt;
          return regeneratorRuntime.async(function _callee37$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  _context37.next = 2;
                  return regeneratorRuntime.awrap(this.token.authorizeOperator(defaultOperatorA, {
                    from: holder
                  }));

                case 2:
                  receipt = _context37.sent;
                  expectEvent(receipt, 'AuthorizedOperator', {
                    operator: defaultOperatorA,
                    tokenHolder: holder
                  });
                  _context37.t0 = expect;
                  _context37.next = 7;
                  return regeneratorRuntime.awrap(this.token.isOperatorFor(defaultOperatorA, holder));

                case 7:
                  _context37.t1 = _context37.sent;
                  (0, _context37.t0)(_context37.t1).to.equal(true);

                case 9:
                case "end":
                  return _context37.stop();
              }
            }
          }, null, this);
        });
        it('can be revoked', function _callee38() {
          var receipt;
          return regeneratorRuntime.async(function _callee38$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  _context38.next = 2;
                  return regeneratorRuntime.awrap(this.token.revokeOperator(defaultOperatorA, {
                    from: holder
                  }));

                case 2:
                  receipt = _context38.sent;
                  expectEvent(receipt, 'RevokedOperator', {
                    operator: defaultOperatorA,
                    tokenHolder: holder
                  });
                  _context38.t0 = expect;
                  _context38.next = 7;
                  return regeneratorRuntime.awrap(this.token.isOperatorFor(defaultOperatorA, holder));

                case 7:
                  _context38.t1 = _context38.sent;
                  (0, _context38.t0)(_context38.t1).to.equal(false);

                case 9:
                case "end":
                  return _context38.stop();
              }
            }
          }, null, this);
        });
        it('cannot be revoked for themselves', function _callee39() {
          return regeneratorRuntime.async(function _callee39$(_context39) {
            while (1) {
              switch (_context39.prev = _context39.next) {
                case 0:
                  _context39.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.revokeOperator(defaultOperatorA, {
                    from: defaultOperatorA
                  }), 'ERC777: revoking self as operator'));

                case 2:
                case "end":
                  return _context39.stop();
              }
            }
          }, null, this);
        });
        context('with revoked default operator', function () {
          beforeEach(function _callee40() {
            return regeneratorRuntime.async(function _callee40$(_context40) {
              while (1) {
                switch (_context40.prev = _context40.next) {
                  case 0:
                    _context40.next = 2;
                    return regeneratorRuntime.awrap(this.token.revokeOperator(defaultOperatorA, {
                      from: holder
                    }));

                  case 2:
                  case "end":
                    return _context40.stop();
                }
              }
            }, null, this);
          });
          it('default operator is not revoked for other holders', function _callee41() {
            return regeneratorRuntime.async(function _callee41$(_context41) {
              while (1) {
                switch (_context41.prev = _context41.next) {
                  case 0:
                    _context41.t0 = expect;
                    _context41.next = 3;
                    return regeneratorRuntime.awrap(this.token.isOperatorFor(defaultOperatorA, anyone));

                  case 3:
                    _context41.t1 = _context41.sent;
                    (0, _context41.t0)(_context41.t1).to.equal(true);

                  case 5:
                  case "end":
                    return _context41.stop();
                }
              }
            }, null, this);
          });
          it('other default operators are not revoked', function _callee42() {
            return regeneratorRuntime.async(function _callee42$(_context42) {
              while (1) {
                switch (_context42.prev = _context42.next) {
                  case 0:
                    _context42.t0 = expect;
                    _context42.next = 3;
                    return regeneratorRuntime.awrap(this.token.isOperatorFor(defaultOperatorB, holder));

                  case 3:
                    _context42.t1 = _context42.sent;
                    (0, _context42.t0)(_context42.t1).to.equal(true);

                  case 5:
                  case "end":
                    return _context42.stop();
                }
              }
            }, null, this);
          });
          it('default operators list is not modified', function _callee43() {
            return regeneratorRuntime.async(function _callee43$(_context43) {
              while (1) {
                switch (_context43.prev = _context43.next) {
                  case 0:
                    _context43.t0 = expect;
                    _context43.next = 3;
                    return regeneratorRuntime.awrap(this.token.defaultOperators());

                  case 3:
                    _context43.t1 = _context43.sent;
                    _context43.t2 = defaultOperators;
                    (0, _context43.t0)(_context43.t1).to.deep.equal(_context43.t2);

                  case 6:
                  case "end":
                    return _context43.stop();
                }
              }
            }, null, this);
          });
          it('revoked default operator can be re-authorized', function _callee44() {
            var receipt;
            return regeneratorRuntime.async(function _callee44$(_context44) {
              while (1) {
                switch (_context44.prev = _context44.next) {
                  case 0:
                    _context44.next = 2;
                    return regeneratorRuntime.awrap(this.token.authorizeOperator(defaultOperatorA, {
                      from: holder
                    }));

                  case 2:
                    receipt = _context44.sent;
                    expectEvent(receipt, 'AuthorizedOperator', {
                      operator: defaultOperatorA,
                      tokenHolder: holder
                    });
                    _context44.t0 = expect;
                    _context44.next = 7;
                    return regeneratorRuntime.awrap(this.token.isOperatorFor(defaultOperatorA, holder));

                  case 7:
                    _context44.t1 = _context44.sent;
                    (0, _context44.t0)(_context44.t1).to.equal(true);

                  case 9:
                  case "end":
                    return _context44.stop();
                }
              }
            }, null, this);
          });
        });
      });
    });
    describe('send and receive hooks', function () {
      var amount = new BN('1');
      var operator = defaultOperatorA; // sender and recipient are stored inside 'this', since in some tests their addresses are determined dynamically

      describe('tokensReceived', function () {
        beforeEach(function () {
          this.sender = holder;
        });
        context('with no ERC777TokensRecipient implementer', function () {
          context('with contract recipient', function () {
            beforeEach(function _callee45() {
              return regeneratorRuntime.async(function _callee45$(_context45) {
                while (1) {
                  switch (_context45.prev = _context45.next) {
                    case 0:
                      _context45.next = 2;
                      return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                    case 2:
                      this.tokensRecipientImplementer = _context45.sent;
                      this.recipient = this.tokensRecipientImplementer.address; // Note that tokensRecipientImplementer doesn't implement the recipient interface for the recipient

                    case 4:
                    case "end":
                      return _context45.stop();
                  }
                }
              }, null, this);
            });
            it('send reverts', function _callee46() {
              return regeneratorRuntime.async(function _callee46$(_context46) {
                while (1) {
                  switch (_context46.prev = _context46.next) {
                    case 0:
                      _context46.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.send(this.recipient, amount, data, {
                        from: holder
                      }), 'ERC777: token recipient contract has no implementer for ERC777TokensRecipient'));

                    case 2:
                    case "end":
                      return _context46.stop();
                  }
                }
              }, null, this);
            });
            it('operatorSend reverts', function _callee47() {
              return regeneratorRuntime.async(function _callee47$(_context47) {
                while (1) {
                  switch (_context47.prev = _context47.next) {
                    case 0:
                      _context47.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.operatorSend(this.sender, this.recipient, amount, data, operatorData, {
                        from: operator
                      }), 'ERC777: token recipient contract has no implementer for ERC777TokensRecipient'));

                    case 2:
                    case "end":
                      return _context47.stop();
                  }
                }
              }, null, this);
            });
            it('mint (internal) reverts', function _callee48() {
              return regeneratorRuntime.async(function _callee48$(_context48) {
                while (1) {
                  switch (_context48.prev = _context48.next) {
                    case 0:
                      _context48.next = 2;
                      return regeneratorRuntime.awrap(expectRevert(this.token.mintInternal(this.recipient, amount, data, operatorData, {
                        from: operator
                      }), 'ERC777: token recipient contract has no implementer for ERC777TokensRecipient'));

                    case 2:
                    case "end":
                      return _context48.stop();
                  }
                }
              }, null, this);
            });
            it('(ERC20) transfer succeeds', function _callee49() {
              return regeneratorRuntime.async(function _callee49$(_context49) {
                while (1) {
                  switch (_context49.prev = _context49.next) {
                    case 0:
                      _context49.next = 2;
                      return regeneratorRuntime.awrap(this.token.transfer(this.recipient, amount, {
                        from: holder
                      }));

                    case 2:
                    case "end":
                      return _context49.stop();
                  }
                }
              }, null, this);
            });
            it('(ERC20) transferFrom succeeds', function _callee50() {
              var approved;
              return regeneratorRuntime.async(function _callee50$(_context50) {
                while (1) {
                  switch (_context50.prev = _context50.next) {
                    case 0:
                      approved = anyone;
                      _context50.next = 3;
                      return regeneratorRuntime.awrap(this.token.approve(approved, amount, {
                        from: this.sender
                      }));

                    case 3:
                      _context50.next = 5;
                      return regeneratorRuntime.awrap(this.token.transferFrom(this.sender, this.recipient, amount, {
                        from: approved
                      }));

                    case 5:
                    case "end":
                      return _context50.stop();
                  }
                }
              }, null, this);
            });
          });
        });
        context('with ERC777TokensRecipient implementer', function () {
          context('with contract as implementer for an externally owned account', function () {
            beforeEach(function _callee51() {
              return regeneratorRuntime.async(function _callee51$(_context51) {
                while (1) {
                  switch (_context51.prev = _context51.next) {
                    case 0:
                      _context51.next = 2;
                      return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                    case 2:
                      this.tokensRecipientImplementer = _context51.sent;
                      this.recipient = anyone;
                      _context51.next = 6;
                      return regeneratorRuntime.awrap(this.tokensRecipientImplementer.recipientFor(this.recipient));

                    case 6:
                      _context51.next = 8;
                      return regeneratorRuntime.awrap(this.erc1820.setInterfaceImplementer(this.recipient, web3.utils.soliditySha3('ERC777TokensRecipient'), this.tokensRecipientImplementer.address, {
                        from: this.recipient
                      }));

                    case 8:
                    case "end":
                      return _context51.stop();
                  }
                }
              }, null, this);
            });
            shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook(operator, amount, data, operatorData);
          });
          context('with contract as implementer for another contract', function () {
            beforeEach(function _callee52() {
              return regeneratorRuntime.async(function _callee52$(_context52) {
                while (1) {
                  switch (_context52.prev = _context52.next) {
                    case 0:
                      _context52.next = 2;
                      return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                    case 2:
                      this.recipientContract = _context52.sent;
                      this.recipient = this.recipientContract.address;
                      _context52.next = 6;
                      return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                    case 6:
                      this.tokensRecipientImplementer = _context52.sent;
                      _context52.next = 9;
                      return regeneratorRuntime.awrap(this.tokensRecipientImplementer.recipientFor(this.recipient));

                    case 9:
                      _context52.next = 11;
                      return regeneratorRuntime.awrap(this.recipientContract.registerRecipient(this.tokensRecipientImplementer.address));

                    case 11:
                    case "end":
                      return _context52.stop();
                  }
                }
              }, null, this);
            });
            shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook(operator, amount, data, operatorData);
          });
          context('with contract as implementer for itself', function () {
            beforeEach(function _callee53() {
              return regeneratorRuntime.async(function _callee53$(_context53) {
                while (1) {
                  switch (_context53.prev = _context53.next) {
                    case 0:
                      _context53.next = 2;
                      return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                    case 2:
                      this.tokensRecipientImplementer = _context53.sent;
                      this.recipient = this.tokensRecipientImplementer.address;
                      _context53.next = 6;
                      return regeneratorRuntime.awrap(this.tokensRecipientImplementer.recipientFor(this.recipient));

                    case 6:
                    case "end":
                      return _context53.stop();
                  }
                }
              }, null, this);
            });
            shouldBehaveLikeERC777SendBurnMintInternalWithReceiveHook(operator, amount, data, operatorData);
          });
        });
      });
      describe('tokensToSend', function () {
        beforeEach(function () {
          this.recipient = anyone;
        });
        context('with a contract as implementer for an externally owned account', function () {
          beforeEach(function _callee54() {
            return regeneratorRuntime.async(function _callee54$(_context54) {
              while (1) {
                switch (_context54.prev = _context54.next) {
                  case 0:
                    _context54.next = 2;
                    return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                  case 2:
                    this.tokensSenderImplementer = _context54.sent;
                    this.sender = holder;
                    _context54.next = 6;
                    return regeneratorRuntime.awrap(this.tokensSenderImplementer.senderFor(this.sender));

                  case 6:
                    _context54.next = 8;
                    return regeneratorRuntime.awrap(this.erc1820.setInterfaceImplementer(this.sender, web3.utils.soliditySha3('ERC777TokensSender'), this.tokensSenderImplementer.address, {
                      from: this.sender
                    }));

                  case 8:
                  case "end":
                    return _context54.stop();
                }
              }
            }, null, this);
          });
          shouldBehaveLikeERC777SendBurnWithSendHook(operator, amount, data, operatorData);
        });
        context('with contract as implementer for another contract', function () {
          beforeEach(function _callee55() {
            return regeneratorRuntime.async(function _callee55$(_context55) {
              while (1) {
                switch (_context55.prev = _context55.next) {
                  case 0:
                    _context55.next = 2;
                    return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                  case 2:
                    this.senderContract = _context55.sent;
                    this.sender = this.senderContract.address;
                    _context55.next = 6;
                    return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                  case 6:
                    this.tokensSenderImplementer = _context55.sent;
                    _context55.next = 9;
                    return regeneratorRuntime.awrap(this.tokensSenderImplementer.senderFor(this.sender));

                  case 9:
                    _context55.next = 11;
                    return regeneratorRuntime.awrap(this.senderContract.registerSender(this.tokensSenderImplementer.address));

                  case 11:
                    _context55.next = 13;
                    return regeneratorRuntime.awrap(this.senderContract.recipientFor(this.sender));

                  case 13:
                    _context55.next = 15;
                    return regeneratorRuntime.awrap(this.token.send(this.sender, amount, data, {
                      from: holder
                    }));

                  case 15:
                  case "end":
                    return _context55.stop();
                }
              }
            }, null, this);
          });
          shouldBehaveLikeERC777SendBurnWithSendHook(operator, amount, data, operatorData);
        });
        context('with a contract as implementer for itself', function () {
          beforeEach(function _callee56() {
            return regeneratorRuntime.async(function _callee56$(_context56) {
              while (1) {
                switch (_context56.prev = _context56.next) {
                  case 0:
                    _context56.next = 2;
                    return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

                  case 2:
                    this.tokensSenderImplementer = _context56.sent;
                    this.sender = this.tokensSenderImplementer.address;
                    _context56.next = 6;
                    return regeneratorRuntime.awrap(this.tokensSenderImplementer.senderFor(this.sender));

                  case 6:
                    _context56.next = 8;
                    return regeneratorRuntime.awrap(this.tokensSenderImplementer.recipientFor(this.sender));

                  case 8:
                    _context56.next = 10;
                    return regeneratorRuntime.awrap(this.token.send(this.sender, amount, data, {
                      from: holder
                    }));

                  case 10:
                  case "end":
                    return _context56.stop();
                }
              }
            }, null, this);
          });
          shouldBehaveLikeERC777SendBurnWithSendHook(operator, amount, data, operatorData);
        });
      });
    });
  });
  context('with no default operators', function () {
    beforeEach(function _callee57() {
      return regeneratorRuntime.async(function _callee57$(_context57) {
        while (1) {
          switch (_context57.prev = _context57.next) {
            case 0:
              _context57.next = 2;
              return regeneratorRuntime.awrap(ERC777["new"](holder, initialSupply, name, symbol, []));

            case 2:
              this.token = _context57.sent;

            case 3:
            case "end":
              return _context57.stop();
          }
        }
      }, null, this);
    });
    it('default operators list is empty', function _callee58() {
      return regeneratorRuntime.async(function _callee58$(_context58) {
        while (1) {
          switch (_context58.prev = _context58.next) {
            case 0:
              _context58.t0 = expect;
              _context58.next = 3;
              return regeneratorRuntime.awrap(this.token.defaultOperators());

            case 3:
              _context58.t1 = _context58.sent;
              _context58.t2 = [];
              (0, _context58.t0)(_context58.t1).to.deep.equal(_context58.t2);

            case 6:
            case "end":
              return _context58.stop();
          }
        }
      }, null, this);
    });
  });
  describe('relative order of hooks', function () {
    beforeEach(function _callee59() {
      return regeneratorRuntime.async(function _callee59$(_context59) {
        while (1) {
          switch (_context59.prev = _context59.next) {
            case 0:
              _context59.next = 2;
              return regeneratorRuntime.awrap(singletons.ERC1820Registry(registryFunder));

            case 2:
              _context59.next = 4;
              return regeneratorRuntime.awrap(ERC777SenderRecipientMock["new"]());

            case 4:
              this.sender = _context59.sent;
              _context59.next = 7;
              return regeneratorRuntime.awrap(this.sender.registerRecipient(this.sender.address));

            case 7:
              _context59.next = 9;
              return regeneratorRuntime.awrap(this.sender.registerSender(this.sender.address));

            case 9:
              _context59.next = 11;
              return regeneratorRuntime.awrap(ERC777["new"](holder, initialSupply, name, symbol, []));

            case 11:
              this.token = _context59.sent;
              _context59.next = 14;
              return regeneratorRuntime.awrap(this.token.send(this.sender.address, 1, '0x', {
                from: holder
              }));

            case 14:
            case "end":
              return _context59.stop();
          }
        }
      }, null, this);
    });
    it('send', function _callee60() {
      var _ref, receipt, internalBeforeHook, externalSendHook;

      return regeneratorRuntime.async(function _callee60$(_context60) {
        while (1) {
          switch (_context60.prev = _context60.next) {
            case 0:
              _context60.next = 2;
              return regeneratorRuntime.awrap(this.sender.send(this.token.address, anyone, 1, '0x'));

            case 2:
              _ref = _context60.sent;
              receipt = _ref.receipt;
              internalBeforeHook = receipt.logs.findIndex(function (l) {
                return l.event === 'BeforeTokenTransfer';
              });
              expect(internalBeforeHook).to.be.gte(0);
              externalSendHook = receipt.logs.findIndex(function (l) {
                return l.event === 'TokensToSendCalled';
              });
              expect(externalSendHook).to.be.gte(0);
              expect(externalSendHook).to.be.lt(internalBeforeHook);

            case 9:
            case "end":
              return _context60.stop();
          }
        }
      }, null, this);
    });
    it('burn', function _callee61() {
      var _ref2, receipt, internalBeforeHook, externalSendHook;

      return regeneratorRuntime.async(function _callee61$(_context61) {
        while (1) {
          switch (_context61.prev = _context61.next) {
            case 0:
              _context61.next = 2;
              return regeneratorRuntime.awrap(this.sender.burn(this.token.address, 1, '0x'));

            case 2:
              _ref2 = _context61.sent;
              receipt = _ref2.receipt;
              internalBeforeHook = receipt.logs.findIndex(function (l) {
                return l.event === 'BeforeTokenTransfer';
              });
              expect(internalBeforeHook).to.be.gte(0);
              externalSendHook = receipt.logs.findIndex(function (l) {
                return l.event === 'TokensToSendCalled';
              });
              expect(externalSendHook).to.be.gte(0);
              expect(externalSendHook).to.be.lt(internalBeforeHook);

            case 9:
            case "end":
              return _context61.stop();
          }
        }
      }, null, this);
    });
  });
});