import { EntitiesState } from "./entities.types";
import {
  EntitiesActions,
  FETCH_SET_FULFILLED_ACTION,
  ADD_CARD_TO_DECK,
  REMOVE_CARD_FROM_DECK,
  FETCH_SET_FAILED_ACTION
} from "../actions/entities";
import { FETCH_SET_ACTION } from "../containers/screens/market/market.types";

const initialState: EntitiesState = {
  card: {},
  ui: {
    market: {
      loading: false,
      alert: ""
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
    case REMOVE_CARD_FROM_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          initial: {
            ...state.decks.initial,
            cards: state.decks.initial.cards.filter(
              cardId => cardId != action.payload.cardId
            )
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
    case FETCH_SET_FULFILLED_ACTION:
      return {
        ...state,
        ...action.payload.entities,
        sets: {
          ...state.sets,
          rna: {
            ...state.sets.rna,
            cards: [...action.payload.result.cards]
          }
        },
        ui: {
          ...state.ui,
          market: {
            ...state.ui.market,
            loading: false,
            alert: ""
          }
        }
      };
    case FETCH_SET_FAILED_ACTION:
      return {
        ...state,
        ui: {
          ...state.ui,
          market: {
            ...state.ui.market,
            loading: false,
            alert: action.payload
          }
        }
      };
    default:
      return { ...state };
  }
};

export default reducer;
