import { Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  public innerWidth: any;
  public innerHeight: any;
  public inputDivHeigh: any;
  ngOnInit(): void {

    this.innerWidth = (window.innerWidth * 0.823) + "px";
    this.innerHeight= (window.innerHeight * 0.9);
    this.inputDivHeigh = (this.innerHeight * 0.7) + "px";
    this.innerHeight= (window.innerHeight * 0.87) + "px";
    console.log(this.innerWidth + "H " + this.innerHeight + "W");

    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = (window.innerWidth * 0.823) + "px";
    this.innerHeight= (window.innerHeight * 0.9);
    this.inputDivHeigh = (this.innerHeight * 0.7) + "px";
    this.innerHeight= (window.innerHeight * 0.87) + "px";
    console.log(this.innerWidth + "H " + this.innerHeight + "W");
  }
}
