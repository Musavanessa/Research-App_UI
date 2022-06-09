import { Component, OnInit, ViewChild, HostListener, ElementRef, ViewChildren, QueryList, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectObjectService } from '../../project-object.service';
import { GoalsService } from 'src/app/services/project-events-goals/goals.service';
import { elementAt, first, startWith } from 'rxjs';
import { ChatboxServiceService } from 'src/app/services/chatbox/chatbox-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { ThisReceiver } from '@angular/compiler';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';


@Component({
  selector: 'app-project-events',
  templateUrl: './project-events.component.html',
  styleUrls: ['./project-events.component.css'],
  template: `
  <ng-template #isTodayDateTemplate>
    <td><div class="highlightTodayDate" >{{week[0].value}}</div></td>
  </ng-template>`

})
export class ProjectEventsComponent implements OnInit {


  constructor(public goalsService:GoalsService, public projectObjectService : ProjectObjectService, public datepipe: DatePipe, public router: Router, public authService: AuthService) { }
  selected: Date | null | undefined;

  //=====================
  //GENERAL VARIABLES
  //=====================
  userDetails:any;
  studentData:any;



  //========================================================
  //VARIABLES ----- REQUEST APPOINTMENT VARIABLES & APPOINTMENT VARIABLES
  //========================================================
    @ViewChild('requestAppointmentInputTitle') requestAppointmentInputTitle:any;
    @ViewChild('requestAppointmentInputStartDate') requestAppointmentInputStartDate :any;
    @ViewChild('requestAppointmentInputEndDate') requestAppointmentInputEndDate : any;
    @ViewChild('requestAppointmentInputDetails') requestAppointmentInputDetails : any;
    createAppointmentErrorList = [false, false, false, false];
    createAppointmentValuesValid = [false, false, false, false];
    createAppointmentWarningList = [false, false, false, false];
    appointments:any;
    requestNewAppointment = {
      title: "",
      createdAt: Date(),
      endDate: undefined,
      details: "",
      approved: false,
      type:1,
      updatedAt: Date()
    }
    requestApointmentFocused:any;

  //========================================================
  //VARIABLES ----- FOR EVENT TEMPLATE
  //========================================================
  @ViewChild('createEventInputTitle') createEventInputTitle:any;
  @ViewChild('createEventInputStartDate') createEventInputStartDate :any;
  @ViewChild('createEventInputEndDate') createEventInputEndDate : any;
  @ViewChild('createEventInputDetails') createEventInputDetails : any;
  createEventErrorList = [false, false, false, false];
  createEventWarningList = [false, false, false, false];
  events:any;
  newEventObject = {
    title: "",
    createdAt: Date(),
    endDate: undefined,
    details: ""
  }
  createEventValuesValid = [false, false, false, false];

  //========================================================
  //VARIABLES ----- FOR CREATE GOAL TEMPLATE
  //========================================================
  @Pipe({ name: 'reverse' })
  @ViewChild('createGoalInputTitle') createGoalInputTitle:any;
  @ViewChild('createGoalInputStartDate') createGoalInputStartDate:any;
  @ViewChild('createGoalInputEndDate') createGoalInputEndDate:any;
  @ViewChild('createGoalInputDecription') createGoalInputDecription:any
  @ViewChild('createGoalInputAcceptanceCriteria')  createGoalInputAcceptanceCriteria:any
  createGoalErrorList   = [false, false, false, false, false];
  createGoalValuesValid = [false, false, false, false, false];
  createGoalWarningList = [false, false, false, false, false];
  // goals:any;
  createGoalObject = {
    title: "",
    createAt : Date(),
    dueDate: undefined,
    outcome: "",
    acceptanceCriteria: "",
    projectId: 0,
    userId: 0,
    projectStatusId: 1
  }
  tempAcceptanceCriteriaList = "";
  acceptanceCriteriaList: any = [];
  showAddIconOnAddGoal:boolean = true;
  showNumAcceptanceCriteriaItem = 0;
  isGoalSuccessfullyCreated:boolean = false;
  isGoalNotSuccessfullyCreated:boolean = false;
  goalsObject:any;
  presentWorkingProject:any;

  //==========================
  //GOALS VARIABLES
  //==========================
  goals: any;
  goalsListDisplayStatus:any = [];
  svgImageAccordionGoals:any = [];
  transFormElements:any = [];
  goalsTimeStatus:any = [];
  percentageToCompletion:any = [];
  goalTimeOut:any = [];
  typeOfIconToUseOnPercentage:any = [];
  typeOfIconToUseOnPercentageList:any = [
    "../../../../../../../assets/media/icons/circle/circle_red.svg",
    "../../../../../../../assets/media/icons/circle/circle_orange.svg",
    "../../../../../../../assets/media/icons/circle/circle_green.svg",
    "../../../../../../../assets/media/icons/circle/circle_black.svg"
  ]
  goalsStatuses:any = [];
  goalStatus:any = [ "Inprogress", "Completed", "Cancelled", "Overdue"];
  elementBackgroudColor:any = ["background-color: rgb(234, 240, 184)"];
  goalsMinsLeft:any = [];
  goalsHoursLeft:any = [];
  goalsDaysLeft:any = [];
  goalTemplate = true;
  goalsTimeStatusTextColors = ["darkgreen", "rgb(138, 124, 1)", "red"];
  goalsTimeSTatusBackGroundColors:any = ["rgb(178, 231, 178)","rgb(234, 240, 184)", "rgb(241, 172, 172)"];
  goalsTimeSTatusBackGroundColor:any = [];
  goalsTimeStatusTextColor:any = [];



