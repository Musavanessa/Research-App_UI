import { Component, OnInit, ViewChild, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { elementAt, first, startWith } from 'rxjs';
import { ChatboxServiceService } from 'src/app/services/chatbox/chatbox-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

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

  // @ViewChild(isTodayDateTemplate)

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

  ngOnInit(): void {
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
    //The first Weeek
    for (let y = 0; y < 1; y++) {
      for (let x = 0; x < this.weeks[y].length; x++) {
        if (y == 0 && x == startDayOfTheWeek) {
          this.weeks[y][x].value = +tempfirstDay;
          this.weeks[y][x].isOfMonth = true;
          this.weeks[y][x].dateId = dateCounter + monthPrint!;
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
  }


  closeCreateNewGoal() {

  }


  createGoalTitleInputCheck() {

  }


  createNewGoal() {

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
