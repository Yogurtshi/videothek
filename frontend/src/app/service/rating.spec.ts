import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { Rating } from '../data/rating';
import { RatingService } from './rating';

describe('RatingService', () => {
  let service: RatingService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(RatingService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets the current user rating', () => {
    const rating = new Rating();
    rating.score = 8;
    service.getMine(4).subscribe(result => expect(result).toEqual(rating));

    const request = http.expectOne(environment.backendBaseUrl + 'media/4/ratings/me');
    expect(request.request.method).toBe('GET');
    request.flush(rating);
  });

  it('saves a rating for a medium', () => {
    const rating = new Rating();
    rating.score = 8;
    service.save(4, rating).subscribe(result => expect(result).toEqual(rating));

    const request = http.expectOne(environment.backendBaseUrl + 'media/4/ratings');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(rating);
    request.flush(rating);
  });

  it('gets the average rating', () => {
    service.getAverage(4).subscribe(result => expect(result).toBe(8.5));

    const request = http.expectOne(environment.backendBaseUrl + 'media/4/ratings/average');
    expect(request.request.method).toBe('GET');
    request.flush(8.5);
  });
});
