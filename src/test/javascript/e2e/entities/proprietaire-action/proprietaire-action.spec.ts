import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProprietaireActionComponentsPage,
  ProprietaireActionDeleteDialog,
  ProprietaireActionUpdatePage,
} from './proprietaire-action.page-object';

const expect = chai.expect;

describe('ProprietaireAction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proprietaireActionComponentsPage: ProprietaireActionComponentsPage;
  let proprietaireActionUpdatePage: ProprietaireActionUpdatePage;
  let proprietaireActionDeleteDialog: ProprietaireActionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProprietaireActions', async () => {
    await navBarPage.goToEntity('proprietaire-action');
    proprietaireActionComponentsPage = new ProprietaireActionComponentsPage();
    await browser.wait(ec.visibilityOf(proprietaireActionComponentsPage.title), 5000);
    expect(await proprietaireActionComponentsPage.getTitle()).to.eq('kompliansApp.proprietaireAction.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(proprietaireActionComponentsPage.entities), ec.visibilityOf(proprietaireActionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProprietaireAction page', async () => {
    await proprietaireActionComponentsPage.clickOnCreateButton();
    proprietaireActionUpdatePage = new ProprietaireActionUpdatePage();
    expect(await proprietaireActionUpdatePage.getPageTitle()).to.eq('kompliansApp.proprietaireAction.home.createOrEditLabel');
    await proprietaireActionUpdatePage.cancel();
  });

  it('should create and save ProprietaireActions', async () => {
    const nbButtonsBeforeCreate = await proprietaireActionComponentsPage.countDeleteButtons();

    await proprietaireActionComponentsPage.clickOnCreateButton();

    await promise.all([
      proprietaireActionUpdatePage.setNomInput('nom'),
      proprietaireActionUpdatePage.setPrenomInput('prenom'),
      proprietaireActionUpdatePage.setEmailInput('email'),
      // proprietaireActionUpdatePage.risqueactionSelectLastOption(),
    ]);

    expect(await proprietaireActionUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await proprietaireActionUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await proprietaireActionUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');

    await proprietaireActionUpdatePage.save();
    expect(await proprietaireActionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await proprietaireActionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProprietaireAction', async () => {
    const nbButtonsBeforeDelete = await proprietaireActionComponentsPage.countDeleteButtons();
    await proprietaireActionComponentsPage.clickOnLastDeleteButton();

    proprietaireActionDeleteDialog = new ProprietaireActionDeleteDialog();
    expect(await proprietaireActionDeleteDialog.getDialogTitle()).to.eq('kompliansApp.proprietaireAction.delete.question');
    await proprietaireActionDeleteDialog.clickOnConfirmButton();

    expect(await proprietaireActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
