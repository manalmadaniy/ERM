import { IRisque } from 'app/shared/model/risque.model';
import { IProprietaireAction } from 'app/shared/model/proprietaire-action.model';

export interface IRisqueaction {
  id?: number;
  action?: string;
  planaction?: string;
  tempsAction?: number;
  coutAction?: number;
  risque?: IRisque;
  proprietaireActions?: IProprietaireAction[];
}

export class Risqueaction implements IRisqueaction {
  constructor(
    public id?: number,
    public action?: string,
    public planaction?: string,
    public tempsAction?: number,
    public coutAction?: number,
    public risque?: IRisque,
    public proprietaireActions?: IProprietaireAction[]
  ) {}
}
