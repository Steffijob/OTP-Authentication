import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  User = {
    otp: '',
  };

  constructor(private _auth:AuthService,private _route:Router ) { }

  ngOnInit(): void {
  }

  Verify(){
    this._auth.checkOTP({email:localStorage.getItem("email"),otp:this.User.otp}).subscribe((data)=>{
      if(data != null){
        alert("Success")
        this._route.navigate(['welcome'])
      }
      else{
        alert("Failed")
      }
      
    })


  }

}