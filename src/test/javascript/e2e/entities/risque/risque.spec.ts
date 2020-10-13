import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RisqueComponentsPage, RisqueDeleteDialog, RisqueUpdatePage } from './risque.page-object';

const expect = chai.expect;

describe('Risque e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let risqueComponentsPage: RisqueComponentsPage;
  let risqueUpdatePage: RisqueUpdatePage;
  let risqueDeleteDialog: RisqueDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Risques', async () => {
    await navBarPage.goToEntity('risque');
    risqueComponentsPage = new RisqueComponentsPage();
    await browser.wait(ec.visibilityOf(risqueComponentsPage.title), 5000);
    expect(await risqueComponentsPage.getTitle()).to.eq('kompliansApp.risque.home.title');
    await browser.wait(ec.or(ec.visibilityOf(risqueComponentsPage.entities), ec.visibilityOf(risqueComponentsPage.noResult)), 1000);
  });

  it('should load create Risque page', async () => {
    await risqueComponentsPage.clickOnCreateButton();
    risqueUpdatePage = new RisqueUpdatePage();
    expect(await risqueUpdatePage.getPageTitle()).to.eq('kompliansApp.risque.home.createOrEditLabel');
    await risqueUpdatePage.cancel();
  });

  it('should create and save Risques', async () => {
    const nbButtonsBeforeCreate = await risqueComponentsPage.countDeleteButtons();

    await risqueComponentsPage.clickOnCreateButton();

    await promise.all([
      risqueUpdatePage.setRisquenomInput('risquenom'),
      risqueUpdatePage.setDescrisqueInput('descrisque'),
      risqueUpdatePage.setImpactInput('5'),
      risqueUpdatePage.setProbabilityInput('5'),
      risqueUpdatePage.setDetectionInput('5'),
      risqueUpdatePage.processSelectLastOption(),
    ]);

    expect(await risqueUpdatePage.getRisquenomInput()).to.eq('risquenom', 'Expected Risquenom value to be equals to risquenom');
    expect(await risqueUpdatePage.getDescrisqueInput()).to.eq('descrisque', 'Expected Descrisque value to be equals to descrisque');
    expect(await risqueUpdatePage.getImpactInput()).to.eq('5', 'Expected impact value to be equals to 5');
    expect(await risqueUpdatePage.getProbabilityInput()).to.eq('5', 'Expected probability value to be equals to 5');
    expect(await risqueUpdatePage.getDetectionInput()).to.eq('5', 'Expected detection value to be equals to 5');

    await risqueUpdatePage.save();
    expect(await risqueUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await risqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Risque', async () => {
    const nbButtonsBeforeDelete = await risqueComponentsPage.countDeleteButtons();
    await risqueComponentsPage.clickOnLastDeleteButton();

    risqueDeleteDialog = new RisqueDeleteDialog();
    expect(await risqueDeleteDialog.getDialogTitle()).to.eq('kompliansApp.risque.delete.question');
    await risqueDeleteDialog.clickOnConfirmButton();

    expect(await risqueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
