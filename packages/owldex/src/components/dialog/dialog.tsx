import React, { ReactNode } from "react";
import styles from "./dialog.module.css";

interface DialogProps {
  label: string;
  children: ReactNode;
}

export const Dialog: React.FunctionComponent<DialogProps> = ({
  label,
  children
}) => (
  <div className={styles.warning}>
    <h4 className={styles.label}>{label}</h4>
    <div>{children}</div>
  </div>
);
