import { ethers } from "ethers";
import { exec } from "child_process";
import fs from 'fs';
import instSta from "../utils/InstSta.json";
import Web3 from 'web3';
import { encode } from 'js-base64';
import { Encryption, Threshold } from 'ssv-keys';
import * as dotenv from 'dotenv'
import { promisify } from "util";

dotenv.config()

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
    //"https://goerli.infura.io/v3/c4fe7eca7f744d1d83fc99a06ed38c2a"
    //"http://apps.test.blockscape.network:8545"
    "http://127.0.0.1:8888"   //-- local testnet
  );
// Load the wallet to deploy the contract with
const privateKey: string =
  //? - local testnet "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  "0x47d2c5b88f212c3448f097b24a8e218e2382547e2f3119f9579d13cd995065f3";
// Create a wallet instance
const wallet: ethers.Wallet = new ethers.Wallet(privateKey, provider);


const signer = new ethers.Wallet(privateKey, provider);
const instStaContract = new ethers.Contract(
  '0x58258904d95ec47d598b4db0d9f94fb26bb65f08',
  abi,
  signer,
);

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
  "0x58258904d95ec47d598b4db0d9f94fb26bb65f08";
//"0x233fe613b8692a8fb9532d1268d7a922b2811f72";

// Create a contract instance
const contract: ethers.Contract = new ethers.Contract(
  "0x58258904d95ec47d598b4db0d9f94fb26bb65f08",
  abi,
  signer
);

const operators = [
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBM3FncW9MMUlERWhTZ3RoMkYycUEKS3dtekhFblQrTkoxNVk5L3B0UTVBOFZpdXNtazgrbEVKcUNjYlN2YTRIZTlNQVNPWDBVU210d2tiaS9IdFVSTAp2Qi9adFE5MFZqK2NuZ2Q5KzZjY2VtNVkwMm50K3hjUFg4TStkYWYzYVVFbHZ1REtPemtxWmZXMjQxQnpCMFdtCmFlaVFlWE1QUTlSNmkzSGFrZC9KNlhyck02QmUyR0FWT0x6ZE52eUNFdFJjVjRVTXc2NzBwUDhjYldhRkVWdEoKWlBPOFc4MGx3anZkQ0NCUTBRMlppVEkySG43N1lXc01xeExVaTJNSjN6WCtPeVFvaVJ5cFpyU2FzaitTTTJaWQpXNGRPMUNRcXJHZ3pPS2JXMnFBWjBHZytrdytQeHdyOUtYRE84WGJlKytVTFhEaWFneFZmZjg5ODZCOXRUYWlaCmp3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelc5VGNJMWxXbmUydkNqZzJlb2UKY3o3NnZ4OVU2QWgvTnZRT0dJY1JTbk5mUWc1amxjM0JuTUM4eW1pQTQzVHJDejl6UFVhUVozZG5idW9DZEY3awpoOWZKcVd3SFFrU2pFQ1ZtVytQS2FVWmQ4aW42cGVGbmgrZEowenR1cUx1aUlJMWQvU05xdGJUaFA2VjQ4TGxDCklsVUhXVFRaKzNVY2dBanlwenIxRmxYU2hGV0w0aGcxeXF3K0p1WW1yTnY2cGZaeWdVbTZQaTBVazVXUVZnUk4KR2RrU3BTb2ZYZERGcElWN0xBU3V0a2dGUytqVnpaL3E5bmh1ejVjNlJWaDYvV1hiZVpDbXhnMGU2R2hIVXY0bAp4SGNaSUkraWhzWk5KM3V5b2NiaWlubE5EaTNMK2hySEUxMExNeVRoN2lVSC8yd1k4MjJKMmdDSEZzNWhkVkNrCm53SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
  'LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelRDZ1hLeStWRitvOFNIdFVwT1YKcXNDSDJHSVhOUkJtS0Ixb251aUE2TnBFK3crOXFMQllQUjdDZ0p4eWxMYWFvYnNVNWhKd001K2ZKcGF3OU9XbApzSU40MGtRNU1JaXY3SVFBTUtiSnZuNmFwYWZGYXJFTjA3WjJUN2VVWDU1RWJwSC9lRXZDUzB4WjV3dklCTTJQCnpKSU5TYlVUNHR5MTNDZkFZOE5IOWcybFdiS3AzVUtuMTZpcmRMcWFmd0tjUTNtaG90K3NBSE52NTdaNWdZS3IKUGY0Q0F4b0oyT0FEVlRYUGxuOXluOGhiU084ajZJOTVHYWxiWk9lZTdGR3FMNmYrVnJrZXBLMEU5K2VFSkJTVwpoeURxcjg4dEFydlB1VWNhUEltMll0dG5sTS9pRGJNNDNnWXRHOEV1bTAvMEZZZGY5dmtJeTRZK2VmaGdPVmluCnB3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K',
];
const operatorIds = [91, 2, 9, 83];
const keyStorePW = '${process.env.PASSPHRASE}';

