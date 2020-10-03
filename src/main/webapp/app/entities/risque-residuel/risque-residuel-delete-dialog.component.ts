import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRisqueResiduel } from 'app/shared/model/risque-residuel.model';
import { RisqueResiduelService } from './risque-residuel.service';

@Component({
  templateUrl: './risque-residuel-delete-dialog.component.html',
})
export class RisqueResiduelDeleteDialogComponent {
  risqueResiduel?: IRisqueResiduel;

  constructor(
    protected risqueResiduelService: RisqueResiduelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.risqueResiduelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('risqueResiduelListModification');
      this.activeModal.close();
    });
  }
}
