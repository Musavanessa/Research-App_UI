import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public http:HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/';

  sendFeedback(messageObject:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl + "feedback/" + messageObject.goalId}`, messageObject);
  }

  getFeedback(goalId:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + "feedback/" + goalId}`);
  }

  getAllStudentProjectNotifications(projectId:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + "feedback/studentprojectnotifications/" + projectId}`);
  }

  CountFeedbacksForAGivenGoal(goalId:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + "feedback/CountFeedbacksForAGivenGoal/" + goalId}`)
  }


  marksFeedbackAsRead(feedbackId:any):Observable<any>
  {
    let feedbackObject = {
      projectStatusId: 5
    }
    return this.http.patch(`${this.apiUrl + "feedback/" + feedbackId}`, feedbackObject)
  }
}
