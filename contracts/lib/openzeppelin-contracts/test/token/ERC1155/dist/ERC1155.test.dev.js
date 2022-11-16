"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('./ERC1155.behavior'),
    shouldBehaveLikeERC1155 = _require3.shouldBehaveLikeERC1155;

var ERC1155Mock = artifacts.require('ERC1155Mock');

contract('ERC1155', function (accounts) {
  var _accounts = _toArray(accounts),
      operator = _accounts[0],
      tokenHolder = _accounts[1],
      tokenBatchHolder = _accounts[2],
      otherAccounts = _accounts.slice(3);

  var initialURI = 'https://token-cdn-domain/{id}.json';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC1155Mock["new"](initialURI));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldBehaveLikeERC1155(otherAccounts);
  describe('internal functions', function () {
    var tokenId = new BN(1990);
    var mintAmount = new BN(9001);
    var burnAmount = new BN(3000);
    var tokenBatchIds = [new BN(2000), new BN(2010), new BN(2020)];
    var mintAmounts = [new BN(5000), new BN(10000), new BN(42195)];
    var burnAmounts = [new BN(5000), new BN(9001), new BN(195)];
    var data = '0x12345678';
    describe('_mint', function () {
      it('reverts with a zero destination address', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.mint(ZERO_ADDRESS, tokenId, mintAmount, data), 'ERC1155: mint to the zero address'));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      });
      context('with minted tokens', function () {
        beforeEach(function _callee3() {
          return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return regeneratorRuntime.awrap(this.token.mint(tokenHolder, tokenId, mintAmount, data, {
                    from: operator
                  }));

                case 2:
                  this.receipt = _context3.sent;

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, null, this);
        });
        it('emits a TransferSingle event', function () {
          expectEvent(this.receipt, 'TransferSingle', {
            operator: operator,
            from: ZERO_ADDRESS,
            to: tokenHolder,
            id: tokenId,
            value: mintAmount
          });
        });
        it('credits the minted amount of tokens', function _callee4() {
          return regeneratorRuntime.async(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.t0 = expect;
                  _context4.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(tokenHolder, tokenId));

                case 3:
                  _context4.t1 = _context4.sent;
                  _context4.t2 = mintAmount;
                  (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

                case 6:
                case "end":
                  return _context4.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('_mintBatch', function () {
      it('reverts with a zero destination address', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.mintBatch(ZERO_ADDRESS, tokenBatchIds, mintAmounts, data), 'ERC1155: mint to the zero address'));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('reverts if length of inputs do not match', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.mintBatch(tokenBatchHolder, tokenBatchIds, mintAmounts.slice(1), data), 'ERC1155: ids and amounts length mismatch'));

              case 2:
                _context6.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.mintBatch(tokenBatchHolder, tokenBatchIds.slice(1), mintAmounts, data), 'ERC1155: ids and amounts length mismatch'));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      context('with minted batch of tokens', function () {
        beforeEach(function _callee7() {
          return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return regeneratorRuntime.awrap(this.token.mintBatch(tokenBatchHolder, tokenBatchIds, mintAmounts, data, {
                    from: operator
                  }));

                case 2:
                  this.receipt = _context7.sent;

                case 3:
                case "end":
                  return _context7.stop();
              }
            }
          }, null, this);
        });
        it('emits a TransferBatch event', function () {
          expectEvent(this.receipt, 'TransferBatch', {
            operator: operator,
            from: ZERO_ADDRESS,
            to: tokenBatchHolder
          });
        });
        it('credits the minted batch of tokens', function _callee8() {
          var holderBatchBalances, i;
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOfBatch(new Array(tokenBatchIds.length).fill(tokenBatchHolder), tokenBatchIds));

                case 2:
                  holderBatchBalances = _context8.sent;

                  for (i = 0; i < holderBatchBalances.length; i++) {
                    expect(holderBatchBalances[i]).to.be.bignumber.equal(mintAmounts[i]);
                  }

                case 4:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('_burn', function () {
      it('reverts when burning the zero account\'s tokens', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.burn(ZERO_ADDRESS, tokenId, mintAmount), 'ERC1155: burn from the zero address'));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('reverts when burning a non-existent token id', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.burn(tokenHolder, tokenId, mintAmount), 'ERC1155: burn amount exceeds balance'));

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('reverts when burning more than available tokens', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(tokenHolder, tokenId, mintAmount, data, {
                  from: operator
                }));

              case 2:
                _context11.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.burn(tokenHolder, tokenId, mintAmount.addn(1)), 'ERC1155: burn amount exceeds balance'));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      context('with minted-then-burnt tokens', function () {
        beforeEach(function _callee12() {
          return regeneratorRuntime.async(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return regeneratorRuntime.awrap(this.token.mint(tokenHolder, tokenId, mintAmount, data));

                case 2:
                  _context12.next = 4;
                  return regeneratorRuntime.awrap(this.token.burn(tokenHolder, tokenId, burnAmount, {
                    from: operator
                  }));

                case 4:
                  this.receipt = _context12.sent;

                case 5:
                case "end":
                  return _context12.stop();
              }
            }
          }, null, this);
        });
        it('emits a TransferSingle event', function () {
          expectEvent(this.receipt, 'TransferSingle', {
            operator: operator,
            from: tokenHolder,
            to: ZERO_ADDRESS,
            id: tokenId,
            value: burnAmount
          });
        });
        it('accounts for both minting and burning', function _callee13() {
          return regeneratorRuntime.async(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.t0 = expect;
                  _context13.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOf(tokenHolder, tokenId));

                case 3:
                  _context13.t1 = _context13.sent;
                  _context13.t2 = mintAmount.sub(burnAmount);
                  (0, _context13.t0)(_context13.t1).to.be.bignumber.equal(_context13.t2);

                case 6:
                case "end":
                  return _context13.stop();
              }
            }
          }, null, this);
        });
      });
    });
    describe('_burnBatch', function () {
      it('reverts when burning the zero account\'s tokens', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.burnBatch(ZERO_ADDRESS, tokenBatchIds, burnAmounts), 'ERC1155: burn from the zero address'));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('reverts if length of inputs do not match', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.burnBatch(tokenBatchHolder, tokenBatchIds, burnAmounts.slice(1)), 'ERC1155: ids and amounts length mismatch'));

              case 2:
                _context15.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.token.burnBatch(tokenBatchHolder, tokenBatchIds.slice(1), burnAmounts), 'ERC1155: ids and amounts length mismatch'));

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('reverts when burning a non-existent token id', function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.token.burnBatch(tokenBatchHolder, tokenBatchIds, burnAmounts), 'ERC1155: burn amount exceeds balance'));

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      context('with minted-then-burnt tokens', function () {
        beforeEach(function _callee17() {
          return regeneratorRuntime.async(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.next = 2;
                  return regeneratorRuntime.awrap(this.token.mintBatch(tokenBatchHolder, tokenBatchIds, mintAmounts, data));

                case 2:
                  _context17.next = 4;
                  return regeneratorRuntime.awrap(this.token.burnBatch(tokenBatchHolder, tokenBatchIds, burnAmounts, {
                    from: operator
                  }));

                case 4:
                  this.receipt = _context17.sent;

                case 5:
                case "end":
                  return _context17.stop();
              }
            }
          }, null, this);
        });
        it('emits a TransferBatch event', function () {
          expectEvent(this.receipt, 'TransferBatch', {
            operator: operator,
            from: tokenBatchHolder,
            to: ZERO_ADDRESS // ids: tokenBatchIds,
            // values: burnAmounts,

          });
        });
        it('accounts for both minting and burning', function _callee18() {
          var holderBatchBalances, i;
          return regeneratorRuntime.async(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return regeneratorRuntime.awrap(this.token.balanceOfBatch(new Array(tokenBatchIds.length).fill(tokenBatchHolder), tokenBatchIds));

                case 2:
                  holderBatchBalances = _context18.sent;

                  for (i = 0; i < holderBatchBalances.length; i++) {
                    expect(holderBatchBalances[i]).to.be.bignumber.equal(mintAmounts[i].sub(burnAmounts[i]));
                  }

                case 4:
                case "end":
                  return _context18.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
  describe('ERC1155MetadataURI', function () {
    var firstTokenID = new BN('42');
    var secondTokenID = new BN('1337');
    it('emits no URI event in constructor', function _callee19() {
      return regeneratorRuntime.async(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(expectEvent.notEmitted.inConstruction(this.token, 'URI'));

            case 2:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
    it('sets the initial URI for all token types', function _callee20() {
      return regeneratorRuntime.async(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.t0 = expect;
              _context20.next = 3;
              return regeneratorRuntime.awrap(this.token.uri(firstTokenID));

            case 3:
              _context20.t1 = _context20.sent;
              _context20.t2 = initialURI;
              (0, _context20.t0)(_context20.t1).to.be.equal(_context20.t2);
              _context20.t3 = expect;
              _context20.next = 9;
              return regeneratorRuntime.awrap(this.token.uri(secondTokenID));

            case 9:
              _context20.t4 = _context20.sent;
              _context20.t5 = initialURI;
              (0, _context20.t3)(_context20.t4).to.be.equal(_context20.t5);

            case 12:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    });
    describe('_setURI', function () {
      var newURI = 'https://token-cdn-domain/{locale}/{id}.json';
      it('emits no URI event', function _callee21() {
        var receipt;
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(this.token.setURI(newURI));

              case 2:
                receipt = _context21.sent;
                expectEvent.notEmitted(receipt, 'URI');

              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
      it('sets the new URI for all token types', function _callee22() {
        return regeneratorRuntime.async(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return regeneratorRuntime.awrap(this.token.setURI(newURI));

              case 2:
                _context22.t0 = expect;
                _context22.next = 5;
                return regeneratorRuntime.awrap(this.token.uri(firstTokenID));

              case 5:
                _context22.t1 = _context22.sent;
                _context22.t2 = newURI;
                (0, _context22.t0)(_context22.t1).to.be.equal(_context22.t2);
                _context22.t3 = expect;
                _context22.next = 11;
                return regeneratorRuntime.awrap(this.token.uri(secondTokenID));

              case 11:
                _context22.t4 = _context22.sent;
                _context22.t5 = newURI;
                (0, _context22.t3)(_context22.t4).to.be.equal(_context22.t5);

              case 14:
              case "end":
                return _context22.stop();
            }
          }
        }, null, this);
      });
    });
  });
});