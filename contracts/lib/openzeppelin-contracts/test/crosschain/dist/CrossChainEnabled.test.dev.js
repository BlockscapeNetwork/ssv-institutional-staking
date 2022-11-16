"use strict";

var _require = require('../helpers/crosschain'),
    BridgeHelper = _require.BridgeHelper;

var _require2 = require('../helpers/customError'),
    expectRevertCustomError = _require2.expectRevertCustomError;

function randomAddress() {
  return web3.utils.toChecksumAddress(web3.utils.randomHex(20));
}

var CrossChainEnabledAMBMock = artifacts.require('CrossChainEnabledAMBMock');

var CrossChainEnabledArbitrumL1Mock = artifacts.require('CrossChainEnabledArbitrumL1Mock');

var CrossChainEnabledArbitrumL2Mock = artifacts.require('CrossChainEnabledArbitrumL2Mock');

var CrossChainEnabledOptimismMock = artifacts.require('CrossChainEnabledOptimismMock');

var CrossChainEnabledPolygonChildMock = artifacts.require('CrossChainEnabledPolygonChildMock');

function shouldBehaveLikeReceiver() {
  var sender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : randomAddress();
  it('should reject same-chain calls', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(expectRevertCustomError(this.receiver.crossChainRestricted(), 'NotCrossChainCall()'));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(expectRevertCustomError(this.receiver.crossChainOwnerRestricted(), 'NotCrossChainCall()'));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  it('should restrict to cross-chain call from a invalid sender', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = regeneratorRuntime;
            _context2.t1 = expectRevertCustomError;
            _context2.t2 = this.bridge.call(sender, this.receiver, 'crossChainOwnerRestricted()');
            _context2.t3 = "InvalidCrossChainSender(\"".concat(sender, "\", \"");
            _context2.next = 6;
            return regeneratorRuntime.awrap(this.receiver.owner());

          case 6:
            _context2.t4 = _context2.sent;
            _context2.t5 = _context2.t3.concat.call(_context2.t3, _context2.t4, "\")");
            _context2.t6 = (0, _context2.t1)(_context2.t2, _context2.t5);
            _context2.next = 11;
            return _context2.t0.awrap.call(_context2.t0, _context2.t6);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('should grant access to cross-chain call from the owner', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = regeneratorRuntime;
            _context3.t1 = this.bridge;
            _context3.next = 4;
            return regeneratorRuntime.awrap(this.receiver.owner());

          case 4:
            _context3.t2 = _context3.sent;
            _context3.t3 = this.receiver;
            _context3.t4 = _context3.t1.call.call(_context3.t1, _context3.t2, _context3.t3, 'crossChainOwnerRestricted()');
            _context3.next = 9;
            return _context3.t0.awrap.call(_context3.t0, _context3.t4);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
}

contract('CrossChainEnabled', function () {
  describe('AMB', function () {
    beforeEach(function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(BridgeHelper.deploy('AMB'));

            case 2:
              this.bridge = _context4.sent;
              _context4.next = 5;
              return regeneratorRuntime.awrap(CrossChainEnabledAMBMock["new"](this.bridge.address));

            case 5:
              this.receiver = _context4.sent;

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeReceiver();
  });
  describe('Arbitrum-L1', function () {
    beforeEach(function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(BridgeHelper.deploy('Arbitrum-L1'));

            case 2:
              this.bridge = _context5.sent;
              _context5.next = 5;
              return regeneratorRuntime.awrap(CrossChainEnabledArbitrumL1Mock["new"](this.bridge.address));

            case 5:
              this.receiver = _context5.sent;

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeReceiver();
  });
  describe('Arbitrum-L2', function () {
    beforeEach(function _callee6() {
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(BridgeHelper.deploy('Arbitrum-L2'));

            case 2:
              this.bridge = _context6.sent;
              _context6.next = 5;
              return regeneratorRuntime.awrap(CrossChainEnabledArbitrumL2Mock["new"]());

            case 5:
              this.receiver = _context6.sent;

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeReceiver();
  });
  describe('Optimism', function () {
    beforeEach(function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(BridgeHelper.deploy('Optimism'));

            case 2:
              this.bridge = _context7.sent;
              _context7.next = 5;
              return regeneratorRuntime.awrap(CrossChainEnabledOptimismMock["new"](this.bridge.address));

            case 5:
              this.receiver = _context7.sent;

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeReceiver();
  });
  describe('Polygon-Child', function () {
    beforeEach(function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(BridgeHelper.deploy('Polygon-Child'));

            case 2:
              this.bridge = _context8.sent;
              _context8.next = 5;
              return regeneratorRuntime.awrap(CrossChainEnabledPolygonChildMock["new"](this.bridge.address));

            case 5:
              this.receiver = _context8.sent;

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    shouldBehaveLikeReceiver();
  });
});