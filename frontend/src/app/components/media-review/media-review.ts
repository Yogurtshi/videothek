import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Comment } from '../../data/comment';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';

@Component({
  selector: 'app-media-review',
  imports: [MatButtonModule, MatIcon, MatMenuModule, IsInRolesDirective],
  templateUrl: './media-review.html',
  styleUrl: './media-review.scss',
})
export class MediaReview {
  @Input({ required: true }) comment!: Comment;
  @Input() canEdit = false;
  @Output() edit = new EventEmitter<Comment>();
  @Output() delete = new EventEmitter<Comment>();
}
