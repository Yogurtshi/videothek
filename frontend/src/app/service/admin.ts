import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Media } from '../data/media';
import { Comment } from '../data/comment';
import { AdminStats } from '../data/admin-stats';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public static readonly backendUrl = 'admin';

  private http = inject(HttpClient);

  public getAllMedia(): Observable<Media[]> {
    return this.http.get<Media[]>(environment.backendBaseUrl + AdminService.backendUrl + '/media');
  }

  public getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.backendBaseUrl + AdminService.backendUrl + '/comments');
  }

  public getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(environment.backendBaseUrl + AdminService.backendUrl + '/stats');
  }

  public deleteComment(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + AdminService.backendUrl + `/comments/${id}`, { observe: 'response' });
  }
}