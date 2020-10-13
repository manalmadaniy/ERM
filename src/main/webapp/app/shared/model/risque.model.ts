import { IRisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import { IRisqueaction } from 'app/shared/model/risqueaction.model';
import { IRisqueResiduel } from 'app/shared/model/risque-residuel.model';
import { IProcess } from 'app/shared/model/process.model';

export interface IRisque {
  id?: number;
  risquenom?: string;
  descrisque?: string;
  impact?: number;
  probability?: number;
  detection?: number;
  risqueanalyses?: IRisqueAnalyse[];
  risqueactions?: IRisqueaction[];
  risqueResiduel?: IRisqueResiduel;
  process?: IProcess;
}

export class Risque implements IRisque {
  constructor(
    public id?: number,
    public risquenom?: string,
    public descrisque?: string,
    public impact?: number,
    public probability?: number,
    public detection?: number,
    public risqueanalyses?: IRisqueAnalyse[],
    public risqueactions?: IRisqueaction[],
    public risqueResiduel?: IRisqueResiduel,
    public process?: IProcess
  ) {}
}
