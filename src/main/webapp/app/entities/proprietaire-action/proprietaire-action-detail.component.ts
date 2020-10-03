import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProprietaireAction } from 'app/shared/model/proprietaire-action.model';

@Component({
  selector: 'jhi-proprietaire-action-detail',
  templateUrl: './proprietaire-action-detail.component.html',
})
export class ProprietaireActionDetailComponent implements OnInit {
  proprietaireAction: IProprietaireAction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proprietaireAction }) => (this.proprietaireAction = proprietaireAction));
  }

  previousState(): void {
    window.history.back();
  }
}
