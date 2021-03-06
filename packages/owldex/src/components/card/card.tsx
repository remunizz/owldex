import React from "react";
import { Card } from "magic-api-ts";

import styles from "./card.module.css";

export const CardComponent: React.FunctionComponent<Card> = ({ name, id }) => (
  <div>
    <div
      data-testid="card-img"
      style={{
        backgroundImage: `url(https://sfo2.digitaloceanspaces.com/remunizz-publico/web/magic/cards/${id}.png)`
      }}
      className={styles.photo}
    />
    <div className={styles.title}>{name}</div>
  </div>
);
