import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Facade } from '../../store/facade';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, pluck, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'nrwl-challenge-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailComponent implements OnInit {

  userForm = new FormControl('')

  ticket$ = this.route.params.pipe(
    pluck('id'),
    tap(id => this.facade.setCurrentTicket(id)),
    mergeMap(() => this.facade.currentTicket$.pipe(
      tap(ticket => {
        if (!ticket) {
          this.facade.loadTickets()
          this.facade.loadUsers()
        }
      }),
      filter(ticket => !!ticket),
      tap(ticket => {
        this.userForm.setValue(ticket.assigneeId, {emitEvent: false})
      })
    ))
  )

  users$ = this.facade.users$

  constructor(private facade: Facade, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userForm.valueChanges.pipe(
      filter(val => !!val),
      tap(assigneeId =>  this.facade.assignTo(assigneeId))
    ).subscribe()
  }

  complete(id) {
    this.facade.completeTicket(id)
  }

}
