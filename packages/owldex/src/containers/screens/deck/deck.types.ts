export const SELECT_SET_ACTION = "SELECT_SET_ACTION";

export interface SelectSetAction {
  type: typeof SELECT_SET_ACTION;
  payload: {};
}

export type DeckActions = SelectSetAction;

export interface DeckState {
  selected: string[];
}
