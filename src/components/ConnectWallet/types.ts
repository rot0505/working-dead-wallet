import { CSSProperties, MouseEvent } from "react";
import { EnabledWallet } from "../../common";

export interface ConnectWalletProps {
  readonly modalStyle?: CSSProperties;
  readonly modalHeaderStyle?: CSSProperties;
  readonly mainButtonStyle?: CSSProperties;
  readonly disconnectButtonStyle?: CSSProperties;
  readonly fontFamily?: string;
  readonly isInverted?: boolean;
  readonly onClickButton?: (event: MouseEvent) => void;
  readonly onCloseModal?: (event: MouseEvent) => void;
  readonly onConnect?: (wallet: EnabledWallet) => void;
  readonly onError?: (message: string) => void;
}
