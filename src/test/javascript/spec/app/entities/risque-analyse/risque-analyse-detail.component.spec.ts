import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueAnalyseDetailComponent } from 'app/entities/risque-analyse/risque-analyse-detail.component';
import { RisqueAnalyse } from 'app/shared/model/risque-analyse.model';

describe('Component Tests', () => {
  describe('RisqueAnalyse Management Detail Component', () => {
    let comp: RisqueAnalyseDetailComponent;
    let fixture: ComponentFixture<RisqueAnalyseDetailComponent>;
    const route = ({ data: of({ risqueAnalyse: new RisqueAnalyse(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueAnalyseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RisqueAnalyseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RisqueAnalyseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load risqueAnalyse on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.risqueAnalyse).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
