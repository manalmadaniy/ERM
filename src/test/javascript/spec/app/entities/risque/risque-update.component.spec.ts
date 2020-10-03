import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueUpdateComponent } from 'app/entities/risque/risque-update.component';
import { RisqueService } from 'app/entities/risque/risque.service';
import { Risque } from 'app/shared/model/risque.model';

describe('Component Tests', () => {
  describe('Risque Management Update Component', () => {
    let comp: RisqueUpdateComponent;
    let fixture: ComponentFixture<RisqueUpdateComponent>;
    let service: RisqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RisqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RisqueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RisqueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Risque(123);
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
        const entity = new Risque();
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
