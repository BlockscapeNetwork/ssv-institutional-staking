// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {EthAlloc} from "src/EthAlloc.sol";

contract EthAllocatorScript is Script {

    EthAlloc ethAlloc;
    
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        ethAlloc = new EthAlloc(0xFEB98861425C6d2819c0d0Ee70E45AbcF71b43Da);
        ethAlloc.openPubPool();
        vm.stopBroadcast();

    }
}
