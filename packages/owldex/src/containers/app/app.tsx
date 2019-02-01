import React, { Component } from "react";
import { Menu } from "../../components/menu";

import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../../store";
import { NavLinks } from "../nav-links";

import styles from "./app.module.css";
import Deck from "../screens/deck";
import { Home } from "../screens/home";

const LazyMarket = React.lazy(() => import("../screens/market"));

const LazyMarketComponent = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <LazyMarket />
  </React.Suspense>
);

export class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <div className={styles.menu}>
            <Menu>
              <NavLinks />
            </Menu>
          </div>
          <div className={styles.content}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/deck" component={Deck} />
              <Route path="/market" component={LazyMarketComponent} />
            </Switch>
          </div>
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}
