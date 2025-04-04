import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchRecipeService, ShowRecipe } from '../../services/search/search-recipe.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FeedbacksService, Feedback } from '../../services/all-for-feedbacks/feedback/feedbacks.service';

@Component({
  selector: 'app-show-recipe',
  imports: [FormsModule, MatButton, MatProgressSpinnerModule, CommonModule],
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css']
})
export class ShowRecipeComponent implements OnInit {
  recipeId: number | null = null;
  recipe: ShowRecipe | undefined;
  loading: boolean = true;
  feedbacks: Feedback[] = [];
  commentCount: number = 0;
  isModalOpen: boolean = false;

  newContent: string = '';
  newMark: number = 0;
  newUsername: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: SearchRecipeService,
    private service: FeedbacksService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeId = id;
    this.getRecipeDetails();
    this.loadFeedbacks(id);
    console.log('Instruction Blocks:', this.recipe?.instruction);
    console.log('Recipe Image:', this.recipe?.image);
  }

  goToMainMenu() {
    this.router.navigate(['/startpage']);
  }

  getRecipeDetails(): void {
    if (this.recipeId !== null) {
      this.recipeService.getRecipeById(this.recipeId).subscribe(data => {
        this.recipe = data;
        this.loading = false;
        console.log('Recipe Data:', this.recipe);
      });
    } else {
      console.error('Invalid recipe ID');
      this.loading = false;
    }
  }

  loadFeedbacks(recipeId: number): void {
    this.service.getFeedbacksByRecipeId(recipeId).subscribe(
      feedbacks => {
        console.log(feedbacks);
        this.feedbacks = feedbacks.map(feedback => {
          console.log('Original createdDate:', feedback.createdDate);
          return {
            ...feedback,
            createdDate: new Date(feedback.createdDate)
          };
        });
        this.commentCount = this.feedbacks.length;
      },
      error => {
        console.error('Error loading feedbacks:', error);
      }
    );
  }

  openCommentModal() {
    this.isModalOpen = true;
  }

  closeCommentModal() {
    this.isModalOpen = false;
    this.newContent = '';
    this.newMark = 0;
    this.newUsername = '';
  }
  printRecipe() {
    window.print();
  }
  submitComment() {
    if (this.newContent.trim()) {
      if (this.recipeId != null) {
        const feedbackData: Feedback = {
          content: this.newContent,
          mark: this.newMark,
          username: this.newUsername,
          createdDate: new Date(),
          children: []
        };
  
        this.service.addFeedback(this.recipeId, feedbackData).pipe(
          catchError(error => {
            console.error('Error adding feedback:', error);
            return of(null); // Возвращаем пустой результат в случае ошибки
          })
        ).subscribe(
          response => {
            if (response) {
              console.log('Feedback added successfully:', response);
              this.feedbacks.push(feedbackData);
              this.commentCount++;
              this.newContent = '';
              this.closeCommentModal();
            }
          }
        );
      }
    }
  }
}
