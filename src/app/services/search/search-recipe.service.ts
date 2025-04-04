import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../category/category.service.service'; 
import { Ingredient } from '../ingredient/ingredient.service.service';
import { Feedback } from '../all-for-feedbacks/feedback/feedbacks.service';
import { InstructionBlock } from '../recipe/createrecipe.service';
import { environment } from '../../enviroment/enviroment';
export interface ShowRecipe {  
  id:number;
  title: string;  
  description: string;  
  cookingTime: string;  
  image: string;  
  quantityPortion: number; 
  instruction: InstructionBlock[];   
  categories: Category[]; 
  ingredients: Ingredient[]; 
  feedback: Feedback[];
  name: string;
  surname: string;
  createdDate: string; 
  lastModifiedDate: string;
}
@Injectable({
  providedIn: 'root'
})
export class SearchRecipeService {
  constructor(private http: HttpClient) { }

  searchRecipes(searchTerm: string): Observable<ShowRecipe[]> {
    const params = new HttpParams().set('searchTerm', searchTerm); 
    return this.http.get<ShowRecipe[]>(`${environment.apiUrl}/recipe`, { params: params });
  }
  getRecipeById(id: number): Observable<ShowRecipe> {  
      return this.http.get<ShowRecipe>(`${environment.apiUrl}/recipe/${id}`); 
    }  
  getAllRecypes(): Observable<ShowRecipe[]> {
    return this.http.get<ShowRecipe[]>(`${environment.apiUrl}/recipe`);
  } 
}
