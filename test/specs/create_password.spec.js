import { Assertions } from "../helpers/assertions";
import { MakeData } from "../helpers/makeData";
import signInPage from "../pageobjects/signIn.page";
import createPasswordPage from "../pageobjects/createPassword.page";
import { createPasswordTestData } from "../helpers/createPasswordTestData";

describe('Create password page tests', () => {
  const password = MakeData.getValidPassword();

  beforeEach(async () => {
    const userEmail = MakeData.getEmail();

    await browser.url('/');
    await signInPage.enterEmailAndClickContinue(userEmail);
    await Assertions.expectElementToHaveText(createPasswordPage.createPassHeader, createPasswordTestData.createPasswordHeader);
  });

  it('Check the presence of Create password page elements', async () => {
    await Assertions.expectElementToHaveText(createPasswordPage.paswwordLabel, createPasswordTestData.passwordLabel);
    await Assertions.expectElementAttributeToEqual(createPasswordPage.passwordInput, 'placeholder', createPasswordTestData.enterPassword);
    await Assertions.expectElementToHaveText(createPasswordPage.confirmPassLabl, createPasswordTestData.confirmPaswordLabel);
    await Assertions.expectElementAttributeToEqual(createPasswordPage.confPasswordInput, 'placeholder', createPasswordTestData.confirmPassword);
    await Assertions.expectElementToHaveText(createPasswordPage.submitButton, createPasswordTestData.submitButton);
  });

  it('Verify Create password functionality with empty Password, Confirm password inputs', async () => {
    await createPasswordPage.clickCreateAccountButton();
    await Assertions.expectElementToHaveText(createPasswordPage.newPasswordAlert, createPasswordTestData.emptyNewPasswordAlert);
    await Assertions.expectElementToHaveText(createPasswordPage.confirmedPasswordAlert, createPasswordTestData.emptyConfirmPasswordAlert);
  });

  it('Verify Create password functionality with filled password and blank confirm password inputs', async () => {
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.passwordInput, password)
    await createPasswordPage.clickCreateAccountButton();
    await Assertions.expectElementToHaveText(createPasswordPage.confirmedPasswordAlert, createPasswordTestData.emptyConfirmPasswordAlert);
  });

  it('Verify Create password functionality with blank password and filled confirm password inputs', async () => {
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.confPasswordInput, password)
    await createPasswordPage.clickCreateAccountButton();
    await Assertions.expectElementToHaveText(createPasswordPage.newPasswordAlert, createPasswordTestData.emptyNewPasswordAlert);
    await Assertions.expectElementToHaveText(createPasswordPage.confirmedPasswordAlert, createPasswordTestData.notMatchedPasswords);
  });

  it('Verify Create password functionality with blank password and filled confirm password inputs', async () => {
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.passwordInput, createPasswordTestData.nineLettersPassword);
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.confPasswordInput, createPasswordTestData.nineLettersPassword);
    await createPasswordPage.clickCreateAccountButton();
    await Assertions.expectElementToHaveText(createPasswordPage.newPasswordAlert, createPasswordTestData.shortPasswordAlert);
  });

  it('Verify Create password functionality with password that consist only from numbers', async () => {
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.passwordInput, createPasswordTestData.numbersPassword);
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.confPasswordInput, createPasswordTestData.numbersPassword);
    await createPasswordPage.clickCreateAccountButton();
    await Assertions.expectElementToHaveText(createPasswordPage.newPasswordAlert, createPasswordTestData.passwordWithoutLettersAlert);
  });

  it('Verify Create password functionality with password that consists only of numbers and uppercase letters', async () => {
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.passwordInput, createPasswordTestData.passwordWithNumAndUpperCase);
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.confPasswordInput, createPasswordTestData.passwordWithNumAndUpperCase);
    await createPasswordPage.clickCreateAccountButton();
    await Assertions.expectElementToHaveText(createPasswordPage.newPasswordAlert, createPasswordTestData.passwordWithoutLowerCaseLettersAlert);
  });

  it('Verify Create password functionality with password that consists of numbers, lowercase and uppercase letters', async () => {
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.passwordInput, password);
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.confPasswordInput, password);
    await createPasswordPage.clickCreateAccountButton();
  });

  it('Verify show password functionality by clicking show password icon', async () => {
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.passwordInput, password);
    await createPasswordPage.enterTextInFocusedInput(createPasswordPage.confPasswordInput, password);
    await createPasswordPage.clickShowPasswordByLocator(createPasswordPage.showNewPassBtn);
    await createPasswordPage.checkPasswordToHaveValue(createPasswordPage.passwordInput, password);
  });
});