import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // URL: string = `http://localhost:3000/api/v1/blogs`;
  COMMENT_URL: string = `http://44.204.59.19:3000/api/v1/comments`;
  URL: string = `http://44.204.59.197:3000/api/v1/blogs`;

  //private decodedToken: DecodedToken = new DecodedToken;

  constructor(private http:HttpClient) { }


  //SET OPENED BLOG OBJET
  blogObject:any;
  setOpenedBlogObject(blogObject:any)
  {
    this.blogObject = blogObject;
  }
  getOpenedBlogObject()
  {
    return this.blogObject;
  }

  //CREATE A NEW BLOG
  public createBlog(data: any):Observable<any>{
    return this.http.post(this.URL,data);
  }
  //UPDATE BLOG
  public updateBlog(data: any):Observable<any>{

    return this.http.patch(this.URL + "/" +  data.id, data);

  }

  public deleteBlog(data: any){
    return this.http.delete(this.URL,data);
  }

  //===============================
  //COMMENTS FUNCTIONS
  //=========================
        //GET A SEPECIFIC BLOG COMMENT
        public getAllCommentsWhere(blogId:any):Observable<any>
        {
          // console.log(this.http.get(this.URL + "/blogId/" + blogId));
          return this.http.get(this.COMMENT_URL + "/blogId/" + blogId);
        }
        //DELETE A SPECIFIC COMMENT
        public deleteComment(id:any):Observable<any>
        {
          return this.http.delete(this.COMMENT_URL + "/" + id);
        }
        //CREATE A COMMENT
        public postComment(commentObject:any):Observable<any>
        {
          return this.http.post(this.COMMENT_URL, commentObject);
        }


  public getAllBlogs():Observable<any>{

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
