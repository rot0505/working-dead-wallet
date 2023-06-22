import React, { FunctionComponent } from "react";

import { Modal } from "../../elements";
import { getSupportedWallets } from "../../utils";
import { WalletModalProps } from "./types";
import ConnectWalletWrapper from "../WalletWrapper/ConnectWalletWrapper";

const ConnectWalletModal: FunctionComponent<WalletModalProps> = ({
  style = {},
  headerStyle = {},
  isInverted = false,
  backgroundOpacity = 0.5,
  isOpen,
  onClose,
}) => {

  const supportedWallets = getSupportedWallets();

  const isAWalletInstalled = supportedWallets.find(({ isInstalled }) => {
    return isInstalled;
  });

  return (
    <Modal
      isOpen={isOpen}
      style={style}
      headerStyle={headerStyle}
      title={isAWalletInstalled ? "Connect your wallet" : "Install a wallet"}
      onClose={onClose}
      isInverted={isInverted}
      backgroundOpacity={backgroundOpacity}
    >
      <ConnectWalletWrapper activeWalletBgColor="#191B23" onClose={onClose} />
    </Modal>
  );
};

export default ConnectWalletModal;
