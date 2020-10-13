import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RisqueactionDeleteDialogComponent } from 'app/entities/risqueaction/risqueaction-delete-dialog.component';
import { RisqueactionService } from 'app/entities/risqueaction/risqueaction.service';
import { IRisqueaction } from 'app/shared/model/risqueaction.model';
import { JhiEventManager } from 'ng-jhipster';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'jhi-showaction',
  templateUrl: './showaction.component.html',
  styleUrls: ['./showaction.component.scss']
})
export class ShowactionComponent implements OnInit {
  actions$: Observable<IRisqueaction[]>;

  risqueactions: IRisqueaction[];
  eventSubscriber?: Subscription;
  filter = new FormControl('');

  constructor(
    protected risqueactionService: RisqueactionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,

  ) {

    this.risqueactions = []
    this.actions$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text)));
  }

  loadAll(): void {
    this.risqueactionService.query().subscribe((res: HttpResponse<IRisqueaction[]>) => (this.risqueactions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRisqueactions();
    
  }

 
 search(text: string): IRisqueaction[] {
    return this.risqueactions.filter(country => {
      const term = text.toLowerCase();
      return country.action!.toLowerCase().includes(term)
         
    });
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

