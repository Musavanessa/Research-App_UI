import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-project-events',
  templateUrl: './project-events.component.html',
  styleUrls: ['./project-events.component.css'],
  
})
export class ProjectEventsComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }
  selected: Date | null | undefined;
  ngOnInit(): void {
    if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      queryParams: { message: 'Please log out first ' }
    });
  }

}
