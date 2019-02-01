import React from "react";
import classNames from "classnames/bind";

import styles from "./menu.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

interface Props {
  chidlren?: React.ReactNode[];
}

export const Menu: React.FunctionComponent<Props> = ({ children }) => (
  <div>
    <div className={cx("menu")}>
      <Link to="/" className={cx("link")}>
        <div className={cx("logo")}>
          <div className={cx("app-name")}>Owldex</div>
        </div>
      </Link>
      <div className={cx("nav-container")}>{children}</div>
    </div>
  </div>
);
