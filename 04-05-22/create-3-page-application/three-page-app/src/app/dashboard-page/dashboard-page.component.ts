import { Component, OnInit } from '@angular/core';
import {state} from '../state';
import {Router} from "@angular/router"


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  userName:string = "";
  constructor(private router: Router) { }

  ngOnInit(): any {
    console.log(state);
    
    if(!state.userName) return this.router.navigate(['/login']);
    this.userName = state.userName;
  }

}
