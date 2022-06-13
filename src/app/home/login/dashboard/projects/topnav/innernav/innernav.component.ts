import { Component, OnInit } from '@angular/core';
import { ProjectObjectService } from '../../project-object.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
// import { ProjectObject } from '../../project-viewer';

@Component({
  selector: 'app-innernav',
  templateUrl: './innernav.component.html',
  styleUrls: ['./innernav.component.css']
})
export class InnernavComponent implements OnInit {

  // public projectObject: ProjectObject
  constructor(public feedbackService: FeedbackService, public globalProjectObject : ProjectObjectService) { }

  projectObject:any;
  userDetails:any;
  studentDetails:any;

  //NOTIFICATIONS VARIABLS
  countAllNotifications = 0;
  ngOnInit(): void {
    // console.log(ProjectObject.projectObject.name);
    this.userDetails = this.globalProjectObject.getUserDetails();
    console.log("User Details", this.userDetails);
    if(this.userDetails.userType == '2')
    {
      //Get the details of the student
      this.studentDetails = this.globalProjectObject.getPassStudentData();
      console.log("Student Details", this.studentDetails);
      this.feedbackService.supervisorGetAllStudentProjectNotifications(this.studentDetails).subscribe((data)=>{
        console.log(data.notifications.length);
        if(data.notifications.length > 0)
        {
          this.countAllNotifications = data.notifications[0].countfeedback;
        }
        console.log("Count all notifications", this.countAllNotifications);
        // this.countAllNotifications.push(data.notifications);
        // console.log(this.countAllNotifications);
      });

    }
    else
    {
      //I think the best way to do this is to get the information using the feedback service 
      this.projectObject = this.globalProjectObject.getOpenedProjectObject();
      //We can call the same request....
      this.feedbackService.getAllStudentProjectNotifications(this.projectObject.id).subscribe((data)=>{
        console.log(data.notifications.length);
        if(data.notifications.length > 0)
        {
          this.countAllNotifications = data.notifications[0].countfeedback;
        }
        console.log(this.countAllNotifications);
        // this.countAllNotifications.push(data.notifications);
        // console.log(this.countAllNotifications);
      });
    }
    console.log(this.projectObject);
    console.log(this.userDetails);
  }

  isUserSupervisor(data:string)
  {
    if(data == "2")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}
