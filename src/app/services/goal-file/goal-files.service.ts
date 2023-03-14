import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { convertToObject } from 'typescript';
import { url } from 'src/app/globals';



@Injectable({
  providedIn: 'root'
})
export class GoalFilesService {

  constructor(private http: HttpClient) { }

    apiUrl = url;


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
