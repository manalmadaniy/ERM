import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RisqueAnalyseService } from 'app/entities/risque-analyse/risque-analyse.service';
import { RisqueService } from 'app/entities/risque/risque.service';
import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import { IRisque, Risque } from 'app/shared/model/risque.model';

@Component({
  selector: 'jhi-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  
  risques: IRisque[];
  datasource = new MatTableDataSource
  constructor( protected risqueservice: RisqueService,) { 
    this.risques= []
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
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  
}
  
