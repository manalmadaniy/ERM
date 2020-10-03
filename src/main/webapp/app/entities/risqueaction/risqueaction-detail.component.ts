import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRisqueaction } from 'app/shared/model/risqueaction.model';

@Component({
  selector: 'jhi-risqueaction-detail',
  templateUrl: './risqueaction-detail.component.html',
})
export class RisqueactionDetailComponent implements OnInit {
  risqueaction: IRisqueaction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risqueaction }) => (this.risqueaction = risqueaction));
  }

  previousState(): void {
    window.history.back();
  }
}
