import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class DepartmentFacultiesService {

  constructor(public _http:HttpClient) { }
  apiUrl = url;

  getFaculties():Observable<any>
  {
    return this._http.get(`${this.apiUrl + "faculties"}`)
  }

  getDepartment(id:any):Observable<any>{
    return this._http.get(`${this.apiUrl + "discipline/" +  id}`);
  }


}
