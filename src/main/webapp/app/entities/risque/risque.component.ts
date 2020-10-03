import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRisque } from 'app/shared/model/risque.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RisqueService } from './risque.service';
import { RisqueDeleteDialogComponent } from './risque-delete-dialog.component';

@Component({
  selector: 'jhi-risque',
  templateUrl: './risque.component.html',
})
export class RisqueComponent implements OnInit, OnDestroy {
  risques: IRisque[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected risqueService: RisqueService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.risques = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.risqueService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IRisque[]>) => this.paginateRisques(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.risques = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRisques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRisque): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRisques(): void {
    this.eventSubscriber = this.eventManager.subscribe('risqueListModification', () => this.reset());
  }

  delete(risque: IRisque): void {
    const modalRef = this.modalService.open(RisqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.risque = risque;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateRisques(data: IRisque[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.risques.push(data[i]);
      }
    }
  }
}
