import '@ethersproject/shims';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';

import { DAPP_CONTRACT } from "@env"

// To do for contract compile
// 1. `yarn compile-contracts` WILL COMPILE ANY BASIC CONTRACTS
// 2. Change import to the new artifacts/abi.json

// or just use vscode solidity extension to compile (Need to do if import like @openzepplin in contracts):
// https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity
// import * as ContractABI from './bin/contracts/FitMint.json'

// 3. Deploy the contract
// 4. Use ABI + Contract Deploy address to Interface
// const DAPP_CONTRACT = "Test"

// Note: ankr rpc was hacked so def want to change this
global.Buffer = global.Buffer || Buffer;
const EthproviderUrl = 'https://rpc.ankr.com/eth_goerli'; // Or your desired provider url

// Other Useful RPC Functions 
const getChainId = async () => {
  try {
    const ethersProvider = ethers.getDefaultProvider(EthproviderUrl);
    const networkDetails = await ethersProvider.getNetwork();
    return networkDetails;
  } catch (error) {
    return error;
  }
};


const getAccounts = async key => {
  try {
    const wallet = new ethers.Wallet(key);
    const address = wallet.address;
    return address;
  } catch (error) {
    return error;
  }
};

const getBalance = async key => {
  try {
    let cleanKey = key.replace(/["]/g, "");
    const ethersProvider = ethers.getDefaultProvider(EthproviderUrl);
    const wallet = new ethers.Wallet(cleanKey, ethersProvider);
    const balance = await wallet.getBalance();
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  } catch (error) {
    return error;
  }
};

const sendTransaction = async (key, destination, maxPriorityFeePerGas, maxFeePerGas) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(EthproviderUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);

    // Convert 1 ether to wei
    const amount = ethers.utils.parseEther('0.001');

    // Submit transaction to the blockchain
    const tx = await wallet.sendTransaction({
      to: destination,
      value: amount,
      maxPriorityFeePerGas: maxPriorityFeePerGas ? maxPriorityFeePerGas : '5000000000', // Max priority fee per gas
      maxFeePerGas: maxFeePerGas ? maxFeePerGas : '6000000000000', // Max fee per gas
    });
    return tx;
  } catch (error) {
    return error;
  }
};

const signMessage = async (key, message) => {
  try {
    const ethersProvider = ethers.getDefaultProvider(EthproviderUrl);
    const wallet = new ethers.Wallet(key, ethersProvider);
    const originalMessage = message;
    // Sign the message
    const signedMessage = await wallet.signMessage(originalMessage);
    return signedMessage;
  } catch (error) {
    return error;
  }
};

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
};