import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  URL: string = `http://localhost:3000/api/v1/blogs`
  //private decodedToken: DecodedToken = new DecodedToken;

  constructor(private http:HttpClient) { }


  public createBlog(data: any){
    return this.http.post(this.URL,data);
  }
  // public updateBlog(data: any){
  //   return this.http.patch(this.URL,data);
  // }
  public deleteBlog(data: any){
    return this.http.delete(this.URL,data);
  }
  public getAllBlogs(data: any){
    return this.http.get(this.URL);
  }
  public getBlog(id: Number){
    return this.http.get(this.URL+`/${id}`);
  }

  
  private handleError(error: HttpErrorResponse) {

    let errors = [{ status: 'Error', message: ' Ooops, someting went wrong!' }];
    let msg = ' Ooops, someting went wrong!'
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      //msg = error.error.message ? error.error.message:error.error.text
      //errors = error.error
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      msg = error.error.message ? error.error.message:error.error.text
      errors = error.error
    }
    // Return an observable with a user-facing error message.
    // return throwError(errors);
    //console.log('service error:',error.error)
    return throwError(() => new Error(msg))
  }

  blogForm(data: BlogService):Observable<BlogService>
  {
  

      return this.http
      .post<BlogService>(`${this.URL}/createBlog`, data)
      .pipe(
        map(data => {

          console.log('Im in blog service: ', data);
          
          return data;
        }), catchError(this.handleError));
  }


}
