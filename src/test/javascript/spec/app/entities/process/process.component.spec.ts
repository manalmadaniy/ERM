import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KompliansTestModule } from '../../../test.module';
import { ProcessComponent } from 'app/entities/process/process.component';
import { ProcessService } from 'app/entities/process/process.service';
import { Process } from 'app/shared/model/process.model';

describe('Component Tests', () => {
  describe('Process Management Component', () => {
    let comp: ProcessComponent;
    let fixture: ComponentFixture<ProcessComponent>;
    let service: ProcessService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [ProcessComponent],
      })
        .overrideTemplate(ProcessComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcessComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Process(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.processes && comp.processes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