  // @ViewChild(isTodayDateTemplate)
  templateName = "template_calendar";

  //TEMPLATE VARIABLES
  appointment_tempate_status: boolean = false;
  goal_tempate_status: boolean = false;
  event_tempate_status: boolean = false;
  calendar_tempate_status: boolean = true;
  template_statuses = [true, false, false, false]
  todayDate = new Date();


  //CALENDAR VARIABLES
  weeks = [ 
    [{ isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }],
    [{ isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }],
    [{ isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }],
    [{ isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }],
    [{ isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }],
    [{ isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: false, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }, { isOfMonth: true, value: 0, isWeekEnd: true, isToday: false, dateId: "" }]
  ];


  weeksis = [1, 2, 3, 4, 5, 6];
  dayNumber = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  todayVariable: any;


  //WHAT WOULD YOU LIKE TO DO DIALOG
  displayWhatWouldYouLikeToDo = "none";

  ngOnInit(): void {
   this.userDetails = this.projectObjectService.getUserDetails();

   this.studentData = this.projectObjectService.getPassStudentData();
   // console.log(this.requestNewAppointment);
    // if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
    //   queryParams: { message: 'Please log out first ' }
    // });

    let dateTime: Date = new Date();
    let today = new Date(dateTime.getFullYear(), dateTime.getMonth());
    this.todayVariable = this.formatDate(dateTime);
    //console.log("Today is " + this.todayVariable);
    //console.log("Today variable is = " + this.todayVariable);
    let date: Date = new Date();
    //console.log("Date = " + date); //Date = Tue Feb 05 2019 12:05:22 GMT+0530 (IST)  
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //console.log(firstDay + " The first day");
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var nFirstDay = this.formatDate(firstDay);
    var nLastDay = this.formatDate(lastDay);
    //console.log(this.formatDate(firstDay));
    //console.log(this.dateDiff(nFirstDay, nLastDay));
    //console.log(this.findDateStart(firstDay));
    var letStartDateDay = this.findDateStart(firstDay);
    var letEndDateDay = this.findDateStart(lastDay);

    //console.log(this.weeks[0][1].value);


    //Split the days of the week into 4 - 
    var numWeeks: number = Math.floor(this.dateDiff(nFirstDay, nLastDay) / 7) + 1;
    //console.log("Number of weeks in Month = " + Math.floor(this.dateDiff(nFirstDay, nLastDay)%7))

    //console.log("Number of Weeks " + numWeeks);
    let startDayOfTheWeek = this.dayNumber.indexOf(letStartDateDay!)
    let endDayOfTheWeek = this.dayNumber.indexOf(letEndDateDay!)

    //console.log("Start Day of the Week " + startDayOfTheWeek)
    let tempfirstDay: number = this.dayAsNum(nFirstDay);
    let tempLastDay: number = this.dayAsNum(nLastDay);
    //console.log("End day of the week" + endDayOfTheWeek + "\nNumber of Weeks " + numWeeks+  "\nLast Day of the Week " + tempLastDay)
    let dateCounter = 1;
    let monthPrint = this.getMonth(date);
    // console.log(this.getMonth(date));
    let oldMonth  = new Date();
    oldMonth.setDate(1);
    oldMonth.setMonth(oldMonth.getMonth()-1);
    // let lastDayOfPrevMonth = (date.getFullYear(), date.getMonth() + 1, 0);

    //The first Weeek
    for (let y = 0; y < 1; y++) {
      for (let x = 0; x < this.weeks[y].length; x++) {
        if (y == 0 && x == startDayOfTheWeek) {
          this.weeks[y][x].value = +tempfirstDay;
          this.weeks[y][x].isOfMonth = true;
          this.weeks[y][x].dateId = dateCounter + monthPrint!;
        }
        else
        {
          this.weeks[y][x].value = 0;
          this.weeks[y][x].isOfMonth = false;
        }
      }
    }

    for (let y = 1; y < this.weeks.length; y++) {
      //we need to get the list of all the weeks

      for (let x = 0; x < this.weeks[y].length; x++) {
        dateCounter++;
        //We want to loop from  day 1 to day 7
        //Place the first day
        //The first day is on a sunday( which means we need to loop 1)


        //Get the day of the week

        if (y <= numWeeks && x <= tempLastDay && !(y == 0 && x == startDayOfTheWeek) && !(y == numWeeks && x == endDayOfTheWeek)) {
          this.weeks[y][x].value = dateCounter;
          this.weeks[y][x].isOfMonth = true;
          this.weeks[y][x].dateId = dateCounter + monthPrint!;
        }
        if (dateCounter >= tempLastDay) {
          dateCounter = 0;
          this.weeks[y][x].isOfMonth = false;
        }
        if (y == numWeeks && x == endDayOfTheWeek) {
          this.weeks[y][x].value = +tempLastDay;
          this.weeks[y][x].isOfMonth = true;
          this.weeks[y][x].dateId = tempLastDay + monthPrint!;
        }
        // console.log(this.todayVariable + " Today Variable " + this.weeks[y][x].value);
        if (this.weeks[y][x].value == this.todayVariable) {
          this.weeks[y][x].isToday = true;
          // console.log("The   = " + this.weeks[y][x].value);
          // console.log("The   = " + this.weeks[y][x].isToday);
        }
      }
    }

  }

