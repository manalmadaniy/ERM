export interface IProprietaireAction {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
}

export class ProprietaireAction implements IProprietaireAction {
  constructor(public id?: number, public nom?: string, public prenom?: string, public email?: string) {}
}
