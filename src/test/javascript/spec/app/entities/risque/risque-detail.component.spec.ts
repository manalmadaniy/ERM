import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueDetailComponent } from 'app/entities/risque/risque-detail.component';
import { Risque } from 'app/shared/model/risque.model';

describe('Component Tests', () => {
  describe('Risque Management Detail Component', () => {
    let comp: RisqueDetailComponent;
    let fixture: ComponentFixture<RisqueDetailComponent>;
    const route = ({ data: of({ risque: new Risque(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RisqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RisqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load risque on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.risque).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
