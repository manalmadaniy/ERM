import { element, by, ElementFinder } from 'protractor';

export class ProprietaireActionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-proprietaire-action div table .btn-danger'));
  title = element.all(by.css('jhi-proprietaire-action div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ProprietaireActionUpdatePage {
  pageTitle = element(by.id('jhi-proprietaire-action-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  prenomInput = element(by.id('field_prenom'));
  emailInput = element(by.id('field_email'));

  risqueactionSelect = element(by.id('field_risqueaction'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async risqueactionSelectLastOption(): Promise<void> {
    await this.risqueactionSelect.all(by.tagName('option')).last().click();
  }

  async risqueactionSelectOption(option: string): Promise<void> {
    await this.risqueactionSelect.sendKeys(option);
  }

  getRisqueactionSelect(): ElementFinder {
    return this.risqueactionSelect;
  }

  async getRisqueactionSelectedOption(): Promise<string> {
    return await this.risqueactionSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProprietaireActionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-proprietaireAction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-proprietaireAction'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
