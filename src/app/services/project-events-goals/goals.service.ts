import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/';
  
  getAllGoalsWhere(projectId:any): Observable<any>
  {
    return this.http.get(`${this.apiUrl + "goal/whereprojectId/" + projectId}`);
  }

  goalUpdateStatus(goal:any):Observable<any>
  {
    return this.http.patch(`${this.apiUrl + "goal/" + goal.id}`, goal);
  }

}
