import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { DatePipe } from '@angular/common';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Component({
  selector: 'app-blog-op',
  templateUrl: './blog-op.component.html',
  styleUrls: ['./blog-op.component.css']
})
export class BlogOpComponent implements OnInit {

  constructor(public blogService: BlogService, public datepipe: DatePipe) { }
  //==================================
  //VARIABLES USED TO UPDATE THE BLOG
  //==================================
  @ViewChild('createBlogInputTitle') createBlogInputTitle:any;
  @ViewChild('createBlogInputDetails') createBlogInputDetails:any;
  @ViewChild('submitUpdateBlog') submitUpdateBlog:any;
  createBlogErrorList = [false, false, false];
  createBlogValuesValid = [false, false, false];
  userId:any = 1;
   
  //==================================
  //VARIABLES USED TO CREATE COMMENTS
  //==================================
  // @ViewChild('')




  blogObject:any;
  ngOnInit(): void {
    this.blogObject = this.blogService.getOpenedBlogObject();
  }

  formatDate(date: any) {
    return this.datepipe.transform(date, 'dd MMM y');
  }

  validateBlogInputTitle()
  {
    console.log("1 Edited");

    //Remove trailing white space
    this.createBlogInputTitle.nativeElement.value = this.createBlogInputTitle.nativeElement.value.replace(/^\s+/g, '');;
    if(this.createBlogInputTitle.nativeElement.value.trim() == "") 
    {
      this.createBlogErrorList[0] = true;
      this.createBlogValuesValid[0] = false;
      // this.submitUpdateBlog.nativeElement.disabled = true;
      //doucment.getelemet
      // this.createBlogInputTitle.nativeElement.value = this.blogObject.title;
    }
    else 
    {
      this.createBlogErrorList[0] = false;
      this.createBlogValuesValid[0] = true;
    }
  }

  validateBlogInputPost()
  {
    console.log("1 Edited");

    //Remove trailing white space
    this.createBlogInputDetails.nativeElement.value = this.createBlogInputDetails.nativeElement.value.replace(/^\s+/g, '');;
    if(this.createBlogInputDetails.nativeElement.value.trim() == "") 
    {
      this.createBlogErrorList[1] = true;
      this.createBlogValuesValid[1] = false;
    }
    else 
    {
      this.createBlogErrorList[1] = false;
      this.createBlogValuesValid[1] = true;
    }
  }

  restoreBlogTitle()
  {
    console.log(" 3 Edited");
    //Remove trailing white space
    this.createBlogInputTitle.nativeElement.value = this.createBlogInputTitle.nativeElement.value.replace(/^\s+/g, '');;
    if(this.createBlogInputTitle.nativeElement.value.trim() == "") 
    {

      this.createBlogInputTitle.nativeElement.value = this.blogObject.title;
    }
  }

  restoreBlogPost()
  {
    console.log(" 3 Edited");
    //Remove trailing white space
    this.createBlogInputDetails.nativeElement.value = this.createBlogInputDetails.nativeElement.value.replace(/^\s+/g, '');;
    if(this.createBlogInputDetails.nativeElement.value.trim() == "") 
    {
      console.log(this.blogObject);
      console.log(this.createBlogInputDetails);
      this.createBlogInputDetails.nativeElement.value = this.blogObject.post;
    }
  }

  updateBlog()
  {
    this.createBlogInputDetails.nativeElement.value = this.createBlogInputDetails.nativeElement.value.replace(/^\s+/g, '');
    this.createBlogInputTitle.nativeElement.value = this.createBlogInputTitle.nativeElement.value.replace(/^\s+/g, '');
    let updatedBlogObject = {
      title: this.createBlogInputTitle.nativeElement.value,
      post:this.createBlogInputDetails.nativeElement.value,
      userId: this.userId,
      udpatedAt: "current_timestamp()"
    }
    console.log(updatedBlogObject);
  }
  validateBlogInputDetails()
  {
    this.createBlogInputDetails.nativeElement.value = this.createBlogInputDetails.nativeElement.value.replace(/^\s+/g, '');
    if(this.createBlogInputDetails.nativeElement.value.trim() == "") 
    {
      this.createBlogErrorList[3] = true;
      this.createBlogValuesValid[3] = false;
    }
    else
    {
     this.createBlogErrorList[3] = false;
     this.createBlogValuesValid[3] = true;
    }
  }

}
