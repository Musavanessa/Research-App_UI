import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-new-inner-header',
  templateUrl: './new-inner-header.component.html',
  styleUrls: ['./new-inner-header.component.css']
})
export class NewInnerHeaderComponent implements OnInit {

  constructor(private userService:UserService) { }
  @Input() activePageName:any;
  @Input() activeUser: any;
  @Input() userType:String = "Student";
  ngOnInit(): void {
    console.log("......." + this.activeUser);
    this.userService.getUser().subscribe((data: any) => {
      this.activeUser = data.user;
      if(this.activeUser.userType == "1")
        this.userType = "Student"
      if(this.activeUser.userType == "2")
        this.userType = "Supervisor"
      if(this.activeUser.userType == "3")
        this.userType = "Admin"
    });
  }

}
