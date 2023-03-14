import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { url } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  URL: string = `${url}users`;

  

  constructor(private http:HttpClient) { }

  getAllSupervisors(disciplineId:any):Observable<any>
  {
    return this.http.get<any>(this.URL+'/getAllSupervisors/' + disciplineId);
  }

  adminGetNewUsers(disciplineId:any):Observable<any>
  {
    return this.http.get<any>(this.URL+'/adminGetNewUsers/' + disciplineId);
  }
 
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

  getUser_():Observable<any>
  {
    return this.http.get<any>(this.URL+'/getUser');
  }
  getUserID()
  {
    this.getUser().subscribe((data: any) => {
      UserService.userData = data.user;
      UserService.userType = data.user.userType;
      UserService.userId = data.user.id;
    });
  }

  getAllUsersWhere(supervisorId:any): Observable<any>
  {
    return this.http.get(`${this.URL + "/getAllUsersWhere/" + supervisorId}`);
  }

  makeAdmin(user:any):Observable<any>
  {
    // let admin = {id:1, idNumber:'9511275418082'}
    return this.http.patch(`${this.URL + "/makeAdmin"}`, user);
  }
}
