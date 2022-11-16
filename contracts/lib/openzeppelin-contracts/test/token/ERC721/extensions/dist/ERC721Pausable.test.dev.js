"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectRevert = _require.expectRevert;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC721PausableMock = artifacts.require('ERC721PausableMock');

contract('ERC721Pausable', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      owner = _accounts[0],
      receiver = _accounts[1],
      operator = _accounts[2];

  var name = 'Non Fungible Token';
  var symbol = 'NFT';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC721PausableMock["new"](name, symbol));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('when token is paused', function () {
    var firstTokenId = new BN(1);
    var secondTokenId = new BN(1337);
    var mockData = '0x42';
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId, {
                from: owner
              }));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.token.pause());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to transferFrom', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.transferFrom(owner, receiver, firstTokenId, {
                from: owner
              }), 'ERC721Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to safeTransferFrom', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(owner, receiver, firstTokenId, {
                from: owner
              }), 'ERC721Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to safeTransferFrom with data', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.methods['safeTransferFrom(address,address,uint256,bytes)'](owner, receiver, firstTokenId, mockData, {
                from: owner
              }), 'ERC721Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to mint', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(receiver, secondTokenId), 'ERC721Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to burn', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burn(firstTokenId), 'ERC721Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    describe('getApproved', function () {
      it('returns approved address', function _callee8() {
        var approvedAccount;
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(this.token.getApproved(firstTokenId));

              case 2:
                approvedAccount = _context8.sent;
                expect(approvedAccount).to.equal(ZERO_ADDRESS);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
    });
    describe('balanceOf', function () {
      it('returns the amount of tokens owned by the given address', function _callee9() {
        var balance;
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.token.balanceOf(owner));

              case 2:
                balance = _context9.sent;
                expect(balance).to.be.bignumber.equal('1');

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
    });
    describe('ownerOf', function () {
      it('returns the amount of tokens owned by the given address', function _callee10() {
        var ownerOfToken;
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.token.ownerOf(firstTokenId));

              case 2:
                ownerOfToken = _context10.sent;
                expect(ownerOfToken).to.equal(owner);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
    });
    describe('exists', function () {
      it('returns token existence', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.t0 = expect;
                _context11.next = 3;
                return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

              case 3:
                _context11.t1 = _context11.sent;
                (0, _context11.t0)(_context11.t1).to.equal(true);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
    describe('isApprovedForAll', function () {
      it('returns the approval of the operator', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.t0 = expect;
                _context12.next = 3;
                return regeneratorRuntime.awrap(this.token.isApprovedForAll(owner, operator));

              case 3:
                _context12.t1 = _context12.sent;
                (0, _context12.t0)(_context12.t1).to.equal(false);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
  });
});