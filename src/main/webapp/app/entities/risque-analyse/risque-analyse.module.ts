import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from 'app/shared/shared.module';
import { RisqueAnalyseComponent } from './risque-analyse.component';
import { RisqueAnalyseDetailComponent } from './risque-analyse-detail.component';
import { RisqueAnalyseUpdateComponent } from './risque-analyse-update.component';
import { RisqueAnalyseDeleteDialogComponent } from './risque-analyse-delete-dialog.component';
import { risqueAnalyseRoute } from './risque-analyse.route';

@NgModule({
  imports: [KompliansSharedModule, RouterModule.forChild(risqueAnalyseRoute)],
  declarations: [RisqueAnalyseComponent, RisqueAnalyseDetailComponent, RisqueAnalyseUpdateComponent, RisqueAnalyseDeleteDialogComponent],
  entryComponents: [RisqueAnalyseDeleteDialogComponent],
})
export class KompliansRisqueAnalyseModule {}
