"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC721ConsecutiveMock = artifacts.require('ERC721ConsecutiveMock');

var ERC721ConsecutiveEnumerableMock = artifacts.require('ERC721ConsecutiveEnumerableMock');

var ERC721ConsecutiveNoConstructorMintMock = artifacts.require('ERC721ConsecutiveNoConstructorMintMock');

contract('ERC721Consecutive', function (accounts) {
  var _accounts = _slicedToArray(accounts, 4),
      user1 = _accounts[0],
      user2 = _accounts[1],
      user3 = _accounts[2],
      receiver = _accounts[3];

  var name = 'Non Fungible Token';
  var symbol = 'NFT';
  var batches = [{
    receiver: user1,
    amount: 0
  }, {
    receiver: user1,
    amount: 3
  }, {
    receiver: user2,
    amount: 5
  }, {
    receiver: user3,
    amount: 0
  }, {
    receiver: user1,
    amount: 7
  }];
  var delegates = [user1, user3];
  describe('with valid batches', function () {
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(ERC721ConsecutiveMock["new"](name, symbol, delegates, batches.map(function (_ref) {
                var receiver = _ref.receiver;
                return receiver;
              }), batches.map(function (_ref2) {
                var amount = _ref2.amount;
                return amount;
              })));

            case 2:
              this.token = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    describe('minting during construction', function () {
      it('events are emitted at construction', function _callee2() {
        var first, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, batch;

        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                first = 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = batches[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 17;
                  break;
                }

                batch = _step.value;

                if (!(batch.amount > 0)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 11;
                return regeneratorRuntime.awrap(expectEvent.inConstruction(this.token, 'ConsecutiveTransfer', {
                  fromTokenId: web3.utils.toBN(first),
                  toTokenId: web3.utils.toBN(first + batch.amount - 1),
                  fromAddress: constants.ZERO_ADDRESS,
                  toAddress: batch.receiver
                }));

              case 11:
                _context2.next = 13;
                break;

              case 13:
                first += batch.amount;

              case 14:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 17:
                _context2.next = 23;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 23:
                _context2.prev = 23;
                _context2.prev = 24;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 26:
                _context2.prev = 26;

                if (!_didIteratorError) {
                  _context2.next = 29;
                  break;
                }

                throw _iteratorError;

              case 29:
                return _context2.finish(26);

              case 30:
                return _context2.finish(23);

              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this, [[4, 19, 23, 31], [24,, 26, 30]]);
      });
      it('ownership is set', function _callee3() {
        var owners, tokenId;
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                owners = batches.flatMap(function (_ref3) {
                  var receiver = _ref3.receiver,
                      amount = _ref3.amount;
                  return Array(amount).fill(receiver);
                });
                _context3.t0 = regeneratorRuntime.keys(owners);

              case 2:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 12;
                  break;
                }

                tokenId = _context3.t1.value;
                _context3.t2 = expect;
                _context3.next = 7;
                return regeneratorRuntime.awrap(this.token.ownerOf(tokenId));

              case 7:
                _context3.t3 = _context3.sent;
                _context3.t4 = owners[tokenId];
                (0, _context3.t2)(_context3.t3).to.be.equal(_context3.t4);
                _context3.next = 2;
                break;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
      it('balance & voting power are set', function _callee4() {
        var _this = this;

        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

        return regeneratorRuntime.async(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context5.prev = 3;

                _loop = function _loop() {
                  var account, balance;
                  return regeneratorRuntime.async(function _loop$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          account = _step2.value;
                          balance = batches.filter(function (_ref4) {
                            var receiver = _ref4.receiver;
                            return receiver === account;
                          }).map(function (_ref5) {
                            var amount = _ref5.amount;
                            return amount;
                          }).reduce(function (a, b) {
                            return a + b;
                          }, 0);
                          _context4.t0 = expect;
                          _context4.next = 5;
                          return regeneratorRuntime.awrap(_this.token.balanceOf(account));

                        case 5:
                          _context4.t1 = _context4.sent;
                          _context4.t2 = web3.utils.toBN(balance);
                          (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

                          if (delegates.includes(account)) {
                            _context4.next = 17;
                            break;
                          }

                          _context4.t3 = expect;
                          _context4.next = 12;
                          return regeneratorRuntime.awrap(_this.token.getVotes(account));

                        case 12:
                          _context4.t4 = _context4.sent;
                          _context4.t5 = web3.utils.toBN(0);
                          (0, _context4.t3)(_context4.t4).to.be.bignumber.equal(_context4.t5);
                          _context4.next = 17;
                          return regeneratorRuntime.awrap(_this.token.delegate(account, {
                            from: account
                          }));

                        case 17:
                          _context4.t6 = expect;
                          _context4.next = 20;
                          return regeneratorRuntime.awrap(_this.token.getVotes(account));

                        case 20:
                          _context4.t7 = _context4.sent;
                          _context4.t8 = web3.utils.toBN(balance);
                          (0, _context4.t6)(_context4.t7).to.be.bignumber.equal(_context4.t8);

                        case 23:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  });
                };

                _iterator2 = accounts[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 9;
                return regeneratorRuntime.awrap(_loop());

              case 9:
                _iteratorNormalCompletion2 = true;
                _context5.next = 6;
                break;

              case 12:
                _context5.next = 18;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](3);
                _didIteratorError2 = true;
                _iteratorError2 = _context5.t0;

              case 18:
                _context5.prev = 18;
                _context5.prev = 19;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 21:
                _context5.prev = 21;

                if (!_didIteratorError2) {
                  _context5.next = 24;
                  break;
                }

                throw _iteratorError2;

              case 24:
                return _context5.finish(21);

              case 25:
                return _context5.finish(18);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, null, null, [[3, 14, 18, 26], [19,, 21, 25]]);
      });
    });
    describe('minting after construction', function () {
      it('consecutive minting is not possible after construction', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.mintConsecutive(user1, 10), 'ERC721Consecutive: batch minting restricted to constructor'));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('simple minting is possible after construction', function _callee6() {
        var tokenId;
        return regeneratorRuntime.async(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                tokenId = batches.reduce(function (acc, _ref6) {
                  var amount = _ref6.amount;
                  return acc + amount;
                }, 0);
                _context7.t0 = expect;
                _context7.next = 4;
                return regeneratorRuntime.awrap(this.token.exists(tokenId));

              case 4:
                _context7.t1 = _context7.sent;
                (0, _context7.t0)(_context7.t1).to.be.equal(false);
                _context7.t2 = expectEvent;
                _context7.next = 9;
                return regeneratorRuntime.awrap(this.token.mint(user1, tokenId));

              case 9:
                _context7.t3 = _context7.sent;
                _context7.t4 = {
                  from: constants.ZERO_ADDRESS,
                  to: user1,
                  tokenId: tokenId.toString()
                };
                (0, _context7.t2)(_context7.t3, 'Transfer', _context7.t4);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('cannot mint a token that has been batched minted', function _callee7() {
        var tokenId;
        return regeneratorRuntime.async(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                tokenId = batches.reduce(function (acc, _ref7) {
                  var amount = _ref7.amount;
                  return acc + amount;
                }, 0) - 1;
                _context8.t0 = expect;
                _context8.next = 4;
                return regeneratorRuntime.awrap(this.token.exists(tokenId));

              case 4:
                _context8.t1 = _context8.sent;
                (0, _context8.t0)(_context8.t1).to.be.equal(true);
                _context8.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.token.mint(user1, tokenId), 'ERC721: token already minted'));

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
    describe('ERC721 behavior', function () {
      it('core takes over ownership on transfer', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.token.transferFrom(user1, receiver, 1, {
                  from: user1
                }));

              case 2:
                _context9.t0 = expect;
                _context9.next = 5;
                return regeneratorRuntime.awrap(this.token.ownerOf(1));

              case 5:
                _context9.t1 = _context9.sent;
                _context9.t2 = receiver;
                (0, _context9.t0)(_context9.t1).to.be.equal(_context9.t2);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('tokens can be burned and re-minted #1', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = expectEvent;
                _context10.next = 3;
                return regeneratorRuntime.awrap(this.token.burn(1, {
                  from: user1
                }));

              case 3:
                _context10.t1 = _context10.sent;
                _context10.t2 = {
                  from: user1,
                  to: constants.ZERO_ADDRESS,
                  tokenId: '1'
                };
                (0, _context10.t0)(_context10.t1, 'Transfer', _context10.t2);
                _context10.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.token.ownerOf(1), 'ERC721: invalid token ID'));

              case 8:
                _context10.t3 = expectEvent;
                _context10.next = 11;
                return regeneratorRuntime.awrap(this.token.mint(user2, 1));

              case 11:
                _context10.t4 = _context10.sent;
                _context10.t5 = {
                  from: constants.ZERO_ADDRESS,
                  to: user2,
                  tokenId: '1'
                };
                (0, _context10.t3)(_context10.t4, 'Transfer', _context10.t5);
                _context10.t6 = expect;
                _context10.next = 17;
                return regeneratorRuntime.awrap(this.token.ownerOf(1));

              case 17:
                _context10.t7 = _context10.sent;
                _context10.t8 = user2;
                (0, _context10.t6)(_context10.t7).to.be.equal(_context10.t8);

              case 20:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('tokens can be burned and re-minted #2', function _callee10() {
        var tokenId;
        return regeneratorRuntime.async(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                tokenId = batches.reduce(function (acc, _ref8) {
                  var amount = _ref8.amount;
                  return acc.addn(amount);
                }, web3.utils.toBN(0));
                _context11.t0 = expect;
                _context11.next = 4;
                return regeneratorRuntime.awrap(this.token.exists(tokenId));

              case 4:
                _context11.t1 = _context11.sent;
                (0, _context11.t0)(_context11.t1).to.be.equal(false);
                _context11.next = 8;
                return regeneratorRuntime.awrap(expectRevert(this.token.ownerOf(tokenId), 'ERC721: invalid token ID'));

              case 8:
                _context11.next = 10;
                return regeneratorRuntime.awrap(this.token.mint(user1, tokenId));

              case 10:
                _context11.t2 = expect;
                _context11.next = 13;
                return regeneratorRuntime.awrap(this.token.exists(tokenId));

              case 13:
                _context11.t3 = _context11.sent;
                (0, _context11.t2)(_context11.t3).to.be.equal(true);
                _context11.t4 = expect;
                _context11.next = 18;
                return regeneratorRuntime.awrap(this.token.ownerOf(tokenId));

              case 18:
                _context11.t5 = _context11.sent;
                _context11.t6 = user1;
                (0, _context11.t4)(_context11.t5, _context11.t6);
                _context11.t7 = expectEvent;
                _context11.next = 24;
                return regeneratorRuntime.awrap(this.token.burn(tokenId, {
                  from: user1
                }));

              case 24:
                _context11.t8 = _context11.sent;
                _context11.t9 = {
                  from: user1,
                  to: constants.ZERO_ADDRESS,
                  tokenId: tokenId
                };
                (0, _context11.t7)(_context11.t8, 'Transfer', _context11.t9);
                _context11.t10 = expect;
                _context11.next = 30;
                return regeneratorRuntime.awrap(this.token.exists(tokenId));

              case 30:
                _context11.t11 = _context11.sent;
                (0, _context11.t10)(_context11.t11).to.be.equal(false);
                _context11.next = 34;
                return regeneratorRuntime.awrap(expectRevert(this.token.ownerOf(tokenId), 'ERC721: invalid token ID'));

              case 34:
                _context11.t12 = expectEvent;
                _context11.next = 37;
                return regeneratorRuntime.awrap(this.token.mint(user2, tokenId));

              case 37:
                _context11.t13 = _context11.sent;
                _context11.t14 = {
                  from: constants.ZERO_ADDRESS,
                  to: user2,
                  tokenId: tokenId
                };
                (0, _context11.t12)(_context11.t13, 'Transfer', _context11.t14);
                _context11.t15 = expect;
                _context11.next = 43;
                return regeneratorRuntime.awrap(this.token.exists(tokenId));

              case 43:
                _context11.t16 = _context11.sent;
                (0, _context11.t15)(_context11.t16).to.be.equal(true);
                _context11.t17 = expect;
                _context11.next = 48;
                return regeneratorRuntime.awrap(this.token.ownerOf(tokenId));

              case 48:
                _context11.t18 = _context11.sent;
                _context11.t19 = user2;
                (0, _context11.t17)(_context11.t18, _context11.t19);

              case 51:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('invalid use', function () {
    it('cannot mint a batch larger than 5000', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(expectRevert(ERC721ConsecutiveMock["new"](name, symbol, [], [user1], ['5001']), 'ERC721Consecutive: batch too large'));

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
    it('cannot use single minting during construction', function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(expectRevert(ERC721ConsecutiveNoConstructorMintMock["new"](name, symbol), 'ERC721Consecutive: can\'t mint during construction'));

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      });
    });
    it('cannot use single minting during construction', function _callee13() {
      return regeneratorRuntime.async(function _callee13$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(expectRevert(ERC721ConsecutiveNoConstructorMintMock["new"](name, symbol), 'ERC721Consecutive: can\'t mint during construction'));

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      });
    });
    it('consecutive mint not compatible with enumerability', function _callee14() {
      return regeneratorRuntime.async(function _callee14$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(expectRevert(ERC721ConsecutiveEnumerableMock["new"](name, symbol, batches.map(function (_ref9) {
                var receiver = _ref9.receiver;
                return receiver;
              }), batches.map(function (_ref10) {
                var amount = _ref10.amount;
                return amount;
              })), 'ERC721Enumerable: consecutive transfers not supported'));

            case 2:
            case "end":
              return _context15.stop();
          }
        }
      });
    });
  });
});