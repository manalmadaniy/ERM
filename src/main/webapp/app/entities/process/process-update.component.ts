import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProcess, Process } from 'app/shared/model/process.model';
import { ProcessService } from './process.service';
import { IRisque } from 'app/shared/model/risque.model';
import { RisqueService } from 'app/entities/risque/risque.service';

@Component({
  selector: 'jhi-process-update',
  templateUrl: './process-update.component.html',
})
export class ProcessUpdateComponent implements OnInit {
  isSaving = false;
  risques: IRisque[] = [];

  editForm = this.fb.group({
    id: [],
    nameProcess: [],
    fonction: [],
    description: [],
    date: [],
    risques: [],
  });

  constructor(
    protected processService: ProcessService,
    protected risqueService: RisqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ process }) => {
      this.updateForm(process);

      this.risqueService.query().subscribe((res: HttpResponse<IRisque[]>) => (this.risques = res.body || []));
    });
  }

  updateForm(process: IProcess): void {
    this.editForm.patchValue({
      id: process.id,
      nameProcess: process.nameProcess,
      fonction: process.fonction,
      description: process.description,
      date: process.date,
      risques: process.risques,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const process = this.createFromForm();
    if (process.id !== undefined) {
      this.subscribeToSaveResponse(this.processService.update(process));
    } else {
      this.subscribeToSaveResponse(this.processService.create(process));
    }
  }

  private createFromForm(): IProcess {
    return {
      ...new Process(),
      id: this.editForm.get(['id'])!.value,
      nameProcess: this.editForm.get(['nameProcess'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      description: this.editForm.get(['description'])!.value,
      date: this.editForm.get(['date'])!.value,
      risques: this.editForm.get(['risques'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcess>>): void {
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

  getSelected(selectedVals: IRisque[], option: IRisque): IRisque {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
