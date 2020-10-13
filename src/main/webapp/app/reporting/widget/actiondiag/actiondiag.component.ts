import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RisqueactionService } from 'app/entities/risqueaction/risqueaction.service';
import { IRisqueaction } from 'app/shared/model/risqueaction.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'jhi-actiondiag',
  templateUrl: './actiondiag.component.html',
  styleUrls: ['./actiondiag.component.scss']
})
export class ActiondiagComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions!: {};
  risqueactions: IRisqueaction[];
  cptnegliger: number;
  cptagir: number;
  constructor(    protected risqueactionservice: RisqueactionService,
    ) {
      this.risqueactions = []
      this.cptagir = 0
      this.cptnegliger = 0
     }

  ngOnInit(): void {

    this.risqueactionservice
        .query()
        .subscribe((res: HttpResponse<IRisqueaction[]>) => this.paginateRisques(res.body));

    
  }
  paginateRisques(data: IRisqueaction[] | null): void {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.risqueactions.push(data[i]);
        
      }

      for (let i = 0; i < this.risqueactions.length; i++) {
       if (this.risqueactions[i].action === "Négliger"){
this.cptnegliger = this.cptnegliger + 1

       }
       if (this.risqueactions[i].action === "Agir"){
        this.cptagir = this.cptagir + 1
        
               }

        
      }

      this.chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Traitement Des Risques',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
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
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Traitement des Risques',
            innerSize: '50%',
            data: [
                ['Risque Traité',this.cptagir],
                ['Risque Négligé', this.cptnegliger],
              
               
                
            ]
        }]
    }}}}