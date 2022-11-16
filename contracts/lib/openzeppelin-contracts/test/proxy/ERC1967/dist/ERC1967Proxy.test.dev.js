"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var shouldBehaveLikeProxy = require('../Proxy.behaviour');

var ERC1967Proxy = artifacts.require('ERC1967Proxy');

contract('ERC1967Proxy', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      proxyAdminOwner = _accounts[0];

  var createProxy = function createProxy(implementation, _admin, initData, opts) {
    return regeneratorRuntime.async(function createProxy$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", ERC1967Proxy["new"](implementation, initData, opts));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  shouldBehaveLikeProxy(createProxy, undefined, proxyAdminOwner);
});