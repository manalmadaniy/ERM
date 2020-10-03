import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from 'app/shared/shared.module';
import { ProcessComponent } from './process.component';
import { ProcessDetailComponent } from './process-detail.component';
import { ProcessUpdateComponent } from './process-update.component';
import { ProcessDeleteDialogComponent } from './process-delete-dialog.component';
import { processRoute } from './process.route';

@NgModule({
  imports: [KompliansSharedModule, RouterModule.forChild(processRoute)],
  declarations: [ProcessComponent, ProcessDetailComponent, ProcessUpdateComponent, ProcessDeleteDialogComponent],
  entryComponents: [ProcessDeleteDialogComponent],
})
export class KompliansProcessModule {}
