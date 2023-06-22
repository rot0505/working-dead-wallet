import { CSSProperties, MouseEvent } from "react";

import { EnabledWallet } from "../../common";

export interface WalletWrapperProps {
  readonly style?: CSSProperties;
  readonly headerStyle?: CSSProperties;
  readonly disconnectButtonStyle?: CSSProperties;
  readonly fontFamily?: string;
  readonly isInverted?: boolean;
  readonly activeWalletBgColor?: string;
  readonly onClose?: (event: MouseEvent) => void;
  readonly onConnect?: (wallet: EnabledWallet) => void;
  readonly onError?: (message: string) => void;
}

export type ConnectWalletWrapperProps = Omit<WalletWrapperProps, "fontFamily" | "onConnect">;

export type DisconnectWalletWrapperProps = Omit<WalletWrapperProps, "fontFamily" | "onConnect">;
