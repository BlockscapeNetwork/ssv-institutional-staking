"use strict";

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(indentEach);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function formatLines() {
  for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
    lines[_key] = arguments[_key];
  }

  return _toConsumableArray(indentEach(0, lines)).join('\n') + '\n';
}

function indentEach(indent, lines) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line;

  return regeneratorRuntime.wrap(function indentEach$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 3;
          _iterator = lines[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 15;
            break;
          }

          line = _step.value;

          if (!Array.isArray(line)) {
            _context2.next = 11;
            break;
          }

          return _context2.delegateYield(indentEach(indent + 1, line), "t0", 9);

        case 9:
          _context2.next = 12;
          break;

        case 11:
          return _context2.delegateYield(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var padding;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    padding = '    '.repeat(indent);
                    return _context.delegateYield(line.split('\n').map(function (subline) {
                      return subline === '' ? '' : padding + subline;
                    }), "t0", 2);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })(), "t1", 12);

        case 12:
          _iteratorNormalCompletion = true;
          _context2.next = 5;
          break;

        case 15:
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t2 = _context2["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context2.t2;

        case 21:
          _context2.prev = 21;
          _context2.prev = 22;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 24:
          _context2.prev = 24;

          if (!_didIteratorError) {
            _context2.next = 27;
            break;
          }

          throw _iteratorError;

        case 27:
          return _context2.finish(24);

        case 28:
          return _context2.finish(21);

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked, null, [[3, 17, 21, 29], [22,, 24, 28]]);
}

module.exports = formatLines;