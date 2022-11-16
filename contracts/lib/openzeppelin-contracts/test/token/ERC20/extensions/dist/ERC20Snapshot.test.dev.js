"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var ERC20SnapshotMock = artifacts.require('ERC20SnapshotMock');

var _require2 = require('chai'),
    expect = _require2.expect;

contract('ERC20Snapshot', function (accounts) {
  var _accounts = _slicedToArray(accounts, 3),
      initialHolder = _accounts[0],
      recipient = _accounts[1],
      other = _accounts[2];

  var initialSupply = new BN(100);
  var name = 'My Token';
  var symbol = 'MTKN';
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC20SnapshotMock["new"](name, symbol, initialHolder, initialSupply));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('snapshot', function () {
    it('emits a snapshot event', function _callee2() {
      var receipt;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.token.snapshot());

            case 2:
              receipt = _context2.sent;
              expectEvent(receipt, 'Snapshot');

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('creates increasing snapshots ids, starting from 1', function _callee3() {
      var _i2, _arr2, id, receipt;

      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _i2 = 0, _arr2 = ['1', '2', '3', '4', '5'];

            case 1:
              if (!(_i2 < _arr2.length)) {
                _context3.next = 10;
                break;
              }

              id = _arr2[_i2];
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.token.snapshot());

            case 5:
              receipt = _context3.sent;
              expectEvent(receipt, 'Snapshot', {
                id: id
              });

            case 7:
              _i2++;
              _context3.next = 1;
              break;

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  describe('totalSupplyAt', function () {
    it('reverts with a snapshot id of 0', function _callee4() {
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.totalSupplyAt(0), 'ERC20Snapshot: id is 0'));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('reverts with a not-yet-created snapshot id', function _callee5() {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.totalSupplyAt(1), 'ERC20Snapshot: nonexistent id'));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    context('with initial snapshot', function () {
      beforeEach(function _callee6() {
        var receipt;
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.initialSnapshotId = new BN('1');
                _context6.next = 3;
                return regeneratorRuntime.awrap(this.token.snapshot());

              case 3:
                receipt = _context6.sent;
                expectEvent(receipt, 'Snapshot', {
                  id: this.initialSnapshotId
                });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      context('with no supply changes after the snapshot', function () {
        it('returns the current total supply', function _callee7() {
          return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.t0 = expect;
                  _context7.next = 3;
                  return regeneratorRuntime.awrap(this.token.totalSupplyAt(this.initialSnapshotId));

                case 3:
                  _context7.t1 = _context7.sent;
                  _context7.t2 = initialSupply;
                  (0, _context7.t0)(_context7.t1).to.be.bignumber.equal(_context7.t2);

                case 6:
                case "end":
                  return _context7.stop();
              }
            }
          }, null, this);
        });
      });
      context('with supply changes after the snapshot', function () {
        beforeEach(function _callee8() {
          return regeneratorRuntime.async(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return regeneratorRuntime.awrap(this.token.mint(other, new BN('50')));

                case 2:
                  _context8.next = 4;
                  return regeneratorRuntime.awrap(this.token.burn(initialHolder, new BN('20')));

                case 4:
                case "end":
                  return _context8.stop();
              }
            }
          }, null, this);
        });
        it('returns the total supply before the changes', function _callee9() {
          return regeneratorRuntime.async(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.t0 = expect;
                  _context9.next = 3;
                  return regeneratorRuntime.awrap(this.token.totalSupplyAt(this.initialSnapshotId));

                case 3:
                  _context9.t1 = _context9.sent;
                  _context9.t2 = initialSupply;
                  (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);

                case 6:
                case "end":
                  return _context9.stop();
              }
            }
          }, null, this);
        });
        context('with a second snapshot after supply changes', function () {
          beforeEach(function _callee10() {
            var receipt;
            return regeneratorRuntime.async(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    this.secondSnapshotId = new BN('2');
                    _context10.next = 3;
                    return regeneratorRuntime.awrap(this.token.snapshot());

                  case 3:
                    receipt = _context10.sent;
                    expectEvent(receipt, 'Snapshot', {
                      id: this.secondSnapshotId
                    });

                  case 5:
                  case "end":
                    return _context10.stop();
                }
              }
            }, null, this);
          });
          it('snapshots return the supply before and after the changes', function _callee11() {
            return regeneratorRuntime.async(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.t0 = expect;
                    _context11.next = 3;
                    return regeneratorRuntime.awrap(this.token.totalSupplyAt(this.initialSnapshotId));

                  case 3:
                    _context11.t1 = _context11.sent;
                    _context11.t2 = initialSupply;
                    (0, _context11.t0)(_context11.t1).to.be.bignumber.equal(_context11.t2);
                    _context11.t4 = expect;
                    _context11.next = 9;
                    return regeneratorRuntime.awrap(this.token.totalSupplyAt(this.secondSnapshotId));

                  case 9:
                    _context11.t5 = _context11.sent;
                    _context11.t3 = (0, _context11.t4)(_context11.t5).to.be.bignumber;
                    _context11.next = 13;
                    return regeneratorRuntime.awrap(this.token.totalSupply());

                  case 13:
                    _context11.t6 = _context11.sent;

                    _context11.t3.equal.call(_context11.t3, _context11.t6);

                  case 15:
                  case "end":
                    return _context11.stop();
                }
              }
            }, null, this);
          });
        });
        context('with multiple snapshots after supply changes', function () {
          beforeEach(function _callee12() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id, receipt;

            return regeneratorRuntime.async(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    this.secondSnapshotIds = ['2', '3', '4'];
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context12.prev = 4;
                    _iterator = this.secondSnapshotIds[Symbol.iterator]();

                  case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context12.next = 15;
                      break;
                    }

                    id = _step.value;
                    _context12.next = 10;
                    return regeneratorRuntime.awrap(this.token.snapshot());

                  case 10:
                    receipt = _context12.sent;
                    expectEvent(receipt, 'Snapshot', {
                      id: id
                    });

                  case 12:
                    _iteratorNormalCompletion = true;
                    _context12.next = 6;
                    break;

                  case 15:
                    _context12.next = 21;
                    break;

                  case 17:
                    _context12.prev = 17;
                    _context12.t0 = _context12["catch"](4);
                    _didIteratorError = true;
                    _iteratorError = _context12.t0;

                  case 21:
                    _context12.prev = 21;
                    _context12.prev = 22;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 24:
                    _context12.prev = 24;

                    if (!_didIteratorError) {
                      _context12.next = 27;
                      break;
                    }

                    throw _iteratorError;

                  case 27:
                    return _context12.finish(24);

                  case 28:
                    return _context12.finish(21);

                  case 29:
                  case "end":
                    return _context12.stop();
                }
              }
            }, null, this, [[4, 17, 21, 29], [22,, 24, 28]]);
          });
          it('all posterior snapshots return the supply after the changes', function _callee13() {
            var currentSupply, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, id;

            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.t0 = expect;
                    _context13.next = 3;
                    return regeneratorRuntime.awrap(this.token.totalSupplyAt(this.initialSnapshotId));

                  case 3:
                    _context13.t1 = _context13.sent;
                    _context13.t2 = initialSupply;
                    (0, _context13.t0)(_context13.t1).to.be.bignumber.equal(_context13.t2);
                    _context13.next = 8;
                    return regeneratorRuntime.awrap(this.token.totalSupply());

                  case 8:
                    currentSupply = _context13.sent;
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context13.prev = 12;
                    _iterator2 = this.secondSnapshotIds[Symbol.iterator]();

                  case 14:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context13.next = 25;
                      break;
                    }

                    id = _step2.value;
                    _context13.t3 = expect;
                    _context13.next = 19;
                    return regeneratorRuntime.awrap(this.token.totalSupplyAt(id));

                  case 19:
                    _context13.t4 = _context13.sent;
                    _context13.t5 = currentSupply;
                    (0, _context13.t3)(_context13.t4).to.be.bignumber.equal(_context13.t5);

                  case 22:
                    _iteratorNormalCompletion2 = true;
                    _context13.next = 14;
                    break;

                  case 25:
                    _context13.next = 31;
                    break;

                  case 27:
                    _context13.prev = 27;
                    _context13.t6 = _context13["catch"](12);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context13.t6;

                  case 31:
                    _context13.prev = 31;
                    _context13.prev = 32;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 34:
                    _context13.prev = 34;

                    if (!_didIteratorError2) {
                      _context13.next = 37;
                      break;
                    }

                    throw _iteratorError2;

                  case 37:
                    return _context13.finish(34);

                  case 38:
                    return _context13.finish(31);

                  case 39:
                  case "end":
                    return _context13.stop();
                }
              }
            }, null, this, [[12, 27, 31, 39], [32,, 34, 38]]);
          });
        });
      });
    });
  });
  describe('balanceOfAt', function () {
    it('reverts with a snapshot id of 0', function _callee14() {
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.balanceOfAt(other, 0), 'ERC20Snapshot: id is 0'));

            case 2:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    it('reverts with a not-yet-created snapshot id', function _callee15() {
      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.token.balanceOfAt(other, 1), 'ERC20Snapshot: nonexistent id'));

            case 2:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
    context('with initial snapshot', function () {
      beforeEach(function _callee16() {
        var receipt;
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this.initialSnapshotId = new BN('1');
                _context16.next = 3;
                return regeneratorRuntime.awrap(this.token.snapshot());

              case 3:
                receipt = _context16.sent;
                expectEvent(receipt, 'Snapshot', {
                  id: this.initialSnapshotId
                });

              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
      context('with no balance changes after the snapshot', function () {
        it('returns the current balance for all accounts', function _callee17() {
          return regeneratorRuntime.async(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.t0 = expect;
                  _context17.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOfAt(initialHolder, this.initialSnapshotId));

                case 3:
                  _context17.t1 = _context17.sent;
                  _context17.t2 = initialSupply;
                  (0, _context17.t0)(_context17.t1).to.be.bignumber.equal(_context17.t2);
                  _context17.t3 = expect;
                  _context17.next = 9;
                  return regeneratorRuntime.awrap(this.token.balanceOfAt(recipient, this.initialSnapshotId));

                case 9:
                  _context17.t4 = _context17.sent;
                  (0, _context17.t3)(_context17.t4).to.be.bignumber.equal('0');
                  _context17.t5 = expect;
                  _context17.next = 14;
                  return regeneratorRuntime.awrap(this.token.balanceOfAt(other, this.initialSnapshotId));

                case 14:
                  _context17.t6 = _context17.sent;
                  (0, _context17.t5)(_context17.t6).to.be.bignumber.equal('0');

                case 16:
                case "end":
                  return _context17.stop();
              }
            }
          }, null, this);
        });
      });
      context('with balance changes after the snapshot', function () {
        beforeEach(function _callee18() {
          return regeneratorRuntime.async(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return regeneratorRuntime.awrap(this.token.transfer(recipient, new BN('10'), {
                    from: initialHolder
                  }));

                case 2:
                  _context18.next = 4;
                  return regeneratorRuntime.awrap(this.token.mint(other, new BN('50')));

                case 4:
                  _context18.next = 6;
                  return regeneratorRuntime.awrap(this.token.burn(initialHolder, new BN('20')));

                case 6:
                case "end":
                  return _context18.stop();
              }
            }
          }, null, this);
        });
        it('returns the balances before the changes', function _callee19() {
          return regeneratorRuntime.async(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  _context19.t0 = expect;
                  _context19.next = 3;
                  return regeneratorRuntime.awrap(this.token.balanceOfAt(initialHolder, this.initialSnapshotId));

                case 3:
                  _context19.t1 = _context19.sent;
                  _context19.t2 = initialSupply;
                  (0, _context19.t0)(_context19.t1).to.be.bignumber.equal(_context19.t2);
                  _context19.t3 = expect;
                  _context19.next = 9;
                  return regeneratorRuntime.awrap(this.token.balanceOfAt(recipient, this.initialSnapshotId));

                case 9:
                  _context19.t4 = _context19.sent;
                  (0, _context19.t3)(_context19.t4).to.be.bignumber.equal('0');
                  _context19.t5 = expect;
                  _context19.next = 14;
                  return regeneratorRuntime.awrap(this.token.balanceOfAt(other, this.initialSnapshotId));

                case 14:
                  _context19.t6 = _context19.sent;
                  (0, _context19.t5)(_context19.t6).to.be.bignumber.equal('0');

                case 16:
                case "end":
                  return _context19.stop();
              }
            }
          }, null, this);
        });
        context('with a second snapshot after supply changes', function () {
          beforeEach(function _callee20() {
            var receipt;
            return regeneratorRuntime.async(function _callee20$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    this.secondSnapshotId = new BN('2');
                    _context20.next = 3;
                    return regeneratorRuntime.awrap(this.token.snapshot());

                  case 3:
                    receipt = _context20.sent;
                    expectEvent(receipt, 'Snapshot', {
                      id: this.secondSnapshotId
                    });

                  case 5:
                  case "end":
                    return _context20.stop();
                }
              }
            }, null, this);
          });
          it('snapshots return the balances before and after the changes', function _callee21() {
            return regeneratorRuntime.async(function _callee21$(_context21) {
              while (1) {
                switch (_context21.prev = _context21.next) {
                  case 0:
                    _context21.t0 = expect;
                    _context21.next = 3;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(initialHolder, this.initialSnapshotId));

                  case 3:
                    _context21.t1 = _context21.sent;
                    _context21.t2 = initialSupply;
                    (0, _context21.t0)(_context21.t1).to.be.bignumber.equal(_context21.t2);
                    _context21.t3 = expect;
                    _context21.next = 9;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(recipient, this.initialSnapshotId));

                  case 9:
                    _context21.t4 = _context21.sent;
                    (0, _context21.t3)(_context21.t4).to.be.bignumber.equal('0');
                    _context21.t5 = expect;
                    _context21.next = 14;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(other, this.initialSnapshotId));

                  case 14:
                    _context21.t6 = _context21.sent;
                    (0, _context21.t5)(_context21.t6).to.be.bignumber.equal('0');
                    _context21.t8 = expect;
                    _context21.next = 19;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(initialHolder, this.secondSnapshotId));

                  case 19:
                    _context21.t9 = _context21.sent;
                    _context21.t7 = (0, _context21.t8)(_context21.t9).to.be.bignumber;
                    _context21.next = 23;
                    return regeneratorRuntime.awrap(this.token.balanceOf(initialHolder));

                  case 23:
                    _context21.t10 = _context21.sent;

                    _context21.t7.equal.call(_context21.t7, _context21.t10);

                    _context21.t12 = expect;
                    _context21.next = 28;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(recipient, this.secondSnapshotId));

                  case 28:
                    _context21.t13 = _context21.sent;
                    _context21.t11 = (0, _context21.t12)(_context21.t13).to.be.bignumber;
                    _context21.next = 32;
                    return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

                  case 32:
                    _context21.t14 = _context21.sent;

                    _context21.t11.equal.call(_context21.t11, _context21.t14);

                    _context21.t16 = expect;
                    _context21.next = 37;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(other, this.secondSnapshotId));

                  case 37:
                    _context21.t17 = _context21.sent;
                    _context21.t15 = (0, _context21.t16)(_context21.t17).to.be.bignumber;
                    _context21.next = 41;
                    return regeneratorRuntime.awrap(this.token.balanceOf(other));

                  case 41:
                    _context21.t18 = _context21.sent;

                    _context21.t15.equal.call(_context21.t15, _context21.t18);

                  case 43:
                  case "end":
                    return _context21.stop();
                }
              }
            }, null, this);
          });
        });
        context('with multiple snapshots after supply changes', function () {
          beforeEach(function _callee22() {
            var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, id, receipt;

            return regeneratorRuntime.async(function _callee22$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    this.secondSnapshotIds = ['2', '3', '4'];
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context22.prev = 4;
                    _iterator3 = this.secondSnapshotIds[Symbol.iterator]();

                  case 6:
                    if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                      _context22.next = 15;
                      break;
                    }

                    id = _step3.value;
                    _context22.next = 10;
                    return regeneratorRuntime.awrap(this.token.snapshot());

                  case 10:
                    receipt = _context22.sent;
                    expectEvent(receipt, 'Snapshot', {
                      id: id
                    });

                  case 12:
                    _iteratorNormalCompletion3 = true;
                    _context22.next = 6;
                    break;

                  case 15:
                    _context22.next = 21;
                    break;

                  case 17:
                    _context22.prev = 17;
                    _context22.t0 = _context22["catch"](4);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context22.t0;

                  case 21:
                    _context22.prev = 21;
                    _context22.prev = 22;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                      _iterator3["return"]();
                    }

                  case 24:
                    _context22.prev = 24;

                    if (!_didIteratorError3) {
                      _context22.next = 27;
                      break;
                    }

                    throw _iteratorError3;

                  case 27:
                    return _context22.finish(24);

                  case 28:
                    return _context22.finish(21);

                  case 29:
                  case "end":
                    return _context22.stop();
                }
              }
            }, null, this, [[4, 17, 21, 29], [22,, 24, 28]]);
          });
          it('all posterior snapshots return the supply after the changes', function _callee23() {
            var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, id;

            return regeneratorRuntime.async(function _callee23$(_context23) {
              while (1) {
                switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.t0 = expect;
                    _context23.next = 3;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(initialHolder, this.initialSnapshotId));

                  case 3:
                    _context23.t1 = _context23.sent;
                    _context23.t2 = initialSupply;
                    (0, _context23.t0)(_context23.t1).to.be.bignumber.equal(_context23.t2);
                    _context23.t3 = expect;
                    _context23.next = 9;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(recipient, this.initialSnapshotId));

                  case 9:
                    _context23.t4 = _context23.sent;
                    (0, _context23.t3)(_context23.t4).to.be.bignumber.equal('0');
                    _context23.t5 = expect;
                    _context23.next = 14;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(other, this.initialSnapshotId));

                  case 14:
                    _context23.t6 = _context23.sent;
                    (0, _context23.t5)(_context23.t6).to.be.bignumber.equal('0');
                    _iteratorNormalCompletion4 = true;
                    _didIteratorError4 = false;
                    _iteratorError4 = undefined;
                    _context23.prev = 19;
                    _iterator4 = this.secondSnapshotIds[Symbol.iterator]();

                  case 21:
                    if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                      _context23.next = 53;
                      break;
                    }

                    id = _step4.value;
                    _context23.t8 = expect;
                    _context23.next = 26;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(initialHolder, id));

                  case 26:
                    _context23.t9 = _context23.sent;
                    _context23.t7 = (0, _context23.t8)(_context23.t9).to.be.bignumber;
                    _context23.next = 30;
                    return regeneratorRuntime.awrap(this.token.balanceOf(initialHolder));

                  case 30:
                    _context23.t10 = _context23.sent;

                    _context23.t7.equal.call(_context23.t7, _context23.t10);

                    _context23.t12 = expect;
                    _context23.next = 35;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(recipient, id));

                  case 35:
                    _context23.t13 = _context23.sent;
                    _context23.t11 = (0, _context23.t12)(_context23.t13).to.be.bignumber;
                    _context23.next = 39;
                    return regeneratorRuntime.awrap(this.token.balanceOf(recipient));

                  case 39:
                    _context23.t14 = _context23.sent;

                    _context23.t11.equal.call(_context23.t11, _context23.t14);

                    _context23.t16 = expect;
                    _context23.next = 44;
                    return regeneratorRuntime.awrap(this.token.balanceOfAt(other, id));

                  case 44:
                    _context23.t17 = _context23.sent;
                    _context23.t15 = (0, _context23.t16)(_context23.t17).to.be.bignumber;
                    _context23.next = 48;
                    return regeneratorRuntime.awrap(this.token.balanceOf(other));

                  case 48:
                    _context23.t18 = _context23.sent;

                    _context23.t15.equal.call(_context23.t15, _context23.t18);

                  case 50:
                    _iteratorNormalCompletion4 = true;
                    _context23.next = 21;
                    break;

                  case 53:
                    _context23.next = 59;
                    break;

                  case 55:
                    _context23.prev = 55;
                    _context23.t19 = _context23["catch"](19);
                    _didIteratorError4 = true;
                    _iteratorError4 = _context23.t19;

                  case 59:
                    _context23.prev = 59;
                    _context23.prev = 60;

                    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                      _iterator4["return"]();
                    }

                  case 62:
                    _context23.prev = 62;

                    if (!_didIteratorError4) {
                      _context23.next = 65;
                      break;
                    }

                    throw _iteratorError4;

                  case 65:
                    return _context23.finish(62);

                  case 66:
                    return _context23.finish(59);

                  case 67:
                  case "end":
                    return _context23.stop();
                }
              }
            }, null, this, [[19, 55, 59, 67], [60,, 62, 66]]);
          });
        });
      });
    });
  });
});