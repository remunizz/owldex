import { CardsResult } from "../schemas";

export const FETCH_SET_ACTION = "FETCH_SET_ACTION";
export const FETCH_SET_FULFILLED_ACTION = "FETCH_SET_FULFILLED_ACTION";
export const FETCH_SET_FAILED_ACTION = "FETCH_SET_FAILED_ACTION";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const REMOVE_CARD_FROM_DECK = "REMOVE_CARD_FROM_DECK";

export interface FetchSetAction {
  type: typeof FETCH_SET_ACTION;
  payload: string;
}

export interface FetchSetFulfilledAction {
  type: typeof FETCH_SET_FULFILLED_ACTION;
  payload: CardsResult;
}

export interface FetchSetFailedAction {
  type: typeof FETCH_SET_FAILED_ACTION;
  payload: string;
}

export interface EntitiesState {
  card: { [id: string]: {} };
  decks: { initial: { cards: string[] } };
}

export interface AddCardToDeckAction {
  type: typeof ADD_CARD_TO_DECK;
  payload: { cardId: string };
}

export interface RemoveCardFromDeckAction {
  type: typeof REMOVE_CARD_FROM_DECK;
  payload: { cardId: string };
}

export const fetchSet = (setId: string): FetchSetAction => ({
  type: FETCH_SET_ACTION,
  payload: setId
});

export const fetchSetFulfilled = (
  normalizedCards: CardsResult
): FetchSetFulfilledAction => ({
  type: FETCH_SET_FULFILLED_ACTION,
  payload: normalizedCards
});

export const fetchSetFailed = (alert: string): FetchSetFailedAction => ({
  type: FETCH_SET_FAILED_ACTION,
  payload: alert
});

export const addCardToDeck = (cardId: string): AddCardToDeckAction => ({
  type: ADD_CARD_TO_DECK,
  payload: { cardId }
});

export const removeCardFromDeck = (
  cardId: string
): RemoveCardFromDeckAction => ({
  type: REMOVE_CARD_FROM_DECK,
  payload: { cardId }
});

export type EntitiesActions =
  | FetchSetAction
  | FetchSetFulfilledAction
  | FetchSetFailedAction
  | AddCardToDeckAction
  | RemoveCardFromDeckAction;
