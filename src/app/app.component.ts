import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalVariables} from './globals';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'frontend';
  isAuthenticated: boolean | undefined ;

  constructor(
    public auth: AuthService,
    private router: Router) { }

  showElement =  true;
  ngOnInit(): void {
    this.showElement = GlobalVariables.isToBeShown;
    console.log("It to be shown 1 " );

    this.auth.checkAuthentication(); // To  keep on checking if im logged in
    this.isAuthenticated = this.auth.isAuthenticated
  }
}


