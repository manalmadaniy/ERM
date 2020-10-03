import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { RisqueAnalyseUpdateComponent } from 'app/entities/risque-analyse/risque-analyse-update.component';
import { RisqueAnalyseService } from 'app/entities/risque-analyse/risque-analyse.service';
import { RisqueAnalyse } from 'app/shared/model/risque-analyse.model';

describe('Component Tests', () => {
  describe('RisqueAnalyse Management Update Component', () => {
    let comp: RisqueAnalyseUpdateComponent;
    let fixture: ComponentFixture<RisqueAnalyseUpdateComponent>;
    let service: RisqueAnalyseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [RisqueAnalyseUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RisqueAnalyseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RisqueAnalyseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RisqueAnalyseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RisqueAnalyse(123);
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
        const entity = new RisqueAnalyse();
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
