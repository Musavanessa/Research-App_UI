import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from './../../../../../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  //Notes Data
  notesData: any;
  ngOnInit(): void {
    this.service.notes().subscribe((res)=>{
      console.log(res.notes, "res==>");
      this.notesData = res.notes;
    })
  }
  noteObject = {id: 0, title: "", 
                text: "", 
                wordCount: 0, 
                createdAt: "", 
                updatedAt: "", 
                guidelineId: null,
                projectId: null,
                collaboratorId: null,
                userId: null };

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


}
