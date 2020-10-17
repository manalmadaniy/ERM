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
import {TableModule} from 'primeng/table';
import { LineComponent } from './widget/line/line.component';
import { RisqueAnalyseComponent } from 'app/entities/risque-analyse/risque-analyse.component';
import { ActiondiagComponent } from './widget/actiondiag/actiondiag.component';
import { RisqueresiduelComponent } from './widget/risqueresiduel/risqueresiduel.component';
import {MatInputModule} from '@angular/material/input';
import { AnalyseComponent } from './analyse/analyse.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { CreateactionComponent } from './createaction/createaction.component';
import { ProcessusComponent } from './processus/processus.component';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';

@NgModule({
    imports: [
      RatingModule,
      RadioButtonModule,
      InputNumberModule,
      CardModule,
    KompliansSharedModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatInputModule,
    TableModule,
    PaginatorModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ToolbarModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
InputTextModule,
ProgressBarModule,
TabViewModule,
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

      ProcessusComponent,



      

 

    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KompliansAppReportingModule {}
