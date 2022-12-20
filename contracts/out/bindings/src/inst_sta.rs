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
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_quadrataContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvToken\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_depositAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"_pubkey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositReceivedStaked\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenID\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"_user\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_fee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_stakedETH\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"UserRequestedWithdrawal\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"DEPOSIT_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"QUADRATA\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_TOKEN\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"withdrawal_credentials\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"signature\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"deposit_data_root\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositSSV\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositTestSSV\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_addr\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidator\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidatorSelf\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"is_BUSINESS\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"renounceOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"transferOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"verified\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static INSTSTA_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    #[doc = r" Bytecode of the #name contract"]
    pub static INSTSTA_BYTECODE: ethers::contract::Lazy<ethers::core::types::Bytes> =
        ethers::contract::Lazy::new(|| {
            "0x6080346200010157601f620017c438819003918201601f19168301916001600160401b03831184841017620001065780849260809460405283398101031262000101576200004d816200011c565b6200005b602083016200011c565b6200007760606200006f604086016200011c565b94016200011c565b600160005560015460018060a01b03199033828216176001556040519560018060a01b03948592833391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a38284600254169185600354169282876004541697600554169a16176002551617600355161760045516176005556116929081620001328239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620001015756fe6080604052600436101561001257600080fd5b6000803560e01c806308d4fbd514610af05780630db065f414610a8a5780630df1ecfd14610a3857806312065fe0146109fe5780631904bb2e1461092c5780634d5a1c1f146108d3578063715018a61461083457806374deec341461044257806380164859146103f05780638da5cb5b1461039e578063946eadac14610299578063e99f0c9b14610247578063f2fde38b1461010b5763ff0d2c26146100b757600080fd5b3461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010857602073ffffffffffffffffffffffffffffffffffffffff60055416604051908152f35b80fd5b50346101085760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101085760043573ffffffffffffffffffffffffffffffffffffffff80821680920361024357610165611156565b81156101bf57600154827fffffffffffffffffffffffff0000000000000000000000000000000000000000821617600155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a380f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b8280fd5b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010857602073ffffffffffffffffffffffffffffffffffffffff60025416604051908152f35b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010857338152602060068152604082209060405191838154906102e782611493565b8086529260019280841690811561035c5750600114610321575b61031d86610311818a03826112a2565b604051918291826110f0565b0390f35b9080949650528483205b828410610349575050508161031d9361031192820101933880610301565b805485850187015292850192810161032b565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00168787015250505050151560051b82010191506103118161031d3880610301565b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010857602073ffffffffffffffffffffffffffffffffffffffff60015416604051908152f35b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010857602073ffffffffffffffffffffffffffffffffffffffff60045416604051908152f35b5060a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101085767ffffffffffffffff906004358281116108305761048f90369060040161108c565b9060243584811161082c576104a89036906004016110bf565b90604435868111610828576104c19036906004016110bf565b606435888111610824576104d99036906004016110bf565b906104e2611516565b6104f36104ee33611585565b6111d5565b600354600480546040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff91821692810192909252608435602483018190529592602091839116818e816044810103925af18015610819576107ea575b5073ffffffffffffffffffffffffffffffffffffffff6004541694853b156107e6578a9695948a9488948b946105cd946040519c8d9b8c9a8b997fe40cb19d000000000000000000000000000000000000000000000000000000008b5260048b01611400565b03925af180156107db579084916107c7575b505033835260066020526040832093821161079a576105fe8454611493565b601f8111610755575b508293601f8311600114610697578284957f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c6036959161068c575b508360011b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8560031b1c19161790555b61068260405192839233846114e6565b0390a16001815580f35b905082013538610640565b808452602084207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0841695855b87811061073d5750847f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c6036969710610705575b5050600183811b019055610672565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88660031b161c199084013516905538806106f6565b909160206001819285880135815501930191016106c4565b84845260208420601f840160051c81019160208510610790575b601f0160051c01905b8181106107855750610607565b848155600101610778565b909150819061076f565b6024837f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b6107d09061125f565b6102435782386105df565b6040513d86823e3d90fd5b8a80fd5b61080b9060203d602011610812575b61080381836112a2565b810190611322565b5038610567565b503d6107f9565b6040513d8d823e3d90fd5b8780fd5b8580fd5b8380fd5b5080fd5b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101085761086b611156565b600073ffffffffffffffffffffffffffffffffffffffff6001547fffffffffffffffffffffffff00000000000000000000000000000000000000008116600155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101085760206040517faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b8152f35b5034610108576020807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126108305760043573ffffffffffffffffffffffffffffffffffffffff8116809103610243578252600681526040822090604051918381549061099a82611493565b8086529260019280841690811561035c57506001146109c35761031d86610311818a03826112a2565b9080949650528483205b8284106109eb575050508161031d9361031192820101933880610301565b80548585018701529285019281016109cd565b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010857602047604051908152f35b503461010857807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261010857602073ffffffffffffffffffffffffffffffffffffffff60035416604051908152f35b50346101085760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610108576004359073ffffffffffffffffffffffffffffffffffffffff82168203610108576020610ae683611585565b6040519015158152f35b506101007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101085760043567ffffffffffffffff811161083057610b3c90369060040161108c565b60249291923567ffffffffffffffff811161024357610b5f9036906004016110bf565b60443567ffffffffffffffff811161108857610b7f9036906004016110bf565b909260643567ffffffffffffffff811161108457610ba19036906004016110bf565b9060a43567ffffffffffffffff8111610f6f57610bc290369060040161108c565b9060c43567ffffffffffffffff81116107e657610be390369060040161108c565b610beb611516565b610bf76104ee33611585565b6801bc16d674ec8000003403610fb45773ffffffffffffffffffffffffffffffffffffffff6005541692833b15610fb0578b610cd78f92948f9694610ca7610c77976040519a8b998a9889987f22895118000000000000000000000000000000000000000000000000000000008a52608060048b015260848a01916112e3565b917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8884030160248901526112e3565b917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8584030160448601526112e3565b60e4356064830152039134905af18015610f9257610f9d575b50600354600480546040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9182169281019290925260843560248301529091602091839160449183918e91165af18015610f9257610f73575b5073ffffffffffffffffffffffffffffffffffffffff6004541693843b15610f6f57610dca8a8a9796959488948b946040519b8c9a8b998a987fe40cb19d000000000000000000000000000000000000000000000000000000008a526084359760048b01611400565b03925af18015610f6457908391610f50575b50503382526006602052604082209267ffffffffffffffff821161079a57610e048454611493565b601f8111610f0b575b508293601f8311600114610e86578284957f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c6036959161068c57508360011b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8560031b1c191617905561068260405192839233846114e6565b808452602084207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0841695855b878110610ef35750847f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c6036969710610705575050600183811b019055610672565b90916020600181928588013581550193019101610eb3565b84845260208420601f840160051c81019160208510610f46575b601f0160051c01905b818110610f3b5750610e0d565b848155600101610f2e565b9091508190610f25565b610f599061125f565b610830578138610ddc565b6040513d85823e3d90fd5b8880fd5b610f8b9060203d6020116108125761080381836112a2565b5038610d61565b6040513d8b823e3d90fd5b610fa99098919861125f565b9638610cf0565b8c80fd5b60c46040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152606c60248201527f596f752061726520747279696e6720746f206465706f736974206d6f7265207460448201527f68616e207468652063757272656e7420706f6f6c2063616e20686f6c642e205060648201527f6c65617365207761697420666f7220746865206e657874206f6e65206f72206460848201527f65706f736974206c6573732e000000000000000000000000000000000000000060a4820152fd5b8680fd5b8480fd5b9181601f840112156110ba5782359167ffffffffffffffff83116110ba57602083818601950101116110ba57565b600080fd5b9181601f840112156110ba5782359167ffffffffffffffff83116110ba576020808501948460051b0101116110ba57565b60208082528251818301819052939260005b858110611142575050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006040809697860101520116010190565b818101830151848201604001528201611102565b73ffffffffffffffffffffffffffffffffffffffff60015416330361117757565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b156111dc57565b60846040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f596f7520617265206e6f74206120766572696669656420627573696e6573732060448201527f7965742e000000000000000000000000000000000000000000000000000000006064820152fd5b67ffffffffffffffff811161127357604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761127357604052565b601f82602094937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0938186528686013760008582860101520116010190565b908160209103126110ba575180151581036110ba5790565b9082818152602080910193818360051b82010194846000925b858410611364575050505050505090565b909192939495967fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820301845287357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112156110ba57830186810191903567ffffffffffffffff81116110ba5780360383136110ba576113ef889283926001956112e3565b990194019401929594939190611353565b9998979593919061141c9195939560a08c5260a08c01916112e3565b906020828b829403828d01528281520194916000805b83821061146b575050505050826114669492611458928a608098960360408c015261133a565b91878303606089015261133a565b930152565b9091929396873563ffffffff8116809103610243578152830196830193929160010190611432565b90600182811c921680156114dc575b60208310146114ad57565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f16916114a2565b60409073ffffffffffffffffffffffffffffffffffffffff611513959316815281602082015201916112e3565b90565b600260005414611527576002600055565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152fd5b602073ffffffffffffffffffffffffffffffffffffffff604481600254169360405194859384927f4d30b6be0000000000000000000000000000000000000000000000000000000084521660048301527faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b60248301525afa80156116505760009061161e575b600111905061161957600190565b600090565b6020823d8211611648575b81611636602093836112a2565b8101031261010857506001905161160b565b3d9150611629565b6040513d6000823e3d90fdfea26469706673582212206e9b9f7b8613471db35cc4fafe56a4490098c3a601ee7366d1a4d3dcbe94e14264736f6c63430008110033" . parse () . expect ("invalid bytecode")
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
        #[doc = "Calls the contract's `depositTestSSV` (0x74deec34) function"]
        pub fn deposit_test_ssv(
            &self,
            pubkey: ethers::core::types::Bytes,
            operator_ids: ::std::vec::Vec<u32>,
            shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
            shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
            ssv_amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [116, 222, 236, 52],
                    (
                        pubkey,
                        operator_ids,
                        shares_public_keys,
                        shares_encrypted,
                        ssv_amount,
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
    #[doc = "Container type for all input parameters for the `depositTestSSV` function with signature `depositTestSSV(bytes,uint32[],bytes[],bytes[],uint256)` and selector `0x74deec34`"]
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
        name = "depositTestSSV",
        abi = "depositTestSSV(bytes,uint32[],bytes[],bytes[],uint256)"
    )]
    pub struct DepositTestSSVCall {
        pub pubkey: ethers::core::types::Bytes,
        pub operator_ids: ::std::vec::Vec<u32>,
        pub shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub ssv_amount: ethers::core::types::U256,
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
        DepositTestSSV(DepositTestSSVCall),
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
                <DepositTestSSVCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::DepositTestSSV(decoded));
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
                InstStaCalls::DepositTestSSV(element) => element.encode(),
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
                InstStaCalls::DepositTestSSV(element) => element.fmt(f),
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
    impl ::std::convert::From<DepositTestSSVCall> for InstStaCalls {
        fn from(var: DepositTestSSVCall) -> Self {
            InstStaCalls::DepositTestSSV(var)
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
