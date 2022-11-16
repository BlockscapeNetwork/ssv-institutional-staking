#!/usr/bin/env node
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('fs'),
    fs = _require.promises;

var path = require('path');

var pathUpdates = {
  // 'access/AccessControl.sol': undefined,
  // 'access/Ownable.sol': undefined,
  'access/TimelockController.sol': 'governance/TimelockController.sol',
  'cryptography/ECDSA.sol': 'utils/cryptography/ECDSA.sol',
  'cryptography/MerkleProof.sol': 'utils/cryptography/MerkleProof.sol',
  'drafts/EIP712.sol': 'utils/cryptography/EIP712.sol',
  'drafts/ERC20Permit.sol': 'token/ERC20/extensions/draft-ERC20Permit.sol',
  'drafts/IERC20Permit.sol': 'token/ERC20/extensions/draft-IERC20Permit.sol',
  'GSN/Context.sol': 'utils/Context.sol',
  // 'GSN/GSNRecipientERC20Fee.sol': undefined,
  // 'GSN/GSNRecipientSignature.sol': undefined,
  // 'GSN/GSNRecipient.sol': undefined,
  // 'GSN/IRelayHub.sol': undefined,
  // 'GSN/IRelayRecipient.sol': undefined,
  'introspection/ERC165Checker.sol': 'utils/introspection/ERC165Checker.sol',
  'introspection/ERC165.sol': 'utils/introspection/ERC165.sol',
  'introspection/ERC1820Implementer.sol': 'utils/introspection/ERC1820Implementer.sol',
  'introspection/IERC165.sol': 'utils/introspection/IERC165.sol',
  'introspection/IERC1820Implementer.sol': 'utils/introspection/IERC1820Implementer.sol',
  'introspection/IERC1820Registry.sol': 'utils/introspection/IERC1820Registry.sol',
  'math/Math.sol': 'utils/math/Math.sol',
  'math/SafeMath.sol': 'utils/math/SafeMath.sol',
  'math/SignedSafeMath.sol': 'utils/math/SignedSafeMath.sol',
  'payment/escrow/ConditionalEscrow.sol': 'utils/escrow/ConditionalEscrow.sol',
  'payment/escrow/Escrow.sol': 'utils/escrow/Escrow.sol',
  'payment/escrow/RefundEscrow.sol': 'utils/escrow/RefundEscrow.sol',
  'payment/PaymentSplitter.sol': 'finance/PaymentSplitter.sol',
  'utils/PaymentSplitter.sol': 'finance/PaymentSplitter.sol',
  'payment/PullPayment.sol': 'security/PullPayment.sol',
  'presets/ERC1155PresetMinterPauser.sol': 'token/ERC1155/presets/ERC1155PresetMinterPauser.sol',
  'presets/ERC20PresetFixedSupply.sol': 'token/ERC20/presets/ERC20PresetFixedSupply.sol',
  'presets/ERC20PresetMinterPauser.sol': 'token/ERC20/presets/ERC20PresetMinterPauser.sol',
  'presets/ERC721PresetMinterPauserAutoId.sol': 'token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol',
  'presets/ERC777PresetFixedSupply.sol': 'token/ERC777/presets/ERC777PresetFixedSupply.sol',
  'proxy/BeaconProxy.sol': 'proxy/beacon/BeaconProxy.sol',
  // 'proxy/Clones.sol': undefined,
  'proxy/IBeacon.sol': 'proxy/beacon/IBeacon.sol',
  'proxy/Initializable.sol': 'proxy/utils/Initializable.sol',
  'utils/Initializable.sol': 'proxy/utils/Initializable.sol',
  'proxy/ProxyAdmin.sol': 'proxy/transparent/ProxyAdmin.sol',
  // 'proxy/Proxy.sol': undefined,
  'proxy/TransparentUpgradeableProxy.sol': 'proxy/transparent/TransparentUpgradeableProxy.sol',
  'proxy/UpgradeableBeacon.sol': 'proxy/beacon/UpgradeableBeacon.sol',
  'proxy/UpgradeableProxy.sol': 'proxy/ERC1967/ERC1967Proxy.sol',
  'token/ERC1155/ERC1155Burnable.sol': 'token/ERC1155/extensions/ERC1155Burnable.sol',
  'token/ERC1155/ERC1155Holder.sol': 'token/ERC1155/utils/ERC1155Holder.sol',
  'token/ERC1155/ERC1155Pausable.sol': 'token/ERC1155/extensions/ERC1155Pausable.sol',
  'token/ERC1155/ERC1155Receiver.sol': 'token/ERC1155/utils/ERC1155Receiver.sol',
  // 'token/ERC1155/ERC1155.sol': undefined,
  'token/ERC1155/IERC1155MetadataURI.sol': 'token/ERC1155/extensions/IERC1155MetadataURI.sol',
  // 'token/ERC1155/IERC1155Receiver.sol': undefined,
  // 'token/ERC1155/IERC1155.sol': undefined,
  'token/ERC20/ERC20Burnable.sol': 'token/ERC20/extensions/ERC20Burnable.sol',
  'token/ERC20/ERC20Capped.sol': 'token/ERC20/extensions/ERC20Capped.sol',
  'token/ERC20/ERC20Pausable.sol': 'token/ERC20/extensions/ERC20Pausable.sol',
  'token/ERC20/ERC20Snapshot.sol': 'token/ERC20/extensions/ERC20Snapshot.sol',
  // 'token/ERC20/ERC20.sol': undefined,
  // 'token/ERC20/IERC20.sol': undefined,
  'token/ERC20/SafeERC20.sol': 'token/ERC20/utils/SafeERC20.sol',
  'token/ERC20/TokenTimelock.sol': 'token/ERC20/utils/TokenTimelock.sol',
  'token/ERC721/ERC721Burnable.sol': 'token/ERC721/extensions/ERC721Burnable.sol',
  'token/ERC721/ERC721Holder.sol': 'token/ERC721/utils/ERC721Holder.sol',
  'token/ERC721/ERC721Pausable.sol': 'token/ERC721/extensions/ERC721Pausable.sol',
  // 'token/ERC721/ERC721.sol': undefined,
  'token/ERC721/IERC721Enumerable.sol': 'token/ERC721/extensions/IERC721Enumerable.sol',
  'token/ERC721/IERC721Metadata.sol': 'token/ERC721/extensions/IERC721Metadata.sol',
  // 'token/ERC721/IERC721Receiver.sol': undefined,
  // 'token/ERC721/IERC721.sol': undefined,
  // 'token/ERC777/ERC777.sol': undefined,
  // 'token/ERC777/IERC777Recipient.sol': undefined,
  // 'token/ERC777/IERC777Sender.sol': undefined,
  // 'token/ERC777/IERC777.sol': undefined,
  // 'utils/Address.sol': undefined,
  // 'utils/Arrays.sol': undefined,
  // 'utils/Context.sol': undefined,
  // 'utils/Counters.sol': undefined,
  // 'utils/Create2.sol': undefined,
  'utils/EnumerableMap.sol': 'utils/structs/EnumerableMap.sol',
  'utils/EnumerableSet.sol': 'utils/structs/EnumerableSet.sol',
  'utils/Pausable.sol': 'security/Pausable.sol',
  'utils/ReentrancyGuard.sol': 'security/ReentrancyGuard.sol',
  'utils/SafeCast.sol': 'utils/math/SafeCast.sol' // 'utils/Strings.sol': undefined,

};

