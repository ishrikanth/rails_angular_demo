import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";
import {TodoComponent} from "./todo/todo.component";
import {SignoutComponent} from "./signout/signout.component";
import {AuthGuard} from "./auth/auth.guard";
import {PolicyListComponent} from "./policy-list/policy-list.component";
import {WeatherComponent} from "./weather/weather.component";
import {MapComponent} from "./map/map.component";

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'todo', component: TodoComponent, canActivate:[AuthGuard]},
  {path: 'signout', component: SignoutComponent},
  {path: 'policy', component: PolicyListComponent, canActivate:[AuthGuard]},
  {path: 'weather', component: WeatherComponent},
  {path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
