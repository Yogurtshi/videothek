import { Component, inject, OnInit } from '@angular/core';
import { AppAuthService } from '../../service/app.auth.service';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [IsInRolesDirective, MatButtonModule]
})
export class Login implements OnInit {

  private authService = inject(AppAuthService);

  public username = '';
  public useralias = '';

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }
}