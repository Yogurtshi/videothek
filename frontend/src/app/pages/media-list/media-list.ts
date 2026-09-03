
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaService } from '../../service/media';
import { Media } from '../../data/media';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.html',
  styleUrl: './media-list.scss',
  imports: [RouterLink]
})
export class MediaList implements OnInit {

  private mediaService = inject(MediaService);

  public mediaList: Media[] = [];

  ngOnInit(): void {
    this.mediaService.getList().subscribe({
      next: (media) => this.mediaList = media,
      error: (err) => console.error('Failed to load media list:', err)
    });
  }
}
