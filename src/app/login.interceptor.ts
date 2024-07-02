import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { AppService } from './services/app.service';
//https://devdactic.com/ionic-jwt-refresh-token
export const loginInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const appService = inject(AppService);

  authService.getOGoogleJwtToken().then(t => {

    let decoded = jwtDecode(t.value);
    let timeexp = new Date(decoded.exp * 1000);
    let expiration = timeexp.getTime();
    let current = new Date().getTime();

    if (expiration < current) {
      appService.setHiddenMenu(true);
      authService.logout();
      router.navigate((['login']));
    }

  });




  return next(req);
};
