import { element, by, ElementFinder } from 'protractor';

export class RisqueAnalyseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-risque-analyse div table .btn-danger'));
  title = element.all(by.css('jhi-risque-analyse div h2#page-heading span')).first();
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

export class RisqueAnalyseUpdatePage {
  pageTitle = element(by.id('jhi-risque-analyse-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  risqueCauseInput = element(by.id('field_risqueCause'));
  typeCauseInput = element(by.id('field_typeCause'));
  risqueConsInput = element(by.id('field_risqueCons'));
  descriptionInput = element(by.id('field_description'));

  risqueSelect = element(by.id('field_risque'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRisqueCauseInput(risqueCause: string): Promise<void> {
    await this.risqueCauseInput.sendKeys(risqueCause);
  }

  async getRisqueCauseInput(): Promise<string> {
    return await this.risqueCauseInput.getAttribute('value');
  }

  async setTypeCauseInput(typeCause: string): Promise<void> {
    await this.typeCauseInput.sendKeys(typeCause);
  }

  async getTypeCauseInput(): Promise<string> {
    return await this.typeCauseInput.getAttribute('value');
  }

  async setRisqueConsInput(risqueCons: string): Promise<void> {
    await this.risqueConsInput.sendKeys(risqueCons);
  }

  async getRisqueConsInput(): Promise<string> {
    return await this.risqueConsInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async risqueSelectLastOption(): Promise<void> {
    await this.risqueSelect.all(by.tagName('option')).last().click();
  }

  async risqueSelectOption(option: string): Promise<void> {
    await this.risqueSelect.sendKeys(option);
  }

  getRisqueSelect(): ElementFinder {
    return this.risqueSelect;
  }

  async getRisqueSelectedOption(): Promise<string> {
    return await this.risqueSelect.element(by.css('option:checked')).getText();
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

export class RisqueAnalyseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-risqueAnalyse-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-risqueAnalyse'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
