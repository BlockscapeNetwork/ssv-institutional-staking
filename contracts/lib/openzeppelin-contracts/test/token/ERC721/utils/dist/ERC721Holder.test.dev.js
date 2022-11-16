"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC721Holder = artifacts.require('ERC721Holder');

var ERC721Mock = artifacts.require('ERC721Mock');

contract('ERC721Holder', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      owner = _accounts[0];

  var name = 'Non Fungible Token';
  var symbol = 'NFT';
  it('receives an ERC721 token', function _callee() {
    var token, tokenId, receiver;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC721Mock["new"](name, symbol));

          case 2:
            token = _context.sent;
            tokenId = new BN(1);
            _context.next = 6;
            return regeneratorRuntime.awrap(token.mint(owner, tokenId));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(ERC721Holder["new"]());

          case 8:
            receiver = _context.sent;
            _context.next = 11;
            return regeneratorRuntime.awrap(token.safeTransferFrom(owner, receiver.address, tokenId, {
              from: owner
            }));

          case 11:
            _context.t0 = expect;
            _context.next = 14;
            return regeneratorRuntime.awrap(token.ownerOf(tokenId));

          case 14:
            _context.t1 = _context.sent;
            _context.t2 = receiver.address;
            (0, _context.t0)(_context.t1).to.be.equal(_context.t2);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});