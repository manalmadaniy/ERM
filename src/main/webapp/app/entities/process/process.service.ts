import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcess } from 'app/shared/model/process.model';

type EntityResponseType = HttpResponse<IProcess>;
type EntityArrayResponseType = HttpResponse<IProcess[]>;

@Injectable({ providedIn: 'root' })
export class ProcessService {
  public resourceUrl = SERVER_API_URL + 'api/processes';

  constructor(protected http: HttpClient) {}

  create(process: IProcess): Observable<EntityResponseType> {
    return this.http.post<IProcess>(this.resourceUrl, process, { observe: 'response' });
  }

  update(process: IProcess): Observable<EntityResponseType> {
    return this.http.put<IProcess>(this.resourceUrl, process, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcess>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcess[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
