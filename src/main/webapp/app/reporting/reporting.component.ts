import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'jhi-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: [
    'reporting.component.scss'
  ]
})
export class ReportingComponent implements OnInit {

//Emitting an Event which is : Closing or opening thi sideBar
  @Output() ToggleSideBar: EventEmitter<any> = new EventEmitter()
  message: string;
  sideBarOpen = true;

  constructor() {
    this.message = 'ReportingComponent message';
  }

  ngOnInit(): void {
this.ToggleSideBar.emit();

  }
  SideBarToggle(): void{

    this.sideBarOpen = !this.sideBarOpen
  }
  
}
