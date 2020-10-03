import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'app/entities/process/process.service';
import { IProcess } from 'app/shared/model/process.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'jhi-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent implements OnInit {


   process : IProcess[];
comptProcessdata: number;
dataset: string[][] = [[],[]];
    Highcharts = Highcharts;
    chartOptions!: {};
    pourdatacenter: []
    comptProcesssupport: number;
    comptProcesspilot: number;
    comptProcessmesure: number;
    processnom: string[];
    processus: [];
    

    constructor(private  processservice : ProcessService) {

        this.process= []
        this.processnom = []
        this.comptProcessdata = 0
        this.comptProcessmesure = 0
        this.comptProcesspilot = 0
        this.comptProcesssupport = 0
        this.pourdatacenter= []
        this.processus= []
     }
   
    ngOnInit():void {

        this.processservice
        .query()
        .subscribe((res: HttpResponse<IProcess[]>) => this.paginateRisques(res.body));

console.log(this.dataset)
  
     
}


paginateRisques(data: IProcess[] | null): void {
   

    if (data) {
        for (let i = 0; i < data.length; i++) {
          this.process.push(data[i]);
          
        
        }

        for (let i = 0; i < data.length; i++) {
            const nameprocess: string = data[i].nameProcess!
            this.processnom.push(nameprocess);
            
          
          }



        for (let i = 0; i < data.length; i++) {
            if (this.processnom[i] === "processus opérationnels")
            {
                this.comptProcessdata =this.comptProcessdata + 1 
            }
            if (this.processnom[i] === "processus de support")
            {
                this.comptProcesssupport =this.comptProcesssupport + 1 
            }
            if (this.processnom[i] === "processus de pilotage")
            {
                this.comptProcesspilot =this.comptProcesspilot + 1 
            }
            if (this.processnom[i] === "processus de mesure")
            {
                this.comptProcessmesure =this.comptProcessmesure + 1 
            }
          }

        

      }

    this.chartOptions =  {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: 'Risque Par Procecss Entreprise'
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Delivered amount',
            data: [
                ['processus opérationnels', this.comptProcessdata],
                ['processus de mesure',this.comptProcessmesure],
                ['processus de pilotage',  this.comptProcesspilot],
                ['processus de support', this.comptProcesssupport],
               
            ]
        }]
    }
}
}