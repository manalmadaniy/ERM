import { IRisque } from 'app/shared/model/risque.model';

export interface IRisqueAnalyse {
  id?: number;
  risqueCause?: string;
  typeCause?: string;
  risqueCons?: string;
  description?: string;
  risque?: IRisque;
}

export class RisqueAnalyse implements IRisqueAnalyse {
  constructor(
    public id?: number,
    public risqueCause?: string,
    public typeCause?: string,
    public risqueCons?: string,
    public description?: string,
    public risque?: IRisque
  ) {}
}
