import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { Comment } from '../data/comment';
import { CommentService } from './comment';

describe('CommentService', () => {
  let service: CommentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CommentService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets comments for a medium', () => {
    const comments = [new Comment()];
    service.getByMedia(4).subscribe(result => expect(result).toEqual(comments));

    const request = http.expectOne(environment.backendBaseUrl + 'media/4/comments');
    expect(request.request.method).toBe('GET');
    request.flush(comments);
  });

  it('saves a comment for a medium', () => {
    const comment = new Comment();
    comment.commentText = 'Good film';
    service.save(4, comment).subscribe(result => expect(result).toEqual(comment));

    const request = http.expectOne(environment.backendBaseUrl + 'media/4/comments');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(comment);
    request.flush(comment);
  });

  it('deletes a comment by id', () => {
    service.delete(9).subscribe(response => expect(response.status).toBe(204));

    const request = http.expectOne(environment.backendBaseUrl + 'comments/9');
    expect(request.request.method).toBe('DELETE');
    request.flush('', { status: 204, statusText: 'No Content' });
  });
});
