import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProprietaireAction } from 'app/shared/model/proprietaire-action.model';
import { ProprietaireActionService } from './proprietaire-action.service';
import { ProprietaireActionDeleteDialogComponent } from './proprietaire-action-delete-dialog.component';

@Component({
  selector: 'jhi-proprietaire-action',
  templateUrl: './proprietaire-action.component.html',
})
export class ProprietaireActionComponent implements OnInit, OnDestroy {
  proprietaireActions?: IProprietaireAction[];
  eventSubscriber?: Subscription;

  constructor(
    protected proprietaireActionService: ProprietaireActionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.proprietaireActionService
      .query()
      .subscribe((res: HttpResponse<IProprietaireAction[]>) => (this.proprietaireActions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProprietaireActions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProprietaireAction): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProprietaireActions(): void {
    this.eventSubscriber = this.eventManager.subscribe('proprietaireActionListModification', () => this.loadAll());
  }

  delete(proprietaireAction: IProprietaireAction): void {
    const modalRef = this.modalService.open(ProprietaireActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proprietaireAction = proprietaireAction;
  }
}
