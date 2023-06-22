import { EnabledWallet, WalletInfo } from "../../common/types";

export interface UseConnectWalletResult {
  readonly isLoading: boolean;
  readonly isConnected: boolean;
  readonly error: string | null;
  readonly wallet: EnabledWallet | null;
  readonly connect: (walletName: string) => void;
  readonly disconnect: () => void;
  readonly getAddress: (callback: (address: string) => void) => void;
  readonly getChangeAddress: (callback: (address: string) => void) => void;
  readonly getBalance: (callback: (balance: number) => void) => void;
  readonly getSupportedWallets: () => ReadonlyArray<WalletInfo>;
  readonly signTransaction: (tx: string, callback: (signedTx: string) => void) => void;
}
