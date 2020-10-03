import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from 'app/shared/shared.module';
import { ProprietaireActionComponent } from './proprietaire-action.component';
import { ProprietaireActionDetailComponent } from './proprietaire-action-detail.component';
import { ProprietaireActionUpdateComponent } from './proprietaire-action-update.component';
import { ProprietaireActionDeleteDialogComponent } from './proprietaire-action-delete-dialog.component';
import { proprietaireActionRoute } from './proprietaire-action.route';

@NgModule({
  imports: [KompliansSharedModule, RouterModule.forChild(proprietaireActionRoute)],
  declarations: [
    ProprietaireActionComponent,
    ProprietaireActionDetailComponent,
    ProprietaireActionUpdateComponent,
    ProprietaireActionDeleteDialogComponent,
  ],
  entryComponents: [ProprietaireActionDeleteDialogComponent],
})
export class KompliansProprietaireActionModule {}
