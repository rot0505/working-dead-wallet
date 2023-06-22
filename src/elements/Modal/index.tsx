import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { Typography } from "../../elements";
import { ModalProps } from "./types";

const StyledModalWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s ease-out;
`;

const StyledModal = styled.div`
  width: 318px;
  box-sizing: border-box;
  padding: 24px;
  background: #12141B;
  border: 1px solid #1F2129;
  backdrop-filter: blur(19.5px);
  border-radius: 12px;
  position: absolute;
  top: 90px;
  right: 70px;
`;

const StyledHeader = styled.div`
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled(Typography)`
  font-family: 'Lexend', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  color: #E7E7E8;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
`

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  children,
  title,
  onClose,
  isInverted,
  style = {},
  headerStyle = {},
  ...rest
}) => {

  if (!isOpen) {
    return null;
  }

  return (
    <StyledModalWrapper
      onClick={onClose}
      {...rest}
    >
      <StyledModal
        onClick={(e) => e.stopPropagation()}
      >
        <StyledHeader style={headerStyle}>
          <StyledTitle>{title}</StyledTitle>
        </StyledHeader>

        <StyledBody>
          {children}
        </StyledBody>
      </StyledModal>
    </StyledModalWrapper>
  );
};

export default Modal;
