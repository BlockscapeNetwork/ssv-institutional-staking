pub use inst_sta::*;
#[allow(clippy::too_many_arguments, non_camel_case_types)]
pub mod inst_sta {
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
    #[doc = "InstSta was auto-generated with ethers-rs Abigen. More information at: https://github.com/gakonst/ethers-rs"]
    use std::sync::Arc;
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_quadrataContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvToken\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_depositAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"_pubkey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositReceivedStaked\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenID\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"_user\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_fee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_stakedETH\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"UserRequestedWithdrawal\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"DEPOSIT_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"QUADRATA\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_TOKEN\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"withdrawal_credentials\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"signature\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"deposit_data_root\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositSSV\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_addr\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidator\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidatorSelf\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"is_BUSINESS\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"renounceOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"transferOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"verified\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static INSTSTA_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    #[doc = r" Bytecode of the #name contract"]
    pub static INSTSTA_BYTECODE: ethers::contract::Lazy<ethers::core::types::Bytes> =
        ethers::contract::Lazy::new(|| {
            "0x6080346100f657601f6200146238819003918201601f19168301916001600160401b038311848410176100fb578084926080946040528339810103126100f65761004881610111565b61005460208301610111565b61006c606061006560408601610111565b9401610111565b600160005560015460018060a01b03199033828216176001556040519560018060a01b03948592833391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a38284600254169185600354169282876004541697600554169a161760025516176003551617600455161760055561133c9081620001268239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b03821682036100f65756fe608080604052600436101561001357600080fd5b600090813560e01c90816308d4fbd5146106fb575080630db065f4146106955780630df1ecfd1461064357806312065fe0146106095780631904bb2e146105335780634d5a1c1f146104da578063715018a61461043b57806380164859146103e95780638da5cb5b14610397578063946eadac14610292578063e99f0c9b14610240578063f2fde38b146101045763ff0d2c26146100b057600080fd5b3461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157602073ffffffffffffffffffffffffffffffffffffffff60055416604051908152f35b80fd5b50346101015760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101015760043573ffffffffffffffffffffffffffffffffffffffff80821680920361023c5761015e610ff8565b81156101b857600154827fffffffffffffffffffffffff0000000000000000000000000000000000000000821617600155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a380f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b8280fd5b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157602073ffffffffffffffffffffffffffffffffffffffff60025416604051908152f35b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157338152602060068152604082209060405191838154906102e0826111dc565b80865292600192808416908115610355575060011461031a575b6103168661030a818a03826110ba565b60405191829182610f92565b0390f35b9080949650528483205b82841061034257505050816103169361030a928201019338806102fa565b8054858501870152928501928101610324565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00168787015250505050151560051b820101915061030a8161031638806102fa565b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157602073ffffffffffffffffffffffffffffffffffffffff60015416604051908152f35b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157602073ffffffffffffffffffffffffffffffffffffffff60045416604051908152f35b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157610472610ff8565b600073ffffffffffffffffffffffffffffffffffffffff6001547fffffffffffffffffffffffff00000000000000000000000000000000000000008116600155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101015760206040517faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b8152f35b5034610101576020807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126106055760043573ffffffffffffffffffffffffffffffffffffffff811680910361023c57825260068152604082209060405191838154906105a1826111dc565b8086529260019280841690811561035557506001146105ca576103168661030a818a03826110ba565b9080949650528483205b8284106105f257505050816103169361030a928201019338806102fa565b80548585018701529285019281016105d4565b5080fd5b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157602047604051908152f35b503461010157807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010157602073ffffffffffffffffffffffffffffffffffffffff60035416604051908152f35b50346101015760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610101576004359073ffffffffffffffffffffffffffffffffffffffff821682036101015760206106f18361122f565b6040519015158152f35b826101007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101015760043567ffffffffffffffff811161060557610747903690600401610f2e565b9260243567ffffffffffffffff8111610f2a57610768903690600401610f61565b9160443567ffffffffffffffff8111610f2657610789903690600401610f61565b909260643567ffffffffffffffff8111610d45576107ab903690600401610f61565b92909360a43567ffffffffffffffff8111610f22576107ce903690600401610f2e565b9167ffffffffffffffff60c43511610f1e576107ef3660c435600401610f2e565b909160028d5414610ec2575060028c556108083361122f565b15610e3f576801bc16d674ec8000003403610d6f5773ffffffffffffffffffffffffffffffffffffffff6005541692833b15610d0d578d6108ed61088d948f96948f946108bd906040519a8b998a9889987f22895118000000000000000000000000000000000000000000000000000000008a52608060048b015260848a01916110fb565b917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8884030160248901526110fb565b917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8584030160448601526110fb565b60e4356064830152039134905af18015610d5157610d5c575b5087602073ffffffffffffffffffffffffffffffffffffffff60035416604473ffffffffffffffffffffffffffffffffffffffff6004541660405194859384927f095ea7b3000000000000000000000000000000000000000000000000000000008452600484015260843560248401525af18015610d5157610d15575b5073ffffffffffffffffffffffffffffffffffffffff6004541694853b15610d115791889593918a9593899860206109ee6040519b8c9a7fe40cb19d000000000000000000000000000000000000000000000000000000008c5260a060048d015260a48c01916110fb565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8a82030160248b015282815201939089905b808210610ccf57505050938793610a6884610a98948a987ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8a80990301604489015261113a565b917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc85840301606486015261113a565b608435608483015203925af18015610cc457908391610cb0575b50503382526006602052604082209267ffffffffffffffff8111610c8357610ada84546111dc565b601f8111610c3e575b508293601f8211600114610b80578184957f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c60369591610b75575b508260011b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8460031b1c19161790555b610b6b6040519283923384526040602085015260408401916110fb565b0390a16001815580f35b905083013586610b1c565b808452602084207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0831695855b878110610c265750837f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c6036969710610bee575b5050600182811b019055610b4e565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88560031b161c19908501351690558580610bdf565b90916020600181928589013581550193019101610bad565b84845260208420601f830160051c81019160208410610c79575b601f0160051c01905b818110610c6e5750610ae3565b848155600101610c61565b9091508190610c58565b6024837f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b610cb990611077565b610605578184610ab2565b6040513d85823e3d90fd5b9294919698509294969850853563ffffffff81168103610d0d57602060019263ffffffff82931681520196019201918b989694928a98969492610a21565b8c80fd5b8880fd5b6020813d602011610d49575b81610d2e602093836110ba565b81010312610d11575180151503610d455789610983565b8780fd5b3d9150610d21565b6040513d8b823e3d90fd5b610d6890989198611077565b9689610906565b60c46040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152606c60248201527f596f752061726520747279696e6720746f206465706f736974206d6f7265207460448201527f68616e207468652063757272656e7420706f6f6c2063616e20686f6c642e205060648201527f6c65617365207761697420666f7220746865206e657874206f6e65206f72206460848201527f65706f736974206c6573732e000000000000000000000000000000000000000060a4820152fd5b60846040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f596f7520617265206e6f74206120766572696669656420627573696e6573732060448201527f7965742e000000000000000000000000000000000000000000000000000000006064820152fd5b807f08c379a0000000000000000000000000000000000000000000000000000000006064925260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152fd5b8a80fd5b8980fd5b8580fd5b8380fd5b9181601f84011215610f5c5782359167ffffffffffffffff8311610f5c5760208381860195010111610f5c57565b600080fd5b9181601f84011215610f5c5782359167ffffffffffffffff8311610f5c576020808501948460051b010111610f5c57565b60208082528251818301819052939260005b858110610fe4575050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006040809697860101520116010190565b818101830151848201604001528201610fa4565b73ffffffffffffffffffffffffffffffffffffffff60015416330361101957565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b67ffffffffffffffff811161108b57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761108b57604052565b601f82602094937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0938186528686013760008582860101520116010190565b90808352602080930192838260051b850194846000925b858410611162575050505050505090565b90919293949596818103845287357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811215610f5c57830186810191903567ffffffffffffffff8111610f5c578036038313610f5c576111cb889283926001956110fb565b990194019401929594939190611151565b90600182811c92168015611225575b60208310146111f657565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f16916111eb565b602073ffffffffffffffffffffffffffffffffffffffff604481600254169360405194859384927f4d30b6be0000000000000000000000000000000000000000000000000000000084521660048301527faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b60248301525afa80156112fa576000906112c8575b60011190506112c357600190565b600090565b6020823d82116112f2575b816112e0602093836110ba565b810103126101015750600190516112b5565b3d91506112d3565b6040513d6000823e3d90fdfea26469706673582212204b82362962c3f771060e50c9bdb09854f5f0ef0ad5a570dda2709bee4dd07be464736f6c63430008110033" . parse () . expect ("invalid bytecode")
        });
    pub struct InstSta<M>(ethers::contract::Contract<M>);
    impl<M> Clone for InstSta<M> {
        fn clone(&self) -> Self {
            InstSta(self.0.clone())
        }
    }
    impl<M> std::ops::Deref for InstSta<M> {
        type Target = ethers::contract::Contract<M>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
    impl<M> std::fmt::Debug for InstSta<M> {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            f.debug_tuple(stringify!(InstSta))
                .field(&self.address())
                .finish()
        }
    }
    impl<M: ethers::providers::Middleware> InstSta<M> {
        #[doc = r" Creates a new contract instance with the specified `ethers`"]
        #[doc = r" client at the given `Address`. The contract derefs to a `ethers::Contract`"]
        #[doc = r" object"]
        pub fn new<T: Into<ethers::core::types::Address>>(
            address: T,
            client: ::std::sync::Arc<M>,
        ) -> Self {
            ethers::contract::Contract::new(address.into(), INSTSTA_ABI.clone(), client).into()
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
                INSTSTA_ABI.clone(),
                INSTSTA_BYTECODE.clone().into(),
                client,
            );
            let deployer = factory.deploy(constructor_args)?;
            let deployer = ethers::contract::ContractDeployer::new(deployer);
            Ok(deployer)
        }
        #[doc = "Calls the contract's `DEPOSIT_ADDRESS` (0xff0d2c26) function"]
        pub fn deposit_address(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([255, 13, 44, 38], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `QUADRATA` (0xe99f0c9b) function"]
        pub fn quadrata(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([233, 159, 12, 155], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `SSV_ADDRESS` (0x80164859) function"]
        pub fn ssv_address(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([128, 22, 72, 89], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `SSV_TOKEN` (0x0df1ecfd) function"]
        pub fn ssv_token(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Address> {
            self.0
                .method_hash([13, 241, 236, 253], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `depositSSV` (0x08d4fbd5) function"]
        pub fn deposit_ssv(
            &self,
            pubkey: ethers::core::types::Bytes,
            operator_ids: ::std::vec::Vec<u32>,
            shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
            shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
            ssv_amount: ethers::core::types::U256,
            withdrawal_credentials: ethers::core::types::Bytes,
            signature: ethers::core::types::Bytes,
            deposit_data_root: [u8; 32],
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [8, 212, 251, 213],
                    (
                        pubkey,
                        operator_ids,
                        shares_public_keys,
                        shares_encrypted,
                        ssv_amount,
                        withdrawal_credentials,
                        signature,
                        deposit_data_root,
                    ),
                )
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
        #[doc = "Calls the contract's `getValidator` (0x1904bb2e) function"]
        pub fn get_validator(
            &self,
            addr: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Bytes> {
            self.0
                .method_hash([25, 4, 187, 46], addr)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getValidatorSelf` (0x946eadac) function"]
        pub fn get_validator_self(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ethers::core::types::Bytes> {
            self.0
                .method_hash([148, 110, 173, 172], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `is_BUSINESS` (0x4d5a1c1f) function"]
        pub fn is_business(&self) -> ethers::contract::builders::ContractCall<M, [u8; 32]> {
            self.0
                .method_hash([77, 90, 28, 31], ())
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
        #[doc = "Calls the contract's `renounceOwnership` (0x715018a6) function"]
        pub fn renounce_ownership(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([113, 80, 24, 166], ())
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
        #[doc = "Calls the contract's `verified` (0x0db065f4) function"]
        pub fn verified(
            &self,
            sender: ethers::core::types::Address,
        ) -> ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([13, 176, 101, 244], sender)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Gets the contract's `DepositReceivedStaked` event"]
        pub fn deposit_received_staked_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DepositReceivedStakedFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OwnershipTransferred` event"]
        pub fn ownership_transferred_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OwnershipTransferredFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `UserRequestedWithdrawal` event"]
        pub fn user_requested_withdrawal_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, UserRequestedWithdrawalFilter> {
            self.0.event()
        }
        #[doc = r" Returns an [`Event`](#ethers_contract::builders::Event) builder for all events of this contract"]
        pub fn events(&self) -> ethers::contract::builders::Event<M, InstStaEvents> {
            self.0.event_with_filter(Default::default())
        }
    }
    impl<M: ethers::providers::Middleware> From<ethers::contract::Contract<M>> for InstSta<M> {
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
        name = "DepositReceivedStaked",
        abi = "DepositReceivedStaked(address,bytes)"
    )]
    pub struct DepositReceivedStakedFilter {
        pub sender: ethers::core::types::Address,
        pub pubkey: ethers::core::types::Bytes,
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
    pub enum InstStaEvents {
        DepositReceivedStakedFilter(DepositReceivedStakedFilter),
        OwnershipTransferredFilter(OwnershipTransferredFilter),
        UserRequestedWithdrawalFilter(UserRequestedWithdrawalFilter),
    }
    impl ethers::contract::EthLogDecode for InstStaEvents {
        fn decode_log(
            log: &ethers::core::abi::RawLog,
        ) -> ::std::result::Result<Self, ethers::core::abi::Error>
        where
            Self: Sized,
        {
            if let Ok(decoded) = DepositReceivedStakedFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositReceivedStakedFilter(decoded));
            }
            if let Ok(decoded) = OwnershipTransferredFilter::decode_log(log) {
                return Ok(InstStaEvents::OwnershipTransferredFilter(decoded));
            }
            if let Ok(decoded) = UserRequestedWithdrawalFilter::decode_log(log) {
                return Ok(InstStaEvents::UserRequestedWithdrawalFilter(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData)
        }
    }
    impl ::std::fmt::Display for InstStaEvents {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                InstStaEvents::DepositReceivedStakedFilter(element) => element.fmt(f),
                InstStaEvents::OwnershipTransferredFilter(element) => element.fmt(f),
                InstStaEvents::UserRequestedWithdrawalFilter(element) => element.fmt(f),
            }
        }
    }
    #[doc = "Container type for all input parameters for the `DEPOSIT_ADDRESS` function with signature `DEPOSIT_ADDRESS()` and selector `0xff0d2c26`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "DEPOSIT_ADDRESS", abi = "DEPOSIT_ADDRESS()")]
    pub struct DepositAddressCall;
    #[doc = "Container type for all input parameters for the `QUADRATA` function with signature `QUADRATA()` and selector `0xe99f0c9b`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "QUADRATA", abi = "QUADRATA()")]
    pub struct QuadrataCall;
    #[doc = "Container type for all input parameters for the `SSV_ADDRESS` function with signature `SSV_ADDRESS()` and selector `0x80164859`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "SSV_ADDRESS", abi = "SSV_ADDRESS()")]
    pub struct SsvAddressCall;
    #[doc = "Container type for all input parameters for the `SSV_TOKEN` function with signature `SSV_TOKEN()` and selector `0x0df1ecfd`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "SSV_TOKEN", abi = "SSV_TOKEN()")]
    pub struct SsvTokenCall;
    #[doc = "Container type for all input parameters for the `depositSSV` function with signature `depositSSV(bytes,uint32[],bytes[],bytes[],uint256,bytes,bytes,bytes32)` and selector `0x08d4fbd5`"]
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
        name = "depositSSV",
        abi = "depositSSV(bytes,uint32[],bytes[],bytes[],uint256,bytes,bytes,bytes32)"
    )]
    pub struct DepositSSVCall {
        pub pubkey: ethers::core::types::Bytes,
        pub operator_ids: ::std::vec::Vec<u32>,
        pub shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub ssv_amount: ethers::core::types::U256,
        pub withdrawal_credentials: ethers::core::types::Bytes,
        pub signature: ethers::core::types::Bytes,
        pub deposit_data_root: [u8; 32],
    }
    #[doc = "Container type for all input parameters for the `getBalance` function with signature `getBalance()` and selector `0x12065fe0`"]
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
    #[doc = "Container type for all input parameters for the `getValidator` function with signature `getValidator(address)` and selector `0x1904bb2e`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getValidator", abi = "getValidator(address)")]
    pub struct GetValidatorCall {
        pub addr: ethers::core::types::Address,
    }
    #[doc = "Container type for all input parameters for the `getValidatorSelf` function with signature `getValidatorSelf()` and selector `0x946eadac`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "getValidatorSelf", abi = "getValidatorSelf()")]
    pub struct GetValidatorSelfCall;
    #[doc = "Container type for all input parameters for the `is_BUSINESS` function with signature `is_BUSINESS()` and selector `0x4d5a1c1f`"]
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
    #[doc = "Container type for all input parameters for the `owner` function with signature `owner()` and selector `0x8da5cb5b`"]
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
    #[doc = "Container type for all input parameters for the `renounceOwnership` function with signature `renounceOwnership()` and selector `0x715018a6`"]
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
    #[doc = "Container type for all input parameters for the `transferOwnership` function with signature `transferOwnership(address)` and selector `0xf2fde38b`"]
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
    #[doc = "Container type for all input parameters for the `verified` function with signature `verified(address)` and selector `0x0db065f4`"]
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
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum InstStaCalls {
        DepositAddress(DepositAddressCall),
        Quadrata(QuadrataCall),
        SsvAddress(SsvAddressCall),
        SsvToken(SsvTokenCall),
        DepositSSV(DepositSSVCall),
        GetBalance(GetBalanceCall),
        GetValidator(GetValidatorCall),
        GetValidatorSelf(GetValidatorSelfCall),
        IsBUSINESS(IsBUSINESSCall),
        Owner(OwnerCall),
        RenounceOwnership(RenounceOwnershipCall),
        TransferOwnership(TransferOwnershipCall),
        Verified(VerifiedCall),
    }
    impl ethers::core::abi::AbiDecode for InstStaCalls {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::std::result::Result<Self, ethers::core::abi::AbiError> {
            if let Ok(decoded) =
                <DepositAddressCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::DepositAddress(decoded));
            }
            if let Ok(decoded) =
                <QuadrataCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::Quadrata(decoded));
            }
            if let Ok(decoded) =
                <SsvAddressCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::SsvAddress(decoded));
            }
            if let Ok(decoded) =
                <SsvTokenCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::SsvToken(decoded));
            }
            if let Ok(decoded) =
                <DepositSSVCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::DepositSSV(decoded));
            }
            if let Ok(decoded) =
                <GetBalanceCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::GetBalance(decoded));
            }
            if let Ok(decoded) =
                <GetValidatorCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::GetValidator(decoded));
            }
            if let Ok(decoded) =
                <GetValidatorSelfCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::GetValidatorSelf(decoded));
            }
            if let Ok(decoded) =
                <IsBUSINESSCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::IsBUSINESS(decoded));
            }
            if let Ok(decoded) = <OwnerCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::Owner(decoded));
            }
            if let Ok(decoded) =
                <RenounceOwnershipCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::RenounceOwnership(decoded));
            }
            if let Ok(decoded) =
                <TransferOwnershipCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::TransferOwnership(decoded));
            }
            if let Ok(decoded) =
                <VerifiedCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::Verified(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ethers::core::abi::AbiEncode for InstStaCalls {
        fn encode(self) -> Vec<u8> {
            match self {
                InstStaCalls::DepositAddress(element) => element.encode(),
                InstStaCalls::Quadrata(element) => element.encode(),
                InstStaCalls::SsvAddress(element) => element.encode(),
                InstStaCalls::SsvToken(element) => element.encode(),
                InstStaCalls::DepositSSV(element) => element.encode(),
                InstStaCalls::GetBalance(element) => element.encode(),
                InstStaCalls::GetValidator(element) => element.encode(),
                InstStaCalls::GetValidatorSelf(element) => element.encode(),
                InstStaCalls::IsBUSINESS(element) => element.encode(),
                InstStaCalls::Owner(element) => element.encode(),
                InstStaCalls::RenounceOwnership(element) => element.encode(),
                InstStaCalls::TransferOwnership(element) => element.encode(),
                InstStaCalls::Verified(element) => element.encode(),
            }
        }
    }
    impl ::std::fmt::Display for InstStaCalls {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                InstStaCalls::DepositAddress(element) => element.fmt(f),
                InstStaCalls::Quadrata(element) => element.fmt(f),
                InstStaCalls::SsvAddress(element) => element.fmt(f),
                InstStaCalls::SsvToken(element) => element.fmt(f),
                InstStaCalls::DepositSSV(element) => element.fmt(f),
                InstStaCalls::GetBalance(element) => element.fmt(f),
                InstStaCalls::GetValidator(element) => element.fmt(f),
                InstStaCalls::GetValidatorSelf(element) => element.fmt(f),
                InstStaCalls::IsBUSINESS(element) => element.fmt(f),
                InstStaCalls::Owner(element) => element.fmt(f),
                InstStaCalls::RenounceOwnership(element) => element.fmt(f),
                InstStaCalls::TransferOwnership(element) => element.fmt(f),
                InstStaCalls::Verified(element) => element.fmt(f),
            }
        }
    }
    impl ::std::convert::From<DepositAddressCall> for InstStaCalls {
        fn from(var: DepositAddressCall) -> Self {
            InstStaCalls::DepositAddress(var)
        }
    }
    impl ::std::convert::From<QuadrataCall> for InstStaCalls {
        fn from(var: QuadrataCall) -> Self {
            InstStaCalls::Quadrata(var)
        }
    }
    impl ::std::convert::From<SsvAddressCall> for InstStaCalls {
        fn from(var: SsvAddressCall) -> Self {
            InstStaCalls::SsvAddress(var)
        }
    }
    impl ::std::convert::From<SsvTokenCall> for InstStaCalls {
        fn from(var: SsvTokenCall) -> Self {
            InstStaCalls::SsvToken(var)
        }
    }
    impl ::std::convert::From<DepositSSVCall> for InstStaCalls {
        fn from(var: DepositSSVCall) -> Self {
            InstStaCalls::DepositSSV(var)
        }
    }
    impl ::std::convert::From<GetBalanceCall> for InstStaCalls {
        fn from(var: GetBalanceCall) -> Self {
            InstStaCalls::GetBalance(var)
        }
    }
    impl ::std::convert::From<GetValidatorCall> for InstStaCalls {
        fn from(var: GetValidatorCall) -> Self {
            InstStaCalls::GetValidator(var)
        }
    }
    impl ::std::convert::From<GetValidatorSelfCall> for InstStaCalls {
        fn from(var: GetValidatorSelfCall) -> Self {
            InstStaCalls::GetValidatorSelf(var)
        }
    }
    impl ::std::convert::From<IsBUSINESSCall> for InstStaCalls {
        fn from(var: IsBUSINESSCall) -> Self {
            InstStaCalls::IsBUSINESS(var)
        }
    }
    impl ::std::convert::From<OwnerCall> for InstStaCalls {
        fn from(var: OwnerCall) -> Self {
            InstStaCalls::Owner(var)
        }
    }
    impl ::std::convert::From<RenounceOwnershipCall> for InstStaCalls {
        fn from(var: RenounceOwnershipCall) -> Self {
            InstStaCalls::RenounceOwnership(var)
        }
    }
    impl ::std::convert::From<TransferOwnershipCall> for InstStaCalls {
        fn from(var: TransferOwnershipCall) -> Self {
            InstStaCalls::TransferOwnership(var)
        }
    }
    impl ::std::convert::From<VerifiedCall> for InstStaCalls {
        fn from(var: VerifiedCall) -> Self {
            InstStaCalls::Verified(var)
        }
    }
    #[doc = "Container type for all return fields from the `DEPOSIT_ADDRESS` function with signature `DEPOSIT_ADDRESS()` and selector `0xff0d2c26`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct DepositAddressReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `QUADRATA` function with signature `QUADRATA()` and selector `0xe99f0c9b`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct QuadrataReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `SSV_ADDRESS` function with signature `SSV_ADDRESS()` and selector `0x80164859`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct SsvAddressReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `SSV_TOKEN` function with signature `SSV_TOKEN()` and selector `0x0df1ecfd`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct SsvTokenReturn(pub ethers::core::types::Address);
    #[doc = "Container type for all return fields from the `getBalance` function with signature `getBalance()` and selector `0x12065fe0`"]
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
    #[doc = "Container type for all return fields from the `getValidator` function with signature `getValidator(address)` and selector `0x1904bb2e`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetValidatorReturn(pub ethers::core::types::Bytes);
    #[doc = "Container type for all return fields from the `getValidatorSelf` function with signature `getValidatorSelf()` and selector `0x946eadac`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct GetValidatorSelfReturn(pub ethers::core::types::Bytes);
    #[doc = "Container type for all return fields from the `is_BUSINESS` function with signature `is_BUSINESS()` and selector `0x4d5a1c1f`"]
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
    #[doc = "Container type for all return fields from the `owner` function with signature `owner()` and selector `0x8da5cb5b`"]
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
    #[doc = "Container type for all return fields from the `verified` function with signature `verified(address)` and selector `0x0db065f4`"]
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
