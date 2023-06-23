import React, { MouseEvent, FunctionComponent } from "react";
import styled from "styled-components";

import { Button, Typography } from "../../elements";
import { ButtonProps } from "../../elements/Button";
import { useConnectWallet } from "../../hooks";
import { getSupportedWallets } from "../../utils";
import { icons } from "../../assets";
import { SupportedChain, WalletInfo } from "../../common";
import { WalletWrapperProps } from "./types";

interface StyledButtonProps extends ButtonProps {
  activeWalletBgColor?: string
}

const StyledButton = styled(Button) <StyledButtonProps>`
  height: 64px;
  border-radius: 8px;
  background: transparent;
  color: #626676;
  font-family: 'Lexend', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: -0.02em;

  &:hover {
    background: ${({ activeWalletBgColor }) => activeWalletBgColor};
    color: #E7E7E8;
  }
`;

const StyledNotInstalledWallet = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  opacity: 0.5;
  font-size: 14px;
`

const ConnectWalletWrapper: FunctionComponent<WalletWrapperProps> = ({
  activeWalletBgColor,
  onClose,
}) => {
  const { connect } = useConnectWallet();

  const supportedWallets = getSupportedWallets();

  const isAWalletInstalled = supportedWallets.find(({ isInstalled }) => {
    return isInstalled;
  });

  const handleSelectWallet = (event: MouseEvent) => (wallet: WalletInfo) => {
    if (wallet.isInstalled) {
      connect(wallet.id);
    } else {
      window.open(wallet.extensionUrl, "_blank", "noreferrer");
    }
    onClose && onClose(event);
  };

  return (
    <>
      {supportedWallets.length === 0 ? (
        <Typography isInverted style={{ textAlign: "center" }}>
          Cardano wallet extensions are currently only supported in Chrome and Brave browsers.
        </Typography>
      ) : (
        supportedWallets.map((wallet) => {
          return (
            <div key={wallet.id}>
              <StyledButton
                iconLeft={wallet.icon}
                onClick={(event) => handleSelectWallet(event)(wallet)}
                isFullWidth
                activeWalletBgColor={activeWalletBgColor}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%"
                }}
                >
                  {wallet.name}
                  {!wallet.isInstalled && isAWalletInstalled && (
                    <StyledNotInstalledWallet>
                      <Typography>Not installed</Typography>
                      <icons.ExternalLink
                        width={18}
                        height={18}
                        stroke="#626676"
                      />
                    </StyledNotInstalledWallet>
                  )}
                </div>
              </StyledButton>
            </div>
          );
        })
      )}
    </>
  );
};

export default ConnectWalletWrapper;
