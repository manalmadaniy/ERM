import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueactionDetailComponent } from 'app/entities/risqueaction/risqueaction-detail.component';
import { Risqueaction } from 'app/shared/model/risqueaction.model';

describe('Component Tests', () => {
  describe('Risqueaction Management Detail Component', () => {
    let comp: RisqueactionDetailComponent;
    let fixture: ComponentFixture<RisqueactionDetailComponent>;
    const route = ({ data: of({ risqueaction: new Risqueaction(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueactionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RisqueactionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RisqueactionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load risqueaction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.risqueaction).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
