import { Component, OnInit, ViewChild, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { elementAt, first, startWith } from 'rxjs';
import { ChatboxServiceService } from 'src/app/services/chatbox/chatbox-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { ThisReceiver } from '@angular/compiler';

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

  //REQUEST APPOINTMENT VARIABLES & APPOINTMENT VARIABLES
  @ViewChild('requestAppointmentInputTitle') requestAppointmentInputTitle:any;
  @ViewChild('requestAppointmentInputStartDate') requestAppointmentInputStartDate :any;
  @ViewChild('requestAppointmentInputEndDate') requestAppointmentInputEndDate : any;
  @ViewChild('requestAppointmentInputDetails') requestAppointmentInputDetails : any;
  createAppointmentErrorList = [false, false, false, false]
  createAppointmentWarningList = [false, false, false, false]
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
    console.log(this.requestNewAppointment);
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
          console.log("The   = " + this.weeks[y][x].value);
          console.log("The   = " + this.weeks[y][x].isToday);
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
    console.log(this.datepipe.transform(date, "dd-MMM-y"))
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
    console.log(dateObjet);
    let tempDateID ="";
    if(dateId.length < 10)
    {
      tempDateID = 0 + dateId;
    }
    else
    {
      tempDateID = dateId;
    }
    console.log(tempDateID);
    let numMonth = tempDateID[3] + tempDateID[4];

    this.finalShowDate  = tempDateID[0] + tempDateID[1] + " " + this.months[+numMonth-1] + " " + tempDateID[6]  + tempDateID[7]  + tempDateID[8]  + tempDateID[9];
    // let startIndex =dateId.indexOf("-");
    // console.log(dateId.substring(startIndex, 5))

    console.log("Show the date id = " + dateId);
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

  // testStartDate()
  // {
  //   if(new Date(this.requestAppointmentInputStartDate.nativeElement.value) <= new Date())

  // }


  createNewGoal() {
    //Show All the native elements that have been entered
    this.requestNewAppointment.title = this.requestAppointmentInputTitle.nativeElement.value;
    this.requestNewAppointment.createdAt = this.requestAppointmentInputStartDate.nativeElement.value;
    this.requestNewAppointment.endDate = this.requestAppointmentInputEndDate.nativeElement.value;
    this.requestNewAppointment.details = this.requestAppointmentInputDetails.nativeElement.value;
    console.log(this.requestNewAppointment);
    
    if(this.requestAppointmentInputTitle.nativeElement.value == "") this.createAppointmentErrorList[0] = true;
    if(this.requestAppointmentInputDetails.nativeElement.value == "") this.createAppointmentErrorList[3] = true;
    if(this.requestAppointmentInputStartDate.nativeElement.value == "") this.createAppointmentErrorList[1] = true;
    if(this.requestAppointmentInputEndDate.nativeElement.value == "") this.createAppointmentErrorList[2] = true;


    if(new Date(this.requestAppointmentInputStartDate.nativeElement.value).getTime() < new Date().getTime())
          console.log("Today is greate than yesterday")
    else
    {
      console.log("Tomorrow is greater than today")
    }
  }

  checkAppointmentStartDate()
  {
    if(new Date(this.requestAppointmentInputStartDate.nativeElement.value).getTime() < new Date().getTime())
    {
        this.requestAppointmentInputStartDate.nativeElement.value = "";
        console.log(this.requestAppointmentInputStartDate.nativeElement.value);
    }
    else
    {
      console.log("Tomorrow is greater than today")
    }
  }

  //INPUT VALIDATOR METHOS
        validateRequestAppointmentInputTitle(){
          //Remove trailing white space
          this.requestAppointmentInputTitle.nativeElement.value = this.requestAppointmentInputTitle.nativeElement.value.replace(/^\s+/g, '');;
          if(this.requestAppointmentInputTitle.nativeElement.value.trim() == "") this.createAppointmentErrorList[0] = true;
          else this.createAppointmentErrorList[0] = false;
        }

        validateRequestAppointmentInputDetails(){
          //Remove trailing white space
          this.requestAppointmentInputDetails.nativeElement.value = this.requestAppointmentInputDetails.nativeElement.value.replace(/^\s+/g, '');;
          if(this.requestAppointmentInputDetails.nativeElement.value.trim() == "") this.createAppointmentErrorList[3] = true;
          else this.createAppointmentErrorList[3] = false;
        }
        validateRequestAppointmentStartDate(){
          this.checkAppointmentStartDate()
          if(this.requestAppointmentInputStartDate.nativeElement.value == ""){
            this.createAppointmentErrorList[1] = true;
            console.log(this.requestAppointmentInputStartDate.nativeElement.value)
          }
          else this.createAppointmentErrorList[1] = false;
        }

  checkAppointmentEndDate()
  {
    //If the start date is empty - then make sure that you compare the end date with the current date plus 10 minutes
    if(this.requestAppointmentInputStartDate.nativeElement.value.length)
    {
      console.log("Start with the start date");
      console.log(this.requestAppointmentInputEndDate.nativeElement.value)  
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
