import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DepartmentFacultiesService } from 'src/app/services/department-faculties/department-faculties.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { ApiserviceService } from 'src/app/apiservice.service';
import { UserService } from 'src/app/services/user/user.service';
// import { ApiserviceService } from 'src/app/apiservice.service';


@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.css']
})
export class ListAdminsComponent implements OnInit {
  userDetails:any =  JSON.parse(localStorage.getItem('activeUser')!);
  showAlert = false;
  students2:any = [];
  allAdmins:any = [];
constructor(private userService: UserService, private apiService: ApiserviceService) { }
@ViewChild('inputDescription_') inputDescription: any;
@ViewChild('supervisorId') supervisorId:any;
@ViewChild('optionValue') optionValue:any;
@Input('inputValue') inputValue:any;
ngOnInit(): void {
  let id = 9;
  this.userService.adminGetNewUsers(id).subscribe((data:any) =>{
      console.log(data);
      let tempData = data.data[0];
      let i:any;
      for( i in data.data[0])
      {
          this.students2.push(tempData[i]);
      }
      console.log(this.students2);
  })
  this.userService.getAllSupervisors(id).subscribe((data:any)=>{
      let tempData = data.data[0];
      let i:any;
      for(i in data.data[0])
      {
          this.allAdmins.push(tempData[i]);
      }
      console.log(this.allAdmins);
  })

}
generalCollapse = "collapse-";
collapseWithPound = "#collapse-";
heading = "heading-";

parseSupervisorJSON(object:any)
{
  let supervisor:any;  
  if(object != 0){
      supervisor = JSON.parse(object);
      supervisor = supervisor.title + ' ' +  supervisor.firstName + ' ' + supervisor.lastName;
  }
  else
      supervisor = "Not Assigned";

  return supervisor;
}

parseSupervisorNameJSON(object:any)
{
  let supervisor:any;  
  if(object != 0){
      supervisor = JSON.parse(object);
  }
  else
      supervisor = "Not Assigned";

  return supervisor.firstName;
}
parseSupervisorLastJSON(object:any)
{
  let supervisor:any;  
  if(object != 0){
      supervisor = JSON.parse(object);
  }
  else
      supervisor = "Not Assigned";

  return supervisor.lastName;
}
assignSupervisor(projectId:any)
{
  let supervisorId =this.optionValue.nativeElement.value;
    
  
  let data:any = {supervisorId: supervisorId}
  console.log(data);
  this.apiService.updateProject(projectId, data).subscribe((res)=>{
      console.log(res);
      if(res.status == "success")
      {
          this.showAlert = true;
      }

  })
}
parseProjectJSON(object:any)
{
  let project:any;  
  if(object != 0){
      project = JSON.parse(object);
  }
  else
      project = "Not Created";

  return project;
}
parseProjectNameJSON(object:any)
{
  let project:any;  
  if(object != 0){
      project = JSON.parse(object);
  }
  else
      project = "Not Created";

  return project.name;
  
}
parseProjectDescriptionJSON(object:any)
{
  let project:any;  
  if(object != 0){
      project = JSON.parse(object);
  }
  else
      project = "Not Created";

  return project.description;
  
}

}