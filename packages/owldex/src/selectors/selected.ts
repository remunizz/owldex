import { createSelector } from "reselect";
import { denormalizeData } from "../schemas";
import { EntitiesState } from "../reducers/entities.types";
import { RouterState } from "connected-react-router";
import { parse } from "query-string";

const getEntities = (state: { entities: EntitiesState }) => state.entities;
const getRouter = (state: { router: RouterState }) => state.router;

export const detailCard = createSelector(
  [getRouter, getEntities],
  (router, entities) => {
    const { search } = router.location;
    const { detailCardId } = parse(search);

    return denormalizeData({ cards: [detailCardId] }, entities);
  }
);

export const getCards = createSelector([getEntities], entities => {
  const set = entities.sets.rna.cards;

  return denormalizeData({ cards: set }, entities);
});
