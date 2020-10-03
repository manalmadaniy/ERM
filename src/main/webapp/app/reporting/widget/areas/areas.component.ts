import {  HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RisqueService } from 'app/entities/risque/risque.service';
import { IRisque} from 'app/shared/model/risque.model';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'jhi-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
 
    risques: IRisque[];
    Highcharts = Highcharts;
  chartOptions!: {};
 impact : number[] = [];
  probabilite: any
  imp : number
  risquenom: string[] = [];
  criticite: number[] = [];

  constructor(
      private risqueservice: RisqueService
      ) {
          this.risques = []
          this.imp = 0
         
       }
 
  ngOnInit():void {

 
      this.risqueservice
        .query()
        .subscribe((res: HttpResponse<IRisque[]>) => this.paginateRisques(res.body));


        console.log(this.impact)


  }
  
      protected paginateRisques(data: IRisque[] | null): void {
    
        if (data) {
          for (let i = 0; i < data.length; i++) {
            this.risques.push(data[i]);
            
          }

          for (let i = 0; i < this.risques.length; i++) {
            const impact: number = this.risques[i].impact!
            this.impact.push(impact);
            
          }

          for (let i = 0; i < this.risques.length; i++) {
            const risqueNom:string = this.risques[i].risquenom!
            this.risquenom.push(risqueNom);
            
          }
          for (let i = 0; i < this.risques.length; i++) {
            const probabilite:number = this.risques[i].probability!
            const impact: number = this.risques[i].impact!
            this.criticite.push(probabilite * impact );
            
          }

        }
          this.chartOptions =   {

            title: {
                text: 'Criticite des Risques'
            },
        
            subtitle: {
                text: ''
            },
        
            xAxis: {
                categories: this.risquenom
            },
        
            series: [{
                type: 'column',
                colorByPoint: true,
                data: this.criticite,
                showInLegend: false
            }]
        
        }

        }
      }
    
  
  

    

  
