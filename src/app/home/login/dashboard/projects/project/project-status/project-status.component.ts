import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      queryParams: { message: 'Please log out first ' }
    });
  }

}
