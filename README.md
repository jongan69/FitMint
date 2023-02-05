# FitMint

### Unimplemented AI Workout + API
[AI Workout](https://gen-iworkout.vercel.app/)

[![CodeQL](https://github.com/jongan69/FitMint/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jongan69/FitMint/actions/workflows/codeql-analysis.yml)

[![Build and lint](https://github.com/jongan69/FitMint/actions/workflows/validate.yml/badge.svg)](https://github.com/jongan69/FitMint/actions/workflows/validate.yml)

- React Native
- Solidity Contract ABI usage
- `api` directory w/ Nextjs thirdwebjs sdk
- Web3 Auth SDK
- Nhost SDK

Includes demo solidity contracts with a `compile-contracts` command in `package.json`

Built under The FVM ETH Global Hackathon

------

## Demo

[LATEST APP v1.00 (Expo)](https://expo.dev/@jongan69/FitMint?serviceType=classic&distribution=expo-go)

[LATEST CONTRACT X.XX (FVM Wallabey Network)]

------

### Setup

1. Create Web3Auth.io Account at <https://dashboard.web3auth.io/>
2. Copy into credentials .env and constant.js

   Note: `WEB_API_ROUTES` would be the URL of the deployed nextjs app

   ie: vercel

3. yarn install inside the root and web directories

   Note: There is now an included `continue as guest` button

***For smart contract functionality***

1. Compile + Deploy your contract

   Note: `compile-contracts` does not deploy

2. Import `abi` into `etherRPC.js` and interface with corresponding contract functions
3. Import the functions where ever needed throughout app

------

### Usage

`yarn ios` - Run iOS App

`yarn android` - Run Android App

`yarn web` - Start Nextjs app

`yarn compile-contracts` - Compile the Contract in `./contracts/` for abi, may need to edit `package.json`

For NHOST Database/Auth:
in `.env` -> backendUrl: "YOUR_NHOST_BACKEND_URL"

To Run Nextjs App:
  `yarn web` in root directory

------

### To do

[Chaining Contract Calls](https://blog.chain.link/smart-contract-call-another-smart-contract/)

React Native Work:

- [x] Expo React Native App
- [x] Web3Auth - React Native SDK
- [x] Add Redux store
- [x] Switched Context with Redux Store
- [x] Create all redux slices w/ actions
- [x] Replace Reducer Functions with Secure Store Functions
- [x] Create 7 Minute Workout app in React Native
- [->] Connect Mobile UI to Smart Contract Minting and Getting Functions
- [->] Create Feed for all failed and minted workouts

Solidity Smart Contract Work:

- [->] Build corresponding contract for Minting NFTs
- [->] Deploy contract to FVM

API Work:

- [->] Allow user into discord if NFT was minted w/ Discord user
