"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants;

var ERC721RoyaltyMock = artifacts.require('ERC721RoyaltyMock');

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require2 = require('../../common/ERC2981.behavior'),
    shouldBehaveLikeERC2981 = _require2.shouldBehaveLikeERC2981;

contract('ERC721Royalty', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      account1 = _accounts[0],
      account2 = _accounts[1];

  var tokenId1 = new BN('1');
  var tokenId2 = new BN('2');
  var royalty = new BN('200');
  var salePrice = new BN('1000');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC721RoyaltyMock["new"]('My Token', 'TKN'));

          case 2:
            this.token = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(this.token.mint(account1, tokenId1));

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(this.token.mint(account1, tokenId2));

          case 7:
            this.account1 = account1;
            this.account2 = account2;
            this.tokenId1 = tokenId1;
            this.tokenId2 = tokenId2;
            this.salePrice = salePrice;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('token specific functions', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.setTokenRoyalty(tokenId1, account1, royalty));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('removes royalty information after burn', function _callee3() {
      var tokenInfo;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.token.burn(tokenId1));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(tokenId1, salePrice));

            case 4:
              tokenInfo = _context3.sent;
              expect(tokenInfo[0]).to.be.equal(ZERO_ADDRESS);
              expect(tokenInfo[1]).to.be.bignumber.equal(new BN('0'));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  shouldBehaveLikeERC2981();
});