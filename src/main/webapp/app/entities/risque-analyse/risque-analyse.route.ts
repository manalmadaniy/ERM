import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRisqueAnalyse, RisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import { RisqueAnalyseService } from './risque-analyse.service';
import { RisqueAnalyseComponent } from './risque-analyse.component';
import { RisqueAnalyseDetailComponent } from './risque-analyse-detail.component';
import { RisqueAnalyseUpdateComponent } from './risque-analyse-update.component';

@Injectable({ providedIn: 'root' })
export class RisqueAnalyseResolve implements Resolve<IRisqueAnalyse> {
  constructor(private service: RisqueAnalyseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRisqueAnalyse> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((risqueAnalyse: HttpResponse<RisqueAnalyse>) => {
          if (risqueAnalyse.body) {
            return of(risqueAnalyse.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RisqueAnalyse());
  }
}

export const risqueAnalyseRoute: Routes = [
  {
    path: '',
    component: RisqueAnalyseComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'kompliansApp.risqueAnalyse.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RisqueAnalyseDetailComponent,
    resolve: {
      risqueAnalyse: RisqueAnalyseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueAnalyse.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RisqueAnalyseUpdateComponent,
    resolve: {
      risqueAnalyse: RisqueAnalyseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueAnalyse.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RisqueAnalyseUpdateComponent,
    resolve: {
      risqueAnalyse: RisqueAnalyseResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueAnalyse.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
