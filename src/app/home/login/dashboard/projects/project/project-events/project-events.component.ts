import { Component, OnInit, ViewChild, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
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


  constructor(public datepipe: DatePipe, public router: Router, public authService: AuthService) { }
  selected: Date | null | undefined;

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


  //========================================================
  //VARIABLES ----- FOR CREATE GAOL TEMPLATE
  //========================================================
  @Pipe({ name: 'reverse' })
  @ViewChild('createGoalInputTitle') createGoalInputTitle:any;
  @ViewChild('createGoalInputStartDate') createGoalInputStartDate:any;
  @ViewChild('createGoalInputEndDate') createGoalInputEndDate:any;
  @ViewChild('createGoalInputDecription') createGoalInputDecription:any
  @ViewChild('createGoalInputAcceptanceCriteria')  createGoalInputAcceptanceCriteria:any
  createGoalErrorList = [false, false, false, false, false];
  createGoalValuesValid = [false, false, false, false];
  createGoalWarningList =  [false, false, false, false, false];
  // goals:any;
  createGoalObject = {
    title: "",
    createAt : Date(),
    endDate: undefined,
    details: "",
    acceptanceCriteria: "",
  }
  tempAcceptanceCriteriaList = "";
  acceptanceCriteriaList: any = [];
  showAddIconOnAddGoal:boolean = true;
  showNumAcceptanceCriteriaItem = 0;



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
  goals: any;
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
          }
          else{
            this.createAppointmentErrorList[2] = false;
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
          }
          this.requestNewAppointment.title = this.requestAppointmentInputTitle.nativeElement.value;
          this.requestNewAppointment.createdAt = this.requestAppointmentInputStartDate.nativeElement.value;
          this.requestNewAppointment.endDate = this.requestAppointmentInputEndDate.nativeElement.value;
          this.requestNewAppointment.details = this.requestAppointmentInputDetails.nativeElement.value;
          
          // if(this.requestAppointmentInputTitle.nativeElement.value == "") this.createAppointmentErrorList[0] = true;
          // if(this.requestAppointmentInputDetails.nativeElement.value == "") this.createAppointmentErrorList[3] = true;
          // if(this.requestAppointmentInputStartDate.nativeElement.value == "") this.createAppointmentErrorList[1] = true;
          // if(this.requestAppointmentInputEndDate.nativeElement.value == "") this.createAppointmentErrorList[2] = true;
        }
  
//===========================================
//EVENT FUNCTIONS 
//============================================
        //INPUT VALIDATOR METHODS
        validateEventInputTitle()
        {
          //Remove trailing white space
          this.createEventInputTitle.nativeElement.value = this.createEventInputTitle.nativeElement.value.replace(/^\s+/g, '');;
          if(this.createEventInputTitle.nativeElement.value.trim() == "") this.createEventErrorList[0] = true;
          else this.createEventErrorList[0] = false;
        }
        validateEventInputStartDate()
        {
          if(new Date(this.createEventInputStartDate.nativeElement.value).getTime() < new Date().getTime()){
            this.createEventInputStartDate.nativeElement.value = "";
          }
          if(this.createEventInputStartDate.nativeElement.value == ""){
            this.createEventErrorList[1] = true
          }
          else this.createEventErrorList[1] = false;
        }
        validateEventInputEndDate()
        {
           //Firstly check if the start date has been entered
           if(this.createEventInputStartDate.nativeElement.value == "")
           {
             this.createEventInputEndDate.nativeElement.value = "";
             this.createEventWarningList[2] = true;
           }
           else
           {
              this.createEventWarningList[2] = false;
              if(new Date(this.createEventInputEndDate.nativeElement.value).getTime() < new Date(this.createEventInputStartDate.nativeElement.value).getTime()){
                this.createEventInputEndDate.nativeElement.value = "";
                this.createEventErrorList[2] = true;
              }
              else
              {
                this.createEventErrorList[2] = false;
              }
           }
        }
        validateEventInputDetails()
        {
          this.createEventInputDetails.nativeElement.value = this.createEventInputDetails.nativeElement.value.replace(/^\s+/g, '');
          if(this.createEventInputDetails.nativeElement.value.trim() == "") this.createEventErrorList[3] = true;
          else this.createEventErrorList[3] = false;
        }
        //FUNCTIONS FOR HANDLING INPUT VALIDATION FOR CREATING AN EVENT
        createNewEvent()
        {
          this.newEventObject.title = this.createEventInputTitle.nativeElement.value;
          this.newEventObject.createdAt = this.createEventInputStartDate.nativeElement.value;
          this.newEventObject.endDate = this.createEventInputEndDate.nativeElement.value;
          this.newEventObject.details = this.createEventInputDetails.nativeElement.value;
          
          // if(this.createEventInputTitle.nativeElement.value == "") this.createEventErrorList[0] = true;
          // if(this.createEventInputDetails.nativeElement.value == "") this.createEventErrorList[3] = true;
          // if(this.createEventInputStartDate.nativeElement.value == "") this.createEventErrorList[1] = true;
          // if(this.createEventInputEndDate.nativeElement.value == "") this.createEventErrorList[2] = true;
          if(!this.createEventErrorList[0] && !this.createEventErrorList[1] && !this.createEventErrorList[2] && !this.createEventErrorList[3])
          {
            console.log("Console.log Enter Missing Information")

          }
        }

