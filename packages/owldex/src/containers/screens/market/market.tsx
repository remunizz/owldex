import React from "react";
import { fetchSet } from "../../../actions/entities";
import { Card } from "magic-api-http";
import { CardComponent } from "../../../components/card";

import styles from "./market.module.css";
import classnames from "classnames/bind";
import { RouteComponentProps } from "react-router";
import { parse, stringify } from "query-string";
import { Link } from "react-router-dom";
import { CardDetails } from "../../../components/card-details";

const cx = classnames.bind(styles);

interface MarketProps extends RouteComponentProps {
  actions: {
    fetchSet: typeof fetchSet;
  };
  cards: Card[];
  detailCard: Card[];
}

export const MarketComponent: React.FunctionComponent<MarketProps> = ({
  actions,
  cards,
  location,
  detailCard
}) => {
  const { search } = location;
  const { modal } = parse(search);
  const showDetails = modal && detailCard && detailCard[0];

  return (
    <div>
      <div className={cx("card-list", { "fixed-pos": showDetails })}>
        {cards && (
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
        )}
        {cards.length === 0 && (
          <button onClick={e => actions.fetchSet("ema")} className={cx("btn")}>
            Download
          </button>
        )}
      </div>
      {showDetails && <CardDetails cardData={detailCard[0]} />}
    </div>
  );
};
