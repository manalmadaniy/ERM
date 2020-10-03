import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProcess, Process } from 'app/shared/model/process.model';
import { ProcessService } from './process.service';
import { ProcessComponent } from './process.component';
import { ProcessDetailComponent } from './process-detail.component';
import { ProcessUpdateComponent } from './process-update.component';

@Injectable({ providedIn: 'root' })
export class ProcessResolve implements Resolve<IProcess> {
  constructor(private service: ProcessService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcess> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((process: HttpResponse<Process>) => {
          if (process.body) {
            return of(process.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Process());
  }
}

export const processRoute: Routes = [
  {
    path: '',
    component: ProcessComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.process.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProcessDetailComponent,
    resolve: {
      process: ProcessResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.process.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProcessUpdateComponent,
    resolve: {
      process: ProcessResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.process.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProcessUpdateComponent,
    resolve: {
      process: ProcessResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kompliansApp.process.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
