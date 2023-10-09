import { Component } from '@angular/core';
import { login, signup } from '../data-type';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private users:UserService){

  }
  authError:string='';

  logIn(data:signup){
    console.log(data)
    this.users.userLogIn(data)
    this.users.isLoggingError.subscribe((isError)=>{
      if(isError){
        this.authError= "Invalid Credentials";
      }

    })

  }
}
