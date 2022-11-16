"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var zip = require('lodash.zip');

function shouldBehaveLikeMap(keys, values, zeroValue) {
  var _keys = _slicedToArray(keys, 3),
      keyA = _keys[0],
      keyB = _keys[1],
      keyC = _keys[2];

  var _values = _slicedToArray(values, 3),
      valueA = _values[0],
      valueB = _values[1],
      valueC = _values[2];

  function expectMembersMatch(map, keys, values) {
    return regeneratorRuntime.async(function expectMembersMatch$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            expect(keys.length).to.equal(values.length);
            _context3.next = 3;
            return regeneratorRuntime.awrap(Promise.all(keys.map(function _callee(key) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.t0 = expect;
                      _context.next = 3;
                      return regeneratorRuntime.awrap(map.contains(key));

                    case 3:
                      _context.t1 = _context.sent;
                      return _context.abrupt("return", (0, _context.t0)(_context.t1).to.equal(true));

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            })));

          case 3:
            _context3.t0 = expect;
            _context3.next = 6;
            return regeneratorRuntime.awrap(map.length());

          case 6:
            _context3.t1 = _context3.sent;
            _context3.t2 = keys.length.toString();
            (0, _context3.t0)(_context3.t1).to.bignumber.equal(_context3.t2);
            _context3.t3 = expect;
            _context3.next = 12;
            return regeneratorRuntime.awrap(Promise.all(keys.map(function (key) {
              return map.get(key);
            })));

          case 12:
            _context3.t4 = function (k) {
              return k.toString();
            };

            _context3.t5 = _context3.sent.map(_context3.t4);
            _context3.t6 = values.map(function (value) {
              return value.toString();
            });
            (0, _context3.t3)(_context3.t5).to.have.same.members(_context3.t6);
            _context3.t7 = expect;
            _context3.next = 19;
            return regeneratorRuntime.awrap(Promise.all(_toConsumableArray(Array(keys.length).keys()).map(function _callee2(index) {
              var entry;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(map.at(index));

                    case 2:
                      entry = _context2.sent;
                      return _context2.abrupt("return", [entry.key.toString(), entry.value.toString()]);

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            })));

          case 19:
            _context3.t8 = _context3.sent;
            _context3.t9 = zip(keys.map(function (k) {
              return k.toString();
            }), values.map(function (v) {
              return v.toString();
            }));
            (0, _context3.t7)(_context3.t8).to.have.same.deep.members(_context3.t9);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  it('starts empty', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = expect;
            _context4.next = 3;
            return regeneratorRuntime.awrap(this.map.contains(keyA));

          case 3:
            _context4.t1 = _context4.sent;
            (0, _context4.t0)(_context4.t1).to.equal(false);
            _context4.next = 7;
            return regeneratorRuntime.awrap(expectMembersMatch(this.map, [], []));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  describe('set', function () {
    it('adds a key', function _callee4() {
      var receipt;
      return regeneratorRuntime.async(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 2:
              receipt = _context5.sent;
              expectEvent(receipt, 'OperationResult', {
                result: true
              });
              _context5.next = 6;
              return regeneratorRuntime.awrap(expectMembersMatch(this.map, [keyA], [valueA]));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('adds several keys', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 2:
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.map.set(keyB, valueB));

            case 4:
              _context6.next = 6;
              return regeneratorRuntime.awrap(expectMembersMatch(this.map, [keyA, keyB], [valueA, valueB]));

            case 6:
              _context6.t0 = expect;
              _context6.next = 9;
              return regeneratorRuntime.awrap(this.map.contains(keyC));

            case 9:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.equal(false);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('returns false when adding keys already in the set', function _callee6() {
      var receipt;
      return regeneratorRuntime.async(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 2:
              _context7.next = 4;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 4:
              receipt = _context7.sent;
              expectEvent(receipt, 'OperationResult', {
                result: false
              });
              _context7.next = 8;
              return regeneratorRuntime.awrap(expectMembersMatch(this.map, [keyA], [valueA]));

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('updates values for keys already in the set', function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 2:
              _context8.next = 4;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueB));

            case 4:
              _context8.next = 6;
              return regeneratorRuntime.awrap(expectMembersMatch(this.map, [keyA], [valueB]));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
  });
  describe('remove', function () {
    it('removes added keys', function _callee8() {
      var receipt;
      return regeneratorRuntime.async(function _callee8$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 2:
              _context9.next = 4;
              return regeneratorRuntime.awrap(this.map.remove(keyA));

            case 4:
              receipt = _context9.sent;
              expectEvent(receipt, 'OperationResult', {
                result: true
              });
              _context9.t0 = expect;
              _context9.next = 9;
              return regeneratorRuntime.awrap(this.map.contains(keyA));

            case 9:
              _context9.t1 = _context9.sent;
              (0, _context9.t0)(_context9.t1).to.equal(false);
              _context9.next = 13;
              return regeneratorRuntime.awrap(expectMembersMatch(this.map, [], []));

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('returns false when removing keys not in the set', function _callee9() {
      var receipt;
      return regeneratorRuntime.async(function _callee9$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.map.remove(keyA));

            case 2:
              receipt = _context10.sent;
              expectEvent(receipt, 'OperationResult', {
                result: false
              });
              _context10.t0 = expect;
              _context10.next = 7;
              return regeneratorRuntime.awrap(this.map.contains(keyA));

            case 7:
              _context10.t1 = _context10.sent;
              (0, _context10.t0)(_context10.t1).to.equal(false);

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('adds and removes multiple keys', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 2:
              _context11.next = 4;
              return regeneratorRuntime.awrap(this.map.set(keyC, valueC));

            case 4:
              _context11.next = 6;
              return regeneratorRuntime.awrap(this.map.remove(keyA));

            case 6:
              _context11.next = 8;
              return regeneratorRuntime.awrap(this.map.remove(keyB));

            case 8:
              _context11.next = 10;
              return regeneratorRuntime.awrap(this.map.set(keyB, valueB));

            case 10:
              _context11.next = 12;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 12:
              _context11.next = 14;
              return regeneratorRuntime.awrap(this.map.remove(keyC));

            case 14:
              _context11.next = 16;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 16:
              _context11.next = 18;
              return regeneratorRuntime.awrap(this.map.set(keyB, valueB));

            case 18:
              _context11.next = 20;
              return regeneratorRuntime.awrap(this.map.set(keyC, valueC));

            case 20:
              _context11.next = 22;
              return regeneratorRuntime.awrap(this.map.remove(keyA));

            case 22:
              _context11.next = 24;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 24:
              _context11.next = 26;
              return regeneratorRuntime.awrap(this.map.remove(keyB));

            case 26:
              _context11.next = 28;
              return regeneratorRuntime.awrap(expectMembersMatch(this.map, [keyA, keyC], [valueA, valueC]));

            case 28:
              _context11.t0 = expect;
              _context11.next = 31;
              return regeneratorRuntime.awrap(this.map.contains(keyB));

            case 31:
              _context11.t1 = _context11.sent;
              (0, _context11.t0)(_context11.t1).to.equal(false);

            case 33:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
  });
  describe('read', function () {
    beforeEach(function _callee11() {
      return regeneratorRuntime.async(function _callee11$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.map.set(keyA, valueA));

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    describe('get', function () {
      it('existing value', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.t0 = expect;
                _context13.next = 3;
                return regeneratorRuntime.awrap(this.map.get(keyA));

              case 3:
                _context13.t1 = _context13.sent.toString();
                _context13.t2 = valueA.toString();
                (0, _context13.t0)(_context13.t1).to.be.equal(_context13.t2);

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('missing value', function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.map.get(keyB), 'EnumerableMap: nonexistent key'));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
    });
    describe('get with message', function () {
      it('existing value', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.t0 = expect;
                _context15.next = 3;
                return regeneratorRuntime.awrap(this.map.getWithMessage(keyA, 'custom error string'));

              case 3:
                _context15.t1 = _context15.sent.toString();
                _context15.t2 = valueA.toString();
                (0, _context15.t0)(_context15.t1).to.be.equal(_context15.t2);

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('missing value', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.map.getWithMessage(keyB, 'custom error string'), 'custom error string'));

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
    });
    describe('tryGet', function () {
      it('existing value', function _callee16() {
        var result;
        return regeneratorRuntime.async(function _callee16$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(this.map.tryGet(keyA));

              case 2:
                result = _context17.sent;
                expect(result['0']).to.be.equal(true);
                expect(result['1'].toString()).to.be.equal(valueA.toString());

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, null, this);
      });
      it('missing value', function _callee17() {
        var result;
        return regeneratorRuntime.async(function _callee17$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return regeneratorRuntime.awrap(this.map.tryGet(keyB));

              case 2:
                result = _context18.sent;
                expect(result['0']).to.be.equal(false);
                expect(result['1'].toString()).to.be.equal(zeroValue.toString());

              case 5:
              case "end":
                return _context18.stop();
            }
          }
        }, null, this);
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeMap: shouldBehaveLikeMap
};