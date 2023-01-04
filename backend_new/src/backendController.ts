import { ethers } from "ethers";
import { exec } from "child_process";
import fs from 'fs';
import instSta from "../utils/InstSta.json";
import Web3 from 'web3';
import { encode } from 'js-base64';
import { Encryption, EthereumKeyStore, Threshold } from 'ssv-keys';


import { } from 'dotenv/config'
import { promisify } from "util";

console.log(`
 _     _            _                                                                                                                                   
| |   | |          | |                                                                                                                                  
| |__ | | ___   ___| | _____  ___ __ _ _ __   ___                                                                                                       
| '_ \\\| |/ _ \\\ / __| |/ / __|/ __/ _\` | '_ \\\ / _ \\\                                                                                                      
| |_) | | (_) | (__|   <\\\__ | (_| (_| | |_) |  __/                                                                                                      
|_.__/|_|\\\___/ \\\___|_|\\\_|___/\\\___\\\__,_| .__/ \\\___|                                                                                                      
                                      | |                                                                                                               
                                      |_|`);

// The Contract interface
const abi: ethers.ContractInterface = instSta.abi;
// Connect to Goerli
const provider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(
    "http://apps.test.blockscape.network:8545"
    // "http://localhost:8888" //-- local testnet
  );
// Load the wallet to deploy the contract with
const privateKey: string =
  //? - local testnet "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  "0x47d2c5b88f212c3448f097b24a8e218e2382547e2f3119f9579d13cd995065f3";
// Create a wallet instance
const wallet: ethers.Wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

interface IdepositData {

  name: string;
  account: string;
  pubkey: string;
  withdrawal_credentials: string;
  signature: string;
  amount: number;
  deposit_data_root: string;
  deposit_message_root: string;
  fork_version: number;
  version: number;
}

console.log("Hot Wallet Validator Address: " + wallet.address);
// The address from the deployment contract
const contractAddress: string =
  //? - local testnet
  "0x4df6bc72527e380b8bc845451bb70d68fc5d4f0f";
//"0x233fe613b8692a8fb9532d1268d7a922b2811f72";

// Create a contract instance
const contract: ethers.Contract = new ethers.Contract(
  contractAddress,
  abi,
  wallet
);

const operators = [
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBM3FncW9MMUlERWhTZ3RoMkYycUEKS3dtekhFblQrTkoxNVk5L3B0UTVBOFZpdXNtazgrbEVKcUNjYlN2YTRIZTlNQVNPWDBVU210d2tiaS9IdFVSTAp2Qi9adFE5MFZqK2NuZ2Q5KzZjY2VtNVkwMm50K3hjUFg4TStkYWYzYVVFbHZ1REtPemtxWmZXMjQxQnpCMFdtCmFlaVFlWE1QUTlSNmkzSGFrZC9KNlhyck02QmUyR0FWT0x6ZE52eUNFdFJjVjRVTXc2NzBwUDhjYldhRkVWdEoKWlBPOFc4MGx3anZkQ0NCUTBRMlppVEkySG43N1lXc01xeExVaTJNSjN6WCtPeVFvaVJ5cFpyU2FzaitTTTJaWQpXNGRPMUNRcXJHZ3pPS2JXMnFBWjBHZytrdytQeHdyOUtYRE84WGJlKytVTFhEaWFneFZmZjg5ODZCOXRUYWlaCmp3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelc5VGNJMWxXbmUydkNqZzJlb2UKY3o3NnZ4OVU2QWgvTnZRT0dJY1JTbk5mUWc1amxjM0JuTUM4eW1pQTQzVHJDejl6UFVhUVozZG5idW9DZEY3awpoOWZKcVd3SFFrU2pFQ1ZtVytQS2FVWmQ4aW42cGVGbmgrZEowenR1cUx1aUlJMWQvU05xdGJUaFA2VjQ4TGxDCklsVUhXVFRaKzNVY2dBanlwenIxRmxYU2hGV0w0aGcxeXF3K0p1WW1yTnY2cGZaeWdVbTZQaTBVazVXUVZnUk4KR2RrU3BTb2ZYZERGcElWN0xBU3V0a2dGUytqVnpaL3E5bmh1ejVjNlJWaDYvV1hiZVpDbXhnMGU2R2hIVXY0bAp4SGNaSUkraWhzWk5KM3V5b2NiaWlubE5EaTNMK2hySEUxMExNeVRoN2lVSC8yd1k4MjJKMmdDSEZzNWhkVkNrCm53SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelRDZ1hLeStWRitvOFNIdFVwT1YKcXNDSDJHSVhOUkJtS0Ixb251aUE2TnBFK3crOXFMQllQUjdDZ0p4eWxMYWFvYnNVNWhKd001K2ZKcGF3OU9XbApzSU40MGtRNU1JaXY3SVFBTUtiSnZuNmFwYWZGYXJFTjA3WjJUN2VVWDU1RWJwSC9lRXZDUzB4WjV3dklCTTJQCnpKSU5TYlVUNHR5MTNDZkFZOE5IOWcybFdiS3AzVUtuMTZpcmRMcWFmd0tjUTNtaG90K3NBSE52NTdaNWdZS3IKUGY0Q0F4b0oyT0FEVlRYUGxuOXluOGhiU084ajZJOTVHYWxiWk9lZTdGR3FMNmYrVnJrZXBLMEU5K2VFSkJTVwpoeURxcjg4dEFydlB1VWNhUEltMll0dG5sTS9pRGJNNDNnWXRHOEV1bTAvMEZZZGY5dmtJeTRZK2VmaGdPVmluCnB3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
];
const operatorIds = [91, 2, 9, 83];
const keyStorePW = 'dummy123';

