import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component'
import {SignupPageComponent} from './signup-page/signup-page.component'
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component'

const routes: Routes = [
  {path:'',component:SignupPageComponent},
  {path:'signup',component:SignupPageComponent},
  {path:'login',component:LoginPageComponent},
  {path:'dashboard',component:DashboardPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
