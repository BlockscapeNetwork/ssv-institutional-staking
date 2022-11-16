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

var ERC721URIStorageMock = artifacts.require('ERC721URIStorageMock');

contract('ERC721URIStorage', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      owner = _accounts[0];

  var name = 'Non Fungible Token';
  var symbol = 'NFT';
  var firstTokenId = new BN('5042');
  var nonExistentTokenId = new BN('13');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC721URIStorageMock["new"](name, symbol));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('token URI', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.mint(owner, firstTokenId));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    var baseURI = 'https://api.example.com/v1/';
    var sampleUri = 'mock://mytoken';
    it('it is empty by default', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.equal('');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('reverts when queried for non existent token id', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.tokenURI(nonExistentTokenId), 'ERC721: invalid token ID'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('can be set for a token id', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.token.setTokenURI(firstTokenId, sampleUri));

            case 2:
              _context5.t0 = expect;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

            case 5:
              _context5.t1 = _context5.sent;
              _context5.t2 = sampleUri;
              (0, _context5.t0)(_context5.t1).to.be.equal(_context5.t2);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('reverts when setting for non existent token id', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.setTokenURI(nonExistentTokenId, sampleUri), 'ERC721URIStorage: URI set of nonexistent token'));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('base URI can be set', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.token.setBaseURI(baseURI));

            case 2:
              _context7.t0 = expect;
              _context7.next = 5;
              return regeneratorRuntime.awrap(this.token.baseURI());

            case 5:
              _context7.t1 = _context7.sent;
              _context7.t2 = baseURI;
              (0, _context7.t0)(_context7.t1).to.equal(_context7.t2);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('base URI is added as a prefix to the token URI', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.token.setBaseURI(baseURI));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.token.setTokenURI(firstTokenId, sampleUri));

            case 4:
              _context8.t0 = expect;
              _context8.next = 7;
              return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

            case 7:
              _context8.t1 = _context8.sent;
              _context8.t2 = baseURI + sampleUri;
              (0, _context8.t0)(_context8.t1).to.be.equal(_context8.t2);

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('token URI can be changed by changing the base URI', function _callee9() {
      var newBaseURI;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.token.setBaseURI(baseURI));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.token.setTokenURI(firstTokenId, sampleUri));

            case 4:
              newBaseURI = 'https://api.example.com/v2/';
              _context9.next = 7;
              return regeneratorRuntime.awrap(this.token.setBaseURI(newBaseURI));

            case 7:
              _context9.t0 = expect;
              _context9.next = 10;
              return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

            case 10:
              _context9.t1 = _context9.sent;
              _context9.t2 = newBaseURI + sampleUri;
              (0, _context9.t0)(_context9.t1).to.be.equal(_context9.t2);

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('tokenId is appended to base URI for tokens with no URI', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.token.setBaseURI(baseURI));

            case 2:
              _context10.t0 = expect;
              _context10.next = 5;
              return regeneratorRuntime.awrap(this.token.tokenURI(firstTokenId));

            case 5:
              _context10.t1 = _context10.sent;
              _context10.t2 = baseURI + firstTokenId;
              (0, _context10.t0)(_context10.t1).to.be.equal(_context10.t2);

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('tokens without URI can be burnt ', function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.token.burn(firstTokenId, {
                from: owner
              }));

            case 2:
              _context11.t0 = expect;
              _context11.next = 5;
              return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

            case 5:
              _context11.t1 = _context11.sent;
              (0, _context11.t0)(_context11.t1).to.equal(false);
              _context11.next = 9;
              return regeneratorRuntime.awrap(expectRevert(this.token.tokenURI(firstTokenId), 'ERC721: invalid token ID'));

            case 9:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    it('tokens with URI can be burnt ', function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.token.setTokenURI(firstTokenId, sampleUri));

            case 2:
              _context12.next = 4;
              return regeneratorRuntime.awrap(this.token.burn(firstTokenId, {
                from: owner
              }));

            case 4:
              _context12.t0 = expect;
              _context12.next = 7;
              return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

            case 7:
              _context12.t1 = _context12.sent;
              (0, _context12.t0)(_context12.t1).to.equal(false);
              _context12.next = 11;
              return regeneratorRuntime.awrap(expectRevert(this.token.tokenURI(firstTokenId), 'ERC721: invalid token ID'));

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
  });
});