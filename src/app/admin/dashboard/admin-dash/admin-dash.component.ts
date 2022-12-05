import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ApiserviceService } from 'src/app/apiservice.service';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
    @ViewChild('inputDescription') inputDescription: any;
    @ViewChild('supervisorId') supervisorId:any;
    userDetails:any =  JSON.parse(localStorage.getItem('activeUser')!);
    students2:any = [];
    allAdmins:any = [];
  constructor(private userService: UserService, private apiService: ApiserviceService) { }
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

 updateInputDescription()
 {
    console.log(this.inputDescription.nativeElement.value)
 }
 assignSupervisor(projectId:any, supervisorId:any)
 {
    console.log(this.inputDescription.nativeElement)
 
    let data:any = {supervisorId: supervisorId}
    console.log(data);
    this.apiService.updateProject(projectId, data).subscribe((res)=>{
        console.log(res)
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
}
