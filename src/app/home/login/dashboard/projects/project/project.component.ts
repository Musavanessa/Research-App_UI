import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/apiservice.service';
// import { Transform } from 'stream';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(public datepipe: DatePipe, public router: Router, private service: ApiserviceService) { }
  notesData: any;
  activeState = "white";
  isActive = false;
  setStateAsActive(){
    if(this.isActive)
    {
      this.activeState = "white";
      this.isActive = false;
    }
    else
    {
      this.activeState = "white";
      this.isActive =true;
      
    }
    return this.activeState;
  }
  
  //We need to get the total number of items so that we can allow the user to click the next button.
  backgroundColor = "white";
  ngOnInit(): void {
    this.service.notes().subscribe((res)=>{
      console.log(res.notes, "res==>");
      this.notesData = res.notes;
    });
    this.guidelines();
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

  date = this.datepipe.transform(this.guideLineObject.updatedAt, 'yyyy-MM-dd hh:mm:ss');
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
      this.backgroundColor = "grey";
      
    })
  }

  openNote(id : any)
  { 
    this.service.getNote(id).subscribe((res)=>{
      console.log(res.note, "res==>");
      this.noteObject = res.note;
    })
    //Now when we get the a specific note that we are looking for 
    //Get the elment Id
    //Create a note object somewhere.
    //In order for us to open the note, we firstly need to get the note ID that we want to open and then using that note ID we are going to get the actual note that we are looking for.
  }
  // projectTypeId = 1;
  objectIds: any;
  guidelines()
  {

    this.service.guidelines(1).subscribe((res)=>{
      console.log(res.guidelines);
      this.guideLinesObject = res.guidelines;
    });
  }
}
