import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/';

  disciplines(): Observable<any>
  {
    return this._http.get(`${this.apiUrl+"discipline"}`);     
  }

  saveProject(data: any): Observable<any>
  {
    return this._http.get(`${this.apiUrl+"projects"}`, data);     
  }
  //NOTES SERVICES
  notes(): Observable<any>
  {
      return this._http.get(`${this.apiUrl+"notes"}`);     
  }
  getNote(noteId: number) : Observable <any>
  {
      return this._http.get(`${this.apiUrl+"notes/"+ noteId}`);
  }
  guidelines(projectTypeId:number): Observable<any>
  {
     return this._http.get(`${this.apiUrl+"guidelines"}?projectTypeId=`+projectTypeId);
  }
  getGuideline(guidelineId:number): Observable<any>
  {
    return this._http.get(`${this.apiUrl+"guidelines/"+ guidelineId}`);
  }

  projects():Observable<any>
  {
    return this._http.get(`${this.apiUrl+"projects"}`);
  }
  createNewProject(data:any):Observable<any>
  {
    return this._http.post(`${this.apiUrl+"projects"}` , data);

  }
}
  