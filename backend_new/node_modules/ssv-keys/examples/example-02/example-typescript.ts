import * as path from 'path';
import { promises as fsp } from 'fs';
import { SSVKeys, KeyShares } from 'ssv-keys';

const operators = require('./operators.json');
const keystore = require('./test.keystore.json');
const operatorIds = require('./operatorIds.json');
const keystorePassword = 'testtest';

const getKeySharesFilePath = (step: string | number) => {
  return `${path.join(process.cwd(), 'data')}${path.sep}keyshares-step-${step}.json`;
};

/**
 * This is more complex example demonstrating usage of SSVKeys SDK together with
 * KeyShares file which can be useful in a different flows for solo staker, staking provider or web developer.
 */
async function main() {
  // Initialize key shares file to demonstrate how it can hold the data and payload from different flows
  const keyShares = await KeyShares.fromData({ version: 'v2' });

  /**
   * Or alternatively you can use simple constructor, but in this case potentially passed
   * data won't be automatically validated at this point.
   * Example:
   *  const keyShares = new KeyShares({ version: 'v2' });
   */

  // Save it with version only and with no any data.
  await fsp.writeFile(getKeySharesFilePath(1), keyShares.toString(), { encoding: 'utf-8' });

  // At some point we get operator IDs and public keys and want to save them too
  await keyShares.setData({
    operators: operators.map((operator: any, index: string | number) => ({
      id: operatorIds[index],
      publicKey: operator,
    }))
  });
  await fsp.writeFile(getKeySharesFilePath(2), keyShares.toString(), { encoding: 'utf-8' });

  // Initialize SSVKeys SDK
  const ssvKeys = new SSVKeys();
  const privateKey = await ssvKeys.getPrivateKeyFromKeystoreData(keystore, keystorePassword);

  // Build shares from operator IDs and public keys
  const shares = await ssvKeys.buildShares(privateKey, operatorIds, operators);

  // Now save to key shares file encrypted shares and validator public key
  await keyShares.setData({
    publicKey: ssvKeys.getValidatorPublicKey(),
    shares,
  });

  await fsp.writeFile(getKeySharesFilePath(3), keyShares.toString(), { encoding: 'utf-8' });

  // Build final web3 transaction payload and update keyshares file with payload data
  const payload = await ssvKeys.buildPayload(
    ssvKeys.getValidatorPublicKey(),
    operatorIds,
    shares,
    123456789,
  );
  await keyShares.setPayload(payload);
  await fsp.writeFile(getKeySharesFilePath(4), keyShares.toString(), { encoding: 'utf-8' });

  // Build payload with a new ssv amount and from saved on previous steps key shares data
  const keySharesWithoutPayload = await KeyShares.fromData(String(await fsp.readFile(getKeySharesFilePath(3))));
  const payload2 = await ssvKeys.buildPayloadFromKeyShares(keySharesWithoutPayload, 987654321);
  await keyShares.setPayload(payload2);

  // Save new key shares file with new ssv amount
  await fsp.writeFile(getKeySharesFilePath(5), keyShares.toString(), { encoding: 'utf-8' });
  console.log('Compare key shares file contents for steps #4 and #5');
}

void main();
