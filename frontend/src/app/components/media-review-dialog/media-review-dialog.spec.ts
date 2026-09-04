import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MediaReviewDialog } from './media-review-dialog';

describe('MediaReviewDialog', () => {
  let component: MediaReviewDialog;
  let fixture: ComponentFixture<MediaReviewDialog>;
  let closeDialog: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    closeDialog = vi.fn();
    await TestBed.configureTestingModule({
      imports: [MediaReviewDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: closeDialog } },
        { provide: MAT_DIALOG_DATA, useValue: { media: { title: 'Test media' } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaReviewDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not submit an incomplete review', () => {
    component.submit();

    expect(closeDialog).not.toHaveBeenCalled();
    expect(component.reviewForm.invalid).toBe(true);
  });

  it('submits a review with the entered score and trimmed comment', () => {
    component.reviewForm.setValue({ score: 9, commentText: '  Great movie  ' });

    component.submit();

    expect(closeDialog).toHaveBeenCalledWith(expect.objectContaining({
      comment: expect.objectContaining({ commentText: 'Great movie' }),
      rating: expect.objectContaining({ score: 9 })
    }));
  });
});
