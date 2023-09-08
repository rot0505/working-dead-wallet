export enum SupportedWallet {
  metamask = "metamask",
  coinbase = "coinbase",
  eternl = "eternl",
  flint = "flint",
  nami = "nami"
}

export const SupportedWalletName = {
  metamask: "Metamask",
  coinbasse: "Coinbase",
  eternl: "Eternl",
  flint: "Flint",
  nami: "Nami"
}

export enum SupportedChain {
  ethereum = "ethereum",
  cardano = "cardano"
}

export interface WalletInfo {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly extensionUrl: string;
  readonly websiteUrl: string;
  readonly isInstalled?: boolean;
  readonly chain: SupportedChain;
}

export interface UnenabledWallet {
  readonly apiVersion: string;
  readonly name: string;
  readonly enable: () => Promise<EnabledWalletApi>;
  readonly experimental: {
    readonly appVersion: {
      readonly major: number;
      readonly minor: number;
      readonly patch: number;
    };
  };
  readonly enableLogs: (enable: boolean) => any;
  readonly icon: string;
  readonly isEnabled: () => Promise<boolean>;
}

export interface EnabledWalletApi {
  readonly experimental: {
    readonly appVersion: {
      readonly major: number;
      readonly minor: number;
      readonly patch: number;
    };
    readonly getCollateral: () => Promise<any>;
    readonly getLockedUtxos: () => Promise<any>;
    readonly syncAccount: () => Promise<any>;
  };
  readonly getBalance: () => Promise<any>;
  readonly getChangeAddress: () => Promise<any>;
  readonly getCollateral: () => Promise<any>;
  readonly getNetworkId: () => Promise<any>;
  readonly getRewardAddresses: () => Promise<any>;
  readonly getUnusedAddresses: () => Promise<any>;
  readonly getUsedAddresses: (paginate?: boolean) => Promise<any>;
  readonly getUtxos: (amount?: string, paginate?: boolean) => Promise<any>;
  readonly signData: (addr: string, sigStructure: string) => Promise<any>;
  readonly signTx: (tx: string, partialSign?: boolean, createDebugTx?: boolean) => Promise<any>;
  readonly submitTx: (tx: string) => Promise<any>;
}

interface Metamask {
  icon: string,
  name: string,
  isEVM: boolean
}

type FullWalletAPI = UnenabledWallet & EnabledWalletApi & Metamask;
export interface EnabledWallet extends FullWalletAPI {
  readonly id: string;
}

export enum NetworkMode {
  mainNet = 1,
  testNet = 0,
}

export interface SVGProps {
  readonly height?: number;
  readonly width?: number;
  readonly fill?: string;
  readonly stroke?: string;
}

export enum APIErrorMessage {
  manualDisconnect = "The request was refused due to lack of access - e.g. wallet disconnects.",
}