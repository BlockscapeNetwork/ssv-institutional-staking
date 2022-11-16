"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC1155PausableMock = artifacts.require('ERC1155PausableMock');

contract('ERC1155Pausable', function (accounts) {
  var _accounts = _slicedToArray(accounts, 4),
      holder = _accounts[0],
      operator = _accounts[1],
      receiver = _accounts[2],
      other = _accounts[3];

  var uri = 'https://token.com';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC1155PausableMock["new"](uri));

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
    var firstTokenId = new BN('37');
    var firstTokenAmount = new BN('42');
    var secondTokenId = new BN('19842');
    var secondTokenAmount = new BN('23');
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                from: holder
              }));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.token.mint(holder, firstTokenId, firstTokenAmount, '0x'));

            case 4:
              _context2.next = 6;
              return regeneratorRuntime.awrap(this.token.pause());

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to safeTransferFrom from holder', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(holder, receiver, firstTokenId, firstTokenAmount, '0x', {
                from: holder
              }), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to safeTransferFrom from operator', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.safeTransferFrom(holder, receiver, firstTokenId, firstTokenAmount, '0x', {
                from: operator
              }), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to safeBatchTransferFrom from holder', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(holder, receiver, [firstTokenId], [firstTokenAmount], '0x', {
                from: holder
              }), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to safeBatchTransferFrom from operator', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.safeBatchTransferFrom(holder, receiver, [firstTokenId], [firstTokenAmount], '0x', {
                from: operator
              }), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to mint', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(holder, secondTokenId, secondTokenAmount, '0x'), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to mintBatch', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.mintBatch(holder, [secondTokenId], [secondTokenAmount], '0x'), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to burn', function _callee9() {
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burn(holder, firstTokenId, firstTokenAmount), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('reverts when trying to burnBatch', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burnBatch(holder, [firstTokenId], [firstTokenAmount]), 'ERC1155Pausable: token transfer while paused'));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    describe('setApprovalForAll', function () {
      it('approves an operator', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(this.token.setApprovalForAll(other, true, {
                  from: holder
                }));

              case 2:
                _context11.t0 = expect;
                _context11.next = 5;
                return regeneratorRuntime.awrap(this.token.isApprovedForAll(holder, other));

              case 5:
                _context11.t1 = _context11.sent;
                (0, _context11.t0)(_context11.t1).to.equal(true);

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
    describe('balanceOf', function () {
      it('returns the amount of tokens owned by the given address', function _callee12() {
        var balance;
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return regeneratorRuntime.awrap(this.token.balanceOf(holder, firstTokenId));

              case 2:
                balance = _context12.sent;
                expect(balance).to.be.bignumber.equal(firstTokenAmount);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
    describe('isApprovedForAll', function () {
      it('returns the approval of the operator', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.t0 = expect;
                _context13.next = 3;
                return regeneratorRuntime.awrap(this.token.isApprovedForAll(holder, operator));

              case 3:
                _context13.t1 = _context13.sent;
                (0, _context13.t0)(_context13.t1).to.equal(true);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
    });
  });
});