/// Create SSV Validator
(async () => {

  // Listen for the DepositReceived event
  const filterDepositReceived = contract.filters.DepositReceivedTest();

  console.log("Waiting for DepositReceived event...");

  // provider.on(filterDepositReceived, async () => {
  console.log("DepositReceived event received!");
  console.log(filterDepositReceived);

  try {

    // Get required data from the keystore file

    const exec = promisify(require('child_process').exec)

    const depositData: IdepositData = JSON.parse(await (await
      exec("./ethdo validator depositdata --validatoraccount 'Vali/Operations' --withdrawalaccount 'Vali/Operations' --depositvalue='32 Ether' --account 'Vali/Operations' --passphrase 'dummy123'")).stdout.trim())[0];

    const keyStoreFile = JSON.parse(fs.readFileSync('./keystore.json', 'utf8'));  // question is how to do this better with ethdo/dirk

    const keyStore = new EthereumKeyStore(JSON.stringify(keyStoreFile));

    const thresholdInstance = new Threshold();
    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    const threshold = await thresholdInstance.create(privateKey, operatorIds);

    let shares = new Encryption(operators, threshold.shares).encrypt();

    // Loop through the operators RSA keys and format them as base64
    shares = shares.map((share) => {
      share.operatorPublicKey = encode(share.operatorPublicKey);
      // Return the operator key and KeyShares (sharePublicKey & shareEncrypted)
      return share;
    });


    const web3 = new Web3();
    //Get all the public keys from the shares
    const sharesPublicKeys = shares.map((share) => share.publicKey);
    // Get all the private keys from the shares and encode them as ABI parameters
    const sharesEncrypted = shares.map((share) =>
      web3.eth.abi.encodeParameter('string', share.privateKey),
    );

    // Token amount (liquidation collateral and operational runway balance to be funded)
    const tokenAmount = web3.utils.toBN(21342395400000000000).toString();
    const operatorIdsArray = Array.from(operatorIds);

    // Get the withdrawal credentials from the depositData file
    const withdrawal_credentials = depositData.withdrawal_credentials;
    // Get the signature from the depositData file
    const signature = depositData.signature;
    // Get the deposit data root from the depositData file
    const deposit_data_root = depositData.deposit_data_root;

    const staker = await signer.getAddress(); // needs to be changed to the staker address

    // Return all the needed params to build a transaction payload
    const ssvData = [
      staker,
      threshold.validatorPublicKey,
      operatorIdsArray,
      sharesPublicKeys,
      sharesEncrypted,
      tokenAmount,
      // withdrawal_credentials,
      // signature,
      // deposit_data_root,
    ];

    console.log(ssvData, 'ssvData');

    const unsignedTx = await contract.populateTransaction[
      "createSSVTest"
    ](...ssvData);

    const tx = await signer.sendTransaction(unsignedTx);
    console.log(tx, 'tx');


    // Call the createSSV function


  } catch (error) {
    console.log(error);
    return false;
  }
  // });
})();

