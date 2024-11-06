import {Component, OnInit} from '@angular/core';
import {Notification, NotificationType} from '../../interfaces/notification';
import {NotificationService} from '../../services/notification.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  toAlertClass = {
    [NotificationType.SUCCESS]: 'alert-success',
    [NotificationType.INFO]: 'alert-info',
    [NotificationType.WARNING]: 'alert-warning',
    [NotificationType.ERROR]: 'alert-error'
  };

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.notificationService.getNotification$().subscribe((notification: Notification) => {
      this.notifications.push(notification);
      setTimeout(() => {
        this.removeNotification(notification);
      }, notification.duration);
    });
  }

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(n => n !== notification);
  }

}
