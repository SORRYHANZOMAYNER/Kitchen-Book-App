import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { AppComponent } from './app.component';
import { StartpageComponent } from './modules/startpage/startpage.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { CreateRecipeComponent } from './modules/create-recipe/create-recipe.component';
import { PersonalPageComponent } from './modules/personal-page/personal-page.component';
import { ShowRecipeComponent } from './modules/show-recipe/show-recipe.component';
export const routes: Routes = [{path: 'login', component: AuthComponent},
{path: 'startpage', component: StartpageComponent},
{path: 'registration', component: RegistrationComponent},
{path: 'createrecipe', component: CreateRecipeComponent},
{path: 'personalpage', component: PersonalPageComponent},
{path: 'recipe/:id', component: ShowRecipeComponent },
{path: '', component: AppComponent}
];

