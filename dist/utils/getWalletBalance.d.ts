import { EnabledWallet } from "../common";
declare const getWalletBalance: (wallet: EnabledWallet | null) => Promise<number>;
export default getWalletBalance;
