import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectObjectService } from '../../project-object.service';
import { Pipe } from '@angular/core';
import { GoalsService } from 'src/app/services/project-events-goals/goals.service';
import { DatePipe } from '@angular/common';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {

  constructor(public feedbackService: FeedbackService, public goalsService: GoalsService, public projectObjectService: ProjectObjectService, public datepipe: DatePipe , public router: Router, public authService: AuthService) { }
  selected: Date | null | undefined;

  
  
  
  //=====================
  //GENERAL VARIABLES
  //=====================
  userDetails:any;
  studentData:any;
  projectData:any;
  userType:any;

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


  //TEMPLATE VARIABLES
  appointment_tempate_status: boolean = false;
  goal_tempate_status: boolean = false;
  event_tempate_status: boolean = false;
  calendar_tempate_status: boolean = true;
  template_statuses = [true, false, false]
  todayDate = new Date();


  //CREATE NEW GOAL VARIABLES
  createGoalDisplay = "";
  createGroupChatDataDetailsTop = "";
  createGroupChatDataDetailsLeft = "";
  createCoalDataDetailsLeft = "";
  createGoalDataDetailsTop = "";
  svgImage = "add_circle_green_24dp.svg";
  transformElement = "transform: rotate(0deg);"

  //=============================
  //MESSAGE REPLY BACK VARIABLES
  //=============================
  messageReplyTo:any = "New Message"
  @ViewChild('sendMessageInputSubject') sendMessageInputSubject:any;
  @ViewChild('sendMessageInputText') sendMessageInputText:any;
  messages:any;
  messageListDisplayStatus:any = [];

  ngOnInit(): void {
    this.userDetails = this.projectObjectService.getUserDetails();
    this.userType = this.userDetails.userType;
    console.log(this.projectObjectService.getUserDetails());
    this.studentData = this.projectObjectService.getPassStudentData();
    this.projectData = this.projectObjectService.getOpenedProjectObject();

    console.log(this.goalsService.getIsGoalFeedbackOpened());
    if(this.goalsService.getIsGoalFeedbackOpened())
    {
      let goal = this.goalsService.getGoalFeedbackOpened();
      // console.log("The goal has been opened");
      this.changeActiveStatus(2);
      this.messageReplyTo = goal.title
      console.log(goal.id + " Is the goal ID");
      // console.log("messageReplyTo = " + goal.title)
      // this.displayGoalCard(index:number)
    }
    // if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
    //   queryParams: { message: 'Please log out first ' }
    // });
  }

  //================================
  //OTHER FUNCTIONS
  //==============================
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
      removeWhiteSpace(tempString:string)
      {
        return tempString.trim();
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

        if(this.template_statuses[0])
        {
          // this.feedbackService.getFeedback()
        }

        if(this.template_statuses[2])
        {
          //Get all goals again.
          this.goalsService.getAllGoalsWhere(this.projectData.id).subscribe((data:any)=>{
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
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);
              this.goalsMinsLeft[x] = minutes + " M";
              this.goalsHoursLeft[x] = hours + " H";
              this.goalsDaysLeft[x] = days + " D"


              let createdAt = new Date(data.goal[x].createdAt).getTime();
              let endDate = new Date(data.goal[x].dueDate).getTime();
              let today = new Date().getTime();
              let goalPercentage =  ((today - createdAt) / ( endDate - createdAt)) * 100;
              //I just need to know the goals status - but the goals status also affects its 
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
            if(this.goalsService.getIsGoalFeedbackOpened())
            {
              this.displayGoalCard(this.goalsService.getIndexOfGoalToReply());
            }

          
          });
          console.log("This is the goals object " + this.goals)
          console.log(this.goalsListDisplayStatus);
          console.log(this.svgImageAccordionGoals);
        }
        console.log(this.svgImageAccordionGoals);

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
        }
        else
        {
          this.createGoalErrorList[1] = false;
          this.createGoalValuesValid[1] = true;
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
          this.createGoalObject.title = this.createGoalInputTitle.nativeElement.value;
          this.createGoalObject.createAt = this.createGoalInputStartDate.nativeElement.value;
          this.createGoalObject.dueDate = this.createGoalInputEndDate.nativeElement.value;
          this.createGoalObject.outcome = this.createGoalInputDecription.nativeElement.value;
          this.createGoalObject.projectId = this.studentData.id;
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
              this.goalsMinsLeft[x] = minutes + " Min";
              this.goalsHoursLeft[x] = hours + " Hr";
              this.goalsDaysLeft[x] = days + " Day"
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

//===============================
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

      showGoalMessages(index:any)
      {
        //Turn all goal list display off
        if(this.messageListDisplayStatus[index] == false)
        {
          this.messageListDisplayStatus[index] = true;
          this.transFormElements[index] = "transform: rotate(180deg);"
          for(let x = 0; x < this.messageListDisplayStatus.length; x++)
          {
              if(x == index)
              {
                this.messageListDisplayStatus[x] = true;
                this.transFormElements[x] = "transform: rotate(180deg);"
              }
              else
              {
                this.messageListDisplayStatus[x] = false;
                this.transFormElements[x] = "transform: rotate(0deg);"
              }
          }
        }
        else
        {
          this.messageListDisplayStatus[index] = false;
          this.transFormElements[index] = "transform: rotate(0deg);"
        }
        //TURN ON OR OFF THE GOALS LIST
        

      }


//=============================================
//MESSAGE AND REPLIES TO GAOLS FUNCTIONS
//========================================
        goalToReply:any;
        messageObject:any;
        replytoGoal(goal:any)
        {
          this.messageReplyTo = goal.title;
          this.goalToReply = goal;
          // this.sendMessage(messageObject);
        }
        sendMessage()
        {
          //Firsty get the gaol details
          //Display the goal name
          let user = this.projectObjectService.getUserDetails();
          //THE MESSSAGE OBJECT
          let messageObject = {
            text: this.sendMessageInputText.nativeElement.value,
            title: this.sendMessageInputSubject.nativeElement.value,
            userId: user.id,
            goalId: 0,
            projectStatusId: 13
          };

          if(this.goalsService.getIsGoalFeedbackOpened())
          {
            let goal = this.goalsService.getGoalFeedbackOpened();
            messageObject.goalId = goal.id;
          }
          else
          {
            messageObject.goalId = this.goalToReply.id;
          }

          this.messageObject = messageObject;          
          console.log(this.messageObject);
          // this.feedbackService.sendFeedback(this.messageObject).subscribe((res)=>{
          //   console.log(res, "res==>");
          // })
        }

}
