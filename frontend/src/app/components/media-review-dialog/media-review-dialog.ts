import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { Media } from '../../data/media';
import { Comment } from '../../data/comment';
import { Rating } from '../../data/rating';

export interface MediaReviewSubmission { comment: Comment; rating: Rating; }
export interface MediaReviewData { media: Media; comment?: Comment; rating?: Rating; }

@Component({
  selector: 'app-media-review-dialog',
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSliderModule],
  templateUrl: './media-review-dialog.html',
  styleUrl: './media-review-dialog.scss',
})
export class MediaReviewDialog {
  private dialogRef = inject(MatDialogRef<MediaReviewDialog>);
  public data = inject<MediaReviewData>(MAT_DIALOG_DATA);
  public media = this.data.media;
  public isEditMode = !!this.data.comment && !!this.data.rating;

  public reviewForm = new FormGroup({
    score: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(10)]),
    commentText: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(1000)] })
  });

  constructor() {
    if (this.isEditMode) {
      this.reviewForm.patchValue({ score: this.data.rating!.score, commentText: this.data.comment!.commentText });
    }
  }

  public submit(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }
    const value = this.reviewForm.getRawValue();
    const comment = new Comment();
    if (this.data.comment) comment.id = this.data.comment.id;
    comment.commentText = value.commentText.trim();
    const rating = new Rating();
    if (this.data.rating) rating.id = this.data.rating.id;
    rating.score = value.score!;
    this.dialogRef.close({ comment, rating } satisfies MediaReviewSubmission);
  }

  public cancel(): void { this.dialogRef.close(); }
}
