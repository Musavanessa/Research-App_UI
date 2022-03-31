
//The purpose of this service is to allow other components to take control of the sidenav.
//We want to be able to open
import { Injectable } from '@angular/core';
// import { SidenavComponent } from 'src/app/home/login/sidenav/sidenav.component';
// import { TopnavComponent } from 'src/app/home/login/dashboard/projects/topnav/topnav.component';


@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }
  //Using this classs - we want to hold what is currently happening in the navbard.
  static sideNavStatus = true;
  sidenavIcons: Array<string> = ["edit-solid.svg", "menu_black_24dp.svg"];
  static navProperties = {color: "Yellow", width: "280px",  height: "100%", navOpacity: "100%", sidenavIcon : "" }
  changeSideNav()
  {
    if(SidenavService.sideNavStatus == true)
    {
      SidenavService.sideNavStatus = false;
      SidenavService.navProperties.width = "0px";
      SidenavService.navProperties.navOpacity = "0%";
      SidenavService.navProperties.sidenavIcon = this.sidenavIcons[1];
      console.log("Side is now closed");
    }
    else
    {
      SidenavService.sideNavStatus = true;
      SidenavService.navProperties.width = "280px";
      SidenavService.navProperties.navOpacity = "100%";
      SidenavService.navProperties.sidenavIcon = this.sidenavIcons[0];
      console.log("Side is now Open");
    }
  }
}
