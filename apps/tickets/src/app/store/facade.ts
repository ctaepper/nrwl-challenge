import { Injectable } from '@angular/core';
import * as fromStore from './index';
import * as ticketActions from './ticket-entities.actions';
import { select, Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class Facade {
  tickets$ = this.store.pipe(select(fromStore.selectAllTickets));
  users$ = this.store.pipe(select(fromStore.selectAllUsers));
  currentTicket$ = this.store.pipe(select(fromStore.selectCurrentTicket));
  loading$ = this.store.pipe(select(fromStore.selectLoading));

  constructor(private store: Store<fromStore.State>) {}

  loadTickets() {
    this.store.dispatch(ticketActions.loadTickets());
  }

  loadUsers() {
    this.store.dispatch(ticketActions.loadUsers());
  }

  createTicket(description) {
    this.store.dispatch(ticketActions.createTicket({ description }));
  }

  setCurrentTicket(ticketId) {
    this.store.dispatch(ticketActions.ticketDetailOpened({ ticketId }));
  }

  completeTicket(ticketId) {
    this.store.dispatch(ticketActions.completeTicket({ ticketId }));
  }

  assignTo(assigneeId: number) {
    this.store.dispatch(ticketActions.assignTicket({ assigneeId }));
  }
}
