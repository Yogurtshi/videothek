import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {firstValueFrom, Observable, of} from 'rxjs';
import {appCanActivate} from './app.auth.guard';
import {AppAuthService} from '../service/app.auth.service';

describe('appCanActivate', () => {
  let oauthService: { hasValidAccessToken: ReturnType<typeof vi.fn> };
  let authService: { getRoles: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    oauthService = {hasValidAccessToken: vi.fn()};
    authService = {getRoles: vi.fn()};

    TestBed.configureTestingModule({
      providers: [
        {provide: OAuthService, useValue: oauthService},
        {provide: AppAuthService, useValue: authService}
      ]
    });
  });

  it('denies unauthenticated navigation without loading roles', () => {
    oauthService.hasValidAccessToken.mockReturnValue(false);
    const result = TestBed.runInInjectionContext(() => appCanActivate(routeWithRoles('read'), routeState));

    expect(result).toBeInstanceOf(UrlTree);
    expect(authService.getRoles).not.toHaveBeenCalled();
  });

  it('allows an authenticated user with a required role', async () => {
    oauthService.hasValidAccessToken.mockReturnValue(true);
    authService.getRoles.mockReturnValue(of(['read']));
    const result = TestBed.runInInjectionContext(() => appCanActivate(routeWithRoles('read'), routeState));

    await expect(firstValueFrom(result as Observable<boolean | UrlTree>)).resolves.toBe(true);
  });

  it('denies an authenticated user without a required role', async () => {
    oauthService.hasValidAccessToken.mockReturnValue(true);
    authService.getRoles.mockReturnValue(of(['read']));
    const result = TestBed.runInInjectionContext(() => appCanActivate(routeWithRoles('admin'), routeState));

    await expect(firstValueFrom(result as Observable<boolean | UrlTree>)).resolves.toBeInstanceOf(UrlTree);
  });
});


const routeState = {} as RouterStateSnapshot;

function routeWithRoles(...roles: string[]): ActivatedRouteSnapshot {
  return {data: {roles}} as unknown as ActivatedRouteSnapshot;
}