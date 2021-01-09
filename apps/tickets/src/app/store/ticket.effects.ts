import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../backend.service';
import * as ticketActions from './ticket-entities.actions';
import { map, mergeMap, pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';

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
      mergeMap((id) =>
        this.backend
          .complete(id, true)
          .pipe(
            map((ticket) => ticketActions.completeTicketSuccess({ ticket }))
          )
      )
    )
  );

  constructor(private actions$: Actions, private backend: BackendService) {}
}
