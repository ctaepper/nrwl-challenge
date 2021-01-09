import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Facade } from './store/facade';


@Component({
  selector: 'nrwl-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isLoading$ = this.facade.loading$;

  constructor(private facade: Facade) {}
}
