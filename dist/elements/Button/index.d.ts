import { ComponentPropsWithoutRef, FunctionComponent } from "react";
export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    readonly iconLeft?: string;
    readonly iconRight?: string;
    readonly isFullWidth?: boolean;
    readonly isInverted?: boolean;
    readonly isSmallIcon?: boolean;
}
declare const Button: FunctionComponent<ButtonProps>;
export default Button;
