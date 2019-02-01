import { CardsResult } from "../schemas";

export const FETCH_SET_ACTION = "FETCH_SET_ACTION";
export const FETCH_SET_FULFILLED_ACTION = "FETCH_SET_FULFILLED_ACTION";

export interface FetchSetAction {
  type: typeof FETCH_SET_ACTION;
  payload: string;
}

export interface FetchSetFulfilledAction {
  type: typeof FETCH_SET_FULFILLED_ACTION;
  payload: CardsResult;
}

export interface EntitiesState {
  card: { [id: string]: {} };
  decks: { initial: { cards: string[] } };
}

export const fetchSet = (setId: string) => ({
  type: FETCH_SET_ACTION,
  payload: setId
});

export const fetchSetFulfilled = (normalizedCards: CardsResult) => ({
  type: FETCH_SET_FULFILLED_ACTION,
  payload: normalizedCards
});

export type EntitiesActions = FetchSetAction | FetchSetFulfilledAction;
