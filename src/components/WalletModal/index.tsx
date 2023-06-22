import React, { useEffect, FunctionComponent } from "react";

import { useConnectWallet } from "../../hooks";
import { WalletModalProps } from "./types";
import ConnectWalletModal from "./ConnectWalletModal";
import DisconnectWalletModal from "./DisconnectWalletModal";
import { usePrevious } from "../../common";

const WalletModal: FunctionComponent<WalletModalProps> = ({
  style,
  onConnect,
  onError,
  fontFamily,
  ...rest
}) => {
  const { wallet, isConnected, error } = useConnectWallet();
  const prevIsConnected = usePrevious(isConnected);

  const modalStyle = { fontFamily, ...style };

  useEffect(() => {
    if (onConnect && wallet && !prevIsConnected && isConnected) {
      onConnect(wallet);
    }
  }, [isConnected, wallet, prevIsConnected]);

  useEffect(() => {
    if (onError && error) {
      onError(error);
    }
  }, [error]);

  return wallet ? (
    <DisconnectWalletModal style={modalStyle} {...rest} />
  ) : (
    <ConnectWalletModal style={modalStyle} {...rest} />
  );
};

export default WalletModal;
