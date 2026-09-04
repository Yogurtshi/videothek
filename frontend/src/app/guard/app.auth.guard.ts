import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {map, take} from 'rxjs';
import {AppAuthService} from '../service/app.auth.service';

export const appCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AppAuthService = inject(AppAuthService);
  const oauthService: OAuthService = inject(OAuthService);
  const router = inject(Router);
  void state;

  if (!oauthService.hasValidAccessToken()) {
    return router.parseUrl('/noaccess');
  }

  return authService.getRoles().pipe(
    take(1),
    map(userRoles => checkRoles(route, userRoles)
      ? true
      : router.parseUrl('/noaccess'))
  );
};

function checkRoles(route: ActivatedRouteSnapshot, userRoles: string[]): boolean {
  const roles = route.data['roles'] as Array<string>;

  if (roles === undefined || roles === null || roles.length === 0) {
    return true;
  }

  if (userRoles === undefined) {
    return false;
  }

  for (const role of roles) {
    if (userRoles.indexOf(role) > -1) {
      return true;
    }
  }
  return false;
}

export const appCanActivateChild: CanActivateChildFn = (route, state) => appCanActivate(route, state);