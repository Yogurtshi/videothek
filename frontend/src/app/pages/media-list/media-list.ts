
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MediaService } from '../../service/media';
import { Media } from '../../data/media';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IsInRolesDirective } from '../../directives/app-is-in-roles.dir';
import { MediaFormDialog } from '../../components/media-form-dialog/media-form-dialog';
import { ConfirmDialog, ConfirmDialogData } from '../../components/confirm-dialog/confirm-dialog';
import { MediaCard } from '../../components/media-card/media-card';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.html',
  styleUrl: './media-list.scss',
  imports: [MatButtonModule, MatDialogModule, MatIcon, IsInRolesDirective, MediaCard]
})
export class MediaList implements OnInit {

  private mediaService = inject(MediaService);
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
    const dialogRef = this.dialog.open(MediaFormDialog, {
      width: '640px',
      panelClass: 'media-dialog-panel',
      data: item
    });

    dialogRef.afterClosed().subscribe((media?: Media) => {
      if (!media) {
        return;
      }
      this.mediaService.update(media).subscribe({
        next: (updatedMedia) => this.mediaList.update(mediaList =>
          mediaList.map(currentMedia => currentMedia.id === updatedMedia.id ? updatedMedia : currentMedia)
        ),
        error: (err) => console.error('Failed to update media:', err)
      });
    });
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(MediaFormDialog, {
      width: '640px',
      panelClass: 'media-dialog-panel'
    });

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
    const dialogRef = this.dialog.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
      width: '560px',
      maxWidth: 'calc(100vw - 32px)',
      data: {
        title: 'Medium löschen',
        message: `Möchtest du "${item.title}" wirklich löschen?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }
      this.mediaService.delete(item.id).subscribe({
        next: () => this.mediaList.update(media => media.filter(m => m.id !== item.id)),
        error: (err) => console.error('Failed to delete media:', err)
      });
    });
  }
}
