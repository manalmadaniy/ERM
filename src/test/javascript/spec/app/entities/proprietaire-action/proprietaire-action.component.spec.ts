import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KompliansTestModule } from '../../../test.module';
import { ProprietaireActionComponent } from 'app/entities/proprietaire-action/proprietaire-action.component';
import { ProprietaireActionService } from 'app/entities/proprietaire-action/proprietaire-action.service';
import { ProprietaireAction } from 'app/shared/model/proprietaire-action.model';

describe('Component Tests', () => {
  describe('ProprietaireAction Management Component', () => {
    let comp: ProprietaireActionComponent;
    let fixture: ComponentFixture<ProprietaireActionComponent>;
    let service: ProprietaireActionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [ProprietaireActionComponent],
      })
        .overrideTemplate(ProprietaireActionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProprietaireActionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProprietaireActionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProprietaireAction(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.proprietaireActions && comp.proprietaireActions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
