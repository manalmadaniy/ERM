import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProprietaireAction } from 'app/shared/model/proprietaire-action.model';
import { ProprietaireActionService } from './proprietaire-action.service';

@Component({
  templateUrl: './proprietaire-action-delete-dialog.component.html',
})
export class ProprietaireActionDeleteDialogComponent {
  proprietaireAction?: IProprietaireAction;

  constructor(
    protected proprietaireActionService: ProprietaireActionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.proprietaireActionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('proprietaireActionListModification');
      this.activeModal.close();
    });
  }
}
