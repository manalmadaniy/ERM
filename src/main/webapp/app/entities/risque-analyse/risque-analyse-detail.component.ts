import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';

@Component({
  selector: 'jhi-risque-analyse-detail',
  templateUrl: './risque-analyse-detail.component.html',
})
export class RisqueAnalyseDetailComponent implements OnInit {
  risqueAnalyse: IRisqueAnalyse | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risqueAnalyse }) => (this.risqueAnalyse = risqueAnalyse));
  }

  previousState(): void {
    window.history.back();
  }
}
