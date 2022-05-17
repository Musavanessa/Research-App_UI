import { Injectable } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private apiService : ApiserviceService) { }

  openNoteObject:any;
  isOpenNote: boolean = false;
  setNoteObject(data:any)
  {
    this.openNoteObject = data;
    this.setIsOpenNoteTrue();
  }
  getNoteObject()
  {
    this.setIsOpenNoteFalse();
    return this.openNoteObject;
  }

  setIsOpenNoteFalse()
  {
    this.isOpenNote = false;
  }

  setIsOpenNoteTrue()
  {
    this.isOpenNote = true;
  }

  getIsOpenNote()
  {
    return this.isOpenNote;
  }
}
