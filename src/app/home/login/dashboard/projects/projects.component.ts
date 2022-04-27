import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      queryParams: { message: 'Please log out first ' }
    });
  }



}
    
