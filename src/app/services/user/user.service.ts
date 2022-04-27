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
}
