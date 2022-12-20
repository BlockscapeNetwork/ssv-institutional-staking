// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.15;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {EthAlloc} from "src/EthAlloc.sol";

contract EthAllocTest is Test {
    uint256 testNumber;
    EthAlloc ethAlloc;
    address internal deployer;
    address internal singleStaker;
    address internal poolStaker1;
    address internal poolStaker2;
    address internal poolStaker3;
    address internal poolStaker4;
    address internal poolStaker5;

    function setUp() public {
        testNumber = 42;

        deployer = vm.addr(0xDe);
        vm.deal(deployer, 100 ether);
        vm.label(deployer, "deployer");
        vm.prank(deployer);
        ethAlloc = new EthAlloc(address(0));

        singleStaker = vm.addr(0xDe0);
        vm.deal(singleStaker, 100 ether);
        vm.label(singleStaker, "singleStaker");

        poolStaker1 = vm.addr(0xDe1);
        vm.deal(poolStaker1, 100 ether);
        vm.label(poolStaker1, "poolStaker1");

        poolStaker2 = vm.addr(0xDe2);
        vm.deal(poolStaker2, 100 ether);
        vm.label(poolStaker2, "poolStaker2");

        poolStaker3 = vm.addr(0xDe3);
        vm.deal(poolStaker3, 100 ether);
        vm.label(poolStaker3, "poolStaker3");

        poolStaker4 = vm.addr(0xDe4);
        vm.deal(poolStaker4, 100 ether);
        vm.label(poolStaker4, "poolStaker4");

        poolStaker5 = vm.addr(0xDe5);
        vm.deal(poolStaker5, 100 ether);
        vm.label(poolStaker5, "poolStaker5");

        //open public pool
        vm.prank(deployer);
        ethAlloc.openPubPool();
    }

    // positive testcases
    function testNumberIs42() public {
        assertEq(testNumber, 42);
    }
    
    function testRandomsCanCreatePubPoolAndWithdraw() public {
        vm.prank(poolStaker1);
        ethAlloc.depositEthKYB{value: 1 ether}();
        assertEq(ethAlloc.getBalance(), 1 ether);

        vm.prank(poolStaker2);
        ethAlloc.depositEthKYB{value: 1.5 ether}();
        assertEq(ethAlloc.getBalance(), 2.5 ether);

        vm.prank(poolStaker3);
        ethAlloc.depositEthKYB{value: 13.5 ether}();

        vm.prank(poolStaker4);
        ethAlloc.depositEthKYB{value: 16 ether}();

        console.logUint(ethAlloc.getBalance());
        assertEq(ethAlloc.getBalance(), 32 ether);

        vm.prank(deployer);
        ethAlloc.withdrawBatch();

        assertEq(ethAlloc.getBalance(), 0 ether);
    }

    function testOneRandomCanCreatePubPoolAndAutoWithdraw() public {
        vm.prank(poolStaker1);
        ethAlloc.depositEthKYB{value: 32 ether}();
        //console.logUint(ethAlloc.getBalance());
        assertEq(ethAlloc.getBalance(), 32 ether);

        vm.prank(deployer);
        ethAlloc.withdrawBatch();

        assertEq(ethAlloc.getBalance(), 0 ether);
    }
}
