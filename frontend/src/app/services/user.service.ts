import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) { }

  API_BASE_URL: string = "http://localhost:3002";
  TOKEN: string = "TOKEN";
  redirectUrl: string;

  registerUser(user: User){
    return this.http.post<User>(this.API_BASE_URL+ "/api/v1/sign_up.json",{user: user});
  }

  signinUser(user: User){
    return this.http.post<User>(this.API_BASE_URL+ "/api/v1/sign_in.json",{user: user});
  }

  setToken(token: string): void {
     localStorage.setItem(this.TOKEN, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN);
  }

  isLogged() {
    return localStorage.getItem(this.TOKEN)!=null;
  }
}
