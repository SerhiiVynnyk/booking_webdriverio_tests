export class Actions {

  static async waitAndClick(element) {
    await element.waitForClickable();
    await element.click();
  };
}