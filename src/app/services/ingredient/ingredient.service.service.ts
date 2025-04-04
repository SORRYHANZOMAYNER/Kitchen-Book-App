import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
export interface Ingredient {  
  id: number; 
  name: string;  
  description: string;  
  unit: string; 
  price: number;
  children?: Ingredient[]; 
} 
@Injectable({
  providedIn: 'root'
})
export class IngredientServiceService {

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.apiUrl}/ingredient`);
  }
}
