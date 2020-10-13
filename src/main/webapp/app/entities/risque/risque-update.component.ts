import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRisque, Risque } from 'app/shared/model/risque.model';
import { RisqueService } from './risque.service';
import { IProcess } from 'app/shared/model/process.model';
import { ProcessService } from 'app/entities/process/process.service';

@Component({
  selector: 'jhi-risque-update',
  templateUrl: './risque-update.component.html',
})
export class RisqueUpdateComponent implements OnInit {
  isSaving = false;
  processes: IProcess[] = [];

  editForm = this.fb.group({
    id: [],
    risquenom: [],
    descrisque: [],
    impact: [],
    probability: [],
    detection: [],
    process: [],
  });

  constructor(
    protected risqueService: RisqueService,
    protected processService: ProcessService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ risque }) => {
      this.updateForm(risque);

      this.processService.query().subscribe((res: HttpResponse<IProcess[]>) => (this.processes = res.body || []));
    });
  }

  updateForm(risque: IRisque): void {
    this.editForm.patchValue({
      id: risque.id,
      risquenom: risque.risquenom,
      descrisque: risque.descrisque,
      impact: risque.impact,
      probability: risque.probability,
      detection: risque.detection,
      process: risque.process,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const risque = this.createFromForm();
    if (risque.id !== undefined) {
      this.subscribeToSaveResponse(this.risqueService.update(risque));
    } else {
      this.subscribeToSaveResponse(this.risqueService.create(risque));
    }
  }

  private createFromForm(): IRisque {
    return {
      ...new Risque(),
      id: this.editForm.get(['id'])!.value,
      risquenom: this.editForm.get(['risquenom'])!.value,
      descrisque: this.editForm.get(['descrisque'])!.value,
      impact: this.editForm.get(['impact'])!.value,
      probability: this.editForm.get(['probability'])!.value,
      detection: this.editForm.get(['detection'])!.value,
      process: this.editForm.get(['process'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRisque>>): void {
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

  trackById(index: number, item: IProcess): any {
    return item.id;
  }
}
