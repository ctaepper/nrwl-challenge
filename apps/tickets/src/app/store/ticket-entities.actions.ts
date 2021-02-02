import { createAction, props } from '@ngrx/store';
import { Ticket, User } from '../backend.service';

export const loadTickets = createAction('[Tickets] load tickets');

export const loadTicketsSuccess = createAction(
  '[Tickets] tickets loaded successfully',
  props<{ tickets: Ticket[] }>()
);

export const loadUsers = createAction('[Users] load users');

export const loadUsersSuccess = createAction(
  '[Users] users loaded successfully',
  props<{ users: User[] }>()
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
  props<{ ticketId: number }>()
);

export const completeTicket = createAction(
  '[Tickets] complete ticket',
  props<{ ticketId: number }>()
);

export const assignTicket = createAction(
  '[Tickets] assignee changed',
  props<{ assigneeId: number }>()
);

export const completeTicketSuccess = createAction(
  '[Tickets] ticket completed successfully',
  props<{ ticket: Ticket }>()
);

export const completeTicketOptimistic = createAction(
  '[Tickets] ticket completed optimistically',
  props<{ ticket: Ticket }>()
);

export const revertCompleteTicketOptimistic = createAction(
  '[Tickets] revert optimistic completion',
  props<{ ticket: Ticket }>()
);

export const assignTicketSuccess = createAction(
  '[Tickets] ticket assigned successfully',
  props<{ ticket: Ticket }>()
);
