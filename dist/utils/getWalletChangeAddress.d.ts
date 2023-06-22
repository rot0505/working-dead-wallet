import { EnabledWallet } from "../common";
declare const getWalletChangeAddress: (wallet: EnabledWallet | null) => Promise<string>;
export default getWalletChangeAddress;
