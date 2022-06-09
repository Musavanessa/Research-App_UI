import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import {MatCardModule} from '@angular/material/card';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { GlobalVariables} from './../../../globals';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { ProjectObjectService } from './projects/project-object.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {




  constructor(public userService: UserService,  public projectObject : ProjectObjectService, public datepipe: DatePipe, public router:Router, public globalVariables: GlobalVariables, private service: ApiserviceService, public authService: AuthService ) { }
  userType: string = "1";

  userData:any;
  studentList:any;

  isDisplaySuccessMessage = false;
  isDisplayErrorInputMessage = false;
  allStudents:any;

  // openStudentInferface(userData:any)
  // {

  // }


  faCoffee = faCoffee;
  //This variable increments each time we populate an input box the reason for having this variable is so that when we get to a certain number then we should enable the input button
  inputButtonEnabler = 0;
  myProjectsObject: any;
  allDisciplinesObject: any;
  i!: number;
  projectData: any;
  //Now the goal is to make sure that I create an object
  
  
  
  first2Projects: any;
  newProjectObject = {projectTypeId: 1, userId: 2, description: "", descipline: "", researchType: "", name: ""};
  // inputDescription + inputDescipline + inputResearchP + inputResearch + inputTitle
  @ViewChild('inputDescription') inputDescription: any;
  @ViewChild('inputDescipline') inputDescipline: any;
  @ViewChild('inputResearchP') inputResearchP:any;
  @ViewChild('inputResearch') inputResearch:any;
  @ViewChild('inputTitle') inputTitle:any;
  @ViewChild('projectSaveButton') projectSaveButton:any;

  ngOnInit(): void {
    this.globalVariables.showSideNav();
    console.log(GlobalVariables.isToBeShown + ' is ');
   
    this.allDisciplines();

    this.userService.getUser().subscribe((data: any) => {
      this.userType = data.user.userType;
      this.userData = data.user;

        this.getAllUsers(this.userData.id);
      
  
      console.log('show: ',this.userData);
      this.projectObject.setUserDetails(data.user);
      this.myUserProjects(data.user);
    });
    this.testObservable();
    // this.projectObject.sequenceSubscriber(this.userType)
    this.projectObject.sequence.subscribe({
      next(num) {console.log(num);},
      complete() {console.log('Finished sequence');}
    });


    

    // if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
    //   queryParams: { message: 'Please log out first ' }
    // });
  }



  getAllUsers(id:any)
  {
    this.userService.getAllUsersWhere(id).subscribe((data:any)=>{
      console.log("Hi there");
      this.allStudents = data;
      console.log("All Student", data);
    })
  }

  closeErrorInputMessage()
  {
    if(this.isDisplayErrorInputMessage)
      this.isDisplayErrorInputMessage = false;
    else
      this.isDisplayErrorInputMessage = true;
  }
  closeDisplaySuccessMessage()
  {
    if(this.isDisplaySuccessMessage)
    {
      this.isDisplaySuccessMessage = false;
    }
    else
    {
      this.isDisplaySuccessMessage = true;
    }
  }

  disableProjectSaveButtons()
  {
    this.inputButtonEnabler = 0;
    //  this.projectSaveButton.nativeElement.disabled = true;
     if(this.inputDescription.nativeElement.value !="")
     {
       this.inputButtonEnabler++;
       this.inputDescription.nativeElement.style.borderColor = "lightgrey";
     }
     else
     {
      //  this.inputDescription.nativeElement.style.backgroundColor = "red";
       this.inputDescription.nativeElement.style.borderColor = "red";
     }
     if(this.inputDescipline.nativeElement.value !="")
     {
       this.inputButtonEnabler++;
     }
     else
     {
      this.inputDescipline.nativeElement.style.borderColor = "red";
     }
     if(this.inputTitle.nativeElement.value !="")
     {
      this.inputTitle.nativeElement.style.borderColor = "lightgrey";
       this.inputButtonEnabler++;
     }
     else
     {
      this.inputTitle.nativeElement.style.borderColor = "red";
     }
     return this.inputButtonEnabler;
  }

  saveProject()
  {
    if(this.inputResearchP.nativeElement.checked)
    {
      this.newProjectObject.researchType = this.inputResearchP.nativeElement.value;
    }
    else
    {
      this.newProjectObject.researchType = this.inputResearch.nativeElement.value;
    }
    let createProjectObject = {
      description: this.inputDescription.nativeElement.value,
      name:this.inputTitle.nativeElement.value,
      descipine: this.inputDescipline.nativeElement.value,
      projectStatusId: 1,
      projectTypeId:this.newProjectObject.researchType, 
      userId:  this.userData.id
    }
    if(this.disableProjectSaveButtons() == 3)
    {
      this.createNewProject(createProjectObject);
      this.clearCreateProject();
      this.showCreateProject();
    }
    else
    {
      console.log("Fill in all the fields");
      this.closeErrorInputMessage();
    }
  }
  updateProjectObject(projectId:any)
  {
      // this.projectObject.updateProjectObject(projectId);
      this.service.getProject(projectId).subscribe((res)=>{
        this.projectObject.setProjectObject(res.project);
      });
  }
  createNewProject(data:any)
  {
    console.log("We are creating a new project");
    console.log(data);
    this.service.createNewProject(data).subscribe((res)=>{
      console.log(res, 'res=>');
      this.ngOnInit();
      this.closeDisplaySuccessMessage()
    });
  }
  clearCreateProject()
  {
      this.newProjectObject.descipline = "";
      this.newProjectObject.description  = "";
      this.newProjectObject.researchType = "";
      this.newProjectObject.name = "";
      this.inputDescription.nativeElement.value = "";
      this.inputTitle.nativeElement.value = "";
  }
  createProjectDisplay = "none";
  transformElement = "transform: rotate(0deg);"
  svgImage = "add_circle_green_24dp.svg";
  isOpenCreateProject = false;
  showCreateProject()
  {
    if(this.isOpenCreateProject)
    {
      this.createProjectDisplay = "none";
      this.isOpenCreateProject = false;
      this.transformElement = "transform: rotate(0deg);"
      this.svgImage = "add_circle_green_24dp.svg";
    }
    else
    {
      this.createProjectDisplay = "unset";
      this.isOpenCreateProject = true;
      this.transformElement = "transform: rotate(45deg);"
      this.svgImage = "add_circle_red_24dp.svg";

    }
  }
  showCreateProject_()
  {
    this.showCreateProject();
  }

  allDisciplines()
  {
    this.service.disciplines().subscribe((res)=>{
      this.allDisciplinesObject = res.disciplines;
      console.log(this.allDisciplinesObject)
    })
  }
  myUserProjects(userData:any)
  {
    this.service.getUserProjects(userData.id).subscribe((res)=>{
      // this.service.projects().subscribe((res)=>{
      // console.log(this.userData.id);
        console.log(res);
      // console.log(res.projects);
      // this.myProjectsObject = res.projects;

      
      this.first2Projects = Array.prototype.slice.call(res.projects,);
      this.myProjectsObject = Array.prototype.slice.call(res.projects, 1);

      console.log("My projects");
      console.log(this.first2Projects);
    })

  }


  getMe(){

    this.userService.getUser().subscribe((data: any) => {
      this.userType = data.user.userType;
      console.log(data.user.userType + " = User Type");

      console.log('show: ',this.userType);
    })
  }

  testObservable()
  {
    //Create simple observable that emits three values
    const myObservable = of(1, 2, 3);

    //Create observer object
    const myObserver = {
      next: (x: number) => console.log('Observer got a next value: ' + x),
      error: (err: Error) => console.error('Observarble got an error: ' + err),
      complete: ()=> console.log('Observable got a complete notification '), 
    };

    //Execute with the observer object
    myObservable.subscribe(myObserver);
  }
  isUserSupervisor(data:string)
  {
    if(data == "2")
    {
      console.log(data + " The user type is ");
      return true;
      
    }
    else
    {
      console.log(data + " The user type is ");
      return false;
    }

  }

  openStudentPortal(project_student:any)
  {
      // this.projectObject.myObservable = project_student;
      this.projectObject.passStudentData(project_student);
  }

  openProjectSelected(project:any)
  {
    this.projectObject.setOpenedProjectObject(project);
  }

}
