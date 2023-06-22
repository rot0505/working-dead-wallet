import { EnabledWallet } from "../../common";
import { CSSProperties, MouseEvent } from "react";
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
