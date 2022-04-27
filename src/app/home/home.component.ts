import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // if(this.authService.isAuthenticated) 
    //   this.router.navigate(['/dashboard'],{queryParams:{ message: 'Please log out first '}});
    //I guess the one thing that we need to do is to make sure that we remove everything that the user has created
  }

}
