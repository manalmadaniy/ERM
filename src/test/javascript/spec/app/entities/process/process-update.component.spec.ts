import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { ProcessUpdateComponent } from 'app/entities/process/process-update.component';
import { ProcessService } from 'app/entities/process/process.service';
import { Process } from 'app/shared/model/process.model';

describe('Component Tests', () => {
  describe('Process Management Update Component', () => {
    let comp: ProcessUpdateComponent;
    let fixture: ComponentFixture<ProcessUpdateComponent>;
    let service: ProcessService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [ProcessUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProcessUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcessUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Process(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Process();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
