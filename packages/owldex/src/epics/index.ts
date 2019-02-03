import { combineEpics, ofType, ActionsObservable } from "redux-observable";
import { switchMap, catchError } from "rxjs/operators";
import {
  FETCH_SET_ACTION,
  FetchSetAction,
  fetchSetFailed
} from "../actions/entities";
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
        }),
        catchError(() => {
          return of(
            fetchSetFailed(
              "Opps, our data provider is down, please try again soon!"
            )
          );
        })
      )
    )
  );

export default combineEpics(fetchCardsEpic);
