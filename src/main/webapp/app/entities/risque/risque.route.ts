import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRisque, Risque } from 'app/shared/model/risque.model';
import { RisqueService } from './risque.service';
import { RisqueComponent } from './risque.component';
import { RisqueDetailComponent } from './risque-detail.component';
import { RisqueUpdateComponent } from './risque-update.component';

@Injectable({ providedIn: 'root' })
export class RisqueResolve implements Resolve<IRisque> {
  constructor(private service: RisqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRisque> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((risque: HttpResponse<Risque>) => {
          if (risque.body) {
            return of(risque.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Risque());
  }
}

export const risqueRoute: Routes = [
  {
    path: '',
    component: RisqueComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RisqueDetailComponent,
    resolve: {
      risque: RisqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RisqueUpdateComponent,
    resolve: {
      risque: RisqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RisqueUpdateComponent,
    resolve: {
      risque: RisqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
