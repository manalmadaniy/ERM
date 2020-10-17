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

  risqueactions: IRisqueaction[];
  eventSubscriber?: Subscription;
  rowGroupMetadata: any;

  constructor(
    protected risqueactionService: RisqueactionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
    this.risqueactions = []
  }

  loadAll(): void {
    this.risqueactionService.query().subscribe((res: HttpResponse<IRisqueaction[]>) => (this.risqueactions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRisqueactions();
    this.updateRowGroupMetaData();

  }
  onSort() :void{
    this.updateRowGroupMetaData();
}
  updateRowGroupMetaData() :void{
    this.rowGroupMetadata = {};
        if (this.risqueactions) {
            for (let i = 0; i < this.risqueactions.length; i++) {
                const rowData = this.risqueactions[i];
                const brand = rowData.proprietaireAction?.email!;
                if (i === 0) {
                    this.rowGroupMetadata[brand] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.risqueactions[i - 1];
                    const previousRowGroup = previousRowData.proprietaireAction?.email!;
                    if (brand === previousRowGroup)
                        this.rowGroupMetadata[brand].size++;
                    else
                        this.rowGroupMetadata[brand] = { index: i, size: 1 };
                }
            }
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


