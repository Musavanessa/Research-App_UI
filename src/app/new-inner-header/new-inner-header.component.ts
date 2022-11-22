import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-new-inner-header',
  templateUrl: './new-inner-header.component.html',
  styleUrls: ['./new-inner-header.component.css']
})
export class NewInnerHeaderComponent implements OnInit {

  constructor(private userService:UserService) { }
  @Input() activePageName:any;
  @Input() activeUser_:any;
  activeUser: any = JSON.parse(localStorage.getItem('activeUser')!);

  @Input() userType:String = "Student";
  ngOnInit(): void {
    if (!localStorage.getItem('activeUser')) { 
      this.userService.getUser().subscribe((data:any)=>{
        this.activeUser = data.user;
        console.log("Active User New- Inner Header", this.activeUser);
      })
    } 
    else
    {
      this.activeUser = JSON.parse(localStorage.getItem('activeUser')!);
    }
    if(this.activeUser.userType == "1")
      this.userType = "Student"
    if(this.activeUser.userType == "2")
      this.userType = "Supervisor"
    if(this.activeUser.userType == "3")
      this.userType = "Admin"
  }

}
