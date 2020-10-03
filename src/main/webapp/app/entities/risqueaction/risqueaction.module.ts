import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from 'app/shared/shared.module';
import { RisqueactionComponent } from './risqueaction.component';
import { RisqueactionDetailComponent } from './risqueaction-detail.component';
import { RisqueactionUpdateComponent } from './risqueaction-update.component';
import { RisqueactionDeleteDialogComponent } from './risqueaction-delete-dialog.component';
import { risqueactionRoute } from './risqueaction.route';

@NgModule({
  imports: [KompliansSharedModule, RouterModule.forChild(risqueactionRoute)],
  declarations: [RisqueactionComponent, RisqueactionDetailComponent, RisqueactionUpdateComponent, RisqueactionDeleteDialogComponent],
  entryComponents: [RisqueactionDeleteDialogComponent],
})
export class KompliansRisqueactionModule {}
