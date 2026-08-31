import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Media } from '../data/media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  public static readonly backendUrl = 'media';

  private http = inject(HttpClient);

  public getList(): Observable<Media[]> {
    return this.http.get<Media[]>(environment.backendBaseUrl + MediaService.backendUrl);
  }

  public getOne(id: number): Observable<Media> {
    return this.http.get<Media>(environment.backendBaseUrl + MediaService.backendUrl + `/${id}`);
  }

  public save(media: Media): Observable<Media> {
    return this.http.post<Media>(environment.backendBaseUrl + MediaService.backendUrl, media);
  }

  public update(media: Media): Observable<Media> {
    return this.http.put<Media>(environment.backendBaseUrl + MediaService.backendUrl + `/${media.id}`, media);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + MediaService.backendUrl + `/${id}`, { observe: 'response' });
  }
}