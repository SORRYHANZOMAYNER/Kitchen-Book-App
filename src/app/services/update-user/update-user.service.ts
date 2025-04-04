import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs'; 
import { environment } from '../../enviroment/enviroment';
export interface KitchenUserLogin { 
   userImage?: string; 
   telephoneNumber: string;  
   email: string;  
   name: string;  
   surName: string;  
}
@Injectable({
  providedIn: 'root'
})

export class UpdateUserService {
  
    constructor(private http: HttpClient) {} 


    getCurrentUser(): Observable<KitchenUserLogin> {
      const accessToken = localStorage.getItem('accessToken')
  
      if (!accessToken) {
        console.warn("No access token found.  User might not be logged in.");
        return new Observable<KitchenUserLogin>(); 
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}` 
      });
  
      return this.http.get<KitchenUserLogin>(`${environment.apiUrl}/userme`, { headers: headers });
    } 


    update(user: KitchenUserLogin): Observable<any> {  
      const accessToken = localStorage.getItem('accessToken')
  
      if (!accessToken) {
        console.warn("No access token found.  User might not be logged in.");
        return new Observable<KitchenUserLogin>(); 
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}` 
      });
      return this.http.put(`${environment.apiUrl}/user/me`,user,{ headers: headers });  
    }
}
