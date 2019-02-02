import React from "react";
import { Card } from "magic-api-http";

import styles from "./card-details.module.css";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { history } from "../../store";

const cx = classnames.bind(styles);

interface CardDetailsProps {
  cardData: Card;
}

export const CardDetails: React.FunctionComponent<CardDetailsProps> = ({
  cardData
}) => (
  <div className={cx("modal")}>
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("paperclip")}>{cardData.name}</div>
        <div className={cx("btn-close")}>
          <Link to="/market" className={cx("link-close")}>
            X
          </Link>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(https://sfo2.digitaloceanspaces.com/remunizz-publico/web/magic/cards/${cardData.id}.jpg)`
        }}
        className={styles.fullCardImage}
      />
      <div>
        <div>
          <div>{cardData.type}</div>
          {cardData.rarity !== "Common" ? ` (${cardData.rarity})` : ""}
        </div>
        <div>
          <div>{cardData.text}</div>
        </div>
      </div>
    </div>
  </div>
);
