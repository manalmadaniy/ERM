import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRisqueaction, Risqueaction } from 'app/shared/model/risqueaction.model';
import { RisqueactionService } from './risqueaction.service';
import { IRisque } from 'app/shared/model/risque.model';
import { RisqueService } from 'app/entities/risque/risque.service';

@Component({
  selector: 'jhi-risqueaction-update',
  templateUrl: './risqueaction-update.component.html',
})
export class RisqueactionUpdateComponent implements OnInit {
  isSaving = false;
  risques: IRisque[] = [];

  editForm = this.fb.group({
    id: [],
    action: [],
    planaction: [],
    tempsAction: [],
    coutAction: [],
    risque: [],
  });

  constructor(
    protected risqueactionService: RisqueactionService,
    protected risqueService: RisqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risqueaction }) => {
      this.updateForm(risqueaction);

      this.risqueService.query().subscribe((res: HttpResponse<IRisque[]>) => (this.risques = res.body || []));
    });
  }

  updateForm(risqueaction: IRisqueaction): void {
    this.editForm.patchValue({
      id: risqueaction.id,
      action: risqueaction.action,
      planaction: risqueaction.planaction,
      tempsAction: risqueaction.tempsAction,
      coutAction: risqueaction.coutAction,
      risque: risqueaction.risque,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const risqueaction = this.createFromForm();
    if (risqueaction.id !== undefined) {
      this.subscribeToSaveResponse(this.risqueactionService.update(risqueaction));
    } else {
      this.subscribeToSaveResponse(this.risqueactionService.create(risqueaction));
    }
  }

  private createFromForm(): IRisqueaction {
    return {
      ...new Risqueaction(),
      id: this.editForm.get(['id'])!.value,
      action: this.editForm.get(['action'])!.value,
      planaction: this.editForm.get(['planaction'])!.value,
      tempsAction: this.editForm.get(['tempsAction'])!.value,
      coutAction: this.editForm.get(['coutAction'])!.value,
      risque: this.editForm.get(['risque'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRisqueaction>>): void {
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
