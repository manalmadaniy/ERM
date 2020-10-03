import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KompliansTestModule } from '../../../test.module';
import { RisqueAnalyseComponent } from 'app/entities/risque-analyse/risque-analyse.component';
import { RisqueAnalyseService } from 'app/entities/risque-analyse/risque-analyse.service';
import { RisqueAnalyse } from 'app/shared/model/risque-analyse.model';

describe('Component Tests', () => {
  describe('RisqueAnalyse Management Component', () => {
    let comp: RisqueAnalyseComponent;
    let fixture: ComponentFixture<RisqueAnalyseComponent>;
    let service: RisqueAnalyseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueAnalyseComponent],
      })
        .overrideTemplate(RisqueAnalyseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RisqueAnalyseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RisqueAnalyseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RisqueAnalyse(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.risqueAnalyses && comp.risqueAnalyses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
