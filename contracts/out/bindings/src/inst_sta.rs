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
    # [rustfmt :: skip] const __ABI : & str = "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_quadrataContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvToken\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_ssvContract\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"_depositAddress\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositReceived\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"_pubkey\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositReceivedStaked\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DepositStaked\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenID\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"_user\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_fee\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"_stakedETH\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"UserRequestedWithdrawal\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"DEPOSIT_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"QUADRATA\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_ADDRESS\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"SSV_TOKEN\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositIntoMultiSig\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"withdrawal_credentials\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"signature\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"deposit_data_root\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositSSV\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositTestSSV\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"pubkey\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"uint32[]\",\"name\":\"operatorIds\",\"type\":\"uint32[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesPublicKeys\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"bytes[]\",\"name\":\"sharesEncrypted\",\"type\":\"bytes[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"ssvAmount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"depositTestSSVMultiSig\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_addr\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidator\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getValidatorSelf\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"is_BUSINESS\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"renounceOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"transferOwnership\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_sender\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"verified\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]}]" ;
    #[doc = r" The parsed JSON-ABI of the contract."]
    pub static INSTSTA_ABI: ethers::contract::Lazy<ethers::core::abi::Abi> =
        ethers::contract::Lazy::new(|| {
            ethers::core::utils::__serde_json::from_str(__ABI).expect("invalid abi")
        });
    #[doc = r" Bytecode of the #name contract"]
    pub static INSTSTA_BYTECODE: ethers::contract::Lazy<ethers::core::types::Bytes> =
        ethers::contract::Lazy::new(|| {
            "0x6080346200010157601f62001b0838819003918201601f19168301916001600160401b03831184841017620001065780849260809460405283398101031262000101576200004d816200011c565b6200005b602083016200011c565b6200007760606200006f604086016200011c565b94016200011c565b600160005560015460018060a01b03199033828216176001556040519560018060a01b03948592833391167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a38284600254169185600354169282876004541697600554169a16176002551617600355161760045516176005556119d69081620001328239f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620001015756fe604060e08152600436101561001357600080fd5b600060a090808252803560e01c90816301e09fe21461100c57816308d4fbd514610d4a5781630db065f414610ce35781630df1ecfd14610c8e57816312065fe014610c535781631904bb2e14610ae45781634d5a1c1f14610a895781635c4acd2d14610757578163715018a6146106b557816374deec34146104fc57816380164859146104a75781638da5cb5b14610452578163946eadac146102cd578163e99f0c9b14610278578163f2fde38b14610131575063ff0d2c26146100d657600080fd5b3461012d575190817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101295760209073ffffffffffffffffffffffffffffffffffffffff600554169051908152f35b5080fd5b5180fd5b839150346102735760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610273576004359173ffffffffffffffffffffffffffffffffffffffff9081841680940361026e5761018f61128c565b83156101eb57507f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600154847fffffffffffffffffffffffff0000000000000000000000000000000000000000821617600155169180a35180f35b608490517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b845180fd5b825180fd5b50503461012d575190817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101295760209073ffffffffffffffffffffffffffffffffffffffff600254169051908152f35b82843461044d578151807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261044a573390526020906006825282518181209283549167ffffffffffffffff831161041c57508251936005916103368185851b01876113d8565b83865280860191875152865181812090925b8584106103605786518061035c8a82611169565b0390f35b8651838a5192845492610372846115cd565b8082526001948086169081156103e357506001146103a8575b5061039a8160019603826113d8565b815201920193019290610348565b8d518790528d518481209650905b8082106103cc575081018301945061039a61038b565b8654838301860152958501958894909101906103b6565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001685840152501515891b81018301945061039a61038b565b857f4e487b710000000000000000000000000000000000000000000000000000000060249252604160045251fd5b80fd5b505180fd5b50503461012d575190817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101295760209073ffffffffffffffffffffffffffffffffffffffff600154169051908152f35b50503461012d575190817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101295760209073ffffffffffffffffffffffffffffffffffffffff600454169051908152f35b5050610507366111e9565b9261051998979896959692919261185a565b61052a610525336118c9565b61130b565b600354600480548d517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff91821692810192909252602482018790529160209082908e908290861681604481015b039251905af180156106a95761067b575b506004541694853b15610676579389938b936105f0938b9998978f519b8c9a8b998a997fe40cb19d000000000000000000000000000000000000000000000000000000008b52519d60048b01611536565b03918851905af1801561066a57610656575b5061064b7f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c60369394338651526006602052610640848483895120611620565b51928392338461182a565b0390a1516001815580f35b61065f90611395565b825180156106025780fd5b855185513d90823e3d90fd5b8a5180fd5b61069b9060203d81116106a2575b61069381836113d8565b810190611458565b503861059f565b503d610689565b8d518d513d90823e3d90fd5b90503461044d578151807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261044a57506106f061128c565b73ffffffffffffffffffffffffffffffffffffffff6001547fffffffffffffffffffffffff00000000000000000000000000000000000000008116600155167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a35180f35b5050610762366111e9565b936107769a9697989a99959993919361185a565b610782610525336118c9565b3386515260209960078b5260ff88885120541615610a06573387515260088b5260ff88885120541661098357938a9361083d938d97938c97338b5152600888528b8b512060017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0082541617905573ffffffffffffffffffffffffffffffffffffffff600454169c8c51998a998a019b7fc47e14a2000000000000000000000000000000000000000000000000000000008d5260248b01611536565b039461086f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0968781018452836113d8565b835192839251915af4938151963d60001461094d573d67ffffffffffffffff811161091f57879850917f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c603691600194936108d561035c999a885199601f84011601896113d8565b875283513d908b89013e5b3384515260068a526108f6828288875120611620565b6109058651928392338461182a565b0390a151558080519586951515865285015283019061110b565b6024847f4e487b71000000000000000000000000000000000000000000000000000000008b52604160045251fd5b935061035c94959650907f1d9f9a9e3282b963f061280cbb7f497e41f15f7e7aa8940b589b36847e9c60366001926060956108e0565b60848b8951907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152602560248201527f596f75206861766520616c7265616479207374616b656420796f75722064657060448201527f6f7369742e0000000000000000000000000000000000000000000000000000006064820152fd5b60848b8951907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152602d60248201527f596f752068617665206e6f74206465706f736974656420696e746f207468652060448201527f6d756c7469736967207965742e000000000000000000000000000000000000006064820152fd5b50503461012d575190817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261012957602090517faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b8152f35b82843461044d57602090817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102735760043573ffffffffffffffffffffffffffffffffffffffff8116809103610c4e578351526006825282518181209283549167ffffffffffffffff831161041c5750825193600591610b6c8185851b01876113d8565b83865280860191875152865181812090925b858410610b925786518061035c8a82611169565b8651838a5192845492610ba4846115cd565b808252600194808616908115610c155750600114610bda575b50610bcc8160019603826113d8565b815201920193019290610b7e565b8d518790528d518481209650905b808210610bfe5750810183019450610bcc610bbd565b865483830186015295850195889490910190610be8565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001685840152501515891b810183019450610bcc610bbd565b835180fd5b50503461012d575190817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101295751478152602090f35b50503461012d575190817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101295760209073ffffffffffffffffffffffffffffffffffffffff600354169051908152f35b82843461044d5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261044d576004359173ffffffffffffffffffffffffffffffffffffffff8316830361012d5750610d416020926118c9565b90519015158152f35b50507ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc6101008136011261044d5767ffffffffffffffff90600435828111610c4e57610d9a9036906004016110a7565b92909160243582811161100757610db59036906004016110da565b92909160443582811161100257610dd09036906004016110da565b606493919335828111610ffd57610deb9036906004016110da565b93909260a435818111610ff857610e069036906004016110a7565b919060805260c435908111610ff857610e239036906004016110a7565b610e2e93919361185a565b610e3a610525336118c9565b6801bc16d674ec8000003403610f9b5773ffffffffffffffffffffffffffffffffffffffff93846005541693843b15610f9657918f91610ed38f969593948f610ebe90610ee59751997f228951180000000000000000000000000000000000000000000000000000000060c09b808d5252608060048c51015260848b510191611419565b90885160248782850301910152608051611419565b92604487519182860301910152611419565b60e4356064845101528c51918351808093039134905af18015610f8a57908c9594939291610f7a575b508a6020826003541683600454169751928380927f095ea7b30000000000000000000000000000000000000000000000000000000082528161058e608435809d600484016020909392919373ffffffffffffffffffffffffffffffffffffffff60408201951681520152565b610f849051611395565b38610f0e565b8c518c513d90823e3d90fd5b8e5180fd5b60648e517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f596f75206e65656420746f206465706f736974203332204554482e00000000006044820152fd5b8b5180fd5b895180fd5b875180fd5b855180fd5b839150807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261044a575060207ff1ba5e02dd9da55d69765f748d69bc46c6b056e18d3d4f619f1c372c5e568cb89161106561185a565b33845152600782528084512060017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0082541617905551338152a1516001815580f35b9181601f840112156110d55782359167ffffffffffffffff83116110d557602083818601950101116110d557565b600080fd5b9181601f840112156110d55782359167ffffffffffffffff83116110d5576020808501948460051b0101116110d557565b919082519283825260005b8481106111555750507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006020809697860101520116010190565b602081830181015184830182015201611116565b602080820190808352835180925260408301928160408460051b8301019501936000915b84831061119d5750505050505090565b90919293949584806111d9837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc086600196030187528a5161110b565b980193019301919493929061118d565b60a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc8201126110d55767ffffffffffffffff906004358281116110d55781611234916004016110a7565b939093926024358181116110d5578361124f916004016110da565b939093926044358381116110d5578261126a916004016110da565b939093926064359182116110d557611284916004016110da565b909160843590565b73ffffffffffffffffffffffffffffffffffffffff6001541633036112ad57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b1561131257565b60846040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f596f7520617265206e6f74206120766572696669656420627573696e6573732060448201527f7965742e000000000000000000000000000000000000000000000000000000006064820152fd5b67ffffffffffffffff81116113a957604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff8211176113a957604052565b601f82602094937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0938186528686013760008582860101520116010190565b908160209103126110d5575180151581036110d55790565b9082818152602080910193818360051b82010194846000925b85841061149a575050505050505090565b909192939495967fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820301845287357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112156110d557830186810191903567ffffffffffffffff81116110d55780360383136110d55761152588928392600195611419565b990194019401929594939190611489565b999897959391906115529195939560a08c5260a08c0191611419565b906020828b829403828d01528281520194916000805b8382106115a15750505050508261159c949261158e928a608098960360408c0152611470565b918783036060890152611470565b930152565b9091929396873563ffffffff81168091036115c9578152830196830193929160010190611568565b8280fd5b90600182811c92168015611616575b60208310146115e757565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f16916115dc565b918254680100000000000000008110156113a9576001928382018086558210156117fb576000948552602091828620019467ffffffffffffffff84116117ce5761166a86546115cd565b601f8111611788575b508092601f85116001146116eb5750929392918491826116c0575b50507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff91921b9260031b1c1916179055565b013591507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3861168e565b868252808220939185917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0831691905b8883831061176e5750505010611736575b505050811b019055565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88560031b161c1991013516905538808061172c565b86860135885590960195938401938793509081019061171b565b868252838220601f860160051c8101918587106117c4575b601f0160051c019086905b8281106117b9575050611673565b8381550186906117ab565b90915081906117a0565b807f4e487b7100000000000000000000000000000000000000000000000000000000602492526041600452fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60409073ffffffffffffffffffffffffffffffffffffffff61185795931681528160208201520191611419565b90565b60026000541461186b576002600055565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152fd5b602073ffffffffffffffffffffffffffffffffffffffff604481600254169360405194859384927f4d30b6be0000000000000000000000000000000000000000000000000000000084521660048301527faf369ce728c816785c72f1ff0222ca9553b2cb93729d6a803be6af0d2369239b60248301525afa801561199457600090611962575b600111905061195d57600190565b600090565b6020823d821161198c575b8161197a602093836113d8565b8101031261044a57506001905161194f565b3d915061196d565b6040513d6000823e3d90fdfea26469706673582212202079aaf8d0ef88bbbcc2c81913b676b2304cbb4b44cee3f5d0e03a464f4afe0064736f6c63430008110033" . parse () . expect ("invalid bytecode")
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
        #[doc = "Calls the contract's `depositIntoMultiSig` (0x01e09fe2) function"]
        pub fn deposit_into_multi_sig(&self) -> ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([1, 224, 159, 226], ())
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
        #[doc = "Calls the contract's `depositTestSSVMultiSig` (0x5c4acd2d) function"]
        pub fn deposit_test_ssv_multi_sig(
            &self,
            pubkey: ethers::core::types::Bytes,
            operator_ids: ::std::vec::Vec<u32>,
            shares_public_keys: ::std::vec::Vec<ethers::core::types::Bytes>,
            shares_encrypted: ::std::vec::Vec<ethers::core::types::Bytes>,
            ssv_amount: ethers::core::types::U256,
        ) -> ethers::contract::builders::ContractCall<M, (bool, ethers::core::types::Bytes)>
        {
            self.0
                .method_hash(
                    [92, 74, 205, 45],
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
    #[ethevent(name = "DepositReceived", abi = "DepositReceived(address)")]
    pub struct DepositReceivedFilter {
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
        DepositReceivedFilter(DepositReceivedFilter),
        DepositReceivedStakedFilter(DepositReceivedStakedFilter),
        DepositStakedFilter(DepositStakedFilter),
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
            if let Ok(decoded) = DepositReceivedFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositReceivedFilter(decoded));
            }
            if let Ok(decoded) = DepositReceivedStakedFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositReceivedStakedFilter(decoded));
            }
            if let Ok(decoded) = DepositStakedFilter::decode_log(log) {
                return Ok(InstStaEvents::DepositStakedFilter(decoded));
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
                InstStaEvents::DepositReceivedFilter(element) => element.fmt(f),
                InstStaEvents::DepositReceivedStakedFilter(element) => element.fmt(f),
                InstStaEvents::DepositStakedFilter(element) => element.fmt(f),
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
    #[doc = "Container type for all input parameters for the `depositIntoMultiSig` function with signature `depositIntoMultiSig()` and selector `0x01e09fe2`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthCall,
        ethers :: contract :: EthDisplay,
        Default,
    )]
    #[ethcall(name = "depositIntoMultiSig", abi = "depositIntoMultiSig()")]
    pub struct DepositIntoMultiSigCall;
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
    #[doc = "Container type for all input parameters for the `depositTestSSVMultiSig` function with signature `depositTestSSVMultiSig(bytes,uint32[],bytes[],bytes[],uint256)` and selector `0x5c4acd2d`"]
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
        name = "depositTestSSVMultiSig",
        abi = "depositTestSSVMultiSig(bytes,uint32[],bytes[],bytes[],uint256)"
    )]
    pub struct DepositTestSSVMultiSigCall {
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
        DepositIntoMultiSig(DepositIntoMultiSigCall),
        DepositSSV(DepositSSVCall),
        DepositTestSSV(DepositTestSSVCall),
        DepositTestSSVMultiSig(DepositTestSSVMultiSigCall),
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
                <DepositIntoMultiSigCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::DepositIntoMultiSig(decoded));
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
                <DepositTestSSVMultiSigCall as ethers::core::abi::AbiDecode>::decode(data.as_ref())
            {
                return Ok(InstStaCalls::DepositTestSSVMultiSig(decoded));
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
                InstStaCalls::DepositIntoMultiSig(element) => element.encode(),
                InstStaCalls::DepositSSV(element) => element.encode(),
                InstStaCalls::DepositTestSSV(element) => element.encode(),
                InstStaCalls::DepositTestSSVMultiSig(element) => element.encode(),
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
                InstStaCalls::DepositIntoMultiSig(element) => element.fmt(f),
                InstStaCalls::DepositSSV(element) => element.fmt(f),
                InstStaCalls::DepositTestSSV(element) => element.fmt(f),
                InstStaCalls::DepositTestSSVMultiSig(element) => element.fmt(f),
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
    impl ::std::convert::From<DepositIntoMultiSigCall> for InstStaCalls {
        fn from(var: DepositIntoMultiSigCall) -> Self {
            InstStaCalls::DepositIntoMultiSig(var)
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
    impl ::std::convert::From<DepositTestSSVMultiSigCall> for InstStaCalls {
        fn from(var: DepositTestSSVMultiSigCall) -> Self {
            InstStaCalls::DepositTestSSVMultiSig(var)
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
    #[doc = "Container type for all return fields from the `depositTestSSVMultiSig` function with signature `depositTestSSVMultiSig(bytes,uint32[],bytes[],bytes[],uint256)` and selector `0x5c4acd2d`"]
    #[derive(
        Clone,
        Debug,
        Eq,
        PartialEq,
        ethers :: contract :: EthAbiType,
        ethers :: contract :: EthAbiCodec,
        Default,
    )]
    pub struct DepositTestSSVMultiSigReturn(pub bool, pub ethers::core::types::Bytes);
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
