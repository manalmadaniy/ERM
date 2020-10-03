import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { ProprietaireActionUpdateComponent } from 'app/entities/proprietaire-action/proprietaire-action-update.component';
import { ProprietaireActionService } from 'app/entities/proprietaire-action/proprietaire-action.service';
import { ProprietaireAction } from 'app/shared/model/proprietaire-action.model';

describe('Component Tests', () => {
  describe('ProprietaireAction Management Update Component', () => {
    let comp: ProprietaireActionUpdateComponent;
    let fixture: ComponentFixture<ProprietaireActionUpdateComponent>;
    let service: ProprietaireActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [ProprietaireActionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProprietaireActionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProprietaireActionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProprietaireActionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProprietaireAction(123);
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
        const entity = new ProprietaireAction();
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
