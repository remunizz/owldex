import React, { FunctionComponent } from "react";
import { Card } from "magic-api-ts";
import { Link } from "react-router-dom";
import { CardComponent } from "../card/card";
import { stringify } from "query-string";

import styles from "./card-list.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface CardListProps {
  cards: Card[];
}

export const CardList: FunctionComponent<CardListProps> = ({ cards }) => (
  <div className={cx("card-list")}>
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
