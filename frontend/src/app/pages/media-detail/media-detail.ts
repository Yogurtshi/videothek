
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MediaService } from '../../service/media';
import { CommentService } from '../../service/comment';
import { RatingService } from '../../service/rating';
import { Media } from '../../data/media';
import { Comment } from '../../data/comment';
import { Rating } from '../../data/rating';
import { MediaReviewDialog, MediaReviewData, MediaReviewSubmission } from '../../components/media-review-dialog/media-review-dialog';
import { MediaReview } from '../../components/media-review/media-review';
import { AppAuthService } from '../../service/app.auth.service';
import { ConfirmDialog, ConfirmDialogData } from '../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.html',
  styleUrl: './media-detail.scss',
  imports: [RouterLink, MatButtonModule, MatDialogModule, MediaReview]
})
export class MediaDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private mediaService = inject(MediaService);
  private commentService = inject(CommentService);
  private ratingService = inject(RatingService);
  private dialog = inject(MatDialog);
  private authService = inject(AppAuthService);

  public media = signal<Media | undefined>(undefined);
  public comments = signal<Comment[]>([]);
  public averageRating = signal<number | null>(null);
  public myRating = signal<Rating | null>(null);
  public username = signal('');

  public openReviewDialog(currentMedia: Media): void {
    const dialogRef = this.dialog.open<MediaReviewDialog, MediaReviewData, MediaReviewSubmission>(MediaReviewDialog, {
      width: '560px',
      maxWidth: 'calc(100vw - 32px)',
      data: { media: currentMedia }
    });

    dialogRef.afterClosed().subscribe((submission) => {
      if (!submission) {
        return;
      }

      this.commentService.save(currentMedia.id, submission.comment).subscribe({
        next: (comment) => this.comments.update(comments => [...comments, comment]),
        error: (err) => console.error('Failed to add comment:', err)
      });

      this.ratingService.save(currentMedia.id, submission.rating).subscribe({
        next: () => this.loadAverageRating(currentMedia.id),
        error: (err) => console.error('Failed to add rating:', err)
      });
    });
  }

  public openEditReviewDialog(currentMedia: Media, comment: Comment): void {
    const rating = this.myRating();
    if (!rating) {
      return;
    }

    const dialogRef = this.dialog.open<MediaReviewDialog, MediaReviewData, MediaReviewSubmission>(MediaReviewDialog, {
      width: '560px',
      maxWidth: 'calc(100vw - 32px)',
      data: { media: currentMedia, comment, rating }
    });

    dialogRef.afterClosed().subscribe((submission) => {
      if (!submission) {
        return;
      }

      this.commentService.update(comment.id, submission.comment).subscribe({
        next: (updatedComment) => this.comments.update(comments =>
          comments.map(currentComment => currentComment.id === updatedComment.id ? updatedComment : currentComment)
        ),
        error: (err) => console.error('Failed to update comment:', err)
      });

      this.ratingService.update(submission.rating).subscribe({
        next: (updatedRating) => {
          this.myRating.set(updatedRating);
          this.loadAverageRating(currentMedia.id);
        },
        error: (err) => console.error('Failed to update rating:', err)
      });
    });
  }

  public canEditComment(comment: Comment): boolean {
    return !!this.myRating() && comment.username === this.username();
  }

  public deleteComment(comment: Comment): void {
    const dialogRef = this.dialog.open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
      width: '560px',
      maxWidth: 'calc(100vw - 32px)',
      data: {
        title: 'Kommentar löschen',
        message: 'Möchtest du diesen Kommentar wirklich löschen?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.commentService.delete(comment.id).subscribe({
        next: () => this.comments.update(comments => comments.filter(currentComment => currentComment.id !== comment.id)),
        error: (err) => console.error('Failed to delete comment:', err)
      });
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      return;
    }

    this.authService.useraliasObservable.subscribe(username => this.username.set(username));

    this.mediaService.getOne(id).subscribe({
      next: (media) => this.media.set(media),
      error: (err) => console.error('Failed to load media:', err)
    });

    this.commentService.getByMedia(id).subscribe({
      next: (comments) => this.comments.set(comments),
      error: (err) => console.error('Failed to load comments:', err)
    });

    this.loadAverageRating(id);

    this.ratingService.getMine(id).subscribe({
      next: (rating) => this.myRating.set(rating),
      error: () => this.myRating.set(null)
    });
  }

  private loadAverageRating(mediaId: number): void {
    this.ratingService.getAverage(mediaId).subscribe({
      next: (average) => this.averageRating.set(average),
      error: (err) => console.error('Failed to load average rating:', err)
    });
  }
}