  changeActiveStatus(iconId:number)
  {
    //Changing the active status will affect the template that is to be shown.
    for(let x =0; x < this.template_statuses.length; x++)
    {
      if(x == iconId)
      {
        this.template_statuses[x] = true;
      }
      else
      {
        this.template_statuses[x] = false;
      }
    }
    if(this.template_statuses[3])
    {
      //Get all goals again.
      //I need to get the project details.
      let openedProject = this.projectObjectService.getPassStudentData();
      this.presentWorkingProject = this.projectObjectService.getOpenedProjectObject();
      console.log("Opened Project ", openedProject); 
      //There are two posibilitise - 
      if(this.userDetails.userType == '2')
      {
        this.goalsService.getAllGoalsWhere(openedProject.id).subscribe((data:any)=>{
          console.log(data);
          this.goals = data.goal;
          console.log("console.log(this.goals) = " + this.goals);
          let svgImage =  "../../../../../../../assets/media/icons/circle/circle_green.svg"
          let svgImageAccordionGoal = {
            image: svgImage,
            isCardExpanded: false,
            transformElement: this.transFormElements[1]
          }
          for(let x = 0; x < this.goals.length; x++)
          {
            let countDownDate = new Date(this.goals[x].dueDate).getTime();
            //Push to the goals time left:
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            //Update the time status - if the value is minutes 0
            
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.goalsMinsLeft[x] = minutes + " M";
            this.goalsHoursLeft[x] = hours + " H";
            this.goalsDaysLeft[x] = days + " D"
  
  
            let createdAt = new Date(data.goal[x].createdAt).getTime();
            let endDate = new Date(data.goal[x].dueDate).getTime();
            let today = new Date().getTime();
            let goalPercentage =  ((today - createdAt) / ( endDate - createdAt)) * 100;
            //I just need to know the goals status - but the goals status also affects its 
            //Update the date and set to the right date if the the percentance is greater than 100
            if(goalPercentage > 100 && data.goal[x].projectStatusId != 11)//Update the goal only when the status is not overdue but the goal percentage is greater than 100
            {
              //Update the goal
              this.goalsStatuses.push(this.goalStatus[3])
              let goal = {id: data.goal[x].id, projectStatusId: 11}
              console.log(goal);
              this.goalsService.goalUpdateStatus(goal).subscribe((res)=>{
                console.log(res);
              });
            }
            else
            {
              switch (data.goal[x].project_status.id) {
                case 1:
                  this.goalsStatuses.push(this.goalStatus[0])
                  break;
                case 2:
                  this.goalsStatuses.push(this.goalStatus[1])
                  break;
                case 9:
                  this.goalsStatuses.push(this.goalStatus[2])
                  break;
                case 11:
                  this.goalsStatuses.push(this.goalStatus[3])
                  break;
              }
            }
            if(goalPercentage <= 50 && goalPercentage >= 0)
            {
              //TIME IS GOOD ON GREEN
              console.log(goalPercentage + " <= 50 && " + goalPercentage + " >= 0");
              this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[2]);
              this.goalTimeOut.push(false);
              this.goalsTimeSTatusBackGroundColor.push(this.goalsTimeSTatusBackGroundColors[0])
              this.goalsTimeStatusTextColor.push(this.goalsTimeStatusTextColors[0]);
            }
            else
            {
              if(goalPercentage > 50 && goalPercentage <=100)
              {
                //TIME IS STILL GOOD BUT ORANGE
                console.log(goalPercentage + " > 50 && " + goalPercentage + " <= 100");
                this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[1]);
                this.goalTimeOut.push(false);
                this.goalsTimeSTatusBackGroundColor.push(this.goalsTimeSTatusBackGroundColors[1])
                this.goalsTimeStatusTextColor.push(this.goalsTimeStatusTextColors[1]);
  
              }
              else
              {
                //TIME IS OVERDUE
                console.log(goalPercentage + " > 100");
                this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[0]);
                this.goalTimeOut.push(true);
                this.goalsTimeSTatusBackGroundColor.push(this.goalsTimeSTatusBackGroundColors[2])
                this.goalsTimeStatusTextColor.push(this.goalsTimeStatusTextColors[2]);
  
  
              }
            }
            if(goalPercentage < 0)
            {
              console.log(goalPercentage + " < 0");
              this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[0]);
              this.goalTimeOut.push(true);
              if(data.goal[x].project_status.id == 1)
              {
                this.goalsStatuses.push(this.goalStatus[3])
              }
            }
            this.percentageToCompletion.push((parseInt(String(goalPercentage))));
            this.goalsListDisplayStatus.push(false);
            this.transFormElements.push("transform: rotate(0deg);");
            //To get the time status - I need 3 dates - Firstly I need need the start date
            //Take the start date and substract it with today date - 
            //Take the final date and substract it with the start date
            //Get the percentage
            /*
            ((todayDate - startDate)/(startDate - endDate)) * 100
            */
            this.svgImageAccordionGoals.push(svgImageAccordionGoal);
          }
    
        
        });
      }
      else
      {
        this.goalsService.getAllGoalsWhere(this.presentWorkingProject.id).subscribe((data:any)=>{
          console.log(data);
          this.goals = data.goal;
          console.log("console.log(this.goals) = " + this.goals);
          let svgImage =  "../../../../../../../assets/media/icons/circle/circle_green.svg"
          let svgImageAccordionGoal = {
            image: svgImage,
            isCardExpanded: false,
            transformElement: this.transFormElements[1]
          }
          for(let x = 0; x < this.goals.length; x++)
          {
            let countDownDate = new Date(this.goals[x].dueDate).getTime();
            //Push to the goals time left:
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            //Update the time status - if the value is minutes 0
            
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.goalsMinsLeft[x] = minutes + " M";
            this.goalsHoursLeft[x] = hours + " H";
            this.goalsDaysLeft[x] = days + " D"
  
  
            let createdAt = new Date(data.goal[x].createdAt).getTime();
            let endDate = new Date(data.goal[x].dueDate).getTime();
            let today = new Date().getTime();
            let goalPercentage =  ((today - createdAt) / ( endDate - createdAt)) * 100;
            //I just need to know the goals status - but the goals status also affects its 
            //Update the date and set to the right date if the the percentance is greater than 100
            if(goalPercentage > 100 && data.goal[x].projectStatusId != 11)//Update the goal only when the status is not overdue but the goal percentage is greater than 100
            {
              //Update the goal
              this.goalsStatuses.push(this.goalStatus[3])
              let goal = {id: data.goal[x].id, projectStatusId: 11}
              console.log(goal);
              this.goalsService.goalUpdateStatus(goal).subscribe((res)=>{
                console.log(res);
              });
            }
            else
            {
              switch (data.goal[x].project_status.id) {
                case 1:
                  this.goalsStatuses.push(this.goalStatus[0])
                  break;
                case 2:
                  this.goalsStatuses.push(this.goalStatus[1])
                  break;
                case 9:
                  this.goalsStatuses.push(this.goalStatus[2])
                  break;
                case 11:
                  this.goalsStatuses.push(this.goalStatus[3])
                  break;
              }
            }
            if(goalPercentage <= 50 && goalPercentage >= 0)
            {
              //TIME IS GOOD ON GREEN
              console.log(goalPercentage + " <= 50 && " + goalPercentage + " >= 0");
              this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[2]);
              this.goalTimeOut.push(false);
              this.goalsTimeSTatusBackGroundColor.push(this.goalsTimeSTatusBackGroundColors[0])
              this.goalsTimeStatusTextColor.push(this.goalsTimeStatusTextColors[0]);
            }
            else
            {
              if(goalPercentage > 50 && goalPercentage <=100)
              {
                //TIME IS STILL GOOD BUT ORANGE
                console.log(goalPercentage + " > 50 && " + goalPercentage + " <= 100");
                this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[1]);
                this.goalTimeOut.push(false);
                this.goalsTimeSTatusBackGroundColor.push(this.goalsTimeSTatusBackGroundColors[1])
                this.goalsTimeStatusTextColor.push(this.goalsTimeStatusTextColors[1]);
  
              }
              else
              {
                //TIME IS OVERDUE
                console.log(goalPercentage + " > 100");
                this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[0]);
                this.goalTimeOut.push(true);
                this.goalsTimeSTatusBackGroundColor.push(this.goalsTimeSTatusBackGroundColors[2])
                this.goalsTimeStatusTextColor.push(this.goalsTimeStatusTextColors[2]);
  
  
              }
            }
            if(goalPercentage < 0)
            {
              console.log(goalPercentage + " < 0");
              this.typeOfIconToUseOnPercentage.push(this.typeOfIconToUseOnPercentageList[0]);
              this.goalTimeOut.push(true);
              if(data.goal[x].project_status.id == 1)
              {
                this.goalsStatuses.push(this.goalStatus[3])
              }
            }
            this.percentageToCompletion.push((parseInt(String(goalPercentage))));
            this.goalsListDisplayStatus.push(false);
            this.transFormElements.push("transform: rotate(0deg);");
            //To get the time status - I need 3 dates - Firstly I need need the start date
            //Take the start date and substract it with today date - 
            //Take the final date and substract it with the start date
            //Get the percentage
            /*
            ((todayDate - startDate)/(startDate - endDate)) * 100
            */
            this.svgImageAccordionGoals.push(svgImageAccordionGoal);
          }
    
        
        });
      }
      //Now we want to get all the goals that have been 
      console.log("This is the goals object " + this.goals)
      console.log(this.goalsListDisplayStatus);
      console.log(this.svgImageAccordionGoals);
    }
    console.log(this.svgImageAccordionGoals);

  }

  removeWhiteSpace(tempString:string)
  {
    return tempString.trim();
  }

  formatDate(date: any) {

    return this.datepipe.transform(date, 'dd');
  }

  formateShowDate(date:any)
  {
    return date
  }

  getMonth(date: any) {
    // console.log(this.datepipe.transform(date, "dd-MMM-y"))
    return this.datepipe.transform(date, "-MM-y")
  }

  formatTodayDate(date:any)
  {
    return this.datepipe.transform(date, "dd MMM y")
  }

  exampleDate = "2022-05-19T07:33";
  formatDateFull(date:any)
  {
    /*A string representing a global date and time.
    Value: A valid date-time as defined in [RFC 3339], with these additional qualifications:
      •the literal letters T and Z in the date/time syntax must always be uppercase
      •the date-fullyear production is instead defined as four or more digits representing a number greater than 0
    Examples:
      1990-12-31T23:59:60Z
      1996-12-19T16:39:57-08:00
    */
    return this.datepipe.transform(date, "y-MM-dd") + "T" + this.datepipe.transform(date, "hh:mm");
  }

  dateDiff(start: any, end: any) {
    let newStart: number = +start;
    let newEnd: number = +end;
    // return ((newEnd - newStart));
    return newEnd;
    //Now we need to find out when the date is going to start.
  }

  dayAsNum(startDay: any) {
    let start: number = +startDay;
    return start;
  }
  findDateStart(date: any) {
    //but we need to return the column number
    return this.datepipe.transform(date, 'EEEE')
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
  editGoalDataDetailsLeft = (this.editGoalDataDetails.left * 1.3) + "px";
  editGroupChatDataDetailsRight = (this.editGoalDataDetails.right * 1.5) + "px";
  editGoalDataDetailsTop = (this.editGoalDataDetails.top * 1) + "px";


  //GOAL SETTINGS VARIABLES
  @ViewChild('groupSettingsCard') groupSettingsCard: any;
  displayGoalSettingsCard = "block";
  goalName = "";
  goalAcceptanceCriteria = "Student must explain guidelines";


  //GOAL

  moreDetails: any;
  getDateClickedDay:any;
  finalShowDate:any;
  dateClicked(dateId: any, dateObjet:any) {
    //We can make use of the date - 
    // console.log(dateObjet);
    let tempDateID ="";
    if(dateId.length < 10)
    {
      tempDateID = 0 + dateId;
    }
    else
    {
      tempDateID = dateId;
    }
    // console.log(tempDateID);
    let numMonth = tempDateID[3] + tempDateID[4];

    this.finalShowDate  = tempDateID[0] + tempDateID[1] + " " + this.months[+numMonth-1] + " " + tempDateID[6]  + tempDateID[7]  + tempDateID[8]  + tempDateID[9];
    // let startIndex =dateId.indexOf("-");
    // console.log(dateId.substring(startIndex, 5))

    // console.log("Show the date id = " + dateId);
    this.getDateClickedDay = dateObjet.dateId;
    this.displayWhatWouldYouLikeToDo = "block";
  }


  closeCreateNewGoal() {

  }

  closedWhatWouldYouLikeToDo()
  {
    this.displayWhatWouldYouLikeToDo = "none";
  }


  createGoalTitleInputCheck() {

  }


//================================
//REQUEST APPOINTMENTS FUNCTIONS 
//==================================
        //INPUT VALIDATOR METHODS
        validateRequestAppointmentInputTitle(){
          //Remove trailing white space
          this.requestAppointmentInputTitle.nativeElement.value = this.requestAppointmentInputTitle.nativeElement.value.replace(/^\s+/g, '');;
          if(this.requestAppointmentInputTitle.nativeElement.value.trim() == ""){
            this.createAppointmentErrorList[0] = true;
            this.createAppointmentValuesValid[0] = false;
          }
          else
          {
            this.createAppointmentErrorList[0] = false;
            this.createAppointmentValuesValid[0] = true;
          }
        }
        validateRequestAppointmentInputDetails(){
          //Remove trailing white space
          this.requestAppointmentInputDetails.nativeElement.value = this.requestAppointmentInputDetails.nativeElement.value.replace(/^\s+/g, '');;
          if(this.requestAppointmentInputDetails.nativeElement.value.trim() == ""){ 
            this.createAppointmentErrorList[3] = true;
            this.createAppointmentValuesValid[3] = false;
          }
          else{ 
            this.createAppointmentErrorList[3] = false;
            this.createAppointmentValuesValid[3] = true;
          }
        }
        validateRequestAppointmentStartDate(){
          this.checkAppointmentStartDate()
          if(this.requestAppointmentInputStartDate.nativeElement.value == ""){
            this.createAppointmentErrorList[1] = true;
            this.createAppointmentValuesValid[1] = false;
          }
          else {
            this.createAppointmentErrorList[1] = false;
            this.createAppointmentValuesValid[1] = true;
          }
        }
        validateRequestAppointmentEndDate()
        {
          //Firstly check if the start date has been entered.
          if(this.requestAppointmentInputStartDate.nativeElement.value == ""){
            this.requestAppointmentInputEndDate.nativeElement.value = "";
            this.createAppointmentWarningList[2] = true;
            this.createAppointmentValuesValid[2] = false;
          }
          else
          {
            this.createAppointmentWarningList[2] = false;
            this.checkAppointmentEndDate();
          }
          if(this.requestAppointmentInputEndDate.nativeElement.value == "")
          {
            this.createAppointmentErrorList[2] = true;
            this.createAppointmentValuesValid[2] = false;
          }
        }
        //FUNCTIONS FOR HANDLING INPUT VALIDATION FOR CREATEING APPOINTMENT
        checkAppointmentStartDate(){
          //Here we check if the start date not less than the current day -for you cannot create an appointment which starts yesterday
          if(new Date(this.requestAppointmentInputStartDate.nativeElement.value).getTime() < new Date().getTime()){
            this.requestAppointmentInputStartDate.nativeElement.value = "";
          }
        }
        checkAppointmentEndDate(){
          //If the start date is empty - then make sure that you compare the end date with the current date plus 10 minutes
          if( new Date(this.requestAppointmentInputEndDate.nativeElement.value).getTime() <= new Date(this.requestAppointmentInputStartDate.nativeElement.value).getTime()){
            this.requestAppointmentInputEndDate.nativeElement.value = "";
            this.createAppointmentErrorList[2] = true;
            this.createAppointmentValuesValid[2] = false;
          }
          else{
            this.createAppointmentErrorList[2] = false;
            this.createAppointmentValuesValid[2] = true;
          }
        }
        createNewAppointment() {
          //Show All the native elements that have been entered
          //Check if all the values have been entered
          let checkAllVariables = 0;
          for(let x = 0; x <  this.createAppointmentValuesValid.length; x++)
          {
            if(this.createAppointmentValuesValid[x])
            {
              checkAllVariables++;
            }
            else
            {
              //Update the error list
              this.createAppointmentErrorList[x]= true;
            }
          }
          if(checkAllVariables == 4)
          {
            console.log("We can move forward");
            this.requestNewAppointment.title = this.requestAppointmentInputTitle.nativeElement.value;
            this.requestNewAppointment.createdAt = this.requestAppointmentInputStartDate.nativeElement.value;
            this.requestNewAppointment.endDate = this.requestAppointmentInputEndDate.nativeElement.value;
            this.requestNewAppointment.details = this.requestAppointmentInputDetails.nativeElement.value;
            console.log(this.requestNewAppointment);
          }
        }
  
//===========================================
//EVENT FUNCTIONS 
//============================================
        //INPUT VALIDATOR METHODS
        validateEventInputTitle()
        {
          //Remove trailing white space
          this.createEventInputTitle.nativeElement.value = this.createEventInputTitle.nativeElement.value.replace(/^\s+/g, '');;
          if(this.createEventInputTitle.nativeElement.value.trim() == "") 
          {
            this.createEventErrorList[0] = true;
            this.createEventValuesValid[0] = false;
          }
          else 
          {
            this.createEventErrorList[0] = false;
            this.createEventValuesValid[0] = true;
          }
        }
        validateEventInputStartDate()
        {
          if(new Date(this.createEventInputStartDate.nativeElement.value).getTime() < new Date().getTime()){
            this.createEventInputStartDate.nativeElement.value = "";
          }
          if(this.createEventInputStartDate.nativeElement.value == "")
          {
            this.createEventErrorList[1] = true
            this.createEventValuesValid[1] = false;

          }
          else
          {
            this.createEventErrorList[1] = false;
            this.createEventValuesValid[1] = true;

          
          }
        }
        validateEventInputEndDate()
        {
           //Firstly check if the start date has been entered
           if(this.createEventInputStartDate.nativeElement.value == "")
           {
             this.createEventInputEndDate.nativeElement.value = "";
             this.createEventWarningList[2] = true;
             this.createEventValuesValid[2] = false;
            

           }
           else
           {
              this.createEventWarningList[2] = false;
              this.createEventValuesValid[2] = true;
             

              if(new Date(this.createEventInputEndDate.nativeElement.value).getTime() < new Date(this.createEventInputStartDate.nativeElement.value).getTime()){
                this.createEventInputEndDate.nativeElement.value = "";
                this.createEventErrorList[2] = true;
              this.createEventValuesValid[2] = false;

                

              }
              else
              {
                this.createEventErrorList[2] = false;
                this.createEventValuesValid[2] = true;
              }
           }
        }
        validateEventInputDetails()
        {
          this.createEventInputDetails.nativeElement.value = this.createEventInputDetails.nativeElement.value.replace(/^\s+/g, '');
          if(this.createEventInputDetails.nativeElement.value.trim() == "") 
          {
            this.createEventErrorList[3] = true;
            this.createEventValuesValid[3] = false;
          }
          else
          {
           this.createEventErrorList[3] = false;
           this.createEventValuesValid[3] = true;
          }
        }
        //FUNCTIONS FOR HANDLING INPUT VALIDATION FOR CREATING AN EVENT
        createNewEvent()
        {
          let checkAllVariables = 0;
          for(let x =0; x < this.createEventValuesValid.length; x++){
            if(this.createEventValuesValid[x]){
              checkAllVariables++;
            }
            else{
              this.createEventErrorList[x] = true;
            }
          }
          if(checkAllVariables == 4)
          {
            console.log("You are winning");
            this.newEventObject.title = this.createEventInputTitle.nativeElement.value;
            this.newEventObject.createdAt = this.createEventInputStartDate.nativeElement.value;
            this.newEventObject.endDate = this.createEventInputEndDate.nativeElement.value;
            this.newEventObject.details = this.createEventInputDetails.nativeElement.value;
            
            console.log(this.newEventObject);
            //Now we can begin to connect
            //Clear the space
            this.createEventInputTitle.nativeElement.value = "";
            this.createEventInputStartDate.nativeElement.value = "";
            this.createEventInputEndDate.nativeElement.value = "";
            this.createEventInputDetails.nativeElement.value = "";
            checkAllVariables = 0;
            //Set everything back to false
            for(let x =0; x < this.createEventValuesValid.length; x++){
              this.createEventErrorList[x] = false;
              this.createEventValuesValid[x] = false;
            }

          }
          else
          {
            console.log("You are not winning");
          }
          // if(this.createEventInputTitle.nativeElement.value == "") this.createEventErrorList[0] = true;
          // if(this.createEventInputDetails.nativeElement.value == "") this.createEventErrorList[3] = true;
          // if(this.createEventInputStartDate.nativeElement.value == "") this.createEventErrorList[1] = true;
          // if(this.createEventInputEndDate.nativeElement.value == "") this.createEventErrorList[2] = true;
          // if(!this.createEventErrorList[0] && !this.createEventErrorList[1] && !this.createEventErrorList[2] && !this.createEventErrorList[3])
          // {
          //   console.log("Console.log Enter Missing Information")

          // }
        }

//===========================================
//GOALS FUNCTIONS 
//============================================
        validateGoalInputTitle(){
          this.createGoalInputTitle.nativeElement.value = this.createGoalInputTitle.nativeElement.value.replace(/^\s+/g, '');
          if(this.createGoalInputTitle.nativeElement.value.trim() == "")
          {
            this.createGoalErrorList[0] = true;
            this.createGoalValuesValid[0] = false;

          }
          else
          {
            this.createGoalErrorList[0] = false;
            this.createGoalValuesValid[0] = true;
          }
        }
        validateGoalInputStartDate(){
          if(new Date(this.createGoalInputStartDate.nativeElement.value).getTime() < new Date().getTime()){
            this.createGoalInputStartDate.nativeElement.value = "";
          }
          if(this.createGoalInputStartDate.nativeElement.value == ""){
            this.createGoalErrorList[1] = true;
            this.createGoalValuesValid[1] = false;
            console.log(new Date(this.createGoalInputStartDate.nativeElement.value).getTime());
          }
          else
          {
            this.createGoalErrorList[1] = false;
            this.createGoalValuesValid[1] = true;
            console.log(new Date(this.createGoalInputStartDate.nativeElement.value).getTime());
            
          }
        }
        validateGoalInputEndDate(){
          //Firsty check if the date has been entered
          if(this.createGoalInputStartDate.nativeElement.value == ""){
            this.createGoalInputEndDate.nativeElement.value = "";
            this.createGoalWarningList[2] = true;
            this.createGoalValuesValid[2] = false;
          }
          else
          {
            this.createGoalWarningList[2] = false;
            this.createGoalValuesValid[2] = true;
            if(new Date(this.createGoalInputEndDate.nativeElement.value).getTime() < new Date(this.createGoalInputStartDate.nativeElement.value).getTime()){
              this.createGoalInputEndDate.nativeElement.value = "";
              this.createGoalErrorList[2] = true;
              this.createGoalValuesValid[2] = false;
            }
            else
            {
              this.createGoalErrorList[2] = false;
              this.createGoalValuesValid[2] = true;
            }
          }
        }
        validateGoalInputDescription(){
          this.createGoalInputDecription.nativeElement.value = this.createGoalInputDecription.nativeElement.value.replace(/^\s+/g, '');
          if(this.createGoalInputDecription.nativeElement.value.trim() == "")
          {
            this.createGoalErrorList[3] = true;
            this.createGoalValuesValid[3] = false;
          }
          else
          {
            this.createGoalErrorList[3] = false;
            this.createGoalValuesValid[3] = true;
          }
        }
        validateGoalInputAcceptanceCriteria(){
          //There are two events here - firstly when type
          //(1) When we enter the input field
          this.createGoalInputAcceptanceCriteria.nativeElement.value = this.createGoalInputAcceptanceCriteria.nativeElement.value.replace(/^\s+/g, '');
          if(this.createGoalInputAcceptanceCriteria.nativeElement.value.trim() == "")
          {
            this.createGoalErrorList[4] = true;
            this.tempAcceptanceCriteriaList  = "";
            this.createGoalValuesValid[4] = false;
          } 
          else
          {
            this.createGoalErrorList[4] = false;
            this.createGoalValuesValid[4] = true;
            this.tempAcceptanceCriteriaList = this.createGoalInputAcceptanceCriteria.nativeElement.value;
          } 
        }
        addToAcceptanceCriteriaList(){
          //Push to accepateCritriaList
          //(1) Check if the acceptance criteria has been filled in.
          this.tempAcceptanceCriteriaList = this.createGoalInputAcceptanceCriteria.nativeElement.value;
          if(this.tempAcceptanceCriteriaList == "")
          {
            if(this.acceptanceCriteriaList.length  > 0)
            {
              this.createGoalErrorList[4] = true;
              this.createGoalValuesValid[4] = false;
            }
          }
          else
          {
            //(2) Push to the acceptance Criteria List
            this.acceptanceCriteriaList.push(this.tempAcceptanceCriteriaList)
            if(this.acceptanceCriteriaList.length > 0)
            {
              this.showAddIconOnAddGoal = false;
              this.showNumAcceptanceCriteriaItem = this.acceptanceCriteriaList.length;
            }        
          }
        }
        removeFromAcceptanceCriteriaList(index:any)
        {
          this.acceptanceCriteriaList.splice(index, 1);
          this.showNumAcceptanceCriteriaItem = this.acceptanceCriteriaList.length;
          if(this.acceptanceCriteriaList.length < 1)
          {
            this.showAddIconOnAddGoal = true;
            this.createGoalErrorList[4] = true;
            this.createGoalValuesValid[4] = false;
            this.showNumAcceptanceCriteriaItem = this.acceptanceCriteriaList.length;
          }    
        }
        refreshAcceptanceCriteriaInput()
        {
          this.createGoalInputAcceptanceCriteria.nativeElement.value = "";
        }
        refreshAcceptanceCriteriaInputOnEnter(event:any)
        {
          if(event.keyCode == 13)
          {
            this.refreshAcceptanceCriteriaInput(); 
          }
          console.log(event.keyCode);
        }
        createNewGoal()
        {
          console.log(" I am used " + this.createGoalValuesValid.length)
          let checkAllVariables = 0;
          for(let x = 0; x < this.createGoalValuesValid.length; x++)
          {
            if(this.createGoalValuesValid[x])
            {
              checkAllVariables++;
            }
            else{
              this.createGoalErrorList[x]= true;
            }
          }
          if(checkAllVariables == 5)
          {
            console.log("We can move forward");
            console.log(this.presentWorkingProject);
            this.createGoalObject.title = this.createGoalInputTitle.nativeElement.value;
            this.createGoalObject.createAt = this.createGoalInputStartDate.nativeElement.value;
            this.createGoalObject.dueDate = this.createGoalInputEndDate.nativeElement.value;
            this.createGoalObject.outcome = this.createGoalInputDecription.nativeElement.value;
            let openedProject = this.projectObjectService.getPassStudentData();
            if(this.userDetails.userType == '2')
            {
              this.createGoalObject.projectId = openedProject.id;

            }
            else
            {
              this.createGoalObject.projectId = this.presentWorkingProject.id;

            }
            this.createGoalObject.userId = this.userDetails.id
            //Create Acceptance Criteria -----
            let tempAcceptanceCriteriaString = "";
            for(let x = 0; x < this.acceptanceCriteriaList.length; x++)
            {
              tempAcceptanceCriteriaString +=  "/" + this.acceptanceCriteriaList[x];
            }
            this.createGoalObject.acceptanceCriteria = tempAcceptanceCriteriaString;
            this.createGoalObject.acceptanceCriteria += this.createGoalInputAcceptanceCriteria.nativeElement.value;
            //Create The goal
            this.projectObjectService.apiCreateNewGoal(this.createGoalObject).subscribe((res)=>{
              console.log(res, "res==>");
              if(res.status == 'success')
              {
                this.createGoalInputTitle.nativeElement.value = "";
                this.createGoalInputStartDate.nativeElement.value = "";
                this.createGoalInputEndDate.nativeElement.value = "";
                this.createGoalInputDecription.nativeElement.value = "";
                this.createGoalInputAcceptanceCriteria.nativeElement.value = "";
                this.acceptanceCriteriaList = [];
                this.isGoalSuccessfullyCreated = true;
                this.showAddIconOnAddGoal = true;
                this.showNumAcceptanceCriteriaItem = 0;
              }
              else
              {
                this.isGoalNotSuccessfullyCreated = true;
              }
            })
            console.log(this.createGoalObject);
          }
        }
        updateIsGoalSuccessfullDisplay()
        {
          this.isGoalSuccessfullyCreated = false; 
        }
        countDownDate:any = new  Date("Jan 5, 2024 15:37:25").getTime();
        x = setInterval(()=>{
          
          //Get the items todayDate () - but yet every alement is going to run in its own way
          var now = new Date().getTime();
          var distance = this.countDownDate - now;

          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          // console.log( days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
        }, 1000);
        refreshTimeLeft(id:any)
        {
          // goalsMinsLeft:any = [];
          // goalsHoursLeft:any = [];
          // goalsDaysLeft:any = [];
          //Using the ID I need to get the final date.
          for(let x = 0; x < this.goals.length; x++)
          {
            if(this.goals.id == id)
            {
              let countDownDate = new Date(this.goals[x].dueDate).getTime();
              x = setInterval(()=>{
                var now = new Date().getTime();
                var distance = countDownDate -  now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                this.goalsMinsLeft[x] = minutes + " M";
                this.goalsHoursLeft[x] = hours + " H";
                this.goalsDaysLeft[x] = days + " D"
                x = this.goals.length;
                //Now let us the goal that we are going to work with - firstly weneed to get the date
              })
              //Set the time of the goal - 
            }
          }
        }
        provideFeedback(goal:any, index:any)
        {
          //Firstly we need to redirect to the other page
          this.goalsService.setGoalFeedbackOpened(goal, index);
  

        }
        //GOAL CARDS TO DISPLAY
        //======================================
            displayGoalCard(index:number)
            {
              //Turn the all the the value to true
              //Set everything else to false
              if(this.goalsListDisplayStatus[index] == false)
              {
                this.goalsListDisplayStatus[index] = true;
                this.transFormElements[index] = "transform: rotate(180deg);"
                for(let x = 0; x < this.goalsListDisplayStatus.length; x++)
                {
                    if(x == index)
                    {
                      this.goalsListDisplayStatus[x] = true;
                      this.transFormElements[x] = "transform: rotate(180deg);"
                    }
                    else
                    {
                      this.goalsListDisplayStatus[x] = false;
                      this.transFormElements[x] = "transform: rotate(0deg);"
                    }
                }
              }
              else
              {
                this.goalsListDisplayStatus[index] = false;
                this.transFormElements[index] = "transform: rotate(0deg);"
              }
            }

  showCreateNewGoal(event: any) {

  }



  goalSettingsCardCloseButton() {

  }

  updateGoal() {

  }

  deleteGoal(goalName: any) {

  }

  openGoal(goalId: any) {

  }

  closeGoalsCard(event: any, goalId: any) {

  }

  getElementPosition(moreDetails: any) {

  }
}
