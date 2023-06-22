import { CSSProperties, MouseEvent } from "react";

export interface WalletButtonProps {
  readonly style?: CSSProperties;
  readonly fontFamily?: string;
  readonly isInverted?: boolean;
  readonly onClick?: (event: MouseEvent) => void;
}

export type ConnectWalletButtonProps = Omit<WalletButtonProps, "isInverted" | "fontFamily">;

export type DisconnectWalletButtonProps = Omit<WalletButtonProps, "isInverted" | "fontFamily">;
