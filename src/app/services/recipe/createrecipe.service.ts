import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs'; 
import { Category } from '../category/category.service.service'; 
import { Ingredient } from '../ingredient/ingredient.service.service';
import { environment } from '../../enviroment/enviroment';
export interface InstructionBlock { 
  recipeId:number; 
  urlImage: string;  
  partInstructions: string;  
} 
  
export interface Recipe {  
  id?:number;
  title: string;  
  description: string;  
  cookingTime: string;  
  image: string;  
  quantityPortion: number;  
  categories: Category[]; 
  ingredients: Ingredient[]; 
  instructionBlocks: InstructionBlock[]; 
} 

@Injectable({  
  providedIn: 'root'  
})  
export class CreateRecipeService {  
  
  constructor(private http: HttpClient) {}   
  
  register(recipe: Recipe): Observable<any> { 
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.warn("No access token found. User might not be logged in.");
      return new Observable<any>();
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
      return this.http.post(`${environment.apiUrl}/recipe/me`, recipe, { headers: headers });   
  }  
  sendNewBlock(block: InstructionBlock): Observable<any> {
    return this.http.post(`${environment.apiUrl}/instruction/${block.recipeId}`, block);
  }
  
}