import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public http:HttpClient) { }
  apiUrl = 'https://researcher-dna-api.herokuapp.com/api/v1/';

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

  supervisorGetAllStudentProjectNotifications(userDetails:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + "feedback/supervisorGetAllStudentProjectNotifications/" + userDetails.id + "/" + userDetails.user.id}`);
  }

  CountFeedbacksForAGivenGoal(goalId:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + "feedback/CountFeedbacksForAGivenGoal/" + goalId}`)
  }

  getAllSupervisorProjectNotifications(projectId:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + "feedback/getAllSupervisorProjectNotifications/" + projectId}`)
  }

  marksFeedbackAsRead(feedbackId:any):Observable<any>
  {
    let feedbackObject = {
      projectStatusId: 5
    }
    return this.http.patch(`${this.apiUrl + "feedback/" + feedbackId}`, feedbackObject)
  }
}
