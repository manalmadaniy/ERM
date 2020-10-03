import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRisqueResiduel, RisqueResiduel } from 'app/shared/model/risque-residuel.model';
import { RisqueResiduelService } from './risque-residuel.service';
import { IRisque } from 'app/shared/model/risque.model';
import { RisqueService } from 'app/entities/risque/risque.service';

@Component({
  selector: 'jhi-risque-residuel-update',
  templateUrl: './risque-residuel-update.component.html',
})
export class RisqueResiduelUpdateComponent implements OnInit {
  isSaving = false;
  risques: IRisque[] = [];

  editForm = this.fb.group({
    id: [],
    impact: [],
    probabilite: [],
    detection: [],
    risque: [],
  });

  constructor(
    protected risqueResiduelService: RisqueResiduelService,
    protected risqueService: RisqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risqueResiduel }) => {
      this.updateForm(risqueResiduel);

      this.risqueService
        .query({ filter: 'rr-is-null' })
        .pipe(
          map((res: HttpResponse<IRisque[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRisque[]) => {
          if (!risqueResiduel.risque || !risqueResiduel.risque.id) {
            this.risques = resBody;
          } else {
            this.risqueService
              .find(risqueResiduel.risque.id)
              .pipe(
                map((subRes: HttpResponse<IRisque>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRisque[]) => (this.risques = concatRes));
          }
        });
    });
  }

  updateForm(risqueResiduel: IRisqueResiduel): void {
    this.editForm.patchValue({
      id: risqueResiduel.id,
      impact: risqueResiduel.impact,
      probabilite: risqueResiduel.probabilite,
      detection: risqueResiduel.detection,
      risque: risqueResiduel.risque,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const risqueResiduel = this.createFromForm();
    if (risqueResiduel.id !== undefined) {
      this.subscribeToSaveResponse(this.risqueResiduelService.update(risqueResiduel));
    } else {
      this.subscribeToSaveResponse(this.risqueResiduelService.create(risqueResiduel));
    }
  }

  private createFromForm(): IRisqueResiduel {
    return {
      ...new RisqueResiduel(),
      id: this.editForm.get(['id'])!.value,
      impact: this.editForm.get(['impact'])!.value,
      probabilite: this.editForm.get(['probabilite'])!.value,
      detection: this.editForm.get(['detection'])!.value,
      risque: this.editForm.get(['risque'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRisqueResiduel>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IRisque): any {
    return item.id;
  }
}
