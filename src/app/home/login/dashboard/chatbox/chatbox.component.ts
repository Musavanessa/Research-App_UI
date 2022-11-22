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
  userData:any  = {};
  //Group Setting Variables
  noticeBoardName: string ="";
  openChatGroupName = 0;
  @ViewChild('groupSettingsCard') groupSettingsCard :any;
  chatGroups: Array<any> = [{}];
  isGroupSettingsCardOpen = false;
  displaySettingsCard = "none";
  isformPopupInsertAttachmentOpen = false;
  openCardId = 0;

  //=================================================
  //VARIABLES NEEDED TO HIGHLIGHT ACTIVE GROUP CHAT
  //==================================================
  isGroupChatActive:any = [];
  activeChatGroupBackgroundColor:any = [];
  @ViewChild('fileUpload') fileUpload:any;
  // fileUpload:any;


  //Variables for creating a new chatGroup
  svgImage = "add_circle_green_24dp.svg";
  transformElement = "transform: rotate(0deg);"
  isOpenCreateChatGroup = false;
  createChatGroupDisplay = "none";
  createGroupChatDataDetailsLeft = "";
  createGroupChatDataDetailsTop = "";
  @ViewChild('createChatGroupTitleInput') createChatGroupTitleInput:any;
  @ViewChild('switchRestrictCreateChatGroup') switchRestrictCreateChatGroup:any;
  @ViewChild('createChatGroupButton') createChatGroupButton:any;
  newChatGroupModel = { userId: 0, title: "", privileges: 0, disciplineId: 0};
  userID = 0;
  chatGroupID = 0;

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
    email: "shikomatlala@tut.ac.za",
    text: "Morning colleagues I wanted to ask something about research ethics, I have noticed that I am actually allowed to copy someones work - I wanted to confirm the truthfulness of this new discovery \nKindly Shiko Matlala",
    createdAt: "13:06 09 Apr 2022",
    privilege: true,
    isSender: true,
    chatGroup: 1,
  };

  chats =   [{email: "shikomatlala@tut.ac.za",
  text: `Morning colleagues I wanted to ask something about research ethics, I have noticed that I am actually allowed to copy someones work - I wanted to confirm the truthfulness of this new discovery \nKindly Shiko Matlala\nAll the same awesomeness of SVG comes along for the ride, like flexibility while retaining sharpness. Plus you can do anything a raster graphic can do, like repeat.
  In this video we look at applying a “ripped paper edge” effect to the bottom of a module via background-image on an a pseudo element. Kind of a neat way to do it so the main element itself can have a solid background color we can match and let the page background bleed through the negative space in the SVG. Plus not need any markup to do it.\n
  All the same awesomeness of SVG comes along for the ride, like flexibility while retaining sharpness. Plus you can do anything a raster graphic can do, like repeat.
  In this video we look at applying a “ripped paper edge” effect to the bottom of a module via background-image on an a pseudo element. Kind of a neat way to do it so the main element itself can have a solid background color we can match and let the page background bleed through the negative space in the SVG. Plus not need any markup to do it.`,
  createdAt: "13:06 09 Apr 2022",
  privilege: true,
  isSender: false,
  groupId: 1,
  chatId: 1,
  user:{userType:0, email: ""}
}];

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.innerWidth = (window.innerWidth * 0.823) + "px";
}

  date = Date.now();
  sendMessage() {
    if (this.inputChatBox.nativeElement.value != "") {

      let newMessageId: number = 0;
      newMessageId += this.chats.length;
      let newChat = {
        email: "shikomatlala@tut.ac.za",
        text: this.inputChatBox.nativeElement.value,
        createdAt: this.datepipe.transform(this.date, 'h:mm a') + " | " + this.datepipe.transform(this.date, ' dd MMM yy'),
        privilege: true,
        isSender: true,
        groupId: 1,
        chatId: newMessageId,
        user: {userType:0, email: ""}
      };
      let sendChatToDB = {
        chatGroupId: this.chatGroupID,
        userId: this.userID,
        text: this.inputChatBox.nativeElement.value
      }
      let scrollTop = this.chatBoxPage.nativeElement.scrollHeight * 2;
      this.chatBoxPage.nativeElement.scrollTop = scrollTop;
      //console.log(sendChatToDB);
      // this.chats.push(newChat);
      // this.chats.push()
      this.inputChatBox.nativeElement.value = "";
      this.chatBoxService.createChat(sendChatToDB).subscribe((res)=>{
        //console.log(res.status);
        // this.ngOnInit();
      })
    }
  }
  deleteChatMessage(chatId:number) {
    this.chats.splice(chatId-1, 1);
  }

  scrollDown()
  {
    let scrollTop = this.chatBoxPage.nativeElement.scrollHeight * 2;
    this.chatBoxPage.nativeElement.scrollTop = scrollTop;
    this.inputChatBox.nativeElement.style.height = "unset";

  }

  openChatGroup(chatGroupId: any, i:any)
  {
    //console.log("ChatGroupID " + chatGroupId);
    this.chatGroupID =  chatGroupId;
    for(let x = 0; x < this.activeChatGroupBackgroundColor.length; x++)
    {
      if(x == i)
      {
        this.activeChatGroupBackgroundColor[x] = "transparent";
      }
      else
      {
        this.activeChatGroupBackgroundColor[x] = "white";
      }
    }
    this.chatBoxService.viewChats(chatGroupId).subscribe((data:any)=>{
      //console.log(data.chat);
      this.chats = data.chat;
    });

    //Set this ID to be true - set the rest to be false
    //Set every othre row to be false

  }
  auto_grow() {
    this.inputChatBox.nativeElement.style.height = "5px";
    this.inputChatBox.nativeElement.style.height = (this.inputChatBox.nativeElement.scrollHeight) + "px";
  }
  ngOnInit(): void {
    this.innerWidth = (window.innerWidth * 0.823) + "px";
    this.getChatGroups();
    this.getMe();
    this.userType = UserService.userType;
    this.userService.getUser().subscribe((data: any)=>{
      this.newChatGroupModel.userId = data.user.id;
      this.userData = data.user;
      //console.log(this.userData);
      this.userID = data.user.id;
      this.newChatGroupModel.disciplineId = data.user.disciplineId;
      //console.log(this.newChatGroupModel.disciplineId);
    });
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
    let fileObject = {filename: this.selectedFile.name, selectedFile:this.selectedFile}
    let formData = new FormData();
    formData.set("document", this.selectedFile);
    formData.set("text", this.selectedFile.name)
    //console.log(event);
    //console.log(this.selectedFile);
    
    this.chatBoxService.uploadChatFile(formData, this.chatGroupID).subscribe((res)=>{
      //console.log(res);
    })
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
  }

  getChatGroups()
  {
    this.chatBoxService.chat_groups().subscribe((res)=>{
      this.chatGroups = res.chatGroups;
      //console.log(this.chatGroups);
      for(let x  = 0; x < res.chatGroups.length; x++)
      {
        this.isGroupChatActive.push(false);
        this.activeChatGroupBackgroundColor.push("white");
        //console.log(this.isGroupChatActive);
        //console.log(x);
      }

    });
  }

  getAllChats()
  {
    this.chatBoxService.chat_groups().subscribe((res)=>{
    });
  }

  onFileUpload()
  {
  }

  getMe(){

    this.userService.getUser().subscribe((data: any) => {
    this.userType = data.user.userType;
    //Create a for loop that is going to get the.
    
    })
  }
  closeCreateNewGroup()
  {
    if(this.isOpenCreateChatGroup)
    {
      this.isOpenCreateChatGroup = false;
      this.transformElement = "transform: rotate(0deg);"
      this.svgImage = "add_circle_green_24dp.svg";
      this.createChatGroupDisplay = "none"
      this.createChatGroupButton.nativeElement.disabled = true;
      this.isGroupSettingsCardOpen = false;
      this.displaySettingsCard = "none";
    }
    else
    {
      this.createChatGroupDisplay = "unset";
      this.isOpenCreateChatGroup = true;
      this.transformElement = "transform: rotate(45deg);"
      this.createChatGroupButton.nativeElement.disabled = true;
      this.svgImage = "add_circle_red_24dp.svg";

    }
    this.createChatGroupTitleInput.nativeElement.value = "";
    this.createChatGroupButton.nativeElement.disabled = true;
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
      this.createChatGroupButton.nativeElement.disabled = true;
      this.createChatGroupTitleInput.nativeElement.value = "";
      this.svgImage = "add_circle_green_24dp.svg";
      this.createChatGroupDisplay = "none"
    }
    else
    {
      this.createChatGroupDisplay = "unset";
      this.isOpenCreateChatGroup = true;
      this.transformElement = "transform: rotate(45deg);"
      this.createChatGroupButton.nativeElement.disabled = true;
      this.createChatGroupTitleInput.nativeElement.value = "";
      this.svgImage = "add_circle_red_24dp.svg";
    }
  }

  isUserSupervisor(data:any)
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
    //console.log(this.updateChatGroupModel.id);
    if(this.switchRestrictInput.nativeElement.checked)
    {
      this.updateChatGroupModel.privileges = 2;
    }
    else
    {
      this.updateChatGroupModel.privileges = 1;
    }
    this.updateChatGroupModel.title = this.updateChatGroupTitle.nativeElement.value;
    //console.log(this.updateChatGroupModel.privileges);
    //console.log(this.updateChatGroupModel);
    this.chatBoxService.updateChatGroup(this.updateChatGroupModel).subscribe((res)=>{
      //console.log(res, 'res=>');
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
      //console.log(id);
      //console.log("Primary ID is: " + this.openCardId)
      //console.log("X=" + event.target.x + " , Y=" + event.target.y);
      this.editGroupChatDataDetailsLeft = (0 )+ "px";
      this.editGroupChatDataDetailsTop = (event.target.y)+ "px";
      //console.log(this.editGroupChatDataDetailsLeft + " Left , " + this.editGroupChatDataDetailsTop + " Right");
      //console.log(this.chatGroups);
      for(let x=0; x < this.chatGroups.length; x++)
      {
        if(this.chatGroups[x].id == id)
        {
          this.noticeBoardName = this.chatGroups[x].title;
          this.openChatGroupName = this.chatGroups[x].id;
          //console.log(this.noticeBoardName);
          //console.log(id);
          //console.log(this.chatGroups[x].privileges + " P");
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

  formatDate(date:any)
  {

    return this.datepipe.transform(date, ' dd/MMM/yy');
  }
  formatTime(date:any)
  {
    return this.datepipe.transform(date, ' h:mm a');
  }

  openSettingsCard(event:any, id: any)
  {
    //If the chat settings card is open I just want to make sure that I  close it first
    //console.log("X=" + event.target.x + " , Y=" + event.target.y);
    this.editGroupChatDataDetailsLeft = (event.target.x)+ "px";
    this.editGroupChatDataDetailsTop = (event.target.y-180)+ "px";
    //console.log(this.editGroupChatDataDetailsLeft + " Left , " + this.editGroupChatDataDetailsTop + " Right");
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
    // let newChatGroupModel = { userId: 0, title: "", privileges: 0, disciplineId: 0};
    if(this.switchRestrictCreateChatGroup.nativeElement.checked)
    {
      this.newChatGroupModel.privileges = 2;
    } 
    else
    {
      this.newChatGroupModel.privileges = 1;
    }
    this.newChatGroupModel.title = this.createChatGroupTitleInput.nativeElement.value;
    // //console.log(newChatGroupModel);
    this.chatBoxService.createChatGroup(this.newChatGroupModel).subscribe((res)=>{
      //console.log(res, 'res=>');
      this.ngOnInit();
    })


  }

  createChatGroupTitleInputCheck()
  {
    if(this.createChatGroupTitleInput.nativeElement.value == "")
    {
      this.createChatGroupButton.nativeElement.disabled = true;
    }
    else
    {
      this.createChatGroupButton.nativeElement.disabled = false;
    }
  }
  deleteChatGroup(id:any)
  {
    this.chatBoxService.deleteChatGroup(id).subscribe((res)=>{
      //console.log(res, 'res=>');
      this.ngOnInit();
    });
  }
}
