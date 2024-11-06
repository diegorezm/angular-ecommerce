import {inject} from "@angular/core";
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notiticationService = inject(NotificationService);
  if (!authService.isLoggedIn()) {
    notiticationService.error('You must be logged in to access this page!');
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
