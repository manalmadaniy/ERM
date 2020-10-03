import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RisqueactionComponentsPage, RisqueactionDeleteDialog, RisqueactionUpdatePage } from './risqueaction.page-object';

const expect = chai.expect;

describe('Risqueaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let risqueactionComponentsPage: RisqueactionComponentsPage;
  let risqueactionUpdatePage: RisqueactionUpdatePage;
  let risqueactionDeleteDialog: RisqueactionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Risqueactions', async () => {
    await navBarPage.goToEntity('risqueaction');
    risqueactionComponentsPage = new RisqueactionComponentsPage();
    await browser.wait(ec.visibilityOf(risqueactionComponentsPage.title), 5000);
    expect(await risqueactionComponentsPage.getTitle()).to.eq('kompliansApp.risqueaction.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(risqueactionComponentsPage.entities), ec.visibilityOf(risqueactionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Risqueaction page', async () => {
    await risqueactionComponentsPage.clickOnCreateButton();
    risqueactionUpdatePage = new RisqueactionUpdatePage();
    expect(await risqueactionUpdatePage.getPageTitle()).to.eq('kompliansApp.risqueaction.home.createOrEditLabel');
    await risqueactionUpdatePage.cancel();
  });

  it('should create and save Risqueactions', async () => {
    const nbButtonsBeforeCreate = await risqueactionComponentsPage.countDeleteButtons();

    await risqueactionComponentsPage.clickOnCreateButton();

    await promise.all([
      risqueactionUpdatePage.setActionInput('action'),
      risqueactionUpdatePage.setPlanactionInput('planaction'),
      risqueactionUpdatePage.setTempsActionInput('5'),
      risqueactionUpdatePage.setCoutActionInput('5'),
      risqueactionUpdatePage.risqueSelectLastOption(),
    ]);

    expect(await risqueactionUpdatePage.getActionInput()).to.eq('action', 'Expected Action value to be equals to action');
    expect(await risqueactionUpdatePage.getPlanactionInput()).to.eq('planaction', 'Expected Planaction value to be equals to planaction');
    expect(await risqueactionUpdatePage.getTempsActionInput()).to.eq('5', 'Expected tempsAction value to be equals to 5');
    expect(await risqueactionUpdatePage.getCoutActionInput()).to.eq('5', 'Expected coutAction value to be equals to 5');

    await risqueactionUpdatePage.save();
    expect(await risqueactionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await risqueactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Risqueaction', async () => {
    const nbButtonsBeforeDelete = await risqueactionComponentsPage.countDeleteButtons();
    await risqueactionComponentsPage.clickOnLastDeleteButton();

    risqueactionDeleteDialog = new RisqueactionDeleteDialog();
    expect(await risqueactionDeleteDialog.getDialogTitle()).to.eq('kompliansApp.risqueaction.delete.question');
    await risqueactionDeleteDialog.clickOnConfirmButton();

    expect(await risqueactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
