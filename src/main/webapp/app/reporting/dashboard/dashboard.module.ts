import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerbiComponent } from '../powerbi/powerbi.component';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [

PowerbiComponent,
DashboardComponent,


  ],
  imports: [
    CommonModule,
    
  ]
})
export class DashboardModule { }
