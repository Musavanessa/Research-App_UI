import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GuidelinesService } from 'src/app/services/guidelines/guidelines.service';
import { UserService } from 'src/app/services/user/user.service';
import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
import { ElementFlags } from 'typescript';
import { identifierName } from '@angular/compiler';


@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.css'],
  template: `<h1>ShikoMatlala</h1>`
})
export class GuidelinesComponent implements OnInit {

  constructor(private el:ElementRef, public userService: UserService, public guidelineSerivce: GuidelinesService, public datepipe: DatePipe, public router: Router, private service: ApiserviceService, public authService: AuthService ) { }



  //UPDATE  GUIDELINE VARIABLES
  // @ViewChildren('myId') myId:any = QueryList<any>;
  // @ViewChildren("div") divs!: QueryList<ElementRef>;
  // @ViewChildren()
  @ViewChild('updateGuidelineTitle') updateGuidelineTitle:any;
  @ViewChild('updateGuidelineText') updateGuidelineText:any;
  @ViewChild('addGuidelineText') addGuidelineText:any = "";
  @ViewChild('addGuidelineTitle') addGuidelineTitle:any = "";
  isAddGuideline = false;
  isViewGuideline = false;
  isGuidelineCreateFalse:boolean = false;

  isUpdate:boolean = false;
  guideLinesObject: any;
  guideLineObject = {
    id: 0,
    text: "The title summarizes the main idea or ideas of your study. A good title contains the fewest possible words that adequately describe the contents and/or purpose of your research paper.\n\nThe title is without doubt the part of a paper that is read the most, and it is usually read first. If the title is too long it usually contains too many unnecessary words, e.g., \"A Study to Investigate the....\" On the other hand, a title which is too short often uses words which are too general. For example, \"African Politics\" could be the title of a book, but it does not provide any information on the focus of a research paper.",
    name: "Shiko",
    g_order: 1,
    createdAt: "2022-03-17T09:20:03.000Z",
    updatedAt: "2022-03-17T09:20:03.000Z",
    projectTypeId: 1}
    guideLine: any;
    noteObject = {id: 0, title: "", 
    text: "", 
    wordCount: 0, 
    createdAt: "", 
    updatedAt: "", 
    guidelineId: null,
    projectId: null,
    collaboratorId: null,
    userId: null }; 
    showGuideline = true;
    htmlDetails:any;
    htmlClasses:any;
    userClass = "color:red;font-size: 50px;";
    whatAreYouTellingMe =  `<h1 id="user-id-1656066916" style="${this.userClass}">we are testing me out</h1>`;
    newTemplate = `<h1 id="user-id-1656066916" style="${this.userClass}">we are testing me out</h1>`;
    anotherTemplate = `<h1 id="user-id-1656066916" style="${this.userClass}">we are testing me out</h1>`;
    links:any;
    subGuides:any;

  //======================
  //USER DETAILS
  //=================
  userData:any;
  userType:any;
  userID:any;

    ngOnInit(): void {

      this.guidelines();
      this.isUpdate = false; this.isAddGuideline = false; this.isViewGuideline = true; 
      this.userService.getUser().subscribe((data: any)=>{
        this.userData = data.user;
        this.userType = data.user.userType;
        console.log(this.userData);
        this.userID = data.user.id;
      });
      // if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
      //   queryParams: { message: 'Please log out first ' }
      // });
    }
  openGuideline(id:any)
  {
    this.service.getGuideline(id).subscribe((res)=>{
      console.log(res.guideline);
      this.links = res.guideline.links;
      console.log(this.links);
      this.guideLineObject = res.guideline;
      this.guideLine = res.guideline;
      this.subGuides = res.guideline.subuides;
      console.log(this.subGuides);

      
    });
    this.guidelineSerivce.getHtmlDetails(id).subscribe((data:any)=>{
      // console.log(data.htmlDetails[0].userHTML);
      this.htmlDetails = data.htmlDetails;
      console.log(data);
      this.htmlClasses = data.htmlDetails;
      console.log(this.htmlDetails);
      console.log(this.htmlClasses.length);
      // console.log(this.myId.componets.toArray());
      // for(let x = 0; x < this.htmlClasses.length; x++)
      // {
      //   this.myId.push("id-" + this.htmlDetails[x].id);
      //   // console.log(this.htmlDetails[x].id);
      // }
      
      // console.log(data);
    })

  }
  guidelines()
  {

    this.service.guidelines(1).subscribe((res)=>{
      console.log(res.guidelines);
      this.guideLinesObject = res.guidelines;
    });
  }
  isGuidelineUpdateFalse = false;
  isGuidelineUpdateSuccess = false;
  saveUpdatedGuideline(id:any)
  {
    if(id != 0 && this.isUpdate)
    {
      let guidelineObject = {
        id:id,
        name: this.updateGuidelineTitle.nativeElement.value,
        text: this.updateGuidelineText.nativeElement.value,
        g_order: 0
      }
      if(guidelineObject.text.trim() != "" && guidelineObject.name.trim() != "")
      {
        console.log(guidelineObject); 
        this.guidelineSerivce.updateGuideline(guidelineObject).subscribe((res)=>{
          console.log(res);
          if(res.status == "success")
          {
            this.isUpdate = false;
            this.ngOnInit();
            this.isGuidelineUpdateFalse = false;
          }
        })
      }
      else
      {
        this.isGuidelineUpdateFalse = true;
      }

    }
    if(id == -1)
    {
      if(this.addGuidelineTitle.nativeElement.value.trim() != "" && this.addGuidelineTitle.nativeElement.value.trim()!= "")
      {
        let guidelineObject = {
          name: this.addGuidelineTitle.nativeElement.value.trim(),
          text: this.addGuidelineText.nativeElement.value.trim(),
          projectTypeId: 1,
          g_order: 0
        }
        //CREATE THE API WHERE WE ARE GOING TO POST THE NEW CREATED GUIDELINE
        console.log(guidelineObject);
        this.guidelineSerivce.createGuideline(guidelineObject).subscribe((res)=>{
          console.log(res);
          this.ngOnInit();
        })
        this.isGuidelineCreateFalse = false;

      }
      else
      {
        //Show the error message
        this.isGuidelineCreateFalse = true;
      }

    }
  }

  deleteGuideline(title:any, id:any)
  {
    let text = "Are you sure you want to delete:\n" + title ;
    if(id > 0)
    {
        if(confirm(text) == true)
        {
          this.guidelineSerivce.deleteGuideline(id).subscribe((res)=>{
            this.ngOnInit();
            if(res.success = "success")
            {
              alert(title + " has been successfully deleted");
            }
          })
        }
    }


  }

  addNewGuideline()
  {
    this.guideLineObject.id = -1;
  }

  editElement(id:any)
  {
    console.log(this.el.nativeElement.children[0].childNodes);
    console.log(id.path[0].style.color);
    id.path[0].style.color = "red";
    // console.log(this.divs.nativeElement);
    // this.divs.forEach((div:ElementRef)=> console.log(div.nativeElement));
    
    // console.log(this.myId);
  }
}
