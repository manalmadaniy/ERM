import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RisqueAnalyseService } from 'app/entities/risque-analyse/risque-analyse.service';
import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';

@Component({
  selector: 'jhi-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {

  risqueAnalyses?: IRisqueAnalyse[];
  constructor( protected risqueAnalyseService: RisqueAnalyseService,) { }


  loadAll(): void {
    this.risqueAnalyseService.query().subscribe((res: HttpResponse<IRisqueAnalyse[]>) => (this.risqueAnalyses = res.body || []));
  }
  ngOnInit(): void {
    this.loadAll();
  }

  
}