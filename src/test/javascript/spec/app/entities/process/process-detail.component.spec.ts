import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KompliansTestModule } from '../../../test.module';
import { ProcessDetailComponent } from 'app/entities/process/process-detail.component';
import { Process } from 'app/shared/model/process.model';

describe('Component Tests', () => {
  describe('Process Management Detail Component', () => {
    let comp: ProcessDetailComponent;
    let fixture: ComponentFixture<ProcessDetailComponent>;
    const route = ({ data: of({ process: new Process(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KompliansTestModule],
        declarations: [ProcessDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProcessDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load process on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.process).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
