import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromTickets from './ticket-entities.reducer';

export interface State {
  tickets: fromTickets.TicketState;
}

export const reducers: ActionReducerMap<State> = {
  tickets: fromTickets.reducer,
};

export const selectTicketsFeature = (state: State) => state.tickets;

export const selectAllTickets = createSelector(
  selectTicketsFeature,
  fromTickets.selectAll
);
export const selectTicketEntities = createSelector(
  selectTicketsFeature,
  fromTickets.selectEntities
);

export const selectCurrentTicketId = createSelector(
  selectTicketsFeature,
  fromTickets.getCurrentId
);

export const selectLoading = createSelector(
  selectTicketsFeature, fromTickets.getLoading
)

export const selectCurrentTicket = createSelector(
  selectTicketEntities,
  selectCurrentTicketId,
  (entities, id) => entities[id]
);




