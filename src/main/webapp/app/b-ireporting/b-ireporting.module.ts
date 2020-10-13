import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KompliansSharedModule } from '../shared/shared.module';

import { B_IREPORTING_ROUTE, BIreportingComponent } from './';

@NgModule({
    imports: [
      KompliansSharedModule,
      RouterModule.forRoot([ B_IREPORTING_ROUTE ], { useHash: true })
    ],
    declarations: [
      BIreportingComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KompliansAppBIreportingModule {}
