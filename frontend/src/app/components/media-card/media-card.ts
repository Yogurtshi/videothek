import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';
import { Media } from '../../data/media';

@Component({
  selector: 'app-media-card',
  imports: [MatCardModule, MatIconButton, MatIcon, MatChip, MatChipSet, RouterLink, IsInRolesDirective],
  templateUrl: './media-card.html',
  styleUrl: './media-card.scss',
})
export class MediaCard {
  @Input({ required: true }) item!: Media;
  @Output() edit = new EventEmitter<Media>();
  @Output() delete = new EventEmitter<Media>();
}
