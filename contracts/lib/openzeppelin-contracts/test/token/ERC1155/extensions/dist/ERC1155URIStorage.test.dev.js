"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectEvent = _require.expectEvent;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('hardhat'),
    artifacts = _require3.artifacts;

var ERC1155URIStorageMock = artifacts.require('ERC1155URIStorageMock');

contract(['ERC1155URIStorage'], function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      holder = _accounts[0];

  var erc1155Uri = 'https://token.com/nfts/';
  var baseUri = 'https://token.com/';
  var tokenId = new BN('1');
  var amount = new BN('3000');
  describe('with base uri set', function () {
    beforeEach(function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(ERC1155URIStorageMock["new"](erc1155Uri));

            case 2:
              this.token = _context.sent;
              this.token.setBaseURI(baseUri);
              _context.next = 6;
              return regeneratorRuntime.awrap(this.token.mint(holder, tokenId, amount, '0x'));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    it('can request the token uri, returning the erc1155 uri if no token uri was set', function _callee2() {
      var receivedTokenUri;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.uri(tokenId));

            case 2:
              receivedTokenUri = _context2.sent;
              expect(receivedTokenUri).to.be.equal(erc1155Uri);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('can request the token uri, returning the concatenated uri if a token uri was set', function _callee3() {
      var tokenUri, receipt, receivedTokenUri, expectedUri;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              tokenUri = '1234/';
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.token.setURI(tokenId, tokenUri));

            case 3:
              receipt = _context3.sent;
              _context3.next = 6;
              return regeneratorRuntime.awrap(this.token.uri(tokenId));

            case 6:
              receivedTokenUri = _context3.sent;
              expectedUri = "".concat(baseUri).concat(tokenUri);
              expect(receivedTokenUri).to.be.equal(expectedUri);
              expectEvent(receipt, 'URI', {
                value: expectedUri,
                id: tokenId
              });

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('with base uri set to the empty string', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(ERC1155URIStorageMock["new"](''));

            case 2:
              this.token = _context4.sent;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.token.mint(holder, tokenId, amount, '0x'));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('can request the token uri, returning an empty string if no token uri was set', function _callee5() {
      var receivedTokenUri;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.token.uri(tokenId));

            case 2:
              receivedTokenUri = _context5.sent;
              expect(receivedTokenUri).to.be.equal('');

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('can request the token uri, returning the token uri if a token uri was set', function _callee6() {
      var tokenUri, receipt, receivedTokenUri;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              tokenUri = 'ipfs://1234/';
              _context6.next = 3;
              return regeneratorRuntime.awrap(this.token.setURI(tokenId, tokenUri));

            case 3:
              receipt = _context6.sent;
              _context6.next = 6;
              return regeneratorRuntime.awrap(this.token.uri(tokenId));

            case 6:
              receivedTokenUri = _context6.sent;
              expect(receivedTokenUri).to.be.equal(tokenUri);
              expectEvent(receipt, 'URI', {
                value: tokenUri,
                id: tokenId
              });

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
});