const path = require('path');
const fsp = require('fs').promises;
const { SSVKeys, KeyShares } = require('ssv-keys');

const operators = require('./operators.json');
const keystore = require('./test.keystore.json');
const operatorIds = require('./operatorIds.json');
const keystorePassword = 'testtest';

const getKeySharesFilePath = () => {
  return `${path.join(process.cwd(), 'data')}${path.sep}keyshares-example-simple.json`;
};

/**
 * This is more complex example demonstrating usage of SSVKeys SDK together with
 * KeyShares file which can be useful in a different flows for solo staker, staking provider or web developer.
 */
async function main() {
  // --------------------------------------------------------------------------
  // ✳️ Lesson 1: Building shares in 3 easy steps.
  // --------------------------------------------------------------------------
  // Step 1: Initialize SSVKeys SDK
  const ssvKeys = new SSVKeys();
  // Step 2: Get private key
  const privateKey = await ssvKeys.getPrivateKeyFromKeystoreData(keystore, keystorePassword);
  // Step 3: Build shares from operator IDs and public keys
  const shares = await ssvKeys.buildShares(privateKey, operatorIds, operators);

  // --------------------------------------------------------------------------
  // ✳️ Lesson 2: Build final web3 transaction payload
  // --------------------------------------------------------------------------
  const ssvAmount = 123456789;
  const payload = await ssvKeys.buildPayload(
    ssvKeys.getValidatorPublicKey(),
    operatorIds,
    shares,
    ssvAmount,
  );
  console.log('Web3 Payload: ', payload);

  // --------------------------------------------------------------------------
  // ✳️ Lesson 3: Saving keyshares file
  // --------------------------------------------------------------------------
  // If you need to save result in a reusable unified format for both web and node
  // environments, save data to keyshares file.
  // --------------------------------------------------------------------------
  // Step 1: Build keyshares object
  const keyShares = await KeyShares.fromData({
    version: 'v2',
    data: {
      operators: operators.map((operator, index) => ({
        id: operatorIds[index],
        publicKey: operator,
      })),
      publicKey: ssvKeys.getValidatorPublicKey(),
      shares,
    },
    payload,
  });
  // Step 2: Save to the file
  const filePath = getKeySharesFilePath();
  await fsp.writeFile(filePath, keyShares.toString(), { encoding: 'utf-8' });
  console.log('See your keyshares file in ', filePath);

  // --------------------------------------------------------------------------
  // ✳️ Lesson 4: Reading keyshares file
  // --------------------------------------------------------------------------
  // If you saved your keyshares to use it later you have two options to do that
  // --------------------------------------------------------------------------
  // Example 1: read saved keyshares as string.
  // Useful in architecture with more dynamic project structure
  // when you can not include json file using `require`
  // --------------------------------------------------------------------------
  const ks1 = await KeyShares.fromData(String(await fsp.readFile(filePath)));
  console.log('Keyshares read as string: ', ks1);
  // --------------------------------------------------------------------------
  // Example 2: use keyshares json (node way)
  // --------------------------------------------------------------------------
  const ks2 = await KeyShares.fromData(require(filePath));
  console.log('Keyshares read as json: ', ks2);

  // For more possible scenarios ideas look at complex example.
}

void main();
