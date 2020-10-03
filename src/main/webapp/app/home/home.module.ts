import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    KompliansSharedModule, 
    RouterModule.forChild([HOME_ROUTE]),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HighchartsChartModule,
    FlexLayoutModule,],
  declarations: [HomeComponent],
})
export class KompliansHomeModule {}
