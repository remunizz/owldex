import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { History } from "history";
import entitiesReducer from "./entities";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    entities: entitiesReducer
  });

export default createRootReducer;
