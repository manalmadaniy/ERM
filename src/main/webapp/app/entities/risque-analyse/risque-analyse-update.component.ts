import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRisqueAnalyse, RisqueAnalyse } from 'app/shared/model/risque-analyse.model';
import { RisqueAnalyseService } from './risque-analyse.service';
import { IRisque } from 'app/shared/model/risque.model';
import { RisqueService } from 'app/entities/risque/risque.service';

@Component({
  selector: 'jhi-risque-analyse-update',
  templateUrl: './risque-analyse-update.component.html',
})
export class RisqueAnalyseUpdateComponent implements OnInit {
  isSaving = false;
  risques: IRisque[] = [];

  editForm = this.fb.group({
    id: [],
    risqueCause: [],
    typeCause: [],
    risqueCons: [],
    description: [],
    risque: [],
  });

  constructor(
    protected risqueAnalyseService: RisqueAnalyseService,
    protected risqueService: RisqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risqueAnalyse }) => {
      this.updateForm(risqueAnalyse);

      this.risqueService.query().subscribe((res: HttpResponse<IRisque[]>) => (this.risques = res.body || []));
    });
  }

  updateForm(risqueAnalyse: IRisqueAnalyse): void {
    this.editForm.patchValue({
      id: risqueAnalyse.id,
      risqueCause: risqueAnalyse.risqueCause,
      typeCause: risqueAnalyse.typeCause,
      risqueCons: risqueAnalyse.risqueCons,
      description: risqueAnalyse.description,
      risque: risqueAnalyse.risque,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const risqueAnalyse = this.createFromForm();
    if (risqueAnalyse.id !== undefined) {
      this.subscribeToSaveResponse(this.risqueAnalyseService.update(risqueAnalyse));
    } else {
      this.subscribeToSaveResponse(this.risqueAnalyseService.create(risqueAnalyse));
    }
  }

  private createFromForm(): IRisqueAnalyse {
    return {
      ...new RisqueAnalyse(),
      id: this.editForm.get(['id'])!.value,
      risqueCause: this.editForm.get(['risqueCause'])!.value,
      typeCause: this.editForm.get(['typeCause'])!.value,
      risqueCons: this.editForm.get(['risqueCons'])!.value,
      description: this.editForm.get(['description'])!.value,
      risque: this.editForm.get(['risque'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRisqueAnalyse>>): void {
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
