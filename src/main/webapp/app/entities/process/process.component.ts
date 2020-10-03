import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProcess } from 'app/shared/model/process.model';
import { ProcessService } from './process.service';
import { ProcessDeleteDialogComponent } from './process-delete-dialog.component';

@Component({
  selector: 'jhi-process',
  templateUrl: './process.component.html',
})
export class ProcessComponent implements OnInit, OnDestroy {
  processes?: IProcess[];
  eventSubscriber?: Subscription;

  constructor(protected processService: ProcessService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.processService.query().subscribe((res: HttpResponse<IProcess[]>) => (this.processes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProcesses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
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
