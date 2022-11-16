"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var PausableMock = artifacts.require('PausableMock');

contract('Pausable', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      pauser = _accounts[0];

  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(PausableMock["new"]());

          case 2:
            this.pausable = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('when unpaused', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.pausable.paused());

            case 3:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.equal(false);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('can perform normal process in non-pause', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.pausable.count());

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('0');
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.pausable.normalProcess());

            case 7:
              _context3.t2 = expect;
              _context3.next = 10;
              return regeneratorRuntime.awrap(this.pausable.count());

            case 10:
              _context3.t3 = _context3.sent;
              (0, _context3.t2)(_context3.t3).to.be.bignumber.equal('1');

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('cannot take drastic measure in non-pause', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.pausable.drasticMeasure(), 'Pausable: not paused'));

            case 2:
              _context4.t0 = expect;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.pausable.drasticMeasureTaken());

            case 5:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal(false);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    context('when paused', function () {
      beforeEach(function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(this.pausable.pause({
                  from: pauser
                }));

              case 2:
                this.receipt = _context5.sent;

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('emits a Paused event', function () {
        expectEvent(this.receipt, 'Paused', {
          account: pauser
        });
      });
      it('cannot perform normal process in pause', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.pausable.normalProcess(), 'Pausable: paused'));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('can take a drastic measure in a pause', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.pausable.drasticMeasure());

              case 2:
                _context7.t0 = expect;
                _context7.next = 5;
                return regeneratorRuntime.awrap(this.pausable.drasticMeasureTaken());

              case 5:
                _context7.t1 = _context7.sent;
                (0, _context7.t0)(_context7.t1).to.equal(true);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('reverts when re-pausing', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.pausable.pause(), 'Pausable: paused'));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      describe('unpausing', function () {
        it('is unpausable by the pauser', function _callee9() {
          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return regeneratorRuntime.awrap(this.pausable.unpause());

                case 2:
                  _context9.t0 = expect;
                  _context9.next = 5;
                  return regeneratorRuntime.awrap(this.pausable.paused());

                case 5:
                  _context9.t1 = _context9.sent;
                  (0, _context9.t0)(_context9.t1).to.equal(false);

                case 7:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
        context('when unpaused', function () {
          beforeEach(function _callee10() {
            return regeneratorRuntime.async(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return regeneratorRuntime.awrap(this.pausable.unpause({
                      from: pauser
                    }));

                  case 2:
                    this.receipt = _context10.sent;

                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }
            }, null, this);
          });
          it('emits an Unpaused event', function () {
            expectEvent(this.receipt, 'Unpaused', {
              account: pauser
            });
          });
          it('should resume allowing normal process', function _callee11() {
            return regeneratorRuntime.async(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.t0 = expect;
                    _context11.next = 3;
                    return regeneratorRuntime.awrap(this.pausable.count());

                  case 3:
                    _context11.t1 = _context11.sent;
                    (0, _context11.t0)(_context11.t1).to.be.bignumber.equal('0');
                    _context11.next = 7;
                    return regeneratorRuntime.awrap(this.pausable.normalProcess());

                  case 7:
                    _context11.t2 = expect;
                    _context11.next = 10;
                    return regeneratorRuntime.awrap(this.pausable.count());

                  case 10:
                    _context11.t3 = _context11.sent;
                    (0, _context11.t2)(_context11.t3).to.be.bignumber.equal('1');

                  case 12:
                  case "end":
                    return _context11.stop();
                }
              }
            }, null, this);
          });
          it('should prevent drastic measure', function _callee12() {
            return regeneratorRuntime.async(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.pausable.drasticMeasure(), 'Pausable: not paused'));

                  case 2:
                  case "end":
                    return _context12.stop();
                }
              }
            }, null, this);
          });
          it('reverts when re-unpausing', function _callee13() {
            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return regeneratorRuntime.awrap(expectRevert(this.pausable.unpause(), 'Pausable: not paused'));

                  case 2:
                  case "end":
                    return _context13.stop();
                }
              }
            }, null, this);
          });
        });
      });
    });
  });
});