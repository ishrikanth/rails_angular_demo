import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AlertService, UserService} from "../services";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(public formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private router: Router) {
  }


  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  get f() { return this.signinForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.signinUser(this.signinForm.value).pipe(first())
      .subscribe(
        data => {
          if(data.auth_token!=null){
            this.userService.setToken(data.auth_token);
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/todo']);
          } else {
            this.alertService.error("Login Failed");
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
