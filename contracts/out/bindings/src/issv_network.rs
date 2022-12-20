pub use issv_network::*;
#[allow(clippy::too_many_arguments, non_camel_case_types)]
pub mod issv_network {
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
    #[doc = "ISSVNetwork was auto-generated with ethers-rs Abigen. More information at: https://github.com/gakonst/ethers-rs"]
    use std::sync::Arc;
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[],\"type\":\"error\",\"name\":\"AccountAlreadyEnabled\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"ApprovalNotWithinTimeframe\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"BelowMinimumBlockPeriod\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"BurnRatePositive\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"CallerNotOperatorOwner\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"CallerNotValidatorOwner\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"ExceedManagingOperatorsPerAccountLimit\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"FeeExceedsIncreaseLimit\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"FeeTooLow\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"NegativeBalance\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"NoPendingFeeChangeRequest\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"NotEnoughBalance\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"OperatorWithPublicKeyNotExist\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"ValidatorWithPublicKeyNotExist\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AccountEnable\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AccountLiquidation\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DeclareOperatorFeePeriodUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DeclaredOperatorFeeCancelation\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"ExecuteOperatorFeePeriodUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"senderAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"FundsDeposit\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"FundsWithdrawal\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"LiquidationThresholdPeriodUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"MinimumBlocksBeforeLiquidationUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"oldFee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"newFee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"NetworkFeeUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"NetworkFeesWithdrawal\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"blockNumber\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OperatorFeeDeclaration\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"blockNumber\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OperatorFeeExecution\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OperatorFeeIncreaseLimitUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OperatorMaxFeeIncreaseUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"id\",\"type\":\"uint32\",\"components\":[],\"indexed\":true},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OperatorRegistration\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OperatorRemoval\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"blockNumber\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"score\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OperatorScoreUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"RegisteredOperatorsPerAccountLimitUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes[]\",\"name\":\"encryptedKeys\",\"type\":\"bytes[]\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"ValidatorRegistration\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"ValidatorRemoval\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"ValidatorsPerOperatorLimitUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"addressNetworkFee\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"cancelDeclaredOperatorFee\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"operatorFee\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"declareOperatorFee\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"tokenAmount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"deposit\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"executeOperatorFee\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getAddressBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getAddressBurnRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getDeclaredOperatorFeePeriod\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getExecuteOperatorFeePeriod\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getLiquidationThresholdPeriod\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getNetworkEarnings\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getNetworkFee\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorById\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorDeclaredFee\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorFee\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorFeeIncreaseLimit\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"validatorPublicKey\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOperatorsByValidator\",\"outputs\":[{\"internalType\":\"uint32[]\",\"name\":\"\",\"type\":\"uint32[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidatorsByOwnerAddress\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"contract ISSVRegistry\",\"name\":\"registryAddress_\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"contract IERC20\",\"name\":\"token_\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint64\",\"name\":\"minimumBlocksBeforeLiquidation_\",\"type\":\"uint64\",\"components\":[]},{\"internalType\":\"uint64\",\"name\":\"operatorMaxFeeIncrease_\",\"type\":\"uint64\",\"components\":[]},{\"internalType\":\"uint64\",\"name\":\"declareOperatorFeePeriod_\",\"type\":\"uint64\",\"components\":[]},{\"internalType\":\"uint64\",\"name\":\"executeOperatorFeePeriod_\",\"type\":\"uint64\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"initialize\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"isLiquidatable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"ownerAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"isLiquidated\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"ownerAddresses\",\"type\":\"address[]\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"liquidate\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"reactivateAccount\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"registerOperator\",\"outputs\":[{\"internalType\":\"uint32\",\"name\":\"\",\"type\":\"uint32\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"registerValidator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"removeOperator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"removeValidator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"newDeclareOperatorFeePeriod\",\"type\":\"uint64\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateDeclareOperatorFeePeriod\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"newExecuteOperatorFeePeriod\",\"type\":\"uint64\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateExecuteOperatorFeePeriod\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"blocks\",\"type\":\"uint64\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateLiquidationThresholdPeriod\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"fee\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateNetworkFee\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"newOperatorMaxFeeIncrease\",\"type\":\"uint64\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateOperatorFeeIncreaseLimit\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]},{\"internalType\":\"uint32\",\"name\":\"score\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateOperatorScore\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"updateValidator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint32\",\"name\":\"operatorId\",\"type\":\"uint32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"validatorsPerOperatorCount\",\"outputs\":[{\"internalType\":\"uint32\",\"name\":\"\",\"type\":\"uint32\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenAmount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"withdraw\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"withdrawAll\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"withdrawNetworkEarnings\",\"outputs\":[]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static ISSVNETWORK_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    pub struct ISSVNetwork<M>(ethers::contract::Contract<M>);
    impl<M> Clone for ISSVNetwork<M> {
        fn clone(&self) -> Self {
            ISSVNetwork(self.0.clone())
        }
    }
    impl<M> std::ops::Deref for ISSVNetwork<M> {
        type Target = ethers::contract::Contract<M>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
    impl<M> std::fmt::Debug for ISSVNetwork<M> {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            f.debug_tuple(stringify!(ISSVNetwork))
                .field(&self.address())
                .finish()
        }
    }
    impl<M: ethers::providers::Middleware> ISSVNetwork<M> {
        #[doc = r" Creates a new contract instance with the specified `ethers`"]
        #[doc = r" client at the given `Address`. The contract derefs to a `ethers::Contract`"]
        #[doc = r" object"]
        pub fn new<T: Into<ethers::core::types::Address>>(
            address: T,
            client: ::std::sync::Arc<M>,
        ) -> Self {
            ethers::contract::Contract::new(address.into(), ISSVNETWORK_ABI.clone(), client).into()
        }
        #[doc = "Calls the contract's `addressNetworkFee` (0x56d9a2cc) function"]
        pub fn address_network_fee(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([86, 217, 162, 204], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `cancelDeclaredOperatorFee` (0x154996bb) function"]
        pub fn cancel_declared_operator_fee(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([21, 73, 150, 187], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `declareOperatorFee` (0x70f97314) function"]
        pub fn declare_operator_fee(
            &self,
            operator_id: u32,
            operator_fee: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([112, 249, 115, 20], (operator_id, operator_fee))
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `deposit` (0x47e7ef24) function"]
        pub fn deposit(
            &self,
            owner_address: ethers::core::types::Address,
            token_amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([71, 231, 239, 36], (owner_address, token_amount))
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `executeOperatorFee` (0x400aa7ce) function"]
        pub fn execute_operator_fee(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([64, 10, 167, 206], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getAddressBalance` (0x35046722) function"]
        pub fn get_address_balance(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([53, 4, 103, 34], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getAddressBurnRate` (0x2563c64e) function"]
        pub fn get_address_burn_rate(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([37, 99, 198, 78], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getDeclaredOperatorFeePeriod` (0x1be2bd74) function"]
        pub fn get_declared_operator_fee_period(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([27, 226, 189, 116], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getExecuteOperatorFeePeriod` (0xdd83fcb6) function"]
        pub fn get_execute_operator_fee_period(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([221, 131, 252, 182], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getLiquidationThresholdPeriod` (0x9040f7c3) function"]
        pub fn get_liquidation_threshold_period(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([144, 64, 247, 195], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getNetworkEarnings` (0x777915cb) function"]
        pub fn get_network_earnings(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([119, 121, 21, 203], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getNetworkFee` (0xfc043830) function"]
        pub fn get_network_fee(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([252, 4, 56, 48], ())
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
        #[doc = "Calls the contract's `getOperatorDeclaredFee` (0x85747566) function"]
        pub fn get_operator_declared_fee(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<
            M,
            (
                ethers::core::types::U256,
                ethers::core::types::U256,
                ethers::core::types::U256,
            ),
        > {
            self.0
                .method_hash([133, 116, 117, 102], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getOperatorFee` (0xf8f08d7f) function"]
        pub fn get_operator_fee(
            &self,
            operator_id: u32,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([248, 240, 141, 127], operator_id)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getOperatorFeeIncreaseLimit` (0x68465f7d) function"]
        pub fn get_operator_fee_increase_limit(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::U256> {
            self.0
                .method_hash([104, 70, 95, 125], ())
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
        #[doc = "Calls the contract's `getValidatorsByOwnerAddress` (0x57c7ce22) function"]
        pub fn get_validators_by_owner_address(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ::std::vec::Vec<ethers::core::types::Bytes>>
        {
            self.0
                .method_hash([87, 199, 206, 34], owner_address)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `initialize` (0x36881f18) function"]
        pub fn initialize(
            &self,
            registry_address: ethers::core::types::Address,
            token: ethers::core::types::Address,
            minimum_blocks_before_liquidation: u64,
            operator_max_fee_increase: u64,
            declare_operator_fee_period: u64,
            execute_operator_fee_period: u64,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [54, 136, 31, 24],
                    (
                        registry_address,
                        token,
                        minimum_blocks_before_liquidation,
                        operator_max_fee_increase,
                        declare_operator_fee_period,
                        execute_operator_fee_period,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `isLiquidatable` (0x042e02cf) function"]
        pub fn is_liquidatable(
            &self,
            owner_address: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([4, 46, 2, 207], owner_address)
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
        #[doc = "Calls the contract's `liquidate` (0xa985994b) function"]
        pub fn liquidate(
            &self,
            owner_addresses: ::std::vec::Vec<ethers::core::types::Address>,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([169, 133, 153, 75], owner_addresses)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `reactivateAccount` (0x2afe872f) function"]
        pub fn reactivate_account(
            &self,
            amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([42, 254, 135, 47], amount)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `registerOperator` (0xb083ab35) function"]
        pub fn register_operator(
            &self,
            name: String,
            public_key: ethers::core::types::Bytes,
            fee: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, u32> {
            self.0
                .method_hash([176, 131, 171, 53], (name, public_key, fee))
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `registerValidator` (0xe40cb19d) function"]
        pub fn register_validator(
            &self,
            public_key: ethers::core::types::Bytes,
            operator_ids: ::std::vec::Vec<u32>,
            shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
            shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
            amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [228, 12, 177, 157],
                    (
                        public_key,
                        operator_ids,
                        shares_public_keys,
                        shares_encrypted,
                        amount,
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
        #[doc = "Calls the contract's `updateDeclareOperatorFeePeriod` (0x79e3e4e4) function"]
        pub fn update_declare_operator_fee_period(
            &self,
            new_declare_operator_fee_period: u64,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([121, 227, 228, 228], new_declare_operator_fee_period)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `updateExecuteOperatorFeePeriod` (0xeb608022) function"]
        pub fn update_execute_operator_fee_period(
            &self,
            new_execute_operator_fee_period: u64,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([235, 96, 128, 34], new_execute_operator_fee_period)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `updateLiquidationThresholdPeriod` (0x6512447d) function"]
        pub fn update_liquidation_threshold_period(
            &self,
            blocks: u64,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([101, 18, 68, 125], blocks)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `updateNetworkFee` (0x1f1f9fd5) function"]
        pub fn update_network_fee(
            &self,
            fee: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([31, 31, 159, 213], fee)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `updateOperatorFeeIncreaseLimit` (0x3631983f) function"]
        pub fn update_operator_fee_increase_limit(
            &self,
            new_operator_max_fee_increase: u64,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([54, 49, 152, 63], new_operator_max_fee_increase)
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
        #[doc = "Calls the contract's `updateValidator` (0x21f7957b) function"]
        pub fn update_validator(
            &self,
            public_key: ethers::core::types::Bytes,
            operator_ids: ::std::vec::Vec<u32>,
            shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
            shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
            amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [33, 247, 149, 123],
                    (
                        public_key,
                        operator_ids,
                        shares_public_keys,
                        shares_encrypted,
                        amount,
                    ),
                )
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
        #[doc = "Calls the contract's `withdraw` (0x2e1a7d4d) function"]
        pub fn withdraw(
            &self,
            token_amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([46, 26, 125, 77], token_amount)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `withdrawAll` (0x853828b6) function"]
        pub fn withdraw_all(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([133, 56, 40, 182], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `withdrawNetworkEarnings` (0xd2231741) function"]
        pub fn withdraw_network_earnings(
            &self,
            amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([210, 35, 23, 65], amount)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Gets the contract's `AccountEnable` event"]
        pub fn account_enable_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, AccountEnableFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `AccountLiquidation` event"]
        pub fn account_liquidation_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, AccountLiquidationFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `DeclareOperatorFeePeriodUpdate` event"]
        pub fn declare_operator_fee_period_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DeclareOperatorFeePeriodUpdateFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `DeclaredOperatorFeeCancelation` event"]
        pub fn declared_operator_fee_cancelation_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DeclaredOperatorFeeCancelationFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `ExecuteOperatorFeePeriodUpdate` event"]
        pub fn execute_operator_fee_period_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, ExecuteOperatorFeePeriodUpdateFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `FundsDeposit` event"]
        pub fn funds_deposit_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, FundsDepositFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `FundsWithdrawal` event"]
        pub fn funds_withdrawal_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, FundsWithdrawalFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `LiquidationThresholdPeriodUpdate` event"]
        pub fn liquidation_threshold_period_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, LiquidationThresholdPeriodUpdateFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `MinimumBlocksBeforeLiquidationUpdate` event"]
        pub fn minimum_blocks_before_liquidation_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, MinimumBlocksBeforeLiquidationUpdateFilter>
        {
            self.0.event()
        }
        #[doc = "Gets the contract's `NetworkFeeUpdate` event"]
        pub fn network_fee_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, NetworkFeeUpdateFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `NetworkFeesWithdrawal` event"]
        pub fn network_fees_withdrawal_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, NetworkFeesWithdrawalFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OperatorFeeDeclaration` event"]
        pub fn operator_fee_declaration_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OperatorFeeDeclarationFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OperatorFeeExecution` event"]
        pub fn operator_fee_execution_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OperatorFeeExecutionFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OperatorFeeIncreaseLimitUpdate` event"]
        pub fn operator_fee_increase_limit_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OperatorFeeIncreaseLimitUpdateFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OperatorMaxFeeIncreaseUpdate` event"]
        pub fn operator_max_fee_increase_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OperatorMaxFeeIncreaseUpdateFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OperatorRegistration` event"]
        pub fn operator_registration_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OperatorRegistrationFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OperatorRemoval` event"]
        pub fn operator_removal_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OperatorRemovalFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OperatorScoreUpdate` event"]
        pub fn operator_score_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OperatorScoreUpdateFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `RegisteredOperatorsPerAccountLimitUpdate` event"]
        pub fn registered_operators_per_account_limit_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, RegisteredOperatorsPerAccountLimitUpdateFilter>
        {
            self.0.event()
        }
        #[doc = "Gets the contract's `ValidatorRegistration` event"]
        pub fn validator_registration_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, ValidatorRegistrationFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `ValidatorRemoval` event"]
        pub fn validator_removal_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, ValidatorRemovalFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `ValidatorsPerOperatorLimitUpdate` event"]
        pub fn validators_per_operator_limit_update_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, ValidatorsPerOperatorLimitUpdateFilter> {
            self.0.event()
        }
        #[doc = r" Returns an [`Event`](#ethers_contract::builders::Event) builder for all events of this contract"]
        pub fn events(&self) -> ethers::contract::builders::Event<M, ISSVNetworkEvents> {
            self.0.event_with_filter(Default::default())
        }
    }
    impl<M: ethers::providers::Middleware> From<ethers::contract::Contract<M>> for ISSVNetwork<M> {
        fn from(contract: ethers::contract::Contract<M>) -> Self {
            Self(contract)
        }
    }
    #[doc = "Custom Error type `AccountAlreadyEnabled` with signature `AccountAlreadyEnabled()` and selector `0x44fab0e0`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "AccountAlreadyEnabled", abi = "AccountAlreadyEnabled()")]
    pub struct AccountAlreadyEnabled;
    #[doc = "Custom Error type `ApprovalNotWithinTimeframe` with signature `ApprovalNotWithinTimeframe()` and selector `0x97e4b518`"]
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
        name = "ApprovalNotWithinTimeframe",
        abi = "ApprovalNotWithinTimeframe()"
    )]
    pub struct ApprovalNotWithinTimeframe;
    #[doc = "Custom Error type `BelowMinimumBlockPeriod` with signature `BelowMinimumBlockPeriod()` and selector `0xb4cce013`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "BelowMinimumBlockPeriod", abi = "BelowMinimumBlockPeriod()")]
    pub struct BelowMinimumBlockPeriod;
    #[doc = "Custom Error type `BurnRatePositive` with signature `BurnRatePositive()` and selector `0xf457a878`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "BurnRatePositive", abi = "BurnRatePositive()")]
    pub struct BurnRatePositive;
    #[doc = "Custom Error type `CallerNotOperatorOwner` with signature `CallerNotOperatorOwner()` and selector `0xec4de4c9`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "CallerNotOperatorOwner", abi = "CallerNotOperatorOwner()")]
    pub struct CallerNotOperatorOwner;
    #[doc = "Custom Error type `CallerNotValidatorOwner` with signature `CallerNotValidatorOwner()` and selector `0x11ecf9f2`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "CallerNotValidatorOwner", abi = "CallerNotValidatorOwner()")]
    pub struct CallerNotValidatorOwner;
    #[doc = "Custom Error type `ExceedManagingOperatorsPerAccountLimit` with signature `ExceedManagingOperatorsPerAccountLimit()` and selector `0x97221803`"]
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
        name = "ExceedManagingOperatorsPerAccountLimit",
        abi = "ExceedManagingOperatorsPerAccountLimit()"
    )]
    pub struct ExceedManagingOperatorsPerAccountLimit;
    #[doc = "Custom Error type `FeeExceedsIncreaseLimit` with signature `FeeExceedsIncreaseLimit()` and selector `0x958065d9`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "FeeExceedsIncreaseLimit", abi = "FeeExceedsIncreaseLimit()")]
    pub struct FeeExceedsIncreaseLimit;
    #[doc = "Custom Error type `FeeTooLow` with signature `FeeTooLow()` and selector `0x732f9413`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "FeeTooLow", abi = "FeeTooLow()")]
    pub struct FeeTooLow;
    #[doc = "Custom Error type `NegativeBalance` with signature `NegativeBalance()` and selector `0x5e13ed31`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "NegativeBalance", abi = "NegativeBalance()")]
    pub struct NegativeBalance;
    #[doc = "Custom Error type `NoPendingFeeChangeRequest` with signature `NoPendingFeeChangeRequest()` and selector `0xa6cae016`"]
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
        name = "NoPendingFeeChangeRequest",
        abi = "NoPendingFeeChangeRequest()"
    )]
    pub struct NoPendingFeeChangeRequest;
    #[doc = "Custom Error type `NotEnoughBalance` with signature `NotEnoughBalance()` and selector `0xad3a8b9e`"]
    #[derive(
        Clone,
        Debug,
        Default,
        Eq,
        PartialEq,
        ethers :: contract :: EthError,
        ethers :: contract :: EthDisplay,
    )]
    #[etherror(name = "NotEnoughBalance", abi = "NotEnoughBalance()")]
    pub struct NotEnoughBalance;
    #[doc = "Custom Error type `OperatorWithPublicKeyNotExist` with signature `OperatorWithPublicKeyNotExist()` and selector `0xd5528c86`"]
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
        name = "OperatorWithPublicKeyNotExist",
        abi = "OperatorWithPublicKeyNotExist()"
    )]
    pub struct OperatorWithPublicKeyNotExist;
    #[doc = "Custom Error type `ValidatorWithPublicKeyNotExist` with signature `ValidatorWithPublicKeyNotExist()` and selector `0x8791c3b4`"]
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
        name = "ValidatorWithPublicKeyNotExist",
        abi = "ValidatorWithPublicKeyNotExist()"
    )]
    pub struct ValidatorWithPublicKeyNotExist;
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum ISSVNetworkErrors {
        AccountAlreadyEnabled(AccountAlreadyEnabled),
        ApprovalNotWithinTimeframe(ApprovalNotWithinTimeframe),
        BelowMinimumBlockPeriod(BelowMinimumBlockPeriod),
        BurnRatePositive(BurnRatePositive),
        CallerNotOperatorOwner(CallerNotOperatorOwner),
        CallerNotValidatorOwner(CallerNotValidatorOwner),
        ExceedManagingOperatorsPerAccountLimit(ExceedManagingOperatorsPerAccountLimit),
        FeeExceedsIncreaseLimit(FeeExceedsIncreaseLimit),
        FeeTooLow(FeeTooLow),
        NegativeBalance(NegativeBalance),
        NoPendingFeeChangeRequest(NoPendingFeeChangeRequest),
        NotEnoughBalance(NotEnoughBalance),
        OperatorWithPublicKeyNotExist(OperatorWithPublicKeyNotExist),
        ValidatorWithPublicKeyNotExist(ValidatorWithPublicKeyNotExist),
    }
    impl ethers::core::abi::AbiDecode for ISSVNetworkErrors {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::std::result::Result<Self, ethers::core::abi::AbiError> {
            if let Ok(decoded) =
                <AccountAlreadyEnabled as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::AccountAlreadyEnabled(decoded));
            }
            if let Ok(decoded) =
                <ApprovalNotWithinTimeframe as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::ApprovalNotWithinTimeframe(decoded));
            }
            if let Ok(decoded) =
                <BelowMinimumBlockPeriod as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::BelowMinimumBlockPeriod(decoded));
            }
            if let Ok(decoded) =
                <BurnRatePositive as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::BurnRatePositive(decoded));
            }
            if let Ok(decoded) =
                <CallerNotOperatorOwner as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::CallerNotOperatorOwner(decoded));
            }
            if let Ok(decoded) =
                <CallerNotValidatorOwner as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::CallerNotValidatorOwner(decoded));
            }
            if let Ok(decoded) =
                <ExceedManagingOperatorsPerAccountLimit as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkErrors::ExceedManagingOperatorsPerAccountLimit(
                    decoded,
                ));
            }
            if let Ok(decoded) =
                <FeeExceedsIncreaseLimit as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::FeeExceedsIncreaseLimit(decoded));
            }
            if let Ok(decoded) = <FeeTooLow as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::FeeTooLow(decoded));
            }
            if let Ok(decoded) =
                <NegativeBalance as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::NegativeBalance(decoded));
            }
            if let Ok(decoded) =
                <NoPendingFeeChangeRequest as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::NoPendingFeeChangeRequest(decoded));
            }
            if let Ok(decoded) =
                <NotEnoughBalance as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkErrors::NotEnoughBalance(decoded));
            }
            if let Ok(decoded) =
                <OperatorWithPublicKeyNotExist as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkErrors::OperatorWithPublicKeyNotExist(decoded));
            }
            if let Ok(decoded) =
                <ValidatorWithPublicKeyNotExist as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkErrors::ValidatorWithPublicKeyNotExist(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ethers::core::abi::AbiEncode for ISSVNetworkErrors {
        fn encode(self) -> Vec<u8> {
            match self {
                ISSVNetworkErrors::AccountAlreadyEnabled(element) => element.encode(),
                ISSVNetworkErrors::ApprovalNotWithinTimeframe(element) => element.encode(),
                ISSVNetworkErrors::BelowMinimumBlockPeriod(element) => element.encode(),
                ISSVNetworkErrors::BurnRatePositive(element) => element.encode(),
                ISSVNetworkErrors::CallerNotOperatorOwner(element) => element.encode(),
                ISSVNetworkErrors::CallerNotValidatorOwner(element) => element.encode(),
                ISSVNetworkErrors::ExceedManagingOperatorsPerAccountLimit(element) => {
                    element.encode()
                }
                ISSVNetworkErrors::FeeExceedsIncreaseLimit(element) => element.encode(),
                ISSVNetworkErrors::FeeTooLow(element) => element.encode(),
                ISSVNetworkErrors::NegativeBalance(element) => element.encode(),
                ISSVNetworkErrors::NoPendingFeeChangeRequest(element) => element.encode(),
                ISSVNetworkErrors::NotEnoughBalance(element) => element.encode(),
                ISSVNetworkErrors::OperatorWithPublicKeyNotExist(element) => element.encode(),
                ISSVNetworkErrors::ValidatorWithPublicKeyNotExist(element) => element.encode(),
            }
        }
    }
    impl ::std::fmt::Display for ISSVNetworkErrors {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                ISSVNetworkErrors::AccountAlreadyEnabled(element) => element.fmt(f),
                ISSVNetworkErrors::ApprovalNotWithinTimeframe(element) => element.fmt(f),
                ISSVNetworkErrors::BelowMinimumBlockPeriod(element) => element.fmt(f),
                ISSVNetworkErrors::BurnRatePositive(element) => element.fmt(f),
                ISSVNetworkErrors::CallerNotOperatorOwner(element) => element.fmt(f),
                ISSVNetworkErrors::CallerNotValidatorOwner(element) => element.fmt(f),
                ISSVNetworkErrors::ExceedManagingOperatorsPerAccountLimit(element) => {
                    element.fmt(f)
                }
                ISSVNetworkErrors::FeeExceedsIncreaseLimit(element) => element.fmt(f),
                ISSVNetworkErrors::FeeTooLow(element) => element.fmt(f),
                ISSVNetworkErrors::NegativeBalance(element) => element.fmt(f),
                ISSVNetworkErrors::NoPendingFeeChangeRequest(element) => element.fmt(f),
                ISSVNetworkErrors::NotEnoughBalance(element) => element.fmt(f),
                ISSVNetworkErrors::OperatorWithPublicKeyNotExist(element) => element.fmt(f),
                ISSVNetworkErrors::ValidatorWithPublicKeyNotExist(element) => element.fmt(f),
            }
        }
    }
    impl ::std::convert::From<AccountAlreadyEnabled> for ISSVNetworkErrors {
        fn from(var: AccountAlreadyEnabled) -> Self {
            ISSVNetworkErrors::AccountAlreadyEnabled(var)
        }
    }
    impl ::std::convert::From<ApprovalNotWithinTimeframe> for ISSVNetworkErrors {
        fn from(var: ApprovalNotWithinTimeframe) -> Self {
            ISSVNetworkErrors::ApprovalNotWithinTimeframe(var)
        }
    }
    impl ::std::convert::From<BelowMinimumBlockPeriod> for ISSVNetworkErrors {
        fn from(var: BelowMinimumBlockPeriod) -> Self {
            ISSVNetworkErrors::BelowMinimumBlockPeriod(var)
        }
    }
    impl ::std::convert::From<BurnRatePositive> for ISSVNetworkErrors {
        fn from(var: BurnRatePositive) -> Self {
            ISSVNetworkErrors::BurnRatePositive(var)
        }
    }
    impl ::std::convert::From<CallerNotOperatorOwner> for ISSVNetworkErrors {
        fn from(var: CallerNotOperatorOwner) -> Self {
            ISSVNetworkErrors::CallerNotOperatorOwner(var)
        }
    }
    impl ::std::convert::From<CallerNotValidatorOwner> for ISSVNetworkErrors {
        fn from(var: CallerNotValidatorOwner) -> Self {
            ISSVNetworkErrors::CallerNotValidatorOwner(var)
        }
    }
    impl ::std::convert::From<ExceedManagingOperatorsPerAccountLimit> for ISSVNetworkErrors {
        fn from(var: ExceedManagingOperatorsPerAccountLimit) -> Self {
            ISSVNetworkErrors::ExceedManagingOperatorsPerAccountLimit(var)
        }
    }
    impl ::std::convert::From<FeeExceedsIncreaseLimit> for ISSVNetworkErrors {
        fn from(var: FeeExceedsIncreaseLimit) -> Self {
            ISSVNetworkErrors::FeeExceedsIncreaseLimit(var)
        }
    }
    impl ::std::convert::From<FeeTooLow> for ISSVNetworkErrors {
        fn from(var: FeeTooLow) -> Self {
            ISSVNetworkErrors::FeeTooLow(var)
        }
    }
    impl ::std::convert::From<NegativeBalance> for ISSVNetworkErrors {
        fn from(var: NegativeBalance) -> Self {
            ISSVNetworkErrors::NegativeBalance(var)
        }
    }
    impl ::std::convert::From<NoPendingFeeChangeRequest> for ISSVNetworkErrors {
        fn from(var: NoPendingFeeChangeRequest) -> Self {
            ISSVNetworkErrors::NoPendingFeeChangeRequest(var)
        }
    }
    impl ::std::convert::From<NotEnoughBalance> for ISSVNetworkErrors {
        fn from(var: NotEnoughBalance) -> Self {
            ISSVNetworkErrors::NotEnoughBalance(var)
        }
    }
    impl ::std::convert::From<OperatorWithPublicKeyNotExist> for ISSVNetworkErrors {
        fn from(var: OperatorWithPublicKeyNotExist) -> Self {
            ISSVNetworkErrors::OperatorWithPublicKeyNotExist(var)
        }
    }
    impl ::std::convert::From<ValidatorWithPublicKeyNotExist> for ISSVNetworkErrors {
        fn from(var: ValidatorWithPublicKeyNotExist) -> Self {
            ISSVNetworkErrors::ValidatorWithPublicKeyNotExist(var)
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
    #[ethevent(name = "AccountEnable", abi = "AccountEnable(address)")]
    pub struct AccountEnableFilter {
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
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
    #[ethevent(name = "AccountLiquidation", abi = "AccountLiquidation(address)")]
    pub struct AccountLiquidationFilter {
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
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
        name = "DeclareOperatorFeePeriodUpdate",
        abi = "DeclareOperatorFeePeriodUpdate(uint256)"
    )]
    pub struct DeclareOperatorFeePeriodUpdateFilter {
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
    #[ethevent(
        name = "DeclaredOperatorFeeCancelation",
        abi = "DeclaredOperatorFeeCancelation(address,uint32)"
    )]
    pub struct DeclaredOperatorFeeCancelationFilter {
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        pub operator_id: u32,
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
        name = "ExecuteOperatorFeePeriodUpdate",
        abi = "ExecuteOperatorFeePeriodUpdate(uint256)"
    )]
    pub struct ExecuteOperatorFeePeriodUpdateFilter {
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
    #[ethevent(name = "FundsDeposit", abi = "FundsDeposit(uint256,address,address)")]
    pub struct FundsDepositFilter {
        pub value: ethers::core::types::U256,
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        #[ethevent(indexed)]
        pub sender_address: ethers::core::types::Address,
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
    #[ethevent(name = "FundsWithdrawal", abi = "FundsWithdrawal(uint256,address)")]
    pub struct FundsWithdrawalFilter {
        pub value: ethers::core::types::U256,
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
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
        name = "LiquidationThresholdPeriodUpdate",
        abi = "LiquidationThresholdPeriodUpdate(uint256)"
    )]
    pub struct LiquidationThresholdPeriodUpdateFilter {
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
    #[ethevent(
        name = "MinimumBlocksBeforeLiquidationUpdate",
        abi = "MinimumBlocksBeforeLiquidationUpdate(uint256)"
    )]
    pub struct MinimumBlocksBeforeLiquidationUpdateFilter {
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
    #[ethevent(name = "NetworkFeeUpdate", abi = "NetworkFeeUpdate(uint256,uint256)")]
    pub struct NetworkFeeUpdateFilter {
        pub old_fee: ethers::core::types::U256,
        pub new_fee: ethers::core::types::U256,
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
        name = "NetworkFeesWithdrawal",
        abi = "NetworkFeesWithdrawal(uint256,address)"
    )]
    pub struct NetworkFeesWithdrawalFilter {
        pub value: ethers::core::types::U256,
        pub recipient: ethers::core::types::Address,
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
        name = "OperatorFeeDeclaration",
        abi = "OperatorFeeDeclaration(address,uint32,uint256,uint256)"
    )]
    pub struct OperatorFeeDeclarationFilter {
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        pub operator_id: u32,
        pub block_number: ethers::core::types::U256,
        pub fee: ethers::core::types::U256,
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
        name = "OperatorFeeExecution",
        abi = "OperatorFeeExecution(address,uint32,uint256,uint256)"
    )]
    pub struct OperatorFeeExecutionFilter {
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        pub operator_id: u32,
        pub block_number: ethers::core::types::U256,
        pub fee: ethers::core::types::U256,
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
        name = "OperatorFeeIncreaseLimitUpdate",
        abi = "OperatorFeeIncreaseLimitUpdate(uint256)"
    )]
    pub struct OperatorFeeIncreaseLimitUpdateFilter {
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
    #[ethevent(
        name = "OperatorMaxFeeIncreaseUpdate",
        abi = "OperatorMaxFeeIncreaseUpdate(uint256)"
    )]
    pub struct OperatorMaxFeeIncreaseUpdateFilter {
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
    #[ethevent(
        name = "OperatorRegistration",
        abi = "OperatorRegistration(uint32,string,address,bytes,uint256)"
    )]
    pub struct OperatorRegistrationFilter {
        #[ethevent(indexed)]
        pub id: u32,
        pub name: String,
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        pub public_key: ethers::core::types::Bytes,
        pub fee: ethers::core::types::U256,
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
    #[ethevent(name = "OperatorRemoval", abi = "OperatorRemoval(uint32,address)")]
    pub struct OperatorRemovalFilter {
        pub operator_id: u32,
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
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
        name = "OperatorScoreUpdate",
        abi = "OperatorScoreUpdate(uint32,address,uint256,uint256)"
    )]
    pub struct OperatorScoreUpdateFilter {
        pub operator_id: u32,
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        pub block_number: ethers::core::types::U256,
        pub score: ethers::core::types::U256,
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
        name = "RegisteredOperatorsPerAccountLimitUpdate",
        abi = "RegisteredOperatorsPerAccountLimitUpdate(uint256)"
    )]
    pub struct RegisteredOperatorsPerAccountLimitUpdateFilter {
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
    #[ethevent(
        name = "ValidatorRegistration",
        abi = "ValidatorRegistration(address,bytes,uint32[],bytes[],bytes[])"
    )]
    pub struct ValidatorRegistrationFilter {
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        pub public_key: ethers::core::types::Bytes,
        pub operator_ids: Vec<u32>,
        pub shares_public_keys: Vec<ethers::core::types::Bytes>,
        pub encrypted_keys: Vec<ethers::core::types::Bytes>,
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
    #[ethevent(name = "ValidatorRemoval", abi = "ValidatorRemoval(address,bytes)")]
    pub struct ValidatorRemovalFilter {
        #[ethevent(indexed)]
        pub owner_address: ethers::core::types::Address,
        pub public_key: ethers::core::types::Bytes,
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
        name = "ValidatorsPerOperatorLimitUpdate",
        abi = "ValidatorsPerOperatorLimitUpdate(uint256)"
    )]
    pub struct ValidatorsPerOperatorLimitUpdateFilter {
        pub value: ethers::core::types::U256,
    }
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum ISSVNetworkEvents {
        AccountEnableFilter(AccountEnableFilter),
        AccountLiquidationFilter(AccountLiquidationFilter),
        DeclareOperatorFeePeriodUpdateFilter(DeclareOperatorFeePeriodUpdateFilter),
        DeclaredOperatorFeeCancelationFilter(DeclaredOperatorFeeCancelationFilter),
        ExecuteOperatorFeePeriodUpdateFilter(ExecuteOperatorFeePeriodUpdateFilter),
        FundsDepositFilter(FundsDepositFilter),
        FundsWithdrawalFilter(FundsWithdrawalFilter),
        LiquidationThresholdPeriodUpdateFilter(LiquidationThresholdPeriodUpdateFilter),
        MinimumBlocksBeforeLiquidationUpdateFilter(MinimumBlocksBeforeLiquidationUpdateFilter),
        NetworkFeeUpdateFilter(NetworkFeeUpdateFilter),
        NetworkFeesWithdrawalFilter(NetworkFeesWithdrawalFilter),
        OperatorFeeDeclarationFilter(OperatorFeeDeclarationFilter),
        OperatorFeeExecutionFilter(OperatorFeeExecutionFilter),
        OperatorFeeIncreaseLimitUpdateFilter(OperatorFeeIncreaseLimitUpdateFilter),
        OperatorMaxFeeIncreaseUpdateFilter(OperatorMaxFeeIncreaseUpdateFilter),
        OperatorRegistrationFilter(OperatorRegistrationFilter),
        OperatorRemovalFilter(OperatorRemovalFilter),
        OperatorScoreUpdateFilter(OperatorScoreUpdateFilter),
        RegisteredOperatorsPerAccountLimitUpdateFilter(
            RegisteredOperatorsPerAccountLimitUpdateFilter,
        ),
        ValidatorRegistrationFilter(ValidatorRegistrationFilter),
        ValidatorRemovalFilter(ValidatorRemovalFilter),
        ValidatorsPerOperatorLimitUpdateFilter(ValidatorsPerOperatorLimitUpdateFilter),
    }
    impl ethers::contract::EthLogDecode for ISSVNetworkEvents {
        fn decode_log(
            log: &ethers::core::abi::RawLog,
        ) -> ::std::result::Result<Self, ethers::core::abi::Error>
        where
            Self: Sized,
        {
            if let Ok(decoded) = AccountEnableFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::AccountEnableFilter(decoded));
            }
            if let Ok(decoded) = AccountLiquidationFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::AccountLiquidationFilter(decoded));
            }
            if let Ok(decoded) = DeclareOperatorFeePeriodUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::DeclareOperatorFeePeriodUpdateFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = DeclaredOperatorFeeCancelationFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::DeclaredOperatorFeeCancelationFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = ExecuteOperatorFeePeriodUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::ExecuteOperatorFeePeriodUpdateFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = FundsDepositFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::FundsDepositFilter(decoded));
            }
            if let Ok(decoded) = FundsWithdrawalFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::FundsWithdrawalFilter(decoded));
            }
            if let Ok(decoded) = LiquidationThresholdPeriodUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::LiquidationThresholdPeriodUpdateFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = MinimumBlocksBeforeLiquidationUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::MinimumBlocksBeforeLiquidationUpdateFilter(decoded));
            }
            if let Ok(decoded) = NetworkFeeUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::NetworkFeeUpdateFilter(decoded));
            }
            if let Ok(decoded) = NetworkFeesWithdrawalFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::NetworkFeesWithdrawalFilter(decoded));
            }
            if let Ok(decoded) = OperatorFeeDeclarationFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::OperatorFeeDeclarationFilter(decoded));
            }
            if let Ok(decoded) = OperatorFeeExecutionFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::OperatorFeeExecutionFilter(decoded));
            }
            if let Ok(decoded) = OperatorFeeIncreaseLimitUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::OperatorFeeIncreaseLimitUpdateFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = OperatorMaxFeeIncreaseUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::OperatorMaxFeeIncreaseUpdateFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = OperatorRegistrationFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::OperatorRegistrationFilter(decoded));
            }
            if let Ok(decoded) = OperatorRemovalFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::OperatorRemovalFilter(decoded));
            }
            if let Ok(decoded) = OperatorScoreUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::OperatorScoreUpdateFilter(decoded));
            }
            if let Ok(decoded) = RegisteredOperatorsPerAccountLimitUpdateFilter::decode_log(log) {
                return Ok(
                    ISSVNetworkEvents::RegisteredOperatorsPerAccountLimitUpdateFilter(decoded),
                );
            }
            if let Ok(decoded) = ValidatorRegistrationFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::ValidatorRegistrationFilter(decoded));
            }
            if let Ok(decoded) = ValidatorRemovalFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::ValidatorRemovalFilter(decoded));
            }
            if let Ok(decoded) = ValidatorsPerOperatorLimitUpdateFilter::decode_log(log) {
                return Ok(ISSVNetworkEvents::ValidatorsPerOperatorLimitUpdateFilter(
                    decoded,
                ));
            }
            Err(ethers::core::abi::Error::InvalidData)
        }
    }
    impl ::std::fmt::Display for ISSVNetworkEvents {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                ISSVNetworkEvents::AccountEnableFilter(element) => element.fmt(f),
                ISSVNetworkEvents::AccountLiquidationFilter(element) => element.fmt(f),
                ISSVNetworkEvents::DeclareOperatorFeePeriodUpdateFilter(element) => element.fmt(f),
                ISSVNetworkEvents::DeclaredOperatorFeeCancelationFilter(element) => element.fmt(f),
                ISSVNetworkEvents::ExecuteOperatorFeePeriodUpdateFilter(element) => element.fmt(f),
                ISSVNetworkEvents::FundsDepositFilter(element) => element.fmt(f),
                ISSVNetworkEvents::FundsWithdrawalFilter(element) => element.fmt(f),
                ISSVNetworkEvents::LiquidationThresholdPeriodUpdateFilter(element) => {
                    element.fmt(f)
                }
                ISSVNetworkEvents::MinimumBlocksBeforeLiquidationUpdateFilter(element) => {
                    element.fmt(f)
                }
                ISSVNetworkEvents::NetworkFeeUpdateFilter(element) => element.fmt(f),
                ISSVNetworkEvents::NetworkFeesWithdrawalFilter(element) => element.fmt(f),
                ISSVNetworkEvents::OperatorFeeDeclarationFilter(element) => element.fmt(f),
                ISSVNetworkEvents::OperatorFeeExecutionFilter(element) => element.fmt(f),
                ISSVNetworkEvents::OperatorFeeIncreaseLimitUpdateFilter(element) => element.fmt(f),
                ISSVNetworkEvents::OperatorMaxFeeIncreaseUpdateFilter(element) => element.fmt(f),
                ISSVNetworkEvents::OperatorRegistrationFilter(element) => element.fmt(f),
                ISSVNetworkEvents::OperatorRemovalFilter(element) => element.fmt(f),
                ISSVNetworkEvents::OperatorScoreUpdateFilter(element) => element.fmt(f),
                ISSVNetworkEvents::RegisteredOperatorsPerAccountLimitUpdateFilter(element) => {
                    element.fmt(f)
                }
                ISSVNetworkEvents::ValidatorRegistrationFilter(element) => element.fmt(f),
                ISSVNetworkEvents::ValidatorRemovalFilter(element) => element.fmt(f),
                ISSVNetworkEvents::ValidatorsPerOperatorLimitUpdateFilter(element) => {
                    element.fmt(f)
                }
            }
        }
    }
    #[doc = "Container type for all input parameters for the `addressNetworkFee` function with signature `addressNetworkFee(address)` and selector `0x56d9a2cc`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "addressNetworkFee", abi = "addressNetworkFee(address)")]
    pub struct AddressNetworkFeeCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `cancelDeclaredOperatorFee` function with signature `cancelDeclaredOperatorFee(uint32)` and selector `0x154996bb`"]
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
        name = "cancelDeclaredOperatorFee",
        abi = "cancelDeclaredOperatorFee(uint32)"
    )]
    pub struct CancelDeclaredOperatorFeeCall {
        pub operator_id: u32,
    }
    #[doc = "Container type for all input parameters for the `declareOperatorFee` function with signature `declareOperatorFee(uint32,uint256)` and selector `0x70f97314`"]
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
        name = "declareOperatorFee",
        abi = "declareOperatorFee(uint32,uint256)"
    )]
    pub struct DeclareOperatorFeeCall {
        pub operator_id: u32,
        pub operator_fee: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `deposit` function with signature `deposit(address,uint256)` and selector `0x47e7ef24`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "deposit", abi = "deposit(address,uint256)")]
    pub struct DepositCall {
        pub owner_address: ethers::core::types::Address,
        pub token_amount: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `executeOperatorFee` function with signature `executeOperatorFee(uint32)` and selector `0x400aa7ce`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "executeOperatorFee", abi = "executeOperatorFee(uint32)")]
    pub struct ExecuteOperatorFeeCall {
        pub operator_id: u32,
    }
    #[doc = "Container type for all input parameters for the `getAddressBalance` function with signature `getAddressBalance(address)` and selector `0x35046722`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getAddressBalance", abi = "getAddressBalance(address)")]
    pub struct GetAddressBalanceCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `getAddressBurnRate` function with signature `getAddressBurnRate(address)` and selector `0x2563c64e`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getAddressBurnRate", abi = "getAddressBurnRate(address)")]
    pub struct GetAddressBurnRateCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `getDeclaredOperatorFeePeriod` function with signature `getDeclaredOperatorFeePeriod()` and selector `0x1be2bd74`"]
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
        name = "getDeclaredOperatorFeePeriod",
        abi = "getDeclaredOperatorFeePeriod()"
    )]
    pub struct GetDeclaredOperatorFeePeriodCall;
    #[doc = "Container type for all input parameters for the `getExecuteOperatorFeePeriod` function with signature `getExecuteOperatorFeePeriod()` and selector `0xdd83fcb6`"]
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
        name = "getExecuteOperatorFeePeriod",
        abi = "getExecuteOperatorFeePeriod()"
    )]
    pub struct GetExecuteOperatorFeePeriodCall;
    #[doc = "Container type for all input parameters for the `getLiquidationThresholdPeriod` function with signature `getLiquidationThresholdPeriod()` and selector `0x9040f7c3`"]
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
        name = "getLiquidationThresholdPeriod",
        abi = "getLiquidationThresholdPeriod()"
    )]
    pub struct GetLiquidationThresholdPeriodCall;
    #[doc = "Container type for all input parameters for the `getNetworkEarnings` function with signature `getNetworkEarnings()` and selector `0x777915cb`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getNetworkEarnings", abi = "getNetworkEarnings()")]
    pub struct GetNetworkEarningsCall;
    #[doc = "Container type for all input parameters for the `getNetworkFee` function with signature `getNetworkFee()` and selector `0xfc043830`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getNetworkFee", abi = "getNetworkFee()")]
    pub struct GetNetworkFeeCall;
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
    #[doc = "Container type for all input parameters for the `getOperatorDeclaredFee` function with signature `getOperatorDeclaredFee(uint32)` and selector `0x85747566`"]
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
        name = "getOperatorDeclaredFee",
        abi = "getOperatorDeclaredFee(uint32)"
    )]
    pub struct GetOperatorDeclaredFeeCall {
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
    #[doc = "Container type for all input parameters for the `getOperatorFeeIncreaseLimit` function with signature `getOperatorFeeIncreaseLimit()` and selector `0x68465f7d`"]
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
        name = "getOperatorFeeIncreaseLimit",
        abi = "getOperatorFeeIncreaseLimit()"
    )]
    pub struct GetOperatorFeeIncreaseLimitCall;
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
    #[doc = "Container type for all input parameters for the `getValidatorsByOwnerAddress` function with signature `getValidatorsByOwnerAddress(address)` and selector `0x57c7ce22`"]
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
        name = "getValidatorsByOwnerAddress",
        abi = "getValidatorsByOwnerAddress(address)"
    )]
    pub struct GetValidatorsByOwnerAddressCall {
        pub owner_address: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `initialize` function with signature `initialize(address,address,uint64,uint64,uint64,uint64)` and selector `0x36881f18`"]
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
        name = "initialize",
        abi = "initialize(address,address,uint64,uint64,uint64,uint64)"
    )]
    pub struct InitializeCall {
        pub registry_address: ethers::core::types::Address,
        pub token: ethers::core::types::Address,
        pub minimum_blocks_before_liquidation: u64,
        pub operator_max_fee_increase: u64,
        pub declare_operator_fee_period: u64,
        pub execute_operator_fee_period: u64,
    }
    #[doc = "Container type for all input parameters for the `isLiquidatable` function with signature `isLiquidatable(address)` and selector `0x042e02cf`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "isLiquidatable", abi = "isLiquidatable(address)")]
    pub struct IsLiquidatableCall {
        pub owner_address: ethers::core::types::Address,
    }
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
    #[doc = "Container type for all input parameters for the `liquidate` function with signature `liquidate(address[])` and selector `0xa985994b`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "liquidate", abi = "liquidate(address[])")]
    pub struct LiquidateCall {
        pub owner_addresses: ::std::vec::Vec<ethers::core::types::Address>,
    }
    #[doc = "Container type for all input parameters for the `reactivateAccount` function with signature `reactivateAccount(uint256)` and selector `0x2afe872f`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "reactivateAccount", abi = "reactivateAccount(uint256)")]
    pub struct ReactivateAccountCall {
        pub amount: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `registerOperator` function with signature `registerOperator(string,bytes,uint256)` and selector `0xb083ab35`"]
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
        abi = "registerOperator(string,bytes,uint256)"
    )]
    pub struct RegisterOperatorCall {
        pub name: String,
        pub public_key: ethers::core::types::Bytes,
        pub fee: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `registerValidator` function with signature `registerValidator(bytes,uint32[],bytes[],bytes[],uint256)` and selector `0xe40cb19d`"]
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
        abi = "registerValidator(bytes,uint32[],bytes[],bytes[],uint256)"
    )]
    pub struct RegisterValidatorCall {
        pub public_key: ethers::core::types::Bytes,
        pub operator_ids: ::std::vec::Vec<u32>,
        pub shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub amount: ethers::core::types::U256,
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
    #[doc = "Container type for all input parameters for the `updateDeclareOperatorFeePeriod` function with signature `updateDeclareOperatorFeePeriod(uint64)` and selector `0x79e3e4e4`"]
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
        name = "updateDeclareOperatorFeePeriod",
        abi = "updateDeclareOperatorFeePeriod(uint64)"
    )]
    pub struct UpdateDeclareOperatorFeePeriodCall {
        pub new_declare_operator_fee_period: u64,
    }
    #[doc = "Container type for all input parameters for the `updateExecuteOperatorFeePeriod` function with signature `updateExecuteOperatorFeePeriod(uint64)` and selector `0xeb608022`"]
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
        name = "updateExecuteOperatorFeePeriod",
        abi = "updateExecuteOperatorFeePeriod(uint64)"
    )]
    pub struct UpdateExecuteOperatorFeePeriodCall {
        pub new_execute_operator_fee_period: u64,
    }
    #[doc = "Container type for all input parameters for the `updateLiquidationThresholdPeriod` function with signature `updateLiquidationThresholdPeriod(uint64)` and selector `0x6512447d`"]
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
        name = "updateLiquidationThresholdPeriod",
        abi = "updateLiquidationThresholdPeriod(uint64)"
    )]
    pub struct UpdateLiquidationThresholdPeriodCall {
        pub blocks: u64,
    }
    #[doc = "Container type for all input parameters for the `updateNetworkFee` function with signature `updateNetworkFee(uint256)` and selector `0x1f1f9fd5`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "updateNetworkFee", abi = "updateNetworkFee(uint256)")]
    pub struct UpdateNetworkFeeCall {
        pub fee: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `updateOperatorFeeIncreaseLimit` function with signature `updateOperatorFeeIncreaseLimit(uint64)` and selector `0x3631983f`"]
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
        name = "updateOperatorFeeIncreaseLimit",
        abi = "updateOperatorFeeIncreaseLimit(uint64)"
    )]
    pub struct UpdateOperatorFeeIncreaseLimitCall {
        pub new_operator_max_fee_increase: u64,
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
    #[doc = "Container type for all input parameters for the `updateValidator` function with signature `updateValidator(bytes,uint32[],bytes[],bytes[],uint256)` and selector `0x21f7957b`"]
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
        name = "updateValidator",
        abi = "updateValidator(bytes,uint32[],bytes[],bytes[],uint256)"
    )]
    pub struct UpdateValidatorCall {
        pub public_key: ethers::core::types::Bytes,
        pub operator_ids: ::std::vec::Vec<u32>,
        pub shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub amount: ethers::core::types::U256,
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
    #[doc = "Container type for all input parameters for the `withdraw` function with signature `withdraw(uint256)` and selector `0x2e1a7d4d`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "withdraw", abi = "withdraw(uint256)")]
    pub struct WithdrawCall {
        pub token_amount: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `withdrawAll` function with signature `withdrawAll()` and selector `0x853828b6`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "withdrawAll", abi = "withdrawAll()")]
    pub struct WithdrawAllCall;
    #[doc = "Container type for all input parameters for the `withdrawNetworkEarnings` function with signature `withdrawNetworkEarnings(uint256)` and selector `0xd2231741`"]
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
        name = "withdrawNetworkEarnings",
        abi = "withdrawNetworkEarnings(uint256)"
    )]
    pub struct WithdrawNetworkEarningsCall {
        pub amount: ethers::core::types::U256,
    }
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum ISSVNetworkCalls {
        AddressNetworkFee(AddressNetworkFeeCall),
        CancelDeclaredOperatorFee(CancelDeclaredOperatorFeeCall),
        DeclareOperatorFee(DeclareOperatorFeeCall),
        Deposit(DepositCall),
        ExecuteOperatorFee(ExecuteOperatorFeeCall),
        GetAddressBalance(GetAddressBalanceCall),
        GetAddressBurnRate(GetAddressBurnRateCall),
        GetDeclaredOperatorFeePeriod(GetDeclaredOperatorFeePeriodCall),
        GetExecuteOperatorFeePeriod(GetExecuteOperatorFeePeriodCall),
        GetLiquidationThresholdPeriod(GetLiquidationThresholdPeriodCall),
        GetNetworkEarnings(GetNetworkEarningsCall),
        GetNetworkFee(GetNetworkFeeCall),
        GetOperatorById(GetOperatorByIdCall),
        GetOperatorDeclaredFee(GetOperatorDeclaredFeeCall),
        GetOperatorFee(GetOperatorFeeCall),
        GetOperatorFeeIncreaseLimit(GetOperatorFeeIncreaseLimitCall),
        GetOperatorsByValidator(GetOperatorsByValidatorCall),
        GetValidatorsByOwnerAddress(GetValidatorsByOwnerAddressCall),
        Initialize(InitializeCall),
        IsLiquidatable(IsLiquidatableCall),
        IsLiquidated(IsLiquidatedCall),
        Liquidate(LiquidateCall),
        ReactivateAccount(ReactivateAccountCall),
        RegisterOperator(RegisterOperatorCall),
        RegisterValidator(RegisterValidatorCall),
        RemoveOperator(RemoveOperatorCall),
        RemoveValidator(RemoveValidatorCall),
        UpdateDeclareOperatorFeePeriod(UpdateDeclareOperatorFeePeriodCall),
        UpdateExecuteOperatorFeePeriod(UpdateExecuteOperatorFeePeriodCall),
        UpdateLiquidationThresholdPeriod(UpdateLiquidationThresholdPeriodCall),
        UpdateNetworkFee(UpdateNetworkFeeCall),
        UpdateOperatorFeeIncreaseLimit(UpdateOperatorFeeIncreaseLimitCall),
        UpdateOperatorScore(UpdateOperatorScoreCall),
        UpdateValidator(UpdateValidatorCall),
        ValidatorsPerOperatorCount(ValidatorsPerOperatorCountCall),
        Withdraw(WithdrawCall),
        WithdrawAll(WithdrawAllCall),
        WithdrawNetworkEarnings(WithdrawNetworkEarningsCall),
    }
    impl ethers::core::abi::AbiDecode for ISSVNetworkCalls {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::std::result::Result<Self, ethers::core::abi::AbiError> {
            if let Ok(decoded) =
                <AddressNetworkFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::AddressNetworkFee(decoded));
            }
            if let Ok(decoded) =
                <CancelDeclaredOperatorFeeCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::CancelDeclaredOperatorFee(decoded));
            }
            if let Ok(decoded) =
                <DeclareOperatorFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::DeclareOperatorFee(decoded));
            }
            if let Ok(decoded) =
                <DepositCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::Deposit(decoded));
            }
            if let Ok(decoded) =
                <ExecuteOperatorFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::ExecuteOperatorFee(decoded));
            }
            if let Ok(decoded) =
                <GetAddressBalanceCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetAddressBalance(decoded));
            }
            if let Ok(decoded) =
                <GetAddressBurnRateCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetAddressBurnRate(decoded));
            }
            if let Ok(decoded) =
                <GetDeclaredOperatorFeePeriodCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::GetDeclaredOperatorFeePeriod(decoded));
            }
            if let Ok(decoded) =
                <GetExecuteOperatorFeePeriodCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::GetExecuteOperatorFeePeriod(decoded));
            }
            if let Ok(decoded) =
                <GetLiquidationThresholdPeriodCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::GetLiquidationThresholdPeriod(decoded));
            }
            if let Ok(decoded) =
                <GetNetworkEarningsCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetNetworkEarnings(decoded));
            }
            if let Ok(decoded) =
                <GetNetworkFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetNetworkFee(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorByIdCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetOperatorById(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorDeclaredFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetOperatorDeclaredFee(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetOperatorFee(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorFeeIncreaseLimitCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::GetOperatorFeeIncreaseLimit(decoded));
            }
            if let Ok(decoded) =
                <GetOperatorsByValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::GetOperatorsByValidator(decoded));
            }
            if let Ok(decoded) =
                <GetValidatorsByOwnerAddressCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::GetValidatorsByOwnerAddress(decoded));
            }
            if let Ok(decoded) =
                <InitializeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::Initialize(decoded));
            }
            if let Ok(decoded) =
                <IsLiquidatableCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::IsLiquidatable(decoded));
            }
            if let Ok(decoded) =
                <IsLiquidatedCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::IsLiquidated(decoded));
            }
            if let Ok(decoded) =
                <LiquidateCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::Liquidate(decoded));
            }
            if let Ok(decoded) =
                <ReactivateAccountCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::ReactivateAccount(decoded));
            }
            if let Ok(decoded) =
                <RegisterOperatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::RegisterOperator(decoded));
            }
            if let Ok(decoded) =
                <RegisterValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::RegisterValidator(decoded));
            }
            if let Ok(decoded) =
                <RemoveOperatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::RemoveOperator(decoded));
            }
            if let Ok(decoded) =
                <RemoveValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::RemoveValidator(decoded));
            }
            if let Ok(decoded) =
                <UpdateDeclareOperatorFeePeriodCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::UpdateDeclareOperatorFeePeriod(decoded));
            }
            if let Ok(decoded) =
                <UpdateExecuteOperatorFeePeriodCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::UpdateExecuteOperatorFeePeriod(decoded));
            }
            if let Ok(decoded) =
                <UpdateLiquidationThresholdPeriodCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::UpdateLiquidationThresholdPeriod(decoded));
            }
            if let Ok(decoded) =
                <UpdateNetworkFeeCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::UpdateNetworkFee(decoded));
            }
            if let Ok(decoded) =
                <UpdateOperatorFeeIncreaseLimitCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::UpdateOperatorFeeIncreaseLimit(decoded));
            }
            if let Ok(decoded) =
                <UpdateOperatorScoreCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::UpdateOperatorScore(decoded));
            }
            if let Ok(decoded) =
                <UpdateValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::UpdateValidator(decoded));
            }
            if let Ok(decoded) =
                <ValidatorsPerOperatorCountCall as ethers::core::abi::AbiDecode>::decode(
                    data.as_ref(),
                )
            {
                return Ok(ISSVNetworkCalls::ValidatorsPerOperatorCount(decoded));
            }
            if let Ok(decoded) =
                <WithdrawCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::Withdraw(decoded));
            }
            if let Ok(decoded) =
                <WithdrawAllCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::WithdrawAll(decoded));
            }
            if let Ok(decoded) =
                <WithdrawNetworkEarningsCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(ISSVNetworkCalls::WithdrawNetworkEarnings(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ethers::core::abi::AbiEncode for ISSVNetworkCalls {
        fn encode(self) -> Vec<u8> {
            match self {
                ISSVNetworkCalls::AddressNetworkFee(element) => element.encode(),
                ISSVNetworkCalls::CancelDeclaredOperatorFee(element) => element.encode(),
                ISSVNetworkCalls::DeclareOperatorFee(element) => element.encode(),
                ISSVNetworkCalls::Deposit(element) => element.encode(),
                ISSVNetworkCalls::ExecuteOperatorFee(element) => element.encode(),
                ISSVNetworkCalls::GetAddressBalance(element) => element.encode(),
                ISSVNetworkCalls::GetAddressBurnRate(element) => element.encode(),
                ISSVNetworkCalls::GetDeclaredOperatorFeePeriod(element) => element.encode(),
                ISSVNetworkCalls::GetExecuteOperatorFeePeriod(element) => element.encode(),
                ISSVNetworkCalls::GetLiquidationThresholdPeriod(element) => element.encode(),
                ISSVNetworkCalls::GetNetworkEarnings(element) => element.encode(),
                ISSVNetworkCalls::GetNetworkFee(element) => element.encode(),
                ISSVNetworkCalls::GetOperatorById(element) => element.encode(),
                ISSVNetworkCalls::GetOperatorDeclaredFee(element) => element.encode(),
                ISSVNetworkCalls::GetOperatorFee(element) => element.encode(),
                ISSVNetworkCalls::GetOperatorFeeIncreaseLimit(element) => element.encode(),
                ISSVNetworkCalls::GetOperatorsByValidator(element) => element.encode(),
                ISSVNetworkCalls::GetValidatorsByOwnerAddress(element) => element.encode(),
                ISSVNetworkCalls::Initialize(element) => element.encode(),
                ISSVNetworkCalls::IsLiquidatable(element) => element.encode(),
                ISSVNetworkCalls::IsLiquidated(element) => element.encode(),
                ISSVNetworkCalls::Liquidate(element) => element.encode(),
                ISSVNetworkCalls::ReactivateAccount(element) => element.encode(),
                ISSVNetworkCalls::RegisterOperator(element) => element.encode(),
                ISSVNetworkCalls::RegisterValidator(element) => element.encode(),
                ISSVNetworkCalls::RemoveOperator(element) => element.encode(),
                ISSVNetworkCalls::RemoveValidator(element) => element.encode(),
                ISSVNetworkCalls::UpdateDeclareOperatorFeePeriod(element) => element.encode(),
                ISSVNetworkCalls::UpdateExecuteOperatorFeePeriod(element) => element.encode(),
                ISSVNetworkCalls::UpdateLiquidationThresholdPeriod(element) => element.encode(),
                ISSVNetworkCalls::UpdateNetworkFee(element) => element.encode(),
                ISSVNetworkCalls::UpdateOperatorFeeIncreaseLimit(element) => element.encode(),
                ISSVNetworkCalls::UpdateOperatorScore(element) => element.encode(),
                ISSVNetworkCalls::UpdateValidator(element) => element.encode(),
                ISSVNetworkCalls::ValidatorsPerOperatorCount(element) => element.encode(),
                ISSVNetworkCalls::Withdraw(element) => element.encode(),
                ISSVNetworkCalls::WithdrawAll(element) => element.encode(),
                ISSVNetworkCalls::WithdrawNetworkEarnings(element) => element.encode(),
            }
        }
    }
    impl ::std::fmt::Display for ISSVNetworkCalls {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                ISSVNetworkCalls::AddressNetworkFee(element) => element.fmt(f),
                ISSVNetworkCalls::CancelDeclaredOperatorFee(element) => element.fmt(f),
                ISSVNetworkCalls::DeclareOperatorFee(element) => element.fmt(f),
                ISSVNetworkCalls::Deposit(element) => element.fmt(f),
                ISSVNetworkCalls::ExecuteOperatorFee(element) => element.fmt(f),
                ISSVNetworkCalls::GetAddressBalance(element) => element.fmt(f),
                ISSVNetworkCalls::GetAddressBurnRate(element) => element.fmt(f),
                ISSVNetworkCalls::GetDeclaredOperatorFeePeriod(element) => element.fmt(f),
                ISSVNetworkCalls::GetExecuteOperatorFeePeriod(element) => element.fmt(f),
                ISSVNetworkCalls::GetLiquidationThresholdPeriod(element) => element.fmt(f),
                ISSVNetworkCalls::GetNetworkEarnings(element) => element.fmt(f),
                ISSVNetworkCalls::GetNetworkFee(element) => element.fmt(f),
                ISSVNetworkCalls::GetOperatorById(element) => element.fmt(f),
                ISSVNetworkCalls::GetOperatorDeclaredFee(element) => element.fmt(f),
                ISSVNetworkCalls::GetOperatorFee(element) => element.fmt(f),
                ISSVNetworkCalls::GetOperatorFeeIncreaseLimit(element) => element.fmt(f),
                ISSVNetworkCalls::GetOperatorsByValidator(element) => element.fmt(f),
                ISSVNetworkCalls::GetValidatorsByOwnerAddress(element) => element.fmt(f),
                ISSVNetworkCalls::Initialize(element) => element.fmt(f),
                ISSVNetworkCalls::IsLiquidatable(element) => element.fmt(f),
                ISSVNetworkCalls::IsLiquidated(element) => element.fmt(f),
                ISSVNetworkCalls::Liquidate(element) => element.fmt(f),
                ISSVNetworkCalls::ReactivateAccount(element) => element.fmt(f),
                ISSVNetworkCalls::RegisterOperator(element) => element.fmt(f),
                ISSVNetworkCalls::RegisterValidator(element) => element.fmt(f),
                ISSVNetworkCalls::RemoveOperator(element) => element.fmt(f),
                ISSVNetworkCalls::RemoveValidator(element) => element.fmt(f),
                ISSVNetworkCalls::UpdateDeclareOperatorFeePeriod(element) => element.fmt(f),
                ISSVNetworkCalls::UpdateExecuteOperatorFeePeriod(element) => element.fmt(f),
                ISSVNetworkCalls::UpdateLiquidationThresholdPeriod(element) => element.fmt(f),
                ISSVNetworkCalls::UpdateNetworkFee(element) => element.fmt(f),
                ISSVNetworkCalls::UpdateOperatorFeeIncreaseLimit(element) => element.fmt(f),
                ISSVNetworkCalls::UpdateOperatorScore(element) => element.fmt(f),
                ISSVNetworkCalls::UpdateValidator(element) => element.fmt(f),
                ISSVNetworkCalls::ValidatorsPerOperatorCount(element) => element.fmt(f),
                ISSVNetworkCalls::Withdraw(element) => element.fmt(f),
                ISSVNetworkCalls::WithdrawAll(element) => element.fmt(f),
                ISSVNetworkCalls::WithdrawNetworkEarnings(element) => element.fmt(f),
            }
        }
    }
    impl ::std::convert::From<AddressNetworkFeeCall> for ISSVNetworkCalls {
        fn from(var: AddressNetworkFeeCall) -> Self {
            ISSVNetworkCalls::AddressNetworkFee(var)
        }
    }
    impl ::std::convert::From<CancelDeclaredOperatorFeeCall> for ISSVNetworkCalls {
        fn from(var: CancelDeclaredOperatorFeeCall) -> Self {
            ISSVNetworkCalls::CancelDeclaredOperatorFee(var)
        }
    }
    impl ::std::convert::From<DeclareOperatorFeeCall> for ISSVNetworkCalls {
        fn from(var: DeclareOperatorFeeCall) -> Self {
            ISSVNetworkCalls::DeclareOperatorFee(var)
        }
    }
    impl ::std::convert::From<DepositCall> for ISSVNetworkCalls {
        fn from(var: DepositCall) -> Self {
            ISSVNetworkCalls::Deposit(var)
        }
    }
    impl ::std::convert::From<ExecuteOperatorFeeCall> for ISSVNetworkCalls {
        fn from(var: ExecuteOperatorFeeCall) -> Self {
            ISSVNetworkCalls::ExecuteOperatorFee(var)
        }
    }
    impl ::std::convert::From<GetAddressBalanceCall> for ISSVNetworkCalls {
        fn from(var: GetAddressBalanceCall) -> Self {
            ISSVNetworkCalls::GetAddressBalance(var)
        }
    }
    impl ::std::convert::From<GetAddressBurnRateCall> for ISSVNetworkCalls {
        fn from(var: GetAddressBurnRateCall) -> Self {
            ISSVNetworkCalls::GetAddressBurnRate(var)
        }
    }
    impl ::std::convert::From<GetDeclaredOperatorFeePeriodCall> for ISSVNetworkCalls {
        fn from(var: GetDeclaredOperatorFeePeriodCall) -> Self {
            ISSVNetworkCalls::GetDeclaredOperatorFeePeriod(var)
        }
    }
    impl ::std::convert::From<GetExecuteOperatorFeePeriodCall> for ISSVNetworkCalls {
        fn from(var: GetExecuteOperatorFeePeriodCall) -> Self {
            ISSVNetworkCalls::GetExecuteOperatorFeePeriod(var)
        }
    }
    impl ::std::convert::From<GetLiquidationThresholdPeriodCall> for ISSVNetworkCalls {
        fn from(var: GetLiquidationThresholdPeriodCall) -> Self {
            ISSVNetworkCalls::GetLiquidationThresholdPeriod(var)
        }
    }
    impl ::std::convert::From<GetNetworkEarningsCall> for ISSVNetworkCalls {
        fn from(var: GetNetworkEarningsCall) -> Self {
            ISSVNetworkCalls::GetNetworkEarnings(var)
        }
    }
    impl ::std::convert::From<GetNetworkFeeCall> for ISSVNetworkCalls {
        fn from(var: GetNetworkFeeCall) -> Self {
            ISSVNetworkCalls::GetNetworkFee(var)
        }
    }
    impl ::std::convert::From<GetOperatorByIdCall> for ISSVNetworkCalls {
        fn from(var: GetOperatorByIdCall) -> Self {
            ISSVNetworkCalls::GetOperatorById(var)
        }
    }
    impl ::std::convert::From<GetOperatorDeclaredFeeCall> for ISSVNetworkCalls {
        fn from(var: GetOperatorDeclaredFeeCall) -> Self {
            ISSVNetworkCalls::GetOperatorDeclaredFee(var)
        }
    }
    impl ::std::convert::From<GetOperatorFeeCall> for ISSVNetworkCalls {
        fn from(var: GetOperatorFeeCall) -> Self {
            ISSVNetworkCalls::GetOperatorFee(var)
        }
    }
    impl ::std::convert::From<GetOperatorFeeIncreaseLimitCall> for ISSVNetworkCalls {
        fn from(var: GetOperatorFeeIncreaseLimitCall) -> Self {
            ISSVNetworkCalls::GetOperatorFeeIncreaseLimit(var)
        }
    }
    impl ::std::convert::From<GetOperatorsByValidatorCall> for ISSVNetworkCalls {
        fn from(var: GetOperatorsByValidatorCall) -> Self {
            ISSVNetworkCalls::GetOperatorsByValidator(var)
        }
    }
    impl ::std::convert::From<GetValidatorsByOwnerAddressCall> for ISSVNetworkCalls {
        fn from(var: GetValidatorsByOwnerAddressCall) -> Self {
            ISSVNetworkCalls::GetValidatorsByOwnerAddress(var)
        }
    }
    impl ::std::convert::From<InitializeCall> for ISSVNetworkCalls {
        fn from(var: InitializeCall) -> Self {
            ISSVNetworkCalls::Initialize(var)
        }
    }
    impl ::std::convert::From<IsLiquidatableCall> for ISSVNetworkCalls {
        fn from(var: IsLiquidatableCall) -> Self {
            ISSVNetworkCalls::IsLiquidatable(var)
        }
    }
    impl ::std::convert::From<IsLiquidatedCall> for ISSVNetworkCalls {
        fn from(var: IsLiquidatedCall) -> Self {
            ISSVNetworkCalls::IsLiquidated(var)
        }
    }
    impl ::std::convert::From<LiquidateCall> for ISSVNetworkCalls {
        fn from(var: LiquidateCall) -> Self {
            ISSVNetworkCalls::Liquidate(var)
        }
    }
    impl ::std::convert::From<ReactivateAccountCall> for ISSVNetworkCalls {
        fn from(var: ReactivateAccountCall) -> Self {
            ISSVNetworkCalls::ReactivateAccount(var)
        }
    }
    impl ::std::convert::From<RegisterOperatorCall> for ISSVNetworkCalls {
        fn from(var: RegisterOperatorCall) -> Self {
            ISSVNetworkCalls::RegisterOperator(var)
        }
    }
    impl ::std::convert::From<RegisterValidatorCall> for ISSVNetworkCalls {
        fn from(var: RegisterValidatorCall) -> Self {
            ISSVNetworkCalls::RegisterValidator(var)
        }
    }
    impl ::std::convert::From<RemoveOperatorCall> for ISSVNetworkCalls {
        fn from(var: RemoveOperatorCall) -> Self {
            ISSVNetworkCalls::RemoveOperator(var)
        }
    }
    impl ::std::convert::From<RemoveValidatorCall> for ISSVNetworkCalls {
        fn from(var: RemoveValidatorCall) -> Self {
            ISSVNetworkCalls::RemoveValidator(var)
        }
    }
    impl ::std::convert::From<UpdateDeclareOperatorFeePeriodCall> for ISSVNetworkCalls {
        fn from(var: UpdateDeclareOperatorFeePeriodCall) -> Self {
            ISSVNetworkCalls::UpdateDeclareOperatorFeePeriod(var)
        }
    }
    impl ::std::convert::From<UpdateExecuteOperatorFeePeriodCall> for ISSVNetworkCalls {
        fn from(var: UpdateExecuteOperatorFeePeriodCall) -> Self {
            ISSVNetworkCalls::UpdateExecuteOperatorFeePeriod(var)
        }
    }
    impl ::std::convert::From<UpdateLiquidationThresholdPeriodCall> for ISSVNetworkCalls {
        fn from(var: UpdateLiquidationThresholdPeriodCall) -> Self {
            ISSVNetworkCalls::UpdateLiquidationThresholdPeriod(var)
        }
    }
    impl ::std::convert::From<UpdateNetworkFeeCall> for ISSVNetworkCalls {
        fn from(var: UpdateNetworkFeeCall) -> Self {
            ISSVNetworkCalls::UpdateNetworkFee(var)
        }
    }
    impl ::std::convert::From<UpdateOperatorFeeIncreaseLimitCall> for ISSVNetworkCalls {
        fn from(var: UpdateOperatorFeeIncreaseLimitCall) -> Self {
            ISSVNetworkCalls::UpdateOperatorFeeIncreaseLimit(var)
        }
    }
    impl ::std::convert::From<UpdateOperatorScoreCall> for ISSVNetworkCalls {
        fn from(var: UpdateOperatorScoreCall) -> Self {
            ISSVNetworkCalls::UpdateOperatorScore(var)
        }
    }
    impl ::std::convert::From<UpdateValidatorCall> for ISSVNetworkCalls {
        fn from(var: UpdateValidatorCall) -> Self {
            ISSVNetworkCalls::UpdateValidator(var)
        }
    }
    impl ::std::convert::From<ValidatorsPerOperatorCountCall> for ISSVNetworkCalls {
        fn from(var: ValidatorsPerOperatorCountCall) -> Self {
            ISSVNetworkCalls::ValidatorsPerOperatorCount(var)
        }
    }
    impl ::std::convert::From<WithdrawCall> for ISSVNetworkCalls {
        fn from(var: WithdrawCall) -> Self {
            ISSVNetworkCalls::Withdraw(var)
        }
    }
    impl ::std::convert::From<WithdrawAllCall> for ISSVNetworkCalls {
        fn from(var: WithdrawAllCall) -> Self {
            ISSVNetworkCalls::WithdrawAll(var)
        }
    }
    impl ::std::convert::From<WithdrawNetworkEarningsCall> for ISSVNetworkCalls {
        fn from(var: WithdrawNetworkEarningsCall) -> Self {
            ISSVNetworkCalls::WithdrawNetworkEarnings(var)
        }
    }
    #[doc = "Container type for all return fields from the `addressNetworkFee` function with signature `addressNetworkFee(address)` and selector `0x56d9a2cc`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct AddressNetworkFeeReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getAddressBalance` function with signature `getAddressBalance(address)` and selector `0x35046722`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetAddressBalanceReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getAddressBurnRate` function with signature `getAddressBurnRate(address)` and selector `0x2563c64e`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetAddressBurnRateReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getDeclaredOperatorFeePeriod` function with signature `getDeclaredOperatorFeePeriod()` and selector `0x1be2bd74`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetDeclaredOperatorFeePeriodReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getExecuteOperatorFeePeriod` function with signature `getExecuteOperatorFeePeriod()` and selector `0xdd83fcb6`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetExecuteOperatorFeePeriodReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getLiquidationThresholdPeriod` function with signature `getLiquidationThresholdPeriod()` and selector `0x9040f7c3`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetLiquidationThresholdPeriodReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getNetworkEarnings` function with signature `getNetworkEarnings()` and selector `0x777915cb`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetNetworkEarningsReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getNetworkFee` function with signature `getNetworkFee()` and selector `0xfc043830`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetNetworkFeeReturn(pub ethers::core::types::U256);
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
    #[doc = "Container type for all return fields from the `getOperatorDeclaredFee` function with signature `getOperatorDeclaredFee(uint32)` and selector `0x85747566`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetOperatorDeclaredFeeReturn(
        pub ethers::core::types::U256,
        pub ethers::core::types::U256,
        pub ethers::core::types::U256,
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
    pub struct GetOperatorFeeReturn(pub ethers::core::types::U256);
    #[doc = "Container type for all return fields from the `getOperatorFeeIncreaseLimit` function with signature `getOperatorFeeIncreaseLimit()` and selector `0x68465f7d`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetOperatorFeeIncreaseLimitReturn(pub ethers::core::types::U256);
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
    #[doc = "Container type for all return fields from the `getValidatorsByOwnerAddress` function with signature `getValidatorsByOwnerAddress(address)` and selector `0x57c7ce22`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetValidatorsByOwnerAddressReturn(pub ::std::vec::Vec<ethers::core::types::Bytes>);
    #[doc = "Container type for all return fields from the `isLiquidatable` function with signature `isLiquidatable(address)` and selector `0x042e02cf`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct IsLiquidatableReturn(pub bool);
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
    #[doc = "Container type for all return fields from the `registerOperator` function with signature `registerOperator(string,bytes,uint256)` and selector `0xb083ab35`"]
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
