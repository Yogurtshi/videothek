import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIcon, IsInRolesDirective],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  @Output() linkClicked = new EventEmitter<void>();

  public onLinkClick(): void {
    this.linkClicked.emit();
  }
}
