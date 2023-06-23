import { decode } from "cbor-web";
import Web3 from "web3";
import BigNumber from "bignumber.js"

import { EnabledWallet } from "../common";
import getWalletAddress from "./getWalletAddress";

const getWalletBalance = async (wallet: EnabledWallet | null): Promise<number> => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }
  if (wallet.isEVM) {
    const provider = (window as any).web3.currentProvider;
    const web3 = new Web3(provider);
    const address = await getWalletAddress(wallet);
    const balanceOf = await web3.eth.getBalance(address);
    const balance = BigNumber(balanceOf).div(10 ** 18);
    return Number(balance.toString());
  } else {
    const balanceHex = await wallet.getBalance();

    const decoded = decode(balanceHex);
    const lovelaces = Array.isArray(decoded) ? decoded[0] : decoded;

    return lovelaces / 1000000;
  }
};

export default getWalletBalance;
