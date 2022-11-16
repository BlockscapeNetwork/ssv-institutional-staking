pub use eth_alloc::*;
#[allow(clippy::too_many_arguments, non_camel_case_types)]
pub mod eth_alloc {
    #![allow(clippy::enum_variant_names)]
    #![allow(dead_code)]
    #![allow(clippy::type_complexity)]
    #![allow(unused_imports)]
    use ethers::contract::{
        builders::{ContractCall, Event},
        Contract, Lazy,
    };
    use ethers::core::{
        abi::{Abi, Detokenize, InvalidOutputType, Token, Tokenizable},
        types::*,
    };
    use ethers::providers::Middleware;
    #[doc = "EthAlloc was auto-generated with ethers-rs Abigen. More information at: https://github.com/gakonst/ethers-rs"]
    use std::sync::Arc;
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_quadrataContract\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_value\",\"type\":\"bool\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"PubPoolClosed\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"PubPoolLimitedNearlyReached\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_value\",\"type\":\"bool\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"PubPoolOpend\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenID\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"_user\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_fee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_stakedETH\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"UserRequestedWithdrawal\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"allowPubDeposit\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"closePubPool\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositEthKYB\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"is_BUSINESS\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"openPubPool\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"quadrataContract\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"renounceOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"tokenIDtoValidator\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"transferOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenID\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_vali\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateValidator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"verified\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"withdrawAny\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"withdrawBatch\",\"outputs\":[]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static ETHALLOC_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    #[doc = r" Bytecode of the #name contract"]
    pub static ETHALLOC_BYTECODE: ethers::contract::Lazy<ethers::core::types::Bytes> =
        ethers::contract::Lazy::new(|| {
            "0x6080604052600280546001600160a01b0319169055600060035534801561002557600080fd5b50604051610d1c380380610d1c833981016040819052610044916100c9565b600160005561005233610077565b600280546001600160a01b0319166001600160a01b03929092169190911790556100f9565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000602082840312156100db57600080fd5b81516001600160a01b03811681146100f257600080fd5b9392505050565b610c14806101086000396000f3fe6080604052600436106100e85760003560e01c8063715018a61161008a578063a4e0db7e11610059578063a4e0db7e14610273578063ef31c32414610294578063f2fde38b146102a9578063f6b21af2146102c957600080fd5b8063715018a6146101ea57806377ad99f0146101ff578063825861051461021f5780638da5cb5b1461025557600080fd5b8063158dc875116100c6578063158dc875146101775780634d5a1c1f1461018e5780635a27cbcb146101c257806362a4f740146101e257600080fd5b80630db065f4146100ed5780630e87d0d91461012257806312065fe01461015a575b600080fd5b3480156100f957600080fd5b5061010d610108366004610b13565b6102de565b60405190151581526020015b60405180910390f35b34801561012e57600080fd5b50600254610142906001600160a01b031681565b6040516001600160a01b039091168152602001610119565b34801561016657600080fd5b50475b604051908152602001610119565b34801561018357600080fd5b5061018c610380565b005b34801561019a57600080fd5b506101697faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b81565b3480156101ce57600080fd5b5061018c6101dd366004610b35565b61043f565b61018c6104e5565b3480156101f657600080fd5b5061018c61073d565b34801561020b57600080fd5b5061018c61021a366004610b61565b61074f565b34801561022b57600080fd5b5061014261023a366004610b61565b6005602052600090815260409020546001600160a01b031681565b34801561026157600080fd5b506001546001600160a01b0316610142565b34801561027f57600080fd5b5060025461010d90600160a01b900460ff1681565b3480156102a057600080fd5b5061018c6107a2565b3480156102b557600080fd5b5061018c6102c4366004610b13565b6107f7565b3480156102d557600080fd5b5061018c610870565b60025460405163d8b5ab6760e01b81526001600160a01b038381166004830152600160248301527faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b6044830152600092169063d8b5ab6790606401602060405180830381865afa158015610356573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037a9190610b7a565b92915050565b610388610972565b600254600160a01b900460ff16156103e75760405162461bcd60e51b815260206004820152601860248201527f5075626c696320706f6f6c20616c7265616479206f70656e000000000000000060448201526064015b60405180910390fd5b6002805460ff60a01b1916600160a01b908117918290556040517e8dd3e93baa4fe7895976ab5b545c723c8d89b05b913777bfba4bfa899e2a449261043592900460ff161515815260200190565b60405180910390a1565b610447610972565b60008281526005602052604081205461046b916001600160a01b03909116906109cc565b6104b75760405162461bcd60e51b815260206004820152601860248201527f56616c696461746f7220697320616c726561647920736574000000000000000060448201526064016103de565b60009182526005602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b6104ed610a4c565b6104f6336102de565b61054e5760405162461bcd60e51b8152602060048201526024808201527f596f7520617265206e6f74206120766572696669656420627573696e657373206044820152633cb2ba1760e11b60648201526084016103de565b600061055a3447610bb2565b61056d906801bc16d674ed189680610bb2565b600254909150600160a01b900460ff1615156001146105f45760405162461bcd60e51b815260206004820152603e60248201527f5075626c696320706f6f6c2069732063757272656e746c7920636c6f7365642e60448201527f20506c65617365207761697420666f7220746865206e657874206f6e652e000060648201526084016103de565b803411156106a55760405162461bcd60e51b815260206004820152606c60248201527f596f752061726520747279696e6720746f206465706f736974206d6f7265207460448201527f68616e207468652063757272656e7420706f6f6c2063616e20686f6c642e205060648201527f6c65617365207761697420666f7220746865206e657874206f6e65206f72206460848201526b32b837b9b4ba103632b9b99760a11b60a482015260c4016103de565b6801a055690d9db8000047101580156106c657506801bc16d674ec80000047105b15610703576040514781527fb460249bd2b5d39774483350298177c130ed6f9ea9fe44be023d931cc8f4086f9060200160405180910390a1610730565b6801bc16d674ec8000004710610730576003805490600061072383610bc5565b91905055506107306107aa565b5061073b6001600055565b565b610745610972565b61073b6000610aa5565b610757610972565b4781111561076457600080fd5b6001546040516001600160a01b039091169082156108fc029083906000818181858888f1935050505015801561079e573d6000803e3d6000fd5b5050565b6107aa610972565b6002805460ff60a01b1916908190556040517f3a7713b5c95bd34fb811d85c9797ca678591fbbb6ffc6f06e009bc863e9546b59161043591600160a01b90910460ff161515815260200190565b6107ff610972565b6001600160a01b0381166108645760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103de565b61086d81610aa5565b50565b610878610972565b600254600160a01b900460ff16156108ec5760405162461bcd60e51b815260206004820152603160248201527f5075626c696320706f6f6c206973207374696c6c206f70656e2e20506c656173604482015270329031b637b9b29034ba103334b939ba1760791b60648201526084016103de565b476801bc16d674ec800000146109345760405162461bcd60e51b815260206004820152600d60248201526c141bdbdb081b9bdd08199d5b1b609a1b60448201526064016103de565b6001546040516001600160a01b03909116906000906801bc16d674ec8000009082818181858883f1935050505015801561086d573d6000803e3d6000fd5b6001546001600160a01b0316331461073b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103de565b6040516bffffffffffffffffffffffff19606083901b1660208201526000906034016040516020818303038152906040528051906020012083604051602001610a2d919060609190911b6bffffffffffffffffffffffff1916815260140190565b6040516020818303038152906040528051906020012014905092915050565b600260005403610a9e5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016103de565b6002600055565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80356001600160a01b0381168114610b0e57600080fd5b919050565b600060208284031215610b2557600080fd5b610b2e82610af7565b9392505050565b60008060408385031215610b4857600080fd5b82359150610b5860208401610af7565b90509250929050565b600060208284031215610b7357600080fd5b5035919050565b600060208284031215610b8c57600080fd5b81518015158114610b2e57600080fd5b634e487b7160e01b600052601160045260246000fd5b8181038181111561037a5761037a610b9c565b600060018201610bd757610bd7610b9c565b506001019056fea2646970667358221220c70c4c7a8d99d5dee84f69544645421a901d81572880c92ef73888d335060fdc64736f6c63430008110033" . parse () . expect ("invalid bytecode")
        });
    pub struct EthAlloc<M>(ethers::contract::Contract<M>);
    impl<M> Clone for EthAlloc<M> {
        fn clone(&self) -> Self {
            EthAlloc(self.0.clone())
        }
    }
    impl<M> std::ops::Deref for EthAlloc<M> {
        type Target = ethers::contract::Contract<M>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
    impl<M> std::fmt::Debug for EthAlloc<M> {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            f.debug_tuple(stringify!(EthAlloc))
                .field(&self.address())
                .finish()
        }
    }
    impl<M: ethers::providers::Middleware> EthAlloc<M> {
        #[doc = r" Creates a new contract instance with the specified `ethers`"]
        #[doc = r" client at the given `Address`. The contract derefs to a `ethers::Contract`"]
        #[doc = r" object"]
        pub fn new<T: Into<ethers::core::types::Address>>(
            address: T,
            client: ::std::sync::Arc<M>,
        ) -> Self {
            ethers::contract::Contract::new(address.into(), ETHALLOC_ABI.clone(), client).into()
        }
        #[doc = r" Constructs the general purpose `Deployer` instance based on the provided constructor arguments and sends it."]
        #[doc = r" Returns a new instance of a deployer that returns an instance of this contract after sending the transaction"]
        #[doc = r""]
        #[doc = r" Notes:"]
        #[doc = r" 1. If there are no constructor arguments, you should pass `()` as the argument."]
        #[doc = r" 1. The default poll duration is 7 seconds."]
        #[doc = r" 1. The default number of confirmations is 1 block."]
        #[doc = r""]
        #[doc = r""]
        #[doc = r" # Example"]
        #[doc = r""]
        #[doc = r" Generate contract bindings with `abigen!` and deploy a new contract instance."]
        #[doc = r""]
        #[doc = r" *Note*: this requires a `bytecode` and `abi` object in the `greeter.json` artifact."]
        #[doc = r""]
        #[doc = r" ```ignore"]
        #[doc = r" # async fn deploy<M: ethers::providers::Middleware>(client: ::std::sync::Arc<M>) {"]
        #[doc = r#"     abigen!(Greeter,"../greeter.json");"#]
        #[doc = r""]
        #[doc = r#"    let greeter_contract = Greeter::deploy(client, "Hello world!".to_string()).unwrap().send().await.unwrap();"#]
        #[doc = r"    let msg = greeter_contract.greet().call().await.unwrap();"]
        #[doc = r" # }"]
        #[doc = r" ```"]
        pub fn deploy<T: ethers::core::abi::Tokenize>(
            client: ::std::sync::Arc<M>,
            constructor_args: T,
        ) -> ::std::result::Result<
            ethers::contract::builders::ContractDeployer<M, Self>,
            ethers::contract::ContractError<M>,
        > {
            let factory = ethers::contract::ContractFactory::new(
                ETHALLOC_ABI.clone(),
                ETHALLOC_BYTECODE.clone().into(),
                client,
            );
            let deployer = factory.deploy(constructor_args)?;
            let deployer = ethers::contract::ContractDeployer::new(deployer);
            Ok(deployer)
        }
        #[doc = "Calls the contract's `allowPubDeposit` (0xa4e0db7e) function"]
        pub fn allow_pub_deposit(&self) -> ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([164, 224, 219, 126], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `closePubPool` (0xef31c324) function"]
        pub fn close_pub_pool(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([239, 49, 195, 36], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `depositEthKYB` (0x62a4f740) function"]
        pub fn deposit_eth_kyb(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([98, 164, 247, 64], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getBalance` (0x12065fe0) function"]
        pub fn get_balance(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([18, 6, 95, 224], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `is_BUSINESS` (0x4d5a1c1f) function"]
        pub fn is_business(&self) -> ethers::contract::builders::ContractCall<M, [u8; 32]> {
            self.0
                .method_hash([77, 90, 28, 31], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `openPubPool` (0x158dc875) function"]
        pub fn open_pub_pool(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([21, 141, 200, 117], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `owner` (0x8da5cb5b) function"]
        pub fn owner(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([141, 165, 203, 91], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `quadrataContract` (0x0e87d0d9) function"]
        pub fn quadrata_contract(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([14, 135, 208, 217], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `renounceOwnership` (0x715018a6) function"]
        pub fn renounce_ownership(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([113, 80, 24, 166], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `tokenIDtoValidator` (0x82586105) function"]
        pub fn token_i_dto_validator(
            &self,
            p0: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([130, 88, 97, 5], p0)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `transferOwnership` (0xf2fde38b) function"]
        pub fn transfer_ownership(
            &self,
            new_owner: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([242, 253, 227, 139], new_owner)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `updateValidator` (0x5a27cbcb) function"]
        pub fn update_validator(
            &self,
            token_id: ethers::core::types::U256,
            vali: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([90, 39, 203, 203], (token_id, vali))
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `verified` (0x0db065f4) function"]
        pub fn verified(
            &self,
            sender: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([13, 176, 101, 244], sender)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `withdrawAny` (0x77ad99f0) function"]
        pub fn withdraw_any(
            &self,
            amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([119, 173, 153, 240], amount)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `withdrawBatch` (0xf6b21af2) function"]
        pub fn withdraw_batch(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([246, 178, 26, 242], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Gets the contract's `OwnershipTransferred` event"]
        pub fn ownership_transferred_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OwnershipTransferredFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `PubPoolClosed` event"]
        pub fn pub_pool_closed_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, PubPoolClosedFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `PubPoolLimitedNearlyReached` event"]
        pub fn pub_pool_limited_nearly_reached_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, PubPoolLimitedNearlyReachedFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `PubPoolOpend` event"]
        pub fn pub_pool_opend_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, PubPoolOpendFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `UserRequestedWithdrawal` event"]
        pub fn user_requested_withdrawal_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, UserRequestedWithdrawalFilter> {
            self.0.event()
        }
        #[doc = r" Returns an [`Event`](#ethers_contract::builders::Event) builder for all events of this contract"]
        pub fn events(&self) -> ethers::contract::builders::Event<M, EthAllocEvents> {
            self.0.event_with_filter(Default::default())
        }
    }
    impl<M: ethers::providers::Middleware> From<ethers::contract::Contract<M>> for EthAlloc<M> {
        fn from(contract: ethers::contract::Contract<M>) -> Self {
            Self(contract)
        }
    }
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthEvent,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethevent(
        name = "OwnershipTransferred",
        abi = "OwnershipTransferred(address,address)"
    )]
    pub struct OwnershipTransferredFilter {
        #[ethevent(indexed)]
        pub previous_owner: ethers::core::types::Address,
        #[ethevent(indexed)]
        pub new_owner: ethers::core::types::Address,
    }
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthEvent,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethevent(name = "PubPoolClosed", abi = "PubPoolClosed(bool)")]
    pub struct PubPoolClosedFilter {
        pub value: bool,
    }
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthEvent,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethevent(
        name = "PubPoolLimitedNearlyReached",
        abi = "PubPoolLimitedNearlyReached(uint256)"
    )]
    pub struct PubPoolLimitedNearlyReachedFilter {
        pub value: ethers::core::types::U256,
    }
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthEvent,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethevent(name = "PubPoolOpend", abi = "PubPoolOpend(bool)")]
    pub struct PubPoolOpendFilter {
        pub value: bool,
    }
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthEvent,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethevent(
        name = "UserRequestedWithdrawal",
        abi = "UserRequestedWithdrawal(uint256,address,uint256,uint256)"
    )]
    pub struct UserRequestedWithdrawalFilter {
        pub token_id: ethers::core::types::U256,
        pub user: ethers::core::types::Address,
        pub fee: ethers::core::types::U256,
        pub staked_eth: ethers::core::types::U256,
    }
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum EthAllocEvents {
        OwnershipTransferredFilter(OwnershipTransferredFilter),
        PubPoolClosedFilter(PubPoolClosedFilter),
        PubPoolLimitedNearlyReachedFilter(PubPoolLimitedNearlyReachedFilter),
        PubPoolOpendFilter(PubPoolOpendFilter),
        UserRequestedWithdrawalFilter(UserRequestedWithdrawalFilter),
    }
    impl ethers::contract::EthLogDecode for EthAllocEvents {
        fn decode_log(
            log: &ethers::core::abi::RawLog,
        ) -> ::std::result::Result<Self, ethers::core::abi::Error>
        where
            Self: Sized,
        {
            if let Ok(decoded) = OwnershipTransferredFilter::decode_log(log) {
                return Ok(EthAllocEvents::OwnershipTransferredFilter(decoded));
            }
            if let Ok(decoded) = PubPoolClosedFilter::decode_log(log) {
                return Ok(EthAllocEvents::PubPoolClosedFilter(decoded));
            }
            if let Ok(decoded) = PubPoolLimitedNearlyReachedFilter::decode_log(log) {
                return Ok(EthAllocEvents::PubPoolLimitedNearlyReachedFilter(decoded));
            }
            if let Ok(decoded) = PubPoolOpendFilter::decode_log(log) {
                return Ok(EthAllocEvents::PubPoolOpendFilter(decoded));
            }
            if let Ok(decoded) = UserRequestedWithdrawalFilter::decode_log(log) {
                return Ok(EthAllocEvents::UserRequestedWithdrawalFilter(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData)
        }
    }
    impl ::std::fmt::Display for EthAllocEvents {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                EthAllocEvents::OwnershipTransferredFilter(element) => element.fmt(f),
                EthAllocEvents::PubPoolClosedFilter(element) => element.fmt(f),
                EthAllocEvents::PubPoolLimitedNearlyReachedFilter(element) => element.fmt(f),
                EthAllocEvents::PubPoolOpendFilter(element) => element.fmt(f),
                EthAllocEvents::UserRequestedWithdrawalFilter(element) => element.fmt(f),
            }
        }
    }
    #[doc = "Container type for all input parameters for the `allowPubDeposit` function with signature `allowPubDeposit()` and selector `[164, 224, 219, 126]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "allowPubDeposit", abi = "allowPubDeposit()")]
    pub struct AllowPubDepositCall;
    #[doc = "Container type for all input parameters for the `closePubPool` function with signature `closePubPool()` and selector `[239, 49, 195, 36]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "closePubPool", abi = "closePubPool()")]
    pub struct ClosePubPoolCall;
    #[doc = "Container type for all input parameters for the `depositEthKYB` function with signature `depositEthKYB()` and selector `[98, 164, 247, 64]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "depositEthKYB", abi = "depositEthKYB()")]
    pub struct DepositEthKYBCall;
    #[doc = "Container type for all input parameters for the `getBalance` function with signature `getBalance()` and selector `[18, 6, 95, 224]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getBalance", abi = "getBalance()")]
    pub struct GetBalanceCall;
    #[doc = "Container type for all input parameters for the `is_BUSINESS` function with signature `is_BUSINESS()` and selector `[77, 90, 28, 31]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "is_BUSINESS", abi = "is_BUSINESS()")]
    pub struct IsBUSINESSCall;
    #[doc = "Container type for all input parameters for the `openPubPool` function with signature `openPubPool()` and selector `[21, 141, 200, 117]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "openPubPool", abi = "openPubPool()")]
    pub struct OpenPubPoolCall;
    #[doc = "Container type for all input parameters for the `owner` function with signature `owner()` and selector `[141, 165, 203, 91]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "owner", abi = "owner()")]
    pub struct OwnerCall;
    #[doc = "Container type for all input parameters for the `quadrataContract` function with signature `quadrataContract()` and selector `[14, 135, 208, 217]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "quadrataContract", abi = "quadrataContract()")]
    pub struct QuadrataContractCall;
    #[doc = "Container type for all input parameters for the `renounceOwnership` function with signature `renounceOwnership()` and selector `[113, 80, 24, 166]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "renounceOwnership", abi = "renounceOwnership()")]
    pub struct RenounceOwnershipCall;
    #[doc = "Container type for all input parameters for the `tokenIDtoValidator` function with signature `tokenIDtoValidator(uint256)` and selector `[130, 88, 97, 5]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "tokenIDtoValidator", abi = "tokenIDtoValidator(uint256)")]
    pub struct TokenIDtoValidatorCall(pub ethers::core::types::U256);
    #[doc = "Container type for all input parameters for the `transferOwnership` function with signature `transferOwnership(address)` and selector `[242, 253, 227, 139]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "transferOwnership", abi = "transferOwnership(address)")]
    pub struct TransferOwnershipCall {
        pub new_owner: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `updateValidator` function with signature `updateValidator(uint256,address)` and selector `[90, 39, 203, 203]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "updateValidator", abi = "updateValidator(uint256,address)")]
    pub struct UpdateValidatorCall {
        pub token_id: ethers::core::types::U256,
        pub vali: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `verified` function with signature `verified(address)` and selector `[13, 176, 101, 244]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "verified", abi = "verified(address)")]
    pub struct VerifiedCall {
        pub sender: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `withdrawAny` function with signature `withdrawAny(uint256)` and selector `[119, 173, 153, 240]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "withdrawAny", abi = "withdrawAny(uint256)")]
    pub struct WithdrawAnyCall {
        pub amount: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `withdrawBatch` function with signature `withdrawBatch()` and selector `[246, 178, 26, 242]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "withdrawBatch", abi = "withdrawBatch()")]
    pub struct WithdrawBatchCall;
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum EthAllocCalls {
        AllowPubDeposit(AllowPubDepositCall),
        ClosePubPool(ClosePubPoolCall),
        DepositEthKYB(DepositEthKYBCall),
        GetBalance(GetBalanceCall),
        IsBUSINESS(IsBUSINESSCall),
        OpenPubPool(OpenPubPoolCall),
        Owner(OwnerCall),
        QuadrataContract(QuadrataContractCall),
        RenounceOwnership(RenounceOwnershipCall),
        TokenIDtoValidator(TokenIDtoValidatorCall),
        TransferOwnership(TransferOwnershipCall),
        UpdateValidator(UpdateValidatorCall),
        Verified(VerifiedCall),
        WithdrawAny(WithdrawAnyCall),
        WithdrawBatch(WithdrawBatchCall),
    }
    impl ethers::core::abi::AbiDecode for EthAllocCalls {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::std::result::Result<Self, ethers::core::abi::AbiError> {
            if let Ok(decoded) =
                <AllowPubDepositCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::AllowPubDeposit(decoded));
            }
            if let Ok(decoded) =
                <ClosePubPoolCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::ClosePubPool(decoded));
            }
            if let Ok(decoded) =
                <DepositEthKYBCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::DepositEthKYB(decoded));
            }
            if let Ok(decoded) =
                <GetBalanceCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::GetBalance(decoded));
            }
            if let Ok(decoded) =
                <IsBUSINESSCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::IsBUSINESS(decoded));
            }
            if let Ok(decoded) =
                <OpenPubPoolCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::OpenPubPool(decoded));
            }
            if let Ok(decoded) = <OwnerCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::Owner(decoded));
            }
            if let Ok(decoded) =
                <QuadrataContractCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::QuadrataContract(decoded));
            }
            if let Ok(decoded) =
                <RenounceOwnershipCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::RenounceOwnership(decoded));
            }
            if let Ok(decoded) =
                <TokenIDtoValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::TokenIDtoValidator(decoded));
            }
            if let Ok(decoded) =
                <TransferOwnershipCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::TransferOwnership(decoded));
            }
            if let Ok(decoded) =
                <UpdateValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::UpdateValidator(decoded));
            }
            if let Ok(decoded) =
                <VerifiedCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::Verified(decoded));
            }
            if let Ok(decoded) =
                <WithdrawAnyCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::WithdrawAny(decoded));
            }
            if let Ok(decoded) =
                <WithdrawBatchCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(EthAllocCalls::WithdrawBatch(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ethers::core::abi::AbiEncode for EthAllocCalls {
        fn encode(self) -> Vec<u8> {
            match self {
                EthAllocCalls::AllowPubDeposit(element) => element.encode(),
                EthAllocCalls::ClosePubPool(element) => element.encode(),
                EthAllocCalls::DepositEthKYB(element) => element.encode(),
                EthAllocCalls::GetBalance(element) => element.encode(),
                EthAllocCalls::IsBUSINESS(element) => element.encode(),
                EthAllocCalls::OpenPubPool(element) => element.encode(),
                EthAllocCalls::Owner(element) => element.encode(),
                EthAllocCalls::QuadrataContract(element) => element.encode(),
                EthAllocCalls::RenounceOwnership(element) => element.encode(),
                EthAllocCalls::TokenIDtoValidator(element) => element.encode(),
                EthAllocCalls::TransferOwnership(element) => element.encode(),
                EthAllocCalls::UpdateValidator(element) => element.encode(),
                EthAllocCalls::Verified(element) => element.encode(),
                EthAllocCalls::WithdrawAny(element) => element.encode(),
                EthAllocCalls::WithdrawBatch(element) => element.encode(),
            }
        }
    }
    impl ::std::fmt::Display for EthAllocCalls {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                EthAllocCalls::AllowPubDeposit(element) => element.fmt(f),
                EthAllocCalls::ClosePubPool(element) => element.fmt(f),
                EthAllocCalls::DepositEthKYB(element) => element.fmt(f),
                EthAllocCalls::GetBalance(element) => element.fmt(f),
                EthAllocCalls::IsBUSINESS(element) => element.fmt(f),
                EthAllocCalls::OpenPubPool(element) => element.fmt(f),
                EthAllocCalls::Owner(element) => element.fmt(f),
                EthAllocCalls::QuadrataContract(element) => element.fmt(f),
                EthAllocCalls::RenounceOwnership(element) => element.fmt(f),
                EthAllocCalls::TokenIDtoValidator(element) => element.fmt(f),
                EthAllocCalls::TransferOwnership(element) => element.fmt(f),
                EthAllocCalls::UpdateValidator(element) => element.fmt(f),
                EthAllocCalls::Verified(element) => element.fmt(f),
                EthAllocCalls::WithdrawAny(element) => element.fmt(f),
                EthAllocCalls::WithdrawBatch(element) => element.fmt(f),
            }
        }
    }
    impl ::std::convert::From<AllowPubDepositCall> for EthAllocCalls {
        fn from(var: AllowPubDepositCall) -> Self {
            EthAllocCalls::AllowPubDeposit(var)
        }
    }
    impl ::std::convert::From<ClosePubPoolCall> for EthAllocCalls {
        fn from(var: ClosePubPoolCall) -> Self {
            EthAllocCalls::ClosePubPool(var)
        }
    }
    impl ::std::convert::From<DepositEthKYBCall> for EthAllocCalls {
        fn from(var: DepositEthKYBCall) -> Self {
            EthAllocCalls::DepositEthKYB(var)
        }
    }
    impl ::std::convert::From<GetBalanceCall> for EthAllocCalls {
        fn from(var: GetBalanceCall) -> Self {
            EthAllocCalls::GetBalance(var)
        }
    }
    impl ::std::convert::From<IsBUSINESSCall> for EthAllocCalls {
        fn from(var: IsBUSINESSCall) -> Self {
            EthAllocCalls::IsBUSINESS(var)
        }
    }
    impl ::std::convert::From<OpenPubPoolCall> for EthAllocCalls {
        fn from(var: OpenPubPoolCall) -> Self {
            EthAllocCalls::OpenPubPool(var)
        }
    }
    impl ::std::convert::From<OwnerCall> for EthAllocCalls {
        fn from(var: OwnerCall) -> Self {
            EthAllocCalls::Owner(var)
        }
    }
    impl ::std::convert::From<QuadrataContractCall> for EthAllocCalls {
        fn from(var: QuadrataContractCall) -> Self {
            EthAllocCalls::QuadrataContract(var)
        }
    }
    impl ::std::convert::From<RenounceOwnershipCall> for EthAllocCalls {
        fn from(var: RenounceOwnershipCall) -> Self {
            EthAllocCalls::RenounceOwnership(var)
        }
    }
    impl ::std::convert::From<TokenIDtoValidatorCall> for EthAllocCalls {
        fn from(var: TokenIDtoValidatorCall) -> Self {
            EthAllocCalls::TokenIDtoValidator(var)
        }
    }
    impl ::std::convert::From<TransferOwnershipCall> for EthAllocCalls {
        fn from(var: TransferOwnershipCall) -> Self {
            EthAllocCalls::TransferOwnership(var)
        }
    }
    impl ::std::convert::From<UpdateValidatorCall> for EthAllocCalls {
        fn from(var: UpdateValidatorCall) -> Self {
            EthAllocCalls::UpdateValidator(var)
        }
    }
    impl ::std::convert::From<VerifiedCall> for EthAllocCalls {
        fn from(var: VerifiedCall) -> Self {
            EthAllocCalls::Verified(var)
        }
    }
    impl ::std::convert::From<WithdrawAnyCall> for EthAllocCalls {
        fn from(var: WithdrawAnyCall) -> Self {
            EthAllocCalls::WithdrawAny(var)
        }
    }
    impl ::std::convert::From<WithdrawBatchCall> for EthAllocCalls {
        fn from(var: WithdrawBatchCall) -> Self {
            EthAllocCalls::WithdrawBatch(var)
        }
    }
    #[doc = "Container type for all return fields from the `allowPubDeposit` function with signature `allowPubDeposit()` and selector `[164, 224, 219, 126]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct AllowPubDepositReturn(pub bool);
    #[doc = "Container type for all return fields from the `getBalance` function with signature `getBalance()` and selector `[18, 6, 95, 224]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetBalanceReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `is_BUSINESS` function with signature `is_BUSINESS()` and selector `[77, 90, 28, 31]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct IsBUSINESSReturn(pub [u8; 32]);
    #[doc = "Container type for all return fields from the `owner` function with signature `owner()` and selector `[141, 165, 203, 91]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct OwnerReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `quadrataContract` function with signature `quadrataContract()` and selector `[14, 135, 208, 217]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct QuadrataContractReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `tokenIDtoValidator` function with signature `tokenIDtoValidator(uint256)` and selector `[130, 88, 97, 5]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct TokenIDtoValidatorReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `verified` function with signature `verified(address)` and selector `[13, 176, 101, 244]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct VerifiedReturn(pub bool);
}
