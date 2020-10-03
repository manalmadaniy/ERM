import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRisqueaction } from 'app/shared/model/risqueaction.model';

type EntityResponseType = HttpResponse<IRisqueaction>;
type EntityArrayResponseType = HttpResponse<IRisqueaction[]>;

@Injectable({ providedIn: 'root' })
export class RisqueactionService {
  public resourceUrl = SERVER_API_URL + 'api/risqueactions';

  constructor(protected http: HttpClient) {}

  create(risqueaction: IRisqueaction): Observable<EntityResponseType> {
    return this.http.post<IRisqueaction>(this.resourceUrl, risqueaction, { observe: 'response' });
  }

  update(risqueaction: IRisqueaction): Observable<EntityResponseType> {
    return this.http.put<IRisqueaction>(this.resourceUrl, risqueaction, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRisqueaction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRisqueaction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
