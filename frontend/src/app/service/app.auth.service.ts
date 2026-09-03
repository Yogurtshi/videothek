import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private oauthService = inject(OAuthService);
  private authConfig = inject(AuthConfig);
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly usernameObservable: Observable<string> = this.usernameSubject.asObservable();
  private useraliasSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly useraliasObservable: Observable<string> = this.useraliasSubject.asObservable();
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly accessTokenObservable: Observable<string> = this.accessTokenSubject.asObservable();

  constructor() {
    this.handleEvents(null);
  }

  private _decodedAccessToken: any;
  get decodedAccessToken() { return this._decodedAccessToken; }

  private _accessToken = '';
  get accessToken() { return this._accessToken; }

  async initAuth(): Promise<void> {
    this.oauthService.configure(this.authConfig);
    this.oauthService.events.subscribe(e => this.handleEvents(e));
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  public getRoles(): Observable<Array<string>> {
    if (this._decodedAccessToken !== null) {
      return new Observable<Array<string>>(observer => {
        if (this._decodedAccessToken.resource_access?.videothek?.roles) {
          const roles = this._decodedAccessToken.resource_access.videothek.roles;
          if (Array.isArray(roles)) {
            observer.next(roles.map((r: string) => r.replace('ROLE_', '')));
          } else {
            observer.next([roles.replace('ROLE_', '')]);
          }
        } else {
          observer.next([]);
        }
      });
    }
    return of([]);
  }

  public getIdentityClaims(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public logout(): void {
    this.oauthService.logOut();
    this.useraliasSubject.next('');
    this.usernameSubject.next('');
  }

  public login(): void {
    this.oauthService.initLoginFlow();
  }

  private handleEvents(event: any): void {
    if (event instanceof OAuthErrorEvent) {
      console.error(event);
    } else {
      this._accessToken = this.oauthService.getAccessToken();
      this.accessTokenSubject.next(this._accessToken);
      this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);

      if (this._decodedAccessToken?.family_name && this._decodedAccessToken?.given_name) {
        this.usernameSubject.next(this._decodedAccessToken.given_name + ' ' + this._decodedAccessToken.family_name);
      }

      const claims = this.getIdentityClaims();
      if (claims?.['preferred_username']) {
        this.useraliasSubject.next(claims['preferred_username']);
      }
    }
  }
}