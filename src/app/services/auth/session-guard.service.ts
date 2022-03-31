import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardService implements CanActivate {


  constructor(private router: Router, private auth: AuthService) { }


  canActivate(): boolean {

    if (this.auth.isAuthenticated) { return true; }

    this.router.navigate(['/login'], {
      queryParams: { message: 'Please login to gain access' }
    });
    return false;
  }
}