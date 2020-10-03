import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRisque } from 'app/shared/model/risque.model';

@Component({
  selector: 'jhi-risque-detail',
  templateUrl: './risque-detail.component.html',
})
export class RisqueDetailComponent implements OnInit {
  risque: IRisque | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risque }) => (this.risque = risque));
  }

  previousState(): void {
    window.history.back();
  }
}
