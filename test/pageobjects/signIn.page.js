import { Actions } from "../helpers/actions"

class SignInPage {

  get signInHeader() { return $('h1') }
  get emailInput() { return $('[type="email"]') }
  get emailLabel() { return $('[for="username"]') }
  get continueWithEmailButton() { return $('[type="submit"]') }
  get emailAlert() { return $('#username-note') }

  async enterEmailAndClickContinue(email) {
    await this.emailInput.addValue(email);
    Actions.waitAndClick(this.continueWithEmailButton);
  }

  async clicContinueWithEmail() {
    Actions.waitAndClick(this.continueWithEmailButton);
  }
}

export default new SignInPage()