function main() {
  var paths,
      files,
      updatedFiles,
      _iteratorNormalCompletion,
      _didIteratorError,
      _iteratorError,
      _iterator,
      _step,
      file,
      _iteratorNormalCompletion2,
      _didIteratorError2,
      _iteratorError2,
      _iterator2,
      _step2,
      c,
      _args = arguments;

  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          paths = _args.length > 0 && _args[0] !== undefined ? _args[0] : ['contracts'];
          _context.next = 3;
          return regeneratorRuntime.awrap(listFilesRecursively(paths, /\.sol$/));

        case 3:
          files = _context.sent;
          updatedFiles = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 8;
          _iterator = files[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 19;
            break;
          }

          file = _step.value;
          _context.next = 14;
          return regeneratorRuntime.awrap(updateFile(file, updateImportPaths));

        case 14:
          if (!_context.sent) {
            _context.next = 16;
            break;
          }

          updatedFiles.push(file);

        case 16:
          _iteratorNormalCompletion = true;
          _context.next = 10;
          break;

        case 19:
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 25:
          _context.prev = 25;
          _context.prev = 26;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 28:
          _context.prev = 28;

          if (!_didIteratorError) {
            _context.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context.finish(28);

        case 32:
          return _context.finish(25);

        case 33:
          if (!(updatedFiles.length > 0)) {
            _context.next = 56;
            break;
          }

          console.log("".concat(updatedFiles.length, " file(s) were updated"));
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 38;

          for (_iterator2 = updatedFiles[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            c = _step2.value;
            console.log('-', c);
          }

          _context.next = 46;
          break;

        case 42:
          _context.prev = 42;
          _context.t1 = _context["catch"](38);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t1;

        case 46:
          _context.prev = 46;
          _context.prev = 47;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 49:
          _context.prev = 49;

          if (!_didIteratorError2) {
            _context.next = 52;
            break;
          }

          throw _iteratorError2;

        case 52:
          return _context.finish(49);

        case 53:
          return _context.finish(46);

        case 54:
          _context.next = 57;
          break;

        case 56:
          console.log('No files were updated');

        case 57:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 21, 25, 33], [26,, 28, 32], [38, 42, 46, 54], [47,, 49, 53]]);
}

