import React, { MouseEvent, useState, FunctionComponent } from "react";

import WalletModal from "../../components/WalletModal";
import WalletButton from "../../components/WalletButton";
import { ConnectWalletProps } from "./types";
import { useConnectWallet } from "../../hooks";

const ConnectWallet: FunctionComponent<ConnectWalletProps> = ({
  onClickButton,
  onCloseModal,
  onConnect,
  onError,
  mainButtonStyle = {},
  modalStyle = {},
  modalHeaderStyle = {},
  disconnectButtonStyle = {},
  fontFamily = "",
  isInverted = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { wallet, disconnect } = useConnectWallet();

  const handleButtonClick = (event: MouseEvent) => {
    if (onClickButton) {
      onClickButton(event);
    } else {
      if (!!wallet) {
        disconnect();
      } else {
        setIsModalOpen(true);
      }
    }
  };

  const handleCloseModal = (event: MouseEvent) => {
    if (onCloseModal) {
      onCloseModal(event);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <WalletModal
        isOpen={isModalOpen}
        style={modalStyle}
        isInverted={isInverted}
        headerStyle={modalHeaderStyle}
        disconnectButtonStyle={disconnectButtonStyle}
        fontFamily={fontFamily}
        onConnect={onConnect}
        onError={onError}
        onClose={handleCloseModal}
      />

      <WalletButton style={mainButtonStyle} onClick={handleButtonClick} />
    </>
  );
};

export default ConnectWallet;
