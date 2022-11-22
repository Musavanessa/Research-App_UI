import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(public userService: UserService, public datepipe: DatePipe, public blogService: BlogService) { }
  testBlogObject:any = {id:0, title: "Testing Blog Title", post:"Testing Post ", userId: 1,  createdAt: "2022-03-17 09:13:10"}
  blogObject:any;
  userId = 3;
  userType:any;
  blogs:any;
  ngOnInit(): void {
    this.userService.getUser().subscribe((data:any)=>{
      this.userType = data.user.userType;
    });
    this.blogService.getAllBlogs().subscribe((data:any)=>{
      // console.log(data);
      this.blogs = data.blogs;
    })
  }
  formatDate(date: any) {
    return this.datepipe.transform(date, 'dd MMM y');
  }

  getBlogDetails(blogObject:any)
  {
    this.blogService.setOpenedBlogObject(blogObject);
  }

}
