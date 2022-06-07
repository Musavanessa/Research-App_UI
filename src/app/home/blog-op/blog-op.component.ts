import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { DatePipe } from '@angular/common';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-blog-op',
  templateUrl: './blog-op.component.html',
  styleUrls: ['./blog-op.component.css']
})
export class BlogOpComponent implements OnInit {

  constructor(public userService: UserService, public blogService: BlogService, public datepipe: DatePipe) { }
  //==================================
  //VARIABLES USED TO UPDATE THE BLOG
  //==================================
  @ViewChild('createBlogInputTitle') createBlogInputTitle:any;
  @ViewChild('createBlogInputDetails') createBlogInputDetails:any;
  @ViewChild('submitUpdateBlog') submitUpdateBlog:any;
  createBlogErrorList = [false, false, false];
  createBlogValuesValid = [false, false, false];
  // userId:any = 1;
  userDetails = {
    createdAt: "2022-04-28T12:33:18.000Z",
    disciplineId: 0,
    email: "shikomatlala2@gmail.com",
    firstName: "Shiko",
    id: 3,
    idNumber: "2001114386089",
    lastName: "Matlala",  
    references: null,
    title: "Miss",
    updatedAt: "2022-04-28T12:33:18.000Z",
    userType: "2"
  }
  blogComments:any;
   
  //==================================
  //VARIABLES USED TO CREATE COMMENTS
  //==================================
  @ViewChild('inputBlogComment') inputBlogComment:any;
  createCommentErrorList = [false];
  createCommentValuesValid = [false];
  postCommmentSuccess = false;
  showComments = true;



  blogObject:any;
  ngOnInit(): void {
    this.blogObject = this.blogService.getOpenedBlogObject();
    this.userService.getUser().subscribe((data:any)=>{
      this.userDetails = data.user;
      console.log(this.userDetails);
    });
    this.blogService.getAllCommentsWhere(this.blogObject.id).subscribe((data:any)=>{
      this.blogComments = data.comments;
      console.log(this.blogComments);
    })

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
    
    this.createBlogInputDetails.nativeElement.value = this.createBlogInputDetails.nativeElement.innerText.replace(/^\s+/g, '');
    // console.log(this.createBlogInputDetails);
    this.createBlogInputTitle.nativeElement.value = this.createBlogInputTitle.nativeElement.value.replace(/^\s+/g, '');
    let updatedBlogObject = {
      title: this.createBlogInputTitle.nativeElement.value,
      post:this.createBlogInputDetails.nativeElement.value,
      userId: this.userDetails.id,
      id: this.blogObject.id,
      udpatedAt: "current_timestamp()"
    }
    // console.log(updatedBlogObject);
    if(updatedBlogObject.post != this.blogObject.post)
    {
      console.log("You may begin to push to the family");
      this.blogService.updateBlog(updatedBlogObject).subscribe((res)=>{
        console.log(res);
        this.ngOnInit();
      })
      
    }

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

  deleteComment(comment:any)
  {
    let confirmText = "Are you sure you want to delete this comment!";
    if(confirm(confirmText)  == true)
    {
      this.blogService.deleteComment(comment).subscribe((res)=>{
        console.log(res.status, "res==>");
        this.ngOnInit();
      });
    }
    console.log(comment);
  }

  validateBlogComment()
  {
    console.log("1 Edited");

    //Remove trailing white space
    this.inputBlogComment.nativeElement.value = this.inputBlogComment.nativeElement.value.replace(/^\s+/g, '');
    if(this.inputBlogComment.nativeElement.value.trim() == "") 
    {
      this.createCommentErrorList[0] = true;
      this.createCommentValuesValid[0] = false;
    }
    else 
    {
      this.createCommentErrorList[0] = false;
      this.createCommentValuesValid[0] = true;
    }
  }



  postComment()
  {
    this.inputBlogComment.nativeElement.value = this.inputBlogComment.nativeElement.value.replace(/^\s+/g, '');
    if(this.createCommentValuesValid[0])
    {
      let commentObject = {
        userId: this.userDetails.id,
        blogId: this.blogObject.id,
        comment: this.inputBlogComment.nativeElement.value
      }
      //Post the comment
      this.blogService.postComment(commentObject).subscribe((res)=>{
        if(res.status == "success")
        {
          this.postCommmentSuccess = true;
          this.inputBlogComment.nativeElement.value = "";
          this.ngOnInit();
        }
      })
      console.log(commentObject);
    }
    else
    {
      this.createCommentErrorList[0] = true;
    }
  }

}
