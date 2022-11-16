"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('@openzeppelin/test-helpers'),
    BN = _require.BN,
    singletons = _require.singletons;

var _require2 = require('chai'),
    expect = _require2.expect;

var ERC777PresetFixedSupply = artifacts.require('ERC777PresetFixedSupply');

contract('ERC777PresetFixedSupply', function (accounts) {
  var _accounts = _slicedToArray(accounts, 5),
      registryFunder = _accounts[0],
      owner = _accounts[1],
      defaultOperatorA = _accounts[2],
      defaultOperatorB = _accounts[3],
      anyone = _accounts[4];

  var initialSupply = new BN('10000');
  var name = 'ERC777Preset';
  var symbol = '777P';
  var defaultOperators = [defaultOperatorA, defaultOperatorB];
  before(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(singletons.ERC1820Registry(registryFunder));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  beforeEach(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(ERC777PresetFixedSupply["new"](name, symbol, defaultOperators, initialSupply, owner));

          case 2:
            this.token = _context2.sent;

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  });
  it('returns the name', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.token.name());

          case 3:
            _context3.t1 = _context3.sent;
            _context3.t2 = name;
            (0, _context3.t0)(_context3.t1).to.equal(_context3.t2);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  });
  it('returns the symbol', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = expect;
            _context4.next = 3;
            return regeneratorRuntime.awrap(this.token.symbol());

          case 3:
            _context4.t1 = _context4.sent;
            _context4.t2 = symbol;
            (0, _context4.t0)(_context4.t1).to.equal(_context4.t2);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  });
  it('returns the default operators', function _callee5() {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = expect;
            _context5.next = 3;
            return regeneratorRuntime.awrap(this.token.defaultOperators());

          case 3:
            _context5.t1 = _context5.sent;
            _context5.t2 = defaultOperators;
            (0, _context5.t0)(_context5.t1).to.deep.equal(_context5.t2);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  });
  it('default operators are operators for all accounts', function _callee6() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, operator;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context6.prev = 3;
            _iterator = defaultOperators[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context6.next = 15;
              break;
            }

            operator = _step.value;
            _context6.t0 = expect;
            _context6.next = 10;
            return regeneratorRuntime.awrap(this.token.isOperatorFor(operator, anyone));

          case 10:
            _context6.t1 = _context6.sent;
            (0, _context6.t0)(_context6.t1).to.equal(true);

          case 12:
            _iteratorNormalCompletion = true;
            _context6.next = 5;
            break;

          case 15:
            _context6.next = 21;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t2 = _context6["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context6.t2;

          case 21:
            _context6.prev = 21;
            _context6.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context6.prev = 24;

            if (!_didIteratorError) {
              _context6.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context6.finish(24);

          case 28:
            return _context6.finish(21);

          case 29:
          case "end":
            return _context6.stop();
        }
      }
    }, null, this, [[3, 17, 21, 29], [22,, 24, 28]]);
  });
  it('returns the total supply equal to initial supply', function _callee7() {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.t0 = expect;
            _context7.next = 3;
            return regeneratorRuntime.awrap(this.token.totalSupply());

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
  it('returns the balance of owner equal to initial supply', function _callee8() {
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.t0 = expect;
            _context8.next = 3;
            return regeneratorRuntime.awrap(this.token.balanceOf(owner));

          case 3:
            _context8.t1 = _context8.sent;
            _context8.t2 = initialSupply;
            (0, _context8.t0)(_context8.t1).to.be.bignumber.equal(_context8.t2);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, null, this);
  });
});