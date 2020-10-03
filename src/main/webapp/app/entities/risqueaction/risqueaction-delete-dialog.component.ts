import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRisqueaction } from 'app/shared/model/risqueaction.model';
import { RisqueactionService } from './risqueaction.service';

@Component({
  templateUrl: './risqueaction-delete-dialog.component.html',
})
export class RisqueactionDeleteDialogComponent {
  risqueaction?: IRisqueaction;

  constructor(
    protected risqueactionService: RisqueactionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.risqueactionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('risqueactionListModification');
      this.activeModal.close();
    });
  }
}
