export const FETCH_SET_ACTION = "FETCH_SET_ACTION";

export interface FetchSetAction {
  type: typeof FETCH_SET_ACTION;
  payload: boolean;
}

export type MarketActions = FetchSetAction;

export interface MarketState {
  loading: boolean;
}
