import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/';
  // apiUrl = 'http://168.172.189.59:3000/api/v1/';


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

  deleteNote(noteId:number) : Observable<any>
  {
     return this._http.delete(`${this.apiUrl+"notes/"+noteId}`);
  }

  saveNote(noteObject: any):Observable<any>
  { 
    return this._http.post(`${this.apiUrl+"notes"}`, noteObject); 
  }

  updateNote(noteId:any, noteObject:any): Observable<any>
  {
    return this._http.patch(`${this.apiUrl+"notes/"+noteId}`, noteObject);
  }
  guidelines(projectTypeId:number): Observable<any>
  {
     return this._http.get(`${this.apiUrl+"guidelines"}?projectTypeId=`+projectTypeId);
  }
  getGuideline(guidelineId:number): Observable<any>
  {
    return this._http.get(`${this.apiUrl+"guidelines/"+ guidelineId}`);
  }
  updateGuideline(guidelineUpdated:any)
  {

  }

  projects():Observable<any>
  {
    return this._http.get(`${this.apiUrl+"projects"}`);
  }
  createNewProject(data:any):Observable<any>
  {
    return this._http.post(`${this.apiUrl+"projects"}` , data);

  }
  getProject(projectId: any):Observable<any>
  {
    return this._http.get(`${this.apiUrl+"projects/"+projectId}`);
  }

  getUserProjects(userId: any):Observable<any>
  {
    return this._http.get(`${this.apiUrl+"projects/userId/"+userId}`);
  }




  getChats():Observable<any>
  {
    return this._http.get(`${this.apiUrl+""}`)
  }

  //Blog
  blogs():Observable<any>
  {
    return this._http.get(`${this.apiUrl+"blogs"}`);
  }
  createBlog(data:any):Observable<any>
  {
    return this._http.get(`${this.apiUrl+"blogs"}`, data);
  }
  getBlog(blogId: any):Observable<any>
  {
    return this._http.get(`${this.apiUrl+"blogs/"+blogId}`);
  }
  deleteBlog(blogId: number):Observable<any>
  {
    return this._http.get(`${this.apiUrl+"blogs/"+blogId}`);
  }

  getAllLinks():Observable<any>
  {
    return this._http.get(`${this.apiUrl+"links"}`);
  }

}
  