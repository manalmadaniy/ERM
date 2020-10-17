import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessDeleteDialogComponent } from 'app/entities/process/process-delete-dialog.component';
import { ProcessService } from 'app/entities/process/process.service';
import { IProcess } from 'app/shared/model/process.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-processus',
  templateUrl: './processus.component.html',
  styleUrls: ['./processus.component.scss']
})
export class ProcessusComponent implements OnInit {

  processes: IProcess[];
  eventSubscriber?: Subscription;
  rowGroupMetadata: any;

  constructor(protected processService: ProcessService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {

    this.processes=[]
  }

  loadAll(): void {
    this.processService.query().subscribe((res: HttpResponse<IProcess[]>) => (this.processes = res.body || []));
  }

  ngOnInit(): void {
    this.updateRowGroupMetaData();

    this.loadAll();
    this.registerChangeInProcesses();
  }

  onSort() :void{
    this.updateRowGroupMetaData();
}
  updateRowGroupMetaData() :void{
    this.rowGroupMetadata = {};
        if (this.processes) {
            for (let i = 0; i < this.processes.length; i++) {
                const rowData = this.processes[i];
                const brand = rowData.nameProcess!;
                if (i === 0) {
                    this.rowGroupMetadata[brand] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.processes[i - 1];
                    const previousRowGroup = previousRowData.nameProcess!;
                    if (brand === previousRowGroup)
                        this.rowGroupMetadata[brand].size++;
                    else
                        this.rowGroupMetadata[brand] = { index: i, size: 1 };
                }
            }
        }
    }

  trackId(index: number, item: IProcess): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProcesses(): void {
    this.eventSubscriber = this.eventManager.subscribe('processListModification', () => this.loadAll());
  }

  delete(process: IProcess): void {
    const modalRef = this.modalService.open(ProcessDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.process = process;
  }
}

