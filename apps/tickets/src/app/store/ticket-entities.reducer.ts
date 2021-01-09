import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Ticket, User } from '../backend.service';
import { Action, createReducer, on } from '@ngrx/store';
import * as ticketActions from './ticket-entities.actions';

export interface TicketState extends EntityState<Ticket> {
  currentId: number;
  users: User[];
  loading: boolean;
}

export const adapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const initialState: TicketState = adapter.getInitialState({
  currentId: null,
  users: [],
  loading: true,
});

const ticketReducer = createReducer(
  initialState,
  on(
    ticketActions.loadTickets,
    ticketActions.createTicket,
    ticketActions.completeTicket,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(ticketActions.loadTicketsSuccess, (state, { tickets }) =>
    adapter.setAll(tickets, {...state, loading: false})
  ),
  on(ticketActions.createTicketSuccess, (state, { ticket }) =>
    adapter.addOne(ticket, {...state, loading: false})
  ),
  on(ticketActions.ticketDetailOpened, (state, { ticketId }) => ({
    ...state,
    currentId: ticketId,
  })),
  on(ticketActions.completeTicketSuccess, (state, { ticket }) =>
    adapter.upsertOne(ticket, {...state, loading: false})
  )
);

export function reducer(state: TicketState | undefined, action: Action) {
  return ticketReducer(state, action);
}

export const {
  selectEntities,
  selectAll,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
export const getCurrentId = (state: TicketState) => state.currentId;
export const getUsers = (state: TicketState) => state.users;
export const getLoading = (state: TicketState) => state.loading;
