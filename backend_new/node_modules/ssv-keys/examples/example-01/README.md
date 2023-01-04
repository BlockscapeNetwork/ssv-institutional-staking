## Example for building shares and final payload from raw data

### Steps:

#### Step 1: Read operators data and keystore file

```javascript
import { ISharesKeyPairs, SSVKeys } from 'ssv-keys';

const keystore = require('./test.keystore.json');
const operators = require('./operators.json');
const operatorIds = require('./operatorIds.json');
const keystorePassword = 'testtest';
```

#### Step 2: Get private key from keystore file

```javascript
const ssvKeys = new SSVKeys();
const privateKey = await ssvKeys.getPrivateKeyFromKeystoreData(keystore, keystorePassword);
```

#### Step 3: Build shares from operator IDs and public keys

```javascript
const threshold: ISharesKeyPairs = await ssvKeys.createThreshold(privateKey, operatorIds);
const shares = await ssvKeys.encryptShares(operators, threshold.shares);
```

#### Step 4: Build final web3 transaction payload

```javascript
const payload = await ssvKeys.buildPayload(
  threshold.validatorPublicKey,
  operatorIds,
  shares,
  123456789,
);
console.log(payload);
```
