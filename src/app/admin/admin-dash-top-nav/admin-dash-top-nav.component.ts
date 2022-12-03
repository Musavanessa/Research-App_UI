import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dash-top-nav',
  templateUrl: './admin-dash-top-nav.component.html',
  styleUrls: ['./admin-dash-top-nav.component.css']
})
export class AdminDashTopNavComponent implements OnInit {

  constructor() { }
  projectObject:any = JSON.parse(localStorage.getItem('activeProject')!);
  userDetails:any =  JSON.parse(localStorage.getItem('activeUser')!);
  studentDetails:any = JSON.parse(localStorage.getItem('activeProjectStudent')!);
  activeUser:any =  this.userDetails;
  userType:any;

  
  ngOnInit(): void {
  }

}
