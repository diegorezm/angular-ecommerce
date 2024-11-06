import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NotificationComponent} from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent],
  template: `
    <app-notification></app-notification>
    <router-outlet></router-outlet>
`
})
export class AppComponent {
  title = 'ecommerce';
  constructor() {
  }
}
