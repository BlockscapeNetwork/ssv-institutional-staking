"use strict";

require('@openzeppelin/test-helpers');

var _require = require('@openzeppelin/test-helpers'),
    expectRevert = _require.expectRevert;

var _require2 = require('merkletreejs'),
    MerkleTree = _require2.MerkleTree;

var keccak256 = require('keccak256');

var _require3 = require('chai'),
    expect = _require3.expect;

var MerkleProofWrapper = artifacts.require('MerkleProofWrapper');

contract('MerkleProof', function (accounts) {
  beforeEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(MerkleProofWrapper["new"]());

          case 2:
            this.merkleProof = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  });
  describe('verify', function () {
    it('returns true for a valid Merkle proof', function _callee2() {
      var elements, merkleTree, root, leaf, proof, noSuchLeaf;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              elements = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('');
              merkleTree = new MerkleTree(elements, keccak256, {
                hashLeaves: true,
                sortPairs: true
              });
              root = merkleTree.getHexRoot();
              leaf = keccak256(elements[0]);
              proof = merkleTree.getHexProof(leaf);
              _context2.t0 = expect;
              _context2.next = 8;
              return regeneratorRuntime.awrap(this.merkleProof.verify(proof, root, leaf));

            case 8:
              _context2.t1 = _context2.sent;
              (0, _context2.t0)(_context2.t1).to.equal(true);
              _context2.t2 = expect;
              _context2.next = 13;
              return regeneratorRuntime.awrap(this.merkleProof.verifyCalldata(proof, root, leaf));

            case 13:
              _context2.t3 = _context2.sent;
              (0, _context2.t2)(_context2.t3).to.equal(true);
              // For demonstration, it is also possible to create valid proofs for certain 64-byte values *not* in elements:
              noSuchLeaf = keccak256(Buffer.concat([keccak256(elements[0]), keccak256(elements[1])].sort(Buffer.compare)));
              _context2.t4 = expect;
              _context2.next = 19;
              return regeneratorRuntime.awrap(this.merkleProof.verify(proof.slice(1), root, noSuchLeaf));

            case 19:
              _context2.t5 = _context2.sent;
              (0, _context2.t4)(_context2.t5).to.equal(true);
              _context2.t6 = expect;
              _context2.next = 24;
              return regeneratorRuntime.awrap(this.merkleProof.verifyCalldata(proof.slice(1), root, noSuchLeaf));

            case 24:
              _context2.t7 = _context2.sent;
              (0, _context2.t6)(_context2.t7).to.equal(true);

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    });
    it('returns false for an invalid Merkle proof', function _callee3() {
      var correctElements, correctMerkleTree, correctRoot, correctLeaf, badElements, badMerkleTree, badProof;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              correctElements = ['a', 'b', 'c'];
              correctMerkleTree = new MerkleTree(correctElements, keccak256, {
                hashLeaves: true,
                sortPairs: true
              });
              correctRoot = correctMerkleTree.getHexRoot();
              correctLeaf = keccak256(correctElements[0]);
              badElements = ['d', 'e', 'f'];
              badMerkleTree = new MerkleTree(badElements);
              badProof = badMerkleTree.getHexProof(badElements[0]);
              _context3.t0 = expect;
              _context3.next = 10;
              return regeneratorRuntime.awrap(this.merkleProof.verify(badProof, correctRoot, correctLeaf));

            case 10:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1).to.equal(false);
              _context3.t2 = expect;
              _context3.next = 15;
              return regeneratorRuntime.awrap(this.merkleProof.verifyCalldata(badProof, correctRoot, correctLeaf));

            case 15:
              _context3.t3 = _context3.sent;
              (0, _context3.t2)(_context3.t3).to.equal(false);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    });
    it('returns false for a Merkle proof of invalid length', function _callee4() {
      var elements, merkleTree, root, leaf, proof, badProof;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              elements = ['a', 'b', 'c'];
              merkleTree = new MerkleTree(elements, keccak256, {
                hashLeaves: true,
                sortPairs: true
              });
              root = merkleTree.getHexRoot();
              leaf = keccak256(elements[0]);
              proof = merkleTree.getHexProof(leaf);
              badProof = proof.slice(0, proof.length - 5);
              _context4.t0 = expect;
              _context4.next = 9;
              return regeneratorRuntime.awrap(this.merkleProof.verify(badProof, root, leaf));

            case 9:
              _context4.t1 = _context4.sent;
              (0, _context4.t0)(_context4.t1).to.equal(false);
              _context4.t2 = expect;
              _context4.next = 14;
              return regeneratorRuntime.awrap(this.merkleProof.verifyCalldata(badProof, root, leaf));

            case 14:
              _context4.t3 = _context4.sent;
              (0, _context4.t2)(_context4.t3).to.equal(false);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    });
  });
  describe('multiProofVerify', function () {
    it('returns true for a valid Merkle multi proof', function _callee5() {
      var leaves, merkleTree, root, proofLeaves, proof, proofFlags;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              leaves = ['a', 'b', 'c', 'd', 'e', 'f'].map(keccak256).sort(Buffer.compare);
              merkleTree = new MerkleTree(leaves, keccak256, {
                sort: true
              });
              root = merkleTree.getRoot();
              proofLeaves = ['b', 'f', 'd'].map(keccak256).sort(Buffer.compare);
              proof = merkleTree.getMultiProof(proofLeaves);
              proofFlags = merkleTree.getProofFlags(proofLeaves, proof);
              _context5.t0 = expect;
              _context5.next = 9;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerify(proof, proofFlags, root, proofLeaves));

            case 9:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1).to.equal(true);
              _context5.t2 = expect;
              _context5.next = 14;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerifyCalldata(proof, proofFlags, root, proofLeaves));

            case 14:
              _context5.t3 = _context5.sent;
              (0, _context5.t2)(_context5.t3).to.equal(true);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    });
    it('returns false for an invalid Merkle multi proof', function _callee6() {
      var leaves, merkleTree, root, badProofLeaves, badMerkleTree, badProof, badProofFlags;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              leaves = ['a', 'b', 'c', 'd', 'e', 'f'].map(keccak256).sort(Buffer.compare);
              merkleTree = new MerkleTree(leaves, keccak256, {
                sort: true
              });
              root = merkleTree.getRoot();
              badProofLeaves = ['g', 'h', 'i'].map(keccak256).sort(Buffer.compare);
              badMerkleTree = new MerkleTree(badProofLeaves);
              badProof = badMerkleTree.getMultiProof(badProofLeaves);
              badProofFlags = badMerkleTree.getProofFlags(badProofLeaves, badProof);
              _context6.t0 = expect;
              _context6.next = 10;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerify(badProof, badProofFlags, root, badProofLeaves));

            case 10:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1).to.equal(false);
              _context6.t2 = expect;
              _context6.next = 15;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerifyCalldata(badProof, badProofFlags, root, badProofLeaves));

            case 15:
              _context6.t3 = _context6.sent;
              (0, _context6.t2)(_context6.t3).to.equal(false);

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    });
    it('revert with invalid multi proof #1', function _callee7() {
      var fill, leaves, badLeaf, merkleTree, root;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              fill = Buffer.alloc(32); // This could be anything, we are reconstructing a fake branch

              leaves = ['a', 'b', 'c', 'd'].map(keccak256).sort(Buffer.compare);
              badLeaf = keccak256('e');
              merkleTree = new MerkleTree(leaves, keccak256, {
                sort: true
              });
              root = merkleTree.getRoot();
              _context7.next = 7;
              return regeneratorRuntime.awrap(expectRevert(this.merkleProof.multiProofVerify([leaves[1], fill, merkleTree.layers[1][1]], [false, false, false], root, [leaves[0], badLeaf] // A, E
              ), 'MerkleProof: invalid multiproof'));

            case 7:
              _context7.next = 9;
              return regeneratorRuntime.awrap(expectRevert(this.merkleProof.multiProofVerifyCalldata([leaves[1], fill, merkleTree.layers[1][1]], [false, false, false], root, [leaves[0], badLeaf] // A, E
              ), 'MerkleProof: invalid multiproof'));

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    });
    it('revert with invalid multi proof #2', function _callee8() {
      var fill, leaves, badLeaf, merkleTree, root;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              fill = Buffer.alloc(32); // This could be anything, we are reconstructing a fake branch

              leaves = ['a', 'b', 'c', 'd'].map(keccak256).sort(Buffer.compare);
              badLeaf = keccak256('e');
              merkleTree = new MerkleTree(leaves, keccak256, {
                sort: true
              });
              root = merkleTree.getRoot();
              _context8.next = 7;
              return regeneratorRuntime.awrap(expectRevert(this.merkleProof.multiProofVerify([leaves[1], fill, merkleTree.layers[1][1]], [false, false, false, false], root, [badLeaf, leaves[0]] // A, E
              ), 'reverted with panic code 0x32'));

            case 7:
              _context8.next = 9;
              return regeneratorRuntime.awrap(expectRevert(this.merkleProof.multiProofVerifyCalldata([leaves[1], fill, merkleTree.layers[1][1]], [false, false, false, false], root, [badLeaf, leaves[0]] // A, E
              ), 'reverted with panic code 0x32'));

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    });
    it('limit case: works for tree containing a single leaf', function _callee9() {
      var leaves, merkleTree, root, proofLeaves, proof, proofFlags;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              leaves = ['a'].map(keccak256).sort(Buffer.compare);
              merkleTree = new MerkleTree(leaves, keccak256, {
                sort: true
              });
              root = merkleTree.getRoot();
              proofLeaves = ['a'].map(keccak256).sort(Buffer.compare);
              proof = merkleTree.getMultiProof(proofLeaves);
              proofFlags = merkleTree.getProofFlags(proofLeaves, proof);
              _context9.t0 = expect;
              _context9.next = 9;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerify(proof, proofFlags, root, proofLeaves));

            case 9:
              _context9.t1 = _context9.sent;
              (0, _context9.t0)(_context9.t1).to.equal(true);
              _context9.t2 = expect;
              _context9.next = 14;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerifyCalldata(proof, proofFlags, root, proofLeaves));

            case 14:
              _context9.t3 = _context9.sent;
              (0, _context9.t2)(_context9.t3).to.equal(true);

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    });
    it('limit case: can prove empty leaves', function _callee10() {
      var leaves, merkleTree, root;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              leaves = ['a', 'b', 'c', 'd'].map(keccak256).sort(Buffer.compare);
              merkleTree = new MerkleTree(leaves, keccak256, {
                sort: true
              });
              root = merkleTree.getRoot();
              _context10.t0 = expect;
              _context10.next = 6;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerify([root], [], root, []));

            case 6:
              _context10.t1 = _context10.sent;
              (0, _context10.t0)(_context10.t1).to.equal(true);
              _context10.t2 = expect;
              _context10.next = 11;
              return regeneratorRuntime.awrap(this.merkleProof.multiProofVerifyCalldata([root], [], root, []));

            case 11:
              _context10.t3 = _context10.sent;
              (0, _context10.t2)(_context10.t3).to.equal(true);

            case 13:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    });
  });
});