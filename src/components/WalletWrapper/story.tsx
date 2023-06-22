import React from "react";
import styled from "styled-components";

import WalletWrapperComponent from "./index";

const StyledWrapper = styled.div`
  background: #0C0E14;
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default {
  title: "WalletWrapper",
  component: WalletWrapperComponent,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const WalletWrapper: React.FC = () => {

  return (
    <StyledWrapper>
      <WalletWrapperComponent />
    </StyledWrapper>
  );
};