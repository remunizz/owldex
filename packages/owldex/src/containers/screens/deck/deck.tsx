import React, { FunctionComponent, Fragment } from "react";
import { Dialog } from "../../../components/dialog";
import { RouteComponentProps } from "react-router";
import { Card } from "magic-api-ts";
import { CardList } from "../../../components/card-list";
import { parse } from "query-string";
import { CardDetails } from "../../../components/card-details";
import { removeCardFromDeck } from "../../../actions/entities";
import { history } from "../../../store";

interface DeckProps extends RouteComponentProps {
  actions: {
    removeCardFromDeck: typeof removeCardFromDeck;
  };
  cards: Card[];
  detailCard: Card[];
}

const Deck: FunctionComponent<DeckProps> = ({ cards, detailCard, actions }) => {
  const { search } = location;
  const { modal } = parse(search);
  const showDetails =
    modal === "true" && detailCard !== undefined && detailCard[0] !== undefined;

  return (
    <Fragment>
      {cards &&
        cards.length > 0 && (
          <div>
            <CardList cards={cards} />
          </div>
        )}
      {cards.length === 0 && (
        <div>
          <Dialog label="You don't have cards">
            Add some fun to your deck
          </Dialog>
        </div>
      )}
      {showDetails && (
        <CardDetails
          cardData={detailCard[0]}
          btnLabel="Remove from deck"
          btnAction={() => {
            actions.removeCardFromDeck(detailCard[0].id);
            history.push({ search: "" });
          }}
        />
      )}
    </Fragment>
  );
};

export default Deck;
