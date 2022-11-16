"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

function shouldBehaveLikeERC20Capped(minter, _ref, cap) {
  var _ref2 = _slicedToArray(_ref, 1),
      other = _ref2[0];

  describe('capped token', function () {
    var from = minter;
    it('starts with the correct cap', function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = expect;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.token.cap());

            case 3:
              _context.t1 = _context.sent;
              _context.t2 = cap;
              (0, _context.t0)(_context.t1).to.be.bignumber.equal(_context.t2);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    it('mints when amount is less than cap', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(other, cap.subn(1), {
                from: from
              }));

            case 2:
              _context2.t0 = expect;
              _context2.next = 5;
              return regeneratorRuntime.awrap(this.token.totalSupply());

            case 5:
              _context2.t1 = _context2.sent;
              _context2.t2 = cap.subn(1);
              (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('fails to mint if the amount exceeds the cap', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(other, cap.subn(1), {
                from: from
              }));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(other, 2, {
                from: from
              }), 'ERC20Capped: cap exceeded'));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('fails to mint after cap is reached', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(other, cap, {
                from: from
              }));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.token.mint(other, 1, {
                from: from
              }), 'ERC20Capped: cap exceeded'));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
}

module.exports = {
  shouldBehaveLikeERC20Capped: shouldBehaveLikeERC20Capped
};