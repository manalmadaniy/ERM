import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from '../shared/shared.module';

import { REPORTING_ROUTE, ReportingComponent } from './';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarsComponent } from './widget/bars/bars.component';
import { HighchartsChartModule } from 'highcharts-angular';

import { AreasComponent } from './widget/areas/areas.component';
import { CircleComponent } from './widget/circle/circle.component'
import { TreemapComponent } from './widget/treemap/treemap.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { LineComponent } from './widget/line/line.component';
import { RisqueAnalyseComponent } from 'app/entities/risque-analyse/risque-analyse.component';
@NgModule({
    imports: [
    KompliansSharedModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HighchartsChartModule,
    
    FlexLayoutModule,
    RouterModule.forRoot(REPORTING_ROUTE),
     
    ],
    declarations: [
      ReportingComponent,
      SidebarComponent,
      DashboardComponent,
      BarsComponent,
      AreasComponent,

      CircleComponent,

      TreemapComponent,

      PowerbiComponent,

      LineComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KompliansAppReportingModule {}
