import React from "react";
import styles from "./dialog.module.css";

interface DialogProps {
  label: string;
  text: string;
}

export const Dialog: React.FunctionComponent<DialogProps> = ({
  label,
  text
}) => (
  <div className={styles.warning}>
    <h4 className={styles.label}>{label}</h4>
    <div>{text}</div>
  </div>
);
