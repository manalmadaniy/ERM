import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  RisqueResiduelComponentsPage,
  /* RisqueResiduelDeleteDialog, */
  RisqueResiduelUpdatePage,
} from './risque-residuel.page-object';

const expect = chai.expect;

describe('RisqueResiduel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let risqueResiduelComponentsPage: RisqueResiduelComponentsPage;
  let risqueResiduelUpdatePage: RisqueResiduelUpdatePage;
  /* let risqueResiduelDeleteDialog: RisqueResiduelDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RisqueResiduels', async () => {
    await navBarPage.goToEntity('risque-residuel');
    risqueResiduelComponentsPage = new RisqueResiduelComponentsPage();
    await browser.wait(ec.visibilityOf(risqueResiduelComponentsPage.title), 5000);
    expect(await risqueResiduelComponentsPage.getTitle()).to.eq('kompliansApp.risqueResiduel.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(risqueResiduelComponentsPage.entities), ec.visibilityOf(risqueResiduelComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RisqueResiduel page', async () => {
    await risqueResiduelComponentsPage.clickOnCreateButton();
    risqueResiduelUpdatePage = new RisqueResiduelUpdatePage();
    expect(await risqueResiduelUpdatePage.getPageTitle()).to.eq('kompliansApp.risqueResiduel.home.createOrEditLabel');
    await risqueResiduelUpdatePage.cancel();
  });

  /* it('should create and save RisqueResiduels', async () => {
        const nbButtonsBeforeCreate = await risqueResiduelComponentsPage.countDeleteButtons();

        await risqueResiduelComponentsPage.clickOnCreateButton();

        await promise.all([
            risqueResiduelUpdatePage.setImpactInput('5'),
            risqueResiduelUpdatePage.setProbabiliteInput('5'),
            risqueResiduelUpdatePage.setDetectionInput('5'),
            risqueResiduelUpdatePage.risqueSelectLastOption(),
        ]);

        expect(await risqueResiduelUpdatePage.getImpactInput()).to.eq('5', 'Expected impact value to be equals to 5');
        expect(await risqueResiduelUpdatePage.getProbabiliteInput()).to.eq('5', 'Expected probabilite value to be equals to 5');
        expect(await risqueResiduelUpdatePage.getDetectionInput()).to.eq('5', 'Expected detection value to be equals to 5');

        await risqueResiduelUpdatePage.save();
        expect(await risqueResiduelUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await risqueResiduelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last RisqueResiduel', async () => {
        const nbButtonsBeforeDelete = await risqueResiduelComponentsPage.countDeleteButtons();
        await risqueResiduelComponentsPage.clickOnLastDeleteButton();

        risqueResiduelDeleteDialog = new RisqueResiduelDeleteDialog();
        expect(await risqueResiduelDeleteDialog.getDialogTitle())
            .to.eq('kompliansApp.risqueResiduel.delete.question');
        await risqueResiduelDeleteDialog.clickOnConfirmButton();

        expect(await risqueResiduelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
