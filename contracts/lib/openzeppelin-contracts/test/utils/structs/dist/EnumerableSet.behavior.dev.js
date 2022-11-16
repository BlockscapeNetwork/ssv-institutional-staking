"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

function shouldBehaveLikeSet(valueA, valueB, valueC) {
  function expectMembersMatch(set, values) {
    var contains, length, indexedValues, returnedValues;
    return regeneratorRuntime.async(function expectMembersMatch$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Promise.all(values.map(function (value) {
              return set.contains(value);
            })));

          case 2:
            contains = _context.sent;
            expect(contains.every(Boolean)).to.be.equal(true);
            _context.next = 6;
            return regeneratorRuntime.awrap(set.length());

          case 6:
            length = _context.sent;
            expect(length).to.bignumber.equal(values.length.toString()); // To compare values we convert to strings to workaround Chai
            // limitations when dealing with nested arrays (required for BNs)

            _context.next = 10;
            return regeneratorRuntime.awrap(Promise.all(Array(values.length).fill().map(function (_, index) {
              return set.at(index);
            })));

          case 10:
            indexedValues = _context.sent;
            expect(indexedValues.map(function (v) {
              return v.toString();
            })).to.have.same.members(values.map(function (v) {
              return v.toString();
            }));
            _context.next = 14;
            return regeneratorRuntime.awrap(set.values());

          case 14:
            returnedValues = _context.sent;
            expect(returnedValues.map(function (v) {
              return v.toString();
            })).to.have.same.members(values.map(function (v) {
              return v.toString();
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  it('starts empty', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.set.contains(valueA));

          case 3:
            _context2.t1 = _context2.sent;
            (0, _context2.t0)(_context2.t1).to.equal(false);
            _context2.next = 7;
            return regeneratorRuntime.awrap(expectMembersMatch(this.set, []));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  describe('add', function () {
    it('adds a value', function _callee2() {
      var receipt;
      return regeneratorRuntime.async(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 2:
              receipt = _context3.sent;
              expectEvent(receipt, 'OperationResult', {
                result: true
              });
              _context3.next = 6;
              return regeneratorRuntime.awrap(expectMembersMatch(this.set, [valueA]));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('adds several values', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 2:
              _context4.next = 4;
              return regeneratorRuntime.awrap(this.set.add(valueB));

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(expectMembersMatch(this.set, [valueA, valueB]));

            case 6:
              _context4.t0 = expect;
              _context4.next = 9;
              return regeneratorRuntime.awrap(this.set.contains(valueC));

            case 9:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal(false);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('returns false when adding values already in the set', function _callee4() {
      var receipt;
      return regeneratorRuntime.async(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 2:
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 4:
              receipt = _context5.sent;
              expectEvent(receipt, 'OperationResult', {
                result: false
              });
              _context5.next = 8;
              return regeneratorRuntime.awrap(expectMembersMatch(this.set, [valueA]));

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
  });
  describe('at', function () {
    it('reverts when retrieving non-existent elements', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(expectRevert.unspecified(this.set.at(0)));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
  });
  describe('remove', function () {
    it('removes added values', function _callee6() {
      var receipt;
      return regeneratorRuntime.async(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.set.remove(valueA));

            case 4:
              receipt = _context7.sent;
              expectEvent(receipt, 'OperationResult', {
                result: true
              });
              _context7.t0 = expect;
              _context7.next = 9;
              return regeneratorRuntime.awrap(this.set.contains(valueA));

            case 9:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1).to.equal(false);
              _context7.next = 13;
              return regeneratorRuntime.awrap(expectMembersMatch(this.set, []));

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('returns false when removing values not in the set', function _callee7() {
      var receipt;
      return regeneratorRuntime.async(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.set.remove(valueA));

            case 2:
              receipt = _context8.sent;
              expectEvent(receipt, 'OperationResult', {
                result: false
              });
              _context8.t0 = expect;
              _context8.next = 7;
              return regeneratorRuntime.awrap(this.set.contains(valueA));

            case 7:
              _context8.t1 = _context8.sent;
              (0, _context8.t0)(_context8.t1).to.equal(false);

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('adds and removes multiple values', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.set.add(valueC));

            case 4:
              _context9.next = 6;
              return regeneratorRuntime.awrap(this.set.remove(valueA));

            case 6:
              _context9.next = 8;
              return regeneratorRuntime.awrap(this.set.remove(valueB));

            case 8:
              _context9.next = 10;
              return regeneratorRuntime.awrap(this.set.add(valueB));

            case 10:
              _context9.next = 12;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 12:
              _context9.next = 14;
              return regeneratorRuntime.awrap(this.set.remove(valueC));

            case 14:
              _context9.next = 16;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 16:
              _context9.next = 18;
              return regeneratorRuntime.awrap(this.set.add(valueB));

            case 18:
              _context9.next = 20;
              return regeneratorRuntime.awrap(this.set.add(valueC));

            case 20:
              _context9.next = 22;
              return regeneratorRuntime.awrap(this.set.remove(valueA));

            case 22:
              _context9.next = 24;
              return regeneratorRuntime.awrap(this.set.add(valueA));

            case 24:
              _context9.next = 26;
              return regeneratorRuntime.awrap(this.set.remove(valueB));

            case 26:
              _context9.next = 28;
              return regeneratorRuntime.awrap(expectMembersMatch(this.set, [valueA, valueC]));

            case 28:
              _context9.t0 = expect;
              _context9.next = 31;
              return regeneratorRuntime.awrap(this.set.contains(valueB));

            case 31:
              _context9.t1 = _context9.sent;
              (0, _context9.t0)(_context9.t1).to.equal(false);

            case 33:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
  });
}

module.exports = {
  shouldBehaveLikeSet: shouldBehaveLikeSet
};