//===========================================
//GOALS FUNCTIONS 
//============================================
        validateGoalInputTitle(){
          this.createGoalInputTitle.nativeElement.value = this.createGoalInputTitle.nativeElement.value.replace(/^\s+/g, '');
          if(this.createGoalInputTitle.nativeElement.value.trim() == "") this.createGoalErrorList[0] = true;
          else this.createGoalErrorList[0] = false;
        }
        validateGoalInputStartDate(){
          if(new Date(this.createGoalInputStartDate.nativeElement.value).getTime() < new Date().getTime()){
            this.createGoalInputStartDate.nativeElement.value = "";
          }
          if(this.createGoalInputStartDate.nativeElement.value == ""){
            this.createGoalErrorList[1] = true;
          }
          else this.createGoalErrorList[1] = false;
        }
        validateGoalInputEndDate(){
          //Firsty check if the date has been entered
          if(this.createGoalInputStartDate.nativeElement.value == ""){
            this.createGoalInputEndDate.nativeElement.value = "";
            this.createGoalWarningList[2] = true;
          }
          else
          {
            this.createGoalWarningList[2] = false;
            if(new Date(this.createGoalInputEndDate.nativeElement.value).getTime() < new Date(this.createGoalInputStartDate.nativeElement.value).getTime()){
              this.createGoalInputEndDate.nativeElement.value = "";
              this.createGoalErrorList[2] = true;
            }
            else
            {
              this.createGoalErrorList[2] = false;
            }
          }
        }
        validateGoalInputDescription(){
          this.createGoalInputDecription.nativeElement.value = this.createGoalInputDecription.nativeElement.value.replace(/^\s+/g, '');
          if(this.createGoalInputDecription.nativeElement.value.trim() == "") this.createGoalErrorList[3] = true;
          else this.createGoalErrorList[3] = false;
        }
        validateGoalInputAcceptanceCriteria(){
          //There are two events here - firstly when type
          //(1) When we enter the input field
          this.createGoalInputAcceptanceCriteria.nativeElement.value = this.createGoalInputAcceptanceCriteria.nativeElement.value.replace(/^\s+/g, '');
          if(this.createGoalInputAcceptanceCriteria.nativeElement.value.trim() == "")
          {
            this.createGoalErrorList[4] = true;
            this.tempAcceptanceCriteriaList  = "";
          } 
          else
          {
            this.createGoalErrorList[4] = false;
            this.tempAcceptanceCriteriaList = this.createGoalInputAcceptanceCriteria.nativeElement.value;
          } 
        }
        addToAcceptanceCriteriaList(){
          //Push to accepateCritriaList
          //(1) Check if the acceptance criteria has been filled in.
          this.tempAcceptanceCriteriaList = this.createGoalInputAcceptanceCriteria.nativeElement.value;
          if(this.tempAcceptanceCriteriaList == "")
          {
            this.createGoalErrorList[4] = true;
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
  showCreateNewGoal(event: any) {

  }

  createNewGoal()
  {

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
