import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { BIreportingComponent } from './b-ireporting.component';

export const B_IREPORTING_ROUTE: Route = {
  path: 'b-ireporting',
  component: BIreportingComponent,
  data: {
    authorities: [],
    pageTitle: 'b-ireporting.title'
  },
  canActivate: [UserRouteAccessService]
};
