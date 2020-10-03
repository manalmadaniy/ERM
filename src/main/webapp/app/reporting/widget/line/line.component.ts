import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProcessService } from 'app/entities/process/process.service';
import { IProcess } from 'app/shared/model/process.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'jhi-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions!: {};
  process: IProcess[];
  cptJanvier: number;
  cptfevrier: number;
  cptmars: number;
  cptavril: number;
  cptmai: number;
  cptjuin: number;
  cptjuillet: number;
  cptaout: number;
  cptseptembre: number;
  cptsctobre: number;
  cptnovemvre: number;
  cptdecembre: number;
  dataPO: number [];
  cptJanvierM: number;
  cptfevrierM: number;
  cptmarsM: number;
  cptavrilM: number;
  cptmaiM: number;
  cptjuinM: number;
  cptjuilletM: number;
  cptaoutM: number;
  cptseptembreM: number;
  cptsctobreM: number;
  cptnovemvreM: number;
  cptdecembreM: number;
  dataM: number [];
  constructor(
    private processservice: ProcessService
  ) { 
    this.process = []
this.dataPO = []
    this.cptJanvier = 0
    this.cptfevrier = 0
    this.cptmars = 0
    this.cptavril = 0
    this.cptmai = 0
    this.cptjuin = 0
    this.cptjuillet = 0
    this.cptaout = 0
    this.cptseptembre = 0
    this.cptsctobre = 0
    this.cptnovemvre = 0
    this.cptdecembre = 0
    this.dataM = []
    this.cptJanvierM = 0
    this.cptfevrierM = 0
    this.cptmarsM = 0
    this.cptavrilM = 0
    this.cptmaiM = 0
    this.cptjuinM = 0
    this.cptjuilletM = 0
    this.cptaoutM = 0
    this.cptseptembreM = 0
    this.cptsctobreM = 0
    this.cptnovemvreM = 0
    this.cptdecembreM = 0
  }

  ngOnInit(): void {

    this.processservice
    .query()
    .subscribe((res: HttpResponse<IProcess[]>) => this.paginateRisques(res.body));





    
  }


  paginateRisques(data: IProcess[] | null): void {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.process.push(data[i]);
        
      }

      for (let i = 0; i < this.process.length; i++) {
        if (this.process[i].date === 'Janvier' && this.process[i].nameProcess === 'processus operationnels')
        {
          this.cptJanvier = this.cptJanvier + 1
        }
        if (this.process[i].date === 'Fevrier' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptfevrier = this.cptfevrier + 1
        }
        if (this.process[i].date === 'Mars' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptmars = this.cptmars + 1
        }
        if (this.process[i].date === 'Avril' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptavril = this.cptavril + 1
        }
        if (this.process[i].date === 'Mai' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptmai = this.cptmai + 1
        }
        if (this.process[i].date === 'Juin' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptjuin = this.cptjuin + 1
        }
        if (this.process[i].date === 'Juillet' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptjuillet = this.cptjuillet + 1
        }
        if (this.process[i].date === 'Aout' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptaout = this.cptaout + 1
        }
        if (this.process[i].date === 'Septembre' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptseptembre = this.cptseptembre + 1
        }
        if (this.process[i].date === 'Octobre' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptsctobre = this.cptsctobre + 1
        }
        if (this.process[i].date === 'Novembre' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptnovemvre = this.cptnovemvre + 1
        }
        if (this.process[i].date === 'Decembre' && this.process[i].nameProcess === 'processus operationnels'){
          this.cptdecembre = this.cptdecembre + 1
        }



        if (this.process[i].date === 'Janvier' && this.process[i].nameProcess === 'processus de mesure')
        {
          this.cptJanvierM = this.cptJanvierM + 1
        }
        if (this.process[i].date === 'Fevrier' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptfevrierM = this.cptfevrierM + 1
        }
        if (this.process[i].date === 'Mars' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptmarsM = this.cptmarsM + 1
        }
        if (this.process[i].date === 'Avril' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptavrilM = this.cptavrilM + 1
        }
        if (this.process[i].date === 'Mai' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptmaiM = this.cptmaiM + 1
        }
        if (this.process[i].date === 'Juin' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptjuinM = this.cptjuinM + 1
        }
        if (this.process[i].date === 'Juillet' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptjuilletM = this.cptjuilletM + 1
        }
        if (this.process[i].date === 'Aout' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptaoutM = this.cptaoutM + 1
        }
        if (this.process[i].date === 'Septembre' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptseptembreM = this.cptseptembreM + 1
        }
        if (this.process[i].date === 'Octobre' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptsctobreM = this.cptsctobreM + 1
        }
        if (this.process[i].date === 'Novembre' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptnovemvreM = this.cptnovemvreM + 1
        }
        if (this.process[i].date === 'Decembre' && this.process[i].nameProcess === 'processus de mesure'){
          this.cptdecembreM = this.cptdecembreM + 1
        }
        
      }

      this.dataPO.push(this.cptJanvier)
      this.dataPO.push(this.cptfevrier)
      this.dataPO.push(this.cptmars)
      this.dataPO.push(this.cptavril)
      this.dataPO.push(this.cptmai)
      this.dataPO.push(this.cptjuin)
      this.dataPO.push(this.cptjuillet)
      this.dataPO.push(this.cptaout)
      this.dataPO.push(this.cptseptembre)
      this.dataPO.push(this.cptsctobre)
      this.dataPO.push(this.cptnovemvre)
      this.dataPO.push(this.cptdecembre)


this.dataM.push(this.cptJanvierM)
this.dataM.push(this.cptfevrierM)

this.dataM.push(this.cptmarsM)

this.dataM.push(this.cptavrilM)

this.dataM.push(this.cptmaiM)

this.dataM.push(this.cptjuinM)

this.dataM.push(this.cptjuilletM)

this.dataM.push(this.cptaoutM)

this.dataM.push(this.cptseptembreM)

this.dataM.push(this.cptsctobreM)

this.dataM.push(this.cptnovemvreM)

this.dataM.push(this.cptdecembreM)



      this.chartOptions= {

        title: {
            text: 'Evolution des Processus Par rapport aux Risques'
        },
    
       
    
        yAxis: {
            title: {
                text: 'Nombre de Risques'
            }
        },
    
        xAxis: {
          categories: ['Janvier','Fevrier', 'Mars', 'Avril', 'Mai', 'Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
    
        series: [{
            name: 'processus operationnels',
            data: this.dataPO
        }, {
            name: 'processus de mesure',
            data: this.dataM
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    }
  }





  }}
