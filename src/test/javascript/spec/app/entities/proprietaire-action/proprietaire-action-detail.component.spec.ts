import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { ProprietaireActionDetailComponent } from 'app/entities/proprietaire-action/proprietaire-action-detail.component';
import { ProprietaireAction } from 'app/shared/model/proprietaire-action.model';

describe('Component Tests', () => {
  describe('ProprietaireAction Management Detail Component', () => {
    let comp: ProprietaireActionDetailComponent;
    let fixture: ComponentFixture<ProprietaireActionDetailComponent>;
    const route = ({ data: of({ proprietaireAction: new ProprietaireAction(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [ProprietaireActionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProprietaireActionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProprietaireActionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proprietaireAction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proprietaireAction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
