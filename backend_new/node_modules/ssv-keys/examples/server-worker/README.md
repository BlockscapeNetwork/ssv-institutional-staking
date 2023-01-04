# SSV-Keys Worker

This example is useful for those who want to generate many keys
in parallel without waiting and blocking the flow.

ExpressJs as tiny server is able to provide impressive speed and concurrency
while using ssv-keys SDK to generate shares.

## Building

In docker:

```bash
cd examples/server-worker
./scripts/docker.sh
```

Or running it locally:

```bash
cd examples/server-worker
yarn install
yarn dev
```

While building, it compiles all the TypeScript sources into vanilla JavaScript
to provide the best execution speed it can.

Default port which server runs on is `3000`.
Edit `.env` file to change it.

Also, this port is mapped in docker container so that you could make requests to it.

## Querying

In order to send request and receive key shares in response,
you need to make `POST` request with `json` body like in example:

```http request
POST http://localhost:3000/key-shares/generate
{
    "operator_ids": [1, 2, 3, 4],
    "operator_keys": [
        "LS0t...LS0K",
        "LS0t...LS0K",
        "LS0t...LS0K",
        "LS0t...LS0K",
    ],
    "keystore": {
        ...
        "pubkey": "a063fa1434f4ae9bb63488cd79e2f76dea59e0e2d6cdec7236c2bb49ffb37da37cb7966be74eca5a171f659fee7bc501",
        "version": 4
    },
    "password": "testtest"
}
```

You should be already familiar with response, it will be `json` with key shares file contents.
