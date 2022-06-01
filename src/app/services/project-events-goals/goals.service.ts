import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/';
  openedGoalFeedback:any;
  isGoalFeedbackOpened = false;
  indexOfGoalToReply = 0;

  
  getAllGoalsWhere(projectId:any): Observable<any>
  {
    return this.http.get(`${this.apiUrl + "goal/whereprojectId/" + projectId}`);
  }

  goalUpdateStatus(goal:any):Observable<any>
  {
    return this.http.patch(`${this.apiUrl + "goal/" + goal.id}`, goal);
  }


  setGoalFeedbackOpened(goal:any, index:any){
    this.isGoalFeedbackOpened = true;
    this.openedGoalFeedback = goal;
    this.indexOfGoalToReply = index;
  }

  getIsGoalFeedbackOpened()
  {
    return this.isGoalFeedbackOpened;
  }

  getGoalFeedbackOpened()
  {
    return this.openedGoalFeedback;
  }

  getIndexOfGoalToReply()
  {
    return this.indexOfGoalToReply;
  }

}
