import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Facade } from '../../store/facade';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'nrwl-challenge-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailComponent {

  ticket$ = this.route.params.pipe(
    pluck('id'),
    tap(id => this.facade.setCurrentTicket(id)),
    mergeMap(() => this.facade.currentTicket$.pipe(
      tap(ticket => {
        if (!ticket) this.facade.loadTickets()
      }),
      filter(ticket => !!ticket)
    ))
  )

  constructor(private facade: Facade, private route: ActivatedRoute) { }

  complete(id) {
    this.facade.completeTicket(id)
  }
}
