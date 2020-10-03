import { IRisqueaction } from 'app/shared/model/risqueaction.model';

export interface IProprietaireAction {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  risqueactions?: IRisqueaction[];
}

export class ProprietaireAction implements IProprietaireAction {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public risqueactions?: IRisqueaction[]
  ) {}
}
