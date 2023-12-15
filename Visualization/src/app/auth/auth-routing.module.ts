import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponentService } from '../services/auth-component.service';

const routes: Routes = [
  {path: 'register', component: RegisterComponent, canActivate: [AuthComponentService]},
  {path: 'login', component: LoginComponent, canActivate: [AuthComponentService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
