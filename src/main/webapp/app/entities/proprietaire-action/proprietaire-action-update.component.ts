import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProprietaireAction, ProprietaireAction } from 'app/shared/model/proprietaire-action.model';
import { ProprietaireActionService } from './proprietaire-action.service';

@Component({
  selector: 'jhi-proprietaire-action-update',
  templateUrl: './proprietaire-action-update.component.html',
})
export class ProprietaireActionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [],
    prenom: [],
    email: [],
  });

  constructor(
    protected proprietaireActionService: ProprietaireActionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proprietaireAction }) => {
      this.updateForm(proprietaireAction);
    });
  }

  updateForm(proprietaireAction: IProprietaireAction): void {
    this.editForm.patchValue({
      id: proprietaireAction.id,
      nom: proprietaireAction.nom,
      prenom: proprietaireAction.prenom,
      email: proprietaireAction.email,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proprietaireAction = this.createFromForm();
    if (proprietaireAction.id !== undefined) {
      this.subscribeToSaveResponse(this.proprietaireActionService.update(proprietaireAction));
    } else {
      this.subscribeToSaveResponse(this.proprietaireActionService.create(proprietaireAction));
    }
  }

  private createFromForm(): IProprietaireAction {
    return {
      ...new ProprietaireAction(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      email: this.editForm.get(['email'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProprietaireAction>>): void {
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
}
