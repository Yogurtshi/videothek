
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MediaService } from '../../service/media';
import { Media } from '../../data/media';
import { MatCardModule } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.html',
  styleUrl: './media-list.scss',
  imports: [MatCardModule, MatIconButton, MatIcon, MatChip, MatChipSet, RouterLink]
})
export class MediaList implements OnInit {

  private mediaService = inject(MediaService);
  private router = inject(Router);

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
