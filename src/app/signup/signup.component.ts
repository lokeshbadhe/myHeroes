import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { signup } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

ngOnInit(): void {
  this.users.reloadUser()
}
  constructor(private users:UserService){

  }
  signUp(data:signup){
    // console.log(data)
    this.users.userSignUp(data)

  }


}