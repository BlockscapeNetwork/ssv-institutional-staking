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

var _require3 = require('../../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require3.shouldSupportInterfaces;

var ERC1155ReceiverMock = artifacts.require('ERC1155ReceiverMock');

function shouldBehaveLikeERC1155(_ref) {
  var _ref2 = _slicedToArray(_ref, 6),
      minter = _ref2[0],
      firstTokenHolder = _ref2[1],
      secondTokenHolder = _ref2[2],
      multiTokenHolder = _ref2[3],
      recipient = _ref2[4],
      proxy = _ref2[5];

  var firstTokenId = new BN(1);
  var secondTokenId = new BN(2);
  var unknownTokenId = new BN(3);
  var firstAmount = new BN(1000);
  var secondAmount = new BN(2000);
  var RECEIVER_SINGLE_MAGIC_VALUE = '0xf23a6e61';
  var RECEIVER_BATCH_MAGIC_VALUE = '0xbc197c81';
  describe('like an ERC1155', function () {
    describe('balanceOf', function () {
      it('reverts when queried about the zero address', function _callee() {
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.balanceOf(ZERO_ADDRESS, firstTokenId), 'ERC1155: address zero is not a valid owner'));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      });
      context('when accounts don\'t own tokens', function () {
        it('returns zero for given addresses', function _callee2() {
          return regeneratorRuntime.async(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = expect;
                  _context2.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(firstTokenHolder, firstTokenId));

                case 3:
                  _context2.t1 = _context2.sent;
                  (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('0');
                  _context2.t2 = expect;
                  _context2.next = 8;
                  return regeneratorRuntime.awrap(this.token.balanceOf(secondTokenHolder, secondTokenId));

                case 8:
                  _context2.t3 = _context2.sent;
                  (0, _context2.t2)(_context2.t3).to.be.bignumber.equal('0');
                  _context2.t4 = expect;
                  _context2.next = 13;
                  return regeneratorRuntime.awrap(this.token.balanceOf(firstTokenHolder, unknownTokenId));

                case 13:
                  _context2.t5 = _context2.sent;
                  (0, _context2.t4)(_context2.t5).to.be.bignumber.equal('0');

                case 15:
                case "end":
                  return _context2.stop();
              }
            }
          }, null, this);
        });
      });
      context('when accounts own some tokens', function () {
        beforeEach(function _callee3() {
          return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return regeneratorRuntime.awrap(this.token.mint(firstTokenHolder, firstTokenId, firstAmount, '0x', {
                    from: minter
                  }));

                case 2:
                  _context3.next = 4;
                  return regeneratorRuntime.awrap(this.token.mint(secondTokenHolder, secondTokenId, secondAmount, '0x', {
                    from: minter
                  }));

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, null, this);
        });
        it('returns the amount of tokens owned by the given addresses', function _callee4() {
          return regeneratorRuntime.async(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.t0 = expect;
                  _context4.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(firstTokenHolder, firstTokenId));

                case 3:
                  _context4.t1 = _context4.sent;
                  _context4.t2 = firstAmount;
                  (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);
                  _context4.t3 = expect;
                  _context4.next = 9;
                  return regeneratorRuntime.awrap(this.token.balanceOf(secondTokenHolder, secondTokenId));

                case 9:
                  _context4.t4 = _context4.sent;
                  _context4.t5 = secondAmount;
                  (0, _context4.t3)(_context4.t4).to.be.bignumber.equal(_context4.t5);
                  _context4.t6 = expect;
                  _context4.next = 15;
                  return regeneratorRuntime.awrap(this.token.balanceOf(firstTokenHolder, unknownTokenId));

                case 15:
                  _context4.t7 = _context4.sent;
                  (0, _context4.t6)(_context4.t7).to.be.bignumber.equal('0');

                case 17:
                case "end":
                  return _context4.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('balanceOfBatch', function () {
      it('reverts when input arrays don\'t match up', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.balanceOfBatch([firstTokenHolder, secondTokenHolder, firstTokenHolder, secondTokenHolder], [firstTokenId, secondTokenId, unknownTokenId]), 'ERC1155: accounts and ids length mismatch'));

              case 2:
                _context5.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.balanceOfBatch([firstTokenHolder, secondTokenHolder], [firstTokenId, secondTokenId, unknownTokenId]), 'ERC1155: accounts and ids length mismatch'));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('reverts when one of the addresses is the zero address', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.balanceOfBatch([firstTokenHolder, secondTokenHolder, ZERO_ADDRESS], [firstTokenId, secondTokenId, unknownTokenId]), 'ERC1155: address zero is not a valid owner'));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      context('when accounts don\'t own tokens', function () {
        it('returns zeros for each account', function _callee7() {
          var result;
          return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOfBatch([firstTokenHolder, secondTokenHolder, firstTokenHolder], [firstTokenId, secondTokenId, unknownTokenId]));

                case 2:
                  result = _context7.sent;
                  expect(result).to.be.an('array');
                  expect(result[0]).to.be.a.bignumber.equal('0');
                  expect(result[1]).to.be.a.bignumber.equal('0');
                  expect(result[2]).to.be.a.bignumber.equal('0');

                case 7:
                case "end":
                  return _context7.stop();
              }
            }
          }, null, this);
        });
      });
      context('when accounts own some tokens', function () {
        beforeEach(function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return regeneratorRuntime.awrap(this.token.mint(firstTokenHolder, firstTokenId, firstAmount, '0x', {
                    from: minter
                  }));

                case 2:
                  _context8.next = 4;
                  return regeneratorRuntime.awrap(this.token.mint(secondTokenHolder, secondTokenId, secondAmount, '0x', {
                    from: minter
                  }));

                case 4:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
        it('returns amounts owned by each account in order passed', function _callee9() {
          var result;
          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOfBatch([secondTokenHolder, firstTokenHolder, firstTokenHolder], [secondTokenId, firstTokenId, unknownTokenId]));

                case 2:
                  result = _context9.sent;
                  expect(result).to.be.an('array');
                  expect(result[0]).to.be.a.bignumber.equal(secondAmount);
                  expect(result[1]).to.be.a.bignumber.equal(firstAmount);
                  expect(result[2]).to.be.a.bignumber.equal('0');

                case 7:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
        it('returns multiple times the balance of the same address when asked', function _callee10() {
          var result;
          return regeneratorRuntime.async(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOfBatch([firstTokenHolder, secondTokenHolder, firstTokenHolder], [firstTokenId, secondTokenId, firstTokenId]));

                case 2:
                  result = _context10.sent;
                  expect(result).to.be.an('array');
                  expect(result[0]).to.be.a.bignumber.equal(result[2]);
                  expect(result[0]).to.be.a.bignumber.equal(firstAmount);
                  expect(result[1]).to.be.a.bignumber.equal(secondAmount);
                  expect(result[2]).to.be.a.bignumber.equal(firstAmount);

                case 8:
                case "end":
                  return _context10.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('setApprovalForAll', function () {
      var receipt;
      beforeEach(function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.token.setApprovalForAll(proxy, true, {
                  from: multiTokenHolder
                }));

              case 2:
                receipt = _context11.sent;

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('sets approval status which can be queried via isApprovedForAll', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.t0 = expect;
                _context12.next = 3;
                return regeneratorRuntime.awrap(this.token.isApprovedForAll(multiTokenHolder, proxy));

              case 3:
                _context12.t1 = _context12.sent;
                (0, _context12.t0)(_context12.t1).to.be.equal(true);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
      it('emits an ApprovalForAll log', function () {
        expectEvent(receipt, 'ApprovalForAll', {
          account: multiTokenHolder,
          operator: proxy,
          approved: true
        });
      });
      it('can unset approval for an operator', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(this.token.setApprovalForAll(proxy, false, {
                  from: multiTokenHolder
                }));

              case 2:
                _context13.t0 = expect;
                _context13.next = 5;
                return regeneratorRuntime.awrap(this.token.isApprovedForAll(multiTokenHolder, proxy));

              case 5:
                _context13.t1 = _context13.sent;
                (0, _context13.t0)(_context13.t1).to.be.equal(false);

              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('reverts if attempting to approve self as an operator', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.setApprovalForAll(multiTokenHolder, true, {
                  from: multiTokenHolder
                }), 'ERC1155: setting approval status for self'));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
    });
    describe('safeTransferFrom', function () {
      beforeEach(function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(multiTokenHolder, firstTokenId, firstAmount, '0x', {
                  from: minter
                }));

              case 2:
                _context15.next = 4;
                return regeneratorRuntime.awrap(this.token.mint(multiTokenHolder, secondTokenId, secondAmount, '0x', {
                  from: minter
                }));

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('reverts when transferring more than balance', function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(multiTokenHolder, recipient, firstTokenId, firstAmount.addn(1), '0x', {
                  from: multiTokenHolder
                }), 'ERC1155: insufficient balance for transfer'));

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      it('reverts when transferring to zero address', function _callee17() {
        return regeneratorRuntime.async(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(multiTokenHolder, ZERO_ADDRESS, firstTokenId, firstAmount, '0x', {
                  from: multiTokenHolder
                }), 'ERC1155: transfer to the zero address'));

              case 2:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });

      function transferWasSuccessful(_ref3) {
        var operator = _ref3.operator,
            from = _ref3.from,
            id = _ref3.id,
            value = _ref3.value;
        it('debits transferred balance from sender', function _callee18() {
          var newBalance;
          return regeneratorRuntime.async(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOf(from, id));

                case 2:
                  newBalance = _context18.sent;
                  expect(newBalance).to.be.a.bignumber.equal('0');

                case 4:
                case "end":
                  return _context18.stop();
              }
            }
          }, null, this);
        });
        it('credits transferred balance to receiver', function _callee19() {
          var newBalance;
          return regeneratorRuntime.async(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  _context19.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOf(this.toWhom, id));

                case 2:
                  newBalance = _context19.sent;
                  expect(newBalance).to.be.a.bignumber.equal(value);

                case 4:
                case "end":
                  return _context19.stop();
              }
            }
          }, null, this);
        });
        it('emits a TransferSingle log', function () {
          expectEvent(this.transferLogs, 'TransferSingle', {
            operator: operator,
            from: from,
            to: this.toWhom,
            id: id,
            value: value
          });
        });
      }

      context('when called by the multiTokenHolder', function _callee22() {
        return regeneratorRuntime.async(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                beforeEach(function _callee20() {
                  return regeneratorRuntime.async(function _callee20$(_context20) {
                    while (1) {
                      switch (_context20.prev = _context20.next) {
                        case 0:
                          this.toWhom = recipient;
                          _context20.next = 3;
                          return regeneratorRuntime.awrap(this.token.safeTransferFrom(multiTokenHolder, recipient, firstTokenId, firstAmount, '0x', {
                            from: multiTokenHolder
                          }));

                        case 3:
                          this.transferLogs = _context20.sent;

                        case 4:
                        case "end":
                          return _context20.stop();
                      }
                    }
                  }, null, this);
                });
                transferWasSuccessful.call(this, {
                  operator: multiTokenHolder,
                  from: multiTokenHolder,
                  id: firstTokenId,
                  value: firstAmount
                });
                it('preserves existing balances which are not transferred by multiTokenHolder', function _callee21() {
                  var balance1, balance2;
                  return regeneratorRuntime.async(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          _context21.next = 2;
                          return regeneratorRuntime.awrap(this.token.balanceOf(multiTokenHolder, secondTokenId));

                        case 2:
                          balance1 = _context21.sent;
                          expect(balance1).to.be.a.bignumber.equal(secondAmount);
                          _context21.next = 6;
                          return regeneratorRuntime.awrap(this.token.balanceOf(recipient, secondTokenId));

                        case 6:
                          balance2 = _context21.sent;
                          expect(balance2).to.be.a.bignumber.equal('0');

                        case 8:
                        case "end":
                          return _context21.stop();
                      }
                    }
                  }, null, this);
                });

              case 3:
              case "end":
                return _context22.stop();
            }
          }
        }, null, this);
      });
      context('when called by an operator on behalf of the multiTokenHolder', function () {
        context('when operator is not approved by multiTokenHolder', function () {
          beforeEach(function _callee23() {
            return regeneratorRuntime.async(function _callee23$(_context23) {
              while (1) {
                switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(proxy, false, {
                      from: multiTokenHolder
                    }));

                  case 2:
                  case "end":
                    return _context23.stop();
                }
              }
            }, null, this);
          });
          it('reverts', function _callee24() {
            return regeneratorRuntime.async(function _callee24$(_context24) {
              while (1) {
                switch (_context24.prev = _context24.next) {
                  case 0:
                    _context24.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(multiTokenHolder, recipient, firstTokenId, firstAmount, '0x', {
                      from: proxy
                    }), 'ERC1155: caller is not token owner or approved'));

                  case 2:
                  case "end":
                    return _context24.stop();
                }
              }
            }, null, this);
          });
        });
        context('when operator is approved by multiTokenHolder', function () {
          beforeEach(function _callee25() {
            return regeneratorRuntime.async(function _callee25$(_context25) {
              while (1) {
                switch (_context25.prev = _context25.next) {
                  case 0:
                    this.toWhom = recipient;
                    _context25.next = 3;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(proxy, true, {
                      from: multiTokenHolder
                    }));

                  case 3:
                    _context25.next = 5;
                    return regeneratorRuntime.awrap(this.token.safeTransferFrom(multiTokenHolder, recipient, firstTokenId, firstAmount, '0x', {
                      from: proxy
                    }));

                  case 5:
                    this.transferLogs = _context25.sent;

                  case 6:
                  case "end":
                    return _context25.stop();
                }
              }
            }, null, this);
          });
          transferWasSuccessful.call(this, {
            operator: proxy,
            from: multiTokenHolder,
            id: firstTokenId,
            value: firstAmount
          });
          it('preserves operator\'s balances not involved in the transfer', function _callee26() {
            var balance1, balance2;
            return regeneratorRuntime.async(function _callee26$(_context26) {
              while (1) {
                switch (_context26.prev = _context26.next) {
                  case 0:
                    _context26.next = 2;
                    return regeneratorRuntime.awrap(this.token.balanceOf(proxy, firstTokenId));

                  case 2:
                    balance1 = _context26.sent;
                    expect(balance1).to.be.a.bignumber.equal('0');
                    _context26.next = 6;
                    return regeneratorRuntime.awrap(this.token.balanceOf(proxy, secondTokenId));

                  case 6:
                    balance2 = _context26.sent;
                    expect(balance2).to.be.a.bignumber.equal('0');

                  case 8:
                  case "end":
                    return _context26.stop();
                }
              }
            }, null, this);
          });
        });
      });
      context('when sending to a valid receiver', function () {
        beforeEach(function _callee27() {
          return regeneratorRuntime.async(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  _context27.next = 2;
                  return regeneratorRuntime.awrap(ERC1155ReceiverMock["new"](RECEIVER_SINGLE_MAGIC_VALUE, false, RECEIVER_BATCH_MAGIC_VALUE, false));

                case 2:
                  this.receiver = _context27.sent;

                case 3:
                case "end":
                  return _context27.stop();
              }
            }
          }, null, this);
        });
        context('without data', function () {
          beforeEach(function _callee28() {
            return regeneratorRuntime.async(function _callee28$(_context28) {
              while (1) {
                switch (_context28.prev = _context28.next) {
                  case 0:
                    this.toWhom = this.receiver.address;
                    _context28.next = 3;
                    return regeneratorRuntime.awrap(this.token.safeTransferFrom(multiTokenHolder, this.receiver.address, firstTokenId, firstAmount, '0x', {
                      from: multiTokenHolder
                    }));

                  case 3:
                    this.transferReceipt = _context28.sent;
                    this.transferLogs = this.transferReceipt;

                  case 5:
                  case "end":
                    return _context28.stop();
                }
              }
            }, null, this);
          });
          transferWasSuccessful.call(this, {
            operator: multiTokenHolder,
            from: multiTokenHolder,
            id: firstTokenId,
            value: firstAmount
          });
          it('calls onERC1155Received', function _callee29() {
            return regeneratorRuntime.async(function _callee29$(_context29) {
              while (1) {
                switch (_context29.prev = _context29.next) {
                  case 0:
                    _context29.next = 2;
                    return regeneratorRuntime.awrap(expectEvent.inTransaction(this.transferReceipt.tx, ERC1155ReceiverMock, 'Received', {
                      operator: multiTokenHolder,
                      from: multiTokenHolder,
                      id: firstTokenId,
                      value: firstAmount,
                      data: null
                    }));

                  case 2:
                  case "end":
                    return _context29.stop();
                }
              }
            }, null, this);
          });
        });
        context('with data', function () {
          var data = '0xf00dd00d';
          beforeEach(function _callee30() {
            return regeneratorRuntime.async(function _callee30$(_context30) {
              while (1) {
                switch (_context30.prev = _context30.next) {
                  case 0:
                    this.toWhom = this.receiver.address;
                    _context30.next = 3;
                    return regeneratorRuntime.awrap(this.token.safeTransferFrom(multiTokenHolder, this.receiver.address, firstTokenId, firstAmount, data, {
                      from: multiTokenHolder
                    }));

                  case 3:
                    this.transferReceipt = _context30.sent;
                    this.transferLogs = this.transferReceipt;

                  case 5:
                  case "end":
                    return _context30.stop();
                }
              }
            }, null, this);
          });
          transferWasSuccessful.call(this, {
            operator: multiTokenHolder,
            from: multiTokenHolder,
            id: firstTokenId,
            value: firstAmount
          });
          it('calls onERC1155Received', function _callee31() {
            return regeneratorRuntime.async(function _callee31$(_context31) {
              while (1) {
                switch (_context31.prev = _context31.next) {
                  case 0:
                    _context31.next = 2;
                    return regeneratorRuntime.awrap(expectEvent.inTransaction(this.transferReceipt.tx, ERC1155ReceiverMock, 'Received', {
                      operator: multiTokenHolder,
                      from: multiTokenHolder,
                      id: firstTokenId,
                      value: firstAmount,
                      data: data
                    }));

                  case 2:
                  case "end":
                    return _context31.stop();
                }
              }
            }, null, this);
          });
        });
      });
      context('to a receiver contract returning unexpected value', function () {
        beforeEach(function _callee32() {
          return regeneratorRuntime.async(function _callee32$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  _context32.next = 2;
                  return regeneratorRuntime.awrap(ERC1155ReceiverMock["new"]('0x00c0ffee', false, RECEIVER_BATCH_MAGIC_VALUE, false));

                case 2:
                  this.receiver = _context32.sent;

                case 3:
                case "end":
                  return _context32.stop();
              }
            }
          }, null, this);
        });
        it('reverts', function _callee33() {
          return regeneratorRuntime.async(function _callee33$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  _context33.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(multiTokenHolder, this.receiver.address, firstTokenId, firstAmount, '0x', {
                    from: multiTokenHolder
                  }), 'ERC1155: ERC1155Receiver rejected tokens'));

                case 2:
                case "end":
                  return _context33.stop();
              }
            }
          }, null, this);
        });
      });
      context('to a receiver contract that reverts', function () {
        beforeEach(function _callee34() {
          return regeneratorRuntime.async(function _callee34$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  _context34.next = 2;
                  return regeneratorRuntime.awrap(ERC1155ReceiverMock["new"](RECEIVER_SINGLE_MAGIC_VALUE, true, RECEIVER_BATCH_MAGIC_VALUE, false));

                case 2:
                  this.receiver = _context34.sent;

                case 3:
                case "end":
                  return _context34.stop();
              }
            }
          }, null, this);
        });
        it('reverts', function _callee35() {
          return regeneratorRuntime.async(function _callee35$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  _context35.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(multiTokenHolder, this.receiver.address, firstTokenId, firstAmount, '0x', {
                    from: multiTokenHolder
                  }), 'ERC1155ReceiverMock: reverting on receive'));

                case 2:
                case "end":
                  return _context35.stop();
              }
            }
          }, null, this);
        });
      });
      context('to a contract that does not implement the required function', function () {
        it('reverts', function _callee36() {
          var invalidReceiver;
          return regeneratorRuntime.async(function _callee36$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  invalidReceiver = this.token;
                  _context36.next = 3;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.safeTransferFrom(multiTokenHolder, invalidReceiver.address, firstTokenId, firstAmount, '0x', {
                    from: multiTokenHolder
                  })));

                case 3:
                case "end":
                  return _context36.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('safeBatchTransferFrom', function () {
      beforeEach(function _callee37() {
        return regeneratorRuntime.async(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                _context37.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(multiTokenHolder, firstTokenId, firstAmount, '0x', {
                  from: minter
                }));

              case 2:
                _context37.next = 4;
                return regeneratorRuntime.awrap(this.token.mint(multiTokenHolder, secondTokenId, secondAmount, '0x', {
                  from: minter
                }));

              case 4:
              case "end":
                return _context37.stop();
            }
          }
        }, null, this);
      });
      it('reverts when transferring amount more than any of balances', function _callee38() {
        return regeneratorRuntime.async(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                _context38.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(multiTokenHolder, recipient, [firstTokenId, secondTokenId], [firstAmount, secondAmount.addn(1)], '0x', {
                  from: multiTokenHolder
                }), 'ERC1155: insufficient balance for transfer'));

              case 2:
              case "end":
                return _context38.stop();
            }
          }
        }, null, this);
      });
      it('reverts when ids array length doesn\'t match amounts array length', function _callee39() {
        return regeneratorRuntime.async(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                _context39.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(multiTokenHolder, recipient, [firstTokenId], [firstAmount, secondAmount], '0x', {
                  from: multiTokenHolder
                }), 'ERC1155: ids and amounts length mismatch'));

              case 2:
                _context39.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(multiTokenHolder, recipient, [firstTokenId, secondTokenId], [firstAmount], '0x', {
                  from: multiTokenHolder
                }), 'ERC1155: ids and amounts length mismatch'));

              case 4:
              case "end":
                return _context39.stop();
            }
          }
        }, null, this);
      });
      it('reverts when transferring to zero address', function _callee40() {
        return regeneratorRuntime.async(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                _context40.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(multiTokenHolder, ZERO_ADDRESS, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                  from: multiTokenHolder
                }), 'ERC1155: transfer to the zero address'));

              case 2:
              case "end":
                return _context40.stop();
            }
          }
        }, null, this);
      });

      function batchTransferWasSuccessful(_ref4) {
        var operator = _ref4.operator,
            from = _ref4.from,
            ids = _ref4.ids,
            values = _ref4.values;
        it('debits transferred balances from sender', function _callee41() {
          var newBalances, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, newBalance;

          return regeneratorRuntime.async(function _callee41$(_context41) {
            while (1) {
              switch (_context41.prev = _context41.next) {
                case 0:
                  _context41.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOfBatch(new Array(ids.length).fill(from), ids));

                case 2:
                  newBalances = _context41.sent;
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context41.prev = 6;

                  for (_iterator = newBalances[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    newBalance = _step.value;
                    expect(newBalance).to.be.a.bignumber.equal('0');
                  }

                  _context41.next = 14;
                  break;

                case 10:
                  _context41.prev = 10;
                  _context41.t0 = _context41["catch"](6);
                  _didIteratorError = true;
                  _iteratorError = _context41.t0;

                case 14:
                  _context41.prev = 14;
                  _context41.prev = 15;

                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }

                case 17:
                  _context41.prev = 17;

                  if (!_didIteratorError) {
                    _context41.next = 20;
                    break;
                  }

                  throw _iteratorError;

                case 20:
                  return _context41.finish(17);

                case 21:
                  return _context41.finish(14);

                case 22:
                case "end":
                  return _context41.stop();
              }
            }
          }, null, this, [[6, 10, 14, 22], [15,, 17, 21]]);
        });
        it('credits transferred balances to receiver', function _callee42() {
          var newBalances, i;
          return regeneratorRuntime.async(function _callee42$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  _context42.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOfBatch(new Array(ids.length).fill(this.toWhom), ids));

                case 2:
                  newBalances = _context42.sent;

                  for (i = 0; i < newBalances.length; i++) {
                    expect(newBalances[i]).to.be.a.bignumber.equal(values[i]);
                  }

                case 4:
                case "end":
                  return _context42.stop();
              }
            }
          }, null, this);
        });
        it('emits a TransferBatch log', function () {
          expectEvent(this.transferLogs, 'TransferBatch', {
            operator: operator,
            from: from,
            to: this.toWhom // ids,
            // values,

          });
        });
      }

      context('when called by the multiTokenHolder', function _callee44() {
        return regeneratorRuntime.async(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                beforeEach(function _callee43() {
                  return regeneratorRuntime.async(function _callee43$(_context43) {
                    while (1) {
                      switch (_context43.prev = _context43.next) {
                        case 0:
                          this.toWhom = recipient;
                          _context43.next = 3;
                          return regeneratorRuntime.awrap(this.token.safeBatchTransferFrom(multiTokenHolder, recipient, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                            from: multiTokenHolder
                          }));

                        case 3:
                          this.transferLogs = _context43.sent;

                        case 4:
                        case "end":
                          return _context43.stop();
                      }
                    }
                  }, null, this);
                });
                batchTransferWasSuccessful.call(this, {
                  operator: multiTokenHolder,
                  from: multiTokenHolder,
                  ids: [firstTokenId, secondTokenId],
                  values: [firstAmount, secondAmount]
                });

              case 2:
              case "end":
                return _context44.stop();
            }
          }
        }, null, this);
      });
      context('when called by an operator on behalf of the multiTokenHolder', function () {
        context('when operator is not approved by multiTokenHolder', function () {
          beforeEach(function _callee45() {
            return regeneratorRuntime.async(function _callee45$(_context45) {
              while (1) {
                switch (_context45.prev = _context45.next) {
                  case 0:
                    _context45.next = 2;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(proxy, false, {
                      from: multiTokenHolder
                    }));

                  case 2:
                  case "end":
                    return _context45.stop();
                }
              }
            }, null, this);
          });
          it('reverts', function _callee46() {
            return regeneratorRuntime.async(function _callee46$(_context46) {
              while (1) {
                switch (_context46.prev = _context46.next) {
                  case 0:
                    _context46.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(multiTokenHolder, recipient, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                      from: proxy
                    }), 'ERC1155: caller is not token owner or approved'));

                  case 2:
                  case "end":
                    return _context46.stop();
                }
              }
            }, null, this);
          });
        });
        context('when operator is approved by multiTokenHolder', function () {
          beforeEach(function _callee47() {
            return regeneratorRuntime.async(function _callee47$(_context47) {
              while (1) {
                switch (_context47.prev = _context47.next) {
                  case 0:
                    this.toWhom = recipient;
                    _context47.next = 3;
                    return regeneratorRuntime.awrap(this.token.setApprovalForAll(proxy, true, {
                      from: multiTokenHolder
                    }));

                  case 3:
                    _context47.next = 5;
                    return regeneratorRuntime.awrap(this.token.safeBatchTransferFrom(multiTokenHolder, recipient, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                      from: proxy
                    }));

                  case 5:
                    this.transferLogs = _context47.sent;

                  case 6:
                  case "end":
                    return _context47.stop();
                }
              }
            }, null, this);
          });
          batchTransferWasSuccessful.call(this, {
            operator: proxy,
            from: multiTokenHolder,
            ids: [firstTokenId, secondTokenId],
            values: [firstAmount, secondAmount]
          });
          it('preserves operator\'s balances not involved in the transfer', function _callee48() {
            var balance1, balance2;
            return regeneratorRuntime.async(function _callee48$(_context48) {
              while (1) {
                switch (_context48.prev = _context48.next) {
                  case 0:
                    _context48.next = 2;
                    return regeneratorRuntime.awrap(this.token.balanceOf(proxy, firstTokenId));

                  case 2:
                    balance1 = _context48.sent;
                    expect(balance1).to.be.a.bignumber.equal('0');
                    _context48.next = 6;
                    return regeneratorRuntime.awrap(this.token.balanceOf(proxy, secondTokenId));

                  case 6:
                    balance2 = _context48.sent;
                    expect(balance2).to.be.a.bignumber.equal('0');

                  case 8:
                  case "end":
                    return _context48.stop();
                }
              }
            }, null, this);
          });
        });
      });
      context('when sending to a valid receiver', function () {
        beforeEach(function _callee49() {
          return regeneratorRuntime.async(function _callee49$(_context49) {
            while (1) {
              switch (_context49.prev = _context49.next) {
                case 0:
                  _context49.next = 2;
                  return regeneratorRuntime.awrap(ERC1155ReceiverMock["new"](RECEIVER_SINGLE_MAGIC_VALUE, false, RECEIVER_BATCH_MAGIC_VALUE, false));

                case 2:
                  this.receiver = _context49.sent;

                case 3:
                case "end":
                  return _context49.stop();
              }
            }
          }, null, this);
        });
        context('without data', function () {
          beforeEach(function _callee50() {
            return regeneratorRuntime.async(function _callee50$(_context50) {
              while (1) {
                switch (_context50.prev = _context50.next) {
                  case 0:
                    this.toWhom = this.receiver.address;
                    _context50.next = 3;
                    return regeneratorRuntime.awrap(this.token.safeBatchTransferFrom(multiTokenHolder, this.receiver.address, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                      from: multiTokenHolder
                    }));

                  case 3:
                    this.transferReceipt = _context50.sent;
                    this.transferLogs = this.transferReceipt;

                  case 5:
                  case "end":
                    return _context50.stop();
                }
              }
            }, null, this);
          });
          batchTransferWasSuccessful.call(this, {
            operator: multiTokenHolder,
            from: multiTokenHolder,
            ids: [firstTokenId, secondTokenId],
            values: [firstAmount, secondAmount]
          });
          it('calls onERC1155BatchReceived', function _callee51() {
            return regeneratorRuntime.async(function _callee51$(_context51) {
              while (1) {
                switch (_context51.prev = _context51.next) {
                  case 0:
                    _context51.next = 2;
                    return regeneratorRuntime.awrap(expectEvent.inTransaction(this.transferReceipt.tx, ERC1155ReceiverMock, 'BatchReceived', {
                      operator: multiTokenHolder,
                      from: multiTokenHolder,
                      // ids: [firstTokenId, secondTokenId],
                      // values: [firstAmount, secondAmount],
                      data: null
                    }));

                  case 2:
                  case "end":
                    return _context51.stop();
                }
              }
            }, null, this);
          });
        });
        context('with data', function () {
          var data = '0xf00dd00d';
          beforeEach(function _callee52() {
            return regeneratorRuntime.async(function _callee52$(_context52) {
              while (1) {
                switch (_context52.prev = _context52.next) {
                  case 0:
                    this.toWhom = this.receiver.address;
                    _context52.next = 3;
                    return regeneratorRuntime.awrap(this.token.safeBatchTransferFrom(multiTokenHolder, this.receiver.address, [firstTokenId, secondTokenId], [firstAmount, secondAmount], data, {
                      from: multiTokenHolder
                    }));

                  case 3:
                    this.transferReceipt = _context52.sent;
                    this.transferLogs = this.transferReceipt;

                  case 5:
                  case "end":
                    return _context52.stop();
                }
              }
            }, null, this);
          });
          batchTransferWasSuccessful.call(this, {
            operator: multiTokenHolder,
            from: multiTokenHolder,
            ids: [firstTokenId, secondTokenId],
            values: [firstAmount, secondAmount]
          });
          it('calls onERC1155Received', function _callee53() {
            return regeneratorRuntime.async(function _callee53$(_context53) {
              while (1) {
                switch (_context53.prev = _context53.next) {
                  case 0:
                    _context53.next = 2;
                    return regeneratorRuntime.awrap(expectEvent.inTransaction(this.transferReceipt.tx, ERC1155ReceiverMock, 'BatchReceived', {
                      operator: multiTokenHolder,
                      from: multiTokenHolder,
                      // ids: [firstTokenId, secondTokenId],
                      // values: [firstAmount, secondAmount],
                      data: data
                    }));

                  case 2:
                  case "end":
                    return _context53.stop();
                }
              }
            }, null, this);
          });
        });
      });
      context('to a receiver contract returning unexpected value', function () {
        beforeEach(function _callee54() {
          return regeneratorRuntime.async(function _callee54$(_context54) {
            while (1) {
              switch (_context54.prev = _context54.next) {
                case 0:
                  _context54.next = 2;
                  return regeneratorRuntime.awrap(ERC1155ReceiverMock["new"](RECEIVER_SINGLE_MAGIC_VALUE, false, RECEIVER_SINGLE_MAGIC_VALUE, false));

                case 2:
                  this.receiver = _context54.sent;

                case 3:
                case "end":
                  return _context54.stop();
              }
            }
          }, null, this);
        });
        it('reverts', function _callee55() {
          return regeneratorRuntime.async(function _callee55$(_context55) {
            while (1) {
              switch (_context55.prev = _context55.next) {
                case 0:
                  _context55.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(multiTokenHolder, this.receiver.address, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                    from: multiTokenHolder
                  }), 'ERC1155: ERC1155Receiver rejected tokens'));

                case 2:
                case "end":
                  return _context55.stop();
              }
            }
          }, null, this);
        });
      });
      context('to a receiver contract that reverts', function () {
        beforeEach(function _callee56() {
          return regeneratorRuntime.async(function _callee56$(_context56) {
            while (1) {
              switch (_context56.prev = _context56.next) {
                case 0:
                  _context56.next = 2;
                  return regeneratorRuntime.awrap(ERC1155ReceiverMock["new"](RECEIVER_SINGLE_MAGIC_VALUE, false, RECEIVER_BATCH_MAGIC_VALUE, true));

                case 2:
                  this.receiver = _context56.sent;

                case 3:
                case "end":
                  return _context56.stop();
              }
            }
          }, null, this);
        });
        it('reverts', function _callee57() {
          return regeneratorRuntime.async(function _callee57$(_context57) {
            while (1) {
              switch (_context57.prev = _context57.next) {
                case 0:
                  _context57.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(multiTokenHolder, this.receiver.address, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                    from: multiTokenHolder
                  }), 'ERC1155ReceiverMock: reverting on batch receive'));

                case 2:
                case "end":
                  return _context57.stop();
              }
            }
          }, null, this);
        });
      });
      context('to a receiver contract that reverts only on single transfers', function () {
        beforeEach(function _callee58() {
          return regeneratorRuntime.async(function _callee58$(_context58) {
            while (1) {
              switch (_context58.prev = _context58.next) {
                case 0:
                  _context58.next = 2;
                  return regeneratorRuntime.awrap(ERC1155ReceiverMock["new"](RECEIVER_SINGLE_MAGIC_VALUE, true, RECEIVER_BATCH_MAGIC_VALUE, false));

                case 2:
                  this.receiver = _context58.sent;
                  this.toWhom = this.receiver.address;
                  _context58.next = 6;
                  return regeneratorRuntime.awrap(this.token.safeBatchTransferFrom(multiTokenHolder, this.receiver.address, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                    from: multiTokenHolder
                  }));

                case 6:
                  this.transferReceipt = _context58.sent;
                  this.transferLogs = this.transferReceipt;

                case 8:
                case "end":
                  return _context58.stop();
              }
            }
          }, null, this);
        });
        batchTransferWasSuccessful.call(this, {
          operator: multiTokenHolder,
          from: multiTokenHolder,
          ids: [firstTokenId, secondTokenId],
          values: [firstAmount, secondAmount]
        });
        it('calls onERC1155BatchReceived', function _callee59() {
          return regeneratorRuntime.async(function _callee59$(_context59) {
            while (1) {
              switch (_context59.prev = _context59.next) {
                case 0:
                  _context59.next = 2;
                  return regeneratorRuntime.awrap(expectEvent.inTransaction(this.transferReceipt.tx, ERC1155ReceiverMock, 'BatchReceived', {
                    operator: multiTokenHolder,
                    from: multiTokenHolder,
                    // ids: [firstTokenId, secondTokenId],
                    // values: [firstAmount, secondAmount],
                    data: null
                  }));

                case 2:
                case "end":
                  return _context59.stop();
              }
            }
          }, null, this);
        });
      });
      context('to a contract that does not implement the required function', function () {
        it('reverts', function _callee60() {
          var invalidReceiver;
          return regeneratorRuntime.async(function _callee60$(_context60) {
            while (1) {
              switch (_context60.prev = _context60.next) {
                case 0:
                  invalidReceiver = this.token;
                  _context60.next = 3;
                  return regeneratorRuntime.awrap(expectRevert.unspecified(this.token.safeBatchTransferFrom(multiTokenHolder, invalidReceiver.address, [firstTokenId, secondTokenId], [firstAmount, secondAmount], '0x', {
                    from: multiTokenHolder
                  })));

                case 3:
                case "end":
                  return _context60.stop();
              }
            }
          }, null, this);
        });
      });
    });
    shouldSupportInterfaces(['ERC165', 'ERC1155']);
  });
}

module.exports = {
  shouldBehaveLikeERC1155: shouldBehaveLikeERC1155
};