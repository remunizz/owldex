import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { History } from "history";

import styles from "./nav-links.module.css";

interface NavLinksProps extends RouteComponentProps {
  history: History;
}

const NavLinksComponent: React.FunctionComponent<NavLinksProps> = props => {
  const { pathname } = props.history.location;

  return (
    <React.Fragment>
      {pathname !== "/market" && (
        <Link to="/market" className={styles.link}>
          Market
        </Link>
      )}
      {pathname !== "/deck" && (
        <Link to="/deck" className={styles.link}>
          Deck
        </Link>
      )}
    </React.Fragment>
  );
};

export const NavLinks = withRouter(NavLinksComponent);
