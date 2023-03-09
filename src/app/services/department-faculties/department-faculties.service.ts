import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentFacultiesService {

  constructor(public _http:HttpClient) { }
  apiUrl = 'http://3.83.42.8:3000/api/v1/';

  getFaculties():Observable<any>
  {
    return this._http.get(`${this.apiUrl + "faculties"}`)
  }

  getDepartment(id:any):Observable<any>{
    return this._http.get(`${this.apiUrl + "discipline/getAllDepartmentsWhere/" +  id}`);
  }


}
