import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RisqueactionDeleteDialogComponent } from 'app/entities/risqueaction/risqueaction-delete-dialog.component';
import { RisqueactionService } from 'app/entities/risqueaction/risqueaction.service';
import { IRisqueaction } from 'app/shared/model/risqueaction.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-addaction',
  templateUrl: './addaction.component.html',
  styleUrls: ['./addaction.component.scss']
})
export class AddactionComponent implements OnInit {

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


