import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRisqueResiduel } from 'app/shared/model/risque-residuel.model';

type EntityResponseType = HttpResponse<IRisqueResiduel>;
type EntityArrayResponseType = HttpResponse<IRisqueResiduel[]>;

@Injectable({ providedIn: 'root' })
export class RisqueResiduelService {
  public resourceUrl = SERVER_API_URL + 'api/risque-residuels';

  constructor(protected http: HttpClient) {}

  create(risqueResiduel: IRisqueResiduel): Observable<EntityResponseType> {
    return this.http.post<IRisqueResiduel>(this.resourceUrl, risqueResiduel, { observe: 'response' });
  }

  update(risqueResiduel: IRisqueResiduel): Observable<EntityResponseType> {
    return this.http.put<IRisqueResiduel>(this.resourceUrl, risqueResiduel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRisqueResiduel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRisqueResiduel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
