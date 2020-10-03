import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRisque } from 'app/shared/model/risque.model';
import { RisqueService } from './risque.service';

@Component({
  templateUrl: './risque-delete-dialog.component.html',
})
export class RisqueDeleteDialogComponent {
  risque?: IRisque;

  constructor(protected risqueService: RisqueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.risqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('risqueListModification');
      this.activeModal.close();
    });
  }
}
