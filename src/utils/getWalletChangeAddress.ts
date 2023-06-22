import { EnabledWallet } from "../common";
import { addressFromHex } from "../utils/helpers";

const getWalletChangeAddress = async (wallet: EnabledWallet | null): Promise<string> => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const addresses = await wallet.getChangeAddress();
  const address = Array.isArray(addresses) ? addresses[0] : addresses;

  if (!address) {
    throw new Error("Unable to fetch wallet address");
  }

  return addressFromHex(address);
};

export default getWalletChangeAddress;
