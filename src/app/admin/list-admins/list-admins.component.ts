import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DepartmentFacultiesService } from 'src/app/services/department-faculties/department-faculties.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { ApiserviceService } from 'src/app/apiservice.service';
import { UserService } from 'src/app/services/user/user.service';
// import { ApiserviceService } from 'src/app/apiservice.service';


@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.css']
})
export class ListAdminsComponent implements OnInit {
  @ViewChild('inputDescription') inputDescription: any;
  @ViewChild('chosenDepartment') chosenDepartment:any;

  // @ViewChild('inputDescription_') inputDescription: any;
@ViewChild('supervisorId') supervisorId:any;
@ViewChild('optionValue') optionValue:any;
@Input('inputValue') inputValue:any;

  signUpForm: User = new User;
  errors: any = [];
  students2:any = [];
  allAdmins:any = [];

  pCheck: string ='';
  faculties:any;
  departments:any;
  constructor( private userService: UserService, private authService:AuthService,private router: Router, private departmentFacultiesService: DepartmentFacultiesService, private apiService: ApiserviceService ) { }
  userDetails:any =  JSON.parse(localStorage.getItem('activeUser')!);
  ngOnInit(): void {




    console.log("User Details", this.userDetails);
    console.log("disciplineId", this.userDetails.disciplineId);
    this.signUpForm.userType = 2;
    this.signUpForm.password = "283DDF1W@88*";
    this.signUpForm.disciplineId = this.userDetails.disciplineId;
    this.signUpForm.confirmPassword = this.signUpForm.password;
    this.departmentFacultiesService.getFaculties().subscribe((data:any)=>{
      this.faculties = data.faculties;
    })
    console.log(this.signUpForm);
  }

  getFacultyDepartments()
  {
    this.departmentFacultiesService.getDepartment(this.inputDescription.nativeElement.value).subscribe((data:any)=>{
      this.departments = data.departments;
    })
    
  }

  checkPassword():void{this.pCheck = this.signUpForm.password !== this.signUpForm.confirmPassword ? 'Password does not match' : '' }

  signUp(){
    this.signUpForm.disciplineId = this.chosenDepartment.nativeElement.value;

    this.authService.signUp(this.signUpForm).subscribe({
      next: data => {
        // console.log('Sign in data:',data)
        var newData:any = data;
        // console.log(newData.status);
        this.errors = [];
        if(newData.status == "success")
        {
          this.router.navigate(['/login']);
        }
      },
      error: err => {
        this.errors[0] = err.message;
      }
    })
  }

  parseSupervisorJSON(object:any)
{
  let supervisor:any;  
  if(object != 0){
      supervisor = JSON.parse(object);
      supervisor = supervisor.title + ' ' +  supervisor.firstName + ' ' + supervisor.lastName;
  }
  else
      supervisor = "Not Assigned";

  return supervisor;
}

parseSupervisorNameJSON(object:any)
{
  let supervisor:any;  
  if(object != 0){
      supervisor = JSON.parse(object);
  }
  else
      supervisor = "Not Assigned";

  return supervisor.firstName;
}
parseSupervisorLastJSON(object:any)
{
  let supervisor:any;  
  if(object != 0){
      supervisor = JSON.parse(object);
  }
  else
      supervisor = "Not Assigned";

  return supervisor.lastName;
}
assignSupervisor(projectId:any)
{
  let supervisorId =this.optionValue.nativeElement.value;
    
  
  let data:any = {supervisorId: supervisorId}
  console.log(data);
  this.apiService.updateProject(projectId, data).subscribe((res)=>{
      console.log(res);
      if(res.status == "success")
      {
          // this.showAlert = true;
      }

  })
}
parseProjectJSON(object:any)
{
  let project:any;  
  if(object != 0){
      project = JSON.parse(object);
  }
  else
      project = "Not Created";

  return project;
}
parseProjectNameJSON(object:any)
{
  let project:any;  
  if(object != 0){
      project = JSON.parse(object);
  }
  else
      project = "Not Created";

  return project.name;
  
}
parseProjectDescriptionJSON(object:any)
{
  let project:any;  
  if(object != 0){
      project = JSON.parse(object);
  }
  else
      project = "Not Created";

  return project.description;
  
}
}
