import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MediaReview } from './media-review';

describe('MediaReview', () => {
  let component: MediaReview;
  let fixture: ComponentFixture<MediaReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaReview],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { media: { title: 'Test media' } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
