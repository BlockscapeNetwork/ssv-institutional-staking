# SSV Keys

![GitHub](https://img.shields.io/github/license/bloxapp/ssv-keys)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/bloxapp/ssv-keys/Lint%20and%20test)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bloxapp/ssv-keys)

![GitHub commit activity](https://img.shields.io/github/commit-activity/y/bloxapp/ssv-keys)
![GitHub contributors](https://img.shields.io/github/contributors/bloxapp/ssv-keys)
![GitHub last commit](https://img.shields.io/github/last-commit/bloxapp/ssv-keys)

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/bloxapp/ssv-keys)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/bloxapp/ssv-keys)

![Discord](https://img.shields.io/discord/723834989506068561?style=for-the-badge&label=Ask%20for%20support&logo=discord&logoColor=white)

Important dependencies:

* ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/bloxapp/ssv-keys/web3?style=social)
* ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/bloxapp/ssv-keys/bls-eth-wasm?style=social)
* ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/bloxapp/ssv-keys/bls-signatures?style=social)
* ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/bloxapp/ssv-keys/eth2-keystore-js?style=social)
* ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/bloxapp/ssv-keys/ethereumjs-util?style=social)
* ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/bloxapp/ssv-keys/ethereumjs-wallet?style=social)

---

Library and CLI to work with the ETH keystore file:
1. Parse the private key using the keystore password
2. Use the private key to get shares for operators
3. Build the payload for the transaction

## OPTION 1: Running an Executable (Recommended route)

If you want to run a compiled version (easier option then CLI)

1. Go to the releases section: https://github.com/bloxapp/ssv-keys/releases
2. Select the latest release for the specific version of the CLI: `vX.Y.Z-v1` - for the first version of the contract, `vX.Y.Z-v2` - for second etc.
   Example: `v0.0.1-v1` or `v0.0.1-v2`.
3. Download the native executable for your operating system:
   * `ssv-keys-lin` - for Ubuntu Linux
   * `ssv-keys-mac` - for MacOS
   * `ssv-keys.exe` - for Windows
4. Open terminal and change the directory to where you downloaded the executable. For instance, on MacOS you can:
   ```bash
   cd ~/Downloads
   ```
5. (Mac and Linux) Make sure that the executable has permissions to run by running:
   ```bash
   chmod 777 ./ssv-keys-mac
   ```
6. Now you can run it:
   ```bash
   ./ssv-keys-mac
   ```
7. If your operating system prevents you from running the executable you can open it from the file manager (Finder in case of MacOS), right click on it, and click the `Open` menu. Once open click the `Open` or `allow` button when you are asked to do so. After this go back to the console and try to run it again.

## Option 2: Running from the CLI

### Installation

This installation requires NodeJS on your machine.
You can download it [here](https://nodejs.org/en/download/).

Once you have installed NodeJS, follow instructions:

```bash
git clone https://github.com/bloxapp/ssv-keys.git
cd ssv-keys
npm install -g yarn
yarn install
yarn cli --help
```

### Running from repository

- For regular CLI usage you will be running the command as: `yarn cli ...`
- Follow [installation](#Installation) instructions.



### Help

Help on available actions:

```bash
yarn cli --help
```

Help on a specific action:

```bash
yarn cli <action> --help
```


### Example

#### Step 1: Build the shares:

**Input parameters:**

- keystore (ks) = Path to keystore json file
- password (ps) = Keystore password
- operators (op) = Comma-separated list of the operator keys
- output-format (of) = Format of the result (abi or raw)

```bash
yarn cli shares --keystore=src/lib/EthereumKeyStore/__tests__/test.keystore.json --password=testtest --operators=...,...,... --output-format=raw
```

**Output:**  Shares and path to file holding the shares

#### Step 2: Build the transaction payload:

**Input parameters:**

- keystore (ks) = Path to keystore json file
- password (ps) = Keystore password
- operators (op) = Comma-separated list of the operator keys
- operator-ids (oid) = Comma-separated list of the operator ids (same sequence as operators)
- ssv-amount (ssv) = SSV Token amount fee required for this transaction in Wei

```bash
yarn cli shares --private-key=... -op=...,...,...,... --output=./shares.json
```

**Output:** Transaction payload and path to file holding the transaction payload

## Integration in your projects

### Node Project

To run an example of a NodeJS project containing all the code snippets to build the share and transaction payload, simply follow these instructions!

```bash
cd examples/node
yarn install
```

To run a JavaScript example:

```bash
yarn start:js
```

To run a TypeScript example:

```bash
yarn start:ts
```

### Browser project (web application)

Go to the example folder and then install all the dependencies:

```bash
cd examples/browser
yarn install
```

Start the web app:

```bash
yarn start
```

Open the developer console to see how it works in a browser environment.

## Development

### Run the CLI as a TypeScript executable:

```bash
yarn dev:cli ...
```

### Run the CLI as a JavaScript compiled executable:

```bash
yarn cli ...
```

### Lint

```bash
yarn lint
```

### Testing

```bash
yarn test
```

In watch mode during development

```bash
yarn test --watchAll
```

### Building

Build TypeScript into JavaScript

```bash
yarn build
```

Build for NodeJs using `esbuild`

```bash
yarn esbuild
```

Build everything

```bash
yarn build-all
```

## TODO

* Make it possible to use a specific number of signers (Currently with a default of 4).
  Read: [From Crash to Byzantine Consensus with 2f + 1 Processes](https://www.gsd.inesc-id.pt/~mpc/pubs/bc2f+1.pdf)

## Authors

* [Dmitri Meshin](https://github.com/meshin-blox)
* [Guy Muroch](https://github.com/guym-blox)

## License

MIT License
