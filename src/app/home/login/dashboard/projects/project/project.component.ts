import { Component, OnInit, ViewChild } from '@angular/core';
// import { InnernavComponent } from '../topnav/innernav/innernav.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ProjectObjectService } from '../project-object.service';
import { SidenavService } from 'src/app/services/navs/sidenav.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // public projectObject: ProjectObject,
  constructor(public sidenavService: SidenavService, public globalProjectObject : ProjectObjectService,public authService: AuthService, public datepipe: DatePipe, public router: Router, private service: ApiserviceService) { }

  @ViewChild('noteText') noteText:any;
  @ViewChild('noteTitle') noteTitle:any;
  noteObject = {id: 0, 
                title: "", 
                text: "", 
                wordCount: 0, 
                createdAt: "", 
                updatedAt: "", 
                guidelineId: null,
                projectId: null,
                collaboratorId: null,
                userId: 0 };
  //We need to get the total number of items so that we can allow the user to click the next button.
  backgroundColor = "white";
  ngOnInit(): void {
    this.service.notes().subscribe((res)=>{
      console.log(res.notes, "res==>");
      this.notesData = res.notes;
    });
    this.projectObject = ProjectObjectService.projectObject;
    // this.innerNav.ngOnInit();
    console.log(this.projectObject)
    //The one issue that I am getting here, is that when I create a project - I am not able to synchronise the project right away - 
    //I do not know how I can takle this issue and get it done with.
    
    this.guidelines();

    if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      queryParams: { message: 'Please log out first ' }
    });
  }

  isDisplayErrorInputMessage = false;
  isDisplaySuccessNoteMessage = false;
  closeErrorInputMessage()
  {
    if(this.isDisplayErrorInputMessage)
      this.isDisplayErrorInputMessage = false;
    else
      this.isDisplayErrorInputMessage = true;
  }

  closeSuccessNoteMessage()
  {
    if(this.isDisplaySuccessNoteMessage)
      this.isDisplaySuccessNoteMessage = false;
    else
      this.isDisplaySuccessNoteMessage = true;
  }
  createNoteResponse = "";
  createNewNote()
  {
    //Check if the notes are empty.
    //Mainly we want to make sure that body of the note is not empty
    if(this.noteText.nativeElement.value == "")
    {
      this.closeErrorInputMessage();
    }
    else
    {
      // this.noteObject.projectId = this.projectObject
      this.noteObject.id = ProjectObjectService.projectObject.id;
      this.noteObject.text = this.noteText.nativeElement.value;
      this.noteObject.title = this.noteTitle.nativeElement.value;
      this.noteObject.userId = ProjectObjectService.projectObject.userId;
      // console.log(this.noteObject);
      this.service.saveNote(this.noteObject).subscribe((res)=>{
        this.createNoteResponse = res.status;
      });
      this.ngOnInit();
      this.closeSuccessNoteMessage();
    
    }
  }

  clearNoteEntry()
  {
     this.noteText.nativeElement.value = "";
     this.noteTitle.nativeElement.value = "";
  }

  projectObject = {};
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
  openInNotes(noteId:number)
  {
    this.globalProjectObject.updateNoteObject(noteId);
    this.sidenavService.makeLinkActive(2);

  }

}
