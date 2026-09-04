import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { Media } from '../data/media';
import { MediaService } from './media';

describe('MediaService', () => {
  let service: MediaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(MediaService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets the media list', () => {
    const media = [new Media()];
    service.getList().subscribe(result => expect(result).toEqual(media));

    const request = http.expectOne(environment.backendBaseUrl + 'media');
    expect(request.request.method).toBe('GET');
    request.flush(media);
  });

  it('gets one medium by id', () => {
    const media = new Media();
    media.id = 7;
    service.getOne(media.id).subscribe(result => expect(result).toEqual(media));

    const request = http.expectOne(environment.backendBaseUrl + 'media/7');
    expect(request.request.method).toBe('GET');
    request.flush(media);
  });

  it('saves a medium', () => {
    const media = new Media();
    media.title = 'Inception';
    service.save(media).subscribe(result => expect(result).toEqual(media));

    const request = http.expectOne(environment.backendBaseUrl + 'media');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(media);
    request.flush(media);
  });

  it('updates a medium by id', () => {
    const media = new Media();
    media.id = 7;
    service.update(media).subscribe(result => expect(result).toEqual(media));

    const request = http.expectOne(environment.backendBaseUrl + 'media/7');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(media);
    request.flush(media);
  });

  it('deletes a medium by id', () => {
    service.delete(7).subscribe(response => expect(response.status).toBe(204));

    const request = http.expectOne(environment.backendBaseUrl + 'media/7');
    expect(request.request.method).toBe('DELETE');
    request.flush('', { status: 204, statusText: 'No Content' });
  });
});
