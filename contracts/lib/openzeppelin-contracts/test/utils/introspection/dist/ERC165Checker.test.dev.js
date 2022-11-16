"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

require('@openzeppelin/test-helpers');

var _require = require('chai'),
    expect = _require.expect;

var ERC165CheckerMock = artifacts.require('ERC165CheckerMock');

var ERC165MissingData = artifacts.require('ERC165MissingData');

var ERC165MaliciousData = artifacts.require('ERC165MaliciousData');

var ERC165NotSupported = artifacts.require('ERC165NotSupported');

var ERC165InterfacesSupported = artifacts.require('ERC165InterfacesSupported');

var ERC165ReturnBombMock = artifacts.require('ERC165ReturnBombMock');

var DUMMY_ID = '0xdeadbeef';
var DUMMY_ID_2 = '0xcafebabe';
var DUMMY_ID_3 = '0xdecafbad';
var DUMMY_UNSUPPORTED_ID = '0xbaddcafe';
var DUMMY_UNSUPPORTED_ID_2 = '0xbaadcafe';
var DUMMY_ACCOUNT = '0x1111111111111111111111111111111111111111';
contract('ERC165Checker', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(ERC165CheckerMock["new"]());

          case 2:
            this.mock = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  context('ERC165 missing return data', function () {
    beforeEach(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(ERC165MissingData["new"]());

            case 2:
              this.target = _context2.sent;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('does not support ERC165', function _callee3() {
      var supported;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165(this.target.address));

            case 2:
              supported = _context3.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsInterface', function _callee4() {
      var supported;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsInterface(this.target.address, DUMMY_ID));

            case 2:
              supported = _context4.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsAllInterfaces', function _callee5() {
      var supported;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context5.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via getSupportedInterfaces', function _callee6() {
      var supported;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context6.sent;
              expect(supported.length).to.equal(1);
              expect(supported[0]).to.equal(false);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsERC165InterfaceUnchecked', function _callee7() {
      var supported;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165InterfaceUnchecked(this.target.address, DUMMY_ID));

            case 2:
              supported = _context7.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
  });
  context('ERC165 malicious return data', function () {
    beforeEach(function _callee8() {
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(ERC165MaliciousData["new"]());

            case 2:
              this.target = _context8.sent;

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('does not support ERC165', function _callee9() {
      var supported;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165(this.target.address));

            case 2:
              supported = _context9.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsInterface', function _callee10() {
      var supported;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsInterface(this.target.address, DUMMY_ID));

            case 2:
              supported = _context10.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsAllInterfaces', function _callee11() {
      var supported;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context11.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via getSupportedInterfaces', function _callee12() {
      var supported;
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context12.sent;
              expect(supported.length).to.equal(1);
              expect(supported[0]).to.equal(false);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsERC165InterfaceUnchecked', function _callee13() {
      var supported;
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165InterfaceUnchecked(this.target.address, DUMMY_ID));

            case 2:
              supported = _context13.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    });
  });
  context('ERC165 not supported', function () {
    beforeEach(function _callee14() {
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(ERC165NotSupported["new"]());

            case 2:
              this.target = _context14.sent;

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    });
    it('does not support ERC165', function _callee15() {
      var supported;
      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165(this.target.address));

            case 2:
              supported = _context15.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsInterface', function _callee16() {
      var supported;
      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsInterface(this.target.address, DUMMY_ID));

            case 2:
              supported = _context16.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsAllInterfaces', function _callee17() {
      var supported;
      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context17.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via getSupportedInterfaces', function _callee18() {
      var supported;
      return regeneratorRuntime.async(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context18.sent;
              expect(supported.length).to.equal(1);
              expect(supported[0]).to.equal(false);

            case 5:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsERC165InterfaceUnchecked', function _callee19() {
      var supported;
      return regeneratorRuntime.async(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165InterfaceUnchecked(this.target.address, DUMMY_ID));

            case 2:
              supported = _context19.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, null, this);
    });
  });
  context('ERC165 supported', function () {
    beforeEach(function _callee20() {
      return regeneratorRuntime.async(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return regeneratorRuntime.awrap(ERC165InterfacesSupported["new"]([]));

            case 2:
              this.target = _context20.sent;

            case 3:
            case "end":
              return _context20.stop();
          }
        }
      }, null, this);
    });
    it('supports ERC165', function _callee21() {
      var supported;
      return regeneratorRuntime.async(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165(this.target.address));

            case 2:
              supported = _context21.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context21.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsInterface', function _callee22() {
      var supported;
      return regeneratorRuntime.async(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsInterface(this.target.address, DUMMY_ID));

            case 2:
              supported = _context22.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context22.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsAllInterfaces', function _callee23() {
      var supported;
      return regeneratorRuntime.async(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context23.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via getSupportedInterfaces', function _callee24() {
      var supported;
      return regeneratorRuntime.async(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context24.sent;
              expect(supported.length).to.equal(1);
              expect(supported[0]).to.equal(false);

            case 5:
            case "end":
              return _context24.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsERC165InterfaceUnchecked', function _callee25() {
      var supported;
      return regeneratorRuntime.async(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165InterfaceUnchecked(this.target.address, DUMMY_ID));

            case 2:
              supported = _context25.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context25.stop();
          }
        }
      }, null, this);
    });
  });
  context('ERC165 and single interface supported', function () {
    beforeEach(function _callee26() {
      return regeneratorRuntime.async(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(ERC165InterfacesSupported["new"]([DUMMY_ID]));

            case 2:
              this.target = _context26.sent;

            case 3:
            case "end":
              return _context26.stop();
          }
        }
      }, null, this);
    });
    it('supports ERC165', function _callee27() {
      var supported;
      return regeneratorRuntime.async(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165(this.target.address));

            case 2:
              supported = _context27.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context27.stop();
          }
        }
      }, null, this);
    });
    it('supports mock interface via supportsInterface', function _callee28() {
      var supported;
      return regeneratorRuntime.async(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsInterface(this.target.address, DUMMY_ID));

            case 2:
              supported = _context28.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context28.stop();
          }
        }
      }, null, this);
    });
    it('supports mock interface via supportsAllInterfaces', function _callee29() {
      var supported;
      return regeneratorRuntime.async(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context29.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context29.stop();
          }
        }
      }, null, this);
    });
    it('supports mock interface via getSupportedInterfaces', function _callee30() {
      var supported;
      return regeneratorRuntime.async(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.next = 2;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, [DUMMY_ID]));

            case 2:
              supported = _context30.sent;
              expect(supported.length).to.equal(1);
              expect(supported[0]).to.equal(true);

            case 5:
            case "end":
              return _context30.stop();
          }
        }
      }, null, this);
    });
    it('supports mock interface via supportsERC165InterfaceUnchecked', function _callee31() {
      var supported;
      return regeneratorRuntime.async(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165InterfaceUnchecked(this.target.address, DUMMY_ID));

            case 2:
              supported = _context31.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context31.stop();
          }
        }
      }, null, this);
    });
  });
  context('ERC165 and many interfaces supported', function () {
    beforeEach(function _callee32() {
      return regeneratorRuntime.async(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              this.supportedInterfaces = [DUMMY_ID, DUMMY_ID_2, DUMMY_ID_3];
              _context32.next = 3;
              return regeneratorRuntime.awrap(ERC165InterfacesSupported["new"](this.supportedInterfaces));

            case 3:
              this.target = _context32.sent;

            case 4:
            case "end":
              return _context32.stop();
          }
        }
      }, null, this);
    });
    it('supports ERC165', function _callee33() {
      var supported;
      return regeneratorRuntime.async(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165(this.target.address));

            case 2:
              supported = _context33.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context33.stop();
          }
        }
      }, null, this);
    });
    it('supports each interfaceId via supportsInterface', function _callee34() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, interfaceId, supported;

      return regeneratorRuntime.async(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context34.prev = 3;
              _iterator = this.supportedInterfaces[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context34.next = 14;
                break;
              }

              interfaceId = _step.value;
              _context34.next = 9;
              return regeneratorRuntime.awrap(this.mock.supportsInterface(this.target.address, interfaceId));

            case 9:
              supported = _context34.sent;
              expect(supported).to.equal(true);

            case 11:
              _iteratorNormalCompletion = true;
              _context34.next = 5;
              break;

            case 14:
              _context34.next = 20;
              break;

            case 16:
              _context34.prev = 16;
              _context34.t0 = _context34["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context34.t0;

            case 20:
              _context34.prev = 20;
              _context34.prev = 21;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 23:
              _context34.prev = 23;

              if (!_didIteratorError) {
                _context34.next = 26;
                break;
              }

              throw _iteratorError;

            case 26:
              return _context34.finish(23);

            case 27:
              return _context34.finish(20);

            case 28:
              ;

            case 29:
            case "end":
              return _context34.stop();
          }
        }
      }, null, this, [[3, 16, 20, 28], [21,, 23, 27]]);
    });
    it('supports all interfaceIds via supportsAllInterfaces', function _callee35() {
      var supported;
      return regeneratorRuntime.async(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, this.supportedInterfaces));

            case 2:
              supported = _context35.sent;
              expect(supported).to.equal(true);

            case 4:
            case "end":
              return _context35.stop();
          }
        }
      }, null, this);
    });
    it('supports none of the interfaces queried via supportsAllInterfaces', function _callee36() {
      var interfaceIdsToTest, supported;
      return regeneratorRuntime.async(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              interfaceIdsToTest = [DUMMY_UNSUPPORTED_ID, DUMMY_UNSUPPORTED_ID_2];
              _context36.next = 3;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, interfaceIdsToTest));

            case 3:
              supported = _context36.sent;
              expect(supported).to.equal(false);

            case 5:
            case "end":
              return _context36.stop();
          }
        }
      }, null, this);
    });
    it('supports not all of the interfaces queried via supportsAllInterfaces', function _callee37() {
      var interfaceIdsToTest, supported;
      return regeneratorRuntime.async(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              interfaceIdsToTest = [].concat(_toConsumableArray(this.supportedInterfaces), [DUMMY_UNSUPPORTED_ID]);
              _context37.next = 3;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(this.target.address, interfaceIdsToTest));

            case 3:
              supported = _context37.sent;
              expect(supported).to.equal(false);

            case 5:
            case "end":
              return _context37.stop();
          }
        }
      }, null, this);
    });
    it('supports all interfaceIds via getSupportedInterfaces', function _callee38() {
      var supported;
      return regeneratorRuntime.async(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              _context38.next = 2;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, this.supportedInterfaces));

            case 2:
              supported = _context38.sent;
              expect(supported.length).to.equal(3);
              expect(supported[0]).to.equal(true);
              expect(supported[1]).to.equal(true);
              expect(supported[2]).to.equal(true);

            case 7:
            case "end":
              return _context38.stop();
          }
        }
      }, null, this);
    });
    it('supports none of the interfaces queried via getSupportedInterfaces', function _callee39() {
      var interfaceIdsToTest, supported;
      return regeneratorRuntime.async(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              interfaceIdsToTest = [DUMMY_UNSUPPORTED_ID, DUMMY_UNSUPPORTED_ID_2];
              _context39.next = 3;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, interfaceIdsToTest));

            case 3:
              supported = _context39.sent;
              expect(supported.length).to.equal(2);
              expect(supported[0]).to.equal(false);
              expect(supported[1]).to.equal(false);

            case 7:
            case "end":
              return _context39.stop();
          }
        }
      }, null, this);
    });
    it('supports not all of the interfaces queried via getSupportedInterfaces', function _callee40() {
      var interfaceIdsToTest, supported;
      return regeneratorRuntime.async(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              interfaceIdsToTest = [].concat(_toConsumableArray(this.supportedInterfaces), [DUMMY_UNSUPPORTED_ID]);
              _context40.next = 3;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(this.target.address, interfaceIdsToTest));

            case 3:
              supported = _context40.sent;
              expect(supported.length).to.equal(4);
              expect(supported[0]).to.equal(true);
              expect(supported[1]).to.equal(true);
              expect(supported[2]).to.equal(true);
              expect(supported[3]).to.equal(false);

            case 9:
            case "end":
              return _context40.stop();
          }
        }
      }, null, this);
    });
    it('supports each interfaceId via supportsERC165InterfaceUnchecked', function _callee41() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, interfaceId, supported;

      return regeneratorRuntime.async(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context41.prev = 3;
              _iterator2 = this.supportedInterfaces[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context41.next = 14;
                break;
              }

              interfaceId = _step2.value;
              _context41.next = 9;
              return regeneratorRuntime.awrap(this.mock.supportsERC165InterfaceUnchecked(this.target.address, interfaceId));

            case 9:
              supported = _context41.sent;
              expect(supported).to.equal(true);

            case 11:
              _iteratorNormalCompletion2 = true;
              _context41.next = 5;
              break;

            case 14:
              _context41.next = 20;
              break;

            case 16:
              _context41.prev = 16;
              _context41.t0 = _context41["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context41.t0;

            case 20:
              _context41.prev = 20;
              _context41.prev = 21;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 23:
              _context41.prev = 23;

              if (!_didIteratorError2) {
                _context41.next = 26;
                break;
              }

              throw _iteratorError2;

            case 26:
              return _context41.finish(23);

            case 27:
              return _context41.finish(20);

            case 28:
              ;

            case 29:
            case "end":
              return _context41.stop();
          }
        }
      }, null, this, [[3, 16, 20, 28], [21,, 23, 27]]);
    });
  });
  context('account address does not support ERC165', function () {
    it('does not support ERC165', function _callee42() {
      var supported;
      return regeneratorRuntime.async(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              _context42.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165(DUMMY_ACCOUNT));

            case 2:
              supported = _context42.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context42.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsInterface', function _callee43() {
      var supported;
      return regeneratorRuntime.async(function _callee43$(_context43) {
        while (1) {
          switch (_context43.prev = _context43.next) {
            case 0:
              _context43.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsInterface(DUMMY_ACCOUNT, DUMMY_ID));

            case 2:
              supported = _context43.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context43.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsAllInterfaces', function _callee44() {
      var supported;
      return regeneratorRuntime.async(function _callee44$(_context44) {
        while (1) {
          switch (_context44.prev = _context44.next) {
            case 0:
              _context44.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsAllInterfaces(DUMMY_ACCOUNT, [DUMMY_ID]));

            case 2:
              supported = _context44.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context44.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via getSupportedInterfaces', function _callee45() {
      var supported;
      return regeneratorRuntime.async(function _callee45$(_context45) {
        while (1) {
          switch (_context45.prev = _context45.next) {
            case 0:
              _context45.next = 2;
              return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces(DUMMY_ACCOUNT, [DUMMY_ID]));

            case 2:
              supported = _context45.sent;
              expect(supported.length).to.equal(1);
              expect(supported[0]).to.equal(false);

            case 5:
            case "end":
              return _context45.stop();
          }
        }
      }, null, this);
    });
    it('does not support mock interface via supportsERC165InterfaceUnchecked', function _callee46() {
      var supported;
      return regeneratorRuntime.async(function _callee46$(_context46) {
        while (1) {
          switch (_context46.prev = _context46.next) {
            case 0:
              _context46.next = 2;
              return regeneratorRuntime.awrap(this.mock.supportsERC165InterfaceUnchecked(DUMMY_ACCOUNT, DUMMY_ID));

            case 2:
              supported = _context46.sent;
              expect(supported).to.equal(false);

            case 4:
            case "end":
              return _context46.stop();
          }
        }
      }, null, this);
    });
  });
  it('Return bomb resistance', function _callee47() {
    var tx1, tx2;
    return regeneratorRuntime.async(function _callee47$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            _context47.next = 2;
            return regeneratorRuntime.awrap(ERC165ReturnBombMock["new"]());

          case 2:
            this.target = _context47.sent;
            _context47.next = 5;
            return regeneratorRuntime.awrap(this.mock.supportsInterface.sendTransaction(this.target.address, DUMMY_ID));

          case 5:
            tx1 = _context47.sent;
            expect(tx1.receipt.gasUsed).to.be.lessThan(120000); // 3*30k + 21k + some margin

            _context47.next = 9;
            return regeneratorRuntime.awrap(this.mock.getSupportedInterfaces.sendTransaction(this.target.address, [DUMMY_ID, DUMMY_ID_2, DUMMY_ID_3, DUMMY_UNSUPPORTED_ID, DUMMY_UNSUPPORTED_ID_2]));

          case 9:
            tx2 = _context47.sent;
            expect(tx2.receipt.gasUsed).to.be.lessThan(250000); // (2+5)*30k + 21k + some margin

          case 11:
          case "end":
            return _context47.stop();
        }
      }
    }, null, this);
  });
});