import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../backend.service';
import * as ticketActions from './ticket-entities.actions';
import { catchError, map, mergeMap, pluck, tap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as fromStore from './index';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class TicketEffects {
  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketActions.loadTickets),
      mergeMap(() =>
        this.backend
          .tickets()
          .pipe(map((tickets) => ticketActions.loadTicketsSuccess({ tickets })))
      )
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketActions.loadUsers),
      mergeMap(() =>
        this.backend
          .users()
          .pipe(map((users) => ticketActions.loadUsersSuccess({ users })))
      )
    )
  );

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketActions.createTicket),
      pluck('description'),
      mergeMap((description) =>
        this.backend
          .newTicket({ description })
          .pipe(map((ticket) => ticketActions.createTicketSuccess({ ticket })))
      )
    )
  );

  completeTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketActions.completeTicket),
      pluck('ticketId'),
      withLatestFrom(this.store.pipe(select(fromStore.selectCurrentTicket))),
      tap(([_, ticket]) => {
        this.store.dispatch(
          ticketActions.completeTicketOptimistic({
            ticket: {
              ...ticket,
              completed: true,
            },
          })
        );
      }),
      mergeMap(([id, ticket]) =>
        this.backend
          .complete(id, true)
          .pipe(
            map((ticket) => ticketActions.completeTicketSuccess({ ticket })),
            catchError(error => of(ticketActions.revertCompleteTicketOptimistic({ticket: ticket})))
          )
      )
    )
  );

  assignTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketActions.assignTicket),
      pluck('assigneeId'),
      withLatestFrom(this.store.pipe(select(fromStore.selectCurrentTicketId))),
      mergeMap(([assigneeId, ticketId]) =>
        this.backend
          .assign(ticketId, assigneeId)
          .pipe(map((ticket) => ticketActions.assignTicketSuccess({ ticket })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backend: BackendService,
    private store: Store<fromStore.State>
  ) {}
}
