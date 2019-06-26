export class User {
  id: number;
  email: string;
  password: string;
  auth_token: string;

  constructor(obj: any){
    this.id = obj && obj.id || null;
    this.email = obj && obj.email || null;
    this.password = obj.password || null;
    this.auth_token = obj.auth_token || null;
  }
}
