import Web3 from "web3";
import { EnabledWallet } from "../common";
import { addressFromHex } from "../utils/helpers";

const getWalletAddress = async (wallet: EnabledWallet | null): Promise<string> => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  let addresses;

  if (wallet.isEVM) {
    const provider = (window as any).web3.currentProvider;
    const web3 = new Web3(provider);
    addresses = await web3.eth.getAccounts();
  } else {
    addresses = await wallet.getUsedAddresses();
  }

  const address = addresses[0];

  if (!address) {
    throw new Error("Unable to fetch wallet address");
  }

  return wallet.isEVM ? address : addressFromHex(address);
};

export default getWalletAddress;
