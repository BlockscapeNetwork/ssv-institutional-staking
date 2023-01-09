"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const child_process_1 = require("child_process");
const canvas_1 = require("canvas");
const ipfs_http_client_1 = require("ipfs-http-client");
const fs_1 = __importDefault(require("fs"));
const EthAllocatorSoloVault_json_1 = __importDefault(require("../utils/EthAllocatorSoloVault.json"));
console.log(`
 _     _            _                                                                                                                                   
| |   | |          | |                                                                                                                                  
| |__ | | ___   ___| | _____  ___ __ _ _ __   ___                                                                                                       
| '_ \\\| |/ _ \\\ / __| |/ / __|/ __/ _\` | '_ \\\ / _ \\\                                                                                                      
| |_) | | (_) | (__|   <\\\__ | (_| (_| | |_) |  __/                                                                                                      
|_.__/|_|\\\___/ \\\___|_|\\\_|___/\\\___\\\__,_| .__/ \\\___|                                                                                                      
                                     | |                                                                                                               
 _                _                  _|_____             _             _ _              __            ______           _        _                     _ 
| |              | |                | /  __ \\\           | |           | | |            / _|           | ___ \\\         | |      | |                   | |
| |__   __ _  ___| | _____ _ __   __| | /  \\\/ ___  _ __ | |_ _ __ ___ | | | ___ _ __  | |_ ___  _ __  | |_/ /___   ___| | _____| |_ _ __   ___   ___ | |
| '_ \\\ / _\` |/ __| |/ / _ | '_ \\\ / _\` | |    / _ \\\| '_ \\\| __| '__/ _ \\\| | |/ _ | '__| |  _/ _ \\\| '__| |    // _ \\\ / __| |/ / _ | __| '_ \\\ / _ \\\ / _ \\\| |
| |_) | (_| | (__|   |  __| | | | (_| | \\\__/| (_) | | | | |_| | | (_) | | |  __| |    | || (_) | |    | |\\\ | (_) | (__|   |  __| |_| |_) | (_) | (_) | |
|_.__/ \\\__,_|\\\___|_|\\\_\\\___|_| |_|\\\__,_|\\\____/\\\___/|_| |_|\\\__|_|  \\\___/|_|_|\\\___|_|    |_| \\\___/|_|    \\\_| \\\_\\\___/ \\\___|_|\\\_\\\___|\\\__| .__/ \\\___/ \\\___/|_|
                                                                                                                                  | |                  
                                                                                                                                  |_|                  
`);
// The Contract interface
const abi = EthAllocatorSoloVault_json_1.default.abi;
// Connect to Goerli
const provider = new ethers_1.ethers.providers.JsonRpcProvider("http://apps.test.blockscape.network:8545"
// "http://localhost:8545" -- local testnet
);
// Load the wallet to deploy the contract with
const privateKey = 
//? - local testnet "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
"0xee4a0344b725905b0defa898940ad548901958e0a110fd44b4474da76cf2fee1";
// Create a wallet instance
const wallet = new ethers_1.ethers.Wallet(privateKey, provider);
console.log("Hot Wallet Validator Address: " + wallet.address);
// The address from the deployment contract
const contractAddress = 
//? - local testnet "0xb45885969eaff3df56c43e5bebce40cdd932fc43";
"0x233fe613b8692a8fb9532d1268d7a922b2811f72";
// Create a contract instance
const contract = new ethers_1.ethers.Contract(contractAddress, abi, wallet);
/// Create Minipool
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Listen for the SoloVaultClosed event
    const filterSoloVaultClosed = contract.filters.SoloVaultClosed();
    console.log("Waiting for SoloVaultClosed event...");
    provider.on(filterSoloVaultClosed, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("SoloVaultClosed event received!");
        try {
            let withdraw = yield contract.withdrawBatch();
            console.log(yield withdraw);
            const balanceWallet = (yield provider.getBalance("0xf0d22db91de516b44e5c976f71e394c9ac97e645")).toString();
            const balanceLimit = ethers_1.ethers.utils.formatEther("17600000000000000000");
            if (balanceWallet >= balanceLimit) {
                console.log(`Hot Wallet Balance: ${balanceWallet}`);
                // call rocketpool
                (0, child_process_1.exec)(
                //? local testnet "echo 'The validator pubkey is: af7ed63dacad9d11dcd380c03ea6a6470d3d835a612304f6be3b4367504729b0d874d4a2311a82bfb8eb9f43510cbdc3'",
                "./run_rocketpool.sh", (error, stdout, stderr) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    // success case
                    console.log("Success! Rocketpool minipool was created!");
                    console.log("Updating validator address...");
                    const tokenID = yield contract.getTokenID();
                    const validator = "0x" + String(stdout);
                    console.log("Validator: " + validator);
                    const tx = yield contract.updateValidator(tokenID - 1, validator);
                    console.log(yield tx);
                    console.log("Done! Validator pub key updated in NFT.");
                    console.log("");
                    console.log("Waiting for SoloVaultClosed event...");
                }));
            }
            else {
                console.log(`Current balance: ${balanceWallet}. I didn't receive 17.6ETH yet.`);
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }));
}))();
/// Update Validator
(() => __awaiter(void 0, void 0, void 0, function* () {
    const ipfs = (0, ipfs_http_client_1.create)({
        host: 'ipfs.blockscape.network',
        port: 443,
        protocol: 'https'
    });
    // Listen for the SoloVaultClosed event
    const filterValidatorSet = contract.filters.ValidatorSet();
    console.log("Waiting for ValidatorSet event...");
    provider.on(filterValidatorSet, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("ValidatorSet event received!");
        const tokenID = yield (yield contract.getTokenID()).toNumber();
        const curPoolID = tokenID - 1;
        console.log("Updating NFT ... | Current Pool ID: " + String(curPoolID));
        try {
            //Image NFT
            const width = 1476;
            const height = 1412;
            const canvas = (0, canvas_1.createCanvas)(width, height);
            const context = canvas.getContext('2d');
            context.fillStyle = '#000';
            context.fillRect(0, 0, width, height);
            (0, canvas_1.loadImage)('/root/test/goerlinft.png').then(image => {
                context.drawImage(image, 0, 0, 1476, 1412);
            });
            const metadata = yield contract.getMetadata(curPoolID);
            context.fillStyle = '#fff';
            context.font = 'bold 36pt Arial';
            context.textAlign = 'center';
            context.textBaseline = 'top';
            context.fillStyle = '#fff';
            context.font = 'bold 24pt Menlo';
            context.textBaseline = 'top';
            context.fillText(yield metadata[1], 802, 868);
            context.fillStyle = '#fff';
            context.font = 'bold 30pt Menlo';
            context.textBaseline = 'top';
            context.fillText(new Date((yield metadata[0].stakedTimestamp.toString()) * 1000).toUTCString(), 375, 530);
            context.fillStyle = '#fff';
            context.font = 'bold 12pt Menlo';
            context.textBaseline = 'top';
            context.fillText(yield metadata[2], 804, 945);
            context.fillStyle = '#fff';
            context.font = 'bold 24pt Menlo';
            context.textBaseline = 'top';
            context.fillText("0x233fe613b8692a8fb9532d1268d7a922b2811f72", 800, 1000);
            const buffer = canvas.toBuffer('image/png');
            fs_1.default.writeFileSync('/root/test/imgs_solo/' + String(curPoolID) + '.png', buffer);
            const metadataNFT = ipfs.add((0, ipfs_http_client_1.globSource)('/root/test/imgs_solo/' + String(curPoolID) + '.png'))
                .then((callback) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(callback.cid.toString());
                const metadataObj = {
                    "description": "This NFT represents your stake position in your blockscape validator.",
                    "external_url": "https://stake.blockscape.network",
                    "image": "https://ipfs.blockscape.network/ipfs/" + callback.cid,
                    "name": "Blockscape Solo Validator | NFT#" + curPoolID,
                    "attributes": [{
                            "trait_type": "Consensus Client",
                            "value": "Lighthouse"
                        },
                        {
                            "trait_type": "Execution Client",
                            "value": "Geth"
                        },
                        {
                            "trait_type": "Stake Timestamp",
                            "value": new Date((yield metadata[0].stakedTimestamp.toString()) * 1000).toLocaleString()
                        },
                        {
                            "trait_type": "Original Staker Address",
                            "value": yield metadata[1]
                        },
                        {
                            "trait_type": "Validator",
                            "value": yield metadata[2]
                        }
                    ]
                };
                return JSON.stringify(metadataObj);
            }))
                .catch((err) => {
                console.error(err);
            });
            fs_1.default.writeFile("/root/test/nfts_solo/" + curPoolID + ".json", yield metadataNFT, function (err) {
                if (err) {
                    console.log(err);
                }
                console.log("Done! NFT metadata updated.");
                console.log("Waiting for ValidatorSet event...");
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
}))();
