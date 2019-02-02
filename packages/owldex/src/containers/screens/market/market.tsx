import React from "react";
import { fetchSet, addCardToDeck } from "../../../actions/entities";
import { Card } from "magic-api-http";

import styles from "./market.module.css";
import classnames from "classnames/bind";
import { RouteComponentProps } from "react-router";
import { parse } from "query-string";
import { CardDetails } from "../../../components/card-details";
import { Dialog } from "../../../components/dialog";
import { Button } from "../../../components/button";
import { CardList } from "../../../components/card-list";

const cx = classnames.bind(styles);

interface MarketProps extends RouteComponentProps {
  actions: {
    fetchSet: typeof fetchSet;
    addCardToDeck: typeof addCardToDeck;
  };
  cards: Card[];
  detailCard: Card[];
}

interface SetSelectorProps {
  onClick: () => void;
}

const SetSelector: React.FunctionComponent<SetSelectorProps> = ({
  onClick
}) => (
  <div>
    <Dialog label="Fetch a card set">
      <Button onClick={onClick}>EMA</Button>
    </Dialog>
  </div>
);

export const MarketComponent: React.FunctionComponent<MarketProps> = ({
  actions,
  cards,
  location,
  detailCard
}) => {
  const { search } = location;
  const { modal } = parse(search);
  const showDetails =
    modal === "true" && detailCard !== undefined && detailCard[0] !== undefined;

  return (
    <React.Fragment>
      {cards &&
        cards.length > 0 && (
          <div className={cx("card-wrapper")}>
            <CardList cards={cards} />
          </div>
        )}
      {cards.length === 0 && (
        <SetSelector onClick={() => actions.fetchSet("ema")} />
      )}
      {showDetails && (
        <CardDetails
          cardData={detailCard[0]}
          addCardToDeck={() => actions.addCardToDeck(detailCard[0].id)}
        />
      )}
    </React.Fragment>
  );
};
