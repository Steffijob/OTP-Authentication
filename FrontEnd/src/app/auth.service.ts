import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveEmail(email:any){
    console.log(email)
    return this.http.post('http://localhost:3000/email',email)
    
  }
  checkOTP(otp:any){
    return this.http.post("http://localhost:3000/otp",otp)
  }

}
