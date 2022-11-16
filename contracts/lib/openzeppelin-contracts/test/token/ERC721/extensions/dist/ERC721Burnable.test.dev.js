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

var ERC721BurnableMock = artifacts.require('ERC721BurnableMock');

contract('ERC721Burnable', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      owner = _accounts[0],
      approved = _accounts[1];

  var firstTokenId = new BN(1);
  var secondTokenId = new BN(2);
  var unknownTokenId = new BN(3);
  var name = 'Non Fungible Token';
  var symbol = 'NFT';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC721BurnableMock["new"](name, symbol));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('like a burnable ERC721', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.token.mint(owner, secondTokenId));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    describe('burn', function () {
      var tokenId = firstTokenId;
      var receipt = null;
      describe('when successful', function () {
        beforeEach(function _callee3() {
          return regeneratorRuntime.async(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return regeneratorRuntime.awrap(this.token.burn(tokenId, {
                    from: owner
                  }));

                case 2:
                  receipt = _context3.sent;

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, null, this);
        });
        it('burns the given token ID and adjusts the balance of the owner', function _callee4() {
          return regeneratorRuntime.async(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.ownerOf(tokenId), 'ERC721: invalid token ID'));

                case 2:
                  _context4.t0 = expect;
                  _context4.next = 5;
                  return regeneratorRuntime.awrap(this.token.balanceOf(owner));

                case 5:
                  _context4.t1 = _context4.sent;
                  (0, _context4.t0)(_context4.t1).to.be.bignumber.equal('1');

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, null, this);
        });
        it('emits a burn event', function _callee5() {
          return regeneratorRuntime.async(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  expectEvent(receipt, 'Transfer', {
                    from: owner,
                    to: ZERO_ADDRESS,
                    tokenId: tokenId
                  });

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          });
        });
      });
      describe('when there is a previous approval burned', function () {
        beforeEach(function _callee6() {
          return regeneratorRuntime.async(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return regeneratorRuntime.awrap(this.token.approve(approved, tokenId, {
                    from: owner
                  }));

                case 2:
                  _context6.next = 4;
                  return regeneratorRuntime.awrap(this.token.burn(tokenId, {
                    from: owner
                  }));

                case 4:
                  receipt = _context6.sent;

                case 5:
                case "end":
                  return _context6.stop();
              }
            }
          }, null, this);
        });
        context('getApproved', function () {
          it('reverts', function _callee7() {
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.token.getApproved(tokenId), 'ERC721: invalid token ID'));

                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }
            }, null, this);
          });
        });
      });
      describe('when the given token ID was not tracked by this contract', function () {
        it('reverts', function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return regeneratorRuntime.awrap(expectRevert(this.token.burn(unknownTokenId, {
                    from: owner
                  }), 'ERC721: invalid token ID'));

                case 2:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
      });
    });
  });
});