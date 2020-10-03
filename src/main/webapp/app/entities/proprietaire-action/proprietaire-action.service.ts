import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProprietaireAction } from 'app/shared/model/proprietaire-action.model';

type EntityResponseType = HttpResponse<IProprietaireAction>;
type EntityArrayResponseType = HttpResponse<IProprietaireAction[]>;

@Injectable({ providedIn: 'root' })
export class ProprietaireActionService {
  public resourceUrl = SERVER_API_URL + 'api/proprietaire-actions';

  constructor(protected http: HttpClient) {}

  create(proprietaireAction: IProprietaireAction): Observable<EntityResponseType> {
    return this.http.post<IProprietaireAction>(this.resourceUrl, proprietaireAction, { observe: 'response' });
  }

  update(proprietaireAction: IProprietaireAction): Observable<EntityResponseType> {
    return this.http.put<IProprietaireAction>(this.resourceUrl, proprietaireAction, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProprietaireAction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProprietaireAction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
