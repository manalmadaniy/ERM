import { element, by, ElementFinder } from 'protractor';

export class ProcessComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-process div table .btn-danger'));
  title = element.all(by.css('jhi-process div h2#page-heading span')).first();
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

export class ProcessUpdatePage {
  pageTitle = element(by.id('jhi-process-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameProcessInput = element(by.id('field_nameProcess'));
  fonctionInput = element(by.id('field_fonction'));
  descriptionInput = element(by.id('field_description'));
  dateInput = element(by.id('field_date'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameProcessInput(nameProcess: string): Promise<void> {
    await this.nameProcessInput.sendKeys(nameProcess);
  }

  async getNameProcessInput(): Promise<string> {
    return await this.nameProcessInput.getAttribute('value');
  }

  async setFonctionInput(fonction: string): Promise<void> {
    await this.fonctionInput.sendKeys(fonction);
  }

  async getFonctionInput(): Promise<string> {
    return await this.fonctionInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
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

export class ProcessDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-process-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-process'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
