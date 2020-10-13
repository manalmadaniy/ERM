import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-hi-there',
  templateUrl: './hi-there.component.html',
  styleUrls: [
    'hi-there.component.scss'
  ]
})
export class HiThereComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'HiThereComponent message';
  }

  ngOnInit(): void {
  }

}
