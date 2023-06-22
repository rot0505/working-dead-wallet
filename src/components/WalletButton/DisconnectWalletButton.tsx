import React, { FunctionComponent } from "react";

import { Button } from "../../elements";
import { useConnectWallet } from "../../hooks";
import { DisconnectWalletButtonProps } from "./types";

const DisconnectWalletButton: FunctionComponent<DisconnectWalletButtonProps> = ({
  style,
  onClick,
}) => {
  const { wallet } = useConnectWallet();

  if (!wallet) return null;

  return (
    <Button style={style} iconLeft={wallet.icon} onClick={onClick} isSmallIcon>
      Connected
    </Button>
  );
};

export default DisconnectWalletButton;
