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
  // projectName = ProjectObject.projectObject.name;
  projectObject = ProjectObjectService.projectObject;
  ngOnInit(): void {
    // console.log(ProjectObject.projectObject.name);
  }

}
