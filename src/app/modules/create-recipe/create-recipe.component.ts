import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CreateRecipeService, Recipe, InstructionBlock } from '../../services/recipe/createrecipe.service';
import { Router } from '@angular/router';
import { Category, CategoryService } from '../../services/category/category.service.service';
import { Ingredient, IngredientServiceService } from '../../services/ingredient/ingredient.service.service';

@Component({
  selector: 'app-create-recipe',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatMenuModule, MatIconModule, MatCheckboxModule, FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipeComponent implements OnInit {
  recipe: Recipe = {
    title: '',
    description: '',
    cookingTime: '',
    image: '',
    quantityPortion: 0,
    categories: [],
    ingredients: [],
    instructionBlocks: []
  };

  categories: Category[] = [];
  ingredients: Ingredient[] = [];
  newInstructionBlock: InstructionBlock = {
    recipeId: 0,
    urlImage: '',
    partInstructions: ''
  };

  constructor(private router: Router, private recipeService: CreateRecipeService, private categoryService: CategoryService, private ingredientService: IngredientServiceService) {}

  goToStart() {
    this.router.navigate(['/startpage']);
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  trackByCategory(index: number, category: Category): any {
    return category.name;
  }

  trackByIngredient(index: number, ingredient: Ingredient): any {
    return ingredient.name;
  }

  addInstructionBlock() {
    this.recipe.instructionBlocks.push({
      recipeId: 0,
      urlImage: '',
      partInstructions: ''
    });
  }

  deleteInstructionBlock(index: number) {
    this.recipe.instructionBlocks.splice(index, 1);
  }

  onFileSelected(event: Event, blockIndex?: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (blockIndex !== undefined) {
          this.recipe.instructionBlocks[blockIndex].urlImage = e.target.result;
        } else {
          this.recipe.image = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const recipeWithoutBlocks = { ...this.recipe, instructionBlocks: [] };
    this.recipeService.register(recipeWithoutBlocks).subscribe({
      next: (createdRecipe: any) => {
        const recipeId = createdRecipe.id;
        this.recipe.instructionBlocks.forEach(block => {
          this.recipeService.sendNewBlock({ ...block, recipeId }).subscribe({
            next: () => {
              console.log('Instruction block saved successfully');
            },
            error: (err) => {
              console.error('Error saving instruction block:', err);
            }
          });
        });

        this.router.navigate(['/startpage']);
      },
      error: (err) => {
        console.error('Error registering recipe:', err);
      }
    });
  }
}
