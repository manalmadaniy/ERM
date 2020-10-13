import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-b-ireporting',
  templateUrl: './b-ireporting.component.html',
  styleUrls: [
    'b-ireporting.component.scss'
  ]
})
export class BIreportingComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'BIreportingComponent message';
  }

  ngOnInit(): void {
  }

}
