# Crypto Candy

Crypto Candy is an example of a full-stack dapp built on Flow blockchain using Svelte.

This project aims to introduce core concepts of Flow blockchain development and demonstrate how to use [Flow Client Library (FCL)](https://github.com/onflow/fcl-js) to build a decentralized app.

In this project, we will go through

- Authentication using Flow wallet.
- Use Cadence scripts to read data from the blockchain.
- Use Cadence transactions to write data to the blockchain.

## Prerequisites

- [Flow CLI](https://docs.onflow.org/flow-cli/)

## Getting started

1. Clone the project

```
https://github.com/amitkothari/crypto-candy.git
```

2. Install dependencies

```
npm run install
```

3. Run the app

```
npm run start
```

## Testing

1. Run unit tests

```
npm run test
```

These tests are implemented using [jest](https://github.com/facebook/jest) and [svelte-testing-library](https://github.com/testing-library/svelte-testing-library).

2. Run contract tests

```
npm run test:contract
```

Cadence scripts and transactions are tested using [flow-js-testing](https://github.com/onflow/flow-js-testing) library.

3. Run end to end tests

```
npm run crypress:e2e
```

The app uses [cypress](https://github.com/cypress-io/cypress) for end-to-end tests.

## Project structure

Flow smart contracts are implemented using [Cadence](https://docs.onflow.org/cadence/) which is a resource-oriented programming language.

Our contract, scripts, and transactions are under the `cadence` folder.

In our `CandyContract.cdc`, `Candy` and `Variety` are defined as cadence resources. Contract admin can add candy varieties and users can mint candies and store their collection on the blockchain.

Application's web frontend is implemented using [svelte](https://github.com/sveltejs/svelte), [tailwind](https://github.com/tailwindlabs/tailwindcss) ,and [webpack](https://github.com/webpack/webpack).

## Deployment

For local development, we can deploy our contract to the Flow emulator by running the following command -

```
flow project deploy --network emulator
```

To deploy a contract to Flow Testnet, we first need a testnet account.

1.  Generate a key pair

```
flow keys generate
```

2. Create and fund an account on testnet

Go to [Flow Testnet Faucet](https://testnet-faucet.onflow.org) and create a new account using the public key generated in the previous step.

3. Run the following command to deploy our contract

```
flow project deploy --network testnet
```

## Create candy variety

New candy varieties can be created by using Flow transactions.

We can use Flow CLI to

- Build a transaction.
- Sign the transaction with each account specified in the build step.
- Submit the signed transaction to the Flow network.

For example, to create a new candy `Lemon candy` with price `12.00` FUSD.

Run the following commands

```
flow transactions build ./cadence/transactions/CreateVariety.cdc "Lemon candy" "12.00" --authorizer testnet-account --proposer testnet-account --payer testnet-account -n Testnet--filter payload --save built.rlp
```

```
flow transactions sign ./built.rlp --signer testnet-account -n Testnet--filter payload --save signed.rlp -y
```

```
flow transactions send-signed ./signed.rlp -n testnet
```

Please refer to the [docs](https://docs.onflow.org/flow-cli/build-transactions/) for more details.

## Acknowledgement

This project is heavy inspired by [crypto dappy](https://github.com/bebner/crypto-dappy).
