import { Assertions } from "../helpers/assertions";
import { MakeData } from "../helpers/makeData";
import { signInTestData } from "../helpers/signInTestData";
import createPasswordPage from "../pageobjects/createPassword.page";
import signInPage from "../pageobjects/signIn.page";

describe('Sign In page tests', () => {

  beforeEach(async () => {
    await browser.url('/');
    await Assertions.expectElementToHaveText(signInPage.signInHeader, signInTestData.signInHeader);
  });

  it('Check the presence of Sign In page elements', async () => {
    await Assertions.expectElementToHaveText(signInPage.emailLabel, signInTestData.emailAddressLabel);
    await Assertions.expectElementAttributeToEqual(signInPage.emailInput, 'placeholder', signInTestData.enterEmail);
    await Assertions.expectElementToHaveText(signInPage.continueWithEmailButton, signInTestData.continueButton);
  });

  it('Verify Sign in functionality with valid email', async () => {
    const userEmail = MakeData.getEmail();

    await signInPage.enterEmailAndClickContinue(userEmail);
    await Assertions.expectElementToHaveText(createPasswordPage.createPassHeader, 'Create password');
  });

  it('Verify Sign in functionality with incorrect email', async () => {
    await signInPage.enterEmailAndClickContinue(signInTestData.incorrectEmail);
    await Assertions.expectElementToHaveText(signInPage.emailAlert, signInTestData.incorrectEmailAlert);
  });

  it('Verify Sign in functionality with empty Email address input', async () => {
    await signInPage.clicContinueWithEmail();
    await Assertions.expectElementToHaveText(signInPage.emailAlert, signInTestData.emptyEmailAlert);
  });
});