import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProcessComponentsPage, ProcessDeleteDialog, ProcessUpdatePage } from './process.page-object';

const expect = chai.expect;

describe('Process e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let processComponentsPage: ProcessComponentsPage;
  let processUpdatePage: ProcessUpdatePage;
  let processDeleteDialog: ProcessDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Processes', async () => {
    await navBarPage.goToEntity('process');
    processComponentsPage = new ProcessComponentsPage();
    await browser.wait(ec.visibilityOf(processComponentsPage.title), 5000);
    expect(await processComponentsPage.getTitle()).to.eq('kompliansApp.process.home.title');
    await browser.wait(ec.or(ec.visibilityOf(processComponentsPage.entities), ec.visibilityOf(processComponentsPage.noResult)), 1000);
  });

  it('should load create Process page', async () => {
    await processComponentsPage.clickOnCreateButton();
    processUpdatePage = new ProcessUpdatePage();
    expect(await processUpdatePage.getPageTitle()).to.eq('kompliansApp.process.home.createOrEditLabel');
    await processUpdatePage.cancel();
  });

  it('should create and save Processes', async () => {
    const nbButtonsBeforeCreate = await processComponentsPage.countDeleteButtons();

    await processComponentsPage.clickOnCreateButton();

    await promise.all([
      processUpdatePage.setNameProcessInput('nameProcess'),
      processUpdatePage.setFonctionInput('fonction'),
      processUpdatePage.setDescriptionInput('description'),
      processUpdatePage.setDateInput('date'),
      // processUpdatePage.risqueSelectLastOption(),
    ]);

    expect(await processUpdatePage.getNameProcessInput()).to.eq('nameProcess', 'Expected NameProcess value to be equals to nameProcess');
    expect(await processUpdatePage.getFonctionInput()).to.eq('fonction', 'Expected Fonction value to be equals to fonction');
    expect(await processUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await processUpdatePage.getDateInput()).to.eq('date', 'Expected Date value to be equals to date');

    await processUpdatePage.save();
    expect(await processUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await processComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Process', async () => {
    const nbButtonsBeforeDelete = await processComponentsPage.countDeleteButtons();
    await processComponentsPage.clickOnLastDeleteButton();

    processDeleteDialog = new ProcessDeleteDialog();
    expect(await processDeleteDialog.getDialogTitle()).to.eq('kompliansApp.process.delete.question');
    await processDeleteDialog.clickOnConfirmButton();

    expect(await processComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
