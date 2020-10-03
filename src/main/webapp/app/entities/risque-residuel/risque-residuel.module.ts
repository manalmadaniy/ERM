import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from 'app/shared/shared.module';
import { RisqueResiduelComponent } from './risque-residuel.component';
import { RisqueResiduelDetailComponent } from './risque-residuel-detail.component';
import { RisqueResiduelUpdateComponent } from './risque-residuel-update.component';
import { RisqueResiduelDeleteDialogComponent } from './risque-residuel-delete-dialog.component';
import { risqueResiduelRoute } from './risque-residuel.route';

@NgModule({
  imports: [KompliansSharedModule, RouterModule.forChild(risqueResiduelRoute)],
  declarations: [
    RisqueResiduelComponent,
    RisqueResiduelDetailComponent,
    RisqueResiduelUpdateComponent,
    RisqueResiduelDeleteDialogComponent,
  ],
  entryComponents: [RisqueResiduelDeleteDialogComponent],
})
export class KompliansRisqueResiduelModule {}
