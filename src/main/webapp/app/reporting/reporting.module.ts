import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from '../shared/shared.module';

import { REPORTING_ROUTE, ReportingComponent } from './';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarsComponent } from './widget/bars/bars.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AreasComponent } from './widget/areas/areas.component';
import { CircleComponent } from './widget/circle/circle.component'
import { TreemapComponent } from './widget/treemap/treemap.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { IdentificationComponent } from './identification/identification.component';

import { LineComponent } from './widget/line/line.component';
import { RisqueAnalyseComponent } from 'app/entities/risque-analyse/risque-analyse.component';
import { ActiondiagComponent } from './widget/actiondiag/actiondiag.component';
import { RisqueresiduelComponent } from './widget/risqueresiduel/risqueresiduel.component';
import {MatInputModule} from '@angular/material/input';
import { AnalyseComponent } from './analyse/analyse.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { CreateactionComponent } from './createaction/createaction.component';

@NgModule({
    imports: [
    KompliansSharedModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
   MatPaginatorModule,
    HighchartsChartModule,
    
    FlexLayoutModule,
    RouterModule.forRoot(REPORTING_ROUTE),
     
    ],
    declarations: [
      ReportingComponent,
      
      DashboardComponent,
      BarsComponent,
      AreasComponent,
IdentificationComponent,
      CircleComponent,
CreateactionComponent,
      TreemapComponent,

      PowerbiComponent,

      LineComponent,

      ActiondiagComponent,

      RisqueresiduelComponent,

      AnalyseComponent,

      TreatmentComponent,

      

 

    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KompliansAppReportingModule {}
