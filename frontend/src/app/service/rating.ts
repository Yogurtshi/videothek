import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Rating } from '../data/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  public static readonly backendUrl = 'media';

  private http = inject(HttpClient);

  public save(mediaId: number, rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(environment.backendBaseUrl + RatingService.backendUrl + `/${mediaId}/ratings`, rating);
  }

  public getMine(mediaId: number): Observable<Rating> {
    return this.http.get<Rating>(environment.backendBaseUrl + RatingService.backendUrl + `/${mediaId}/ratings/me`);
  }

  public update(rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(environment.backendBaseUrl + 'ratings' + `/${rating.id}`, rating);
  }

  public getAverage(mediaId: number): Observable<number> {
    return this.http.get<number>(environment.backendBaseUrl + RatingService.backendUrl + `/${mediaId}/ratings/average`);
  }
}