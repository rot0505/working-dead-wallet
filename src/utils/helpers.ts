import { bech32 } from "bech32";
import { Buffer } from "buffer";

import { NetworkMode, SupportedWalletName } from "../common";

export const addressFromHex = (hex: string) => {
  const networkId = hex[1] === "0" ? NetworkMode.testNet : NetworkMode.mainNet;
  const prefix = networkId === NetworkMode.testNet ? "addr_test" : "addr";

  const bytes = fromHex(hex);
  const words = bech32.toWords(bytes);

  return bech32.encode(prefix, words, 1000);
};

export const fromHex = (hex: string): Buffer => {
  return Buffer.from(hex, "hex");
};

export const formatWalletName = (walletName: string) => {
  const originName: string = walletName.split(" ")[0].toLowerCase();
  const formatedName: string = SupportedWalletName[originName as keyof typeof SupportedWalletName];
  return formatedName;
}