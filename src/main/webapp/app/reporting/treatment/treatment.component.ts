import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RisqueactionService } from 'app/entities/risqueaction/risqueaction.service';
import { IRisqueaction, Risqueaction } from 'app/shared/model/risqueaction.model';

@Component({
  selector: 'jhi-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {

  risqueActions?: IRisqueaction[];
  constructor( protected risqueAnalyseService: RisqueactionService,) { }


  loadAll(): void {
    this.risqueAnalyseService.query().subscribe((res: HttpResponse<IRisqueaction[]>) => (this.risqueActions = res.body || []));
  }
  ngOnInit(): void {
    this.loadAll();
  }

  

}
