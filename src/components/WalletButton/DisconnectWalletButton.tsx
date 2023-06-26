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
    <Button style={style} iconLeft={wallet.name} onClick={onClick} isSmallIcon>
      Disconnect
    </Button>
  );
};

export default DisconnectWalletButton;
