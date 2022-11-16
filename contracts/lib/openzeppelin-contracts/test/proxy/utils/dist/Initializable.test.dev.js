"use strict";

var _require = require('@openzeppelin/test-helpers'),
    expectEvent = _require.expectEvent,
    expectRevert = _require.expectRevert;

var _require2 = require('chai'),
    expect = _require2.expect;

var InitializableMock = artifacts.require('InitializableMock');

var ConstructorInitializableMock = artifacts.require('ConstructorInitializableMock');

var ChildConstructorInitializableMock = artifacts.require('ChildConstructorInitializableMock');

var ReinitializerMock = artifacts.require('ReinitializerMock');

var SampleChild = artifacts.require('SampleChild');

var DisableBad1 = artifacts.require('DisableBad1');

var DisableBad2 = artifacts.require('DisableBad2');

var DisableOk = artifacts.require('DisableOk');

contract('Initializable', function (accounts) {
  describe('basic testing without inheritance', function () {
    beforeEach('deploying', function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(InitializableMock["new"]());

            case 2:
              this.contract = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    });
    describe('before initialize', function () {
      it('initializer has not run', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = expect;
                _context2.next = 3;
                return regeneratorRuntime.awrap(this.contract.initializerRan());

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
      it('_initializing returns false before initialization', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = expect;
                _context3.next = 3;
                return regeneratorRuntime.awrap(this.contract.isInitializing());

              case 3:
                _context3.t1 = _context3.sent;
                (0, _context3.t0)(_context3.t1).to.equal(false);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      });
    });
    describe('after initialize', function () {
      beforeEach('initializing', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(this.contract.initialize());

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('initializer has run', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = expect;
                _context5.next = 3;
                return regeneratorRuntime.awrap(this.contract.initializerRan());

              case 3:
                _context5.t1 = _context5.sent;
                (0, _context5.t0)(_context5.t1).to.equal(true);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('_initializing returns false after initialization', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = expect;
                _context6.next = 3;
                return regeneratorRuntime.awrap(this.contract.isInitializing());

              case 3:
                _context6.t1 = _context6.sent;
                (0, _context6.t0)(_context6.t1).to.equal(false);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
      it('initializer does not run again', function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.contract.initialize(), 'Initializable: contract is already initialized'));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
    });
    describe('nested under an initializer', function () {
      it('initializer modifier reverts', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(expectRevert(this.contract.initializerNested(), 'Initializable: contract is already initialized'));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('onlyInitializing modifier succeeds', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.contract.onlyInitializingNested());

              case 2:
                _context9.t0 = expect;
                _context9.next = 5;
                return regeneratorRuntime.awrap(this.contract.onlyInitializingRan());

              case 5:
                _context9.t1 = _context9.sent;
                (0, _context9.t0)(_context9.t1).to.equal(true);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
    });
    it('cannot call onlyInitializable function outside the scope of an initializable function', function _callee10() {
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(expectRevert(this.contract.initializeOnlyInitializing(), 'Initializable: contract is not initializing'));

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
  });
  it('nested initializer can run during construction', function _callee11() {
    var contract2;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(ConstructorInitializableMock["new"]());

          case 2:
            contract2 = _context11.sent;
            _context11.t0 = expect;
            _context11.next = 6;
            return regeneratorRuntime.awrap(contract2.initializerRan());

          case 6:
            _context11.t1 = _context11.sent;
            (0, _context11.t0)(_context11.t1).to.equal(true);
            _context11.t2 = expect;
            _context11.next = 11;
            return regeneratorRuntime.awrap(contract2.onlyInitializingRan());

          case 11:
            _context11.t3 = _context11.sent;
            (0, _context11.t2)(_context11.t3).to.equal(true);

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    });
  });
  it('multiple constructor levels can be initializers', function _callee12() {
    var contract2;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(ChildConstructorInitializableMock["new"]());

          case 2:
            contract2 = _context12.sent;
            _context12.t0 = expect;
            _context12.next = 6;
            return regeneratorRuntime.awrap(contract2.initializerRan());

          case 6:
            _context12.t1 = _context12.sent;
            (0, _context12.t0)(_context12.t1).to.equal(true);
            _context12.t2 = expect;
            _context12.next = 11;
            return regeneratorRuntime.awrap(contract2.childInitializerRan());

          case 11:
            _context12.t3 = _context12.sent;
            (0, _context12.t2)(_context12.t3).to.equal(true);
            _context12.t4 = expect;
            _context12.next = 16;
            return regeneratorRuntime.awrap(contract2.onlyInitializingRan());

          case 16:
            _context12.t5 = _context12.sent;
            (0, _context12.t4)(_context12.t5).to.equal(true);

          case 18:
          case "end":
            return _context12.stop();
        }
      }
    });
  });
  describe('reinitialization', function () {
    beforeEach('deploying', function _callee13() {
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(ReinitializerMock["new"]());

            case 2:
              this.contract = _context13.sent;

            case 3:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
    it('can reinitialize', function _callee14() {
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.t0 = expect;
              _context14.next = 3;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 3:
              _context14.t1 = _context14.sent;
              (0, _context14.t0)(_context14.t1).to.be.bignumber.equal('0');
              _context14.next = 7;
              return regeneratorRuntime.awrap(this.contract.initialize());

            case 7:
              _context14.t2 = expect;
              _context14.next = 10;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 10:
              _context14.t3 = _context14.sent;
              (0, _context14.t2)(_context14.t3).to.be.bignumber.equal('1');
              _context14.next = 14;
              return regeneratorRuntime.awrap(this.contract.reinitialize(2));

            case 14:
              _context14.t4 = expect;
              _context14.next = 17;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 17:
              _context14.t5 = _context14.sent;
              (0, _context14.t4)(_context14.t5).to.be.bignumber.equal('2');
              _context14.next = 21;
              return regeneratorRuntime.awrap(this.contract.reinitialize(3));

            case 21:
              _context14.t6 = expect;
              _context14.next = 24;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 24:
              _context14.t7 = _context14.sent;
              (0, _context14.t6)(_context14.t7).to.be.bignumber.equal('3');

            case 26:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    it('can jump multiple steps', function _callee15() {
      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.t0 = expect;
              _context15.next = 3;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 3:
              _context15.t1 = _context15.sent;
              (0, _context15.t0)(_context15.t1).to.be.bignumber.equal('0');
              _context15.next = 7;
              return regeneratorRuntime.awrap(this.contract.initialize());

            case 7:
              _context15.t2 = expect;
              _context15.next = 10;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 10:
              _context15.t3 = _context15.sent;
              (0, _context15.t2)(_context15.t3).to.be.bignumber.equal('1');
              _context15.next = 14;
              return regeneratorRuntime.awrap(this.contract.reinitialize(128));

            case 14:
              _context15.t4 = expect;
              _context15.next = 17;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 17:
              _context15.t5 = _context15.sent;
              (0, _context15.t4)(_context15.t5).to.be.bignumber.equal('2');

            case 19:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
    it('cannot nest reinitializers', function _callee16() {
      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.t0 = expect;
              _context16.next = 3;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 3:
              _context16.t1 = _context16.sent;
              (0, _context16.t0)(_context16.t1).to.be.bignumber.equal('0');
              _context16.next = 7;
              return regeneratorRuntime.awrap(expectRevert(this.contract.nestedReinitialize(2, 2), 'Initializable: contract is already initialized'));

            case 7:
              _context16.next = 9;
              return regeneratorRuntime.awrap(expectRevert(this.contract.nestedReinitialize(2, 3), 'Initializable: contract is already initialized'));

            case 9:
              _context16.next = 11;
              return regeneratorRuntime.awrap(expectRevert(this.contract.nestedReinitialize(3, 2), 'Initializable: contract is already initialized'));

            case 11:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
    it('can chain reinitializers', function _callee17() {
      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.t0 = expect;
              _context17.next = 3;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 3:
              _context17.t1 = _context17.sent;
              (0, _context17.t0)(_context17.t1).to.be.bignumber.equal('0');
              _context17.next = 7;
              return regeneratorRuntime.awrap(this.contract.chainReinitialize(2, 3));

            case 7:
              _context17.t2 = expect;
              _context17.next = 10;
              return regeneratorRuntime.awrap(this.contract.counter());

            case 10:
              _context17.t3 = _context17.sent;
              (0, _context17.t2)(_context17.t3).to.be.bignumber.equal('2');

            case 12:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('_getInitializedVersion returns right version', function _callee18() {
      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.contract.initialize());

            case 2:
              _context18.t0 = expect;
              _context18.next = 5;
              return regeneratorRuntime.awrap(this.contract.getInitializedVersion());

            case 5:
              _context18.t1 = _context18.sent;
              (0, _context18.t0)(_context18.t1).to.be.bignumber.equal('1');
              _context18.next = 9;
              return regeneratorRuntime.awrap(this.contract.reinitialize(12));

            case 9:
              _context18.t2 = expect;
              _context18.next = 12;
              return regeneratorRuntime.awrap(this.contract.getInitializedVersion());

            case 12:
              _context18.t3 = _context18.sent;
              (0, _context18.t2)(_context18.t3).to.be.bignumber.equal('12');

            case 14:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
    describe('contract locking', function () {
      it('prevents initialization', function _callee19() {
        return regeneratorRuntime.async(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(this.contract.disableInitializers());

              case 2:
                _context19.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.contract.initialize(), 'Initializable: contract is already initialized'));

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
      it('prevents re-initialization', function _callee20() {
        return regeneratorRuntime.async(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return regeneratorRuntime.awrap(this.contract.disableInitializers());

              case 2:
                _context20.next = 4;
                return regeneratorRuntime.awrap(expectRevert(this.contract.reinitialize(255), 'Initializable: contract is already initialized'));

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, null, this);
      });
      it('can lock contract after initialization', function _callee21() {
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(this.contract.initialize());

              case 2:
                _context21.next = 4;
                return regeneratorRuntime.awrap(this.contract.disableInitializers());

              case 4:
                _context21.next = 6;
                return regeneratorRuntime.awrap(expectRevert(this.contract.reinitialize(255), 'Initializable: contract is already initialized'));

              case 6:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('events', function () {
    it('constructor initialization emits event', function _callee22() {
      var contract;
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(ConstructorInitializableMock["new"]());

            case 2:
              contract = _context22.sent;
              _context22.next = 5;
              return regeneratorRuntime.awrap(expectEvent.inTransaction(contract.transactionHash, contract, 'Initialized', {
                version: '1'
              }));

            case 5:
            case "end":
              return _context22.stop();
          }
        }
      });
    });
    it('initialization emits event', function _callee23() {
      var contract, _ref, receipt;

      return regeneratorRuntime.async(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(ReinitializerMock["new"]());

            case 2:
              contract = _context23.sent;
              _context23.next = 5;
              return regeneratorRuntime.awrap(contract.initialize());

            case 5:
              _ref = _context23.sent;
              receipt = _ref.receipt;
              expect(receipt.logs.filter(function (_ref2) {
                var event = _ref2.event;
                return event === 'Initialized';
              }).length).to.be.equal(1);
              expectEvent(receipt, 'Initialized', {
                version: '1'
              });

            case 9:
            case "end":
              return _context23.stop();
          }
        }
      });
    });
    it('reinitialization emits event', function _callee24() {
      var contract, _ref3, receipt;

      return regeneratorRuntime.async(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(ReinitializerMock["new"]());

            case 2:
              contract = _context24.sent;
              _context24.next = 5;
              return regeneratorRuntime.awrap(contract.reinitialize(128));

            case 5:
              _ref3 = _context24.sent;
              receipt = _ref3.receipt;
              expect(receipt.logs.filter(function (_ref4) {
                var event = _ref4.event;
                return event === 'Initialized';
              }).length).to.be.equal(1);
              expectEvent(receipt, 'Initialized', {
                version: '128'
              });

            case 9:
            case "end":
              return _context24.stop();
          }
        }
      });
    });
    it('chained reinitialization emits multiple events', function _callee25() {
      var contract, _ref5, receipt;

      return regeneratorRuntime.async(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return regeneratorRuntime.awrap(ReinitializerMock["new"]());

            case 2:
              contract = _context25.sent;
              _context25.next = 5;
              return regeneratorRuntime.awrap(contract.chainReinitialize(2, 3));

            case 5:
              _ref5 = _context25.sent;
              receipt = _ref5.receipt;
              expect(receipt.logs.filter(function (_ref6) {
                var event = _ref6.event;
                return event === 'Initialized';
              }).length).to.be.equal(2);
              expectEvent(receipt, 'Initialized', {
                version: '2'
              });
              expectEvent(receipt, 'Initialized', {
                version: '3'
              });

            case 10:
            case "end":
              return _context25.stop();
          }
        }
      });
    });
  });
  describe('complex testing with inheritance', function () {
    var mother = '12';
    var gramps = '56';
    var father = '34';
    var child = '78';
    beforeEach('deploying', function _callee26() {
      return regeneratorRuntime.async(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(SampleChild["new"]());

            case 2:
              this.contract = _context26.sent;

            case 3:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    });
    beforeEach('initializing', function _callee27() {
      return regeneratorRuntime.async(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(this.contract.initialize(mother, gramps, father, child));

            case 2:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    });
    it('initializes human', function _callee28() {
      return regeneratorRuntime.async(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.t0 = expect;
              _context28.next = 3;
              return regeneratorRuntime.awrap(this.contract.isHuman());

            case 3:
              _context28.t1 = _context28.sent;
              (0, _context28.t0)(_context28.t1).to.be.equal(true);

            case 5:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    });
    it('initializes mother', function _callee29() {
      return regeneratorRuntime.async(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.t0 = expect;
              _context29.next = 3;
              return regeneratorRuntime.awrap(this.contract.mother());

            case 3:
              _context29.t1 = _context29.sent;
              _context29.t2 = mother;
              (0, _context29.t0)(_context29.t1).to.be.bignumber.equal(_context29.t2);

            case 6:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this);
    });
    it('initializes gramps', function _callee30() {
      return regeneratorRuntime.async(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.t0 = expect;
              _context30.next = 3;
              return regeneratorRuntime.awrap(this.contract.gramps());

            case 3:
              _context30.t1 = _context30.sent;
              _context30.t2 = gramps;
              (0, _context30.t0)(_context30.t1).to.be.bignumber.equal(_context30.t2);

            case 6:
            case "end":
              return _context30.stop();
          }
        }
      }, null, this);
    });
    it('initializes father', function _callee31() {
      return regeneratorRuntime.async(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.t0 = expect;
              _context31.next = 3;
              return regeneratorRuntime.awrap(this.contract.father());

            case 3:
              _context31.t1 = _context31.sent;
              _context31.t2 = father;
              (0, _context31.t0)(_context31.t1).to.be.bignumber.equal(_context31.t2);

            case 6:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    });
    it('initializes child', function _callee32() {
      return regeneratorRuntime.async(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.t0 = expect;
              _context32.next = 3;
              return regeneratorRuntime.awrap(this.contract.child());

            case 3:
              _context32.t1 = _context32.sent;
              _context32.t2 = child;
              (0, _context32.t0)(_context32.t1).to.be.bignumber.equal(_context32.t2);

            case 6:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    });
  });
  describe('disabling initialization', function () {
    it('old and new patterns in bad sequence', function _callee33() {
      return regeneratorRuntime.async(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return regeneratorRuntime.awrap(expectRevert(DisableBad1["new"](), 'Initializable: contract is already initialized'));

            case 2:
              _context33.next = 4;
              return regeneratorRuntime.awrap(expectRevert(DisableBad2["new"](), 'Initializable: contract is initializing'));

            case 4:
            case "end":
              return _context33.stop();
          }
        }
      });
    });
    it('old and new patterns in good sequence', function _callee34() {
      var ok;
      return regeneratorRuntime.async(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(DisableOk["new"]());

            case 2:
              ok = _context34.sent;
              _context34.next = 5;
              return regeneratorRuntime.awrap(expectEvent.inConstruction(ok, 'Initialized', {
                version: '1'
              }));

            case 5:
              _context34.next = 7;
              return regeneratorRuntime.awrap(expectEvent.inConstruction(ok, 'Initialized', {
                version: '255'
              }));

            case 7:
            case "end":
              return _context34.stop();
          }
        }
      });
    });
  });
});