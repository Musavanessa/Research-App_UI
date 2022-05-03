import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatboxServiceService {

  constructor(public _http:HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/';

  //Get All Chats
  chat_groups(): Observable<any>
  {
    let data = 3;
    return this._http.get(`${this.apiUrl+"chat_groups/discipline/1"}`);
  }

}