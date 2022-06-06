import { Component, OnInit, ViewChild} from '@angular/core';
//import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { BlogService } from 'src/app/services/blog/blog.service';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
//import { ApiserviceService } from './apiservice.service';

import { SidenavService } from 'src/app/services/navs/sidenav.service';
import { DatePipe  } from '@angular/common';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';


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

  constructor(private blogService:BlogService) { }

  
  ngOnInit(): void {
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
    
  }




  
}
