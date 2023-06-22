import { EnabledWallet } from "../common";
declare const getWalletAddress: (wallet: EnabledWallet | null) => Promise<string>;
export default getWalletAddress;
