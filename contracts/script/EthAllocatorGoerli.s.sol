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
        ethAlloc = new EthAlloc(0x5C6b81212c0A654B6e247F8DEfeC9a95c63EF954);
        ethAlloc.openPubPool();
        vm.stopBroadcast();

    }
}
