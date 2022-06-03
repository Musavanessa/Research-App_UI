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
  ngOnInit(): void {
    // console.log(ProjectObject.projectObject.name);
    this.userDetails = this.globalProjectObject.getUserDetails();
    this.projectObject = this.globalProjectObject.getOpenedProjectObject();
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
