import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'src/app/globals';


@Injectable({
  providedIn: 'root'
})
export class ProjectEventsService {

  constructor(private _http:HttpClient) { }

  apiUrl = url

  //Create an API request for creating a goal
  goalObject:any;
  // createNewGoal(): Observable<any>
  // {
  //   return this._http.
  // }

}
