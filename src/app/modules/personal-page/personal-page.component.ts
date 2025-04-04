import { ChangeDetectionStrategy,Component,Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormBuilder,FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { KitchenUserLogin } from '../../services/update-user/update-user.service';
import { UpdateUserService } from '../../services/update-user/update-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http'; 
@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.css',
  imports: [ReactiveFormsModule,RouterModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatMenuModule, MatIconModule, MatCheckboxModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalPageComponent {
  profileForm: FormGroup;  
  currentUser: KitchenUserLogin | null = null;  
  constructor(private renderer: Renderer2,private router: Router, private userServ: UpdateUserService, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.profileForm = this.fb.group({  
      telephoneNumber: [''],  
      email: [''],  
      name: [''],  
      surName: [''],  
    });  
  }
  imageUrl: string | ArrayBuffer | null = null;
  onButtonClick() {
    const fileInput = this.renderer.selectRootElement('#file-input');
    fileInput.click();
  }
  onFileSelected(event: Event) {  
    const input = event.target as HTMLInputElement;  
    if (input.files && input.files.length > 0) {  
        const file = input.files[0];  
        const reader = new FileReader();  
        
        reader.onload = (e: any) => {  
          if (this.currentUser) {
            this.currentUser.userImage = e.target.result;
            this.openSnackBar('Не забудьте нажать "Сохранить изменения" для сохранения фото.', 'Закрыть');
          }
        };  

        reader.readAsDataURL(file); 
    }  
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, 
      horizontalPosition: 'center', 
      verticalPosition: 'bottom', 
    });
  }
  ngOnInit(): void {  
    this.loadCurrentUser();  
  }  

  loadCurrentUser() {  
    this.userServ.getCurrentUser().subscribe({  
      next: (user) => {  
        this.currentUser = user;  
        this.profileForm.patchValue(user);   
      },  
      error: (error) => {  
        console.error('Ошибка загрузки пользователя:', error);  
      }  
    });  
  }  

  saveChanges(): void {  
    const updatedUser: KitchenUserLogin = {  
      ...this.currentUser, 
      ...this.profileForm.value 
    };  
    console.log('Отправляемые данные:', updatedUser);
    this.userServ.update(updatedUser).subscribe({  
      next: (response) => {  
        this.openSnackBar('Данные успешно обновлены!', 'Закрыть');  
      },  
      error: (error) => {  
        this.openSnackBar(`Ошибка обновления: ${error.message}`, 'Закрыть');  
      },  
      complete: () => {  
        console.log('Процесс обновления завершен');  
      }  
    });  
  }  

  goBack(): void {
    this.router.navigate(['/startpage']);
  }
}
