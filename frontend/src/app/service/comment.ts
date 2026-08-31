import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Comment } from '../data/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public static readonly backendUrl = 'media';

  private http = inject(HttpClient);

  public getByMedia(mediaId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.backendBaseUrl + CommentService.backendUrl + `/${mediaId}/comments`);
  }

  public save(mediaId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(environment.backendBaseUrl + CommentService.backendUrl + `/${mediaId}/comments`, comment);
  }

  public update(id: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(environment.backendBaseUrl + 'comments' + `/${id}`, comment);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + 'comments' + `/${id}`, { observe: 'response' });
  }
}