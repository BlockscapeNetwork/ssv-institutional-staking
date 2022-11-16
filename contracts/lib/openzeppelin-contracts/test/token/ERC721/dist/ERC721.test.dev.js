"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('./ERC721.behavior'),
    shouldBehaveLikeERC721 = _require.shouldBehaveLikeERC721,
    shouldBehaveLikeERC721Metadata = _require.shouldBehaveLikeERC721Metadata;

var ERC721Mock = artifacts.require('ERC721Mock');

contract('ERC721', function (accounts) {
  var name = 'Non Fungible Token';
  var symbol = 'NFT';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC721Mock["new"](name, symbol));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldBehaveLikeERC721.apply(void 0, ['ERC721'].concat(_toConsumableArray(accounts)));
  shouldBehaveLikeERC721Metadata.apply(void 0, ['ERC721', name, symbol].concat(_toConsumableArray(accounts)));
});