import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIcon, IsInRolesDirective]
})
export class Navbar {
  @Output() linkClicked = new EventEmitter<void>();

  public onLinkClick(): void {
    this.linkClicked.emit();
  }
}