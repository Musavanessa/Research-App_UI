import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GoalFilesService {

  constructor(private http: HttpClient) { }
    // apiUrl = 'http://168.172.189.59:3000/api/v1/';
    apiUrl = 'http://localhost:3000/api/v1/goal_files/';

    postGoalFile(goalId:any, formData:any):Observable<any>
    {
      return this.http.post(`${this.apiUrl + goalId}`, formData);
    }
}
