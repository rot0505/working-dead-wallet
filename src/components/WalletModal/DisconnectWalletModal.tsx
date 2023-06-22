import React, { FunctionComponent, MouseEvent } from "react";
import styled from "styled-components";

import { Button, Modal, Typography } from "../../elements";
import { useConnectWallet } from "../../hooks";
import { WalletModalProps } from "./types";

const StyledWalletDiv = styled.div`
  display: flex;
  align-items: center;
  color: #E7E7E8;
  font-family: 'Lexend', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: -0.02em;
`;

const DisconnectWalletModal: FunctionComponent<WalletModalProps> = ({
  isOpen,
  style = {},
  headerStyle = {},
  disconnectButtonStyle = {},
  isInverted = false,
  backgroundOpacity = 0.5,
  onClose,
}) => {
  const { wallet, disconnect } = useConnectWallet();

  const handleDisconnect = (event: MouseEvent) => {
    disconnect();
    onClose(event);
  };

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
      <StyledWalletDiv>
        <Typography>Connected with {wallet.name}.</Typography>

        <Button
          onClick={handleDisconnect}
          style={{
            marginLeft: "0.5rem",
            justifyContent: "center",
            ...disconnectButtonStyle,
          }}
        >
          Disconnect
        </Button>
      </StyledWalletDiv>
    </Modal>
  );
};

export default DisconnectWalletModal;
