"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@nomicfoundation/hardhat-network-helpers'),
    time = _require.time;

var _require2 = require('@openzeppelin/test-helpers'),
    expectEvent = _require2.expectEvent;

var _require3 = require('chai'),
    expect = _require3.expect;

function releasedEvent(token, amount) {
  return token ? ['ERC20Released', {
    token: token.address,
    amount: amount
  }] : ['EtherReleased', {
    amount: amount
  }];
}

function shouldBehaveLikeVesting(beneficiary) {
  it('check vesting schedule', function _callee() {
    var _ref, _ref2, fnVestedAmount, fnReleasable, args, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _this$mock$methods, _this$mock$methods2, timestamp, vesting;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = this.token ? ['vestedAmount(address,uint64)', 'releasable(address)', this.token.address] : ['vestedAmount(uint64)', 'releasable()'], _ref2 = _toArray(_ref), fnVestedAmount = _ref2[0], fnReleasable = _ref2[1], args = _ref2.slice(2);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = this.schedule[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 26;
              break;
            }

            timestamp = _step.value;
            _context.next = 10;
            return regeneratorRuntime.awrap(time.increaseTo(timestamp));

          case 10:
            vesting = this.vestingFn(timestamp);
            _context.t0 = expect;
            _context.next = 14;
            return regeneratorRuntime.awrap((_this$mock$methods = this.mock.methods)[fnVestedAmount].apply(_this$mock$methods, _toConsumableArray(args).concat([timestamp])));

          case 14:
            _context.t1 = _context.sent;
            _context.t2 = vesting;
            (0, _context.t0)(_context.t1).to.be.bignumber.equal(_context.t2);
            _context.t3 = expect;
            _context.next = 20;
            return regeneratorRuntime.awrap((_this$mock$methods2 = this.mock.methods)[fnReleasable].apply(_this$mock$methods2, _toConsumableArray(args)));

          case 20:
            _context.t4 = _context.sent;
            _context.t5 = vesting;
            (0, _context.t3)(_context.t4).to.be.bignumber.equal(_context.t5);

          case 23:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 26:
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t6 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t6;

          case 32:
            _context.prev = 32;
            _context.prev = 33;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 35:
            _context.prev = 35;

            if (!_didIteratorError) {
              _context.next = 38;
              break;
            }

            throw _iteratorError;

          case 38:
            return _context.finish(35);

          case 39:
            return _context.finish(32);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, null, this, [[4, 28, 32, 40], [33,, 35, 39]]);
  });
  it('execute vesting schedule', function _callee2() {
    var _ref3, _ref4, fnRelease, args, released, before, _this$mock$methods3, receipt, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _this$mock$methods4, timestamp, vested, _receipt;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3 = this.token ? ['release(address)', this.token.address] : ['release()'], _ref4 = _toArray(_ref3), fnRelease = _ref4[0], args = _ref4.slice(1);
            released = web3.utils.toBN(0);
            _context2.next = 4;
            return regeneratorRuntime.awrap(this.getBalance(beneficiary));

          case 4:
            before = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap((_this$mock$methods3 = this.mock.methods)[fnRelease].apply(_this$mock$methods3, _toConsumableArray(args)));

          case 7:
            receipt = _context2.sent;
            _context2.next = 10;
            return regeneratorRuntime.awrap(expectEvent.inTransaction.apply(expectEvent, [receipt.tx, this.mock].concat(_toConsumableArray(releasedEvent(this.token, '0')))));

          case 10:
            _context2.next = 12;
            return regeneratorRuntime.awrap(this.checkRelease(receipt, beneficiary, '0'));

          case 12:
            _context2.t0 = expect;
            _context2.next = 15;
            return regeneratorRuntime.awrap(this.getBalance(beneficiary));

          case 15:
            _context2.t1 = _context2.sent;
            _context2.t2 = before;
            (0, _context2.t0)(_context2.t1).to.be.bignumber.equal(_context2.t2);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 21;
            _iterator2 = this.schedule[Symbol.iterator]();

          case 23:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 45;
              break;
            }

            timestamp = _step2.value;
            _context2.next = 27;
            return regeneratorRuntime.awrap(time.setNextBlockTimestamp(timestamp));

          case 27:
            vested = this.vestingFn(timestamp);
            _context2.next = 30;
            return regeneratorRuntime.awrap((_this$mock$methods4 = this.mock.methods)[fnRelease].apply(_this$mock$methods4, _toConsumableArray(args)));

          case 30:
            _receipt = _context2.sent;
            _context2.next = 33;
            return regeneratorRuntime.awrap(expectEvent.inTransaction.apply(expectEvent, [_receipt.tx, this.mock].concat(_toConsumableArray(releasedEvent(this.token, vested.sub(released))))));

          case 33:
            _context2.next = 35;
            return regeneratorRuntime.awrap(this.checkRelease(_receipt, beneficiary, vested.sub(released)));

          case 35:
            _context2.t3 = expect;
            _context2.next = 38;
            return regeneratorRuntime.awrap(this.getBalance(beneficiary));

          case 38:
            _context2.t4 = _context2.sent;
            _context2.t5 = before.add(vested);
            (0, _context2.t3)(_context2.t4).to.be.bignumber.equal(_context2.t5);
            released = vested;

          case 42:
            _iteratorNormalCompletion2 = true;
            _context2.next = 23;
            break;

          case 45:
            _context2.next = 51;
            break;

          case 47:
            _context2.prev = 47;
            _context2.t6 = _context2["catch"](21);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t6;

          case 51:
            _context2.prev = 51;
            _context2.prev = 52;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 54:
            _context2.prev = 54;

            if (!_didIteratorError2) {
              _context2.next = 57;
              break;
            }

            throw _iteratorError2;

          case 57:
            return _context2.finish(54);

          case 58:
            return _context2.finish(51);

          case 59:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this, [[21, 47, 51, 59], [52,, 54, 58]]);
  });
}

module.exports = {
  shouldBehaveLikeVesting: shouldBehaveLikeVesting
};