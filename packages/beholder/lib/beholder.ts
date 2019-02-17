import localforage, { default as localForageDefault } from "localforage";
import { getOs, getBrowserLanguage } from "./helpers/detector";
import { EyeEvent, EventType } from "./events/eye-event";

import {
  createPageViewEvent,
  PageViewProps,
  PageViewEvent
} from "./events/pageview";
import { createCustomEvent, CustomProps, CustomEvent } from "./events/custom";

import cuid from "cuid";

const getBeholderVersion = () => "0.0.1";

interface Store {
  getItem: LocalForageDbMethodsCore["getItem"];
  setItem: LocalForageDbMethodsCore["setItem"];
}

interface Entities {
  [EventType.Custom]: {
    [id: string]: CustomEvent;
  };
  [EventType.Error]: {
    [id: string]: EyeEvent;
  };
  [EventType.PageView]: {
    [id: string]: PageViewEvent;
  };
  [EventType.Transaction]: {
    [id: string]: EyeEvent;
  };
}

interface RockState {
  trackId: string;
  localId: string;
  platform: string;
  BeholderVersion: string;
  browserLanguage: string;
  visitCount: number;
  os: string;
  entities: Entities;
}

const getInitialEntities = () => ({
  [EventType.Custom]: {},
  [EventType.Error]: {},
  [EventType.PageView]: {},
  [EventType.Transaction]: {}
});

const getInitialState = async (
  navigatorAlias: INavigator,
  store: Store,
  trackId: string,
  platform: string
) => {
  const prevState = await store.getItem<RockState>(trackId);

  const state = {
    ...prevState,
    trackId,
    localId: prevState ? prevState.localId : cuid(),
    visitCount: prevState ? prevState.visitCount + 1 : 0,
    platform,
    beholderVersion: getBeholderVersion(),
    browserLanguage: getBrowserLanguage(navigatorAlias),
    os: getOs(navigatorAlias),
    entities: prevState ? prevState.entities : getInitialEntities()
  };

  return state;
};

const pushEvent = async (store: Store, trackId: string, event: EyeEvent) => {
  const currentState = await store.getItem<RockState>(trackId);

  const newState = {
    ...currentState,
    entities: {
      ...currentState.entities,
      [event.type]: {
        ...currentState.entities[event.type],
        ...{ [cuid()]: event }
      }
    }
  };

  const state = await store.setItem(trackId, newState);
  return state;
};

const defaultConfig: LocalForageOptions = {
  driver: localforage.LOCALSTORAGE,
  name: "beholder",
  version: 1.0
};

interface INavigator {
  language: string;
  appVersion: string;
}

export const behold = (
  trackId: string,
  platform: string,
  options: LocalForageOptions,
  createStore?: () => Store,
  navigatorAlias?: INavigator
) => {
  const store: Store = (createStore || localForageDefault.createInstance)(
    options.version ? options : defaultConfig
  );

  const init = async () => {
    const state = await getInitialState(
      navigatorAlias ||
        <INavigator>{
          appVersion: "unknow",
          ...typeof navigator !== "undefined" ? navigator : {}
        },
      store,
      trackId,
      platform
    );
    await store.setItem(trackId, state);

    return state;
  };

  return {
    init,
    custom: (props: CustomProps) =>
      pushEvent(store, trackId, createCustomEvent(props)),
    pageView: (props: PageViewProps) =>
      pushEvent(store, trackId, createPageViewEvent(props)),
    pushEvent: (event: EyeEvent) => pushEvent(store, trackId, event)
  };
};
