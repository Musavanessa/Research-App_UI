import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: User = new User;
  errors: any = [];
  pCheck: string ='';

  constructor(private authService:AuthService,private router: Router ) { }

  ngOnInit(): void {
  }


  checkPassword():void{this.pCheck = this.signUpForm.password !== this.signUpForm.confirmPassword ? 'Password does not match' : '' }

  signUp(){

    // console.log('Welcome to signUp')
    // this.authService.signUp(this.signUpForm).subscribe(data => {
    //   console.log(data)
    // }, err => {
    //   console.log('Hello from errors', err)
    // })


    this.authService.signUp(this.signUpForm).subscribe({
      next: data => {
        console.log('Sign in data:',data)
        var newData:any = data;
        console.log(newData.status);
        this.errors = [];
        if(newData.status == "success")
        {
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        this.errors[0] = err.message;
      }
    })
  }

}