/// Create SSV Validator (testing no deposit data)
(async () => {

  console.log("Waiting for DepositReceivedTest event...");


  // Listen for the DepositReceived event
  //const filterDepositReceived = contract.filters.DepositReceivedTest(_sender);
  contract.on("DepositReceivedTest", async (_sender) => {
    console.log("DepositReceivedTest event received!");

    try {
      const exec = promisify(require('child_process').exec)

      let account: number = Number(fs.readFileSync('./keystore.json', 'utf8'));

      await exec(`./ethdo account create --account="Vali/${account}" --wallet-passphrase="${process.env.WALLET_PASSPHRASE}" --passphrase="${process.env.PASSPHRASE}" --allow-weak-passphrases`);

      const depositData: IdepositData = JSON.parse(await (await
        exec(`./ethdo validator depositdata --validatoraccount 'Vali/${account}' --withdrawalaccount 'Vali/${account}' --depositvalue='32 Ether' --account 'Vali/${account}' --passphrase '${process.env.PASSPHRASE}' --launchpad --forkversion 00001020`)).stdout.trim())[0];


      const thresholdInstance = new Threshold();

      const privateKey = await (await exec(`./ethdo account key --account=Vali/${account} --passphrase=${process.env.PASSPHRASE}`)).stdout.trim().split('0x')[1];

      account = account + 1;
      fs.writeFileSync('./keystore.json', String(account));

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
      const tokenAmount = web3.utils.toBN("25342395400000000000").toString();
      const operatorIdsArray = Array.from(operatorIds);

      // Get the withdrawal credentials from the depositData file
      const withdrawal_credentials = depositData.withdrawal_credentials;
      // Get the signature from the depositData file
      const signature = depositData.signature;
      // Get the deposit data root from the depositData file
      const deposit_data_root = depositData.deposit_data_root;

      const staker = await _sender;

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

      const unsignedTx = await instStaContract.populateTransaction[
        "createSSVTest"
      ](...ssvData);
      const tx = await signer.sendTransaction(unsignedTx);
      console.log(tx, 'tx');


    } catch (error) {
      console.log(error);
      return false;
    }

  });
})();

/// Create SSV Validator
(async () => {

  console.log("Waiting for DepositReceived event...");

  // Listen for the DepositReceived event
  //const filterDepositReceived = contract.filters.DepositReceivedTest(_sender);
  // contract.on("DepositReceived", async (_sender) => {
  console.log("DepositReceived event received!");

  try {
    const exec = promisify(require('child_process').exec)

    let account: number = Number(fs.readFileSync('./keystore2.json', 'utf8'));

    await exec(`./ethdo account create --account="Vali/${account}" --wallet-passphrase="${process.env.WALLET_PASSPHRASE}" --passphrase="${process.env.PASSPHRASE}" --allow-weak-passphrases`);

    const depositData: IdepositData = JSON.parse(await (await
      exec(`./ethdo validator depositdata --validatoraccount 'Vali/${account}' --withdrawalaccount 'Vali/${account}' --depositvalue='32 Ether' --account 'Vali/${account}' --passphrase '${process.env.PASSPHRASE}' --launchpad --forkversion 00001020`)).stdout.trim())[0];


    const thresholdInstance = new Threshold();

    const privateKey = await (await exec(`./ethdo account key --account=Vali/${account} --passphrase=${process.env.PASSPHRASE}`)).stdout.trim().split('0x')[1];

    account = account + 1;
    fs.writeFileSync('./keystore2.json', String(account));

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
    const tokenAmount = web3.utils.toBN("25342395400000000000").toString();
    const operatorIdsArray = Array.from(operatorIds);

    // Get the withdrawal credentials from the depositData file
    const withdrawal_credentials = "0x" + depositData.withdrawal_credentials;
    console.log(threshold.validatorPublicKey, 'threshold.validatorPublicKey')
    console.log(withdrawal_credentials, 'withdrawal_credentials')
    // Get the signature from the depositData file
    const signature = "0x" + depositData.signature;
    console.log(signature, 'signature')
    // Get the deposit data root from the depositData file
    const deposit_data_root = "0x" + depositData.deposit_data_root;
    console.log(deposit_data_root, 'deposit_data_root')

    const staker = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"  //await _sender;

    // Return all the needed params to build a transaction payload
    const ssvData = [
      staker,
      threshold.validatorPublicKey,
      operatorIdsArray,
      sharesPublicKeys,
      sharesEncrypted,
      tokenAmount,
      withdrawal_credentials,
      signature,
      deposit_data_root,
    ];

    const unsignedTx = await instStaContract.populateTransaction[
      "createSSV"
    ](...ssvData);
    const tx = await signer.sendTransaction(unsignedTx);
    console.log(tx, 'tx');


  } catch (error) {
    console.log(error);
    return false;
  }

  // });
})();