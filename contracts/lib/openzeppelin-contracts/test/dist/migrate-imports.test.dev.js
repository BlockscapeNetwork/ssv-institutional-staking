"use strict";

var path = require('path');

var _require = require('fs'),
    fs = _require.promises,
    F_OK = _require.constants.F_OK;

var _require2 = require('chai'),
    expect = _require2.expect;

var _require3 = require('../scripts/migrate-imports.js'),
    pathUpdates = _require3.pathUpdates,
    updateImportPaths = _require3.updateImportPaths,
    getUpgradeablePath = _require3.getUpgradeablePath;

describe('migrate-imports.js', function () {
  it('every new path exists', function _callee() {
    var _i, _Object$values, p;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _i = 0, _Object$values = Object.values(pathUpdates);

          case 1:
            if (!(_i < _Object$values.length)) {
              _context.next = 15;
              break;
            }

            p = _Object$values[_i];
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(fs.access(path.join('contracts', p), F_OK));

          case 6:
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](3);
            _context.next = 12;
            return regeneratorRuntime.awrap(fs.access(path.join('contracts', getUpgradeablePath(p)), F_OK));

          case 12:
            _i++;
            _context.next = 1;
            break;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 8]]);
  });
  it('replaces import paths in a file', function _callee2() {
    var source, expected;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            source = "\nimport '@openzeppelin/contracts/math/Math.sol';\nimport '@openzeppelin/contracts-upgradeable/math/MathUpgradeable.sol';\n    ";
            expected = "\nimport '@openzeppelin/contracts/utils/math/Math.sol';\nimport '@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol';\n    ";
            expect(updateImportPaths(source)).to.equal(expected);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});