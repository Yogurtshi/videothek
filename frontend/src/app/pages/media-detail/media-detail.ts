
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MediaService } from '../../service/media';
import { CommentService } from '../../service/comment';
import { RatingService } from '../../service/rating';
import { Media } from '../../data/media';
import { Comment } from '../../data/comment';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.html',
  styleUrl: './media-detail.scss',
  imports: [RouterLink]
})
export class MediaDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private mediaService = inject(MediaService);
  private commentService = inject(CommentService);
  private ratingService = inject(RatingService);

  public media = signal<Media | undefined>(undefined);
  public comments = signal<Comment[]>([]);
  public averageRating = signal<number | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      return;
    }

    this.mediaService.getOne(id).subscribe({
      next: (media) => this.media.set(media),
      error: (err) => console.error('Failed to load media:', err)
    });

    this.commentService.getByMedia(id).subscribe({
      next: (comments) => this.comments.set(comments),
      error: (err) => console.error('Failed to load comments:', err)
    });

    this.ratingService.getAverage(id).subscribe({
      next: (average) => this.averageRating.set(average),
      error: (err) => console.error('Failed to load average rating:', err)
    });
  }
}
