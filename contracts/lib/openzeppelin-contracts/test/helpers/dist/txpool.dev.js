"use strict";

var _require = require('hardhat'),
    network = _require.network;

var _require2 = require('util'),
    promisify = _require2.promisify;

var queue = promisify(setImmediate);

function countPendingTransactions() {
  return regeneratorRuntime.async(function countPendingTransactions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = parseInt;
          _context.next = 3;
          return regeneratorRuntime.awrap(network.provider.send('eth_getBlockTransactionCountByNumber', ['pending']));

        case 3:
          _context.t1 = _context.sent;
          return _context.abrupt("return", (0, _context.t0)(_context.t1));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function batchInBlock(txs) {
  var promises, receipts, minedBlocks;
  return regeneratorRuntime.async(function batchInBlock$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(network.provider.send('evm_setAutomine', [false]));

        case 3:
          // send all transactions
          promises = txs.map(function (fn) {
            return fn();
          }); // wait for node to have all pending transactions

        case 4:
          _context2.t0 = txs.length;
          _context2.next = 7;
          return regeneratorRuntime.awrap(countPendingTransactions());

        case 7:
          _context2.t1 = _context2.sent;

          if (!(_context2.t0 > _context2.t1)) {
            _context2.next = 13;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(queue());

        case 11:
          _context2.next = 4;
          break;

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(network.provider.send('evm_mine'));

        case 15:
          _context2.next = 17;
          return regeneratorRuntime.awrap(Promise.all(promises));

        case 17:
          receipts = _context2.sent;
          // Sanity check, all tx should be in the same block
          minedBlocks = new Set(receipts.map(function (_ref) {
            var receipt = _ref.receipt;
            return receipt.blockNumber;
          }));
          expect(minedBlocks.size).to.equal(1);
          return _context2.abrupt("return", receipts);

        case 21:
          _context2.prev = 21;
          _context2.next = 24;
          return regeneratorRuntime.awrap(network.provider.send('evm_setAutomine', [true]));

        case 24:
          return _context2.finish(21);

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0,, 21, 25]]);
}

module.exports = {
  countPendingTransactions: countPendingTransactions,
  batchInBlock: batchInBlock
};