function listFilesRecursively(paths, filter) {
  var queue, files, top, stat, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, name;

  return regeneratorRuntime.async(function listFilesRecursively$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          queue = paths;
          files = [];

        case 2:
          if (!(queue.length > 0)) {
            _context2.next = 42;
            break;
          }

          top = queue.shift();
          _context2.next = 6;
          return regeneratorRuntime.awrap(fs.stat(top));

        case 6:
          stat = _context2.sent;

          if (!stat.isFile()) {
            _context2.next = 11;
            break;
          }

          if (top.match(filter)) {
            files.push(top);
          }

          _context2.next = 40;
          break;

        case 11:
          if (!stat.isDirectory()) {
            _context2.next = 40;
            break;
          }

          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context2.prev = 15;
          _context2.next = 18;
          return regeneratorRuntime.awrap(fs.readdir(top));

        case 18:
          _context2.t0 = Symbol.iterator;
          _iterator3 = _context2.sent[_context2.t0]();

        case 20:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context2.next = 26;
            break;
          }

          name = _step3.value;
          queue.push(path.join(top, name));

        case 23:
          _iteratorNormalCompletion3 = true;
          _context2.next = 20;
          break;

        case 26:
          _context2.next = 32;
          break;

        case 28:
          _context2.prev = 28;
          _context2.t1 = _context2["catch"](15);
          _didIteratorError3 = true;
          _iteratorError3 = _context2.t1;

        case 32:
          _context2.prev = 32;
          _context2.prev = 33;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 35:
          _context2.prev = 35;

          if (!_didIteratorError3) {
            _context2.next = 38;
            break;
          }

          throw _iteratorError3;

        case 38:
          return _context2.finish(35);

        case 39:
          return _context2.finish(32);

        case 40:
          _context2.next = 2;
          break;

        case 42:
          return _context2.abrupt("return", files);

        case 43:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[15, 28, 32, 40], [33,, 35, 39]]);
}

function updateFile(file, update) {
  var content, updatedContent;
  return regeneratorRuntime.async(function updateFile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fs.readFile(file, 'utf8'));

        case 2:
          content = _context3.sent;
          updatedContent = update(content);

          if (!(updatedContent !== content)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(fs.writeFile(file, updatedContent));

        case 7:
          return _context3.abrupt("return", true);

        case 10:
          return _context3.abrupt("return", false);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function updateImportPaths(source) {
  for (var _i = 0, _Object$entries = Object.entries(pathUpdates); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        oldPath = _Object$entries$_i[0],
        newPath = _Object$entries$_i[1];

    source = source.replace(path.join('@openzeppelin/contracts', oldPath), path.join('@openzeppelin/contracts', newPath));
    source = source.replace(path.join('@openzeppelin/contracts-upgradeable', getUpgradeablePath(oldPath)), path.join('@openzeppelin/contracts-upgradeable', getUpgradeablePath(newPath)));
  }

  return source;
}

function getUpgradeablePath(file) {
  var _path$parse = path.parse(file),
      dir = _path$parse.dir,
      name = _path$parse.name,
      ext = _path$parse.ext;

  var upgradeableName = name + 'Upgradeable';
  return path.format({
    dir: dir,
    ext: ext,
    name: upgradeableName
  });
}

module.exports = {
  pathUpdates: pathUpdates,
  updateImportPaths: updateImportPaths,
  getUpgradeablePath: getUpgradeablePath
};

if (require.main === module) {
  var args = process.argv.length > 2 ? process.argv.slice(2) : undefined;
  main(args)["catch"](function (e) {
    console.error(e);
    process.exit(1);
  });
}