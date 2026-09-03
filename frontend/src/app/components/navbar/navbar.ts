import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppAuthService } from '../../service/app.auth.service';
import { AppRoles } from '../../app.roles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [RouterLink, RouterLinkActive]
})
export class Navbar implements OnInit {

  private authService = inject(AppAuthService);

  public username = '';
  public useralias = '';
  public roles = AppRoles;
  public userRoles: string[] = [];

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
    this.authService.getRoles().subscribe(roles => {
      this.userRoles = roles;
    });
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public get isAdmin(): boolean {
    return this.userRoles.includes(this.roles.Admin);
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }
}