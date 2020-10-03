import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'risque',
        loadChildren: () => import('./risque/risque.module').then(m => m.KompliansRisqueModule),
      },
      {
        path: 'risque-analyse',
        loadChildren: () => import('./risque-analyse/risque-analyse.module').then(m => m.KompliansRisqueAnalyseModule),
      },
      {
        path: 'risqueaction',
        loadChildren: () => import('./risqueaction/risqueaction.module').then(m => m.KompliansRisqueactionModule),
      },
      {
        path: 'process',
        loadChildren: () => import('./process/process.module').then(m => m.KompliansProcessModule),
      },
      {
        path: 'proprietaire-action',
        loadChildren: () => import('./proprietaire-action/proprietaire-action.module').then(m => m.KompliansProprietaireActionModule),
      },
      {
        path: 'risque-residuel',
        loadChildren: () => import('./risque-residuel/risque-residuel.module').then(m => m.KompliansRisqueResiduelModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class KompliansEntityModule {}
