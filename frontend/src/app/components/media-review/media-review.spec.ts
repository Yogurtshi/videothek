import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaReview } from './media-review';
import { Comment } from '../../data/comment';
import { AppAuthService } from '../../service/app.auth.service';
import { of } from 'rxjs';

describe('MediaReview', () => {
  let component: MediaReview;
  let fixture: ComponentFixture<MediaReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaReview],
      providers: [{ provide: AppAuthService, useValue: { getRoles: () => of([]) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaReview);
    fixture.componentRef.setInput('comment', Object.assign(new Comment(), { commentText: 'Test comment' }));
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
