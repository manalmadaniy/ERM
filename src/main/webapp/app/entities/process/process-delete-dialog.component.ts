import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcess } from 'app/shared/model/process.model';
import { ProcessService } from './process.service';

@Component({
  templateUrl: './process-delete-dialog.component.html',
})
export class ProcessDeleteDialogComponent {
  process?: IProcess;

  constructor(protected processService: ProcessService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.processService.delete(id).subscribe(() => {
      this.eventManager.broadcast('processListModification');
      this.activeModal.close();
    });
  }
}
