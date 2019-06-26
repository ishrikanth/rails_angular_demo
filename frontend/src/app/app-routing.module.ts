import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";
import {TodoComponent} from "./todo/todo.component";
import {SignoutComponent} from "./signout/signout.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'todo', component: TodoComponent, canActivate:[AuthGuard]},
  {path: 'signout', component: SignoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
