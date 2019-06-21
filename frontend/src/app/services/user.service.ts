import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) { }

  API_BASE_URL: string = "http://localhost:3002";

  registerUser(user: User){
    return this.http.post(this.API_BASE_URL+ "/users",{user: user});
  }

  signinUser(user: User){
    return this.http.post(this.API_BASE_URL+ "/users/sign_in",{user: user});
  }
}



