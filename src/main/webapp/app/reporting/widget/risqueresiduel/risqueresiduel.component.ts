
import { HttpResponse } from '@angular/common/http';
/* eslint @typescript-eslint/no-var-requires: "off" */
import { Component, OnInit } from '@angular/core';
import { RisqueResiduelService } from 'app/entities/risque-residuel/risque-residuel.service';
import { IRisqueResiduel } from 'app/shared/model/risque-residuel.model';
import * as Highcharts from 'highcharts';
const highchartsMore = require("highcharts/highcharts-more.js");
highchartsMore(Highcharts);
const boostCanvas = require("highcharts/modules/boost-canvas.js");
boostCanvas(Highcharts);
const boost = require("highcharts/modules/boost.js");
boost(Highcharts);
@Component({
  selector: 'jhi-risqueresiduel',
  templateUrl: './risqueresiduel.component.html',
  styleUrls: ['./risqueresiduel.component.scss']
})
export class RisqueresiduelComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions!: {};
  risqueR: IRisqueResiduel[]
  dataset: any [][][][] = [[],[],[],[]];
  imp: any []
  prob: any []
  risquenom: any[] = [];
  constructor(private risqueresiduelservice : RisqueResiduelService) {
    this.risqueR = []
    this.imp = []
    this.prob = []

   }

  ngOnInit(): void {
    {
      this.risqueresiduelservice
      .query()
      .subscribe((res: HttpResponse<IRisqueResiduel[]>) => this.paginateRisques(res.body));
    
  }
  }

  paginateRisques(data: IRisqueResiduel[] | null): void {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.risqueR.push(data[i]);
        
      }

      for (let i = 0; i < this.risqueR.length; i++) {

        const impact : number = this.risqueR[i].impact!
       
        this.imp.push(impact );
        
      }

      for (let i = 0; i < this.risqueR.length; i++) {

        const proba: any = this.risqueR[i].probabilite
       
        this.prob.push(proba );
        
      }
      for (let i = 0; i < this.risqueR.length; i++) {

        const nom: any = this.risqueR[i].risque
       
        this.risquenom.push(nom );
        
      }

      for (let i = 0; i < this.risqueR.length; i++) {

      this.dataset.push([this.imp[i],this.prob[i],this.imp[i]*this.prob[i],this.risquenom])

        
      }
  }


  this.chartOptions = { chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zoomType: 'xy'
},

title: {
    text: 'Nuage de Criticité Du Risque Résiduel'
},

xAxis: {
    gridLineWidth: 1,
    accessibility: {
        rangeDescription: 'Range: 0 to 100.'
    }
},

yAxis: {
    startOnTick: false,
    endOnTick: false,
    accessibility: {
        rangeDescription: 'Range: 0 to 100.'
    }
},

series: [{
    data: this.dataset
   
    }

]

}
}
}