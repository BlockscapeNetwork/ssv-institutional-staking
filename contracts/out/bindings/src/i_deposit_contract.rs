pub use i_deposit_contract::*;
#[allow(clippy::too_many_arguments, non_camel_case_types)]
pub mod i_deposit_contract {
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
    #[doc = "IDepositContract was auto-generated with ethers-rs Abigen. More information at: https://github.com/gakonst/ethers-rs"]
    use std::sync::Arc;
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"withdrawal_credentials\",\"type\":\"bytes\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"amount\",\"type\":\"bytes\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"signature\",\"type\":\"bytes\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"index\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositEvent\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"withdrawal_credentials\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"signature\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"deposit_data_root\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"deposit\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"get_deposit_count\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"get_deposit_root\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\",\"components\":[]}]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static IDEPOSITCONTRACT_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    pub struct IDepositContract<M>(ethers::contract::Contract<M>);
    impl<M> Clone for IDepositContract<M> {
        fn clone(&self) -> Self {
            IDepositContract(self.0.clone())
        }
    }
    impl<M> std::ops::Deref for IDepositContract<M> {
        type Target = ethers::contract::Contract<M>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
    impl<M> std::fmt::Debug for IDepositContract<M> {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            f.debug_tuple(stringify!(IDepositContract))
                .field(&self.address())
                .finish()
        }
    }
    impl<M: ethers::providers::Middleware> IDepositContract<M> {
        #[doc = r" Creates a new contract instance with the specified `ethers`"]
        #[doc = r" client at the given `Address`. The contract derefs to a `ethers::Contract`"]
        #[doc = r" object"]
        pub fn new<T: Into<ethers::core::types::Address>>(
            address: T,
            client: ::std::sync::Arc<M>,
        ) -> Self {
            ethers::contract::Contract::new(address.into(), IDEPOSITCONTRACT_ABI.clone(), client)
                .into()
        }
        #[doc = "Calls the contract's `deposit` (0x22895118) function"]
        pub fn deposit(
            &self,
            pubkey: ethers::core::types::Bytes,
            withdrawal_credentials: ethers::core::types::Bytes,
            signature: ethers::core::types::Bytes,
            deposit_data_root: [u8; 32],
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [34, 137, 81, 24],
                    (pubkey, withdrawal_credentials, signature, deposit_data_root),
                )
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `get_deposit_count` (0x621fd130) function"]
        pub fn get_deposit_count(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Bytes> {
            self.0
                .method_hash([98, 31, 209, 48], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `get_deposit_root` (0xc5f2892f) function"]
        pub fn get_deposit_root(&self) -> ethers::contract::builders::ContractCall<M, [u8; 32]> {
            self.0
                .method_hash([197, 242, 137, 47], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Gets the contract's `DepositEvent` event"]
        pub fn deposit_event_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DepositEventFilter> {
            self.0.event()
        }
        #[doc = r" Returns an [`Event`](#ethers_contract::builders::Event) builder for all events of this contract"]
        pub fn events(&self) -> ethers::contract::builders::Event<M, DepositEventFilter> {
            self.0.event_with_filter(Default::default())
        }
    }
    impl<M: ethers::providers::Middleware> From<ethers::contract::Contract<M>> for IDepositContract<M> {
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
        name = "DepositEvent",
        abi = "DepositEvent(bytes,bytes,bytes,bytes,bytes)"
    )]
    pub struct DepositEventFilter {
        pub pubkey: ethers::core::types::Bytes,
        pub withdrawal_credentials: ethers::core::types::Bytes,
        pub amount: ethers::core::types::Bytes,
        pub signature: ethers::core::types::Bytes,
        pub index: ethers::core::types::Bytes,
    }
    #[doc = "Container type for all input parameters for the `deposit` function with signature `deposit(bytes,bytes,bytes,bytes32)` and selector `0x22895118`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "deposit", abi = "deposit(bytes,bytes,bytes,bytes32)")]
    pub struct DepositCall {
        pub pubkey: ethers::core::types::Bytes,
        pub withdrawal_credentials: ethers::core::types::Bytes,
        pub signature: ethers::core::types::Bytes,
        pub deposit_data_root: [u8; 32],
    }
    #[doc = "Container type for all input parameters for the `get_deposit_count` function with signature `get_deposit_count()` and selector `0x621fd130`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "get_deposit_count", abi = "get_deposit_count()")]
    pub struct GetDepositCountCall;
    #[doc = "Container type for all input parameters for the `get_deposit_root` function with signature `get_deposit_root()` and selector `0xc5f2892f`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "get_deposit_root", abi = "get_deposit_root()")]
    pub struct GetDepositRootCall;
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum IDepositContractCalls {
        Deposit(DepositCall),
        GetDepositCount(GetDepositCountCall),
        GetDepositRoot(GetDepositRootCall),
    }
    impl ethers::core::abi::AbiDecode for IDepositContractCalls {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::std::result::Result<Self, ethers::core::abi::AbiError> {
            if let Ok(decoded) =
                <DepositCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(IDepositContractCalls::Deposit(decoded));
            }
            if let Ok(decoded) =
                <GetDepositCountCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(IDepositContractCalls::GetDepositCount(decoded));
            }
            if let Ok(decoded) =
                <GetDepositRootCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(IDepositContractCalls::GetDepositRoot(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ethers::core::abi::AbiEncode for IDepositContractCalls {
        fn encode(self) -> Vec<u8> {
            match self {
                IDepositContractCalls::Deposit(element) => element.encode(),
                IDepositContractCalls::GetDepositCount(element) => element.encode(),
                IDepositContractCalls::GetDepositRoot(element) => element.encode(),
            }
        }
    }
    impl ::std::fmt::Display for IDepositContractCalls {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                IDepositContractCalls::Deposit(element) => element.fmt(f),
                IDepositContractCalls::GetDepositCount(element) => element.fmt(f),
                IDepositContractCalls::GetDepositRoot(element) => element.fmt(f),
            }
        }
    }
    impl ::std::convert::From<DepositCall> for IDepositContractCalls {
        fn from(var: DepositCall) -> Self {
            IDepositContractCalls::Deposit(var)
        }
    }
    impl ::std::convert::From<GetDepositCountCall> for IDepositContractCalls {
        fn from(var: GetDepositCountCall) -> Self {
            IDepositContractCalls::GetDepositCount(var)
        }
    }
    impl ::std::convert::From<GetDepositRootCall> for IDepositContractCalls {
        fn from(var: GetDepositRootCall) -> Self {
            IDepositContractCalls::GetDepositRoot(var)
        }
    }
    #[doc = "Container type for all return fields from the `get_deposit_count` function with signature `get_deposit_count()` and selector `0x621fd130`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetDepositCountReturn(pub ethers::core::types::Bytes);
    #[doc = "Container type for all return fields from the `get_deposit_root` function with signature `get_deposit_root()` and selector `0xc5f2892f`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetDepositRootReturn(pub [u8; 32]);
}
