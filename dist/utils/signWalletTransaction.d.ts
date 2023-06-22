import { EnabledWallet } from "../common";
declare const signWalletTransaction: (wallet: EnabledWallet | null, tx: string) => Promise<string>;
export default signWalletTransaction;
