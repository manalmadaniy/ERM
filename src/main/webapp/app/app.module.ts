import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { KompliansSharedModule } from 'app/shared/shared.module';
import { KompliansCoreModule } from 'app/core/core.module';
import { KompliansAppRoutingModule } from './app-routing.module';
import { KompliansHomeModule } from './home/home.module';
import { KompliansEntityModule } from './entities/entity.module';
import { KompliansAppReportingModule } from './reporting/reporting.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    KompliansSharedModule,
    KompliansCoreModule,
    KompliansHomeModule,
    KompliansAppReportingModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    KompliansEntityModule,
    KompliansAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent, ],
  bootstrap: [MainComponent],
})
export class KompliansAppModule {}
