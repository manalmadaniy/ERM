import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RisqueResiduelDeleteDialogComponent } from 'app/entities/risque-residuel/risque-residuel-delete-dialog.component';
import { RisqueResiduelService } from 'app/entities/risque-residuel/risque-residuel.service';
import { IRisqueResiduel } from 'app/shared/model/risque-residuel.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-rr',
  templateUrl: './rr.component.html',
  styleUrls: ['./rr.component.scss']
})
export class RrComponent implements OnInit {

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

