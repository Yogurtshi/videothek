import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaReview } from './media-review';

describe('MediaReview', () => {
  let component: MediaReview;
  let fixture: ComponentFixture<MediaReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaReview],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
