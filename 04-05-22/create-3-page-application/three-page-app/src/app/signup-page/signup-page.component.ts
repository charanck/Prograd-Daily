import { Component, OnInit } from '@angular/core';
import {state} from '../state';
import {Router} from "@angular/router"


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  userName:string = '';
  passWord:string = '';
  confirmPassWord:string= '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    if(this.passWord !== this.confirmPassWord) return alert("Password doesnt match!!!");
    state.users.push({userName:this.userName,passWord:this.passWord});
    state.userName = this.userName;
    console.log(state);
    
    this.router.navigate(['/login']);    
  }

}
