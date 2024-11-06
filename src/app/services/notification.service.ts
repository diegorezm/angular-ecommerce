import {Injectable} from '@angular/core';

import {Notification, NotificationType} from '../interfaces/notification';

import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  private notification$: Subject<Notification> = new Subject();

  success(message: string) {
    this.notify({message, type: NotificationType.SUCCESS, duration: 3000});
  }

  error(message: string) {
    this.notify({message, type: NotificationType.ERROR, duration: 3000});
  }

  warning(message: string) {
    this.notify({message, type: NotificationType.WARNING, duration: 3000});
  }

  getNotification$() {
    return this.notification$.asObservable();
  }

  private notify(notification: Notification) {
    const duration = notification.duration ? notification.duration : 3000;
    notification.duration = duration;
    this.notification$.next(notification);
  }

}
