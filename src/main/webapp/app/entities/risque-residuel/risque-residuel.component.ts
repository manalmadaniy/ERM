import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRisqueResiduel } from 'app/shared/model/risque-residuel.model';
import { RisqueResiduelService } from './risque-residuel.service';
import { RisqueResiduelDeleteDialogComponent } from './risque-residuel-delete-dialog.component';

@Component({
  selector: 'jhi-risque-residuel',
  templateUrl: './risque-residuel.component.html',
})
export class RisqueResiduelComponent implements OnInit, OnDestroy {
  risqueResiduels?: IRisqueResiduel[];
  eventSubscriber?: Subscription;

  constructor(
    protected risqueResiduelService: RisqueResiduelService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.risqueResiduelService.query().subscribe((res: HttpResponse<IRisqueResiduel[]>) => (this.risqueResiduels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRisqueResiduels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRisqueResiduel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRisqueResiduels(): void {
    this.eventSubscriber = this.eventManager.subscribe('risqueResiduelListModification', () => this.loadAll());
  }

  delete(risqueResiduel: IRisqueResiduel): void {
    const modalRef = this.modalService.open(RisqueResiduelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.risqueResiduel = risqueResiduel;
  }
}
