import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRisque } from 'app/shared/model/risque.model';

type EntityResponseType = HttpResponse<IRisque>;
type EntityArrayResponseType = HttpResponse<IRisque[]>;

@Injectable({ providedIn: 'root' })
export class RisqueService {
  public resourceUrl = SERVER_API_URL + 'api/risques';

  constructor(protected http: HttpClient) {}

  create(risque: IRisque): Observable<EntityResponseType> {
    return this.http.post<IRisque>(this.resourceUrl, risque, { observe: 'response' });
  }

  update(risque: IRisque): Observable<EntityResponseType> {
    return this.http.put<IRisque>(this.resourceUrl, risque, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRisque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRisque[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
