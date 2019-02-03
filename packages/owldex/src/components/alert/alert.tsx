import React, { FunctionComponent } from "react";

import styles from "./alert.module.css";

export interface AlertProps {
  alert: string;
}

export const Alert: FunctionComponent<AlertProps> = ({ alert }) => (
  <div className={styles.alerts}>{alert}</div>
);
