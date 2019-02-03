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
  deckCards: string[];
  detailCard: Card[];
  loadingStatus: boolean;
}

interface SetSelectorProps {
  onClick: () => void;
}

const SetSelector: React.FunctionComponent<SetSelectorProps> = ({
  onClick
}) => (
  <div>
    <Dialog label="Fetch a card set">
      <Button onClick={onClick}>Ravnica Allegiance</Button>
    </Dialog>
  </div>
);

export const MarketComponent: React.FunctionComponent<MarketProps> = ({
  actions,
  cards,
  location,
  detailCard,
  deckCards,
  loadingStatus
}) => {
  const { search } = location;
  const { modal } = parse(search);
  const showDetails =
    modal === "true" && detailCard !== undefined && detailCard[0] !== undefined;
  const isDetailCardInDeck =
    showDetails && deckCards.lastIndexOf(detailCard[0].id) !== -1;

  return (
    <React.Fragment>
      {cards &&
        cards.length > 0 && (
          <div className={cx("card-wrapper")}>
            <CardList cards={cards} />
          </div>
        )}
      {cards.length !== 0 ? null : loadingStatus ? (
        <div>
          <Dialog label="Loading" />
        </div>
      ) : (
        <SetSelector onClick={() => actions.fetchSet("rna")} />
      )}
      {showDetails && (
        <CardDetails
          cardData={detailCard[0]}
          btnLabel={isDetailCardInDeck ? "Included in deck" : "Add to deck"}
          btnAction={
            isDetailCardInDeck
              ? undefined
              : () => actions.addCardToDeck(detailCard[0].id)
          }
        />
      )}
    </React.Fragment>
  );
};
