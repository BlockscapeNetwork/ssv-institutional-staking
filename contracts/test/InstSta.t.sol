// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.15;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {InstSta} from "../src/InstSta.sol";

contract InstStaTest is Test {
    InstSta instSta;
    address internal deployer;
    address internal singleStakerNotVerified = vm.addr(0xDe0);
    address internal singleStakerVerified = vm.addr(vm.envUint("PRIVATE_KEY"));

    // mockdata - start
    bytes internal pubkey = "0x8de93220bec0cdefde2c020590823fe83baa393c955bc71c11e45e0aac52dc6ccadc14b21c5a7f07e6460cdb6cde5069";
    uint32[] internal operatorIDs = [
        uint32(42),
        uint32(2),
        uint32(9),
        uint32(83)
    ];
    bytes[] internal sharesPublicKeys = [
        bytes(
            "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
        ),
        bytes(
            "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
        ),
        bytes(
            "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
        ),
        bytes(
            "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K"
        )
    ];
    bytes[] internal sharesEncrypted = [
        bytes(
            "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000158774f66677678796634684f3550646a68723678485479744374543147536869726675377568755035787559683745444e623134697279746d67443169464862786141486470476f594b45394936392b61644159455361314933506b566b6d6d6a7642554d5469546d6e36507a33774d5558594c6e464c63307161347452567251766b684e4c613162543478483053714b456865644d73375337684e67456a4f734352512b7759356c71365862617446675975464c3831674e2b3641756b706866684c69445530342f2f6362784d6c56346a746336356b4e597132597266454a6a7573376975645461496745344743324d732b512f374d4862626d76664850487a475a6a32507659516b4678377a50615057366d334d62526e364b5a4c6243783375646678364d4c664f55423158796d4350795753686b4d6754535a6f384d327261636b45577844554f6d6c6a454b59306a4a745549773d3d0000000000000000"
        ),
        bytes(
            "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000158774f66677678796634684f3550646a68723678485479744374543147536869726675377568755035787559683745444e623134697279746d67443169464862786141486470476f594b45394936392b61644159455361314933506b566b6d6d6a7642554d5469546d6e36507a33774d5558594c6e464c63307161347452567251766b684e4c613162543478483053714b456865644d73375337684e67456a4f734352512b7759356c71365862617446675975464c3831674e2b3641756b706866684c69445530342f2f6362784d6c56346a746336356b4e597132597266454a6a7573376975645461496745344743324d732b512f374d4862626d76664850487a475a6a32507659516b4678377a50615057366d334d62526e364b5a4c6243783375646678364d4c664f55423158796d4350795753686b4d6754535a6f384d327261636b45577844554f6d6c6a454b59306a4a745549773d3d0000000000000000"
        ),
        bytes(
            "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000158774f66677678796634684f3550646a68723678485479744374543147536869726675377568755035787559683745444e623134697279746d67443169464862786141486470476f594b45394936392b61644159455361314933506b566b6d6d6a7642554d5469546d6e36507a33774d5558594c6e464c63307161347452567251766b684e4c613162543478483053714b456865644d73375337684e67456a4f734352512b7759356c71365862617446675975464c3831674e2b3641756b706866684c69445530342f2f6362784d6c56346a746336356b4e597132597266454a6a7573376975645461496745344743324d732b512f374d4862626d76664850487a475a6a32507659516b4678377a50615057366d334d62526e364b5a4c6243783375646678364d4c664f55423158796d4350795753686b4d6754535a6f384d327261636b45577844554f6d6c6a454b59306a4a745549773d3d0000000000000000"
        ),
        bytes(
            "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000158774f66677678796634684f3550646a68723678485479744374543147536869726675377568755035787559683745444e623134697279746d67443169464862786141486470476f594b45394936392b61644159455361314933506b566b6d6d6a7642554d5469546d6e36507a33774d5558594c6e464c63307161347452567251766b684e4c613162543478483053714b456865644d73375337684e67456a4f734352512b7759356c71365862617446675975464c3831674e2b3641756b706866684c69445530342f2f6362784d6c56346a746336356b4e597132597266454a6a7573376975645461496745344743324d732b512f374d4862626d76664850487a475a6a32507659516b4678377a50615057366d334d62526e364b5a4c6243783375646678364d4c664f55423158796d4350795753686b4d6754535a6f384d327261636b45577844554f6d6c6a454b59306a4a745549773d3d0000000000000000"
        )
    ];

    uint256 internal amount = 2 ether;

    bytes internal withdrawal_credentials =
        "003b0b9704155f6a05386e64053cae49187843c513577b6b5405f4a390212911";
    bytes internal signature =
        "893ba71ca91a2af8f86d03a4909ceb901bff4e094d64953817ec8596f7aacabfe1dd971686d1b73ff62c3219f42ad0b30a4b0186fe4d47a2630c00730bda7d8ace52a314fdd6581232f39a3aa8ee23ccc57c77d8f2ff2c78134cdd713497e0b6";
    bytes32 internal deposit_data_root =
        keccak256(
            "12cf3ac2339e3a9eea10f6b2e3f7adfa938c2fd8b28f4a0e1c9462820b54d4ad"
        );

    // mnock data - end

    function setUp() public {
        deployer = vm.addr(0xDe);
        vm.deal(deployer, 100 ether);
        vm.label(deployer, "deployer");
        vm.prank(deployer);
        instSta = new InstSta(
            0x5C6b81212c0A654B6e247F8DEfeC9a95c63EF954,
            0x3a9f01091C446bdE031E39ea8354647AFef091E7,
            0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04,
            0x07b39F4fDE4A38bACe212b546dAc87C58DfE3fDC
        );

        vm.deal(singleStakerNotVerified, 100 ether);
        vm.label(singleStakerNotVerified, "singleStakerNotVerified");

        vm.deal(singleStakerVerified, 100 ether);
        vm.label(singleStakerVerified, "singleStakerVerified");

        //open public pool
        vm.prank(deployer);
    }

    // neg testcases
    function testFailRandomsCanCreateValidatorAndWithdraw() public {
        vm.prank(singleStakerNotVerified);
        instSta.depositSSV{value: 32 ether}(
            pubkey,
            operatorIDs,
            sharesPublicKeys,
            sharesEncrypted,
            amount,
            withdrawal_credentials,
            signature,
            deposit_data_root
        );
        assertEq(instSta.getBalance(), 32 ether);

        assertEq(instSta.getBalance(), 0 ether);
    }

    // pos testcases
    function testRandomsCanCreateValidatorAndWithdraw() public {
        vm.prank(singleStakerVerified);
        instSta.depositSSV{value: 32 ether}(
            pubkey,
            operatorIDs,
            sharesPublicKeys,
            sharesEncrypted,
            amount,
            withdrawal_credentials,
            signature,
            deposit_data_root
        );
        assertEq(instSta.getBalance(), 32 ether);

        assertEq(instSta.getBalance(), 0 ether);
    }
}
