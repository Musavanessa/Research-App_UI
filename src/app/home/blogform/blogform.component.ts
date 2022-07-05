import { Component, OnInit, ViewChild} from '@angular/core';
//import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { BlogService } from 'src/app/services/blog/blog.service';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//import { ApiserviceService } from './apiservice.service';
import { UserService } from 'src/app/services/user/user.service';

import { SidenavService } from 'src/app/services/navs/sidenav.service';
import { DatePipe  } from '@angular/common';
import { ControlContainer } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.css']
  
})
export class BlogformComponent implements OnInit {

  createBlog = new FormControl('');
  
  errors: any = [];
  pCheck: string ='';

  title: string = '';

  setValue() {
    this.title = '';
  }

  //constructor(private _http:HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/';

  constructor(private router:Router, private userService: UserService, private blogService:BlogService) { }
  @ViewChild('createBlogTitle') createBlogTitle:any;
  @ViewChild('createBlogPost') createBlogPost:any;
  createBlogErrorList = [false, false];
  createBlogValuesValid = [false, false];
  data:any;
  userType:any;
  
  ngOnInit(): void {
    this.userService.getUser().subscribe((data: any) => {
      this.data = data.user;
      this.userType = data.user.userType;
      console.log(data.user)
      console.log(data.user.userType + " = User Type");
      console.log('show: ',this.userType);
    })
  }

  blogForm(){
    this.blogService.createBlog(this.createBlog).subscribe({
      next: (data: any) => {
        console.log('Create blog data:',data)
        this.errors = [];
      },
      error: err => {
        this.errors[0] = err.message;
        console.log("Words with letters", err)
      }
    })
  }

  validateBlogInputTitle()
  {
    this.createBlogTitle.nativeElement.value = this.createBlogTitle.nativeElement.value.replace(/^\s+/g, '');
    if(this.createBlogTitle.nativeElement.value.trim() == "")
    {
      this.createBlogErrorList[0] = true;
      this.createBlogValuesValid[0] = true;
    }
    else
    {
      this.createBlogErrorList[0] = false;
      this.createBlogValuesValid[0] = false;
    }
  }

  validateBlogInputDetails()
  {
    this.createBlogPost.nativeElement.value = this.createBlogPost.nativeElement.value.replace(/^\s+/g, '');
    if(this.createBlogPost.nativeElement.value.trim() == "")
    {
      this.createBlogErrorList[1] = true;
      this.createBlogValuesValid[1] = true;
    }
    else
    {
      this.createBlogErrorList[1] = false;
      this.createBlogValuesValid[1] = false;
    }
  }

  createNewBlogPost()
  {
    //Get all the details and then display them
    let valuesValid = 0;
    console.log(this.data);
    for(let x =0; x < this.createBlogValuesValid.length; x++)
    {
      if(!this.createBlogValuesValid[x])
      {
        valuesValid++;
      }
    }
    let blogTitle = this.createBlogTitle.nativeElement.value;
    let blogPost = this.createBlogPost.nativeElement.value;
    let userId = this.data.id;
    let newBlogPost = {title: blogTitle,
      userId: userId,
      post: blogPost
    }
  

    if(valuesValid == 2)
    {
      //Push 
      this.blogService.createBlog(newBlogPost).subscribe((res)=>{
        console.log(res);
        if(res.status == "success")
        {
          this.router.navigate(['/blog']);
        }
      })
      
    }

  }



  
}
