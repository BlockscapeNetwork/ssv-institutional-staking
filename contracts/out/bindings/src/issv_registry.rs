pub use issv_registry::*;
#[allow(clippy::too_many_arguments, non_camel_case_types)]
pub mod issv_registry {
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
    #[doc = "ISSVRegistry was auto-generated with ethers-rs Abigen. More information at: https://github.com/gakonst/ethers-rs"]
    use std::sync::Arc;
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[],\"type\":\"error\",\"name\":\"ExceedRegisteredOperatorsByAccountLimit\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"ExceedValidatorLimit\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"InvalidPublicKeyLength\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"OessDataStructureInvalid\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"OperatorDeleted\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"OperatorNotFound\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"ValidatorAlreadyExists\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"activeValidatorCount\",\"outputs\":[{\"internalType\":\"uint32\",\"name\":\"\",\"type\":\"uint32\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"disableOwnerValidators\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"enableOwnerValidators\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorById\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorFee\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"\",\"type\":\"uint64\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorOwner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorsByOwnerAddress\",\"outputs\":[{\"internalType\":\"uint32[]\",\"name\":\"\",\"type\":\"uint32[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"validatorPublicKey\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorsByValidator\",\"outputs\":[{\"internalType\":\"uint32[]\",\"name\":\"\",\"type\":\"uint32[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidatorOwner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidatorsByAddress\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"initialize\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"isLiquidated\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint64\",\"name\":\"fee\",\"type\":\"uint64\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"registerOperator\",\"outputs\":[{\"internalType\":\"uint32\",\"name\":\"\",\"type\":\"uint32\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"registerValidator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"removeOperator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"removeValidator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]},{\"internalType\":\"uint64\",\"name\":\"fee\",\"type\":\"uint64\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateOperatorFee\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]},{\"internalType\":\"uint32\",\"name\":\"score\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateOperatorScore\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"validators\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"validatorsPerOperatorCount\",\"outputs\":[{\"internalType\":\"uint32\",\"name\":\"\",\"type\":\"uint32\",\"components\":[]}]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static ISSVREGISTRY_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    pub struct ISSVRegistry<M>(ethers::contract::Contract<M>);
    impl<M> Clone for ISSVRegistry<M> {
        fn clone(&self) -> Self {
            ISSVRegistry(self.0.clone())
        }
    }
    impl<M> std::ops::Deref for ISSVRegistry<M> {
        type Target = ethers::contract::Contract<M>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
    impl<M> std::fmt::Debug for ISSVRegistry<M> {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            f.debug_tuple(stringify!(ISSVRegistry))
                .field(&self.address())
                .finish()
        }
    }
    impl<M: ethers::providers::Middleware> ISSVRegistry<M> {
        #[doc = r" Creates a new contract instance with the specified `ethers`"]
        #[doc = r" client at the given `Address`. The contract derefs to a `ethers::Contract`"]
        #[doc = r" object"]
        pub fn new<T: Into<ethers::core::types::Address>>(
            address: T,
            client: ::std::sync::Arc<M>,
        ) -> Self {
            ethers::contract::Contract::new(address.into(), ISSVREGISTRY_ABI.clone(), client).into()
        }
        #[doc = "Calls the contract's `activeValidatorCount` (0x2340e8d3) function"]
        pub fn active_validator_count(&self) -> ethers::contract::builders::ContractCall<M, u32> {
            self.0
                .method_hash([35, 64, 232, 211], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `disableOwnerValidators` (0x27467a18) function"]
        pub fn disable_owner_validators(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([39, 70, 122, 24], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `enableOwnerValidators` (0x45413bf4) function"]
        pub fn enable_owner_validators(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([69, 65, 59, 244], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getOperatorById` (0x0260d443) function"]
        pub fn get_operator_by_id(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<
            M,
            (
                String,
                ethers::core::types::Address,
                ethers::core::types::Bytes,
                ethers::core::types::U256,
                ethers::core::types::U256,
                ethers::core::types::U256,
                bool,
            ),
        > {
            self.0
                .method_hash([2, 96, 212, 67], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getOperatorFee` (0xf8f08d7f) function"]
        pub fn get_operator_fee(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<M, u64> {
            self.0
                .method_hash([248, 240, 141, 127], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getOperatorOwner` (0xe7b21748) function"]
        pub fn get_operator_owner(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([231, 178, 23, 72], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getOperatorsByOwnerAddress` (0x0dc1eeff) function"]
        pub fn get_operators_by_owner_address(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ::std::vec::Vec<u32>> {
            self.0
                .method_hash([13, 193, 238, 255], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getOperatorsByValidator` (0x053e8349) function"]
        pub fn get_operators_by_validator(
            &self,
            validator_public_key: ethers::core::types::Bytes,
        ) -> ethers::contract::builders::ContractCall<M, ::std::vec::Vec<u32>> {
            self.0
                .method_hash([5, 62, 131, 73], validator_public_key)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getValidatorOwner` (0xc87b3038) function"]
        pub fn get_validator_owner(
            &self,
            public_key: ethers::core::types::Bytes,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([200, 123, 48, 56], public_key)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getValidatorsByAddress` (0x0e32066a) function"]
        pub fn get_validators_by_address(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ::std::vec::Vec<ethers::core::types::Bytes>>
        {
            self.0
                .method_hash([14, 50, 6, 106], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `initialize` (0x8129fc1c) function"]
        pub fn initialize(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([129, 41, 252, 28], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `isLiquidated` (0xa3b3f606) function"]
        pub fn is_liquidated(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([163, 179, 246, 6], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `registerOperator` (0x580ee1b8) function"]
        pub fn register_operator(
            &self,
            name: String,
            owner_address: ethers::core::types::Address,
            public_key: ethers::core::types::Bytes,
            fee: u64,
        ) -> ethers::contract::builders::ContractCall<M, u32> {
            self.0
                .method_hash([88, 14, 225, 184], (name, owner_address, public_key, fee))
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `registerValidator` (0x9b4ddb5d) function"]
        pub fn register_validator(
            &self,
            owner_address: ethers::core::types::Address,
            public_key: ethers::core::types::Bytes,
            operator_ids: ::std::vec::Vec<u32>,
            shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
            shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [155, 77, 219, 93],
                    (
                        owner_address,
                        public_key,
                        operator_ids,
                        shares_public_keys,
                        shares_encrypted,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `removeOperator` (0x2e1d2f05) function"]
        pub fn remove_operator(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([46, 29, 47, 5], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `removeValidator` (0xb2f569c5) function"]
        pub fn remove_validator(
            &self,
            public_key: ethers::core::types::Bytes,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([178, 245, 105, 197], public_key)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `updateOperatorFee` (0x85157361) function"]
        pub fn update_operator_fee(
            &self,
            operator_id: u32,
            fee: u64,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([133, 21, 115, 97], (operator_id, fee))
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `updateOperatorScore` (0x5f10ac30) function"]
        pub fn update_operator_score(
            &self,
            operator_id: u32,
            score: u32,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([95, 16, 172, 48], (operator_id, score))
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `validators` (0x6c36511a) function"]
        pub fn validators(
            &self,
            public_key: ethers::core::types::Bytes,
        ) -> ethers::contract::builders::ContractCall<
            M,
            (
                ethers::core::types::Address,
                ethers::core::types::Bytes,
                bool,
            ),
        > {
            self.0
                .method_hash([108, 54, 81, 26], public_key)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `validatorsPerOperatorCount` (0xd379a5f2) function"]
        pub fn validators_per_operator_count(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<M, u32> {
            self.0
                .method_hash([211, 121, 165, 242], operator_id)
                .expect("method not found (this should never happen)")
        }
    }
    impl<M: ethers::providers::Middleware> From<ethers::contract::Contract<M>> for ISSVRegistry<M> {
        fn from(contract: ethers::contract::Contract<M>) -> Self {
            Self(contract)
        }
    }
    #[doc = "Custom Error type `ExceedRegisteredOperatorsByAccountLimit` with signature `ExceedRegisteredOperatorsByAccountLimit()` and selector `0x69765c95`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(
        name = "ExceedRegisteredOperatorsByAccountLimit",
        abi = "ExceedRegisteredOperatorsByAccountLimit()"
    )]
    pub struct ExceedRegisteredOperatorsByAccountLimit;
    #[doc = "Custom Error type `ExceedValidatorLimit` with signature `ExceedValidatorLimit()` and selector `0x6df5ab76`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "ExceedValidatorLimit", abi = "ExceedValidatorLimit()")]
    pub struct ExceedValidatorLimit;
    #[doc = "Custom Error type `InvalidPublicKeyLength` with signature `InvalidPublicKeyLength()` and selector `0x637297a4`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "InvalidPublicKeyLength", abi = "InvalidPublicKeyLength()")]
    pub struct InvalidPublicKeyLength;
    #[doc = "Custom Error type `OessDataStructureInvalid` with signature `OessDataStructureInvalid()` and selector `0x9c920ce0`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "OessDataStructureInvalid", abi = "OessDataStructureInvalid()")]
    pub struct OessDataStructureInvalid;
    #[doc = "Custom Error type `OperatorDeleted` with signature `OperatorDeleted()` and selector `0x0f861bc0`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "OperatorDeleted", abi = "OperatorDeleted()")]
    pub struct OperatorDeleted;
    #[doc = "Custom Error type `OperatorNotFound` with signature `OperatorNotFound()` and selector `0xae4207eb`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "OperatorNotFound", abi = "OperatorNotFound()")]
    pub struct OperatorNotFound;
    #[doc = "Custom Error type `ValidatorAlreadyExists` with signature `ValidatorAlreadyExists()` and selector `0x8d09a73e`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "ValidatorAlreadyExists", abi = "ValidatorAlreadyExists()")]
    pub struct ValidatorAlreadyExists;
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum ISSVRegistryErrors {
        ExceedRegisteredOperatorsByAccountLimit(ExceedRegisteredOperatorsByAccountLimit),
        ExceedValidatorLimit(ExceedValidatorLimit),
        InvalidPublicKeyLength(InvalidPublicKeyLength),
        OessDataStructureInvalid(OessDataStructureInvalid),
        OperatorDeleted(OperatorDeleted),
        OperatorNotFound(OperatorNotFound),
        ValidatorAlreadyExists(ValidatorAlreadyExists),
    }
    impl ethers::core::abi::AbiDecode for ISSVRegistryErrors {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::std::result::Result<Self, ethers::core::abi::AbiError> {
            if let Ok(decoded) =
                <ExceedRegisteredOperatorsByAccountLimit as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVRegistryErrors::ExceedRegisteredOperatorsByAccountLimit(
                    decoded,
                ));
            }
            if let Ok(decoded) =
                <ExceedValidatorLimit as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryErrors::ExceedValidatorLimit(decoded));
            }
            if let Ok(decoded) =
                <InvalidPublicKeyLength as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryErrors::InvalidPublicKeyLength(decoded));
            }
            if let Ok(decoded) =
                <OessDataStructureInvalid as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryErrors::OessDataStructureInvalid(decoded));
            }
            if let Ok(decoded) =
                <OperatorDeleted as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryErrors::OperatorDeleted(decoded));
            }
            if let Ok(decoded) =
                <OperatorNotFound as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryErrors::OperatorNotFound(decoded));
            }
            if let Ok(decoded) =
                <ValidatorAlreadyExists as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryErrors::ValidatorAlreadyExists(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ethers::core::abi::AbiEncode for ISSVRegistryErrors {
        fn encode(self) -> Vec<u8> {
            match self {
                ISSVRegistryErrors::ExceedRegisteredOperatorsByAccountLimit(element) => {
                    element.encode()
                }
                ISSVRegistryErrors::ExceedValidatorLimit(element) => element.encode(),
                ISSVRegistryErrors::InvalidPublicKeyLength(element) => element.encode(),
                ISSVRegistryErrors::OessDataStructureInvalid(element) => element.encode(),
                ISSVRegistryErrors::OperatorDeleted(element) => element.encode(),
                ISSVRegistryErrors::OperatorNotFound(element) => element.encode(),
                ISSVRegistryErrors::ValidatorAlreadyExists(element) => element.encode(),
            }
        }
    }
    impl ::std::fmt::Display for ISSVRegistryErrors {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                ISSVRegistryErrors::ExceedRegisteredOperatorsByAccountLimit(element) => {
                    element.fmt(f)
                }
                ISSVRegistryErrors::ExceedValidatorLimit(element) => element.fmt(f),
                ISSVRegistryErrors::InvalidPublicKeyLength(element) => element.fmt(f),
                ISSVRegistryErrors::OessDataStructureInvalid(element) => element.fmt(f),
                ISSVRegistryErrors::OperatorDeleted(element) => element.fmt(f),
                ISSVRegistryErrors::OperatorNotFound(element) => element.fmt(f),
                ISSVRegistryErrors::ValidatorAlreadyExists(element) => element.fmt(f),
            }
        }
    }
    impl ::std::convert::From<ExceedRegisteredOperatorsByAccountLimit> for ISSVRegistryErrors {
        fn from(var: ExceedRegisteredOperatorsByAccountLimit) -> Self {
            ISSVRegistryErrors::ExceedRegisteredOperatorsByAccountLimit(var)
        }
    }
    impl ::std::convert::From<ExceedValidatorLimit> for ISSVRegistryErrors {
        fn from(var: ExceedValidatorLimit) -> Self {
            ISSVRegistryErrors::ExceedValidatorLimit(var)
        }
    }
    impl ::std::convert::From<InvalidPublicKeyLength> for ISSVRegistryErrors {
        fn from(var: InvalidPublicKeyLength) -> Self {
            ISSVRegistryErrors::InvalidPublicKeyLength(var)
        }
    }
    impl ::std::convert::From<OessDataStructureInvalid> for ISSVRegistryErrors {
        fn from(var: OessDataStructureInvalid) -> Self {
            ISSVRegistryErrors::OessDataStructureInvalid(var)
        }
    }
    impl ::std::convert::From<OperatorDeleted> for ISSVRegistryErrors {
        fn from(var: OperatorDeleted) -> Self {
            ISSVRegistryErrors::OperatorDeleted(var)
        }
    }
    impl ::std::convert::From<OperatorNotFound> for ISSVRegistryErrors {
        fn from(var: OperatorNotFound) -> Self {
            ISSVRegistryErrors::OperatorNotFound(var)
        }
    }
    impl ::std::convert::From<ValidatorAlreadyExists> for ISSVRegistryErrors {
        fn from(var: ValidatorAlreadyExists) -> Self {
            ISSVRegistryErrors::ValidatorAlreadyExists(var)
        }
    }
    #[doc = "Container type for all input parameters for the `activeValidatorCount` function with signature `activeValidatorCount()` and selector `0x2340e8d3`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "activeValidatorCount", abi = "activeValidatorCount()")]
    pub struct ActiveValidatorCountCall;
    #[doc = "Container type for all input parameters for the `disableOwnerValidators` function with signature `disableOwnerValidators(address)` and selector `0x27467a18`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "disableOwnerValidators",
        abi = "disableOwnerValidators(address)"
    )]
    pub struct DisableOwnerValidatorsCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `enableOwnerValidators` function with signature `enableOwnerValidators(address)` and selector `0x45413bf4`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "enableOwnerValidators", abi = "enableOwnerValidators(address)")]
    pub struct EnableOwnerValidatorsCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `getOperatorById` function with signature `getOperatorById(uint32)` and selector `0x0260d443`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getOperatorById", abi = "getOperatorById(uint32)")]
    pub struct GetOperatorByIdCall {
        pub operator_id: u32,
    }
    #[doc = "Container type for all input parameters for the `getOperatorFee` function with signature `getOperatorFee(uint32)` and selector `0xf8f08d7f`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getOperatorFee", abi = "getOperatorFee(uint32)")]
    pub struct GetOperatorFeeCall {
        pub operator_id: u32,
    }
    #[doc = "Container type for all input parameters for the `getOperatorOwner` function with signature `getOperatorOwner(uint32)` and selector `0xe7b21748`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getOperatorOwner", abi = "getOperatorOwner(uint32)")]
    pub struct GetOperatorOwnerCall {
        pub operator_id: u32,
    }
    #[doc = "Container type for all input parameters for the `getOperatorsByOwnerAddress` function with signature `getOperatorsByOwnerAddress(address)` and selector `0x0dc1eeff`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "getOperatorsByOwnerAddress",
        abi = "getOperatorsByOwnerAddress(address)"
    )]
    pub struct GetOperatorsByOwnerAddressCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `getOperatorsByValidator` function with signature `getOperatorsByValidator(bytes)` and selector `0x053e8349`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "getOperatorsByValidator",
        abi = "getOperatorsByValidator(bytes)"
    )]
    pub struct GetOperatorsByValidatorCall {
        pub validator_public_key: ethers::core::types::Bytes,
    }
    #[doc = "Container type for all input parameters for the `getValidatorOwner` function with signature `getValidatorOwner(bytes)` and selector `0xc87b3038`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getValidatorOwner", abi = "getValidatorOwner(bytes)")]
    pub struct GetValidatorOwnerCall {
        pub public_key: ethers::core::types::Bytes,
    }
    #[doc = "Container type for all input parameters for the `getValidatorsByAddress` function with signature `getValidatorsByAddress(address)` and selector `0x0e32066a`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "getValidatorsByAddress",
        abi = "getValidatorsByAddress(address)"
    )]
    pub struct GetValidatorsByAddressCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `initialize` function with signature `initialize()` and selector `0x8129fc1c`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "initialize", abi = "initialize()")]
    pub struct InitializeCall;
    #[doc = "Container type for all input parameters for the `isLiquidated` function with signature `isLiquidated(address)` and selector `0xa3b3f606`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "isLiquidated", abi = "isLiquidated(address)")]
    pub struct IsLiquidatedCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `registerOperator` function with signature `registerOperator(string,address,bytes,uint64)` and selector `0x580ee1b8`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "registerOperator",
        abi = "registerOperator(string,address,bytes,uint64)"
    )]
    pub struct RegisterOperatorCall {
        pub name: String,
        pub owner_address: ethers::core::types::Address,
        pub public_key: ethers::core::types::Bytes,
        pub fee: u64,
    }
    #[doc = "Container type for all input parameters for the `registerValidator` function with signature `registerValidator(address,bytes,uint32[],bytes[],bytes[])` and selector `0x9b4ddb5d`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "registerValidator",
        abi = "registerValidator(address,bytes,uint32[],bytes[],bytes[])"
    )]
    pub struct RegisterValidatorCall {
        pub owner_address: ethers::core::types::Address,
        pub public_key: ethers::core::types::Bytes,
        pub operator_ids: ::std::vec::Vec<u32>,
        pub shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
    }
    #[doc = "Container type for all input parameters for the `removeOperator` function with signature `removeOperator(uint32)` and selector `0x2e1d2f05`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "removeOperator", abi = "removeOperator(uint32)")]
    pub struct RemoveOperatorCall {
        pub operator_id: u32,
    }
    #[doc = "Container type for all input parameters for the `removeValidator` function with signature `removeValidator(bytes)` and selector `0xb2f569c5`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "removeValidator", abi = "removeValidator(bytes)")]
    pub struct RemoveValidatorCall {
        pub public_key: ethers::core::types::Bytes,
    }
    #[doc = "Container type for all input parameters for the `updateOperatorFee` function with signature `updateOperatorFee(uint32,uint64)` and selector `0x85157361`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "updateOperatorFee", abi = "updateOperatorFee(uint32,uint64)")]
    pub struct UpdateOperatorFeeCall {
        pub operator_id: u32,
        pub fee: u64,
    }
    #[doc = "Container type for all input parameters for the `updateOperatorScore` function with signature `updateOperatorScore(uint32,uint32)` and selector `0x5f10ac30`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "updateOperatorScore",
        abi = "updateOperatorScore(uint32,uint32)"
    )]
    pub struct UpdateOperatorScoreCall {
        pub operator_id: u32,
        pub score: u32,
    }
    #[doc = "Container type for all input parameters for the `validators` function with signature `validators(bytes)` and selector `0x6c36511a`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "validators", abi = "validators(bytes)")]
    pub struct ValidatorsCall {
        pub public_key: ethers::core::types::Bytes,
    }
    #[doc = "Container type for all input parameters for the `validatorsPerOperatorCount` function with signature `validatorsPerOperatorCount(uint32)` and selector `0xd379a5f2`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(
        name = "validatorsPerOperatorCount",
        abi = "validatorsPerOperatorCount(uint32)"
    )]
    pub struct ValidatorsPerOperatorCountCall {
        pub operator_id: u32,
    }
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum ISSVRegistryCalls {
        ActiveValidatorCount(ActiveValidatorCountCall),
        DisableOwnerValidators(DisableOwnerValidatorsCall),
        EnableOwnerValidators(EnableOwnerValidatorsCall),
        GetOperatorById(GetOperatorByIdCall),
        GetOperatorFee(GetOperatorFeeCall),
        GetOperatorOwner(GetOperatorOwnerCall),
        GetOperatorsByOwnerAddress(GetOperatorsByOwnerAddressCall),
        GetOperatorsByValidator(GetOperatorsByValidatorCall),
        GetValidatorOwner(GetValidatorOwnerCall),
        GetValidatorsByAddress(GetValidatorsByAddressCall),
        Initialize(InitializeCall),
        IsLiquidated(IsLiquidatedCall),
        RegisterOperator(RegisterOperatorCall),
        RegisterValidator(RegisterValidatorCall),
        RemoveOperator(RemoveOperatorCall),
        RemoveValidator(RemoveValidatorCall),
        UpdateOperatorFee(UpdateOperatorFeeCall),
        UpdateOperatorScore(UpdateOperatorScoreCall),
        Validators(ValidatorsCall),
        ValidatorsPerOperatorCount(ValidatorsPerOperatorCountCall),
    }
    impl ethers::core::abi::AbiDecode for ISSVRegistryCalls {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::std::result::Result<Self, ethers::core::abi::AbiError> {
            if let Ok(decoded) =
                <ActiveValidatorCountCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::ActiveValidatorCount(decoded));
            }
            if let Ok(decoded) =
                <DisableOwnerValidatorsCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::DisableOwnerValidators(decoded));
            }
            if let Ok(decoded) =
                <EnableOwnerValidatorsCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::EnableOwnerValidators(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorByIdCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::GetOperatorById(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::GetOperatorFee(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorOwnerCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::GetOperatorOwner(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorsByOwnerAddressCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVRegistryCalls::GetOperatorsByOwnerAddress(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorsByValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::GetOperatorsByValidator(decoded));
            }
            if let Ok(decoded) =
                <GetValidatorOwnerCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::GetValidatorOwner(decoded));
            }
            if let Ok(decoded) =
                <GetValidatorsByAddressCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::GetValidatorsByAddress(decoded));
            }
            if let Ok(decoded) =
                <InitializeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::Initialize(decoded));
            }
            if let Ok(decoded) =
                <IsLiquidatedCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::IsLiquidated(decoded));
            }
            if let Ok(decoded) =
                <RegisterOperatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::RegisterOperator(decoded));
            }
            if let Ok(decoded) =
                <RegisterValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::RegisterValidator(decoded));
            }
            if let Ok(decoded) =
                <RemoveOperatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::RemoveOperator(decoded));
            }
            if let Ok(decoded) =
                <RemoveValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::RemoveValidator(decoded));
            }
            if let Ok(decoded) =
                <UpdateOperatorFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::UpdateOperatorFee(decoded));
            }
            if let Ok(decoded) =
                <UpdateOperatorScoreCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::UpdateOperatorScore(decoded));
            }
            if let Ok(decoded) =
                <ValidatorsCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVRegistryCalls::Validators(decoded));
            }
            if let Ok(decoded) =
                <ValidatorsPerOperatorCountCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVRegistryCalls::ValidatorsPerOperatorCount(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ethers::core::abi::AbiEncode for ISSVRegistryCalls {
        fn encode(self) -> Vec<u8> {
            match self {
                ISSVRegistryCalls::ActiveValidatorCount(element) => element.encode(),
                ISSVRegistryCalls::DisableOwnerValidators(element) => element.encode(),
                ISSVRegistryCalls::EnableOwnerValidators(element) => element.encode(),
                ISSVRegistryCalls::GetOperatorById(element) => element.encode(),
                ISSVRegistryCalls::GetOperatorFee(element) => element.encode(),
                ISSVRegistryCalls::GetOperatorOwner(element) => element.encode(),
                ISSVRegistryCalls::GetOperatorsByOwnerAddress(element) => element.encode(),
                ISSVRegistryCalls::GetOperatorsByValidator(element) => element.encode(),
                ISSVRegistryCalls::GetValidatorOwner(element) => element.encode(),
                ISSVRegistryCalls::GetValidatorsByAddress(element) => element.encode(),
                ISSVRegistryCalls::Initialize(element) => element.encode(),
                ISSVRegistryCalls::IsLiquidated(element) => element.encode(),
                ISSVRegistryCalls::RegisterOperator(element) => element.encode(),
                ISSVRegistryCalls::RegisterValidator(element) => element.encode(),
                ISSVRegistryCalls::RemoveOperator(element) => element.encode(),
                ISSVRegistryCalls::RemoveValidator(element) => element.encode(),
                ISSVRegistryCalls::UpdateOperatorFee(element) => element.encode(),
                ISSVRegistryCalls::UpdateOperatorScore(element) => element.encode(),
                ISSVRegistryCalls::Validators(element) => element.encode(),
                ISSVRegistryCalls::ValidatorsPerOperatorCount(element) => element.encode(),
            }
        }
    }
    impl ::std::fmt::Display for ISSVRegistryCalls {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                ISSVRegistryCalls::ActiveValidatorCount(element) => element.fmt(f),
                ISSVRegistryCalls::DisableOwnerValidators(element) => element.fmt(f),
                ISSVRegistryCalls::EnableOwnerValidators(element) => element.fmt(f),
                ISSVRegistryCalls::GetOperatorById(element) => element.fmt(f),
                ISSVRegistryCalls::GetOperatorFee(element) => element.fmt(f),
                ISSVRegistryCalls::GetOperatorOwner(element) => element.fmt(f),
                ISSVRegistryCalls::GetOperatorsByOwnerAddress(element) => element.fmt(f),
                ISSVRegistryCalls::GetOperatorsByValidator(element) => element.fmt(f),
                ISSVRegistryCalls::GetValidatorOwner(element) => element.fmt(f),
                ISSVRegistryCalls::GetValidatorsByAddress(element) => element.fmt(f),
                ISSVRegistryCalls::Initialize(element) => element.fmt(f),
                ISSVRegistryCalls::IsLiquidated(element) => element.fmt(f),
                ISSVRegistryCalls::RegisterOperator(element) => element.fmt(f),
                ISSVRegistryCalls::RegisterValidator(element) => element.fmt(f),
                ISSVRegistryCalls::RemoveOperator(element) => element.fmt(f),
                ISSVRegistryCalls::RemoveValidator(element) => element.fmt(f),
                ISSVRegistryCalls::UpdateOperatorFee(element) => element.fmt(f),
                ISSVRegistryCalls::UpdateOperatorScore(element) => element.fmt(f),
                ISSVRegistryCalls::Validators(element) => element.fmt(f),
                ISSVRegistryCalls::ValidatorsPerOperatorCount(element) => element.fmt(f),
            }
        }
    }
    impl ::std::convert::From<ActiveValidatorCountCall> for ISSVRegistryCalls {
        fn from(var: ActiveValidatorCountCall) -> Self {
            ISSVRegistryCalls::ActiveValidatorCount(var)
        }
    }
    impl ::std::convert::From<DisableOwnerValidatorsCall> for ISSVRegistryCalls {
        fn from(var: DisableOwnerValidatorsCall) -> Self {
            ISSVRegistryCalls::DisableOwnerValidators(var)
        }
    }
    impl ::std::convert::From<EnableOwnerValidatorsCall> for ISSVRegistryCalls {
        fn from(var: EnableOwnerValidatorsCall) -> Self {
            ISSVRegistryCalls::EnableOwnerValidators(var)
        }
    }
    impl ::std::convert::From<GetOperatorByIdCall> for ISSVRegistryCalls {
        fn from(var: GetOperatorByIdCall) -> Self {
            ISSVRegistryCalls::GetOperatorById(var)
        }
    }
    impl ::std::convert::From<GetOperatorFeeCall> for ISSVRegistryCalls {
        fn from(var: GetOperatorFeeCall) -> Self {
            ISSVRegistryCalls::GetOperatorFee(var)
        }
    }
    impl ::std::convert::From<GetOperatorOwnerCall> for ISSVRegistryCalls {
        fn from(var: GetOperatorOwnerCall) -> Self {
            ISSVRegistryCalls::GetOperatorOwner(var)
        }
    }
    impl ::std::convert::From<GetOperatorsByOwnerAddressCall> for ISSVRegistryCalls {
        fn from(var: GetOperatorsByOwnerAddressCall) -> Self {
            ISSVRegistryCalls::GetOperatorsByOwnerAddress(var)
        }
    }
    impl ::std::convert::From<GetOperatorsByValidatorCall> for ISSVRegistryCalls {
        fn from(var: GetOperatorsByValidatorCall) -> Self {
            ISSVRegistryCalls::GetOperatorsByValidator(var)
        }
    }
    impl ::std::convert::From<GetValidatorOwnerCall> for ISSVRegistryCalls {
        fn from(var: GetValidatorOwnerCall) -> Self {
            ISSVRegistryCalls::GetValidatorOwner(var)
        }
    }
    impl ::std::convert::From<GetValidatorsByAddressCall> for ISSVRegistryCalls {
        fn from(var: GetValidatorsByAddressCall) -> Self {
            ISSVRegistryCalls::GetValidatorsByAddress(var)
        }
    }
    impl ::std::convert::From<InitializeCall> for ISSVRegistryCalls {
        fn from(var: InitializeCall) -> Self {
            ISSVRegistryCalls::Initialize(var)
        }
    }
    impl ::std::convert::From<IsLiquidatedCall> for ISSVRegistryCalls {
        fn from(var: IsLiquidatedCall) -> Self {
            ISSVRegistryCalls::IsLiquidated(var)
        }
    }
    impl ::std::convert::From<RegisterOperatorCall> for ISSVRegistryCalls {
        fn from(var: RegisterOperatorCall) -> Self {
            ISSVRegistryCalls::RegisterOperator(var)
        }
    }
    impl ::std::convert::From<RegisterValidatorCall> for ISSVRegistryCalls {
        fn from(var: RegisterValidatorCall) -> Self {
            ISSVRegistryCalls::RegisterValidator(var)
        }
    }
    impl ::std::convert::From<RemoveOperatorCall> for ISSVRegistryCalls {
        fn from(var: RemoveOperatorCall) -> Self {
            ISSVRegistryCalls::RemoveOperator(var)
        }
    }
    impl ::std::convert::From<RemoveValidatorCall> for ISSVRegistryCalls {
        fn from(var: RemoveValidatorCall) -> Self {
            ISSVRegistryCalls::RemoveValidator(var)
        }
    }
    impl ::std::convert::From<UpdateOperatorFeeCall> for ISSVRegistryCalls {
        fn from(var: UpdateOperatorFeeCall) -> Self {
            ISSVRegistryCalls::UpdateOperatorFee(var)
        }
    }
    impl ::std::convert::From<UpdateOperatorScoreCall> for ISSVRegistryCalls {
        fn from(var: UpdateOperatorScoreCall) -> Self {
            ISSVRegistryCalls::UpdateOperatorScore(var)
        }
    }
    impl ::std::convert::From<ValidatorsCall> for ISSVRegistryCalls {
        fn from(var: ValidatorsCall) -> Self {
            ISSVRegistryCalls::Validators(var)
        }
    }
    impl ::std::convert::From<ValidatorsPerOperatorCountCall> for ISSVRegistryCalls {
        fn from(var: ValidatorsPerOperatorCountCall) -> Self {
            ISSVRegistryCalls::ValidatorsPerOperatorCount(var)
        }
    }
    #[doc = "Container type for all return fields from the `activeValidatorCount` function with signature `activeValidatorCount()` and selector `0x2340e8d3`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct ActiveValidatorCountReturn(pub u32);
    #[doc = "Container type for all return fields from the `getOperatorById` function with signature `getOperatorById(uint32)` and selector `0x0260d443`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetOperatorByIdReturn(
        pub String,
        pub ethers::core::types::Address,
        pub ethers::core::types::Bytes,
        pub ethers::core::types::U256,
        pub ethers::core::types::U256,
        pub ethers::core::types::U256,
        pub bool,
    );
    #[doc = "Container type for all return fields from the `getOperatorFee` function with signature `getOperatorFee(uint32)` and selector `0xf8f08d7f`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetOperatorFeeReturn(pub u64);
    #[doc = "Container type for all return fields from the `getOperatorOwner` function with signature `getOperatorOwner(uint32)` and selector `0xe7b21748`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetOperatorOwnerReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `getOperatorsByOwnerAddress` function with signature `getOperatorsByOwnerAddress(address)` and selector `0x0dc1eeff`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetOperatorsByOwnerAddressReturn(pub ::std::vec::Vec<u32>);
    #[doc = "Container type for all return fields from the `getOperatorsByValidator` function with signature `getOperatorsByValidator(bytes)` and selector `0x053e8349`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetOperatorsByValidatorReturn(pub ::std::vec::Vec<u32>);
    #[doc = "Container type for all return fields from the `getValidatorOwner` function with signature `getValidatorOwner(bytes)` and selector `0xc87b3038`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetValidatorOwnerReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `getValidatorsByAddress` function with signature `getValidatorsByAddress(address)` and selector `0x0e32066a`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetValidatorsByAddressReturn(pub ::std::vec::Vec<ethers::core::types::Bytes>);
    #[doc = "Container type for all return fields from the `isLiquidated` function with signature `isLiquidated(address)` and selector `0xa3b3f606`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct IsLiquidatedReturn(pub bool);
    #[doc = "Container type for all return fields from the `registerOperator` function with signature `registerOperator(string,address,bytes,uint64)` and selector `0x580ee1b8`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct RegisterOperatorReturn(pub u32);
    #[doc = "Container type for all return fields from the `validators` function with signature `validators(bytes)` and selector `0x6c36511a`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct ValidatorsReturn(
        pub ethers::core::types::Address,
        pub ethers::core::types::Bytes,
        pub bool,
    );
    #[doc = "Container type for all return fields from the `validatorsPerOperatorCount` function with signature `validatorsPerOperatorCount(uint32)` and selector `0xd379a5f2`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct ValidatorsPerOperatorCountReturn(pub u32);
}
