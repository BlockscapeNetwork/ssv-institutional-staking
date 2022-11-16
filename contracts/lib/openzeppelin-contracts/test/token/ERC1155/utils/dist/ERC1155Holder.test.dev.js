"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

var ERC1155Holder = artifacts.require('ERC1155Holder');

var ERC1155Mock = artifacts.require('ERC1155Mock');

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('../../../utils/introspection/SupportsInterface.behavior'),
    shouldSupportInterfaces = _require3.shouldSupportInterfaces;

contract('ERC1155Holder', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      creator = _accounts[0];

  var uri = 'https://token-cdn-domain/{id}.json';
  var multiTokenIds = [new BN(1), new BN(2), new BN(3)];
  var multiTokenAmounts = [new BN(1000), new BN(2000), new BN(3000)];
  var transferData = '0x12345678';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC1155Mock["new"](uri, {
              from: creator
            }));

          case 2:
            this.multiToken = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(ERC1155Holder["new"]());

          case 5:
            this.holder = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(this.multiToken.mintBatch(creator, multiTokenIds, multiTokenAmounts, '0x', {
              from: creator
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  shouldSupportInterfaces(['ERC165', 'ERC1155Receiver']);
  it('receives ERC1155 tokens from a single ID', function _callee2() {
    var i;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(this.multiToken.safeTransferFrom(creator, this.holder.address, multiTokenIds[0], multiTokenAmounts[0], transferData, {
              from: creator
            }));

          case 2:
            _context2.t0 = expect;
            _context2.next = 5;
            return regeneratorRuntime.awrap(this.multiToken.balanceOf(this.holder.address, multiTokenIds[0]));

          case 5:
            _context2.t1 = _context2.sent;
            _context2.t2 = multiTokenAmounts[0];
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);
            i = 1;

          case 9:
            if (!(i < multiTokenIds.length)) {
              _context2.next = 19;
              break;
            }

            _context2.t3 = expect;
            _context2.next = 13;
            return regeneratorRuntime.awrap(this.multiToken.balanceOf(this.holder.address, multiTokenIds[i]));

          case 13:
            _context2.t4 = _context2.sent;
            _context2.t5 = new BN(0);
            (0, _context2.t3)(_context2.t4).to.be.bignumber.equal(_context2.t5);

          case 16:
            i++;
            _context2.next = 9;
            break;

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('receives ERC1155 tokens from a multiple IDs', function _callee3() {
    var i, _i2;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < multiTokenIds.length)) {
              _context3.next = 11;
              break;
            }

            _context3.t0 = expect;
            _context3.next = 5;
            return regeneratorRuntime.awrap(this.multiToken.balanceOf(this.holder.address, multiTokenIds[i]));

          case 5:
            _context3.t1 = _context3.sent;
            _context3.t2 = new BN(0);
            (0, _context3.t0)(_context3.t1).to.be.bignumber.equal(_context3.t2);

          case 8:
            i++;
            _context3.next = 1;
            break;

          case 11:
            ;
            _context3.next = 14;
            return regeneratorRuntime.awrap(this.multiToken.safeBatchTransferFrom(creator, this.holder.address, multiTokenIds, multiTokenAmounts, transferData, {
              from: creator
            }));

          case 14:
            _i2 = 0;

          case 15:
            if (!(_i2 < multiTokenIds.length)) {
              _context3.next = 25;
              break;
            }

            _context3.t3 = expect;
            _context3.next = 19;
            return regeneratorRuntime.awrap(this.multiToken.balanceOf(this.holder.address, multiTokenIds[_i2]));

          case 19:
            _context3.t4 = _context3.sent;
            _context3.t5 = multiTokenAmounts[_i2];
            (0, _context3.t3)(_context3.t4).to.be.bignumber.equal(_context3.t5);

          case 22:
            _i2++;
            _context3.next = 15;
            break;

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
});