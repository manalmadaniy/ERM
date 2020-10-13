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
 
  message: string;
 

  constructor() {
    this.message = 'ReportingComponent message';
  }

  ngOnInit(): void {

  }
 
  
}
