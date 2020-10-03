import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueResiduelDetailComponent } from 'app/entities/risque-residuel/risque-residuel-detail.component';
import { RisqueResiduel } from 'app/shared/model/risque-residuel.model';

describe('Component Tests', () => {
  describe('RisqueResiduel Management Detail Component', () => {
    let comp: RisqueResiduelDetailComponent;
    let fixture: ComponentFixture<RisqueResiduelDetailComponent>;
    const route = ({ data: of({ risqueResiduel: new RisqueResiduel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueResiduelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RisqueResiduelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RisqueResiduelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load risqueResiduel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.risqueResiduel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
