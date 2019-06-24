import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { UserService, AlertService } from "../services/";
import {first} from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(public formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private router: Router) {


  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.registerUser(this.registerForm.value).pipe(first())
      .subscribe(
        data => {
          this.userService.setToken(data.auth_token);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/todo']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
