import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueResiduelUpdateComponent } from 'app/entities/risque-residuel/risque-residuel-update.component';
import { RisqueResiduelService } from 'app/entities/risque-residuel/risque-residuel.service';
import { RisqueResiduel } from 'app/shared/model/risque-residuel.model';

describe('Component Tests', () => {
  describe('RisqueResiduel Management Update Component', () => {
    let comp: RisqueResiduelUpdateComponent;
    let fixture: ComponentFixture<RisqueResiduelUpdateComponent>;
    let service: RisqueResiduelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueResiduelUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RisqueResiduelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RisqueResiduelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RisqueResiduelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RisqueResiduel(123);
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
        const entity = new RisqueResiduel();
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
