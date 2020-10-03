import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KompliansTestModule } from '../../../test.module';
import { RisqueResiduelComponent } from 'app/entities/risque-residuel/risque-residuel.component';
import { RisqueResiduelService } from 'app/entities/risque-residuel/risque-residuel.service';
import { RisqueResiduel } from 'app/shared/model/risque-residuel.model';

describe('Component Tests', () => {
  describe('RisqueResiduel Management Component', () => {
    let comp: RisqueResiduelComponent;
    let fixture: ComponentFixture<RisqueResiduelComponent>;
    let service: RisqueResiduelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueResiduelComponent],
      })
        .overrideTemplate(RisqueResiduelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RisqueResiduelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RisqueResiduelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RisqueResiduel(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.risqueResiduels && comp.risqueResiduels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
