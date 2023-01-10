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
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_quadrataContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvToken\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_depositAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"DepositReceived\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"_pubkey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositReceivedStaked\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"DepositReceivedTest\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositStaked\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"DEPOSIT_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"QUADRATA\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_TOKEN\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"approveSSV\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_staker\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"withdrawal_credentials\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"signature\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"deposit_data_root\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"createSSV\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_staker\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"createSSVTest\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositIntoContract\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositIntoContractTest\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_addr\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidator\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidatorSelf\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"is_BUSINESS\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"renounceOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"transferOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"verified\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static INSTSTA_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    #[doc = r" Bytecode of the #name contract"]
    pub static INSTSTA_BYTECODE: ethers::contract::Lazy<ethers::core::types::Bytes> =
        ethers::contract::Lazy::new(|| {
            "0x6080346200010157601f62001c7038819003918201601f19168301916001600160401b03831184841017620001065780849260809460405283398101031262000101576200004d816200011c565b6200005b602083016200011c565b6200007760606200006f604086016200011c565b94016200011c565b600160005560015460018060a01b03199033828216176001556040519560018060a01b03948592833391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a38284600254169185600354169282876004541697600554169a1617600255161760035516176004551617600555611b3e9081620001328239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620001015756fe6080604052600436101561001257600080fd5b6000803560e01c80630db065f4146111fb5780630df1ecfd146111a957806312065fe01461116f5780631904bb2e146110115780633753836614610d545780634898858a14610bd55780634d5a1c1f14610b7c578063715018a614610add5780638016485914610a8b5780638da5cb5b14610a39578063946eadac146108c7578063cee8ce8414610436578063e0f3f8e014610392578063e99f0c9b14610340578063f2fde38b14610209578063ff0d2c26146101b75763ff2fa0c8146100d857600080fd5b346101b45760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b45761010f61139d565b600354600480546040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff91821681840152913560248301529091602091839160449183918791165af180156101a95761017e575080f35b61019e9060203d81116101a2575b61019681836115bd565b81019061163d565b5080f35b503d61018c565b6040513d84823e3d90fd5b80fd5b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457602073ffffffffffffffffffffffffffffffffffffffff60055416604051908152f35b50346101b45760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457610241611247565b61024961139d565b73ffffffffffffffffffffffffffffffffffffffff8091169081156102bc57600154827fffffffffffffffffffffffff0000000000000000000000000000000000000000821617600155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a380f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457602073ffffffffffffffffffffffffffffffffffffffff60025416604051908152f35b50807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b4576103c46114a6565b6103d56103d033611a3b565b61141c565b33815260076020526040812060017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00825416179055337f3208b26f3b196315309b41d11d34544ee609dcc4ecbd0dfb2e82b8a6539e19718280a26001815580f35b506101207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b45761046a611247565b67ffffffffffffffff6024358181116108005761048b90369060040161133e565b9290916044358181116108c3576104a690369060040161136c565b906064358381116108bf576104bf90369060040161136c565b91906084358581116108bb576104d990369060040161136c565b908a60c4358881116108b7576104f390369060040161133e565b919060e435998a116108b75761054e60ff604073ffffffffffffffffffffffffffffffffffffffff9461052b8f9e369060040161133e565b96909e6105366114a6565b61053e61139d565b1681526007602052205416611515565b6801bc16d674ec8000004710610859578d9973ffffffffffffffffffffffffffffffffffffffff6005541690813b15610855576801bc16d674ec8000008f8f92610639908f976106096105d9986040519b8c9a8b998a987f22895118000000000000000000000000000000000000000000000000000000008a52608060048b015260848a01916115fe565b917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8884030160248901526115fe565b917ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8584030160448601526115fe565b61010435606483015203925af190811561084a578891610832575b5050600354600480546040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9182169281019290925260a435602483018190529792602091839160449183918e91165af1801561082757610808575b5073ffffffffffffffffffffffffffffffffffffffff6004541693843b156108045788968c9488948d9461072c946040519c8d9b8c9a8b997fe40cb19d000000000000000000000000000000000000000000000000000000008b5260048b0161171b565b03925af180156101a9576107ec575b50506107e27f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c60369373ffffffffffffffffffffffffffffffffffffffff83168652600660205261078e818560408920611801565b73ffffffffffffffffffffffffffffffffffffffff831686526007602052604086207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00815416905560405193849384611a0b565b0390a16001815580f35b6107f59061157a565b61080057833861073b565b8380fd5b8880fd5b6108209060203d6020116101a25761019681836115bd565b50386106c8565b6040513d8b823e3d90fd5b61083b9061157a565b610846578638610654565b8680fd5b6040513d8a823e3d90fd5b8b80fd5b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f4e6f7420656e6f75676874204554482e000000000000000000000000000000006044820152fd5b5080fd5b8980fd5b8780fd5b8580fd5b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457338152602060068152604082209081549067ffffffffffffffff8211610a0c576040519260059161092b8185851b01866115bd565b83855280850191865280862086925b858410610953576040518061094f898261126f565b0390f35b604051838992845492610965846117ae565b8082526001948086169081156109d3575060011461099b575b5061098d8160019603826115bd565b81520192019301929061093a565b868d52838d2095508c905b8082106109bc575081018301945061098d61097e565b8654838301860152958501958894909101906109a6565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001685840152501515891b81018301945061098d61097e565b6024847f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457602073ffffffffffffffffffffffffffffffffffffffff60015416604051908152f35b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457602073ffffffffffffffffffffffffffffffffffffffff60045416604051908152f35b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457610b1461139d565b600073ffffffffffffffffffffffffffffffffffffffff6001547fffffffffffffffffffffffff00000000000000000000000000000000000000008116600155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b45760206040517faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b8152f35b50807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457610c076114a6565b610c136103d033611a3b565b6801bc16d674ec8000003403610c845733815260076020526040812060017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00825416179055337ff1ba5e02dd9da55d69765f748d69bc46c6b056e18d3d4f619f1c372c5e568cb88280a26001815580f35b60c46040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152606c60248201527f596f752061726520747279696e6720746f206465706f736974206d6f7265207460448201527f68616e207468652063757272656e7420706f6f6c2063616e20686f6c642e205060648201527f6c65617365207761697420666f7220746865206e657874206f6e65206f72206460848201527f65706f736974206c6573732e000000000000000000000000000000000000000060a4820152fd5b50346101b45760c07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457610d8c611247565b67ffffffffffffffff919060243583811161100d57610daf90369060040161133e565b60449291923585811161100957610dca90369060040161136c565b60649691963582811161084657610de590369060040161136c565b9790926084359081116108bf57610e0090369060040161136c565b939060a43594859173ffffffffffffffffffffffffffffffffffffffff9b8c8a169c8d8d52610ea68d60209a8b9160078352610e4260ff604083205416611515565b8460035416908560045416906040518096819582947f095ea7b3000000000000000000000000000000000000000000000000000000008452600484016020909392919373ffffffffffffffffffffffffffffffffffffffff60408201951681520152565b03925af18015610ffc57610fdf575b506004541694853b15610fdb578c9695948a9488948e94610f06946040519c8d9b8c9a8b997fe40cb19d000000000000000000000000000000000000000000000000000000008b5260048b0161171b565b03925af18015610fd057610f94575b50906007610f8e928787987f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c6036985260068252610f55848860408c20611801565b885252604086207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00815416905560405193849384611a0b565b0390a180f35b610f8e92917f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c603696610fc660079361157a565b9650919250610f15565b6040513d88823e3d90fd5b8c80fd5b610ff5908a3d8c116101a25761019681836115bd565b5038610eb5565b8e604051903d90823e3d90fd5b8480fd5b8280fd5b50346101b4576020807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126108b75773ffffffffffffffffffffffffffffffffffffffff61105f611247565b16825260068152604082209081549067ffffffffffffffff8211610a0c57604051926005916110928185851b01866115bd565b83855280850191865280862086925b8584106110b6576040518061094f898261126f565b6040518389928454926110c8846117ae565b80825260019480861690811561113657506001146110fe575b506110f08160019603826115bd565b8152019201930192906110a1565b868d52838d2095508c905b80821061111f57508101830194506110f06110e1565b865483830186015295850195889490910190611109565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001685840152501515891b8101830194506110f06110e1565b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457602047604051908152f35b50346101b457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457602073ffffffffffffffffffffffffffffffffffffffff60035416604051908152f35b50346101b45760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101b457602061123d611238611247565b611a3b565b6040519015158152f35b6004359073ffffffffffffffffffffffffffffffffffffffff8216820361126a57565b600080fd5b6020808201818352835180915260408301918060408360051b860101950193600080915b8483106112a4575050505050505090565b909192939495967fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc0828203018752848851805190818452855b82811061132a5750508083018201859052601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016909101810197810196019493926001019190611293565b8181018401518582018501528893016112dd565b9181601f8401121561126a5782359167ffffffffffffffff831161126a576020838186019501011161126a57565b9181601f8401121561126a5782359167ffffffffffffffff831161126a576020808501948460051b01011161126a57565b73ffffffffffffffffffffffffffffffffffffffff6001541633036113be57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b1561142357565b60846040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f596f7520617265206e6f74206120766572696669656420627573696e6573732060448201527f7965742e000000000000000000000000000000000000000000000000000000006064820152fd5b6002600054146114b7576002600055565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152fd5b1561151c57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5374616b657220646964206e6f74206465706f73697420455448207965742e006044820152fd5b67ffffffffffffffff811161158e57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761158e57604052565b601f82602094937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0938186528686013760008582860101520116010190565b9081602091031261126a5751801515810361126a5790565b9082818152602080910193818360051b82010194846000925b85841061167f575050505050505090565b909192939495967fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820301845287357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181121561126a57830186810191903567ffffffffffffffff811161126a57803603831361126a5761170a889283926001956115fe565b99019401940192959493919061166e565b999897959391906117379195939560a08c5260a08c01916115fe565b906020828b829403828d01528281520194916000805b838210611786575050505050826117819492611773928a608098960360408c0152611655565b918783036060890152611655565b930152565b9091929396873563ffffffff811680910361100d57815283019683019392916001019061174d565b90600182811c921680156117f7575b60208310146117c857565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f16916117bd565b9182546801000000000000000081101561158e576001928382018086558210156119dc576000948552602091828620019467ffffffffffffffff84116119af5761184b86546117ae565b601f8111611969575b508092601f85116001146118cc5750929392918491826118a1575b50507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff91921b9260031b1c1916179055565b013591507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3861186f565b868252808220939185917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0831691905b8883831061194f5750505010611917575b505050811b019055565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88560031b161c1991013516905538808061190d565b8686013588559096019593840193879350908101906118fc565b868252838220601f860160051c8101918587106119a5575b601f0160051c019086905b82811061199a575050611854565b83815501869061198c565b9091508190611981565b807f4e487b7100000000000000000000000000000000000000000000000000000000602492526041600452fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60409073ffffffffffffffffffffffffffffffffffffffff611a38959316815281602082015201916115fe565b90565b602073ffffffffffffffffffffffffffffffffffffffff604481600254169360405194859384927f4d30b6be0000000000000000000000000000000000000000000000000000000084521660048301527faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b60248301525afa8015611afc57600090611aca575b60019150101590565b6020823d8211611af4575b81611ae2602093836115bd565b810103126101b4575060019051611ac1565b3d9150611ad5565b6040513d6000823e3d90fdfea2646970667358221220bf629adaf149756bd0280723e31d19845735a7fe99c028e098549766c2ba65d764736f6c63430008110033" . parse () . expect ("invalid bytecode")
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
        #[doc = "Calls the contract's `approveSSV` (0xff2fa0c8) function"]
        pub fn approve_ssv(
            &self,
            ssv_amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([255, 47, 160, 200], ssv_amount)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `createSSV` (0xcee8ce84) function"]
        pub fn create_ssv(
            &self,
            staker: ethers::core::types::Address,
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
                    [206, 232, 206, 132],
                    (
                        staker,
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
        #[doc = "Calls the contract's `createSSVTest` (0x37538366) function"]
        pub fn create_ssv_test(
            &self,
            staker: ethers::core::types::Address,
            pubkey: ethers::core::types::Bytes,
            operator_ids: ::std::vec::Vec<u32>,
            shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
            shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
            ssv_amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [55, 83, 131, 102],
                    (
                        staker,
                        pubkey,
                        operator_ids,
                        shares_public_keys,
                        shares_encrypted,
                        ssv_amount,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `depositIntoContract` (0x4898858a) function"]
        pub fn deposit_into_contract(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([72, 152, 133, 138], ())
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `depositIntoContractTest` (0xe0f3f8e0) function"]
        pub fn deposit_into_contract_test(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([224, 243, 248, 224], ())
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
        ) -> ethers::contract::builders::ContractCall<M, ::std::vec::Vec<ethers::core::types::Bytes>>
        {
            self.0
                .method_hash([25, 4, 187, 46], addr)
                .expect("method not found (this should never happen)")
        }
        #[doc = "Calls the contract's `getValidatorSelf` (0x946eadac) function"]
        pub fn get_validator_self(
            &self,
        ) -> ethers::contract::builders::ContractCall<M, ::std::vec::Vec<ethers::core::types::Bytes>>
        {
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
        #[doc = "Gets the contract's `DepositReceived` event"]
        pub fn deposit_received_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DepositReceivedFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `DepositReceivedStaked` event"]
        pub fn deposit_received_staked_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DepositReceivedStakedFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `DepositReceivedTest` event"]
        pub fn deposit_received_test_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DepositReceivedTestFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `DepositStaked` event"]
        pub fn deposit_staked_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, DepositStakedFilter> {
            self.0.event()
        }
        #[doc = "Gets the contract's `OwnershipTransferred` event"]
        pub fn ownership_transferred_filter(
            &self,
        ) -> ethers::contract::builders::Event<M, OwnershipTransferredFilter> {
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
    #[ethevent(name = "DepositReceived", abi = "DepositReceived(address)")]
    pub struct DepositReceivedFilter {
        #[ethevent(indexed)]
        pub sender: ethers::core::types::Address,
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
    #[ethevent(name = "DepositReceivedTest", abi = "DepositReceivedTest(address)")]
    pub struct DepositReceivedTestFilter {
        #[ethevent(indexed)]
        pub sender: ethers::core::types::Address,
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
    #[ethevent(name = "DepositStaked", abi = "DepositStaked(address)")]
    pub struct DepositStakedFilter {
        pub sender: ethers::core::types::Address,
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
    #[derive(Debug, Clone, PartialEq, Eq, ethers :: contract :: EthAbiType)]
    pub enum InstStaEvents {
        DepositReceivedFilter(DepositReceivedFilter),
        DepositReceivedStakedFilter(DepositReceivedStakedFilter),
        DepositReceivedTestFilter(DepositReceivedTestFilter),
        DepositStakedFilter(DepositStakedFilter),
        OwnershipTransferredFilter(OwnershipTransferredFilter),
    }
    impl ethers::contract::EthLogDecode for InstStaEvents {
        fn decode_log(
            log: &ethers::core::abi::RawLog,
        ) -> ::std::result::Result<Self, ethers::core::abi::Error>
        where
            Self: Sized,
        {
            if let Ok(decoded) = DepositReceivedFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositReceivedFilter(decoded));
            }
            if let Ok(decoded) = DepositReceivedStakedFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositReceivedStakedFilter(decoded));
            }
            if let Ok(decoded) = DepositReceivedTestFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositReceivedTestFilter(decoded));
            }
            if let Ok(decoded) = DepositStakedFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositStakedFilter(decoded));
            }
            if let Ok(decoded) = OwnershipTransferredFilter::decode_log(log) {
                return Ok(InstStaEvents::OwnershipTransferredFilter(decoded));
            }
            Err(ethers::core::abi::Error::InvalidData)
        }
    }
    impl ::std::fmt::Display for InstStaEvents {
        fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
            match self {
                InstStaEvents::DepositReceivedFilter(element) => element.fmt(f),
                InstStaEvents::DepositReceivedStakedFilter(element) => element.fmt(f),
                InstStaEvents::DepositReceivedTestFilter(element) => element.fmt(f),
                InstStaEvents::DepositStakedFilter(element) => element.fmt(f),
                InstStaEvents::OwnershipTransferredFilter(element) => element.fmt(f),
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
    #[doc = "Container type for all input parameters for the `approveSSV` function with signature `approveSSV(uint256)` and selector `0xff2fa0c8`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "approveSSV", abi = "approveSSV(uint256)")]
    pub struct ApproveSSVCall {
        pub ssv_amount: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `createSSV` function with signature `createSSV(address,bytes,uint32[],bytes[],bytes[],uint256,bytes,bytes,bytes32)` and selector `0xcee8ce84`"]
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
        name = "createSSV",
        abi = "createSSV(address,bytes,uint32[],bytes[],bytes[],uint256,bytes,bytes,bytes32)"
    )]
    pub struct CreateSSVCall {
        pub staker: ethers::core::types::Address,
        pub pubkey: ethers::core::types::Bytes,
        pub operator_ids: ::std::vec::Vec<u32>,
        pub shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub ssv_amount: ethers::core::types::U256,
        pub withdrawal_credentials: ethers::core::types::Bytes,
        pub signature: ethers::core::types::Bytes,
        pub deposit_data_root: [u8; 32],
    }
    #[doc = "Container type for all input parameters for the `createSSVTest` function with signature `createSSVTest(address,bytes,uint32[],bytes[],bytes[],uint256)` and selector `0x37538366`"]
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
        name = "createSSVTest",
        abi = "createSSVTest(address,bytes,uint32[],bytes[],bytes[],uint256)"
    )]
    pub struct CreateSSVTestCall {
        pub staker: ethers::core::types::Address,
        pub pubkey: ethers::core::types::Bytes,
        pub operator_ids: ::std::vec::Vec<u32>,
        pub shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
        pub ssv_amount: ethers::core::types::U256,
    }
    #[doc = "Container type for all input parameters for the `depositIntoContract` function with signature `depositIntoContract()` and selector `0x4898858a`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "depositIntoContract", abi = "depositIntoContract()")]
    pub struct DepositIntoContractCall;
    #[doc = "Container type for all input parameters for the `depositIntoContractTest` function with signature `depositIntoContractTest()` and selector `0xe0f3f8e0`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "depositIntoContractTest", abi = "depositIntoContractTest()")]
    pub struct DepositIntoContractTestCall;
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
        ApproveSSV(ApproveSSVCall),
        CreateSSV(CreateSSVCall),
        CreateSSVTest(CreateSSVTestCall),
        DepositIntoContract(DepositIntoContractCall),
        DepositIntoContractTest(DepositIntoContractTestCall),
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
                <ApproveSSVCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::ApproveSSV(decoded));
            }
            if let Ok(decoded) =
                <CreateSSVCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::CreateSSV(decoded));
            }
            if let Ok(decoded) =
                <CreateSSVTestCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::CreateSSVTest(decoded));
            }
            if let Ok(decoded) =
                <DepositIntoContractCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::DepositIntoContract(decoded));
            }
            if let Ok(decoded) =
                <DepositIntoContractTestCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::DepositIntoContractTest(decoded));
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
                InstStaCalls::ApproveSSV(element) => element.encode(),
                InstStaCalls::CreateSSV(element) => element.encode(),
                InstStaCalls::CreateSSVTest(element) => element.encode(),
                InstStaCalls::DepositIntoContract(element) => element.encode(),
                InstStaCalls::DepositIntoContractTest(element) => element.encode(),
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
                InstStaCalls::ApproveSSV(element) => element.fmt(f),
                InstStaCalls::CreateSSV(element) => element.fmt(f),
                InstStaCalls::CreateSSVTest(element) => element.fmt(f),
                InstStaCalls::DepositIntoContract(element) => element.fmt(f),
                InstStaCalls::DepositIntoContractTest(element) => element.fmt(f),
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
    impl ::std::convert::From<ApproveSSVCall> for InstStaCalls {
        fn from(var: ApproveSSVCall) -> Self {
            InstStaCalls::ApproveSSV(var)
        }
    }
    impl ::std::convert::From<CreateSSVCall> for InstStaCalls {
        fn from(var: CreateSSVCall) -> Self {
            InstStaCalls::CreateSSV(var)
        }
    }
    impl ::std::convert::From<CreateSSVTestCall> for InstStaCalls {
        fn from(var: CreateSSVTestCall) -> Self {
            InstStaCalls::CreateSSVTest(var)
        }
    }
    impl ::std::convert::From<DepositIntoContractCall> for InstStaCalls {
        fn from(var: DepositIntoContractCall) -> Self {
            InstStaCalls::DepositIntoContract(var)
        }
    }
    impl ::std::convert::From<DepositIntoContractTestCall> for InstStaCalls {
        fn from(var: DepositIntoContractTestCall) -> Self {
            InstStaCalls::DepositIntoContractTest(var)
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
    pub struct GetValidatorReturn(pub ::std::vec::Vec<ethers::core::types::Bytes>);
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
    pub struct GetValidatorSelfReturn(pub ::std::vec::Vec<ethers::core::types::Bytes>);
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
