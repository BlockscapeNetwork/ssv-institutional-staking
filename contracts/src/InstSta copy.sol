// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15;

// @notice: This contract is used to allocate ETH to a pool.
// @notive: This is a showcase contract to deomonstrate the Quadrata KYP usage and is not meant to be used in production.
// @author: @floberlin.eth - blockscape labs
import "openzeppelin-contracts/security/ReentrancyGuard.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/utils/Strings.sol";
import "openzeppelin-contracts/token/ERC20/IERC20.sol";
import "./utils/ISSVNetwork.sol";

// ! This contract is not meant to be used in production.
// ? Need to figure out how to handle upgrades in foundry.
// import "openzeppelin-contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
// import "openzeppelin-contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "openzeppelin-contracts-upgradeable/utils/StringsUpgradeable.sol";
// import "openzeppelin-contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

import {console} from "forge-std/console.sol"; // foundry testing only

// Interface for the KYB contract powered by Quadrata: https://quadrata.com/
interface IQuadrata {
    function balanceOf(address _account, bytes32 _attribute)
        external
        view
        returns (uint256);
}

interface IDepositContract {
    /// @notice A processed deposit event.
    event DepositEvent(
        bytes pubkey,
        bytes withdrawal_credentials,
        bytes amount,
        bytes signature,
        bytes index
    );

