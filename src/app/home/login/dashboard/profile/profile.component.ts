import { Component, OnInit, HostListener} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public innerWidth: any = 0;
  public innerHeight: any  = 0;
  public inputDivHeigh: any  = 0;

  disable: boolean = true;
  formV: any = {lastName: false, firstName: false, password: false};
  pCheck: string = '';
  data: User = new User;
  userType: string = "2";
  profileForm : User = new User;
  constructor( private userService: UserService, public router: Router, public authService: AuthService) { }



  ngOnInit(): void {

    this.innerWidth = (window.innerWidth * 0.823) + "px";
    this.innerHeight= (window.innerHeight * 0.9);
    this.inputDivHeigh = (this.innerHeight * 0.7) + "px";
    this.innerHeight= (window.innerHeight * 0.87) + "px";
    ////console.log(this.innerWidth + "H " + this.innerHeight + "W");

    this.getMe();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = (window.innerWidth * 0.823) + "px";
    this.innerHeight= (window.innerHeight * 0.9);
    this.inputDivHeigh = (this.innerHeight * 0.7) + "px";
    this.innerHeight= (window.innerHeight * 0.87) + "px";
    //console.log(this.innerWidth + "H " + this.innerHeight + "W");
  }


  checkPassword():void{this.pCheck = this.profileForm.password !== this.profileForm.confirmPassword ? 'Password does not match' : '' }
  
  checkValues(d : any, feild : string, v?: any):void{
    // //console.log('form:', d)
    //console.log('Input:', v.valid)
   
    this.formV[feild] = d.form.value[feild] == '' ? false: v.invalid;


  //  //console.log('test:', Object.values(d.form.value).every(el => el == ''), Object.values(this.formV).includes(true))

   this.disable = Object.values(d.form.value).every(el => el == '') ? Object.values(d.form.value).every(el => el == '') : Object.values(this.formV).includes(true)
    
  }
  updateProfile(){
    
  }
  getMe(){

    this.userService.getUser().subscribe((data: any) => {
      this.data = data.user;
      this.userType = data.user.userType;
      //console.log(data.user.userType + " = User Type");

      //console.log('show: ',this.userType);
    })
  }

  isUserSupervisor(data:string)
  {
    if(data == "2")
    {
      //console.log(data + " The user type is");
      return true;
      
    }
    else
    {
      //console.log(data + " The user type is");
      return false;
    }

  }
}
