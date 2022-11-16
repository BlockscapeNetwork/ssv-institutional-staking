"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('../helpers/crosschain'),
    BridgeHelper = _require2.BridgeHelper;

var _require3 = require('./AccessControl.behavior.js'),
    shouldBehaveLikeAccessControl = _require3.shouldBehaveLikeAccessControl;

var crossChainRoleAlias = function crossChainRoleAlias(role) {
  return web3.utils.leftPad(web3.utils.toHex(web3.utils.toBN(role).xor(web3.utils.toBN(web3.utils.soliditySha3('CROSSCHAIN_ALIAS')))), 64);
};

var AccessControlCrossChainMock = artifacts.require('AccessControlCrossChainMock');

var ROLE = web3.utils.soliditySha3('ROLE');
contract('AccessControl', function (accounts) {
  before(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(BridgeHelper.deploy());

          case 2:
            this.bridge = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  beforeEach(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(AccessControlCrossChainMock["new"]({
              from: accounts[0]
            }));

          case 2:
            this.accessControl = _context2.sent;

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  shouldBehaveLikeAccessControl.apply(void 0, ['AccessControl'].concat(_toConsumableArray(accounts)));
  describe('CrossChain enabled', function () {
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(ROLE, accounts[0], {
                from: accounts[0]
              }));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.accessControl.grantRole(crossChainRoleAlias(ROLE), accounts[1], {
                from: accounts[0]
              }));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('check alliassing', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = expect;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.accessControl.crossChainRoleAlias(ROLE));

            case 3:
              _context4.t1 = _context4.sent;
              _context4.t2 = crossChainRoleAlias(ROLE);
              (0, _context4.t0)(_context4.t1).to.be.bignumber.equal(_context4.t2);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('Crosschain calls not authorized to non-aliased addresses', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.bridge.call(accounts[0], this.accessControl, 'senderProtected', [ROLE]), "AccessControl: account ".concat(accounts[0].toLowerCase(), " is missing role ").concat(crossChainRoleAlias(ROLE))));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('Crosschain calls not authorized to non-aliased addresses', function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.bridge.call(accounts[1], this.accessControl, 'senderProtected', [ROLE]));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
});