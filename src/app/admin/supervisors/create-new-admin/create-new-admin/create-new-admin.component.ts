import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DepartmentFacultiesService } from 'src/app/services/department-faculties/department-faculties.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';


@Component({
  selector: 'app-create-new-admin',
  templateUrl: './create-new-admin.component.html',
  styleUrls: ['./create-new-admin.component.css']
})
export class CreateNewAdminComponent implements OnInit {
  @ViewChild('inputDescription') inputDescription: any;
  @ViewChild('chosenDepartment') chosenDepartment:any;
  signUpForm: User = new User;
  errors: any = [];
  pCheck: string ='';
  faculties:any;
  departments:any;
  constructor(private authService:AuthService,private router: Router, private departmentFacultiesService: DepartmentFacultiesService ) { }
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
    // this.signUpForm.disciplineId = this.chosenDepartment.nativeElement.value;

    this.authService.signUp(this.signUpForm).subscribe({
      next: data => {
        // console.log('Sign in data:',data)
        var newData:any = data;
        // console.log(newData.status);
        this.errors = [];
        if(newData.status == "success")
        {
          this.router.navigate(['/admin/manage-supervisors']);
        }
      },
      error: err => {
        this.errors[0] = err.message;
      }
    })
  }

}
