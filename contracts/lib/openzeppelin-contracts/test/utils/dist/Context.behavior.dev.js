"use strict";

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectEvent = _require.expectEvent;

var ContextMock = artifacts.require('ContextMock');

function shouldBehaveLikeRegularContext(sender) {
  describe('msgSender', function () {
    it('returns the transaction sender when called from an EOA', function _callee() {
      var receipt;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.context.msgSender({
                from: sender
              }));

            case 2:
              receipt = _context.sent;
              expectEvent(receipt, 'Sender', {
                sender: sender
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    it('returns the transaction sender when from another contract', function _callee2() {
      var _ref, tx;

      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.caller.callSender(this.context.address, {
                from: sender
              }));

            case 2:
              _ref = _context2.sent;
              tx = _ref.tx;
              _context2.next = 6;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, ContextMock, 'Sender', {
                sender: this.caller.address
              }));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
  });
  describe('msgData', function () {
    var integerValue = new BN('42');
    var stringValue = 'OpenZeppelin';
    var callData;
    beforeEach(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              callData = this.context.contract.methods.msgData(integerValue.toString(), stringValue).encodeABI();

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('returns the transaction data when called from an EOA', function _callee4() {
      var receipt;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.context.msgData(integerValue, stringValue));

            case 2:
              receipt = _context4.sent;
              expectEvent(receipt, 'Data', {
                data: callData,
                integerValue: integerValue,
                stringValue: stringValue
              });

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('returns the transaction sender when from another contract', function _callee5() {
      var _ref2, tx;

      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.caller.callData(this.context.address, integerValue, stringValue));

            case 2:
              _ref2 = _context5.sent;
              tx = _ref2.tx;
              _context5.next = 6;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(tx, ContextMock, 'Data', {
                data: callData,
                integerValue: integerValue,
                stringValue: stringValue
              }));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
}

module.exports = {
  shouldBehaveLikeRegularContext: shouldBehaveLikeRegularContext
};