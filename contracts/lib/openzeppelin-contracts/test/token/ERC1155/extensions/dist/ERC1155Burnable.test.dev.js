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

var ERC1155BurnableMock = artifacts.require('ERC1155BurnableMock');

contract('ERC1155Burnable', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      holder = _accounts[0],
      operator = _accounts[1],
      other = _accounts[2];

  var uri = 'https://token.com';
  var tokenIds = [new BN('42'), new BN('1137')];
  var amounts = [new BN('3000'), new BN('9902')];
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC1155BurnableMock["new"](uri));

          case 2:
            this.token = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(this.token.mint(holder, tokenIds[0], amounts[0], '0x'));

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(this.token.mint(holder, tokenIds[1], amounts[1], '0x'));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('burn', function () {
    it('holder can burn their tokens', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.burn(holder, tokenIds[0], amounts[0].subn(1), {
                from: holder
              }));

            case 2:
              _context2.t0 = expect;
              _context2.next = 5;
              return regeneratorRuntime.awrap(this.token.balanceOf(holder, tokenIds[0]));

            case 5:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.be.bignumber.equal('1');

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('approved operators can burn the holder\'s tokens', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                from: holder
              }));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.token.burn(holder, tokenIds[0], amounts[0].subn(1), {
                from: operator
              }));

            case 4:
              _context3.t0 = expect;
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.token.balanceOf(holder, tokenIds[0]));

            case 7:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('1');

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('unapproved accounts cannot burn the holder\'s tokens', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burn(holder, tokenIds[0], amounts[0].subn(1), {
                from: other
              }), 'ERC1155: caller is not token owner or approved'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
  describe('burnBatch', function () {
    it('holder can burn their tokens', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.token.burnBatch(holder, tokenIds, [amounts[0].subn(1), amounts[1].subn(2)], {
                from: holder
              }));

            case 2:
              _context5.t0 = expect;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.token.balanceOf(holder, tokenIds[0]));

            case 5:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1).to.be.bignumber.equal('1');
              _context5.t2 = expect;
              _context5.next = 10;
              return regeneratorRuntime.awrap(this.token.balanceOf(holder, tokenIds[1]));

            case 10:
              _context5.t3 = _context5.sent;
              (0, _context5.t2)(_context5.t3).to.be.bignumber.equal('2');

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('approved operators can burn the holder\'s tokens', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.token.setApprovalForAll(operator, true, {
                from: holder
              }));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.token.burnBatch(holder, tokenIds, [amounts[0].subn(1), amounts[1].subn(2)], {
                from: operator
              }));

            case 4:
              _context6.t0 = expect;
              _context6.next = 7;
              return regeneratorRuntime.awrap(this.token.balanceOf(holder, tokenIds[0]));

            case 7:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.be.bignumber.equal('1');
              _context6.t2 = expect;
              _context6.next = 12;
              return regeneratorRuntime.awrap(this.token.balanceOf(holder, tokenIds[1]));

            case 12:
              _context6.t3 = _context6.sent;
              (0, _context6.t2)(_context6.t3).to.be.bignumber.equal('2');

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('unapproved accounts cannot burn the holder\'s tokens', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.burnBatch(holder, tokenIds, [amounts[0].subn(1), amounts[1].subn(2)], {
                from: other
              }), 'ERC1155: caller is not token owner or approved'));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
  });
});