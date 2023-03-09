import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { convertToObject } from 'typescript';



@Injectable({
  providedIn: 'root'
})
export class GoalFilesService {

  constructor(private http: HttpClient) { }
    // apiUrl = 'http://168.172.189.59:3000/api/v1/';
    apiUrl = 'http://3.83.42.8:3000/api/v1/goal_files/';
    // apiUrl = 'http://localhost:3000/api/v1/goal_files/';

    postGoalFile(goalId:any, formData:any):Observable<any>
    {
      // console.log(goalId);
      return this.http.post(`${this.apiUrl + goalId}`, formData);
    }

    getGoalFiles(goalId:any):Observable<any>
    {
      return this.http.get(`${this.apiUrl + goalId}`);
    }
}
