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
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor(public userService: UserService, public chatBoxService: ChatboxServiceService, public authService: AuthService, public datepipe: DatePipe, public http: HttpClient, public router: Router) { }
  @ViewChild('inputChatBox') inputChatBox: any;
  @ViewChild('chatBoxPage') chatBoxPage: any;
  @ViewChild('formPopupInsertAttachment') formPopupInsertAttachment :any;
  @ViewChild('moreDetails') moreButtonLocation : any;
  @ViewChild('switchRestrictInput') switchRestrictInput:any;
  @ViewChild('updateChatGroupTitle') updateChatGroupTitle:any;
  updateChatGroupModel= {id: 0, title: 0, privileges: 0};
  //Group Setting Variables
  noticeBoardName: string ="";
  openChatGroupName = 0;
  @ViewChild('groupSettingsCard') groupSettingsCard :any;
  chatGroups: Array<any> = [{}];
  isGroupSettingsCardOpen = false;
  displaySettingsCard = "none";
  isformPopupInsertAttachmentOpen = false;
  openCardId = 0;

  //Variables for creating a new chatGroup
  svgImage = "add_circle_green_24dp.svg";
  transformElement = "transform: rotate(0deg);"
  isOpenCreateChatGroup = false;
  createChatGroupDisplay = "none";
  createGroupChatDataDetailsLeft = "";
  createGroupChatDataDetailsTop = "";
  @ViewChild('createChatGroupTitleInput') createChatGroupTitleInput:any;
  @ViewChild('switchRestrictCreateChatGroup') switchRestrictCreateChatGroup:any;
  

  displayPopup = "none";
  clickedInsertFileButtonColor = "white";
  selectedFile!: File;
  public innerWidth: any;
  userType: string = "1";
  editGroupChatDataDetails = {
    bottom: 226.390625,
    height: 0,
    left: 187.921875,
    right: 228.859375,
    top: 226.390625,
    width: 40.9375,
    x: 187.921875,
    y: 226.390625,
  }
  editGroupChatDataDetailsLeft = (this.editGroupChatDataDetails.left * 1.3 )+ "px";
  editGroupChatDataDetailsRight = (this.editGroupChatDataDetails.right * 1.5)+ "px";
  editGroupChatDataDetailsTop = (this.editGroupChatDataDetails.top * 1) + "px";
  sidenavIcons: Array<string> = ["edit-solid.svg", "menu_black_24dp.svg"];
  sideNavProperties = {status: false,
      width: "0px",
      opacity: "0%",
      icon: this.sidenavIcons[0]
    };
  


  myChat = {
    senderEmail: "shikomatlala@tut.ac.za",
    message: "Morning colleagues I wanted to ask something about research ethics, I have noticed that I am actually allowed to copy someones work - I wanted to confirm the truthfulness of this new discovery \nKindly Shiko Matlala",
    datetime: "13:06 09 Apr 2022",
    privilege: true,
    isSender: true,
    chatGroup: 1,
  };

  chats =   [{senderEmail: "shikomatlala@tut.ac.za",
  message: `Morning colleagues I wanted to ask something about research ethics, I have noticed that I am actually allowed to copy someones work - I wanted to confirm the truthfulness of this new discovery \nKindly Shiko Matlala\nAll the same awesomeness of SVG comes along for the ride, like flexibility while retaining sharpness. Plus you can do anything a raster graphic can do, like repeat.
  In this video we look at applying a “ripped paper edge” effect to the bottom of a module via background-image on an a pseudo element. Kind of a neat way to do it so the main element itself can have a solid background color we can match and let the page background bleed through the negative space in the SVG. Plus not need any markup to do it.\n
  All the same awesomeness of SVG comes along for the ride, like flexibility while retaining sharpness. Plus you can do anything a raster graphic can do, like repeat.
  In this video we look at applying a “ripped paper edge” effect to the bottom of a module via background-image on an a pseudo element. Kind of a neat way to do it so the main element itself can have a solid background color we can match and let the page background bleed through the negative space in the SVG. Plus not need any markup to do it.`,
  datetime: "13:06 09 Apr 2022",
  privilege: true,
  isSender: false,
  groupId: 1,
  chatId: 1
},
{
  senderEmail: "leratomatlapa@tut.ac.za",
  message: "Morning colleagues I wanted to ask something about research ethics, I have noticed that I am actually allowed to copy someones work - I wanted to confirm the truthfulness of this new discovery \nKindly Shiko Matlala",
  datetime: "10:06 10 Apr 2022",
  privilege: false,
  isSender: false,
  groupId: 1,
  chatId: 2
},
{
  senderEmail: "tsholofeloitumeleng@tut.ac.za",
  message: "Morning colleagues I wanted to ask something about research ethics, I have noticed that I am actually allowed to copy someones work - I wanted to confirm the truthfulness of this new discovery \nKindly Shiko Matlala",
  datetime: "12:06 10 Apr 2022",
  privilege: false,
  isSender: false,
  groupId: 1,
  chatId: 3
},
{
  senderEmail: "jameslivingston@tut.ac.za",
  message: "Morning colleagues I wanted to ask something about research ethics, I have noticed that I am actually allowed to copy someones work - I wanted to confirm the truthfulness of this new discovery \nKindly Shiko Matlala",
  datetime: "8:06 11 Apr 2022",
  privilege: false,
  isSender: false,
  groupId: 1,
  chatId: 4
}];

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.innerWidth = (window.innerWidth * 0.823) + "px";
}

  date = new Date();
  sendMessage() {
    if (this.inputChatBox.nativeElement.value != "") {

      let newMessageId: number = 0;
      newMessageId += this.chats.length;
      // console.log("New Message ID " + newMessageId++)
      let newChat = {
        senderEmail: "shikomatlala@tut.ac.za",
        message: this.inputChatBox.nativeElement.value,
        datetime: this.datepipe.transform(this.date, 'h:mm a') + " | " + this.datepipe.transform(this.date, ' dd MMM yy'),
        privilege: true,
        isSender: true,
        groupId: 1,
        chatId: newMessageId
      };
      let scrollTop = this.chatBoxPage.nativeElement.scrollHeight * 2;
      this.chatBoxPage.nativeElement.scrollTop = scrollTop;
      // this.chatBoxPage.nativeElement.scrollTop = (this.chatBoxPage.nativeElement.scrollHeight + parseInt(myNumber));
      this.chats.push(newChat);
      // console.log(this.chats);
      // console.log("Scoll Top " + this.chatBoxPage.nativeElement.scrollTop);
      this.inputChatBox.nativeElement.value = "";
      // this.chatBoxPage.nativeElement.scrollTop;
      // console.log(" new Scoll Top " + this.chatBoxPage.nativeElement.scrollTop);
      // console.log( typeof this.chatBoxPage.nativeElement.scrollTop);

      // (parseInt(this.chatBoxPage.nativeElement.scrollTop) + 200) + "  is the new top")
      // console.log("Scroll top value is " + this.chatBoxPage.nativeElement.scrollTop + 200);
    }
    // this.chatBoxPage.nativeElement.scrollTop = this.chatBoxPage.nativeElement.scrollHeight;
  }
  deleteChatMessage(chatId:number) {
    // delete this.chats[chatId-1];
    // console.log(this.chats);
    this.chats.splice(chatId-1, 1);
    // console.log(this.chats);
    // console.log("I am deleting " + chatId);
    // console.log(chatId-1);
    // console.log(this.chatBoxPage.nativeElement.scrollTop);
  }

  scrollDown()
  {
    let scrollTop = this.chatBoxPage.nativeElement.scrollHeight * 2;
    this.chatBoxPage.nativeElement.scrollTop = scrollTop;
    this.inputChatBox.nativeElement.style.height = "unset";

  }

  openChatGroup(chatId: any)
  {
    
  }
  auto_grow() {
    this.inputChatBox.nativeElement.style.height = "5px";
    this.inputChatBox.nativeElement.style.height = (this.inputChatBox.nativeElement.scrollHeight) + "px";
  }
  ngOnInit(): void {
    
    this.innerWidth = (window.innerWidth * 0.823) + "px";

    this.getChatGroups();
    // this.userService.getMe();
    this.getMe();
    this.userType = UserService.userType;
    // this.ngOnInit();

    // if(this.authService.isAuthenticated) this.router.navigate(['/dashboard'], {
    //   queryParams: { message: 'Please log out first ' }
    // });

  }


  showCreateProject_()
  {
    this.showCreateNewGroup(event);
  }

  changeSideNav()
  {
    if(this.sideNavProperties.status == true)
    {
      this.sideNavProperties.status = false;
      this.sideNavProperties.width = "0px";
      this.sideNavProperties.opacity = "0%";
      this.sideNavProperties.icon = this.sidenavIcons[1];
    }
    else
    {
      this.sideNavProperties.status = true;
      this.sideNavProperties.width = "280px";
      this.sideNavProperties.opacity = "100%";
      this.sideNavProperties.icon = this.sidenavIcons[0];    
    }
  }

  onFileSelected(event:any)
  {
    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
  }

  openFormPopupInsertAttachment()
  {
    if(this.isformPopupInsertAttachmentOpen == true)
    {
      this.isformPopupInsertAttachmentOpen = false;
      this.formPopupInsertAttachment.nativeElement.style = "block";
      this.displayPopup = "block";
      this.clickedInsertFileButtonColor = "rgb(227, 227, 227)";
    }
    else
    {
      this.isformPopupInsertAttachmentOpen = true;
      this.displayPopup = "none";
      this.clickedInsertFileButtonColor = "white";
    }
    
  }
  getElementPosition(moreDetails: any)
  {
    this.editGroupChatDataDetails =  this.moreButtonLocation.nativeElement.getBoundingClientRect();
    // console.log(this.editGroupChatDataDetails);

  }

  getChatGroups()
  {
    this.chatBoxService.chat_groups().subscribe((res)=>{
      // console.log(res, 'res=>');
      this.chatGroups = res.chatGroups;
      console.log(this.chatGroups);
    });
  }

  getAllChats()
  {
    // console.log("Hi there");
    this.chatBoxService.chat_groups().subscribe((res)=>{
      // console.log(res, 'res=>');
    });
  }

  onFileUpload()
  {
    // const fd  = new FormData();
    // this.http.post('')
  }

  getMe(){

    this.userService.getUser().subscribe((data: any) => {
    this.userType = data.user.userType;
      // console.log(data.user.userType + " = User Type");

      // console.log('show: ',this.userType);
    })
  }
  closeCreateNewGroup()
  {
    if(this.isOpenCreateChatGroup)
    {
      // this.createProjectDisplay = "none";
      this.isOpenCreateChatGroup = false;
      this.transformElement = "transform: rotate(0deg);"
      this.svgImage = "add_circle_green_24dp.svg";
      this.createChatGroupDisplay = "none"

      this.isGroupSettingsCardOpen = false;
      this.displaySettingsCard = "none";
    }
    else
    {
      // this.createProjectDisplay = "unset";
      this.createChatGroupDisplay = "unset";
      this.isOpenCreateChatGroup = true;
      this.transformElement = "transform: rotate(45deg);"
      this.svgImage = "add_circle_red_24dp.svg";

    }
  }

  showCreateNewGroup(event:any)
  {
    this.createGroupChatDataDetailsLeft = (0) + "px";
    this.createGroupChatDataDetailsTop = (50) + "px";
    if(this.isOpenCreateChatGroup)
    {
      // this.createProjectDisplay = "none";
      this.isOpenCreateChatGroup = false;
      this.transformElement = "transform: rotate(0deg);"
      this.svgImage = "add_circle_green_24dp.svg";
      this.createChatGroupDisplay = "none"
    }
    else
    {
      this.createChatGroupDisplay = "unset";
      this.isOpenCreateChatGroup = true;
      this.transformElement = "transform: rotate(45deg);"
      this.svgImage = "add_circle_red_24dp.svg";
    }
  }

  isUserSupervisor(data:string)
  {
    if(data == "1")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  closeSettingsCardCloseButton()
  {
    if(this.isGroupSettingsCardOpen == true)
    {
      this.isGroupSettingsCardOpen = false;
      this.groupSettingsCard.nativeElement.style = "block";
      this.displaySettingsCard = "block";
      // this.clickedInsertFileButtonColor = "rgb(227, 227, 227)";
    }
    else
    {
      this.isGroupSettingsCardOpen = true;
      this.displaySettingsCard = "none";
      // this.clickedInsertFileButtonColor = "white";
    }
  }
  updateChatGroup()
  {
    console.log(this.updateChatGroupModel.id);
    // this.updateChatGroupModel.title = this.switchRestrictInput.nativeElement.checked;
    if(this.switchRestrictInput.nativeElement.checked)
    {
      this.updateChatGroupModel.privileges = 2;
    }
    else
    {
      this.updateChatGroupModel.privileges = 1;
    }

    this.updateChatGroupModel.title = this.updateChatGroupTitle.nativeElement.value;

    console.log(this.updateChatGroupModel.privileges);
    console.log(this.updateChatGroupModel);

    this.chatBoxService.updateChatGroup(this.updateChatGroupModel).subscribe((res)=>{
      console.log(res, 'res=>');
      this.ngOnInit();
      this.closeSettingsCardCloseButton();
    });
  

  }

  closeSettingsCard(event:any, id:any)
  {

      if(this.isOpenCreateChatGroup)
      {
        this.closeCreateNewGroup();
      }
      console.log(id);
      console.log("Primary ID is: " + this.openCardId)
      console.log("X=" + event.target.x + " , Y=" + event.target.y);
      this.editGroupChatDataDetailsLeft = (0 )+ "px";
      this.editGroupChatDataDetailsTop = (event.target.y)+ "px";
      console.log(this.editGroupChatDataDetailsLeft + " Left , " + this.editGroupChatDataDetailsTop + " Right");
      console.log(this.chatGroups);
      for(let x=0; x < this.chatGroups.length; x++)
      {
        if(this.chatGroups[x].id == id)
        {
          this.noticeBoardName = this.chatGroups[x].title;
          this.openChatGroupName = this.chatGroups[x].id;
          console.log(this.noticeBoardName);
          console.log(id);
          console.log(this.chatGroups[x].privileges + " P");
          this.updateChatGroupModel.id = this.chatGroups[x].id;
          this.updateChatGroupModel.privileges = this.chatGroups[x].privileges;
          this.updateChatGroupModel.title = this.chatGroups[x].title;
          if(this.chatGroups[x].privileges !=1)
          {
            this.switchRestrictInput.nativeElement.checked = true;
          }
          else
          {
            this.switchRestrictInput.nativeElement.checked = false;
          }
          x = this.chatGroups.length;
        }
      }
      this.openCardId = id;
      this.openSettingsCard(event, id);
      if(this.isGroupSettingsCardOpen == true)
      {
        this.isGroupSettingsCardOpen = false;
        this.groupSettingsCard.nativeElement.style = "block";
        this.displaySettingsCard = "block";
      }
      else
      {
        this.isGroupSettingsCardOpen = true;
        this.displaySettingsCard = "none";
      }

    
  }

  openSettingsCard(event:any, id: any)
  {
    //If the chat settings card is open I just want to make sure that I  close it first
    console.log("X=" + event.target.x + " , Y=" + event.target.y);
    this.editGroupChatDataDetailsLeft = (event.target.x)+ "px";
    this.editGroupChatDataDetailsTop = (event.target.y-180)+ "px";
    console.log(this.editGroupChatDataDetailsLeft + " Left , " + this.editGroupChatDataDetailsTop + " Right");
    //Get the variable of the chatGroup name

    //Close if the ID is the same else open
    if(this.openCardId == id)
    {
      this.closeSettingsCardCloseButton();
    }
    if(this.isGroupSettingsCardOpen == true)
    {

      this.isGroupSettingsCardOpen = false;
      this.groupSettingsCard.nativeElement.style = "block";
      this.displaySettingsCard = "block";
      // this.clickedInsertFileButtonColor = "rgb(227, 227, 227)";
    }
    else
    {
      this.isGroupSettingsCardOpen = true;
      this.displaySettingsCard = "none";
      // this.clickedInsertFileButtonColor = "white";
    }
  }

  createChatGroup()
  {
    let newChatGroupModel = { userId: 0, title: "", privileges: 0, disciplineId: 0};
    if(this.switchRestrictCreateChatGroup.nativeElement.checked)
    {
      newChatGroupModel.privileges = 2;
    }
    else
    {
      newChatGroupModel.privileges = 1;
    }
    newChatGroupModel.title = this.createChatGroupTitleInput.nativeElement.value;
    this.userService.getUser().subscribe((data: any)=>{
      newChatGroupModel.userId = data.user.id;
    });

    console.log(newChatGroupModel);



  }

  deleteChatGroup(id:any)
  {
    this.chatBoxService.deleteChatGroup(id).subscribe((res)=>{
      console.log(res, 'res=>');
      this.ngOnInit();
    });
  }
}
