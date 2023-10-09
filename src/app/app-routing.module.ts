import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
    component:HomeComponent,
    path:''
  },
  {
    component:CharactersComponent,
    path:'characters',
    canActivate:[AuthGuard]
  },
  {
    component: LoginComponent,
    path:'login'
  },
  {
    component: SignupComponent,
    path:"signup"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
