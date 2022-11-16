"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('util'),
    promisify = _require.promisify;

var BridgeAMBMock = artifacts.require('BridgeAMBMock');

var BridgeArbitrumL1Mock = artifacts.require('BridgeArbitrumL1Mock');

var BridgeArbitrumL2Mock = artifacts.require('BridgeArbitrumL2Mock');

var BridgeOptimismMock = artifacts.require('BridgeOptimismMock');

var BridgePolygonChildMock = artifacts.require('BridgePolygonChildMock');

var BridgeHelper =
/*#__PURE__*/
function () {
  _createClass(BridgeHelper, null, [{
    key: "deploy",
    value: function deploy(type) {
      return regeneratorRuntime.async(function deploy$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = BridgeHelper;
              _context.next = 3;
              return regeneratorRuntime.awrap(deployBridge(type));

            case 3:
              _context.t1 = _context.sent;
              return _context.abrupt("return", new _context.t0(_context.t1));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  function BridgeHelper(bridge) {
    _classCallCheck(this, BridgeHelper);

    this.bridge = bridge;
    this.address = bridge.address;
  }

  _createClass(BridgeHelper, [{
    key: "call",
    value: function call(from, target) {
      var _target$contract$meth;

      var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      return this.bridge.relayAs(target.address || target, selector ? (_target$contract$meth = target.contract.methods)[selector].apply(_target$contract$meth, _toConsumableArray(args)).encodeABI() : '0x', from);
    }
  }]);

  return BridgeHelper;
}();

function deployBridge() {
  var type,
      instance,
      code,
      _args2 = arguments;
  return regeneratorRuntime.async(function deployBridge$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          type = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 'Arbitrum-L2';
          _context2.t0 = type;
          _context2.next = _context2.t0 === 'AMB' ? 4 : _context2.t0 === 'Arbitrum-L1' ? 5 : _context2.t0 === 'Arbitrum-L2' ? 6 : _context2.t0 === 'Optimism' ? 15 : _context2.t0 === 'Polygon-Child' ? 16 : 17;
          break;

        case 4:
          return _context2.abrupt("return", BridgeAMBMock["new"]());

        case 5:
          return _context2.abrupt("return", BridgeArbitrumL1Mock["new"]());

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(BridgeArbitrumL2Mock["new"]());

        case 8:
          instance = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(web3.eth.getCode(instance.address));

        case 11:
          code = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(promisify(web3.currentProvider.send.bind(web3.currentProvider))({
            jsonrpc: '2.0',
            method: 'hardhat_setCode',
            params: ['0x0000000000000000000000000000000000000064', code],
            id: new Date().getTime()
          }));

        case 14:
          return _context2.abrupt("return", BridgeArbitrumL2Mock.at('0x0000000000000000000000000000000000000064'));

        case 15:
          return _context2.abrupt("return", BridgeOptimismMock["new"]());

        case 16:
          return _context2.abrupt("return", BridgePolygonChildMock["new"]());

        case 17:
          throw new Error("CrossChain: ".concat(type, " is not supported"));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  BridgeHelper: BridgeHelper
};