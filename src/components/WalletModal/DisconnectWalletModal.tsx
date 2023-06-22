import React, { FunctionComponent } from "react";

import { Modal } from "../../elements";
import { useConnectWallet } from "../../hooks";
import { WalletModalProps } from "./types";
import DisconnectWalletWrapper from "../WalletWrapper/DisconnectWalletWrapper";

const DisconnectWalletModal: FunctionComponent<WalletModalProps> = ({
  isOpen,
  style = {},
  headerStyle = {},
  isInverted = false,
  backgroundOpacity = 0.5,
  onClose,
}) => {
  const { wallet } = useConnectWallet();

  if (!wallet) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      style={style}
      headerStyle={headerStyle}
      title={wallet.name}
      isInverted={isInverted}
      backgroundOpacity={backgroundOpacity}
      onClose={onClose}
    >
      <DisconnectWalletWrapper onClose={onClose} />
    </Modal>
  );
};

export default DisconnectWalletModal;
