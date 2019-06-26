import { Component, OnInit } from '@angular/core';
import {UserService} from "../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.logout();
    this.router.navigate(['/signin']);
  }
}
