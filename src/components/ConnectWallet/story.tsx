import React from "react";

import ConnectWalletComponent from "./index";

export default {
  title: "ConnectWallet",
  component: ConnectWalletComponent,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const ConnectWallet: React.FC = () => <ConnectWalletComponent />;