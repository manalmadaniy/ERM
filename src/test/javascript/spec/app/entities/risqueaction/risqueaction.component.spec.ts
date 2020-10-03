import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KompliansTestModule } from '../../../test.module';
import { RisqueactionComponent } from 'app/entities/risqueaction/risqueaction.component';
import { RisqueactionService } from 'app/entities/risqueaction/risqueaction.service';
import { Risqueaction } from 'app/shared/model/risqueaction.model';

describe('Component Tests', () => {
  describe('Risqueaction Management Component', () => {
    let comp: RisqueactionComponent;
    let fixture: ComponentFixture<RisqueactionComponent>;
    let service: RisqueactionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueactionComponent],
      })
        .overrideTemplate(RisqueactionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RisqueactionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RisqueactionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Risqueaction(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.risqueactions && comp.risqueactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
