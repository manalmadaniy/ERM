import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueactionUpdateComponent } from 'app/entities/risqueaction/risqueaction-update.component';
import { RisqueactionService } from 'app/entities/risqueaction/risqueaction.service';
import { Risqueaction } from 'app/shared/model/risqueaction.model';

describe('Component Tests', () => {
  describe('Risqueaction Management Update Component', () => {
    let comp: RisqueactionUpdateComponent;
    let fixture: ComponentFixture<RisqueactionUpdateComponent>;
    let service: RisqueactionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueactionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RisqueactionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RisqueactionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RisqueactionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Risqueaction(123);
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
        const entity = new Risqueaction();
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
