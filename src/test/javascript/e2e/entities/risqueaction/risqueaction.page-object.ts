import { element, by, ElementFinder } from 'protractor';

export class RisqueactionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-risqueaction div table .btn-danger'));
  title = element.all(by.css('jhi-risqueaction div h2#page-heading span')).first();
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

export class RisqueactionUpdatePage {
  pageTitle = element(by.id('jhi-risqueaction-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  actionInput = element(by.id('field_action'));
  planactionInput = element(by.id('field_planaction'));
  tempsActionInput = element(by.id('field_tempsAction'));
  coutActionInput = element(by.id('field_coutAction'));

  risqueSelect = element(by.id('field_risque'));
  proprietaireActionSelect = element(by.id('field_proprietaireAction'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setActionInput(action: string): Promise<void> {
    await this.actionInput.sendKeys(action);
  }

  async getActionInput(): Promise<string> {
    return await this.actionInput.getAttribute('value');
  }

  async setPlanactionInput(planaction: string): Promise<void> {
    await this.planactionInput.sendKeys(planaction);
  }

  async getPlanactionInput(): Promise<string> {
    return await this.planactionInput.getAttribute('value');
  }

  async setTempsActionInput(tempsAction: string): Promise<void> {
    await this.tempsActionInput.sendKeys(tempsAction);
  }

  async getTempsActionInput(): Promise<string> {
    return await this.tempsActionInput.getAttribute('value');
  }

  async setCoutActionInput(coutAction: string): Promise<void> {
    await this.coutActionInput.sendKeys(coutAction);
  }

  async getCoutActionInput(): Promise<string> {
    return await this.coutActionInput.getAttribute('value');
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

  async proprietaireActionSelectLastOption(): Promise<void> {
    await this.proprietaireActionSelect.all(by.tagName('option')).last().click();
  }

  async proprietaireActionSelectOption(option: string): Promise<void> {
    await this.proprietaireActionSelect.sendKeys(option);
  }

  getProprietaireActionSelect(): ElementFinder {
    return this.proprietaireActionSelect;
  }

  async getProprietaireActionSelectedOption(): Promise<string> {
    return await this.proprietaireActionSelect.element(by.css('option:checked')).getText();
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

export class RisqueactionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-risqueaction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-risqueaction'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
