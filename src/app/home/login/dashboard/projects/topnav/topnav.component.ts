import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from 'src/app/services/navs/sidenav.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(public sidenavService: SidenavService) { }
  // @ViewChild('projectsElement') projectsElement:any;
  // @ViewChild('notesElement') notesElement:any;
  // @ViewChild('guidelinesElement') guidelinesElement:any;

  isActiveProjects = SidenavService.isActiveProjects;
  isActiveNotes = SidenavService.isActiveNotes;
  isActiveGuidelines = SidenavService.isActiveGuidelines;
  ngOnInit(): void {
  }

  makeLinkActive(number:number)
  {
    this.sidenavService.makeLinkActive(number);
  }

  // sidenavService.

  // makeLinkActive(number: number)
  //   {
  //     if(number === 1)
  //     {
  //       this.isActiveProjects = "active";
  //       this.isActiveNotes = "";
  //       this.isActiveGuidelines = "";
  //     }
  //     if(number === 2)
  //     {
  //       this.isActiveProjects = "";
  //       this.isActiveNotes = "active";
  //       this.isActiveGuidelines = "";
  //     }
  //     if(number === 3)
  //     {
  //       this.isActiveProjects = "";
  //       this.isActiveNotes = "";
  //       this.isActiveGuidelines = "active";
  //     }
  // }

}
