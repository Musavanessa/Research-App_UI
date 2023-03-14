import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class GuidelinesService {

  constructor(private http:HttpClient) { }
  apiUrl = url;


  //UPDATE GUIDELINES SERVICE / API
  updateGuideline(guidelineObject:any):Observable<any>
  {
    return this.http.patch(`${this.apiUrl + "guidelines/" + guidelineObject.id }`, guidelineObject);
  }

  deleteGuideline(id:any):Observable<any>
  {
    return this.http.delete(`${this.apiUrl + "guidelines/" + id }`);
  }

  createGuideline(guidelineObject:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl + "guidelines?projectTypeId=" + guidelineObject.projectTypeId}` , guidelineObject);
  }

  getHtmlDetails(guidelineId:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + "guidelines/userHtml/details/" + guidelineId}`);
  }

}
