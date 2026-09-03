import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Media } from '../../data/media';
import { MediaCategory } from '../../data/media-category';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.html',
  styleUrl: './add-media.scss',
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule]
})
export class AddMedia {
  private dialogRef = inject(MatDialogRef<AddMedia>);

  public mediaForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(255)] }),
    description: new FormControl('', { nonNullable: true, validators: Validators.maxLength(2000) }),
    director: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(255)] }),
    releaseYear: new FormControl(new Date().getFullYear(), { nonNullable: true, validators: [Validators.required, Validators.min(1888), Validators.max(2100)] }),
    length: new FormControl<number | null>(null, Validators.min(1)),
    episodeCount: new FormControl<number | null>(null, Validators.min(1)),
    mediaCategory: new FormControl(MediaCategory.MOVIE, { nonNullable: true, validators: Validators.required })
  });

  public submit(): void {
    if (this.mediaForm.invalid) {
      this.mediaForm.markAllAsTouched();
      return;
    }

    const value = this.mediaForm.getRawValue();
    const media = new Media();
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
