import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';

type EntityResponseType = HttpResponse<IRisqueAnalyse>;
type EntityArrayResponseType = HttpResponse<IRisqueAnalyse[]>;

@Injectable({ providedIn: 'root' })
export class RisqueAnalyseService {
  public resourceUrl = SERVER_API_URL + 'api/risque-analyses';

  constructor(protected http: HttpClient) {}

  create(risqueAnalyse: IRisqueAnalyse): Observable<EntityResponseType> {
    return this.http.post<IRisqueAnalyse>(this.resourceUrl, risqueAnalyse, { observe: 'response' });
  }

  update(risqueAnalyse: IRisqueAnalyse): Observable<EntityResponseType> {
    return this.http.put<IRisqueAnalyse>(this.resourceUrl, risqueAnalyse, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRisqueAnalyse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRisqueAnalyse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
