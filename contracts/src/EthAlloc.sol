// SPDX-License-Identifier: MIT
pragma solidity >=0.8.15;

// @notice: This contract is used to allocate ETH to a pool.
// @notive: This is a showcase contract to deomonstrate the Quadrata KYP usage and is not meant to be used in production.
// @author: @floberlin.eth - blockscape labs
import "openzeppelin-contracts/security/ReentrancyGuard.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/utils/Strings.sol";

import {console} from "forge-std/console.sol"; // foundry testing only

// Interface for the KYB contract powered by Quadrata: https://quadrata.com/
interface IQuadrata {
    function getAttributesFree(
        address _account,
        uint256 _tokenId,
        bytes32 _attribute
    ) external view returns (bool);
}

// Start of the contract definition
contract EthAlloc is ReentrancyGuard, Ownable {
    address public quadrataContract = address(0);

    // Initialize the contract with the address of the Quadrata KYB contract
    constructor(address _quadrataContract) {
        quadrataContract = _quadrataContract;
    }

    bytes32 public constant is_BUSINESS = keccak256("IS_BUSINESS");
    bool public allowPubDeposit;
    uint256 tokenID = 0;

    mapping(uint256 => address[]) tokenIDtoStaker;
    mapping(uint256 => address) public tokenIDtoValidator;

    event PubPoolLimitedNearlyReached(uint256 _value); // event for pub pool limit nearly reached
    event PubPoolOpend(bool _value); // event for when a permanent URI is set
    event PubPoolClosed(bool _value); // event for when a permanent URI is set
    event UserRequestedWithdrawal(
        uint256 _tokenID,
        address _user,
        uint256 _fee,
        uint256 _stakedETH
    ); // event for when a user requests a withdrawal

    // functions
    function openPubPool() public onlyOwner {
        require(allowPubDeposit == false, "Public pool already open");
        allowPubDeposit = true;
        emit PubPoolOpend(allowPubDeposit);
    }

    function closePubPool() public onlyOwner {
        allowPubDeposit = false;
        emit PubPoolClosed(allowPubDeposit);
    }

    function closePubPoolInternal() internal {
        allowPubDeposit = false;
        emit PubPoolClosed(allowPubDeposit);
    }

    function verified(address _sender) public view returns (bool) {
        return
            IQuadrata(quadrataContract).getAttributesFree(
                _sender,
                1,
                is_BUSINESS
            );
    }

    function depositEthKYB() public payable nonReentrant {
        require(verified(msg.sender), "You are not a verified business yet.");
        uint256 pubPoolLimit = ((32.00000000001 ether) -
            (address(this).balance - msg.value));
        require(
            allowPubDeposit == true,
            "Public pool is currently closed. Please wait for the next one."
        );
        require(
            msg.value <= pubPoolLimit,
            "You are trying to deposit more than the current pool can hold. Please wait for the next one or deposit less."
        );

        if (
            address(this).balance >= 30 ether &&
            address(this).balance < 32 ether
        ) {
            emit PubPoolLimitedNearlyReached(address(this).balance);
        } else if (address(this).balance >= 32 ether) {
            tokenID++;
            closePubPoolInternal();
        }
    }

    function updateValidator(uint256 _tokenID, address _vali) public onlyOwner {
        require(
            compareAddr(tokenIDtoValidator[_tokenID], address(0)),
            "Validator is already set"
        );
        tokenIDtoValidator[_tokenID] = _vali;
    }

    function withdrawBatch() public onlyOwner {
        require(
            !allowPubDeposit,
            "Public pool is still open. Please close it first."
        );
        require(address(this).balance == 32 ether, "Pool not full");
        payable(owner()).transfer(32 ether);
    }

    function withdrawAny(uint256 _amount) public onlyOwner {
        require(_amount <= address(this).balance);
        payable(owner()).transfer(_amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Helper functions
    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function compareAddr(address a, address b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function stringToBytes(string memory source)
        internal
        pure
        returns (bytes memory result)
    {
        return abi.encodePacked(source);
    }

    function append(
        string memory a,
        string memory b,
        string memory c
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }
}
