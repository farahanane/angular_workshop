import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Suggestion } from '../../models/suggestion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL
  getSuggestionList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // ✅ GET BY ID
  getSuggestionById(id: number): Observable<Suggestion> {
  return this.http
    .get<any>(`${this.suggestionUrl}/${id}`)
    .pipe(
      map(response => response.suggestion)
    );
}

  // ✅ DELETE
  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }

  // ✅ ADD
  addSuggestion(s: Suggestion): Observable<any> {
    return this.http.post(this.suggestionUrl, s);
  }

  // ✅ UPDATE
  updateSuggestion(id: number, s: Suggestion) {
  return this.http.put(`${this.suggestionUrl}/${id}`, s);
}

  // ✅ UPDATE LIKES
  updateLikes(id: number, nbLikes: number): Observable<any> {
    return this.http.patch(`${this.suggestionUrl}/${id}`, { nbLikes });
  }

}