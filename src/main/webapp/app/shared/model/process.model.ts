import { IRisque } from 'app/shared/model/risque.model';

export interface IProcess {
  id?: number;
  nameProcess?: string;
  fonction?: string;
  description?: string;
  date?: string;
  risques?: IRisque[];
}

export class Process implements IProcess {
  constructor(
    public id?: number,
    public nameProcess?: string,
    public fonction?: string,
    public description?: string,
    public date?: string,
    public risques?: IRisque[]
  ) {}
}
