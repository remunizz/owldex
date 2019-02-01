import { createStore, applyMiddleware, compose, Action } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../reducers";
import { createEpicMiddleware, ActionsObservable } from "redux-observable";
import { behold } from "beholder";
import rootEpic from "../epics";
import { FetchSetAction } from "../actions/entities";
import { FetchSetFulfilledAction } from "../actions/entities";

export const history = createBrowserHistory();
export const beholder = behold("EYE-0.0", "web", {});

const createPageEvent = (path: string) => ({
  title: document.title,
  path,
  location: window.location.href
});

beholder.init().then(() => {
  beholder.pageView(createPageEvent("/"));
  beholder.custom({
    category: "app",
    action: "init"
  });

  history.listen(res => {
    beholder.pageView(createPageEvent(res.pathname));
  });
});

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
