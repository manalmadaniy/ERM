import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRisqueaction, Risqueaction } from 'app/shared/model/risqueaction.model';
import { RisqueactionService } from './risqueaction.service';
import { RisqueactionComponent } from './risqueaction.component';
import { RisqueactionDetailComponent } from './risqueaction-detail.component';
import { RisqueactionUpdateComponent } from './risqueaction-update.component';

@Injectable({ providedIn: 'root' })
export class RisqueactionResolve implements Resolve<IRisqueaction> {
  constructor(private service: RisqueactionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRisqueaction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((risqueaction: HttpResponse<Risqueaction>) => {
          if (risqueaction.body) {
            return of(risqueaction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Risqueaction());
  }
}

export const risqueactionRoute: Routes = [
  {
    path: '',
    component: RisqueactionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'kompliansApp.risqueaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RisqueactionDetailComponent,
    resolve: {
      risqueaction: RisqueactionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RisqueactionUpdateComponent,
    resolve: {
      risqueaction: RisqueactionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RisqueactionUpdateComponent,
    resolve: {
      risqueaction: RisqueactionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.risqueaction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
