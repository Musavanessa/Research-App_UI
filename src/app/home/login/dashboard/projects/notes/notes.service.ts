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
    console.log("Data :" + data);
    this.isOpenNote = true;
    this.apiService.getNote(5).subscribe((res)=>{
      console.log("Were are in the setNoteObject function |");
      // console.log(res, 'res=>');
      this.openNoteObject = res.note;
      console.log("Note Object " + res.note);
    });
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
}
