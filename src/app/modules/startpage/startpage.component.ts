import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';  
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SearchRecipeService,ShowRecipe } from '../../services/search/search-recipe.service';
import { Category, CategoryService } from '../../services/category/category.service.service';
import { UpdateUserService,KitchenUserLogin } from '../../services/update-user/update-user.service';
@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.css',
  imports: [MatToolbarModule,MatCardModule,MatListModule,RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatMenuModule, MatIconModule, MatCheckboxModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartpageComponent {
  logout() {
    this.router.navigate(['/createrecipe']); 
  } 
  currentUser: KitchenUserLogin | null = null; 
  searchTerm: string = '';
  errorMessage: string = '';
  recipes: ShowRecipe[] = [];
  filteredRecipes: ShowRecipe[] = [];
  categories: Category[] = [];
  constructor(private router: Router,private recipeService: SearchRecipeService,private categoryService: CategoryService,private userServ: UpdateUserService) {}   
  
  goToCreateRecipe() {
    this.router.navigate(['/createrecipe']); 
  }
  goToPersonalPage(){
    this.router.navigate(['/personalpage']); 
  }
  goToRecipe(recipeId: number): void {  
    console.log('Navigating to recipe with ID:', recipeId);
    this.recipeService.getRecipeById(recipeId).subscribe((returnedRecipe: ShowRecipe) => {  
        this.router.navigate(['/recipe', returnedRecipe.id]);  
    });  
  } 
  ngOnInit(): void {
    this.loadRecipes();
    this.loadCategories();
    this.loadCurrentUser();
    console.log("User: " + this.currentUser?.name);
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.errorMessage = 'Ошибка загрузки категорий: ' + error.message;
      },
    });
  }
  searchRecipes(): void {
    if (this.searchTerm.trim() !== '') {
      this.recipeService.searchRecipes(this.searchTerm)
        .subscribe({
          next: (recipes: ShowRecipe[]) => {
            this.recipes = recipes;
            this.filterRecipes(); 
          },
          error: (error: any) => {
            console.error('Error fetching recipes:', error);
          }
        });
    } else {
      this.recipes = [];
      this.filterRecipes(); 
    }
  }
  loadCurrentUser() {  
    this.userServ.getCurrentUser().subscribe({  
      next: (user) => {  
        console.log('Полученные данные пользователя:', user);
        this.currentUser = user;  
        console.log('currentUser:', this.currentUser);
      },  
      error: (error) => {  
        console.error('Ошибка загрузки пользователя:', error);  
      }  
    });  
  }
  onSearch(): void {
    this.filterRecipes(); 
  }

  loadRecipes(): void {
    this.recipeService.getAllRecypes().subscribe({ 
      next: (data) => {
        this.recipes = data;
        this.filterRecipes(); 
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.errorMessage = 'Ошибка загрузки рецептов: ' + error.message;
      }
    });
  }

  filterRecipes(category?: Category): void {
      let filtered = [...this.recipes];

    
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        filtered = filtered.filter(recipe =>
          recipe.title.toLowerCase().includes(searchTermLower)
        );
      }
      if (category) {
        filtered = filtered.filter(recipe =>
          recipe.categories.some(cat => cat.id === category.id)
        );
      }

      this.filteredRecipes = filtered;
  }
  
}  