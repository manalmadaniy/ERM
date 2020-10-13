import { element, by, ElementFinder } from 'protractor';

export class RisqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-risque div table .btn-danger'));
  title = element.all(by.css('jhi-risque div h2#page-heading span')).first();
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

export class RisqueUpdatePage {
  pageTitle = element(by.id('jhi-risque-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  risquenomInput = element(by.id('field_risquenom'));
  descrisqueInput = element(by.id('field_descrisque'));
  impactInput = element(by.id('field_impact'));
  probabilityInput = element(by.id('field_probability'));
  detectionInput = element(by.id('field_detection'));

  processSelect = element(by.id('field_process'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRisquenomInput(risquenom: string): Promise<void> {
    await this.risquenomInput.sendKeys(risquenom);
  }

  async getRisquenomInput(): Promise<string> {
    return await this.risquenomInput.getAttribute('value');
  }

  async setDescrisqueInput(descrisque: string): Promise<void> {
    await this.descrisqueInput.sendKeys(descrisque);
  }

  async getDescrisqueInput(): Promise<string> {
    return await this.descrisqueInput.getAttribute('value');
  }

  async setImpactInput(impact: string): Promise<void> {
    await this.impactInput.sendKeys(impact);
  }

  async getImpactInput(): Promise<string> {
    return await this.impactInput.getAttribute('value');
  }

  async setProbabilityInput(probability: string): Promise<void> {
    await this.probabilityInput.sendKeys(probability);
  }

  async getProbabilityInput(): Promise<string> {
    return await this.probabilityInput.getAttribute('value');
  }

  async setDetectionInput(detection: string): Promise<void> {
    await this.detectionInput.sendKeys(detection);
  }

  async getDetectionInput(): Promise<string> {
    return await this.detectionInput.getAttribute('value');
  }

  async processSelectLastOption(): Promise<void> {
    await this.processSelect.all(by.tagName('option')).last().click();
  }

  async processSelectOption(option: string): Promise<void> {
    await this.processSelect.sendKeys(option);
  }

  getProcessSelect(): ElementFinder {
    return this.processSelect;
  }

  async getProcessSelectedOption(): Promise<string> {
    return await this.processSelect.element(by.css('option:checked')).getText();
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

export class RisqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-risque-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-risque'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
