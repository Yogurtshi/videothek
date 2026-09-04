import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MediaReviewDialog } from './media-review-dialog';

describe('MediaReviewDialog', () => {
  let component: MediaReviewDialog;
  let fixture: ComponentFixture<MediaReviewDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaReviewDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
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
});
