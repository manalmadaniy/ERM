import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RisqueAnalyseService } from 'app/entities/risque-analyse/risque-analyse.service';
import { IRisqueAnalyse, RisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'jhi-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit {


  Highcharts = Highcharts;
  chartOptions!: {};
  risqueAnalyses: IRisqueAnalyse[];
  type : string[] = [];
  pourcentmateriel : number
  pourcentmain : number
  pourcentmet : number
  cptmateriel : number
  cptmet : number
cptmain : number

  constructor(private risqueAnalyseService : RisqueAnalyseService) {

    this.risqueAnalyses = []
    this.pourcentmateriel = 0
    this.pourcentmet = 0
    this.pourcentmain = 0

this.cptmateriel = 0
this.cptmain = 0
this.cptmet = 0


   }

  ngOnInit(): void {


 
        this.risqueAnalyseService.query().subscribe((res: HttpResponse<IRisqueAnalyse[]>) =>this.paginateRisques(res.body));
      

   console.log(this.pourcentmet)
    
    
  }
   
  protected paginateRisques(data: IRisqueAnalyse[] | null): void {
    
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.risqueAnalyses.push(data[i]);
        
      }

     
     
      for (let i = 0; i < this.risqueAnalyses.length; i++) {
      const typecause:string = this.risqueAnalyses[i].typeCause!
        this.type.push(typecause);
        
      }


      for (let i = 0; i < this.type.length; i++) {
       if (this.type[i] === "Materiel" ){
this.cptmateriel = this.cptmateriel+1
           this.pourcentmateriel = this.cptmateriel/this.risqueAnalyses.length * 100
       }
       if (this.type[i] === "Main Oeuvre" ){
        this.cptmain = this.cptmain+1
                   this.pourcentmain = this.cptmain/this.risqueAnalyses.length * 100
               }
               if (this.type[i] === "Metier" ){
                this.cptmet = this.cptmet+1
                           this.pourcentmet = this.cptmet/this.risqueAnalyses.length * 100
                       }
      }
 



        this.chartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Les risques par Type de cause'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Main Oeuvre',
                colorByPoint: true,
                data: [{
                    name: 'Main Oeuvre',
                    y: this.pourcentmain,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Materiel',
                    y: this.pourcentmateriel
                }, {
                    name: 'METIER',
                    y: this.pourcentmet
                },]
            }]
        }
    }

  }}
