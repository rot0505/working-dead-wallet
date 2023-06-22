import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { useConnectWallet } from "../../hooks";
import ConnectWalletButton from "./ConnectWalletButton";
import DisconnectWalletButton from "./DisconnectWalletButton";
import { WalletButtonProps } from "./types";

const StyledWrapper = styled.div`
  position: absolute;
  top: 42px;
  right: 70px;
  z-index: 9999;
`

const WalletButton: FunctionComponent<WalletButtonProps> = ({
  style,
  ...rest
}) => {
  const { wallet } = useConnectWallet();

  const buttonStyle = {
    ...style,
  };

  return <StyledWrapper>
    {!!wallet ?
      <DisconnectWalletButton style={buttonStyle} {...rest} />
      :
      <ConnectWalletButton style={buttonStyle} {...rest} />
    }
  </StyledWrapper>
};

export default WalletButton;
