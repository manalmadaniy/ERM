import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RisqueAnalyseComponentsPage, RisqueAnalyseDeleteDialog, RisqueAnalyseUpdatePage } from './risque-analyse.page-object';

const expect = chai.expect;

describe('RisqueAnalyse e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let risqueAnalyseComponentsPage: RisqueAnalyseComponentsPage;
  let risqueAnalyseUpdatePage: RisqueAnalyseUpdatePage;
  let risqueAnalyseDeleteDialog: RisqueAnalyseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RisqueAnalyses', async () => {
    await navBarPage.goToEntity('risque-analyse');
    risqueAnalyseComponentsPage = new RisqueAnalyseComponentsPage();
    await browser.wait(ec.visibilityOf(risqueAnalyseComponentsPage.title), 5000);
    expect(await risqueAnalyseComponentsPage.getTitle()).to.eq('kompliansApp.risqueAnalyse.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(risqueAnalyseComponentsPage.entities), ec.visibilityOf(risqueAnalyseComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RisqueAnalyse page', async () => {
    await risqueAnalyseComponentsPage.clickOnCreateButton();
    risqueAnalyseUpdatePage = new RisqueAnalyseUpdatePage();
    expect(await risqueAnalyseUpdatePage.getPageTitle()).to.eq('kompliansApp.risqueAnalyse.home.createOrEditLabel');
    await risqueAnalyseUpdatePage.cancel();
  });

  it('should create and save RisqueAnalyses', async () => {
    const nbButtonsBeforeCreate = await risqueAnalyseComponentsPage.countDeleteButtons();

    await risqueAnalyseComponentsPage.clickOnCreateButton();

    await promise.all([
      risqueAnalyseUpdatePage.setRisqueCauseInput('risqueCause'),
      risqueAnalyseUpdatePage.setTypeCauseInput('typeCause'),
      risqueAnalyseUpdatePage.setRisqueConsInput('risqueCons'),
      risqueAnalyseUpdatePage.setDescriptionInput('description'),
      risqueAnalyseUpdatePage.risqueSelectLastOption(),
    ]);

    expect(await risqueAnalyseUpdatePage.getRisqueCauseInput()).to.eq(
      'risqueCause',
      'Expected RisqueCause value to be equals to risqueCause'
    );
    expect(await risqueAnalyseUpdatePage.getTypeCauseInput()).to.eq('typeCause', 'Expected TypeCause value to be equals to typeCause');
    expect(await risqueAnalyseUpdatePage.getRisqueConsInput()).to.eq('risqueCons', 'Expected RisqueCons value to be equals to risqueCons');
    expect(await risqueAnalyseUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await risqueAnalyseUpdatePage.save();
    expect(await risqueAnalyseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await risqueAnalyseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RisqueAnalyse', async () => {
    const nbButtonsBeforeDelete = await risqueAnalyseComponentsPage.countDeleteButtons();
    await risqueAnalyseComponentsPage.clickOnLastDeleteButton();

    risqueAnalyseDeleteDialog = new RisqueAnalyseDeleteDialog();
    expect(await risqueAnalyseDeleteDialog.getDialogTitle()).to.eq('kompliansApp.risqueAnalyse.delete.question');
    await risqueAnalyseDeleteDialog.clickOnConfirmButton();

    expect(await risqueAnalyseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
