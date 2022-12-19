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

import {console} from "forge-std/console.sol"; // foundry testing only

// Interface for the KYB contract powered by Quadrata: https://quadrata.com/
interface IQuadrata {
    function balanceOf(address _account, bytes32 _attribute)
        external
        view
        returns (uint256);
}

// Start of the contract definition
contract InstSta is ReentrancyGuard, Ownable {
    address public QUADRATA = address(0);
    address public SSV_TOKEN = address(0);
    address public SSV_ADDRESS = address(0);
    bytes32 public constant is_BUSINESS = keccak256("IS_BUSINESS");
    bool public allowPubDeposit;

    mapping(address => bytes) validatortoStaker;

    // Initialize the contract with the address of the Quadrata KYB contract
    constructor(
        address _quadrataContract,
        address _ssvToken,
        address _ssvContract
    ) {
        QUADRATA = _quadrataContract;
        SSV_TOKEN = _ssvToken;
        SSV_ADDRESS = _ssvContract;
    }

    event DepositReceivedStaked(address _sender, bytes _pubkey); // event for when a permanent URI is set
    event UserRequestedWithdrawal(
        uint256 _tokenID,
        address _user,
        uint256 _fee,
        uint256 _stakedETH
    ); // event for when a user requests a withdrawal
    event PoolOpend(bool _value); // event for when a permanent URI is set
    event PoolClosed(bool _value); // event for when a permanent URI is set

    // ssv testing
    function depositSSV(
        bytes calldata pubkey,
        uint32[] calldata operatorIds,
        bytes[] calldata sharesPublicKeys,
        bytes[] calldata sharesEncrypted,
        uint256 amount
    ) external payable {
        require(verified(msg.sender), "You are not a verified business yet.");
        require(
            allowPubDeposit == true,
            "Public pool is currently closed. Please wait for the next one."
        );
        require(
            msg.value == 32 ether,
            "You are trying to deposit more than the current pool can hold. Please wait for the next one or deposit less."
        );
        IERC20(SSV_TOKEN).approve(SSV_ADDRESS, amount);
        ISSVNetwork(SSV_ADDRESS).registerValidator(
            pubkey,
            operatorIds,
            sharesPublicKeys,
            sharesEncrypted,
            amount
        );
        validatortoStaker[msg.sender] = pubkey;
        closePoolInternal();
        emit DepositReceivedStaked(msg.sender, pubkey);
    }

    // functions
    function openPool() external onlyOwner {
        require(allowPubDeposit == false, "Public pool already open");
        allowPubDeposit = true;
        emit PoolOpend(allowPubDeposit);
    }

    function closePool() external onlyOwner {
        allowPubDeposit = false;
        emit PoolClosed(allowPubDeposit);
    }

    function closePoolInternal() internal {
        allowPubDeposit = false;
        emit PoolClosed(allowPubDeposit);
    }

    function verified(address _sender) public view returns (bool) {
        uint256 rslt = IQuadrata(QUADRATA).balanceOf(_sender, is_BUSINESS);
        if (rslt >= 1) {
            return true;
        } else {
            return false;
        }
    }

    function getValidatorSelf() external view returns (bytes memory) {
        return validatortoStaker[msg.sender];
    }

    function getValidator(address _addr) external view returns (bytes memory) {
        return validatortoStaker[_addr];
    }

    function withdrawBatch() external onlyOwner {
        require(
            !allowPubDeposit,
            "Public pool is still open. Please close it first."
        );
        require(address(this).balance == 32 ether, "Pool not full");
        payable(owner()).transfer(32 ether);
    }

    function withdrawAny(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance);
        payable(owner()).transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
