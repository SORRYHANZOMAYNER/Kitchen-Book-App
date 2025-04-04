import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { environment } from '../../enviroment/enviroment';
export interface KitchenUser {  
  username: string;  
  password: string;
  name: string;
  email: string;
  surName: string;  
}  

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {} 

  register(user: KitchenUser): Observable<any> {  
      return this.http.post(`${environment.apiUrl}/register`, user); 
  }  
}
