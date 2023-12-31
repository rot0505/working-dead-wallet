import React, { ComponentPropsWithoutRef, FunctionComponent } from "react";
import styled from "styled-components";

import { logos } from "../../assets";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  readonly iconLeft?: string;
  readonly iconRight?: string;
  readonly isFullWidth?: boolean;
  readonly isInverted?: boolean;
  readonly isSmallIcon?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  background-color: #e7e7e8;
  border-width: 0;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 16px;
  gap: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  color: #0c0e14;
  font-family: "Inter", sans-serif;

  &:hover {
    background-color: ${(props) => (props.isInverted ? "#111" : "#FFF")};
  }
`;
const Button: FunctionComponent<ButtonProps> = ({
  iconLeft,
  iconRight,
  isFullWidth = false,
  children,
  style,
  isSmallIcon,
  ...rest
}) => {
  const Icon = logos[iconLeft as keyof typeof logos] || logos.Nami;
  return (
    <StyledButton
      style={{
        width: isFullWidth ? "100%" : undefined,
        ...style,
      }}
      {...rest}
    >
      {!!iconLeft && (isSmallIcon ? <Icon width={20} height={20} /> : <Icon />)}

      {children}

      {!!iconRight && (
        <img
          src={`${iconRight}`}
          style={
            isSmallIcon
              ? {
                marginRight: "12px",
                width: 20,
                height: 20,
              }
              : {
                marginRight: "12px",
                width: 32,
                height: 32,
              }
          }
        />
      )}
    </StyledButton>
  );
};

export default Button;
