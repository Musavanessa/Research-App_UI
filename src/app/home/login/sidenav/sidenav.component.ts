import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//I need to work with services
import { SidenavService } from 'src/app/services/navs/sidenav.service';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input('isAuthenticated') isAuthenticated: boolean = false;
  @Input('username') username: string = 'user';
  @Input('logout') logout = () => {};
  @Input('userPhoto') userPhoto: string = '';
  url : string = `https://avatars.githubusercontent.com/u/58688272?v=4`;


  constructor(public sideNavService: SidenavService) { }
  ngOnInit(): void {


    this.changeSideNav()
   
 
  }
  navProperties =  SidenavService.navProperties;
  changeSideNav()
  {
     this.sideNavService.changeSideNav();
     this.navProperties = SidenavService.navProperties;
  }

}
