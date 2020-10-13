import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReportingComponent } from './reporting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { CreateactionComponent } from './createaction/createaction.component';
import { RisqueactionResolve } from 'app/entities/risqueaction/risqueaction.route';

export const REPORTING_ROUTE: Routes =[{
  path: 'reporting',
  component: ReportingComponent,
  data: {
    authorities: [],
    pageTitle: 'reporting.title'
  },
  canActivate: [UserRouteAccessService],
},
{
  path: 'newaction',
  component: CreateactionComponent,
  resolve: {
    risqueaction: RisqueactionResolve,
  },
  data: {
    authorities: [],
    pageTitle: 'kompliansApp.risqueaction.home.title',
  },
  canActivate: [UserRouteAccessService],
},


];
