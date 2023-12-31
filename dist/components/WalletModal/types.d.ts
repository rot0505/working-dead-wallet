import { CSSProperties, MouseEvent } from "react";
import { EnabledWallet } from "../../common";
export interface WalletModalProps {
    readonly isOpen: boolean;
    readonly onClose: (event: MouseEvent) => void;
    readonly style?: CSSProperties;
    readonly headerStyle?: CSSProperties;
    readonly disconnectButtonStyle?: CSSProperties;
    readonly fontFamily?: string;
    readonly isInverted?: boolean;
    readonly backgroundOpacity?: number;
    readonly onConnect?: (wallet: EnabledWallet) => void;
    readonly onError?: (message: string) => void;
}
export type ConnectWalletModalProps = Omit<WalletModalProps, "fontFamily" | "onConnect">;
export type DisconnectWalletModalProps = Omit<WalletModalProps, "fontFamily" | "onConnect">;
