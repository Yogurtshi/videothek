
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MediaService } from '../../service/media';
import { Media } from '../../data/media';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';
import { AddMedia } from '../../components/add-media/add-media';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.html',
  styleUrl: './media-list.scss',
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatIconButton, MatIcon, MatChip, MatChipSet, RouterLink, IsInRolesDirective]
})
export class MediaList implements OnInit {

  private mediaService = inject(MediaService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  public mediaList = signal<Media[]>([]);

  ngOnInit(): void {
    this.loadList();
  }

  private loadList(): void {
    this.mediaService.getList().subscribe({
      next: (media) => this.mediaList.set(media),
      error: (err) => console.error('Failed to load media list:', err)
    });
  }

  public onEdit(item: Media): void {
    this.router.navigate(['/media', item.id, 'edit']);
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(AddMedia, { width: 'min(92vw, 560px)' });

    dialogRef.afterClosed().subscribe((media?: Media) => {
      if (!media) {
        return;
      }
      this.mediaService.save(media).subscribe({
        next: (savedMedia) => this.mediaList.update(mediaList => [...mediaList, savedMedia]),
        error: (err) => console.error('Failed to add media:', err)
      });
    });
  }

  public onDelete(item: Media): void {
    if (!confirm(`"${item.title}" wirklich löschen?`)) {
      return;
    }
    this.mediaService.delete(item.id).subscribe({
      next: () => this.mediaList.update(media => media.filter(m => m.id !== item.id)),
      error: (err) => console.error('Failed to delete media:', err)
    });
  }
}
