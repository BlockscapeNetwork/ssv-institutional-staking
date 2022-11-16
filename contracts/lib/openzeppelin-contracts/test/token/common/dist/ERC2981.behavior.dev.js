"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    constants = _require.constants,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var ZERO_ADDRESS = constants.ZERO_ADDRESS;

var _require3 = require('../../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require3.shouldSupportInterfaces;

function shouldBehaveLikeERC2981() {
  var royaltyFraction = new BN('10');
  shouldSupportInterfaces(['ERC2981']);
  describe('default royalty', function () {
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.token.setDefaultRoyalty(this.account1, royaltyFraction));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    it('checks royalty is set', function _callee2() {
      var royalty, initInfo;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              royalty = new BN(this.salePrice * royaltyFraction / 10000);
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 3:
              initInfo = _context2.sent;
              expect(initInfo[0]).to.be.equal(this.account1);
              expect(initInfo[1]).to.be.bignumber.equal(royalty);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('updates royalty amount', function _callee3() {
      var newPercentage, royalty, newInfo;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              newPercentage = new BN('25'); // Updated royalty check

              _context3.next = 3;
              return regeneratorRuntime.awrap(this.token.setDefaultRoyalty(this.account1, newPercentage));

            case 3:
              royalty = new BN(this.salePrice * newPercentage / 10000);
              _context3.next = 6;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 6:
              newInfo = _context3.sent;
              expect(newInfo[0]).to.be.equal(this.account1);
              expect(newInfo[1]).to.be.bignumber.equal(royalty);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('holds same royalty value for different tokens', function _callee4() {
      var newPercentage, token1Info, token2Info;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newPercentage = new BN('20');
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.token.setDefaultRoyalty(this.account1, newPercentage));

            case 3:
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 5:
              token1Info = _context4.sent;
              _context4.next = 8;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId2, this.salePrice));

            case 8:
              token2Info = _context4.sent;
              expect(token1Info[1]).to.be.bignumber.equal(token2Info[1]);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('Remove royalty information', function _callee5() {
      var newValue, token1Info, token2Info;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              newValue = new BN('0');
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.token.deleteDefaultRoyalty());

            case 3:
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 5:
              token1Info = _context5.sent;
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId2, this.salePrice));

            case 8:
              token2Info = _context5.sent;
              // Test royalty info is still persistent across all tokens
              expect(token1Info[0]).to.be.bignumber.equal(token2Info[0]);
              expect(token1Info[1]).to.be.bignumber.equal(token2Info[1]); // Test information was deleted

              expect(token1Info[0]).to.be.equal(ZERO_ADDRESS);
              expect(token1Info[1]).to.be.bignumber.equal(newValue);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('reverts if invalid parameters', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.setDefaultRoyalty(ZERO_ADDRESS, royaltyFraction), 'ERC2981: invalid receiver'));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.token.setDefaultRoyalty(this.account1, new BN('11000')), 'ERC2981: royalty fee will exceed salePrice'));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
  describe('token based royalty', function () {
    beforeEach(function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.token.setTokenRoyalty(this.tokenId1, this.account1, royaltyFraction));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('updates royalty amount', function _callee8() {
      var newPercentage, royalty, initInfo, newInfo;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              newPercentage = new BN('25');
              royalty = new BN(this.salePrice * royaltyFraction / 10000); // Initial royalty check

              _context8.next = 4;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 4:
              initInfo = _context8.sent;
              expect(initInfo[0]).to.be.equal(this.account1);
              expect(initInfo[1]).to.be.bignumber.equal(royalty); // Updated royalty check

              _context8.next = 9;
              return regeneratorRuntime.awrap(this.token.setTokenRoyalty(this.tokenId1, this.account1, newPercentage));

            case 9:
              royalty = new BN(this.salePrice * newPercentage / 10000);
              _context8.next = 12;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 12:
              newInfo = _context8.sent;
              expect(newInfo[0]).to.be.equal(this.account1);
              expect(newInfo[1]).to.be.bignumber.equal(royalty);

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('holds different values for different tokens', function _callee9() {
      var newPercentage, token1Info, token2Info;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              newPercentage = new BN('20');
              _context9.next = 3;
              return regeneratorRuntime.awrap(this.token.setTokenRoyalty(this.tokenId2, this.account1, newPercentage));

            case 3:
              _context9.next = 5;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 5:
              token1Info = _context9.sent;
              _context9.next = 8;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId2, this.salePrice));

            case 8:
              token2Info = _context9.sent;
              // must be different even at the same this.salePrice
              expect(token1Info[1]).to.not.be.equal(token2Info.royaltyFraction);

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('reverts if invalid parameters', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.setTokenRoyalty(this.tokenId1, ZERO_ADDRESS, royaltyFraction), 'ERC2981: Invalid parameters'));

            case 2:
              _context10.next = 4;
              return regeneratorRuntime.awrap(expectRevert(this.token.setTokenRoyalty(this.tokenId1, this.account1, new BN('11000')), 'ERC2981: royalty fee will exceed salePrice'));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('can reset token after setting royalty', function _callee11() {
      var newPercentage, royalty, tokenInfo, result;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              newPercentage = new BN('30');
              royalty = new BN(this.salePrice * newPercentage / 10000);
              _context11.next = 4;
              return regeneratorRuntime.awrap(this.token.setTokenRoyalty(this.tokenId1, this.account2, newPercentage));

            case 4:
              _context11.next = 6;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 6:
              tokenInfo = _context11.sent;
              // Tokens must have own information
              expect(tokenInfo[1]).to.be.bignumber.equal(royalty);
              expect(tokenInfo[0]).to.be.equal(this.account2);
              _context11.next = 11;
              return regeneratorRuntime.awrap(this.token.setTokenRoyalty(this.tokenId2, this.account1, new BN('0')));

            case 11:
              _context11.next = 13;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId2, this.salePrice));

            case 13:
              result = _context11.sent;
              // Token must not share default information
              expect(result[0]).to.be.equal(this.account1);
              expect(result[1]).to.be.bignumber.equal(new BN('0'));

            case 16:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    it('can hold default and token royalty information', function _callee12() {
      var newPercentage, royalty, token1Info, token2Info;
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              newPercentage = new BN('30');
              royalty = new BN(this.salePrice * newPercentage / 10000);
              _context12.next = 4;
              return regeneratorRuntime.awrap(this.token.setTokenRoyalty(this.tokenId2, this.account2, newPercentage));

            case 4:
              _context12.next = 6;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId1, this.salePrice));

            case 6:
              token1Info = _context12.sent;
              _context12.next = 9;
              return regeneratorRuntime.awrap(this.token.royaltyInfo(this.tokenId2, this.salePrice));

            case 9:
              token2Info = _context12.sent;
              // Tokens must not have same values
              expect(token1Info[1]).to.not.be.bignumber.equal(token2Info[1]);
              expect(token1Info[0]).to.not.be.equal(token2Info[0]); // Updated token must have new values

              expect(token2Info[0]).to.be.equal(this.account2);
              expect(token2Info[1]).to.be.bignumber.equal(royalty);

            case 14:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
  });
}

module.exports = {
  shouldBehaveLikeERC2981: shouldBehaveLikeERC2981
};