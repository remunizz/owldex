import React, { FunctionComponent, Fragment } from "react";
import { Dialog } from "../../../components/dialog";
import { RouteComponentProps } from "react-router";
import { Card } from "magic-api-http/dist";
import { CardList } from "../../../components/card-list";

interface DeckProps extends RouteComponentProps {
  cards: Card[];
}

const Deck: FunctionComponent<DeckProps> = ({ cards }) => (
  <Fragment>
    {cards &&
      cards.length > 0 && (
        // <div className={cx("card-wrapper")}>
        <div>
          <CardList cards={cards} />
        </div>
      )}
    {cards.length === 0 && (
      <div>
        <Dialog label="You don't have cards">Add some fun to your deck</Dialog>
      </div>
    )}
  </Fragment>
);

export default Deck;
