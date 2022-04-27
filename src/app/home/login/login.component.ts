import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: User = new User;
  errors: any = [];


  constructor(
    private authService: AuthService, 
    private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit(): void {

    if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      queryParams: { message: 'Please log out first ' }
    });
  }


  logIn() {


    // 
    // this.authService.logIn(this.loginForm).subscribe(data => {
    //   console.log(data)
    //   this.errors = []

    // }, err => {
    //   console.log(err)
    //   this.errors[0] = err.message 
    // })

    this.authService.logIn(this.loginForm).subscribe({
      next: data => {
        console.log(data);
        this.appComponent.isAuthenticated = true;
        this.router.navigate(['/dashboard'], {
          queryParams: { message: 'You logged in successfully ' }
        });
        this.errors = [];

      },
      error: err => {
        console.log(err)
        this.errors[0] = err.message
      }
    })


  }


}