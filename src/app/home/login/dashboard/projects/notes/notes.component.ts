import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from 'src/app/services/navs/sidenav.service';
import { DatePipe,  } from '@angular/common';
import {ApiserviceService} from './../../../../../apiservice.service';
import { ProjectObjectService } from '../project-object.service';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(public sidenavService: SidenavService,public globalProjectObject: ProjectObjectService, private service: ApiserviceService, public datepipe: DatePipe, public authService: AuthService, public router: Router ) { }
  //Variables to use to update the note.
  @ViewChild('inputNoteTitle') inputNoteTitle: any;
  @ViewChild('inputNoteText') inputNoteText:any;
  @ViewChild('noteDate') noteDate:any;
  @ViewChild('inputSearchNotes') inputSearchNotes:any;
  @ViewChild('hiddenNoteIdInput') hiddenNoteIdInput:any;
  public innerWidth: any;
  public innerHeight: any;
  public notesListHeight: any = "410px";
  public numNotesListHeight : number = 410;
  isNotesFound: boolean = true;
  isThisNoteOpen: boolean = false;
  createNoteResponse: any;
  showClear = false;
  notesData: any;
  notesByTitle: any;
  date = new Date();
  testVariable = "shikomatlala@gmail.com";
  noteObject = ProjectObjectService.noteObject;
  makeNotepadFillScreen = "col-8";
  noteTextArea:any;
  ngOnInit(): void {
    this.service.notes().subscribe((res)=>{
      console.log(res.notes, "res==>");
      this.notesData = res.notes;
      this.innerWidth = (window.innerWidth * 0.823) + "px";
      this.innerHeight= (window.innerHeight * 0.78) + "px";
      if(this.notesData.length < 1)
      {
        this.isNotesFound = false;
        this.makeNotepadFillScreen = "";
      }

    })
    if(ProjectObjectService.projectOpened)
    {
      this.noteObject = ProjectObjectService.noteObject;
      this.openNoteFromProjects();
      console.log(this.noteObject);
      console.log("We are here");
    }

    if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      queryParams: { message: 'Please log out first ' }
    });
  }
  findNotesByTitle()
  {
    
    // this.inputSearchNotes.nativeElement.value
    if(this.inputSearchNotes.nativeElement.value != "")
    {
      console.log(this.inputSearchNotes.nativeElement.value);
      //Now we need to loop through the whole note object.
      if(this.notesData.length > 0)
      {
        
        let numberOfTrimmed:number = 0;
        for(let x = 0; x < this.notesData.length; x++)
        {
          //Make the whole title lowercase
          let testTitle =  this.notesData[x].title.toLowerCase;
          let searchTitle =   this.inputSearchNotes.nativeElement.value;
          console.log("Test Title " + searchTitle.toLowerCase())
          if(!(this.notesData[x].title.toLowerCase().search(this.inputSearchNotes.nativeElement.value.toLowerCase()) >= 0))
          {
              this.notesData.splice(x, 1);
              //Count the number of items that we have taken away 
              //Reduce the height of the div based upon the number of elements that we have removed
              numberOfTrimmed++;
          }
          //Now keep in mind tha the current width can take 9 messages
          //The current height of 410 can take 8 Notes so the one thing that we can do 
          //Eat time you type it should search based upon what you
        }
        // if(numberOfTrimmed <= 10)
        // {
        //   //reduce the height
        //   this.numNotesListHeight = this.numNotesListHeight - ( numberOfTrimmed * 41);
        //   this.notesListHeight = this.numNotesListHeight + "px";
        //   console.log(this.notesListHeight);
        // }
      }
    }
    else
    {
      this.service.notes().subscribe((res)=>{
        console.log(res.notes, "res==>");
        this.notesData = res.notes;
        this.innerWidth = (window.innerWidth * 0.823) + "px";
        this.innerHeight= (window.innerHeight * 0.78) + "px";
        this.notesListHeight = "410px"
  
      });
    }

  }
  clearInputSearch()
  {
    this.inputSearchNotes.nativeElement.value = "";
    this.showClear = false;
  }
  updateClearButton()
  {
    if(this.inputSearchNotes.nativeElement.value !="")
    {
      this.showClear = true;
    }
    else
    {
      this.showClear = false;
    }
  }
  updateNote(id:any)
  {
    if(this.inputNoteText.nativeElement.value.trim() != "")
    {
      //Check if the note is not empty
      let updatedNote = this.noteObject;
      updatedNote.title = this.inputNoteTitle.nativeElement.value;
      updatedNote.text= this.inputNoteText.nativeElement.value;
      this.service.updateNote(id, updatedNote).subscribe((res)=>{
        console.log(res.status);
        this.ngOnInit();
      });
    }
  }

  formatDate(date:any)
  {

    return this.datepipe.transform(date, ' dd/MMM/yy');
  }
  formatTime(date:any)
  {
    return this.datepipe.transform(date, ' h:mm a');
  }
  clearNote()
  {
    this.inputNoteText.nativeElement.value = "";
    this.inputNoteTitle.nativeElement.value = "";
    this.noteDate.nativeElement.value = "";
    this.isThisNoteOpen = false;
  }

  openNote(id : any)
  { 
    this.service.getNote(id).subscribe((res)=>{
      console.log(res.note, "res==>");
      this.noteObject = res.note;
      ProjectObjectService.noteObject = res.note;
      this.inputNoteTitle.nativeElement.value = res.note.title;
    })
    this.isThisNoteOpen = true;
    //Now when we get the a specific note that we are looking for 
    //Get the elment Id
    //Create a note object somewhere.
    //In order for us to open the note, we firstly need to get the note ID that we want to open and then using that note ID we are going to get the actual note that we are looking for.
  }
  openNoteFromProjects()
  {
    this.noteObject = ProjectObjectService.noteObject;
  }

  showAllNotes()
  {
    this.service.notes().subscribe((res)=>{
      console.log(res.notes, "res==>");
      this.notesData = res.notes;
      this.innerWidth = (window.innerWidth * 0.823) + "px";
      this.innerHeight= (window.innerHeight * 0.78) + "px";
      this.notesListHeight = "410px"

    });
    this.inputSearchNotes.nativeElement.value = "";
    this.showClear = false;
    //update the class so that the notepad streches the whole page.
    this.makeNotepadFillScreen = "";

  }
  createNewNote()
  {
    //Check if the notes are empty.
    //Mainly we want to make sure that body of the note is not empty
    if(this.inputNoteText.nativeElement.value.trim() == "")
    {
      // this.closeErrorInputMessage();
    }
    else
    {
      // this.noteObject.projectId = this.projectObject
      let newNoteObject = {
        text: this.inputNoteText.nativeElement.value,
        title: this.inputNoteTitle.nativeElement.value,
        userId: ProjectObjectService.projectObject.userId,
        projectId: ProjectObjectService.noteObject.projectId
      };
      console.log(newNoteObject);
      // console.log(this.noteObject);
      this.service.saveNote(newNoteObject).subscribe((res)=>{
        this.createNoteResponse = res.status;
        this.ngOnInit();
        this.clearNote();
      });

      // this.closeSuccessNoteMessage();
      if(!this.isNotesFound)
      {
        this.isNotesFound = true;
        this.makeNotepadFillScreen = "col-8"
      }
    
    }
  }
  deleteNote(noteId:number, noteTitle:any)
  {
    // console.log(this.hiddenNoteIdInput.nativeElement.value);
    let confirmText = "You are about to delete:\n " + "\" " + noteTitle   + " \"";
    if(confirm(confirmText)  == true)
    {
      this.service.deleteNote(noteId).subscribe((res)=>{
        console.log(res.status, "res==>");
        this.ngOnInit();
      });
    }  
    //Now we also need to make sure that we clear the noteEditor 
    if( this.hiddenNoteIdInput.nativeElement.value == ProjectObjectService.noteObject.id)
    {
      this.clearNote();

    } 
  }
}
