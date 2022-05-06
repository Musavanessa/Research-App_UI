import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = `http://localhost:3000/api/v1/users`

  constructor(private http:HttpClient) { }

 
  getUser():Observable<User>{
    return this.http.get<User>(this.URL+'/getUser');
  }

  static userData: any;
  static userType: string;
  static userId: any;
  getMe(){

    this.getUser().subscribe((data: any) => {
      UserService.userData = data.user;
      UserService.userType = data.user.userType;
    });
    // UserService.userType = this.getUserType();
  }

  getUserID()
  {
    this.getUser().subscribe((data: any) => {
      UserService.userData = data.user;
      UserService.userType = data.user.userType;
      UserService.userId = data.user.id;
    });
  }
}
