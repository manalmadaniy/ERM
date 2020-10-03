import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRisqueResiduel } from 'app/shared/model/risque-residuel.model';

@Component({
  selector: 'jhi-risque-residuel-detail',
  templateUrl: './risque-residuel-detail.component.html',
})
export class RisqueResiduelDetailComponent implements OnInit {
  risqueResiduel: IRisqueResiduel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risqueResiduel }) => (this.risqueResiduel = risqueResiduel));
  }

  previousState(): void {
    window.history.back();
  }
}
