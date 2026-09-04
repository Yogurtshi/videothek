import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Navigation } from './components/navigation/navigation';
import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon, MatSidenavModule, Navigation, Login]
})
export class App {
  public sidenavOpened = false;

  public toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}