import { Actions } from "../helpers/actions"

class CreatePasswordPage {
  get createPassHeader() { return $('h1') }
  get createPasswordH3() { return $('h3') }
  get paswwordLabel() { return $('[for="new_password"]') }
  get passwordInput() { return $('[name="new_password"]') }
  get confirmPassLabl() { return $('[for="confirmed_password"]') }
  get confPasswordInput() { return $('[name="confirmed_password"]') }
  get submitButton() { return $('[type="submit"]') }
  get newPasswordAlert() { return $('#new_password-note') }
  get confirmedPasswordAlert() { return $('#confirmed_password-note') }
  get showNewPassBtn() { return $('[aria-controls="new_password"]') }

  async clickCreateAccountButton() {
    Actions.waitAndClick(this.submitButton);
  }

  async enterTextInFocusedInput(element, text) {
    await Actions.waitAndClick(element);
    await element.isFocused();
    await element.addValue(text);
  }

  async clickShowPasswordByLocator(element) {
    Actions.waitAndClick(element);
  }

  async checkPasswordToHaveValue(element, text) {
    const password = await element.getValue();
    await expect(password).toEqual(text);
  }
}

export default new CreatePasswordPage();