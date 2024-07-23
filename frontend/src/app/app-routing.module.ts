import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MerciComponent } from './front/merci/merci.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { AfficherUsersComponent } from './user/afficher-users/afficher-users.component';
import { AfficherProjectComponent } from './admin/afficher-project/afficher-project.component';
import { AjouterProjectComponent } from './admin/ajouter-project/ajouter-project.component';
import { ModifierProjectComponent } from './admin/modifier-project/modifier-project.component';

const routes: Routes = [

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: 'dashboard',
    component: AdminComponent,
    children: [
      { path: 'users', component: AfficherUsersComponent },
      { path: 'projects', component: AfficherProjectComponent },
      { path: 'projects/add', component: AjouterProjectComponent },
      { path: 'projects/update/:id', component: ModifierProjectComponent }
    ]
  },

  { path: 'merci', component: MerciComponent },
  
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Default to login page
  { path: '**', redirectTo: '/auth/login' } // Handle any unknown routes
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
