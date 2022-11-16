"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var shouldBehaveLikeProxy = require('../Proxy.behaviour');

var shouldBehaveLikeTransparentUpgradeableProxy = require('./TransparentUpgradeableProxy.behaviour');

var TransparentUpgradeableProxy = artifacts.require('TransparentUpgradeableProxy');

contract('TransparentUpgradeableProxy', function (accounts) {
  var _accounts = _slicedToArray(accounts, 2),
      proxyAdminAddress = _accounts[0],
      proxyAdminOwner = _accounts[1];

  var createProxy = function createProxy(logic, admin, initData, opts) {
    return regeneratorRuntime.async(function createProxy$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", TransparentUpgradeableProxy["new"](logic, admin, initData, opts));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  shouldBehaveLikeProxy(createProxy, proxyAdminAddress, proxyAdminOwner);
  shouldBehaveLikeTransparentUpgradeableProxy(createProxy, accounts);
});