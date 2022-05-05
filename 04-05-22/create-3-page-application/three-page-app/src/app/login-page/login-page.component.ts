import { Component, OnInit } from '@angular/core';
import {state} from '../state'
import {Router} from "@angular/router"

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  userName:string = '';
  passWord:string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    let isFound:boolean = false;
    state.users.forEach(user => {
      if(user.userName === this.userName && user.passWord === user.passWord){
        isFound = true;
        state.userName = user.userName;
        this.router.navigate(['/dashboard']);
        return;
      }
    });
    if(!isFound)alert("invalid credentials");
  }

}
