import { browserName } from "react-device-detect";

import { WalletInfo, SupportedWallet, SupportedChain } from "../common";

const supportedWallets: ReadonlyArray<WalletInfo> = [
  {
    id: SupportedWallet.metamask,
    name: "Metamask",
    icon: "Metamask",
    extensionUrl: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    websiteUrl: "https://metamask.io/",
    chain: SupportedChain.ethereum
  },
  {
    id: SupportedWallet.nami,
    name: "Nami",
    icon: "Nami",
    extensionUrl: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    websiteUrl: "https://namiwallet.io/",
    chain: SupportedChain.cardano
  },
  {
    id: SupportedWallet.eternl,
    name: "Eternl",
    icon: "Eternl",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    websiteUrl: "https://eternl.io/",
    chain: SupportedChain.cardano
  },
  {
    id: SupportedWallet.flint,
    name: "Flint",
    icon: "Flint",
    extensionUrl:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    websiteUrl: "https://flint-wallet.com/",
    chain: SupportedChain.cardano
  }
];

const getSupportedWallets = (): ReadonlyArray<WalletInfo> => {
  if (!["Chrome", "Brave"].includes(browserName)) {
    return [];
  }

  const installedWallets: Array<WalletInfo> = [];
  const uninstalledWallets: Array<WalletInfo> = [];

  supportedWallets.forEach((wallet) => {
    if (wallet.chain === SupportedChain.ethereum) {
      if ((window as any).ethereum) {
        installedWallets.push({
          ...wallet,
          isInstalled: true
        })
      } else {
        uninstalledWallets.push({
          ...wallet,
          isInstalled: false
        })
      }
    } else if (wallet.chain === SupportedChain.cardano) {
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
    }
  });

  return [...installedWallets, ...uninstalledWallets];
};

export default getSupportedWallets;
