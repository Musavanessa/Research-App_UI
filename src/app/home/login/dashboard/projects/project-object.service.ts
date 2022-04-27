import { Injectable } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';




@Injectable({
  providedIn: 'root'
})
export class ProjectObjectService {

  constructor(public service: ApiserviceService) {}
  static noteObject = {id: 0,
   text: "",
   title: "",
   wordCount: 0,
   createdAt: "",
   projectId: 1,
   userId: 1};
  static projectObject = {
    id: 1,
    name: "Not Found",
    description: "NB: Project Not found consider the following:\n - Login before you open project\n Logout and login",
    text: "No Text Found",
    startDate: "2022-03-01T07:40:49.000Z",
    keyword: "No Key word found",
    endDate: null,
    userId: 1,
    supervisorId: null,
    references: null,
    createdAt: "2022-02-24T16:18:00.000Z",
    updatedAt: "2022-02-24T16:18:00.000Z",
    projectStatusId: 0,
    projectTypeId: 0
  }

  ngOnInit(): void
  {

  }
  //Function to update the project Object
  updateProjectObject(projectId:any)
  {
      this.service.getProject(projectId).subscribe((res)=>{
        console.log(res, 'res=>');
        ProjectObjectService.projectObject = res.project;
      });
  }
  setProjectObject(projectObject:any)
  {
    ProjectObjectService.projectObject= projectObject;
  }
  static projectDefinition = {};

  static projectOpened = false;
  updateNoteObject(noteId:any)
  {
    ProjectObjectService.projectOpened = true;
    this.service.getNote(noteId).subscribe((res)=>{
      console.log(res,'res=>');
      ProjectObjectService.noteObject = res.note;
    });
    // return ProjectObjectService.noteObject;
  }
}
