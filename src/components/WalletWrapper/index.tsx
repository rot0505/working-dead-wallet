import React, { useEffect, FunctionComponent } from "react";
import styled from "styled-components";

import { useConnectWallet } from "../../hooks";
import { WalletWrapperProps } from "./types";
import ConnectWalletWrapper from "./ConnectWalletWrapper";
import DisconnectWalletWrapper from "./DisconnectWalletWrapper";
import { usePrevious } from "../../common";

const StyledWrapper = styled.div`
  width: 320px;
`;

const WalletWrapper: FunctionComponent<WalletWrapperProps> = ({
  style,
  onConnect,
  onError,
  fontFamily,
  activeWalletBgColor = "#12141B",
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

  return <StyledWrapper>
    {wallet ? (
      <DisconnectWalletWrapper style={modalStyle}  {...rest} />
    ) : (
      <ConnectWalletWrapper style={modalStyle} activeWalletBgColor={activeWalletBgColor} {...rest} />
    )}
  </StyledWrapper>
};

export default WalletWrapper;
