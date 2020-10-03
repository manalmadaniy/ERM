import { element, by, ElementFinder } from 'protractor';

export class RisqueResiduelComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-risque-residuel div table .btn-danger'));
  title = element.all(by.css('jhi-risque-residuel div h2#page-heading span')).first();
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

export class RisqueResiduelUpdatePage {
  pageTitle = element(by.id('jhi-risque-residuel-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  impactInput = element(by.id('field_impact'));
  probabiliteInput = element(by.id('field_probabilite'));
  detectionInput = element(by.id('field_detection'));

  risqueSelect = element(by.id('field_risque'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setImpactInput(impact: string): Promise<void> {
    await this.impactInput.sendKeys(impact);
  }

  async getImpactInput(): Promise<string> {
    return await this.impactInput.getAttribute('value');
  }

  async setProbabiliteInput(probabilite: string): Promise<void> {
    await this.probabiliteInput.sendKeys(probabilite);
  }

  async getProbabiliteInput(): Promise<string> {
    return await this.probabiliteInput.getAttribute('value');
  }

  async setDetectionInput(detection: string): Promise<void> {
    await this.detectionInput.sendKeys(detection);
  }

  async getDetectionInput(): Promise<string> {
    return await this.detectionInput.getAttribute('value');
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

export class RisqueResiduelDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-risqueResiduel-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-risqueResiduel'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
