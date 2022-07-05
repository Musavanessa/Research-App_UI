import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-homenavbar',
  templateUrl: './homenavbar.component.html',
  styleUrls: ['./homenavbar.component.css']
})
export class HomenavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    this.authService.logout();
    this.router.navigate(['/home']);

  }

}
