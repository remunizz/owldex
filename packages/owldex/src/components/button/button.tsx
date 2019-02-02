import React, { ReactNode, FunctionComponent } from "react";

import styles from "./button.module.css";

interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  children
}) => (
  <button onClick={onClick} className={styles.btn}>
    {children}
  </button>
);
