import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { HighchartsChartModule } from 'highcharts-angular';

import { KompliansSharedModule } from '../shared/shared.module';

import { HI_THERE_ROUTE, HiThereComponent } from './';
import { ShowactionComponent } from './showaction/showaction.component';
import { AddactionComponent } from './addaction/addaction.component';
import { RrComponent } from './rr/rr.component';

@NgModule({
    imports: [
      KompliansSharedModule,
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
      RouterModule.forRoot([ HI_THERE_ROUTE ], { useHash: true })
    ],
    declarations: [
      HiThereComponent,
      ShowactionComponent,
      AddactionComponent,
      RrComponent,
     
 

    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KompliansAppHiThereModule {}
