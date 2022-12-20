// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/Script.sol";
import {InstSta} from "../src/InstSta.sol";

contract InstStaScript is Script {
    InstSta instSta;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_NORMI");
        vm.startBroadcast(deployerPrivateKey);
        instSta = new InstSta(
            0xFEB98861425C6d2819c0d0Ee70E45AbcF71b43Da,
            0x9D65fF81a3c488d585bBfb0Bfe3c7707c7917f54,
            address(0),
            0x00000000219ab540356cBB839Cbe05303d7705Fa
        );
        vm.stopBroadcast();
    }
}
