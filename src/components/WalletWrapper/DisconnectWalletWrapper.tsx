import React, { FunctionComponent, MouseEvent } from "react";
import styled from "styled-components";

import { Button, Typography } from "../../elements";
import { useConnectWallet } from "../../hooks";
import { WalletWrapperProps } from "./types";

const StyledWalletDiv = styled.div`
  display: flex;
  align-items: center;
  color: #e7e7e8;
  font-family: "Lexend", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: -0.02em;
`;

const DisconnectWalletWrapper: FunctionComponent<WalletWrapperProps> = ({
  disconnectButtonStyle = {},
  onClose,
}) => {
  const { wallet, disconnect } = useConnectWallet();

  const handleDisconnect = (event: MouseEvent) => {
    disconnect();
    onClose && onClose(event);
  };

  if (!wallet) {
    return null;
  }

  return (
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
  );
};

export default DisconnectWalletWrapper;
