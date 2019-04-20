import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../reducers";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "../epics";

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware<any>();
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const makeStore = (injectDevTools = true) => {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      applyMiddleware(routerMiddleware(history))
    )
  );
  epicMiddleware.run(rootEpic);

  return store;
};

const store = makeStore(process.env.NODE_ENV === "development");

export default store;
