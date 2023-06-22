import { SupportedWallet, UnenabledWallet } from "hooks";

declare global {
  interface Window {
    readonly cardano?: Record<SupportedWallet, UnenabledWallet>;
  }
}
