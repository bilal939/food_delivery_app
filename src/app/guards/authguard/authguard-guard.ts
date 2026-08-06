import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from 'src/app/services/auth/auth';
export const authguardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
