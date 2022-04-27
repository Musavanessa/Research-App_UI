import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.css']
})
export class GuidelinesComponent implements OnInit {

  constructor(public datepipe: DatePipe, public router: Router, private service: ApiserviceService, public authService: AuthService ) { }

  ngOnInit(): void {
    this.guidelines();

    if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      queryParams: { message: 'Please log out first ' }
    });
  }
  guideLinesObject: any;
  guideLineObject = {
    id: 1,
    text: "The title summarizes the main idea or ideas of your study. A good title contains the fewest possible words that adequately describe the contents and/or purpose of your research paper.\n\nThe title is without doubt the part of a paper that is read the most, and it is usually read first. If the title is too long it usually contains too many unnecessary words, e.g., \"A Study to Investigate the....\" On the other hand, a title which is too short often uses words which are too general. For example, \"African Politics\" could be the title of a book, but it does not provide any information on the focus of a research paper.",
    name: "Title",
    g_order: 1,
    createdAt: "2022-03-17T09:20:03.000Z",
    updatedAt: "2022-03-17T09:20:03.000Z",
    projectTypeId: 1}
    guideLine: any;
    noteObject = {id: 0, title: "", 
    text: "", 
    wordCount: 0, 
    createdAt: "", 
    updatedAt: "", 
    guidelineId: null,
    projectId: null,
    collaboratorId: null,
    userId: null };
  openGuideline(id:any)
  {
    this.service.getGuideline(id).subscribe((res)=>{
      console.log(res.guideline);
      this.guideLineObject = res.guideline;
      this.guideLine = res.guideline;
      
    })
  }
  guidelines()
  {

    this.service.guidelines(1).subscribe((res)=>{
      console.log(res.guidelines);
      this.guideLinesObject = res.guidelines;
    });
  }

}
