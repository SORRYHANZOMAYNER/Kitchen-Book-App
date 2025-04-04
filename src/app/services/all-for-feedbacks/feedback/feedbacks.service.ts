import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
export interface Feedback {
  content: string;
  mark: number;
  createdDate: Date;
  username: string;
  children?: Feedback[];
}

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  constructor(private http: HttpClient) { }

  getFeedbacksByRecipeId(recipeId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${environment.apiUrl}/feedback/recipe/${recipeId}`);
  }

  addFeedback(recipeId: number, feedback: Feedback): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.warn("No access token found. User might not be logged in.");
      return new Observable<any>();
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.post(`${environment.apiUrl}/feedback/${recipeId}`, feedback, { headers: headers });
  }
}
