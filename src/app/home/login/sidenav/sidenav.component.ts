import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
//I need to work with services
import { SidenavService } from 'src/app/services/navs/sidenav.service';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


  @ViewChild('profileElement') profileElement: any;
  @ViewChild('projectElement') projectElement: any;
  @ViewChild('chatBoxElement') chatBoxElement: any;
  // profileElement.nativeElement.style.backgroundColor="rgb(0, 132, 255)";
  // profileElement.nativeElement.style.color="white";

  @Input('isAuthenticated') isAuthenticated: boolean = false;
  @Input('username') username: string = 'user';
  @Input('logout') logout = () => {};
  @Input('userPhoto') userPhoto: string = '';
  url : string = `https://avatars.githubusercontent.com/u/58688272?v=4`;


  constructor(public sideNavService: SidenavService) { }
  ngOnInit(): void {
    this.changeSideNav();
    // this.activateProfileElement();
    // this.profileElement.nativeElement.style.backgroundColor="rgb(0, 132, 255)";
    // this.profileElement.nativeElement.style.color="white";
    
  }

  navProperties =  SidenavService.navProperties;
  changeSideNav()
  {
     this.sideNavService.changeSideNav();
     this.navProperties = SidenavService.navProperties;
  }

  
 activateProfileElement()
 {
   this.profileElement.nativeElement.style.backgroundColor="rgb(0, 132, 255)";
   this.profileElement.nativeElement.style.color="white";
   this.deactivateProjectElement();
   this.deactivateChaboxElement();
 }
 deactivateProfileElement()
 {
   this.profileElement.nativeElement.style.backgroundColor="white";
   this.profileElement.nativeElement.style.color="black";

 }

 activateProjectElement()
 {
   this.projectElement.nativeElement.style.backgroundColor="rgb(0, 132, 255)";
   this.projectElement.nativeElement.style.color="white";
   this.deactivateProfileElement();
   this.deactivateChaboxElement();
 }

 deactivateProjectElement()
 {
   this.projectElement.nativeElement.style.backgroundColor="white";
   this.projectElement.nativeElement.style.color="black";
 }

 activateChatboxElement()
 {
   this.chatBoxElement.nativeElement.style.backgroundColor="rgb(0, 132, 255)";
   this.chatBoxElement.nativeElement.style.color="white";
   this.deactivateProfileElement();
   this.deactivateProjectElement()
 }

 deactivateChaboxElement()
 {
   this.chatBoxElement.nativeElement.style.backgroundColor="white";
   this.chatBoxElement.nativeElement.style.color="black";
 }

}
