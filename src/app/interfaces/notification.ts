export interface Notification {
  message: string;
  type: NotificationType;
  duration?: number;
}

export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}