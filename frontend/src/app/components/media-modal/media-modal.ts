import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Media } from '../../data/media';
import { MediaCategory } from '../../data/media-category';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.html',
  styleUrl: './media-modal.scss',
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule]
})
export class MediaModal {
  private dialogRef = inject(MatDialogRef<MediaModal>);
  private dialogData = inject<Media | null>(MAT_DIALOG_DATA, { optional: true });

  public mediaForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(255)] }),
    description: new FormControl('', { nonNullable: true, validators: Validators.maxLength(2000) }),
    director: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(255)] }),
    releaseYear: new FormControl(new Date().getFullYear(), { nonNullable: true, validators: [Validators.required, Validators.min(1888), Validators.max(2100)] }),
    length: new FormControl<number | null>(null, Validators.min(1)),
    episodeCount: new FormControl<number | null>(null, Validators.min(1)),
    mediaCategory: new FormControl(MediaCategory.MOVIE, { nonNullable: true, validators: Validators.required })
  });

  public isEditMode = this.dialogData !== null;

  constructor() {
    if (this.dialogData) {
      this.mediaForm.patchValue({
        title: this.dialogData.title,
        description: this.dialogData.description,
        director: this.dialogData.director,
        releaseYear: this.dialogData.releaseYear,
        length: this.dialogData.length ?? null,
        episodeCount: this.dialogData.episodeCount ?? null,
        mediaCategory: this.dialogData.mediaCategory as MediaCategory
      });
    }
  }

  public submit(): void {
    if (this.mediaForm.invalid) {
      this.mediaForm.markAllAsTouched();
      return;
    }

    const value = this.mediaForm.getRawValue();
    const media = new Media();
    if (this.dialogData) {
      media.id = this.dialogData.id;
    }
    media.title = value.title.trim();
    media.description = value.description.trim();
    media.director = value.director.trim();
    media.releaseYear = value.releaseYear;
    media.length = value.length ?? undefined;
    media.episodeCount = value.episodeCount ?? undefined;
    media.mediaCategory = value.mediaCategory;
    this.dialogRef.close(media);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
