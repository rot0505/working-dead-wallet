import { EnabledWallet, EnabledWalletApi, SupportedWallet, asyncTimeout, storageKey } from "../common";
import { formatWalletName } from "./helpers";

const enableWallet = async (name?: string): Promise<EnabledWallet> => {
  if (!(window.cardano || (window as any).ethereum)) {
    throw new Error(
      `No wallet extensions have been installed. Please install a wallet
      extension and refresh the page.`,
    );
  }

  const walletName = name || localStorage?.getItem(storageKey);

  if (!walletName) {
    throw new Error("Wallet name must be passed as an argument or have been connected previously.");
  }

  let enabledWallet;

  if (walletName === SupportedWallet.metamask) {
    const ethereum = (window as any).ethereum;
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
      enabledWallet = {
        name: "Metamask",
        isEVM: true,
      }
    } catch (e) {
      enabledWallet = null
    }
  } else {
    const selectedWallet = window.cardano?.[walletName];
    if (!selectedWallet) {
      throw new Error(
        `Wallet not found. Please ensure the wallet extension has been
        installed. If it was recently installed, you may need to refresh 
        the page and try again.`,
      );
    }

    const enabledWalletAPI = await asyncTimeout<EnabledWalletApi>(
      selectedWallet.enable,
      "Enabling wallet timed out after 10 seconds",
      10000,
    );

    enabledWallet = {
      ...selectedWallet,
      ...enabledWalletAPI,
      name: formatWalletName(selectedWallet.name)
    };
  }

  window.localStorage?.setItem(storageKey, walletName);
  return enabledWallet;
};

export default enableWallet;
