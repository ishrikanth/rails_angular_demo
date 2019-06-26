import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AlertService, UserService} from "./services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';

  constructor(private userService: UserService) {
  }

  isLogged(){
  return this.userService.isLogged();
  }
}
