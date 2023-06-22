import { browserName } from "react-device-detect";

import { WalletInfo, SupportedWallet } from "../common";

const supportedWallets: ReadonlyArray<WalletInfo> = [
  {
    id: SupportedWallet.nami,
    name: "Nami",
    icon: "Nami",
    extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    websiteUrl: "https://namiwallet.io/",
  },
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
    icon: "Eternl",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    websiteUrl: "https://eternl.io/",
  },
  {
    id: SupportedWallet.flint,
    name: "Flint",
    icon: "Flint",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    websiteUrl: "https://flint-wallet.com/",
  }
];

const getSupportedWallets = (): ReadonlyArray<WalletInfo> => {
  if (!["Chrome", "Brave"].includes(browserName)) {
    return [];
  }

  const installedWallets: Array<WalletInfo> = [];
  const uninstalledWallets: Array<WalletInfo> = [];

  supportedWallets.forEach((wallet) => {
    if (window.cardano && window.cardano[wallet.id]) {
      installedWallets.push({
        ...wallet,
        ...window.cardano[wallet.id],
        isInstalled: true,
      });
    } else {
      uninstalledWallets.push({
        ...wallet,
        isInstalled: false,
      });
    }
  });

  return [...installedWallets, ...uninstalledWallets];
};

export default getSupportedWallets;