    /// @notice Submit a Phase 0 DepositData object.
    /// @param pubkey A BLS12-381 public key.
    /// @param withdrawal_credentials Commitment to a public key for withdrawals.
    /// @param signature A BLS12-381 signature.
    /// @param deposit_data_root The SHA-256 hash of the SSZ-encoded DepositData object.
    /// Used as a protection against malformed input.
    function deposit(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable;

    /// @notice Query the current deposit root hash.
    /// @return The deposit root hash.
    function get_deposit_root() external view returns (bytes32);

    /// @notice Query the current deposit count.
    /// @return The deposit count encoded as a little endian 64-bit number.
    function get_deposit_count() external view returns (bytes memory);
}

// Start of the contract definition
contract InstSta is ReentrancyGuard, Ownable {
    address public QUADRATA = address(0);
    address public SSV_TOKEN = address(0);
    address public SSV_ADDRESS = address(0);
    address public DEPOSIT_ADDRESS = address(0);
    bytes32 public constant is_BUSINESS = keccak256("IS_BUSINESS");

    mapping(address => bytes[]) validatortoStaker;
    mapping(address => bool) stakerDeposited;
    mapping(address => bool) stakerStaked;

    // Initialize the contract with the address of the Quadrata KYB contract
    constructor(
        address _quadrataContract,
        address _ssvToken,
        address _ssvContract,
        address _depositAddress
    ) {
        QUADRATA = _quadrataContract;
        SSV_TOKEN = _ssvToken;
        SSV_ADDRESS = _ssvContract;
        DEPOSIT_ADDRESS = _depositAddress;
    }

    event DepositReceivedStaked(address _sender, bytes _pubkey); // event for when Deposit is received and staked

    event DepositReceived(address indexed _sender); // event for when a deposit is received
    event DepositReceivedTest(address indexed _sender); // event for when a deposit is received - test without actual deposit

    event DepositStaked(address _sender); // event for when a deposit is staked & also for test deposit 

    // event UserRequestedWithdrawal(
    //     uint256 _tokenID,
    //     address _user,
    //     uint256 _fee,
    //     uint256 _stakedETH
    // ); // event for when a user requests a withdrawal

    // ssv testing
    // function depositSSV(
    //     bytes calldata pubkey,
    //     uint32[] calldata operatorIds,
    //     bytes[] calldata sharesPublicKeys,
    //     bytes[] calldata sharesEncrypted,
    //     uint256 ssvAmount,
    //     bytes calldata withdrawal_credentials,
    //     bytes calldata signature,
    //     bytes32 deposit_data_root
    // ) external payable nonReentrant {
    //     require(verified(msg.sender), "You are not a verified business yet.");
    //     require(
    //         msg.value == 32 ether,
    //         "You need to deposit 32 ETH."
    //     );
    //     IDepositContract(DEPOSIT_ADDRESS).deposit{value: msg.value}(
    //         pubkey,
    //         withdrawal_credentials,
    //         signature,
    //         deposit_data_root
    //     );
    //     IERC20(SSV_TOKEN).approve(SSV_ADDRESS, ssvAmount);
    //     ISSVNetwork(SSV_ADDRESS).registerValidator(
    //         pubkey,
    //         operatorIds,
    //         sharesPublicKeys,
    //         sharesEncrypted,
    //         ssvAmount
    //     );
    //     validatortoStaker[msg.sender].push(pubkey);
    //     emit DepositReceivedStaked(msg.sender, pubkey);
    // }

    // function depositTestSSV(
    //     bytes calldata pubkey,
    //     uint32[] calldata operatorIds,
    //     bytes[] calldata sharesPublicKeys,
    //     bytes[] calldata sharesEncrypted,
    //     uint256 ssvAmount
    // ) external payable nonReentrant {
    //     require(verified(msg.sender), "You are not a verified business yet.");
    //     // require(
    //     //     msg.value == 32 ether,
    //     //     "You are trying to deposit more than the current pool can hold. Please wait for the next one or deposit less."
    //     // );
    //     IERC20(SSV_TOKEN).approve(SSV_ADDRESS, ssvAmount);
    //     ISSVNetwork(SSV_ADDRESS).registerValidator(
    //         pubkey,
    //         operatorIds,
    //         sharesPublicKeys,
    //         sharesEncrypted,
    //         ssvAmount
    //     );
    //     validatortoStaker[msg.sender].push(pubkey);
    //     emit DepositReceivedStaked(msg.sender, pubkey);
    // }
   

    // function to check if the user is verified by Quadrata & deposit 32 ETH to the contract to become which triggers an event in the backend
    function depositIntoContract() external payable nonReentrant {
        require(verified(msg.sender), "You are not a verified business yet.");
        require(
            msg.value == 32 ether,
            "You are trying to deposit more than the current pool can hold. Please wait for the next one or deposit less."
        );
        stakerDeposited[msg.sender] = true;
        emit DepositReceived(msg.sender);
    }

    // function with no desposit requirement to check if the user is verified by Quadrata & trigger an event in the backend
     function depositIntoContractTest() external payable nonReentrant {
        require(verified(msg.sender), "You are not a verified business yet.");
        // require(
        //     msg.value == 32 ether,
        //     "You are trying to deposit more than the current pool can hold. Please wait for the next one or deposit less."
        // );
        stakerDeposited[msg.sender] = true;
        emit DepositReceivedTest(msg.sender);
    }

    function createSSV(
        address _staker,
        bytes calldata pubkey,
        uint32[] calldata operatorIds,
        bytes[] calldata sharesPublicKeys,
        bytes[] calldata sharesEncrypted,
        uint256 ssvAmount,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable nonReentrant onlyOwner{
        require(stakerDeposited[_staker], "Staker did not deposit ETH yet.");
        require(
            address(this).balance >= 32 ether,
            "Not enought ETH."
        );
        IDepositContract(DEPOSIT_ADDRESS).deposit{value: 32 ether}(
            pubkey,
            withdrawal_credentials,
            signature,
            deposit_data_root
        );
        IERC20(SSV_TOKEN).approve(SSV_ADDRESS, ssvAmount);
        ISSVNetwork(SSV_ADDRESS).registerValidator(
            pubkey,
            operatorIds,
            sharesPublicKeys,
            sharesEncrypted,
            ssvAmount
        );
        validatortoStaker[_staker].push(pubkey);
         stakerDeposited[_staker] = false;
        emit DepositReceivedStaked(_staker, pubkey);
    }

    function createSSVTest(
        address _staker,
        bytes calldata pubkey,
        uint32[] calldata operatorIds,
        bytes[] calldata sharesPublicKeys,
        bytes[] calldata sharesEncrypted,
        uint256 ssvAmount
        // bytes calldata withdrawal_credentials,
        // bytes calldata signature,
        // bytes32 deposit_data_root
    ) external {
        require(stakerDeposited[_staker], "Staker did not deposit ETH yet.");
        IERC20(SSV_TOKEN).approve(SSV_ADDRESS, ssvAmount);
        ISSVNetwork(SSV_ADDRESS).registerValidator(
            pubkey,
            operatorIds,
            sharesPublicKeys,
            sharesEncrypted,
            ssvAmount
        );
        validatortoStaker[_staker].push(pubkey);
        stakerDeposited[_staker] = false;
        emit DepositReceivedStaked(_staker, pubkey);
    }

    function approveSSV (uint256 ssvAmount) external onlyOwner {
        IERC20(SSV_TOKEN).approve(SSV_ADDRESS, ssvAmount);
    }

    function verified(address _sender) public view returns (bool) {
        uint256 rslt = IQuadrata(QUADRATA).balanceOf(_sender, is_BUSINESS);
        return (rslt >= 1);
    }

    function getValidatorSelf() external view returns (bytes[] memory) {
        return validatortoStaker[msg.sender];
    }

    function getValidator(address _addr) external view returns (bytes[] memory) {
        return validatortoStaker[_addr];
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
