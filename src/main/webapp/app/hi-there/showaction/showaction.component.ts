import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RisqueactionDeleteDialogComponent } from 'app/entities/risqueaction/risqueaction-delete-dialog.component';
import { RisqueactionService } from 'app/entities/risqueaction/risqueaction.service';
import { IRisqueaction } from 'app/shared/model/risqueaction.model';
import { JhiEventManager } from 'ng-jhipster';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'jhi-showaction',
  templateUrl: './showaction.component.html',
  styleUrls: ['./showaction.component.scss']
})
export class ShowactionComponent implements OnInit {
  exportColumns!: any[];
  cols!: any[];

  risqueactions: IRisqueaction[];
  rowGroupMetadata: any;
  constructor(
    protected risqueactionService: RisqueactionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,

  ) {

    this.risqueactions = []
      
  }

  loadAll(): void {
    this.risqueactionService.query().subscribe((res: HttpResponse<IRisqueaction[]>) => (this.risqueactions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.updateRowGroupMetaData();
    this.cols = [
      { field: 'Action', header: 'Action' },
      { field: 'risque', header: 'risque' },
      { field: 'Planaction', header: 'Planaction' },
      { field: 'Temps Action', header: 'Temps Action' },
      { field: 'Cout Action', header: 'Cout Action' }
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
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

 

  delete(risqueaction: IRisqueaction): void {
    const modalRef = this.modalService.open(RisqueactionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.risqueaction = risqueaction;
  }
}

