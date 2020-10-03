import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRisqueaction } from 'app/shared/model/risqueaction.model';
import { RisqueactionService } from './risqueaction.service';
import { RisqueactionDeleteDialogComponent } from './risqueaction-delete-dialog.component';

@Component({
  selector: 'jhi-risqueaction',
  templateUrl: './risqueaction.component.html',
})
export class RisqueactionComponent implements OnInit, OnDestroy {
  risqueactions?: IRisqueaction[];
  eventSubscriber?: Subscription;

  constructor(
    protected risqueactionService: RisqueactionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.risqueactionService.query().subscribe((res: HttpResponse<IRisqueaction[]>) => (this.risqueactions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRisqueactions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRisqueaction): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRisqueactions(): void {
    this.eventSubscriber = this.eventManager.subscribe('risqueactionListModification', () => this.loadAll());
  }

  delete(risqueaction: IRisqueaction): void {
    const modalRef = this.modalService.open(RisqueactionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.risqueaction = risqueaction;
  }
}
