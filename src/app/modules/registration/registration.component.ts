import { Component } from '@angular/core';  
import { Router,RouterModule} from '@angular/router';  
import { KitchenUser } from '../../services/user/user-service.service';  
import { UserServiceService } from '../../services/user/user-service.service';  
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
@Component({  
  selector: 'app-registration',  
  imports: [FormsModule,CommonModule,RouterModule],  
  templateUrl: './registration.component.html',  
  styleUrls: ['./registration.component.css'],  
})  
export class RegistrationComponent {  
    username: string = '';  
    password: string = '';  
    email: string = '';   
    name: string='';  
    surName: string='';  
    message: string = ''; 

    constructor(private router: Router, private userServ: UserServiceService) {}  

    onSubmit() {  
        const user: KitchenUser = {  
            username: this.username,  
            password: this.password,  
            email: this.email,  
            name: this.name,  
            surName: this.surName  
        };  

        this.userServ.register(user).subscribe({  
          next: (response) => {  
            console.log('Регистрация успешна:', response);  
            this.message = response.message; 
            this.router.navigate(['/login']);  
          },  
          error: (error) => {  
            console.error('Ошибка регистрации:', error);  
            this.message = error.error.message; 
          },  
          complete: () => {  
            console.log('Registration process completed');  
          }  
        });  
    }  
}