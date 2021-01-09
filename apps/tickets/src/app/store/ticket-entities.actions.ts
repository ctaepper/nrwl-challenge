import { createAction, props } from '@ngrx/store';
import { Ticket } from '../backend.service';

export const loadTickets = createAction('[Tickets] load tickets');

export const loadTicketsSuccess = createAction(
  '[Tickets] tickets loaded successfully',
  props<{ tickets: Ticket[] }>()
);

export const createTicket = createAction(
  '[Tickets] create new ticket',
  props<{ description: string }>()
);

export const createTicketSuccess = createAction(
  '[Tickets] new ticket created',
  props<{ ticket: Ticket }>()
);

export const ticketDetailOpened = createAction(
  '[Tickets] opened ticket detail',
  props<{ticketId: number}>()
);

export const completeTicket = createAction(
  '[Tickets] complete ticket',
  props<{ ticketId: number }>()
);

export const completeTicketSuccess = createAction(
  '[Tickets] ticket completed successfully',
  props<{ ticket: Ticket }>()
);
