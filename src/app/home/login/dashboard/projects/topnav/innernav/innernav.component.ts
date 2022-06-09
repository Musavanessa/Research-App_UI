import { Component, OnInit } from '@angular/core';
import { ProjectObjectService } from '../../project-object.service';
// import { ProjectObject } from '../../project-viewer';

@Component({
  selector: 'app-innernav',
  templateUrl: './innernav.component.html',
  styleUrls: ['./innernav.component.css']
})
export class InnernavComponent implements OnInit {

  // public projectObject: ProjectObject
  constructor(public globalProjectObject : ProjectObjectService) { }

  projectObject:any;
  userDetails:any;
  studentDetails:any;
  ngOnInit(): void {
    // console.log(ProjectObject.projectObject.name);
    this.userDetails = this.globalProjectObject.getUserDetails();
    console.log("User Details", this.userDetails);
    if(this.userDetails.userType == '2')
    {
      //Get the details of the student
      this.studentDetails = this.globalProjectObject.getPassStudentData();
      console.log("Student Details", this.studentDetails);
    }
    else
    {
      this.projectObject = this.globalProjectObject.getOpenedProjectObject();
    }
    console.log(this.projectObject);
    console.log(this.userDetails);
  }

  isUserSupervisor(data:string)
  {
    if(data == "2")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}
