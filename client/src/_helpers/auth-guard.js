import { authService } from '@/_services';

export function authGuard(to, from, next) {
  const user = authService.userValue;

  if(!user) {
    // Not logged in so redirect to login page with return url
    return next({ path: '/login', query: { returnUrl: to.fullPath } });
  }

  next();
}