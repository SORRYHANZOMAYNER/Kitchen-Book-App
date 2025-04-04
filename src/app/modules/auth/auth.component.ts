import { Component } from '@angular/core';  
import { Router } from '@angular/router';  
import { UserLoginService, KitchenUserLogin } from '../../services/login/user-login.service';  
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
@Component({  
  selector: 'app-auth',
  standalone: true,  
  imports: [FormsModule,CommonModule, RouterModule],  
  templateUrl: './auth.component.html',  
  styleUrls: ['./auth.component.css'],  
})  
export class AuthComponent {  
    username: string = '';  
    password: string = '';  
    message: string = ''; 

    constructor(private router: Router, private userServ: UserLoginService) {}  
    onLogin(): void {
      const user: KitchenUserLogin = {
        username: this.username,
        password: this.password,
      };
  
      this.userServ.login(user).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.message ='Successful login';
          this.router.navigate(['/startpage']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.message = error.error?.message || 'Unknown error';
        },
        complete: () => {
          console.log('Login process completed');
        }
      });
  }  
}