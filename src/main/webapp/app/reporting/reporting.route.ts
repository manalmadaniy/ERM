import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReportingComponent } from './reporting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { Authority } from 'app/shared/constants/authority.constants';

export const REPORTING_ROUTE: Routes =[{
  path: 'reporting',
  component: ReportingComponent,
  data: {
    authorities: [],
    pageTitle: 'reporting.title'
  },
  canActivate: [UserRouteAccessService],

children : [
  {

    path: '',
    component: DashboardComponent
  },
  {

    path: 'powerbi',
component: PowerbiComponent  },
  ]
}];
