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
  rowGroupMetadata: any;

  risqueAnalyses: IRisqueAnalyse[];
  constructor( protected risqueAnalyseService: RisqueAnalyseService,) { 
    this.risqueAnalyses=[]
  }


  loadAll(): void {
    this.risqueAnalyseService.query().subscribe((res: HttpResponse<IRisqueAnalyse[]>) => (this.risqueAnalyses = res.body || []));
  }
  ngOnInit(): void {
    this.loadAll();
    this.updateRowGroupMetaData();

  }
  onSort() :void{
    this.updateRowGroupMetaData();
}
  updateRowGroupMetaData() :void{
    this.rowGroupMetadata = {};
        if (this.risqueAnalyses) {
            for (let i = 0; i < this.risqueAnalyses.length; i++) {
                const rowData = this.risqueAnalyses[i];
                const brand = rowData.typeCause!;
                if (i === 0) {
                    this.rowGroupMetadata[brand] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.risqueAnalyses[i - 1];
                    const previousRowGroup = previousRowData.typeCause!;
                    if (brand === previousRowGroup)
                        this.rowGroupMetadata[brand].size++;
                    else
                        this.rowGroupMetadata[brand] = { index: i, size: 1 };
                }
            }
        }
    }

  
}