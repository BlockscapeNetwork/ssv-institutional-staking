"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require3 = require('../../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require3.shouldSupportInterfaces;

var ERC721ReceiverMock = artifacts.require('ERC721ReceiverMock');

var Error = ['None', 'RevertWithMessage', 'RevertWithoutMessage', 'Panic'].reduce(function (acc, entry, idx) {
  return Object.assign(_defineProperty({}, entry, idx), acc);
}, {});
var firstTokenId = new BN('5042');
var secondTokenId = new BN('79217');
var nonExistentTokenId = new BN('13');
var fourthTokenId = new BN(4);
var baseURI = 'https://api.example.com/v1/';
var RECEIVER_MAGIC_VALUE = '0x150b7a02';

function shouldBehaveLikeERC721(errorPrefix, owner, newOwner, approved, anotherApproved, operator, other) {
  shouldSupportInterfaces(['ERC165', 'ERC721']);
  context('with minted tokens', function () {
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(this.token.mint(owner, secondTokenId));

            case 4:
              this.toWhom = other; // default to other for toWhom in context-dependent tests

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    describe('balanceOf', function () {
      context('when the given address owns some tokens', function () {
        it('returns the amount of tokens owned by the given address', function _callee2() {
          return regeneratorRuntime.async(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = expect;
                  _context2.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                case 3:
                  _context2.t1 = _context2.sent;
                  (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('2');

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, null, this);
        });
      });
      context('when the given address does not own any tokens', function () {
        it('returns 0', function _callee3() {
          return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.t0 = expect;
                  _context3.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(other));

                case 3:
                  _context3.t1 = _context3.sent;
                  (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('0');

                case 5:
                case "end":
                  return _context3.stop();
              }
            }
          }, null, this);
        });
      });
      context('when querying the zero address', function () {
        it('throws', function _callee4() {
          return regeneratorRuntime.async(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.balanceOf(ZERO_ADDRESS), 'ERC721: address zero is not a valid owner'));

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('ownerOf', function () {
      context('when the given token ID was tracked by this token', function () {
        var tokenId = firstTokenId;
        it('returns the owner of the given token ID', function _callee5() {
          return regeneratorRuntime.async(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.t0 = expect;
                  _context5.next = 3;
                  return regeneratorRuntime.awrap(this.token.ownerOf(tokenId));

                case 3:
                  _context5.t1 = _context5.sent;
                  _context5.t2 = owner;
                  (0, _context5.t0)(_context5.t1).to.be.equal(_context5.t2);

                case 6:
                case "end":
                  return _context5.stop();
              }
            }
          }, null, this);
        });
      });
      context('when the given token ID was not tracked by this token', function () {
        var tokenId = nonExistentTokenId;
        it('reverts', function _callee6() {
          return regeneratorRuntime.async(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.ownerOf(tokenId), 'ERC721: invalid token ID'));

                case 2:
                case "end":
                  return _context6.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('transfers', function () {
      var tokenId = firstTokenId;
      var data = '0x42';
      var receipt = null;
      beforeEach(function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                  from: owner
                }));

              case 2:
                _context7.next = 4;
                return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                  from: owner
                }));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });

      var transferWasSuccessful = function transferWasSuccessful(_ref) {
        var owner = _ref.owner,
            tokenId = _ref.tokenId,
            approved = _ref.approved;
        it('transfers the ownership of the given token ID to the given address', function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.t0 = expect;
                  _context8.next = 3;
                  return regeneratorRuntime.awrap(this.token.ownerOf(tokenId));

                case 3:
                  _context8.t1 = _context8.sent;
                  _context8.t2 = this.toWhom;
                  (0, _context8.t0)(_context8.t1).to.be.equal(_context8.t2);

                case 6:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
        it('emits a Transfer event', function _callee9() {
          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  expectEvent(receipt, 'Transfer', {
                    from: owner,
                    to: this.toWhom,
                    tokenId: tokenId
                  });

                case 1:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
        it('clears the approval for the token ID', function _callee10() {
          return regeneratorRuntime.async(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.t0 = expect;
                  _context10.next = 3;
                  return regeneratorRuntime.awrap(this.token.getApproved(tokenId));

                case 3:
                  _context10.t1 = _context10.sent;
                  _context10.t2 = ZERO_ADDRESS;
                  (0, _context10.t0)(_context10.t1).to.be.equal(_context10.t2);

                case 6:
                case "end":
                  return _context10.stop();
              }
            }
          }, null, this);
        });
        it('adjusts owners balances', function _callee11() {
          return regeneratorRuntime.async(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.t0 = expect;
                  _context11.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                case 3:
                  _context11.t1 = _context11.sent;
                  (0, _context11.t0)(_context11.t1).to.be.bignumber.equal('1');

                case 5:
                case "end":
                  return _context11.stop();
              }
            }
          }, null, this);
        });
        it('adjusts owners tokens by index', function _callee12() {
          return regeneratorRuntime.async(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  if (this.token.tokenOfOwnerByIndex) {
                    _context12.next = 2;
                    break;
                  }

                  return _context12.abrupt("return");

                case 2:
                  _context12.t0 = expect;
                  _context12.next = 5;
                  return regeneratorRuntime.awrap(this.token.tokenOfOwnerByIndex(this.toWhom, 0));

                case 5:
                  _context12.t1 = _context12.sent;
                  _context12.t2 = tokenId;
                  (0, _context12.t0)(_context12.t1).to.be.bignumber.equal(_context12.t2);
                  _context12.t3 = expect;
                  _context12.next = 11;
                  return regeneratorRuntime.awrap(this.token.tokenOfOwnerByIndex(owner, 0));

                case 11:
                  _context12.t4 = _context12.sent;
                  _context12.t5 = tokenId;
                  (0, _context12.t3)(_context12.t4).to.be.bignumber.not.equal(_context12.t5);

                case 14:
                case "end":
                  return _context12.stop();
              }
            }
          }, null, this);
        });
      };

      var shouldTransferTokensByUsers = function shouldTransferTokensByUsers(transferFunction) {
        context('when called by the owner', function () {
          beforeEach(function _callee13() {
            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return regeneratorRuntime.awrap(transferFunction.call(this, owner, this.toWhom, tokenId, {
                      from: owner
                    }));

                  case 2:
                    receipt = _context13.sent;

                  case 3:
                  case "end":
                    return _context13.stop();
                }
              }
            }, null, this);
          });
          transferWasSuccessful({
            owner: owner,
            tokenId: tokenId,
            approved: approved
          });
        });
        context('when called by the approved individual', function () {
          beforeEach(function _callee14() {
            return regeneratorRuntime.async(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return regeneratorRuntime.awrap(transferFunction.call(this, owner, this.toWhom, tokenId, {
                      from: approved
                    }));

                  case 2:
                    receipt = _context14.sent;

                  case 3:
                  case "end":
                    return _context14.stop();
                }
              }
            }, null, this);
          });
          transferWasSuccessful({
            owner: owner,
            tokenId: tokenId,
            approved: approved
          });
        });
        context('when called by the operator', function () {
          beforeEach(function _callee15() {
            return regeneratorRuntime.async(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.next = 2;
                    return regeneratorRuntime.awrap(transferFunction.call(this, owner, this.toWhom, tokenId, {
                      from: operator
                    }));

                  case 2:
                    receipt = _context15.sent;

                  case 3:
                  case "end":
                    return _context15.stop();
                }
              }
            }, null, this);
          });
          transferWasSuccessful({
            owner: owner,
            tokenId: tokenId,
            approved: approved
          });
        });
        context('when called by the owner without an approved user', function () {
          beforeEach(function _callee16() {
            return regeneratorRuntime.async(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(ZERO_ADDRESS, tokenId, {
                      from: owner
                    }));

                  case 2:
                    _context16.next = 4;
                    return regeneratorRuntime.awrap(transferFunction.call(this, owner, this.toWhom, tokenId, {
                      from: operator
                    }));

                  case 4:
                    receipt = _context16.sent;

                  case 5:
                  case "end":
                    return _context16.stop();
                }
              }
            }, null, this);
          });
          transferWasSuccessful({
            owner: owner,
            tokenId: tokenId,
            approved: null
          });
        });
        context('when sent to the owner', function () {
          beforeEach(function _callee17() {
            return regeneratorRuntime.async(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.next = 2;
                    return regeneratorRuntime.awrap(transferFunction.call(this, owner, owner, tokenId, {
                      from: owner
                    }));

                  case 2:
                    receipt = _context17.sent;

                  case 3:
                  case "end":
                    return _context17.stop();
                }
              }
            }, null, this);
          });
          it('keeps ownership of the token', function _callee18() {
            return regeneratorRuntime.async(function _callee18$(_context18) {
              while (1) {
                switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.t0 = expect;
                    _context18.next = 3;
                    return regeneratorRuntime.awrap(this.token.ownerOf(tokenId));

                  case 3:
                    _context18.t1 = _context18.sent;
                    _context18.t2 = owner;
                    (0, _context18.t0)(_context18.t1).to.be.equal(_context18.t2);

                  case 6:
                  case "end":
                    return _context18.stop();
                }
              }
            }, null, this);
          });
          it('clears the approval for the token ID', function _callee19() {
            return regeneratorRuntime.async(function _callee19$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    _context19.t0 = expect;
                    _context19.next = 3;
                    return regeneratorRuntime.awrap(this.token.getApproved(tokenId));

                  case 3:
                    _context19.t1 = _context19.sent;
                    _context19.t2 = ZERO_ADDRESS;
                    (0, _context19.t0)(_context19.t1).to.be.equal(_context19.t2);

                  case 6:
                  case "end":
                    return _context19.stop();
                }
              }
            }, null, this);
          });
          it('emits only a transfer event', function _callee20() {
            return regeneratorRuntime.async(function _callee20$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    expectEvent(receipt, 'Transfer', {
                      from: owner,
                      to: owner,
                      tokenId: tokenId
                    });

                  case 1:
                  case "end":
                    return _context20.stop();
                }
              }
            });
          });
          it('keeps the owner balance', function _callee21() {
            return regeneratorRuntime.async(function _callee21$(_context21) {
              while (1) {
                switch (_context21.prev = _context21.next) {
                  case 0:
                    _context21.t0 = expect;
                    _context21.next = 3;
                    return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                  case 3:
                    _context21.t1 = _context21.sent;
                    (0, _context21.t0)(_context21.t1).to.be.bignumber.equal('2');

                  case 5:
                  case "end":
                    return _context21.stop();
                }
              }
            }, null, this);
          });
          it('keeps same tokens by index', function _callee22() {
            var _this = this;

            var tokensListed;
            return regeneratorRuntime.async(function _callee22$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    if (this.token.tokenOfOwnerByIndex) {
                      _context22.next = 2;
                      break;
                    }

                    return _context22.abrupt("return");

                  case 2:
                    _context22.next = 4;
                    return regeneratorRuntime.awrap(Promise.all([0, 1].map(function (i) {
                      return _this.token.tokenOfOwnerByIndex(owner, i);
                    })));

                  case 4:
                    tokensListed = _context22.sent;
                    expect(tokensListed.map(function (t) {
                      return t.toNumber();
                    })).to.have.members([firstTokenId.toNumber(), secondTokenId.toNumber()]);

                  case 6:
                  case "end":
                    return _context22.stop();
                }
              }
            }, null, this);
          });
        });
        context('when the address of the previous owner is incorrect', function () {
          it('reverts', function _callee23() {
            return regeneratorRuntime.async(function _callee23$(_context23) {
              while (1) {
                switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(transferFunction.call(this, other, other, tokenId, {
                      from: owner
                    }), 'ERC721: transfer from incorrect owner'));

                  case 2:
                  case "end":
                    return _context23.stop();
                }
              }
            }, null, this);
          });
        });
        context('when the sender is not authorized for the token id', function () {
          it('reverts', function _callee24() {
            return regeneratorRuntime.async(function _callee24$(_context24) {
              while (1) {
                switch (_context24.prev = _context24.next) {
                  case 0:
                    _context24.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(transferFunction.call(this, owner, other, tokenId, {
                      from: other
                    }), 'ERC721: caller is not token owner or approved'));

                  case 2:
                  case "end":
                    return _context24.stop();
                }
              }
            }, null, this);
          });
        });
        context('when the given token ID does not exist', function () {
          it('reverts', function _callee25() {
            return regeneratorRuntime.async(function _callee25$(_context25) {
              while (1) {
                switch (_context25.prev = _context25.next) {
                  case 0:
                    _context25.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(transferFunction.call(this, owner, other, nonExistentTokenId, {
                      from: owner
                    }), 'ERC721: invalid token ID'));

                  case 2:
                  case "end":
                    return _context25.stop();
                }
              }
            }, null, this);
          });
        });
        context('when the address to transfer the token to is the zero address', function () {
          it('reverts', function _callee26() {
            return regeneratorRuntime.async(function _callee26$(_context26) {
              while (1) {
                switch (_context26.prev = _context26.next) {
                  case 0:
                    _context26.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(transferFunction.call(this, owner, ZERO_ADDRESS, tokenId, {
                      from: owner
                    }), 'ERC721: transfer to the zero address'));

                  case 2:
                  case "end":
                    return _context26.stop();
                }
              }
            }, null, this);
          });
        });
      };

      describe('via transferFrom', function () {
        shouldTransferTokensByUsers(function (from, to, tokenId, opts) {
          return this.token.transferFrom(from, to, tokenId, opts);
        });
      });
      describe('via safeTransferFrom', function () {
        var safeTransferFromWithData = function safeTransferFromWithData(from, to, tokenId, opts) {
          return this.token.methods['safeTransferFrom(address,address,uint256,bytes)'](from, to, tokenId, data, opts);
        };

        var safeTransferFromWithoutData = function safeTransferFromWithoutData(from, to, tokenId, opts) {
          return this.token.methods['safeTransferFrom(address,address,uint256)'](from, to, tokenId, opts);
        };

        var shouldTransferSafely = function shouldTransferSafely(transferFun, data) {
          describe('to a user account', function () {
            shouldTransferTokensByUsers(transferFun);
          });
          describe('to a valid receiver contract', function () {
            beforeEach(function _callee27() {
              return regeneratorRuntime.async(function _callee27$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      _context27.next = 2;
                      return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.None));

                    case 2:
                      this.receiver = _context27.sent;
                      this.toWhom = this.receiver.address;

                    case 4:
                    case "end":
                      return _context27.stop();
                  }
                }
              }, null, this);
            });
            shouldTransferTokensByUsers(transferFun);
            it('calls onERC721Received', function _callee28() {
              var receipt;
              return regeneratorRuntime.async(function _callee28$(_context28) {
                while (1) {
                  switch (_context28.prev = _context28.next) {
                    case 0:
                      _context28.next = 2;
                      return regeneratorRuntime.awrap(transferFun.call(this, owner, this.receiver.address, tokenId, {
                        from: owner
                      }));

                    case 2:
                      receipt = _context28.sent;
                      _context28.next = 5;
                      return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, ERC721ReceiverMock, 'Received', {
                        operator: owner,
                        from: owner,
                        tokenId: tokenId,
                        data: data
                      }));

                    case 5:
                    case "end":
                      return _context28.stop();
                  }
                }
              }, null, this);
            });
            it('calls onERC721Received from approved', function _callee29() {
              var receipt;
              return regeneratorRuntime.async(function _callee29$(_context29) {
                while (1) {
                  switch (_context29.prev = _context29.next) {
                    case 0:
                      _context29.next = 2;
                      return regeneratorRuntime.awrap(transferFun.call(this, owner, this.receiver.address, tokenId, {
                        from: approved
                      }));

                    case 2:
                      receipt = _context29.sent;
                      _context29.next = 5;
                      return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, ERC721ReceiverMock, 'Received', {
                        operator: approved,
                        from: owner,
                        tokenId: tokenId,
                        data: data
                      }));

                    case 5:
                    case "end":
                      return _context29.stop();
                  }
                }
              }, null, this);
            });
            describe('with an invalid token id', function () {
              it('reverts', function _callee30() {
                return regeneratorRuntime.async(function _callee30$(_context30) {
                  while (1) {
                    switch (_context30.prev = _context30.next) {
                      case 0:
                        _context30.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(transferFun.call(this, owner, this.receiver.address, nonExistentTokenId, {
                          from: owner
                        }), 'ERC721: invalid token ID'));

                      case 2:
                      case "end":
                        return _context30.stop();
                    }
                  }
                }, null, this);
              });
            });
          });
        };

        describe('with data', function () {
          shouldTransferSafely(safeTransferFromWithData, data);
        });
        describe('without data', function () {
          shouldTransferSafely(safeTransferFromWithoutData, null);
        });
        describe('to a receiver contract returning unexpected value', function () {
          it('reverts', function _callee31() {
            var invalidReceiver;
            return regeneratorRuntime.async(function _callee31$(_context31) {
              while (1) {
                switch (_context31.prev = _context31.next) {
                  case 0:
                    _context31.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"]('0x42', Error.None));

                  case 2:
                    invalidReceiver = _context31.sent;
                    _context31.next = 5;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(owner, invalidReceiver.address, tokenId, {
                      from: owner
                    }), 'ERC721: transfer to non ERC721Receiver implementer'));

                  case 5:
                  case "end":
                    return _context31.stop();
                }
              }
            }, null, this);
          });
        });
        describe('to a receiver contract that reverts with message', function () {
          it('reverts', function _callee32() {
            var revertingReceiver;
            return regeneratorRuntime.async(function _callee32$(_context32) {
              while (1) {
                switch (_context32.prev = _context32.next) {
                  case 0:
                    _context32.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.RevertWithMessage));

                  case 2:
                    revertingReceiver = _context32.sent;
                    _context32.next = 5;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(owner, revertingReceiver.address, tokenId, {
                      from: owner
                    }), 'ERC721ReceiverMock: reverting'));

                  case 5:
                  case "end":
                    return _context32.stop();
                }
              }
            }, null, this);
          });
        });
        describe('to a receiver contract that reverts without message', function () {
          it('reverts', function _callee33() {
            var revertingReceiver;
            return regeneratorRuntime.async(function _callee33$(_context33) {
              while (1) {
                switch (_context33.prev = _context33.next) {
                  case 0:
                    _context33.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.RevertWithoutMessage));

                  case 2:
                    revertingReceiver = _context33.sent;
                    _context33.next = 5;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(owner, revertingReceiver.address, tokenId, {
                      from: owner
                    }), 'ERC721: transfer to non ERC721Receiver implementer'));

                  case 5:
                  case "end":
                    return _context33.stop();
                }
              }
            }, null, this);
          });
        });
        describe('to a receiver contract that panics', function () {
          it('reverts', function _callee34() {
            var revertingReceiver;
            return regeneratorRuntime.async(function _callee34$(_context34) {
              while (1) {
                switch (_context34.prev = _context34.next) {
                  case 0:
                    _context34.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.Panic));

                  case 2:
                    revertingReceiver = _context34.sent;
                    _context34.next = 5;
                    return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.safeTransferFrom(owner, revertingReceiver.address, tokenId, {
                      from: owner
                    })));

                  case 5:
                  case "end":
                    return _context34.stop();
                }
              }
            }, null, this);
          });
        });
        describe('to a contract that does not implement the required function', function () {
          it('reverts', function _callee35() {
            var nonReceiver;
            return regeneratorRuntime.async(function _callee35$(_context35) {
              while (1) {
                switch (_context35.prev = _context35.next) {
                  case 0:
                    nonReceiver = this.token;
                    _context35.next = 3;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(owner, nonReceiver.address, tokenId, {
                      from: owner
                    }), 'ERC721: transfer to non ERC721Receiver implementer'));

                  case 3:
                  case "end":
                    return _context35.stop();
                }
              }
            }, null, this);
          });
        });
      });
    });
    describe('safe mint', function () {
      var tokenId = fourthTokenId;
      var data = '0x42';
      describe('via safeMint', function () {
        // regular minting is tested in ERC721Mintable.test.js and others
        it('calls onERC721Received — with data', function _callee36() {
          var receipt;
          return regeneratorRuntime.async(function _callee36$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  _context36.next = 2;
                  return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.None));

                case 2:
                  this.receiver = _context36.sent;
                  _context36.next = 5;
                  return regeneratorRuntime.awrap(this.token.safeMint(this.receiver.address, tokenId, data));

                case 5:
                  receipt = _context36.sent;
                  _context36.next = 8;
                  return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, ERC721ReceiverMock, 'Received', {
                    from: ZERO_ADDRESS,
                    tokenId: tokenId,
                    data: data
                  }));

                case 8:
                case "end":
                  return _context36.stop();
              }
            }
          }, null, this);
        });
        it('calls onERC721Received — without data', function _callee37() {
          var receipt;
          return regeneratorRuntime.async(function _callee37$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  _context37.next = 2;
                  return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.None));

                case 2:
                  this.receiver = _context37.sent;
                  _context37.next = 5;
                  return regeneratorRuntime.awrap(this.token.safeMint(this.receiver.address, tokenId));

                case 5:
                  receipt = _context37.sent;
                  _context37.next = 8;
                  return regeneratorRuntime.awrap(expectEvent.inTransaction(receipt.tx, ERC721ReceiverMock, 'Received', {
                    from: ZERO_ADDRESS,
                    tokenId: tokenId
                  }));

                case 8:
                case "end":
                  return _context37.stop();
              }
            }
          }, null, this);
        });
        context('to a receiver contract returning unexpected value', function () {
          it('reverts', function _callee38() {
            var invalidReceiver;
            return regeneratorRuntime.async(function _callee38$(_context38) {
              while (1) {
                switch (_context38.prev = _context38.next) {
                  case 0:
                    _context38.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"]('0x42', Error.None));

                  case 2:
                    invalidReceiver = _context38.sent;
                    _context38.next = 5;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeMint(invalidReceiver.address, tokenId), 'ERC721: transfer to non ERC721Receiver implementer'));

                  case 5:
                  case "end":
                    return _context38.stop();
                }
              }
            }, null, this);
          });
        });
        context('to a receiver contract that reverts with message', function () {
          it('reverts', function _callee39() {
            var revertingReceiver;
            return regeneratorRuntime.async(function _callee39$(_context39) {
              while (1) {
                switch (_context39.prev = _context39.next) {
                  case 0:
                    _context39.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.RevertWithMessage));

                  case 2:
                    revertingReceiver = _context39.sent;
                    _context39.next = 5;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeMint(revertingReceiver.address, tokenId), 'ERC721ReceiverMock: reverting'));

                  case 5:
                  case "end":
                    return _context39.stop();
                }
              }
            }, null, this);
          });
        });
        context('to a receiver contract that reverts without message', function () {
          it('reverts', function _callee40() {
            var revertingReceiver;
            return regeneratorRuntime.async(function _callee40$(_context40) {
              while (1) {
                switch (_context40.prev = _context40.next) {
                  case 0:
                    _context40.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.RevertWithoutMessage));

                  case 2:
                    revertingReceiver = _context40.sent;
                    _context40.next = 5;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeMint(revertingReceiver.address, tokenId), 'ERC721: transfer to non ERC721Receiver implementer'));

                  case 5:
                  case "end":
                    return _context40.stop();
                }
              }
            }, null, this);
          });
        });
        context('to a receiver contract that panics', function () {
          it('reverts', function _callee41() {
            var revertingReceiver;
            return regeneratorRuntime.async(function _callee41$(_context41) {
              while (1) {
                switch (_context41.prev = _context41.next) {
                  case 0:
                    _context41.next = 2;
                    return regeneratorRuntime.awrap(ERC721ReceiverMock["new"](RECEIVER_MAGIC_VALUE, Error.Panic));

                  case 2:
                    revertingReceiver = _context41.sent;
                    _context41.next = 5;
                    return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.safeMint(revertingReceiver.address, tokenId)));

                  case 5:
                  case "end":
                    return _context41.stop();
                }
              }
            }, null, this);
          });
        });
        context('to a contract that does not implement the required function', function () {
          it('reverts', function _callee42() {
            var nonReceiver;
            return regeneratorRuntime.async(function _callee42$(_context42) {
              while (1) {
                switch (_context42.prev = _context42.next) {
                  case 0:
                    nonReceiver = this.token;
                    _context42.next = 3;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeMint(nonReceiver.address, tokenId), 'ERC721: transfer to non ERC721Receiver implementer'));

                  case 3:
                  case "end":
                    return _context42.stop();
                }
              }
            }, null, this);
          });
        });
      });
    });
    describe('approve', function () {
      var tokenId = firstTokenId;
      var receipt = null;

      var itClearsApproval = function itClearsApproval() {
        it('clears approval for the token', function _callee43() {
          return regeneratorRuntime.async(function _callee43$(_context43) {
            while (1) {
              switch (_context43.prev = _context43.next) {
                case 0:
                  _context43.t0 = expect;
                  _context43.next = 3;
                  return regeneratorRuntime.awrap(this.token.getApproved(tokenId));

                case 3:
                  _context43.t1 = _context43.sent;
                  _context43.t2 = ZERO_ADDRESS;
                  (0, _context43.t0)(_context43.t1).to.be.equal(_context43.t2);

                case 6:
                case "end":
                  return _context43.stop();
              }
            }
          }, null, this);
        });
      };

      var itApproves = function itApproves(address) {
        it('sets the approval for the target address', function _callee44() {
          return regeneratorRuntime.async(function _callee44$(_context44) {
            while (1) {
              switch (_context44.prev = _context44.next) {
                case 0:
                  _context44.t0 = expect;
                  _context44.next = 3;
                  return regeneratorRuntime.awrap(this.token.getApproved(tokenId));

                case 3:
                  _context44.t1 = _context44.sent;
                  _context44.t2 = address;
                  (0, _context44.t0)(_context44.t1).to.be.equal(_context44.t2);

                case 6:
                case "end":
                  return _context44.stop();
              }
            }
          }, null, this);
        });
      };

      var itEmitsApprovalEvent = function itEmitsApprovalEvent(address) {
        it('emits an approval event', function _callee45() {
          return regeneratorRuntime.async(function _callee45$(_context45) {
            while (1) {
              switch (_context45.prev = _context45.next) {
                case 0:
                  expectEvent(receipt, 'Approval', {
                    owner: owner,
                    approved: address,
                    tokenId: tokenId
                  });

                case 1:
                case "end":
                  return _context45.stop();
              }
            }
          });
        });
      };

      context('when clearing approval', function () {
        context('when there was no prior approval', function () {
          beforeEach(function _callee46() {
            return regeneratorRuntime.async(function _callee46$(_context46) {
              while (1) {
                switch (_context46.prev = _context46.next) {
                  case 0:
                    _context46.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(ZERO_ADDRESS, tokenId, {
                      from: owner
                    }));

                  case 2:
                    receipt = _context46.sent;

                  case 3:
                  case "end":
                    return _context46.stop();
                }
              }
            }, null, this);
          });
          itClearsApproval();
          itEmitsApprovalEvent(ZERO_ADDRESS);
        });
        context('when there was a prior approval', function () {
          beforeEach(function _callee47() {
            return regeneratorRuntime.async(function _callee47$(_context47) {
              while (1) {
                switch (_context47.prev = _context47.next) {
                  case 0:
                    _context47.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                      from: owner
                    }));

                  case 2:
                    _context47.next = 4;
                    return regeneratorRuntime.awrap(this.token.approve(ZERO_ADDRESS, tokenId, {
                      from: owner
                    }));

                  case 4:
                    receipt = _context47.sent;

                  case 5:
                  case "end":
                    return _context47.stop();
                }
              }
            }, null, this);
          });
          itClearsApproval();
          itEmitsApprovalEvent(ZERO_ADDRESS);
        });
      });
      context('when approving a non-zero address', function () {
        context('when there was no prior approval', function () {
          beforeEach(function _callee48() {
            return regeneratorRuntime.async(function _callee48$(_context48) {
              while (1) {
                switch (_context48.prev = _context48.next) {
                  case 0:
                    _context48.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                      from: owner
                    }));

                  case 2:
                    receipt = _context48.sent;

                  case 3:
                  case "end":
                    return _context48.stop();
                }
              }
            }, null, this);
          });
          itApproves(approved);
          itEmitsApprovalEvent(approved);
        });
        context('when there was a prior approval to the same address', function () {
          beforeEach(function _callee49() {
            return regeneratorRuntime.async(function _callee49$(_context49) {
              while (1) {
                switch (_context49.prev = _context49.next) {
                  case 0:
                    _context49.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                      from: owner
                    }));

                  case 2:
                    _context49.next = 4;
                    return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                      from: owner
                    }));

                  case 4:
                    receipt = _context49.sent;

                  case 5:
                  case "end":
                    return _context49.stop();
                }
              }
            }, null, this);
          });
          itApproves(approved);
          itEmitsApprovalEvent(approved);
        });
        context('when there was a prior approval to a different address', function () {
          beforeEach(function _callee50() {
            return regeneratorRuntime.async(function _callee50$(_context50) {
              while (1) {
                switch (_context50.prev = _context50.next) {
                  case 0:
                    _context50.next = 2;
                    return regeneratorRuntime.awrap(this.token.approve(anotherApproved, tokenId, {
                      from: owner
                    }));

                  case 2:
                    _context50.next = 4;
                    return regeneratorRuntime.awrap(this.token.approve(anotherApproved, tokenId, {
                      from: owner
                    }));

                  case 4:
                    receipt = _context50.sent;

                  case 5:
                  case "end":
                    return _context50.stop();
                }
              }
            }, null, this);
          });
          itApproves(anotherApproved);
          itEmitsApprovalEvent(anotherApproved);
        });
      });
      context('when the address that receives the approval is the owner', function () {
        it('reverts', function _callee51() {
          return regeneratorRuntime.async(function _callee51$(_context51) {
            while (1) {
              switch (_context51.prev = _context51.next) {
                case 0:
                  _context51.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.approve(owner, tokenId, {
                    from: owner
                  }), 'ERC721: approval to current owner'));

                case 2:
                case "end":
                  return _context51.stop();
              }
            }
          }, null, this);
        });
      });
      context('when the sender does not own the given token ID', function () {
        it('reverts', function _callee52() {
          return regeneratorRuntime.async(function _callee52$(_context52) {
            while (1) {
              switch (_context52.prev = _context52.next) {
                case 0:
                  _context52.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.approve(approved, tokenId, {
                    from: other
                  }), 'ERC721: approve caller is not token owner or approved'));

                case 2:
                case "end":
                  return _context52.stop();
              }
            }
          }, null, this);
        });
      });
      context('when the sender is approved for the given token ID', function () {
        it('reverts', function _callee53() {
          return regeneratorRuntime.async(function _callee53$(_context53) {
            while (1) {
              switch (_context53.prev = _context53.next) {
                case 0:
                  _context53.next = 2;
                  return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                    from: owner
                  }));

                case 2:
                  _context53.next = 4;
                  return regeneratorRuntime.awrap(expectRevert(this.token.approve(anotherApproved, tokenId, {
                    from: approved
                  }), 'ERC721: approve caller is not token owner or approved for all'));

                case 4:
                case "end":
                  return _context53.stop();
              }
            }
          }, null, this);
        });
      });
      context('when the sender is an operator', function () {
        beforeEach(function _callee54() {
          return regeneratorRuntime.async(function _callee54$(_context54) {
            while (1) {
              switch (_context54.prev = _context54.next) {
                case 0:
                  _context54.next = 2;
                  return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                    from: owner
                  }));

                case 2:
                  _context54.next = 4;
                  return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                    from: operator
                  }));

                case 4:
                  receipt = _context54.sent;

                case 5:
                case "end":
                  return _context54.stop();
              }
            }
          }, null, this);
        });
        itApproves(approved);
        itEmitsApprovalEvent(approved);
      });
      context('when the given token ID does not exist', function () {
        it('reverts', function _callee55() {
          return regeneratorRuntime.async(function _callee55$(_context55) {
            while (1) {
              switch (_context55.prev = _context55.next) {
                case 0:
                  _context55.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.approve(approved, nonExistentTokenId, {
                    from: operator
                  }), 'ERC721: invalid token ID'));

                case 2:
                case "end":
                  return _context55.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('setApprovalForAll', function () {
      context('when the operator willing to approve is not the owner', function () {
        context('when there is no operator approval set by the sender', function () {
          it('approves the operator', function _callee56() {
            return regeneratorRuntime.async(function _callee56$(_context56) {
              while (1) {
                switch (_context56.prev = _context56.next) {
                  case 0:
                    _context56.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                      from: owner
                    }));

                  case 2:
                    _context56.t0 = expect;
                    _context56.next = 5;
                    return regeneratorRuntime.awrap(this.token.isApprovedForAll(owner, operator));

                  case 5:
                    _context56.t1 = _context56.sent;
                    (0, _context56.t0)(_context56.t1).to.equal(true);

                  case 7:
                  case "end":
                    return _context56.stop();
                }
              }
            }, null, this);
          });
          it('emits an approval event', function _callee57() {
            var receipt;
            return regeneratorRuntime.async(function _callee57$(_context57) {
              while (1) {
                switch (_context57.prev = _context57.next) {
                  case 0:
                    _context57.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                      from: owner
                    }));

                  case 2:
                    receipt = _context57.sent;
                    expectEvent(receipt, 'ApprovalForAll', {
                      owner: owner,
                      operator: operator,
                      approved: true
                    });

                  case 4:
                  case "end":
                    return _context57.stop();
                }
              }
            }, null, this);
          });
        });
        context('when the operator was set as not approved', function () {
          beforeEach(function _callee58() {
            return regeneratorRuntime.async(function _callee58$(_context58) {
              while (1) {
                switch (_context58.prev = _context58.next) {
                  case 0:
                    _context58.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, false, {
                      from: owner
                    }));

                  case 2:
                  case "end":
                    return _context58.stop();
                }
              }
            }, null, this);
          });
          it('approves the operator', function _callee59() {
            return regeneratorRuntime.async(function _callee59$(_context59) {
              while (1) {
                switch (_context59.prev = _context59.next) {
                  case 0:
                    _context59.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                      from: owner
                    }));

                  case 2:
                    _context59.t0 = expect;
                    _context59.next = 5;
                    return regeneratorRuntime.awrap(this.token.isApprovedForAll(owner, operator));

                  case 5:
                    _context59.t1 = _context59.sent;
                    (0, _context59.t0)(_context59.t1).to.equal(true);

                  case 7:
                  case "end":
                    return _context59.stop();
                }
              }
            }, null, this);
          });
          it('emits an approval event', function _callee60() {
            var receipt;
            return regeneratorRuntime.async(function _callee60$(_context60) {
              while (1) {
                switch (_context60.prev = _context60.next) {
                  case 0:
                    _context60.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                      from: owner
                    }));

                  case 2:
                    receipt = _context60.sent;
                    expectEvent(receipt, 'ApprovalForAll', {
                      owner: owner,
                      operator: operator,
                      approved: true
                    });

                  case 4:
                  case "end":
                    return _context60.stop();
                }
              }
            }, null, this);
          });
          it('can unset the operator approval', function _callee61() {
            return regeneratorRuntime.async(function _callee61$(_context61) {
              while (1) {
                switch (_context61.prev = _context61.next) {
                  case 0:
                    _context61.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, false, {
                      from: owner
                    }));

                  case 2:
                    _context61.t0 = expect;
                    _context61.next = 5;
                    return regeneratorRuntime.awrap(this.token.isApprovedForAll(owner, operator));

                  case 5:
                    _context61.t1 = _context61.sent;
                    (0, _context61.t0)(_context61.t1).to.equal(false);

                  case 7:
                  case "end":
                    return _context61.stop();
                }
              }
            }, null, this);
          });
        });
        context('when the operator was already approved', function () {
          beforeEach(function _callee62() {
            return regeneratorRuntime.async(function _callee62$(_context62) {
              while (1) {
                switch (_context62.prev = _context62.next) {
                  case 0:
                    _context62.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                      from: owner
                    }));

                  case 2:
                  case "end":
                    return _context62.stop();
                }
              }
            }, null, this);
          });
          it('keeps the approval to the given address', function _callee63() {
            return regeneratorRuntime.async(function _callee63$(_context63) {
              while (1) {
                switch (_context63.prev = _context63.next) {
                  case 0:
                    _context63.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                      from: owner
                    }));

                  case 2:
                    _context63.t0 = expect;
                    _context63.next = 5;
                    return regeneratorRuntime.awrap(this.token.isApprovedForAll(owner, operator));

                  case 5:
                    _context63.t1 = _context63.sent;
                    (0, _context63.t0)(_context63.t1).to.equal(true);

                  case 7:
                  case "end":
                    return _context63.stop();
                }
              }
            }, null, this);
          });
          it('emits an approval event', function _callee64() {
            var receipt;
            return regeneratorRuntime.async(function _callee64$(_context64) {
              while (1) {
                switch (_context64.prev = _context64.next) {
                  case 0:
                    _context64.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                      from: owner
                    }));

                  case 2:
                    receipt = _context64.sent;
                    expectEvent(receipt, 'ApprovalForAll', {
                      owner: owner,
                      operator: operator,
                      approved: true
                    });

                  case 4:
                  case "end":
                    return _context64.stop();
                }
              }
            }, null, this);
          });
        });
      });
      context('when the operator is the owner', function () {
        it('reverts', function _callee65() {
          return regeneratorRuntime.async(function _callee65$(_context65) {
            while (1) {
              switch (_context65.prev = _context65.next) {
                case 0:
                  _context65.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.setApprovalForAll(owner, true, {
                    from: owner
                  }), 'ERC721: approve to caller'));

                case 2:
                case "end":
                  return _context65.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('getApproved', function _callee73() {
      return regeneratorRuntime.async(function _callee73$(_context73) {
        while (1) {
          switch (_context73.prev = _context73.next) {
            case 0:
              context('when token is not minted', function _callee67() {
                return regeneratorRuntime.async(function _callee67$(_context67) {
                  while (1) {
                    switch (_context67.prev = _context67.next) {
                      case 0:
                        it('reverts', function _callee66() {
                          return regeneratorRuntime.async(function _callee66$(_context66) {
                            while (1) {
                              switch (_context66.prev = _context66.next) {
                                case 0:
                                  _context66.next = 2;
                                  return regeneratorRuntime.awrap(expectRevert(this.token.getApproved(nonExistentTokenId), 'ERC721: invalid token ID'));

                                case 2:
                                case "end":
                                  return _context66.stop();
                              }
                            }
                          }, null, this);
                        });

                      case 1:
                      case "end":
                        return _context67.stop();
                    }
                  }
                });
              });
              context('when token has been minted ', function _callee72() {
                return regeneratorRuntime.async(function _callee72$(_context72) {
                  while (1) {
                    switch (_context72.prev = _context72.next) {
                      case 0:
                        it('should return the zero address', function _callee68() {
                          return regeneratorRuntime.async(function _callee68$(_context68) {
                            while (1) {
                              switch (_context68.prev = _context68.next) {
                                case 0:
                                  _context68.t0 = expect;
                                  _context68.next = 3;
                                  return regeneratorRuntime.awrap(this.token.getApproved(firstTokenId));

                                case 3:
                                  _context68.t1 = _context68.sent;
                                  _context68.t2 = ZERO_ADDRESS;
                                  (0, _context68.t0)(_context68.t1).to.be.equal(_context68.t2);

                                case 6:
                                case "end":
                                  return _context68.stop();
                              }
                            }
                          }, null, this);
                        });
                        context('when account has been approved', function _callee71() {
                          return regeneratorRuntime.async(function _callee71$(_context71) {
                            while (1) {
                              switch (_context71.prev = _context71.next) {
                                case 0:
                                  beforeEach(function _callee69() {
                                    return regeneratorRuntime.async(function _callee69$(_context69) {
                                      while (1) {
                                        switch (_context69.prev = _context69.next) {
                                          case 0:
                                            _context69.next = 2;
                                            return regeneratorRuntime.awrap(this.token.approve(approved, firstTokenId, {
                                              from: owner
                                            }));

                                          case 2:
                                          case "end":
                                            return _context69.stop();
                                        }
                                      }
                                    }, null, this);
                                  });
                                  it('returns approved account', function _callee70() {
                                    return regeneratorRuntime.async(function _callee70$(_context70) {
                                      while (1) {
                                        switch (_context70.prev = _context70.next) {
                                          case 0:
                                            _context70.t0 = expect;
                                            _context70.next = 3;
                                            return regeneratorRuntime.awrap(this.token.getApproved(firstTokenId));

                                          case 3:
                                            _context70.t1 = _context70.sent;
                                            _context70.t2 = approved;
                                            (0, _context70.t0)(_context70.t1).to.be.equal(_context70.t2);

                                          case 6:
                                          case "end":
                                            return _context70.stop();
                                        }
                                      }
                                    }, null, this);
                                  });

                                case 2:
                                case "end":
                                  return _context71.stop();
                              }
                            }
                          });
                        });

                      case 2:
                      case "end":
                        return _context72.stop();
                    }
                  }
                });
              });

            case 2:
            case "end":
              return _context73.stop();
          }
        }
      });
    });
  });
  describe('_mint(address, uint256)', function () {
    it('reverts with a null destination address', function _callee74() {
      return regeneratorRuntime.async(function _callee74$(_context74) {
        while (1) {
          switch (_context74.prev = _context74.next) {
            case 0:
              _context74.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(ZERO_ADDRESS, firstTokenId), 'ERC721: mint to the zero address'));

            case 2:
            case "end":
              return _context74.stop();
          }
        }
      }, null, this);
    });
    context('with minted token', function _callee78() {
      return regeneratorRuntime.async(function _callee78$(_context78) {
        while (1) {
          switch (_context78.prev = _context78.next) {
            case 0:
              beforeEach(function _callee75() {
                return regeneratorRuntime.async(function _callee75$(_context75) {
                  while (1) {
                    switch (_context75.prev = _context75.next) {
                      case 0:
                        _context75.next = 2;
                        return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

                      case 2:
                        this.receipt = _context75.sent;

                      case 3:
                      case "end":
                        return _context75.stop();
                    }
                  }
                }, null, this);
              });
              it('emits a Transfer event', function () {
                expectEvent(this.receipt, 'Transfer', {
                  from: ZERO_ADDRESS,
                  to: owner,
                  tokenId: firstTokenId
                });
              });
              it('creates the token', function _callee76() {
                return regeneratorRuntime.async(function _callee76$(_context76) {
                  while (1) {
                    switch (_context76.prev = _context76.next) {
                      case 0:
                        _context76.t0 = expect;
                        _context76.next = 3;
                        return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                      case 3:
                        _context76.t1 = _context76.sent;
                        (0, _context76.t0)(_context76.t1).to.be.bignumber.equal('1');
                        _context76.t2 = expect;
                        _context76.next = 8;
                        return regeneratorRuntime.awrap(this.token.ownerOf(firstTokenId));

                      case 8:
                        _context76.t3 = _context76.sent;
                        _context76.t4 = owner;
                        (0, _context76.t2)(_context76.t3).to.equal(_context76.t4);

                      case 11:
                      case "end":
                        return _context76.stop();
                    }
                  }
                }, null, this);
              });
              it('reverts when adding a token id that already exists', function _callee77() {
                return regeneratorRuntime.async(function _callee77$(_context77) {
                  while (1) {
                    switch (_context77.prev = _context77.next) {
                      case 0:
                        _context77.next = 2;
                        return regeneratorRuntime.awrap(expectRevert(this.token.mint(owner, firstTokenId), 'ERC721: token already minted'));

                      case 2:
                      case "end":
                        return _context77.stop();
                    }
                  }
                }, null, this);
              });

            case 4:
            case "end":
              return _context78.stop();
          }
        }
      });
    });
  });
  describe('_burn', function () {
    it('reverts when burning a non-existent token id', function _callee79() {
      return regeneratorRuntime.async(function _callee79$(_context79) {
        while (1) {
          switch (_context79.prev = _context79.next) {
            case 0:
              _context79.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burn(nonExistentTokenId), 'ERC721: invalid token ID'));

            case 2:
            case "end":
              return _context79.stop();
          }
        }
      }, null, this);
    });
    context('with minted tokens', function () {
      beforeEach(function _callee80() {
        return regeneratorRuntime.async(function _callee80$(_context80) {
          while (1) {
            switch (_context80.prev = _context80.next) {
              case 0:
                _context80.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

              case 2:
                _context80.next = 4;
                return regeneratorRuntime.awrap(this.token.mint(owner, secondTokenId));

              case 4:
              case "end":
                return _context80.stop();
            }
          }
        }, null, this);
      });
      context('with burnt token', function () {
        beforeEach(function _callee81() {
          return regeneratorRuntime.async(function _callee81$(_context81) {
            while (1) {
              switch (_context81.prev = _context81.next) {
                case 0:
                  _context81.next = 2;
                  return regeneratorRuntime.awrap(this.token.burn(firstTokenId));

                case 2:
                  this.receipt = _context81.sent;

                case 3:
                case "end":
                  return _context81.stop();
              }
            }
          }, null, this);
        });
        it('emits a Transfer event', function () {
          expectEvent(this.receipt, 'Transfer', {
            from: owner,
            to: ZERO_ADDRESS,
            tokenId: firstTokenId
          });
        });
        it('deletes the token', function _callee82() {
          return regeneratorRuntime.async(function _callee82$(_context82) {
            while (1) {
              switch (_context82.prev = _context82.next) {
                case 0:
                  _context82.t0 = expect;
                  _context82.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                case 3:
                  _context82.t1 = _context82.sent;
                  (0, _context82.t0)(_context82.t1).to.be.bignumber.equal('1');
                  _context82.next = 7;
                  return regeneratorRuntime.awrap(expectRevert(this.token.ownerOf(firstTokenId), 'ERC721: invalid token ID'));

                case 7:
                case "end":
                  return _context82.stop();
              }
            }
          }, null, this);
        });
        it('reverts when burning a token id that has been deleted', function _callee83() {
          return regeneratorRuntime.async(function _callee83$(_context83) {
            while (1) {
              switch (_context83.prev = _context83.next) {
                case 0:
                  _context83.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.burn(firstTokenId), 'ERC721: invalid token ID'));

                case 2:
                case "end":
                  return _context83.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
}

function shouldBehaveLikeERC721Enumerable(errorPrefix, owner, newOwner, approved, anotherApproved, operator, other) {
  shouldSupportInterfaces(['ERC721Enumerable']);
  context('with minted tokens', function () {
    beforeEach(function _callee84() {
      return regeneratorRuntime.async(function _callee84$(_context84) {
        while (1) {
          switch (_context84.prev = _context84.next) {
            case 0:
              _context84.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

            case 2:
              _context84.next = 4;
              return regeneratorRuntime.awrap(this.token.mint(owner, secondTokenId));

            case 4:
              this.toWhom = other; // default to other for toWhom in context-dependent tests

            case 5:
            case "end":
              return _context84.stop();
          }
        }
      }, null, this);
    });
    describe('totalSupply', function () {
      it('returns total token supply', function _callee85() {
        return regeneratorRuntime.async(function _callee85$(_context85) {
          while (1) {
            switch (_context85.prev = _context85.next) {
              case 0:
                _context85.t0 = expect;
                _context85.next = 3;
                return regeneratorRuntime.awrap(this.token.totalSupply());

              case 3:
                _context85.t1 = _context85.sent;
                (0, _context85.t0)(_context85.t1).to.be.bignumber.equal('2');

              case 5:
              case "end":
                return _context85.stop();
            }
          }
        }, null, this);
      });
    });
    describe('tokenOfOwnerByIndex', function () {
      describe('when the given index is lower than the amount of tokens owned by the given address', function () {
        it('returns the token ID placed at the given index', function _callee86() {
          return regeneratorRuntime.async(function _callee86$(_context86) {
            while (1) {
              switch (_context86.prev = _context86.next) {
                case 0:
                  _context86.t0 = expect;
                  _context86.next = 3;
                  return regeneratorRuntime.awrap(this.token.tokenOfOwnerByIndex(owner, 0));

                case 3:
                  _context86.t1 = _context86.sent;
                  _context86.t2 = firstTokenId;
                  (0, _context86.t0)(_context86.t1).to.be.bignumber.equal(_context86.t2);

                case 6:
                case "end":
                  return _context86.stop();
              }
            }
          }, null, this);
        });
      });
      describe('when the index is greater than or equal to the total tokens owned by the given address', function () {
        it('reverts', function _callee87() {
          return regeneratorRuntime.async(function _callee87$(_context87) {
            while (1) {
              switch (_context87.prev = _context87.next) {
                case 0:
                  _context87.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.tokenOfOwnerByIndex(owner, 2), 'ERC721Enumerable: owner index out of bounds'));

                case 2:
                case "end":
                  return _context87.stop();
              }
            }
          }, null, this);
        });
      });
      describe('when the given address does not own any token', function () {
        it('reverts', function _callee88() {
          return regeneratorRuntime.async(function _callee88$(_context88) {
            while (1) {
              switch (_context88.prev = _context88.next) {
                case 0:
                  _context88.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.tokenOfOwnerByIndex(other, 0), 'ERC721Enumerable: owner index out of bounds'));

                case 2:
                case "end":
                  return _context88.stop();
              }
            }
          }, null, this);
        });
      });
      describe('after transferring all tokens to another user', function () {
        beforeEach(function _callee89() {
          return regeneratorRuntime.async(function _callee89$(_context89) {
            while (1) {
              switch (_context89.prev = _context89.next) {
                case 0:
                  _context89.next = 2;
                  return regeneratorRuntime.awrap(this.token.transferFrom(owner, other, firstTokenId, {
                    from: owner
                  }));

                case 2:
                  _context89.next = 4;
                  return regeneratorRuntime.awrap(this.token.transferFrom(owner, other, secondTokenId, {
                    from: owner
                  }));

                case 4:
                case "end":
                  return _context89.stop();
              }
            }
          }, null, this);
        });
        it('returns correct token IDs for target', function _callee90() {
          var _this2 = this;

          var tokensListed;
          return regeneratorRuntime.async(function _callee90$(_context90) {
            while (1) {
              switch (_context90.prev = _context90.next) {
                case 0:
                  _context90.t0 = expect;
                  _context90.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(other));

                case 3:
                  _context90.t1 = _context90.sent;
                  (0, _context90.t0)(_context90.t1).to.be.bignumber.equal('2');
                  _context90.next = 7;
                  return regeneratorRuntime.awrap(Promise.all([0, 1].map(function (i) {
                    return _this2.token.tokenOfOwnerByIndex(other, i);
                  })));

                case 7:
                  tokensListed = _context90.sent;
                  expect(tokensListed.map(function (t) {
                    return t.toNumber();
                  })).to.have.members([firstTokenId.toNumber(), secondTokenId.toNumber()]);

                case 9:
                case "end":
                  return _context90.stop();
              }
            }
          }, null, this);
        });
        it('returns empty collection for original owner', function _callee91() {
          return regeneratorRuntime.async(function _callee91$(_context91) {
            while (1) {
              switch (_context91.prev = _context91.next) {
                case 0:
                  _context91.t0 = expect;
                  _context91.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                case 3:
                  _context91.t1 = _context91.sent;
                  (0, _context91.t0)(_context91.t1).to.be.bignumber.equal('0');
                  _context91.next = 7;
                  return regeneratorRuntime.awrap(expectRevert(this.token.tokenOfOwnerByIndex(owner, 0), 'ERC721Enumerable: owner index out of bounds'));

                case 7:
                case "end":
                  return _context91.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('tokenByIndex', function () {
      it('returns all tokens', function _callee92() {
        var _this3 = this;

        var tokensListed;
        return regeneratorRuntime.async(function _callee92$(_context92) {
          while (1) {
            switch (_context92.prev = _context92.next) {
              case 0:
                _context92.next = 2;
                return regeneratorRuntime.awrap(Promise.all([0, 1].map(function (i) {
                  return _this3.token.tokenByIndex(i);
                })));

              case 2:
                tokensListed = _context92.sent;
                expect(tokensListed.map(function (t) {
                  return t.toNumber();
                })).to.have.members([firstTokenId.toNumber(), secondTokenId.toNumber()]);

              case 4:
              case "end":
                return _context92.stop();
            }
          }
        });
      });
      it('reverts if index is greater than supply', function _callee93() {
        return regeneratorRuntime.async(function _callee93$(_context93) {
          while (1) {
            switch (_context93.prev = _context93.next) {
              case 0:
                _context93.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.tokenByIndex(2), 'ERC721Enumerable: global index out of bounds'));

              case 2:
              case "end":
                return _context93.stop();
            }
          }
        }, null, this);
      });
      [firstTokenId, secondTokenId].forEach(function (tokenId) {
        it("returns all tokens after burning token ".concat(tokenId, " and minting new tokens"), function _callee94() {
          var _this4 = this;

          var newTokenId, anotherNewTokenId, tokensListed, expectedTokens;
          return regeneratorRuntime.async(function _callee94$(_context94) {
            while (1) {
              switch (_context94.prev = _context94.next) {
                case 0:
                  newTokenId = new BN(300);
                  anotherNewTokenId = new BN(400);
                  _context94.next = 4;
                  return regeneratorRuntime.awrap(this.token.burn(tokenId));

                case 4:
                  _context94.next = 6;
                  return regeneratorRuntime.awrap(this.token.mint(newOwner, newTokenId));

                case 6:
                  _context94.next = 8;
                  return regeneratorRuntime.awrap(this.token.mint(newOwner, anotherNewTokenId));

                case 8:
                  _context94.t0 = expect;
                  _context94.next = 11;
                  return regeneratorRuntime.awrap(this.token.totalSupply());

                case 11:
                  _context94.t1 = _context94.sent;
                  (0, _context94.t0)(_context94.t1).to.be.bignumber.equal('3');
                  _context94.next = 15;
                  return regeneratorRuntime.awrap(Promise.all([0, 1, 2].map(function (i) {
                    return _this4.token.tokenByIndex(i);
                  })));

                case 15:
                  tokensListed = _context94.sent;
                  expectedTokens = [firstTokenId, secondTokenId, newTokenId, anotherNewTokenId].filter(function (x) {
                    return x !== tokenId;
                  });
                  expect(tokensListed.map(function (t) {
                    return t.toNumber();
                  })).to.have.members(expectedTokens.map(function (t) {
                    return t.toNumber();
                  }));

                case 18:
                case "end":
                  return _context94.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
  describe('_mint(address, uint256)', function () {
    it('reverts with a null destination address', function _callee95() {
      return regeneratorRuntime.async(function _callee95$(_context95) {
        while (1) {
          switch (_context95.prev = _context95.next) {
            case 0:
              _context95.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(ZERO_ADDRESS, firstTokenId), 'ERC721: mint to the zero address'));

            case 2:
            case "end":
              return _context95.stop();
          }
        }
      }, null, this);
    });
    context('with minted token', function _callee99() {
      return regeneratorRuntime.async(function _callee99$(_context99) {
        while (1) {
          switch (_context99.prev = _context99.next) {
            case 0:
              beforeEach(function _callee96() {
                return regeneratorRuntime.async(function _callee96$(_context96) {
                  while (1) {
                    switch (_context96.prev = _context96.next) {
                      case 0:
                        _context96.next = 2;
                        return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

                      case 2:
                        this.receipt = _context96.sent;

                      case 3:
                      case "end":
                        return _context96.stop();
                    }
                  }
                }, null, this);
              });
              it('adjusts owner tokens by index', function _callee97() {
                return regeneratorRuntime.async(function _callee97$(_context97) {
                  while (1) {
                    switch (_context97.prev = _context97.next) {
                      case 0:
                        _context97.t0 = expect;
                        _context97.next = 3;
                        return regeneratorRuntime.awrap(this.token.tokenOfOwnerByIndex(owner, 0));

                      case 3:
                        _context97.t1 = _context97.sent;
                        _context97.t2 = firstTokenId;
                        (0, _context97.t0)(_context97.t1).to.be.bignumber.equal(_context97.t2);

                      case 6:
                      case "end":
                        return _context97.stop();
                    }
                  }
                }, null, this);
              });
              it('adjusts all tokens list', function _callee98() {
                return regeneratorRuntime.async(function _callee98$(_context98) {
                  while (1) {
                    switch (_context98.prev = _context98.next) {
                      case 0:
                        _context98.t0 = expect;
                        _context98.next = 3;
                        return regeneratorRuntime.awrap(this.token.tokenByIndex(0));

                      case 3:
                        _context98.t1 = _context98.sent;
                        _context98.t2 = firstTokenId;
                        (0, _context98.t0)(_context98.t1).to.be.bignumber.equal(_context98.t2);

                      case 6:
                      case "end":
                        return _context98.stop();
                    }
                  }
                }, null, this);
              });

            case 3:
            case "end":
              return _context99.stop();
          }
        }
      });
    });
  });
  describe('_burn', function () {
    it('reverts when burning a non-existent token id', function _callee100() {
      return regeneratorRuntime.async(function _callee100$(_context100) {
        while (1) {
          switch (_context100.prev = _context100.next) {
            case 0:
              _context100.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burn(firstTokenId), 'ERC721: invalid token ID'));

            case 2:
            case "end":
              return _context100.stop();
          }
        }
      }, null, this);
    });
    context('with minted tokens', function () {
      beforeEach(function _callee101() {
        return regeneratorRuntime.async(function _callee101$(_context101) {
          while (1) {
            switch (_context101.prev = _context101.next) {
              case 0:
                _context101.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

              case 2:
                _context101.next = 4;
                return regeneratorRuntime.awrap(this.token.mint(owner, secondTokenId));

              case 4:
              case "end":
                return _context101.stop();
            }
          }
        }, null, this);
      });
      context('with burnt token', function () {
        beforeEach(function _callee102() {
          return regeneratorRuntime.async(function _callee102$(_context102) {
            while (1) {
              switch (_context102.prev = _context102.next) {
                case 0:
                  _context102.next = 2;
                  return regeneratorRuntime.awrap(this.token.burn(firstTokenId));

                case 2:
                  this.receipt = _context102.sent;

                case 3:
                case "end":
                  return _context102.stop();
              }
            }
          }, null, this);
        });
        it('removes that token from the token list of the owner', function _callee103() {
          return regeneratorRuntime.async(function _callee103$(_context103) {
            while (1) {
              switch (_context103.prev = _context103.next) {
                case 0:
                  _context103.t0 = expect;
                  _context103.next = 3;
                  return regeneratorRuntime.awrap(this.token.tokenOfOwnerByIndex(owner, 0));

                case 3:
                  _context103.t1 = _context103.sent;
                  _context103.t2 = secondTokenId;
                  (0, _context103.t0)(_context103.t1).to.be.bignumber.equal(_context103.t2);

                case 6:
                case "end":
                  return _context103.stop();
              }
            }
          }, null, this);
        });
        it('adjusts all tokens list', function _callee104() {
          return regeneratorRuntime.async(function _callee104$(_context104) {
            while (1) {
              switch (_context104.prev = _context104.next) {
                case 0:
                  _context104.t0 = expect;
                  _context104.next = 3;
                  return regeneratorRuntime.awrap(this.token.tokenByIndex(0));

                case 3:
                  _context104.t1 = _context104.sent;
                  _context104.t2 = secondTokenId;
                  (0, _context104.t0)(_context104.t1).to.be.bignumber.equal(_context104.t2);

                case 6:
                case "end":
                  return _context104.stop();
              }
            }
          }, null, this);
        });
        it('burns all tokens', function _callee105() {
          return regeneratorRuntime.async(function _callee105$(_context105) {
            while (1) {
              switch (_context105.prev = _context105.next) {
                case 0:
                  _context105.next = 2;
                  return regeneratorRuntime.awrap(this.token.burn(secondTokenId, {
                    from: owner
                  }));

                case 2:
                  _context105.t0 = expect;
                  _context105.next = 5;
                  return regeneratorRuntime.awrap(this.token.totalSupply());

                case 5:
                  _context105.t1 = _context105.sent;
                  (0, _context105.t0)(_context105.t1).to.be.bignumber.equal('0');
                  _context105.next = 9;
                  return regeneratorRuntime.awrap(expectRevert(this.token.tokenByIndex(0), 'ERC721Enumerable: global index out of bounds'));

                case 9:
                case "end":
                  return _context105.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
}

function shouldBehaveLikeERC721Metadata(errorPrefix, name, symbol, owner) {
  shouldSupportInterfaces(['ERC721Metadata']);
  describe('metadata', function () {
    it('has a name', function _callee106() {
      return regeneratorRuntime.async(function _callee106$(_context106) {
        while (1) {
          switch (_context106.prev = _context106.next) {
            case 0:
              _context106.t0 = expect;
              _context106.next = 3;
              return regeneratorRuntime.awrap(this.token.name());

            case 3:
              _context106.t1 = _context106.sent;
              _context106.t2 = name;
              (0, _context106.t0)(_context106.t1).to.be.equal(_context106.t2);

            case 6:
            case "end":
              return _context106.stop();
          }
        }
      }, null, this);
    });
    it('has a symbol', function _callee107() {
      return regeneratorRuntime.async(function _callee107$(_context107) {
        while (1) {
          switch (_context107.prev = _context107.next) {
            case 0:
              _context107.t0 = expect;
              _context107.next = 3;
              return regeneratorRuntime.awrap(this.token.symbol());

            case 3:
              _context107.t1 = _context107.sent;
              _context107.t2 = symbol;
              (0, _context107.t0)(_context107.t1).to.be.equal(_context107.t2);

            case 6:
            case "end":
              return _context107.stop();
          }
        }
      }, null, this);
    });
    describe('token URI', function () {
      beforeEach(function _callee108() {
        return regeneratorRuntime.async(function _callee108$(_context108) {
          while (1) {
            switch (_context108.prev = _context108.next) {
              case 0:
                _context108.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

              case 2:
              case "end":
                return _context108.stop();
            }
          }
        }, null, this);
      });
      it('return empty string by default', function _callee109() {
        return regeneratorRuntime.async(function _callee109$(_context109) {
          while (1) {
            switch (_context109.prev = _context109.next) {
              case 0:
                _context109.t0 = expect;
                _context109.next = 3;
                return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

              case 3:
                _context109.t1 = _context109.sent;
                (0, _context109.t0)(_context109.t1).to.be.equal('');

              case 5:
              case "end":
                return _context109.stop();
            }
          }
        }, null, this);
      });
      it('reverts when queried for non existent token id', function _callee110() {
        return regeneratorRuntime.async(function _callee110$(_context110) {
          while (1) {
            switch (_context110.prev = _context110.next) {
              case 0:
                _context110.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.tokenURI(nonExistentTokenId), 'ERC721: invalid token ID'));

              case 2:
              case "end":
                return _context110.stop();
            }
          }
        }, null, this);
      });
      describe('base URI', function () {
        beforeEach(function () {
          if (this.token.setBaseURI === undefined) {
            this.skip();
          }
        });
        it('base URI can be set', function _callee111() {
          return regeneratorRuntime.async(function _callee111$(_context111) {
            while (1) {
              switch (_context111.prev = _context111.next) {
                case 0:
                  _context111.next = 2;
                  return regeneratorRuntime.awrap(this.token.setBaseURI(baseURI));

                case 2:
                  _context111.t0 = expect;
                  _context111.next = 5;
                  return regeneratorRuntime.awrap(this.token.baseURI());

                case 5:
                  _context111.t1 = _context111.sent;
                  _context111.t2 = baseURI;
                  (0, _context111.t0)(_context111.t1).to.equal(_context111.t2);

                case 8:
                case "end":
                  return _context111.stop();
              }
            }
          }, null, this);
        });
        it('base URI is added as a prefix to the token URI', function _callee112() {
          return regeneratorRuntime.async(function _callee112$(_context112) {
            while (1) {
              switch (_context112.prev = _context112.next) {
                case 0:
                  _context112.next = 2;
                  return regeneratorRuntime.awrap(this.token.setBaseURI(baseURI));

                case 2:
                  _context112.t0 = expect;
                  _context112.next = 5;
                  return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

                case 5:
                  _context112.t1 = _context112.sent;
                  _context112.t2 = baseURI + firstTokenId.toString();
                  (0, _context112.t0)(_context112.t1).to.be.equal(_context112.t2);

                case 8:
                case "end":
                  return _context112.stop();
              }
            }
          }, null, this);
        });
        it('token URI can be changed by changing the base URI', function _callee113() {
          var newBaseURI;
          return regeneratorRuntime.async(function _callee113$(_context113) {
            while (1) {
              switch (_context113.prev = _context113.next) {
                case 0:
                  _context113.next = 2;
                  return regeneratorRuntime.awrap(this.token.setBaseURI(baseURI));

                case 2:
                  newBaseURI = 'https://api.example.com/v2/';
                  _context113.next = 5;
                  return regeneratorRuntime.awrap(this.token.setBaseURI(newBaseURI));

                case 5:
                  _context113.t0 = expect;
                  _context113.next = 8;
                  return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

                case 8:
                  _context113.t1 = _context113.sent;
                  _context113.t2 = newBaseURI + firstTokenId.toString();
                  (0, _context113.t0)(_context113.t1).to.be.equal(_context113.t2);

                case 11:
                case "end":
                  return _context113.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeERC721: shouldBehaveLikeERC721,
  shouldBehaveLikeERC721Enumerable: shouldBehaveLikeERC721Enumerable,
  shouldBehaveLikeERC721Metadata: shouldBehaveLikeERC721Metadata
};