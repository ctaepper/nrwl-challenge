import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Facade } from '../../store/facade';
import { FormControl } from '@angular/forms';
import { filter, map, mergeMap, startWith, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'nrwl-challenge-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent {
  newTicket = new FormControl('');

  search = new FormControl('');

  tickets$ = this.facade.tickets$.pipe(
    tap((tickets) => {
      if (!tickets.length) {
        this.facade.loadTickets();
      }
    }),
    filter((tickets) => !!tickets.length)
  );

  filteredTickets$ = combineLatest([
    this.search.valueChanges.pipe(startWith('')),
    this.tickets$,
  ]).pipe(
    map(([search, tickets]) =>
      search.length
        ? tickets.filter((t) =>
            t.description.toLowerCase().includes(search.toLowerCase())
          )
        : tickets
    )
  );

  constructor(private facade: Facade) {}

  createTicket() {
    this.facade.createTicket(this.newTicket.value);
    this.newTicket.setValue('');
  }
}
