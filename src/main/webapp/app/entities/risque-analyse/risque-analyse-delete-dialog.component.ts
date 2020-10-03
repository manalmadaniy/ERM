import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import { RisqueAnalyseService } from './risque-analyse.service';

@Component({
  templateUrl: './risque-analyse-delete-dialog.component.html',
})
export class RisqueAnalyseDeleteDialogComponent {
  risqueAnalyse?: IRisqueAnalyse;

  constructor(
    protected risqueAnalyseService: RisqueAnalyseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.risqueAnalyseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('risqueAnalyseListModification');
      this.activeModal.close();
    });
  }
}
