import React, { useState } from "react";

import WalletModalComponent from "./index";

export default {
  title: "WalletModal",
  component: WalletModalComponent,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const WalletModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>My custom button</button>

      <WalletModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};