import { IRisque } from 'app/shared/model/risque.model';

export interface IRisqueResiduel {
  id?: number;
  impact?: number;
  probabilite?: number;
  detection?: number;
  risque?: IRisque;
}

export class RisqueResiduel implements IRisqueResiduel {
  [x: string]: any;
  constructor(
    public id?: number,
    public impact?: number,
    public probabilite?: number,
    public detection?: number,
    public risque?: IRisque
  ) {}
}
