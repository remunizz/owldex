import { EntitiesState } from "./entities.types";
import {
  EntitiesActions,
  FETCH_SET_FULFILLED_ACTION,
  ADD_CARD_TO_DECK
} from "../actions/entities";
import { FETCH_SET_ACTION } from "../containers/screens/market/market.types";

const initialState: EntitiesState = {
  card: {},
  ui: {
    market: {
      loading: false
    }
  },
  sets: {
    rna: {
      cards: []
    }
  },
  decks: {
    initial: {
      cards: []
    }
  }
};

const reducer = (
  state: EntitiesState = initialState,
  action: EntitiesActions
) => {
  switch (action.type) {
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          initial: {
            ...state.decks.initial,
            cards: [...state.decks.initial.cards, action.payload.cardId]
          }
        }
      };
    case FETCH_SET_ACTION:
      return {
        ...state,
        ui: {
          ...state.ui,
          market: {
            ...state.ui.market,
            loading: true
          }
        }
      };
      break;
    case FETCH_SET_FULFILLED_ACTION:
      return {
        ...state,
        ...action.payload.entities,
        sets: {
          rna: {
            cards: [...action.payload.result.cards]
          }
        },
        ui: {
          ...state.ui,
          market: {
            ...state.ui.market,
            loading: true
          }
        }
      };
    default:
      return { ...state };
  }
};

export default reducer;
