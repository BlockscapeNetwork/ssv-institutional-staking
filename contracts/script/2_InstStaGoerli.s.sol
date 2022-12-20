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
            0x5C6b81212c0A654B6e247F8DEfeC9a95c63EF954,
            0x3a9f01091C446bdE031E39ea8354647AFef091E7,
            0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04,
            0xff50ed3d0ec03aC01D4C79aAd74928BFF48a7b2b
        );
        vm.stopBroadcast();
    }
}
