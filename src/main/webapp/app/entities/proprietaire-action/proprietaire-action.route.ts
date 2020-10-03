import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProprietaireAction, ProprietaireAction } from 'app/shared/model/proprietaire-action.model';
import { ProprietaireActionService } from './proprietaire-action.service';
import { ProprietaireActionComponent } from './proprietaire-action.component';
import { ProprietaireActionDetailComponent } from './proprietaire-action-detail.component';
import { ProprietaireActionUpdateComponent } from './proprietaire-action-update.component';

@Injectable({ providedIn: 'root' })
export class ProprietaireActionResolve implements Resolve<IProprietaireAction> {
  constructor(private service: ProprietaireActionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProprietaireAction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((proprietaireAction: HttpResponse<ProprietaireAction>) => {
          if (proprietaireAction.body) {
            return of(proprietaireAction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProprietaireAction());
  }
}

export const proprietaireActionRoute: Routes = [
  {
    path: '',
    component: ProprietaireActionComponent,
    data: {
      authorities: ['ROLE_USER','ROLE_ADMIN'],
      pageTitle: 'kompliansApp.proprietaireAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProprietaireActionDetailComponent,
    resolve: {
      proprietaireAction: ProprietaireActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.proprietaireAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProprietaireActionUpdateComponent,
    resolve: {
      proprietaireAction: ProprietaireActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.proprietaireAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProprietaireActionUpdateComponent,
    resolve: {
      proprietaireAction: ProprietaireActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.proprietaireAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
