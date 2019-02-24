import React, { ReactNode, FunctionComponent } from "react";
import classnames from "classnames/bind";

import styles from "./button.module.css";
const cx = classnames.bind(styles);

interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
  disabled?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  disabled
}) => (
  <button
    onClick={onClick}
    className={cx("btn", {
      "btn--disabled": disabled,
      "btn--regular": !disabled
    })}
  >
    {children}
  </button>
);
