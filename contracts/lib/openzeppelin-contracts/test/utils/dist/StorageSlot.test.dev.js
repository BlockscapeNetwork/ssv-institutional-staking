"use strict";

var _require = require('@openzeppelin/test-helpers'),
    constants = _require.constants,
    BN = _require.BN;

var _require2 = require('chai'),
    expect = _require2.expect;

var StorageSlotMock = artifacts.require('StorageSlotMock');

var slot = web3.utils.keccak256('some.storage.slot');
var otherSlot = web3.utils.keccak256('some.other.storage.slot');
contract('StorageSlot', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(StorageSlotMock["new"]());

          case 2:
            this.store = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('boolean storage slot', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.value = true;

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('set', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.store.setBoolean(slot, this.value));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    describe('get', function () {
      beforeEach(function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(this.store.setBoolean(slot, this.value));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('from right slot', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = expect;
                _context5.next = 3;
                return regeneratorRuntime.awrap(this.store.getBoolean(slot));

              case 3:
                _context5.t1 = _context5.sent;
                _context5.t2 = this.value;
                (0, _context5.t0)(_context5.t1).to.be.equal(_context5.t2);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('from other slot', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = expect;
                _context6.next = 3;
                return regeneratorRuntime.awrap(this.store.getBoolean(otherSlot));

              case 3:
                _context6.t1 = _context6.sent;
                (0, _context6.t0)(_context6.t1).to.be.equal(false);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('address storage slot', function () {
    beforeEach(function _callee7() {
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.value = accounts[1];

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('set', function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.store.setAddress(slot, this.value));

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    describe('get', function () {
      beforeEach(function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(this.store.setAddress(slot, this.value));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
      it('from right slot', function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.t0 = expect;
                _context10.next = 3;
                return regeneratorRuntime.awrap(this.store.getAddress(slot));

              case 3:
                _context10.t1 = _context10.sent;
                _context10.t2 = this.value;
                (0, _context10.t0)(_context10.t1).to.be.equal(_context10.t2);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('from other slot', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.t0 = expect;
                _context11.next = 3;
                return regeneratorRuntime.awrap(this.store.getAddress(otherSlot));

              case 3:
                _context11.t1 = _context11.sent;
                _context11.t2 = constants.ZERO_ADDRESS;
                (0, _context11.t0)(_context11.t1).to.be.equal(_context11.t2);

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('bytes32 storage slot', function () {
    beforeEach(function _callee12() {
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              this.value = web3.utils.keccak256('some byte32 value');

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    it('set', function _callee13() {
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.store.setBytes32(slot, this.value));

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
    describe('get', function () {
      beforeEach(function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(this.store.setBytes32(slot, this.value));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('from right slot', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.t0 = expect;
                _context15.next = 3;
                return regeneratorRuntime.awrap(this.store.getBytes32(slot));

              case 3:
                _context15.t1 = _context15.sent;
                _context15.t2 = this.value;
                (0, _context15.t0)(_context15.t1).to.be.equal(_context15.t2);

              case 6:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
      it('from other slot', function _callee16() {
        return regeneratorRuntime.async(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.t0 = expect;
                _context16.next = 3;
                return regeneratorRuntime.awrap(this.store.getBytes32(otherSlot));

              case 3:
                _context16.t1 = _context16.sent;
                _context16.t2 = constants.ZERO_BYTES32;
                (0, _context16.t0)(_context16.t1).to.be.equal(_context16.t2);

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, null, this);
      });
    });
  });
  describe('uint256 storage slot', function () {
    beforeEach(function _callee17() {
      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              this.value = new BN(1742);

            case 1:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('set', function _callee18() {
      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.store.setUint256(slot, this.value));

            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
    describe('get', function () {
      beforeEach(function _callee19() {
        return regeneratorRuntime.async(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(this.store.setUint256(slot, this.value));

              case 2:
              case "end":
                return _context19.stop();
            }
          }
        }, null, this);
      });
      it('from right slot', function _callee20() {
        return regeneratorRuntime.async(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.t0 = expect;
                _context20.next = 3;
                return regeneratorRuntime.awrap(this.store.getUint256(slot));

              case 3:
                _context20.t1 = _context20.sent;
                _context20.t2 = this.value;
                (0, _context20.t0)(_context20.t1).to.be.bignumber.equal(_context20.t2);

              case 6:
              case "end":
                return _context20.stop();
            }
          }
        }, null, this);
      });
      it('from other slot', function _callee21() {
        return regeneratorRuntime.async(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.t0 = expect;
                _context21.next = 3;
                return regeneratorRuntime.awrap(this.store.getUint256(otherSlot));

              case 3:
                _context21.t1 = _context21.sent;
                (0, _context21.t0)(_context21.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context21.stop();
            }
          }
        }, null, this);
      });
    });
  });
});