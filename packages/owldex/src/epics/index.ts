import { combineEpics, ofType, ActionsObservable } from "redux-observable";
import { switchMap } from "rxjs/operators";
import { FETCH_SET_ACTION, FetchSetAction } from "../actions/entities";
import { from, of } from "rxjs";
import { fetchCards } from "magic-api-http";
import normalizeCards from "../schemas";
import { fetchSetFulfilled } from "../actions/entities";

const fetchCardsEpic = (action$: ActionsObservable<FetchSetAction>) =>
  action$.pipe(
    ofType(FETCH_SET_ACTION),
    switchMap(({ payload: set }) =>
      from(fetchCards({ set })).pipe(
        switchMap(response => {
          const normalized = normalizeCards(response.items);
          return of(fetchSetFulfilled(normalized));
        })
      )
    )
  );

export default combineEpics(fetchCardsEpic);
