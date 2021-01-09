import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './store/ticket.effects';
import { reducers } from './store';
import { TicketsComponent } from './features/tickets/tickets.component';
import { Route, RouterModule } from '@angular/router';
import { BackendService } from './backend.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TicketDetailComponent } from './features/ticket-detail/ticket-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Route[] = [
  {
    path: 'tickets',
    component: TicketsComponent,
  },
  {
    path: 'tickets/:id',
    component: TicketDetailComponent,
  },
  { path: '**', redirectTo: '/tickets' },
];

@NgModule({
  declarations: [AppComponent, TicketsComponent, TicketDetailComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([TicketEffects]),
    ReactiveFormsModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
