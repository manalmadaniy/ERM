
/* eslint @typescript-eslint/no-var-requires: "off" */
declare let require: any;

import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RisqueService } from 'app/entities/risque/risque.service';
import { IRisque } from 'app/shared/model/risque.model';
import * as Highcharts from 'highcharts';
const heatmap = require("highcharts/modules/heatmap.js");
heatmap(Highcharts)
@Component({
  selector: 'jhi-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit {
    risques: IRisque[];
    Highcharts = Highcharts;
  chartOptions!: {};
 impact : any[] = [];
  probabilite: any[] = [];
  criticite: any[] = [];
  dataset:  any[][][] = [[],[],[]];
  risquenom: any[] = [];

  constructor(
      private risqueservice: RisqueService
      ) {
          this.risques = []
         
         
       }
 
  ngOnInit():void {


      this.risqueservice
        .query()
        .subscribe((res: HttpResponse<IRisque[]>) => this.paginateRisques(res.body));


        console.log(this.dataset)


  }
  

      protected paginateRisques(data: IRisque[] | null): void {
    
        
        if (data) {
          for (let i = 0; i < data.length; i++) {
            this.risques.push(data[i]);
            
          }

       
          for (let i = 0; i < this.risques.length; i++) {
              const impact: any = this.risques[i].impact!
            this.impact.push(impact);
            
          }

          for (let i = 0; i < this.risques.length; i++) {
              const prob: any = this.risques[i].probability!
            this.probabilite.push(prob);
            
          }

          for (let i = 0; i < this.risques.length; i++) {
              const risque: any = this.risques[i].risquenom!
            this.risquenom.push(risque);
            
          }


          for (let i = 0; i < this.risques.length; i++) {
           const prob: any = this.risques[i].probability!
           const impact: any = this.risques[i].impact!
            this.criticite.push(prob * impact );
            
          }
        }

          for (let i = 0; i < this.risques.length; i++) {
            
this.dataset.push([this.impact[i],this.probabilite[i],this.risquenom[i]])
        }
       
          

         

        this.chartOptions = {
            chart: {
              type: 'heatmap',
              marginTop: 40,
              marginBottom: 80,
              plotBorderWidth: 0,
              
            },
            title: {
              text: 'Matrice des Risques'
            },
            xAxis: {
              categories: ['','Negligible', 'Minor', 'Moderate', 'Major',  'Catastrophic',''],
              title: 'Impact'
            },
            yAxis: {
              categories: ['','Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain',''],
              title: 'Probabilité'
            },
            colorAxis: {
              stops: [
               
                [0, '#3060cf'],
                [0.599999999999, '#3060cf'],
                [0.6, '#c4463a'],
                [1, '#c4463a']
              ]
            },
           
            legend: {
              enabled: false
            },
            plotOptions: {
              heatmap: {
                pointPadding: 4
              },
              series: {
                stickyTracking: false
              }
            },
            series: [{
              name: 'Risque',
              borderWidth: 1,
              data: this.dataset
            }]
          }
        }
        }