pub use i_quadrata::*;
#[allow(clippy::too_many_arguments, non_camel_case_types)]
pub mod i_quadrata {
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
    #[doc = "IQuadrata was auto-generated with ethers-rs Abigen. More information at: https://github.com/gakonst/ethers-rs"]
    use std::sync::Arc;
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"_attribute\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getAttributesFree\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static IQUADRATA_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    pub struct IQuadrata<M>(ethers::contract::Contract<M>);
    impl<M> Clone for IQuadrata<M> {
        fn clone(&self) -> Self {
            IQuadrata(self.0.clone())
        }
    }
    impl<M> std::ops::Deref for IQuadrata<M> {
        type Target = ethers::contract::Contract<M>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
    impl<M> std::fmt::Debug for IQuadrata<M> {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            f.debug_tuple(stringify!(IQuadrata))
                .field(&self.address())
                .finish()
        }
    }
    impl<M: ethers::providers::Middleware> IQuadrata<M> {
        #[doc = r" Creates a new contract instance with the specified `ethers`"]
        #[doc = r" client at the given `Address`. The contract derefs to a `ethers::Contract`"]
        #[doc = r" object"]
        pub fn new<T: Into<ethers::core::types::Address>>(
            address: T,
            client: ::std::sync::Arc<M>,
        ) -> Self {
            ethers::contract::Contract::new(address.into(), IQUADRATA_ABI.clone(), client).into()
        }
        #[doc = "Calls the contract's `getAttributesFree` (0xd8b5ab67) function"]
        pub fn get_attributes_free(
            &self,
            account: ethers::core::types::Address,
            token_id: ethers::core::types::U256,
            attribute: [u8; 32],
        ) -> ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([216, 181, 171, 103], (account, token_id, attribute))
                .expect("method not found (this should never happen)")
        }
    }
    impl<M: ethers::providers::Middleware> From<ethers::contract::Contract<M>> for IQuadrata<M> {
        fn from(contract: ethers::contract::Contract<M>) -> Self {
            Self(contract)
        }
    }
    #[doc = "Container type for all input parameters for the `getAttributesFree` function with signature `getAttributesFree(address,uint256,bytes32)` and selector `[216, 181, 171, 103]`"]
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
        name = "getAttributesFree",
        abi = "getAttributesFree(address,uint256,bytes32)"
    )]
    pub struct GetAttributesFreeCall {
        pub account: ethers::core::types::Address,
        pub token_id: ethers::core::types::U256,
        pub attribute: [u8; 32],
    }
    #[doc = "Container type for all return fields from the `getAttributesFree` function with signature `getAttributesFree(address,uint256,bytes32)` and selector `[216, 181, 171, 103]`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetAttributesFreeReturn(pub bool);
}
