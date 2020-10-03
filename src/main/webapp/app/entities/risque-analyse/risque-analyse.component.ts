import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import { RisqueAnalyseService } from './risque-analyse.service';
import { RisqueAnalyseDeleteDialogComponent } from './risque-analyse-delete-dialog.component';

@Component({
  selector: 'jhi-risque-analyse',
  templateUrl: './risque-analyse.component.html',
})
export class RisqueAnalyseComponent implements OnInit, OnDestroy {
  risqueAnalyses?: IRisqueAnalyse[];
  eventSubscriber?: Subscription;

  constructor(
    protected risqueAnalyseService: RisqueAnalyseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.risqueAnalyseService.query().subscribe((res: HttpResponse<IRisqueAnalyse[]>) => (this.risqueAnalyses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRisqueAnalyses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRisqueAnalyse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRisqueAnalyses(): void {
    this.eventSubscriber = this.eventManager.subscribe('risqueAnalyseListModification', () => this.loadAll());
  }

  delete(risqueAnalyse: IRisqueAnalyse): void {
    const modalRef = this.modalService.open(RisqueAnalyseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.risqueAnalyse = risqueAnalyse;
  }
}
