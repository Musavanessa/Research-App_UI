import { Component, OnInit, ViewChild, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs';
import { ChatboxServiceService } from 'src/app/services/chatbox/chatbox-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-project-events',
  templateUrl: './project-events.component.html',
  styleUrls: ['./project-events.component.css'],
  
})
export class ProjectEventsComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }
  selected: Date | null | undefined;
  ngOnInit(): void {
    // if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
    //   queryParams: { message: 'Please log out first ' }
    // });
  }

  //CREATE NEW GOAL VARIABLES
  createGoalDisplay = "";
  createGroupChatDataDetailsTop = "";
  createGroupChatDataDetailsLeft = "";
  createCoalDataDetailsLeft = "";
  createGoalDataDetailsTop = "";
  svgImage = "add_circle_green_24dp.svg";
  transformElement = "transform: rotate(0deg);"
  editGoalDataDetails = {
    bottom: 226.390625,
    height: 0,
    left: 187.921875,
    right: 228.859375,
    top: 226.390625,
    width: 40.9375,
    x: 187.921875,
    y: 226.390625,
  }
  editGoalDataDetailsLeft = (this.editGoalDataDetails.left * 1.3 )+ "px";
  editGroupChatDataDetailsRight = (this.editGoalDataDetails.right * 1.5)+ "px";
  editGoalDataDetailsTop = (this.editGoalDataDetails.top * 1) + "px";


  //GOAL SETTINGS VARIABLES
  @ViewChild('groupSettingsCard') groupSettingsCard :any;
  displayGoalSettingsCard = "block";
  goalName = "";
  goalAcceptanceCriteria = "Student must explain guidelines";


  //GOAL
  goals:any;
  moreDetails:any;


  closeCreateNewGoal()
  {

  }


  createGoalTitleInputCheck()
  {

  }


  createNewGoal()
  {

  }

  showCreateNewGoal(event:any)
  {

  }


  goalSettingsCardCloseButton()
  {

  }

  updateGoal()
  {

  }

  deleteGoal(goalName:any)
  {

  }

  openGoal(goalId:any)
  {

  }

  closeGoalsCard(event:any, goalId:any)
  {

  }

  getElementPosition(moreDetails:any)
  {

  }
}
