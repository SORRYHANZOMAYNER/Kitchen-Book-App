import { Injectable } from '@angular/core';  
import { HttpClient,HttpHeaders  } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';  
import { catchError,tap  } from 'rxjs/operators';  
import { environment } from '../../enviroment/enviroment';
export interface KitchenUserLogin {  
  username: string;  
  password: string;  
}  
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) {}

  login(user: KitchenUserLogin): Observable<TokenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);

    return this.http.post<TokenResponse>(`${environment.apiUrl}/login`, body.toString(), { headers }).pipe(
      tap(response => {
        if (response) {
          console.log('Tokens received:', response);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        } else {
          console.error('Login response is null');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }
}
