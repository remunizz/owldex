import React, { FunctionComponent } from "react";
import { fetchSet } from "../../../actions/entities";
import { Card } from "magic-api-http";
import { CardComponent } from "../../../components/card";

import styles from "./market.module.css";
import classnames from "classnames/bind";
import { RouteComponentProps } from "react-router";
import { parse, stringify } from "query-string";
import { Link } from "react-router-dom";
import { CardDetails } from "../../../components/card-details";
import { Dialog } from "../../../components/dialog";

const cx = classnames.bind(styles);

interface MarketProps extends RouteComponentProps {
  actions: {
    fetchSet: typeof fetchSet;
  };
  cards: Card[];
  detailCard: Card[];
}

interface SetSelectorProps {
  onSelect: () => void;
}

const SetSelector: React.FunctionComponent<SetSelectorProps> = ({
  onSelect
}) => (
  <div>
    <Dialog label="Fetch a card set">
      <button onClick={onSelect} className={cx("btn")}>
        EMA
      </button>
    </Dialog>
  </div>
);

interface CardListProps {
  showDetails: boolean | undefined;
  cards: Card[];
}

const CardList: FunctionComponent<CardListProps> = ({ showDetails, cards }) => (
  <div className={cx("card-list", { "fixed-pos": showDetails })}>
    {cards.map(card => (
      <div className={cx("card-container")} key={card.id}>
        <Link
          to={{
            search: stringify({
              detailCardName: card.name,
              modal: true,
              detailCardId: card.id
            })
          }}
          className={cx("anchor")}
        >
          <CardComponent {...card} />
        </Link>
      </div>
    ))}
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
            <CardList cards={cards} showDetails={showDetails} />
          </div>
        )}
      {cards.length === 0 && (
        <SetSelector onSelect={() => actions.fetchSet("ema")} />
      )}
      {showDetails && <CardDetails cardData={detailCard[0]} />}
    </React.Fragment>
  );
};
