import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRisqueResiduel, RisqueResiduel } from 'app/shared/model/risque-residuel.model';
import { RisqueResiduelService } from './risque-residuel.service';
import { RisqueResiduelComponent } from './risque-residuel.component';
import { RisqueResiduelDetailComponent } from './risque-residuel-detail.component';
import { RisqueResiduelUpdateComponent } from './risque-residuel-update.component';

@Injectable({ providedIn: 'root' })
export class RisqueResiduelResolve implements Resolve<IRisqueResiduel> {
  constructor(private service: RisqueResiduelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRisqueResiduel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((risqueResiduel: HttpResponse<RisqueResiduel>) => {
          if (risqueResiduel.body) {
            return of(risqueResiduel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RisqueResiduel());
  }
}

export const risqueResiduelRoute: Routes = [
  {
    path: '',
    component: RisqueResiduelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueResiduel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RisqueResiduelDetailComponent,
    resolve: {
      risqueResiduel: RisqueResiduelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueResiduel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RisqueResiduelUpdateComponent,
    resolve: {
      risqueResiduel: RisqueResiduelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueResiduel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RisqueResiduelUpdateComponent,
    resolve: {
      risqueResiduel: RisqueResiduelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueResiduel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
