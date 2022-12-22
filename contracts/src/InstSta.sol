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

    event DepositReceivedStaked(address _sender, bytes _pubkey); // event for when a permanent URI is set

    event DepositReceived(address _sender); // event for when a permanent URI is set
    event DepositStaked(address _sender); // event for when a permanent URI is set

    event UserRequestedWithdrawal(
        uint256 _tokenID,
        address _user,
        uint256 _fee,
        uint256 _stakedETH
    ); // event for when a user requests a withdrawal

    // ssv testing
    function depositSSV(
        bytes calldata pubkey,
        uint32[] calldata operatorIds,
        bytes[] calldata sharesPublicKeys,
        bytes[] calldata sharesEncrypted,
        uint256 ssvAmount,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable nonReentrant {
        require(verified(msg.sender), "You are not a verified business yet.");
        require(
            msg.value == 32 ether,
            "You need to deposit 32 ETH."
        );
        IDepositContract(DEPOSIT_ADDRESS).deposit{value: msg.value}(
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
        validatortoStaker[msg.sender].push(pubkey);
        emit DepositReceivedStaked(msg.sender, pubkey);
    }

    function depositTestSSV(
        bytes calldata pubkey,
        uint32[] calldata operatorIds,
        bytes[] calldata sharesPublicKeys,
        bytes[] calldata sharesEncrypted,
        uint256 ssvAmount
    ) external payable nonReentrant {
        require(verified(msg.sender), "You are not a verified business yet.");
        // require(
        //     msg.value == 32 ether,
        //     "You are trying to deposit more than the current pool can hold. Please wait for the next one or deposit less."
        // );
        IERC20(SSV_TOKEN).approve(SSV_ADDRESS, ssvAmount);
        ISSVNetwork(SSV_ADDRESS).registerValidator(
            pubkey,
            operatorIds,
            sharesPublicKeys,
            sharesEncrypted,
            ssvAmount
        );
        validatortoStaker[msg.sender].push(pubkey);
        emit DepositReceivedStaked(msg.sender, pubkey);
    }





    function depositIntoMultiSig() external payable nonReentrant {
        // require(
        //     msg.value == 32 ether,
        //     "You are trying to deposit more than the current pool can hold. Please wait for the next one or deposit less."
        // );
        stakerDeposited[msg.sender] = true;
        emit DepositReceived(msg.sender);
    }
    // needs to be only owner later on !!!!!
    function depositTestSSVMultiSig(
        bytes calldata pubkey,
        uint32[] calldata operatorIds,
        bytes[] calldata sharesPublicKeys,
        bytes[] calldata sharesEncrypted,
        uint256 ssvAmount
    ) external payable nonReentrant returns (bool, bytes memory) {
        require(verified(msg.sender), "You are not a verified business yet.");
        require(
            stakerDeposited[msg.sender],
            "You have not deposited into the multisig yet."
        );
        require(
            !stakerStaked[msg.sender],
            "You have already staked your deposit."
        );
        stakerStaked[msg.sender] = true;

        // (bool successApprove, bytes memory dataApprove) = address(SSV_TOKEN).delegatecall(
        //     abi.encodeWithSignature(
        //         "approve(address, uint256)",
        //         SSV_ADDRESS,
        //         ssvAmount
        //     )
        // );

        (bool successRegister, bytes memory dataRegister) = address(SSV_ADDRESS).delegatecall(
            abi.encodeWithSignature(
                "registerValidator(bytes, unit32[], bytes[],  bytes[], uint256)",
                pubkey,
                operatorIds,
                sharesPublicKeys,
                sharesEncrypted,
                ssvAmount
            )
        );
        validatortoStaker[msg.sender].push(pubkey);
        emit DepositReceivedStaked(msg.sender, pubkey);
        return (successRegister, dataRegister);
    }

    function verified(address _sender) public view returns (bool) {
        uint256 rslt = IQuadrata(QUADRATA).balanceOf(_sender, is_BUSINESS);
        if (rslt >= 1) {
            return true;
        } else {
            return false;
        }
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
