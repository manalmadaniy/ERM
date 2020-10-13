import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { HiThereComponent } from './hi-there.component';

export const HI_THERE_ROUTE: Route = {
  path: 'hi-there',
  component: HiThereComponent,
  data: {
    authorities: [],
    pageTitle: 'hi-there.title'
  },
  canActivate: [UserRouteAccessService]
};
