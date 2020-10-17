import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RisqueAnalyseService } from 'app/entities/risque-analyse/risque-analyse.service';
import { RisqueService } from 'app/entities/risque/risque.service';
import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import { IRisque, Risque } from 'app/shared/model/risque.model';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'jhi-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  actions$: Observable<IRisque[]>;

  risques: IRisque[];
  datasource = new MatTableDataSource
  filter = new FormControl('');
  eventSubscriber?: Subscription;

  constructor( protected risqueservice: RisqueService,) { 
    this.risques= []
    this.actions$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text)));
  }


  
  ngOnInit(): void {
    this.risqueservice
    .query()
    .subscribe((res: HttpResponse<IRisque[]>) => this.paginateRisques(res.body));

  }
  paginateRisques(data: IRisque[] | null): void {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.risques.push(data[i]);
        
      }

      this.datasource.data = this.risques
  }
}


search(text: string): IRisque[] {
  return this.risques.filter(country => {
    const term = text.toLowerCase();
    return country.risquenom!.toLowerCase().includes(term)
       
  });
}
  
  
}
  
