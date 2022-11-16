"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC1155SupplyMock = artifacts.require('ERC1155SupplyMock');

contract('ERC1155Supply', function (accounts) {
  var _accounts = _slicedToArray(accounts, 1),
      holder = _accounts[0];

  var uri = 'https://token.com';
  var firstTokenId = new BN('37');
  var firstTokenAmount = new BN('42');
  var secondTokenId = new BN('19842');
  var secondTokenAmount = new BN('23');
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC1155SupplyMock["new"](uri));

          case 2:
            this.token = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('before mint', function () {
    it('exist', function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = expect;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

            case 3:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.be.equal(false);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('totalSupply', function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = expect;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.token.totalSupply(firstTokenId));

            case 3:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.be.bignumber.equal('0');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
  });
  context('after mint', function () {
    context('single', function () {
      beforeEach(function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(holder, firstTokenId, firstTokenAmount, '0x'));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, null, this);
      });
      it('exist', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = expect;
                _context5.next = 3;
                return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

              case 3:
                _context5.t1 = _context5.sent;
                (0, _context5.t0)(_context5.t1).to.be.equal(true);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, null, this);
      });
      it('totalSupply', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.t0 = expect;
                _context6.next = 3;
                return regeneratorRuntime.awrap(this.token.totalSupply(firstTokenId));

              case 3:
                _context6.t1 = _context6.sent;
                _context6.t2 = firstTokenAmount;
                (0, _context6.t0)(_context6.t1).to.be.bignumber.equal(_context6.t2);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, null, this);
      });
    });
    context('batch', function () {
      beforeEach(function _callee7() {
        return regeneratorRuntime.async(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(this.token.mintBatch(holder, [firstTokenId, secondTokenId], [firstTokenAmount, secondTokenAmount], '0x'));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, null, this);
      });
      it('exist', function _callee8() {
        return regeneratorRuntime.async(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.t0 = expect;
                _context8.next = 3;
                return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

              case 3:
                _context8.t1 = _context8.sent;
                (0, _context8.t0)(_context8.t1).to.be.equal(true);
                _context8.t2 = expect;
                _context8.next = 8;
                return regeneratorRuntime.awrap(this.token.exists(secondTokenId));

              case 8:
                _context8.t3 = _context8.sent;
                (0, _context8.t2)(_context8.t3).to.be.equal(true);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, null, this);
      });
      it('totalSupply', function _callee9() {
        return regeneratorRuntime.async(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.t0 = expect;
                _context9.next = 3;
                return regeneratorRuntime.awrap(this.token.totalSupply(firstTokenId));

              case 3:
                _context9.t1 = _context9.sent;
                _context9.t2 = firstTokenAmount;
                (0, _context9.t0)(_context9.t1).to.be.bignumber.equal(_context9.t2);
                _context9.t3 = expect;
                _context9.next = 9;
                return regeneratorRuntime.awrap(this.token.totalSupply(secondTokenId));

              case 9:
                _context9.t4 = _context9.sent;
                _context9.t5 = secondTokenAmount;
                (0, _context9.t3)(_context9.t4).to.be.bignumber.equal(_context9.t5);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, null, this);
      });
    });
  });
  context('after burn', function () {
    context('single', function () {
      beforeEach(function _callee10() {
        return regeneratorRuntime.async(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(this.token.mint(holder, firstTokenId, firstTokenAmount, '0x'));

              case 2:
                _context10.next = 4;
                return regeneratorRuntime.awrap(this.token.burn(holder, firstTokenId, firstTokenAmount));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, null, this);
      });
      it('exist', function _callee11() {
        return regeneratorRuntime.async(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.t0 = expect;
                _context11.next = 3;
                return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

              case 3:
                _context11.t1 = _context11.sent;
                (0, _context11.t0)(_context11.t1).to.be.equal(false);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, null, this);
      });
      it('totalSupply', function _callee12() {
        return regeneratorRuntime.async(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.t0 = expect;
                _context12.next = 3;
                return regeneratorRuntime.awrap(this.token.totalSupply(firstTokenId));

              case 3:
                _context12.t1 = _context12.sent;
                (0, _context12.t0)(_context12.t1).to.be.bignumber.equal('0');

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, null, this);
      });
    });
    context('batch', function () {
      beforeEach(function _callee13() {
        return regeneratorRuntime.async(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return regeneratorRuntime.awrap(this.token.mintBatch(holder, [firstTokenId, secondTokenId], [firstTokenAmount, secondTokenAmount], '0x'));

              case 2:
                _context13.next = 4;
                return regeneratorRuntime.awrap(this.token.burnBatch(holder, [firstTokenId, secondTokenId], [firstTokenAmount, secondTokenAmount]));

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, null, this);
      });
      it('exist', function _callee14() {
        return regeneratorRuntime.async(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.t0 = expect;
                _context14.next = 3;
                return regeneratorRuntime.awrap(this.token.exists(firstTokenId));

              case 3:
                _context14.t1 = _context14.sent;
                (0, _context14.t0)(_context14.t1).to.be.equal(false);
                _context14.t2 = expect;
                _context14.next = 8;
                return regeneratorRuntime.awrap(this.token.exists(secondTokenId));

              case 8:
                _context14.t3 = _context14.sent;
                (0, _context14.t2)(_context14.t3).to.be.equal(false);

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, null, this);
      });
      it('totalSupply', function _callee15() {
        return regeneratorRuntime.async(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.t0 = expect;
                _context15.next = 3;
                return regeneratorRuntime.awrap(this.token.totalSupply(firstTokenId));

              case 3:
                _context15.t1 = _context15.sent;
                (0, _context15.t0)(_context15.t1).to.be.bignumber.equal('0');
                _context15.t2 = expect;
                _context15.next = 8;
                return regeneratorRuntime.awrap(this.token.totalSupply(secondTokenId));

              case 8:
                _context15.t3 = _context15.sent;
                (0, _context15.t2)(_context15.t3).to.be.bignumber.equal('0');

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, null, this);
      });
    });
  });
});